---
title: Cómo pasé un proceso en Node.js de 5 horas a 5 minutos
date: 2022-05-20
description: En un proyecto me tuve que enfrentar a un proceso en Node.js que después de rehacerlo de cero para hacerlo más sostenible era un 4400% más ineficiente. En este post te explico como conseguí que fuera más de 20% más rápido que el proceso original.
tags: [node.js,performance]
cover: /assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/cover.png
draft: false
---

<youtube-video 
  video-id="V4sXNlzJIy8"
  video-caption="Esta entrada fue originalmente una charla que di en JSDay Canarias 2022">
</youtube-video>

## El contexto

Esta historia comienza con un equipo de 5 personas, del cual yo era parte desde hacía casi un año y las otras 4 se habían incorporado en los últimos 3 meses. En este equipo mi rol era el de Senior Node.js Developer y era el único que tenía experiencia previa trabajando con Node.js. Aparte había otra persona con experiencia con JavaScript y Dart, lo cual hacía que le resultara fácil adaptarse a los proyectos en TypeScript, que es el lenguaje en el que estaban todos los proyectos. Sin embargo, las otras tres personas del equipo tenían muy poca experiencia previa en JavaScript.

Por otro lado, estábamos trabajando en las distintas partes de un motor de facturación que necesitaba ser adaptado para un cambio legislativo. Esto último significa que el deadline no se podía mover, si el cambio no estaba hecho para esa fecha la empresa no podía generar la facturación del siguiente mes. En caso de que no llegáramos le rompíamos el cash flow. Suave, sin presión.

Por concluir esta contextualización:

1. No todo el equipo controlaba la tecnología en la que se estaba trabajando.
1. El deadline es fijo y crítico, ya que rompemos el cash flow de la empresa en caso de retrasarnos.

## La calma antes de la tormenta

A Abraham Lincoln se le atribuye la siguiente frase: **Dame 6 horas para cortar un árbol y pasaré 4 afilando el hacha**. Sabíamos que iba a haber un cambio legislativo que conllevarían cambios en los proyectos, así que desde 2 meses antes del deadline propusimos refactorizar partes de los proyectos y uno en concreto solicitamos rehacerlo desde 0, ya que en ese entonces era realmente un prototipo que funcionaba, pero costaba mantener y con el cambio legislativo se iba a hacer más insostenible. Nos dieron luz verde a esta propuesta y dicho prototipo iba a ser rehecho desde cero. Vamos a llamar a este proyecto el *Proyecto Leñador*:

![Yo vestido de Leñador con hacha al hombro](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/lumberjack.jpeg)

