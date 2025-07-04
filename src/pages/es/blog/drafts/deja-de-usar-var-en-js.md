---
title: Deja de usar var en JavaScript
date: 2025-07-04
description: Descubre por qué `var` está obsoleto en JavaScript moderno y cómo `let` y `const` mejoran la legibilidad, seguridad y mantenimiento del código.
tags: [javascript,node.js]
cover: ../../preview.png
draft: true
---

Aunque ES2015 (ES6) salió hace 10 años, todavía me encuentro con código nuevo que usa `var`. En muchos casos, esto no es por nostalgia o decisión consciente, sino porque quienes lo escriben no dominan JavaScript como su lenguaje principal: trabajan con otros stacks y simplemente “les toca” lidiar con el frontend.

Sea cual sea la razón, **no vengo a hacer de policía del código**, sino a explicar por qué `var` **es una mala elección en 2025** y qué alternativas mejores existen.

---

## 😬 Los problemas de `var`

`var` fue durante años la única forma de declarar variables en JavaScript. Pero tiene comportamientos que hoy resultan peligrosos en proyectos modernos:

1. **Ámbito de función (no de bloque)**  
   Una variable declarada con `var` es visible en toda la función en la que se declara, incluso **fuera del bloque `{}`** donde la defines. Esto puede causar conflictos difíciles de depurar.

2. **Hoisting**  
   Puedes usar una variable con `var` **antes de declararla**, y no te dará error: simplemente valdrá `undefined`.

3. **Redefinición silenciosa**  
   Puedes declarar una misma variable con `var` varias veces en el mismo ámbito, y el lenguaje no se quejará.

Veamos un ejemplo con consecuencias reales:

```js
function printMatrix(matrix) {
  for (var i = 0; i < matrix.length; i++) {
    var line = matrix[i];
    for (var i = 0; i < line.length; i++) { // 👈 Aquí se pisa el 'i' del bucle externo
      var element = line[i];
      console.log(element);
    }
  }
}

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

printMatrix(matrix); // 1 2 3
```

El resultado parece correcto… pero en realidad, el segundo bucle está sobrescribiendo el índice i del primero, y eso rompe el flujo lógico del programa. Este tipo de errores pueden pasar desapercibidos en funciones más grandes y producir bugs difíciles de detectar.

## ✅ La alternativa moderna: let y const

Desde ES2015, tenemos dos nuevas formas de declarar variables:

### let
- Tiene ámbito de bloque: sólo es visible dentro de {} donde se declara.
- No se puede redeclarar dentro del mismo bloque.
- No se puede usar antes de su declaración: da ReferenceError.

#### const
- Igual que let, pero no permite reasignar el valor.
- Ideal para declarar variables que no deberían cambiar (por ejemplo, referencias a funciones, arrays o strings).

Reescribamos el ejemplo anterior usando let y const:
```js
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    for (let j = 0; j < line.length; j++) {
      const element = line[j];
      console.log(element);
    }
  }
}

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

printMatrix(matrix); // 1 2 3 4 5 6 7 8 9
```

- Usamos let para los índices (i y j) porque cambian.
- Usamos const para line y element, ya que no se reasignan dentro del bucle.

Así no sólo evitamos conflictos entre variables, sino que dejamos más claro al lector qué se puede cambiar y qué no.

⸻

## 🧠 Consejo práctico

**Usa const por defecto**. Sólo usa let cuando sepas que vas a cambiar el valor.

**Evita var por completo**. No sólo es innecesario: es una fuente de errores.

⸻

## 🧾 Conclusión

El uso de var no tiene cabida en el JavaScript moderno. No aporta nada que no puedas hacer mejor con let o const, y sus peculiaridades son fuente constante de errores.

Adoptar let y const no es sólo una cuestión de sintaxis: es adoptar una forma más clara, segura y predecible de escribir código. Un pequeño cambio que marca una gran diferencia en la calidad de tus programas.