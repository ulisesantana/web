---
title: Trabajando con ficheros grandes en Node.js
pubDatetime: 2025-08-07
description: Después de un tiempo alejado del backend, decidí enfrentarme a un reto clásico pero siempre interesante, procesar archivos CSV enormes con Node.js. En esta entrada comparo tres enfoques —lectura completa, streaming y streaming con concurrencia— para ver cuál ofrece el mejor equilibrio entre rendimiento y uso de memoria.
tags: [node.js, csv]
draft: true
lang: es
---

Después de mi excedencia [para recuperarme del burnout](/es/blog/2025/despues-del-burnout/) y de reincorporarme al mundo del desarrollo como frontend developer, llevaba un tiempo sin ensuciarme las manos con Node.js. Echo de menos trabajar en backend y enfrentarme a ese tipo de retos técnicos en los que puedes jugar con el rendimiento, medir el impacto de tus decisiones y, de paso, aprender cosas útiles para el futuro.

Así que decidí hacer un pequeño experimento: ¿cómo se comporta Node.js procesando archivos CSV grandes? No solo por curiosidad, sino porque este tipo de tareas —importar datos, validar información y transformarla— son muy comunes en la vida real. Y si no has tenido que pelearte nunca con un CSV de varios gigas, dame tiempo, que ya te tocará.

Quería algo lo bastante simple como para enfocarme en la estrategia y no en la lógica de negocio, pero también lo bastante realista como para que los resultados fueran aplicables a proyectos del día a día. Lo que hice fue comparar tres maneras distintas de procesar un archivo CSV y medir cuánto tardan, cuánta memoria consumen y cómo escalan.