En [Lean Mind](https://leanmind.es/es/) por regla general trabajamos haciendo pair o mob programming, por lo que nadie nunca está solo y así facilitamos que el código sea más sostenible, además de que tanto la autoría del código como el conocimiento se comparta. Sin embargo, como teníamos 5 proyectos que actualizar decidimos dividirnos lo máximo posible para poder abarcar al menos 3 proyectos a la vez y poder tener los cambios lo antes posible. Eso sale a 2 personas por proyecto y una persona sola. Esa persona que se quedó sola fui yo y estuve a varias bandas asistiendo a los diferentes equipos a la par que trabajaba en el proyecto en el que me tocaba.

Esta situación hizo que por falta de tiempo descuidara el proceso de code review y simplemente me centrara en resolver las dudas del equipo sobre todo en dominio, ya que recuerdo que el resto del equipo llevaba sólo 3 meses con el cliente y el dominio del negocio tenía una curva de asimilación de al menos 6 meses. Además, como hacíamos TDD, si los test pasan y reflejaban bien las especificaciones de negocio no había de qué preocuparse.

El *Proyecto Leñador* fue llevado a cabo por miembros del equipo que no tenían mucha experiencia en JavaScript y ninguna en TypeScript. Esto no suponía a priori ningún problema porque ya llevaban tres meses haciendo pair o mob programming con otros miembros del equipo que sí tenían experiencia y estas mismas personas habían hecho aportaciones a los diferentes proyectos en TypeScript. Simplemente pedían ayuda o consejo cuando lo necesitaban y se les asistía.

La realidad es que el salto de calidad en el *Proyecto Leñador* era más que evidente. No vi el proyecto en su estado final directamente, sino que lo vi evolucionar a lo largo de las semanas y realmente era mucho más claro en su propósito y no había sorpresas en la implementación. Yo había sido parte del equipo que había hecho ese prototipo 9 meses atrás y la verdad es que había ciertas partes que para mí eran un pelín oscuras, que no terminaba de entender cómo funcionaban o cuál era su propósito final. Esto se debía, entre otras cosas, a que el prototipo original no se había hecho enteramente en mob o pair programming, sino que había partes enteras que habían sido hechas por un desarrollador que ya no formaba parte del equipo.

Volviendo al *Proyecto Leñador*, estaba muy orgulloso de lo que el equipo había conseguido, realmente era un proyecto mucho más sostenible, eliminando sorpresas. Sin embargo, cuando estaba terminado e hice una última revisión algo más extensa con el equipo veía algunos flujos de datos que tenían toda la pinta de bloquear el Event Loop, o al menos parte de él, pudiendo provocar pérdidas de performance. Para comprobar el performance de este nuevo proyecto pasé al siguiente paso que teníamos planeado: hacer una prueba comparando el prototipo original con el *Proyecto Leñador*.

El prototipo original basándose en un set de datos de unos cientos de miles de registros era capaz de hacerlo todo en unos 7 minutos. Con el mismo set de datos probé con el *Proyecto Leñador* y el resultado fue que tardó nada más y nada menos que **5 horas 7 minutos y 54 segundos.** Estamos hablando de que tardaba 44 veces más. El proceso real en producción tardaba cada noche unos 40 minutos, por lo que si mandábamos esto a producción el nuevo proceso tardaría unas 29 horas y 20 minutos, cada día. Esta pérdida de performance era inasumible. En ese momento mi yo interno era algo así:

![GIF de los bailarines del ataúd](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/coffin-dance.gif)

Por meter más leña al fuego [¿lo pillas? Leña, *Proyecto Leñador* 🤣], esto pasó a unos 10 días del deadline, 10 días naturales. No podíamos replantear el proyecto, había que optimizarlo en menos de una semana, además de que había más cosas en la parrilla. Recuerdo que habían otros 4 proyectos que necesitaban ser actualizados para el cambio legislativo. En esta situación, por un lado me motivaba a mí mismo pensando cosas del tipo *Llevo toda mi vida preparándome para este momento, los talleres sobre asincronía en Node.js con [Matteo Collina](https://twitter.com/matteocollina) y [James Snell](https://twitter.com/jasnell) van a dar sus frutos*. Sin embargo, otra parte de mí era una mezcla de esto:

![GIF de Sheldon respirando compulsivamente en una bolsa de papel](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/sheldon-bag.gif)

![GIF de Pickle Rick a punto de morir de insolación](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/pickle-rick.gif)

La realidad es que entré en modo pánico y empecé a refactorizar el proyecto y tratar de mejorar en performance todo lo que podía. No cambié nada de lógica, me limité a cambiar el flujo de datos asíncrono, que era mayormente todo lo que tuviera que ver con leer o escribir en base de datos.

## Campeando la tormenta

Tras este refactor vi ciertos patrones que quiero remarcar y mostrar:

### 1. Evita async innecesarios

```js
export function randomNumber() {
    return Math.random()
}

export async function asyncRandomNumber() {
    return Math.random()
}
```

Estas dos funciones son idénticas a excepción de que la segunda es asíncrona. Sin ningún motivo, pero es asíncrona. Cada vez que usamos async en una función, estamos automáticamente haciendo que devuelva una promesa, y eso hay que gestionarlo de más.

Puede parecer una tontería, pero afecta. Hice una pequeña demo para demostrar hasta qué punto esto afecta a nuestro performance. Lo que hace el script es ejecutar cada una de estas funciones por separado un millón de veces.

![Resultado de ejecutar la demo para la comparación del async](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/useless-async.png)

Como podemos ver, sólo por poner ese `async` hemos hecho que tarde casi seis veces más. Aplicándolo a la vida real, en una suite de test reducimos un 40% el tiempo que tardaba en ejecutarse sólo quitando los async innecesarios que se nos habían quedado después de un refactor. Simplemente quitamos los async que teníamos en las arrow functions que ya no nos hacía falta. Haciendo esto pasamos de tardar algo más de 2 minutos en tirar la suit de test a poco menos de minuto y medio.


### 2. Evita los await dentro de los bucles.

Imagina que tienes una tarea que sea: *En base a una lista de IDs tienes que recuperar información de una API*. Por limitaciones técnicas no puedes pasarle a la API la lista de IDs, sino que tienes que hacer una llamada por cada ID. ¿Cuál es la primera idea que se nos viene a la cabeza? Probablemente un bucle, apesta a bucle. La implementación podría ser algo así:

```js
async function fetchUserListInfo(ids) {
  const values = []
  for (const id of ids) {
    values.push(await fetchUserInfo(id))
  }
  return values
}
```

Parece sencillo y además si lo probamos veremos que funciona. Consigue la información de todos los usuarios sin problemas. ¿Sin problemas? Ese await dentro del `for` fuerza a que se termine de completar cada promesa antes de procesar la siguiente.

<img-caption src="/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/await-loop.jpeg" alt="Las promesas se resuelven una a una">
  Resolviendo las promesas con un await dentro de un for
</img-caption>

Esto significa que si de media la API tarda en responder 50ms y tenemos 100 IDS que procesar, tardaremos unos 5 segundos en realizar la tarea. No es que sea un drama, pero si implementamos esta otra solución la cosa cambia bastante:

```js
function fetchUserListInfo(ids) {
  const values = []
  for (const id of ids) {
    values.push(fetchUserInfo(id))
  }
  return Promise.all(values)
}
```

Aunque parezca igual aquí hay tres sutiles diferencias:
1. La función ya no es asíncrona, aunque sí que devuelve una promesa.
2. Dentro del for ya no hacemos un await
3. Devolvemos un Promise.all en vez de los valores como hacíamos antes.

La gran diferencia de esta solución es que dentro del bucle no resolvemos las promesas, sino que simplemente las añadimos a nuestro array pendiente de ser resueltas. Cualquier función que devuelva una promesa la devuelve en este estado que hasta que no uses `await` o `.then` no estará *fulfilled* o *rejected*. Podemos verlo como el experimento del gato de Schrodinger, hasta que no abres la caja no sabes si el gato está vivo o muerto. A las promesas les pasa algo parecido, hasta que no las resuelves están en estado *pending* y una vez resueltas pueden estar *fulfilled*, que es cuando se ha resuelto satisfactoriamente y lo que tienes es el valor, o *rejected* que es cuando ha habido algún error y lo que hace es lanzar la excepción que tienes que capturar con un try/catch o con el `.catch`.

Volviendo a la solución, vemos que las promesas no se resuelven, sino que se almacenan directamente en estado *Pending*, y la función al devolverlas las resuelve todas *a la vez*. Esto hace que ahora la tarea se haga mucho más rápido, tardando lo que tarde en responder la llamada a la API más lenta.

<img-caption src="/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/promise-all.jpeg" alt="Las promesas se resuelven a la vez">
  Resolviendo las promesas con un Promise.all
</img-caption>

Para ver esto mejor voy a mostrar otra demo en la que usamos casi el mismo código, lo único que cambia es que sustituimos la llamada a la API por una simple espera de 1 milisegundo. Lo que vamos a ver es cuanto tarda cada una de las soluciones ejecutando esta tarea para una lista de 100 IDS y lo va a hacer 1000 veces para que podamos ver si realmente hay una diferencia de performance o no.

![Resultado de ejecutar la demo para bucles asíncronos](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/async-loop.png)

Como vemos la diferencia es abismal. Para la misma tarea cuando usamos `Promise.all` tarda poco más de 1 segundo, pero cuando usamos `await` dentro del for tarda **casi 2 minutos**. Esta diferencia en un entorno real es crítica y lo peor es que por lo general no nos damos cuenta de que el problema está en esta clase de sitios.

Algo a tener en cuenta sobre el `Promise.all`; en caso de que alguna promesa lance un error parará el Promise.all dejando promesas sin cumplir. Para evitar esto el método que nos devuelve la promesa debe tener su propio try/catch y gestionar el error. Por ejemplo:

```ts
async function fetchUserInfo(id): User {
  try {
    const response = await fetch(`https://api.awesome-project.com/user/${id}`)
    return User.fromResponse(response)
  } catch(err) {
    console.error(`Error fetching user ${id}`)
    console.error(err.message)
    console.error(err.stack)
    return new NullUser()
  }
}
```

También existe el [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) que evita que el error pare el proceso de resolver todas las promesas. Otra diferencia es que lo que nos devuelve esta estructura:

```ts
type PromiseAllSettleReturnValue<T> = Array<{
  status: 'fulfilled' | 'rejected',
  value?: T,
  reason?: Error
}>
```

### 3. Usa Promise.all siempre que puedas

En nuestro día a día desarrollando soluciones de software nos encontramos que en más de una ocasión necesitamos varios recursos de diferentes sitios, ya sean tablas, bases de datos o APIs. Todo esto además tiene una naturaleza asícrona y necesitamos gestionarla.

```js
async function readAllUserInfo(userId) {
  const user = await readUser(userId)
  const contracts = await readContractsForUser(userId)
  const invoices = await readInvoicesForUser(userId)
  return {
    ...user,
    contracts,
    invoices
  }
}
```

Aquí vemos un problema parecido al anterior, pero sin bucles. Aunque es menos dramático, es otro de los sitios de donde podemos rascar performance si utilizamos `Promise.all`, ya que como vemos ninguna de las peticiones depende de la otra, por lo que podríamos pedir toda la información a la vez y así reducir el tiempo que necesita la función para realizar la tarea.

```js
async function readAllUserInfo(userId) {
  const [ user, contracts, invoices ] = await Promise.all([
    readUser(userId),
    readContractsForUser(userId),
    readInvoicesForUser(userId)
  ])
  return {
    ...user,
    contracts,
    invoices
  }
}
```

Aquí vemos como todas las llamadas se pasan al `Promise.all` y las sacamos por destructuring en el mismo orden en el que se la hemos pasado. Como pasó antes, esto tardará lo que tarde la petición más lenta, en vez de tener que esperar por todas una detrás de otra.

### 4. Sé consciente de cuantas promesas estás gestionando

```js
function fetchUserListInfo(ids) {
  return Promise.all(ids.map(fetchUserInfo))
}
```

Esta sería otra forma de hacer el `fetchUserListInfo` que hemos visto un par de diapositivas atrás. Tanto esta como la anterior solución tienen un problema, no sabes cuántas promesas vas a tener en el `Promise.all`. En casos en los que no sabes el número de promesas que vas a gestionar o este número es muy alto es recomendable usar la librería `p-map` y limitar la concurrencia. La razón para hacer esto es que si tienes demasiadas promesas puedes acabar haciéndote un ataque de denegación de servicio a ti mismo sin darte cuenta.

En el *Proyecto Leñador* más que un ataque de denegación de servicio lo que nos preocupaba era ahogar la base de datos. En estos proyectos la práctica habitual era limitar la concurrencia al número de conexiones que teníamos configurado para la base de datos, evitando así ahogarla.

```js
import pMap from 'p-map';

function fetchUserListInfo(ids) {
  return pMap(
    ids,
    fetchUserInfo,
    {concurrency: 10}
  )
}
```

La diferencia usando `p-map` es que tienes que pasar por separado la lista sobre la que quieres iterar, la función que se ejecutará para cada uno de los elementos de la lista y por último las opciones de `p-map`. En este caso sólo le definimos que queremos que como máximo resuelva 10 promesas a la vez.

Por último, tener en cuenta que `p-map` en su versión 5 pasó a ser de tipo ESModules y a menos que tu proyecto esté hecho de esta manera no te va a funcionar. Para poder usarlo con CommonJS necesitas tirar de la versión 4. La realidad es que ambas versiones sólo difieren en si funcionan con ESModules o con CommonJS. Vamos, que si importas cosas en ficheros con `import` o con `require` respectivamente.

![Pasar de CommonJS to ESModules](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/cjs-to-esm.png)

### 5. Haz caso de los warnings

No sé si a alguien más le pasa que la mayoría del tiempo ignoras los warnings y sólo le das importancia cuando son errores. En la consola al ejecutar el proceso me salía esto:

```shell
(node) warning: possible EventEmitter memory leak detected.
11 listeners added.
Use emitter.setMaxListeners() to increase limit.
```

El mensaje nos dice que Node.js ha detectado un posible memory leak debido al *Event Emitter* porque se están añadiendo más listeners de los recomendados. Te ofrece la opción de incrementar el límite para en caso de que tengas claro lo que estás haciendo y lo necesites.

Yo pensaba *Meh, es un warning*. En una primera instancia simplemente hice lo que me decía y aumenté los listeners sin darle mayor importancia. Sin embargo, el proceso todavía era demasiado lento así que investigué el warning.

El problema era que había event handlers que se estaban creando continuamente con cada conexión que se solicitaba al pool de conexiones de la base de datos, pero que no se estaban eliminando, siendo el causante del memory leak. Tras implementar el fix en el que cada vez que se devuelve una conexión al pool se limpian los event handlers asociados a la conexión vimos una mejoría en la performance, tardando 4 veces menos de lo que tardaba antes.

## Resultado

Con todas estas mejoras en el *Proyecto Leñador* lo volvimos a ejecutar con el mismo set de datos y en esta ocasión tardó **04:52**. Era incluso más rápido que el prototipo original que tardaba 7 minutos. En ese momento mi yo interior era algo así:

![GIF de El Nota en el Gran Lebowski dándolo todo](/assets/es/blog/2022/como-pase-un-proceso-en-nodejs-de-5-horas-a-5-minutos/fuck-yeah-dude.gif)

No recuerdo si era de día, de noche, ni qué hora era. Sólo recuerdo ese sentimiento de *FUCK YEAH*, ese paso de la ansiedad a la paz. Y ya por estar completamente seguros de que había una mejora, ejecutamos una prueba con un set de datos semejante al que se enfrentaba en producción día a día, que eran millones de registros en la base de datos. En este caso el resultado quedó claro:

- Prototipo: 41:29 minutos
- *Proyecto Leñador:* 31:56 minutos

Aparte de haber mejorado la sostenibilidad del proyecto, habíamos mejorado la performance haciendo que el proceso fuera más de un 20% más rápido. Y todo esto llegando al deadline.

## Cosas que aprendí

Al final todo salió bien, pero sin duda aprendí un par de cosas de esta experiencia:

- **La asincronía en JS está más incomprendida de lo que pensaba.** La gestión de asincronía en JavaScript es algo que no todo el mundo tiene interiorizado. Todo el mundo usa promesas y el async/await y empezar a trabajar con JavaScript o TypeScript no es tan complicado, lo que sí es más complicado es saber cómo gestionar la asincronía en JavaScript. Aclarar, que la asincronía en sí es algo que no es fácil de comprender, ya que esto pasa también en otros lenguajes.
- **Forma a tu equipo, comparte el conocimiento.** Busca tiempo para poco a poco ir formándolo. En mi experiencia el mob programming ayuda bastante, pero no es suficiente. Algunos conceptos necesitas interiorizarlos y para eso lo mejor es hacer katas o tener formaciones con objetivos concretos. Al principio es bastante duro preparar esta clase de formaciones, pero a medida que las tengas podrás reusarlas a medida que entren personas nuevas o si cambias de equipo puedes formar a ese nuevo equipo.
- **La responsabilidad debe ser compartida.** Es bastante típico que las personas con más experiencia del equipo se echen las cosas a la espalda. La responsabilidad debe ser compartida, tanto tecnológica como en lo relativo a diseño de software o metodologías. La idea es que los miembros del equipo aprendan unos de otros sin importar el nivel de experiencia que tengan. El intercambio de ideas desde distintos puntos de vista puede enriquecer mucho al equipo.
- **Sé prescindible.** Si eres prescindible no serás el cuello de botella. En esta historia yo fui un cuello de botella por conocimiento y por dominio. Es algo de lo que me arrepiento, pero también algo de lo que aprendí. Ojo, digo prescindible que no innecesario. Con esto quiero decir que no seas crítico por conocimiento, ya sea de dominio, procesos o tecnología. Trata siempre de compartir tu conocimiento con el equipo y documentarlo. Todo lo que tiene un inicio tiene un fin, por lo que algún momento dejarás de estar en el equipo en el que estás ahora. Cuando eso pase lo importante es que no te lleves conocimiento contigo, sino que lo hayas dejado en el equipo en forma de documentación. De esta manera serás prescindible.

Y esta ha sido la historia y el aprendizaje de cómo pasé un proceso en Node.js de 5 horas a 5 minutos. Recapitulando estos son mis 6 consejos cuando gestionas asincronía en JavaScript:
1. Evita los async innecesarios
2. Evita los await dentro de los bucles
3. Usa Promise.all siempre que puedas
4. Sé consciente de cuantas promesas estás gestionando
5. Haz casos de los warnings.

## Un par de cosas más

Tengo un par de cosas más en el tintero que no son producto de esta experiencia con *El Proyecto Leñador*, sino del día a día durante los últimos años y quiero compartirlas.

- **No mezcles tipos de asincronía**: Aparte de ser más difícil de leer, también acaba afectando al performance porque la mayoría de las veces lo que hacemos es complicar el comportamiento asíncrono.
- **Async generators, ese gran desconocido**: En JavaScript existe una cosa llamada generators, de la cual llegó hace un par de años su versión asíncrona. Los async generators donde brillan es al gestionar streams. Sin embargo, hay otros casos de uso que también son muy útiles. Lucciano Mammino dió una [charla sobre ellos en la NodeCONF EU en 2021](https://www.youtube.com/watch?v=uTzBHPpMEhA).
- **Investiga sobre el Event Loop**: Entender cómo funciona JavaScript por debajo te ayuda a entender por qué a veces las cosas no pasan como esperamos. En la documentación de Node.js hay un apartado de guías en la cual hay una llamada [*The Node.js Event Loop, Timers, and process.nextTick()*](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/). Es un documento que tardaron 6 meses en escribir y que explica los diferentes procesos y el orden en el que se ejecutan en cada vuelta del Event Loop en Node.js.

También dejo por aquí [este artículo de James Snell](https://www.nearform.com/blog/optimise-node-js-performance-avoiding-broken-promises/) sobre gestión de promesas en Node.js.