> Todo el código y los benchmarks los tienes en este repositorio: [parse-csv-4-fun](https://github.com/your-repo/csv-parser-performance)


## El reto: limpiar y transformar millones de registros

Supongamos que tienes un archivo CSV con millones de usuarios. Cada línea contiene un ID, un nombre, un email y una edad. Tu tarea consiste en:

1. Validar que el email contenga una `@`.
2. Validar que la edad sea un número positivo.
3. Transformar el nombre a mayúsculas.
4. Guardar los registros válidos en un nuevo archivo.
5. Ignorar los inválidos.

Este tipo de lógica es típica en pipelines de datos: validas, transformas, exportas. Pero cuando el volumen de información crece, la forma en la que implementas la solución deja de ser un detalle sin importancia. No es lo mismo procesar 10.000 registros que 100 millones. Y aquí es donde empieza la parte interesante.


## Los datos de prueba

Para probar cada enfoque, usé dos conjuntos de datos:

- **Dataset pequeño**: 5 millones de registros (~375 MB)
- **Dataset grande**: 100 millones de registros (~7,3 GB)

Ambos están diseñados para simular un escenario realista, con una mezcla de registros válidos e inválidos (emails mal formateados, edades que no son números…). Esto permite no solo medir el rendimiento, sino también validar que la lógica funciona bajo presión.


## Enfoque 1: Cargar todo en memoria

Empezamos con la solución más directa, y también la más peligrosa. Esta consiste en leer todo el archivo en memoria, partirlo en líneas y procesarlas una a una. Fácil de entender, rápido para archivos pequeños… pero con un coste.

```javascript
async processUsers() {
  const stats = new Stats();

  try {
    const csv = await fs.readFile(this.inputFilePath, 'utf8');
    if (!csv.trim()) return stats;

    await fs.writeFile(this.outputFilePath, this.#USER_HEADERS.join(','));
    const [headers, ...lines] = csv.split(EOL);
    this.#processHeaders(headers);

    for (const line of lines) {
      await this.#processUsersLine(line, stats);
    }
  } catch (error) {
    await this.#safeDelete(this.outputFilePath);
    throw error;
  }

  return stats;
}
```

### ✅ Ventajas
- Es muy fácil de implementar.
- Es rápida para archivos pequeños porque no hay sobrecarga de streams.

### ❌ Inconvenientes
- Consume muchísima memoria, ya que carga todo el contenido de golpe.
- No escala. Si el archivo es más grande que la RAM disponible, simplemente revienta.
- Bloquea recursos durante todo el proceso.

### 📊 Resultados (5M registros)
- Tiempo: 2m 21.66s
- Consumo de memoria: 1.09 GB


## Enfoque 2: Streaming línea por línea

La segunda estrategia es usar streams de Node.js para leer el archivo poco a poco, procesando una línea cada vez. De esta manera, en lugar de cargar todo en memoria, vamos consumiendo los datos conforme los leemos.

```javascript
async processUsersAsStream() {
  const stats = new Stats();
  const lines = this.#getLines();

  try {
    await fs.writeFile(this.outputFilePath, this.#USER_HEADERS.join(','));
    const { value } = await lines.next();
    this.#processHeaders(value);

    for await (const line of lines) {
      await this.#processUsersLine(line, stats);
    }
  } catch (error) {
    await this.#safeDelete(this.outputFilePath);
    throw error;
  }

  return stats;
}

#getLines() {
  const rl = readline.createInterface({
    input: createReadStream(this.inputFilePath, { encoding: 'utf-8' }),
    crlfDelay: Infinity,
  });
  return rl[Symbol.asyncIterator]();
}
```

### ✅ Ventajas
- Muy eficiente en cuanto a memoria: solo se carga una línea cada vez.
- Escala sin problemas.
- Uso de memoria constante, predecible.

### ❌ Inconvenientes
- Procesamiento secuencial: solo una línea a la vez, lo que puede ser lento.
- Está limitado por la velocidad de lectura del disco y el I/O en general.

### 📊 Resultados (5M registros)
- Tiempo: 2m 22.51s
- Consumo de memoria: 31.35 MB


## Enfoque 3: Streams + concurrencia por lotes

Y ahora viene la joya de la corona. Este enfoque combina lo mejor del streaming con procesamiento concurrente por lotes. Es decir: seguimos leyendo línea a línea, pero procesamos varias líneas en paralelo usando `Promise.allSettled`.

```javascript
async processUsersAsStreamAndConcurrency() {
  const batchSize = 1000;
  const stats = new Stats();
  const lines = this.#getLines();

  try {
    await fs.writeFile(this.outputFilePath, this.#USER_HEADERS.join(','));
    const { value } = await lines.next();
    this.#processHeaders(value);
    let promises = [];

    for await (const line of lines) {
      promises.push(this.#processUsersLine(line, stats));

      if (promises.length >= batchSize) {
        await Promise.allSettled(promises);
        promises = [];
      }
    }

    if (promises.length > 0) {
      await Promise.allSettled(promises);
    }
  } catch (error) {
    await this.#safeDelete(this.outputFilePath);
    throw error;
  }

  return stats;
}
```

### ✅ Ventajas
- Mantiene un uso de memoria bajo.
- Mucho más rápido que los anteriores.
- Escala perfectamente para archivos grandes.
- Puedes ajustar el rendimiento variando el tamaño del batch.

### ❌ Inconvenientes
- Es más compleja de implementar.
- Necesita afinar el tamaño del batch según tu máquina y tus necesidades.

### 📊 Resultados (5M registros)
- Tiempo: 39.65s
- Consumo de memoria: 41.05 MB


## Comparativa

### Dataset pequeño (5 millones)

| Enfoque              | Tiempo    | Consumo de memoria | Eficiencia |
| -------------------- | --------- | ------------------ | ---------- |
| Normal               | 2m 21.66s | 1.09 GB            | ❌ Mala     |
| Streaming            | 2m 22.51s | 31.35 MB           | ✅ Alta     |
| Stream + Concurrente | 39.65s    | 41.05 MB           | ✅ Alta     |

### Dataset grande (100 millones)

| Enfoque              | Tiempo     | Consumo de memoria | Mejora de velocidad |
| -------------------- | ---------- | ------------------ | ------------------- |
| Streaming            | 43m 27.12s | 37.65 MB           | -                   |
| Stream + Concurrente | 13m 44.32s | 42.23 MB           | 3.16x más rápido    |

> El enfoque normal no se probó con el dataset grande porque era básicamente garantía de que el proceso petara por exceder el consumo máximo de memoria que tiene por defecto Node.js.


## Conclusiones y aprendizajes

Este ejercicio me recordó algo que a veces olvidamos: no todo es el código que escribes, sino cómo lo ejecutas. Aquí tienes algunas ideas clave:

1. Memoria vs velocidad: leer todo en memoria es tentador, pero no escalable. Solo recomendable para archivos pequeños.
2. Streaming salva el día: si necesitas estabilidad y eficiencia, los streams son tu amigo.
3. La concurrencia bien usada marca la diferencia: si además quieres rapidez, agrupa tareas y lánzalas en paralelo.
4. Escalabilidad real: los enfoques más avanzados muestran su valor cuanto más grande es el archivo.
5. Ajusta el batch: el número mágico aquí fue 1000, pero puede cambiar según tu entorno.


### ¿Cuál deberías usar?

| Enfoque              | Cuándo usarlo                                     |
| -------------------- | ------------------------------------------------- |
| Normal               | Solo para archivos pequeños, entornos controlados |
| Streaming            | Cuando el tamaño importa más que la velocidad     |
| Stream + Concurrente | Para producción, rendimiento y grandes volúmenes  |

¿Y tú? ¿Cómo procesas tus archivos? ¿Tienes algún truco mejor? Puedes ver el repo completo y experimentar por tu cuenta: [parse-csv-4-fun](https://github.com/your-repo/csv-parser-performance)
