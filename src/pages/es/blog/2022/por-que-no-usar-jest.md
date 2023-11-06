---
title: Por qué no usar Jest
date: 2022-01-09
description: Llevo años usando Jest para mis proyectos en Node.js, pero cada vez oigo más quejas por parte de la comunidad de Node.js sobre Jest y que no deberías usarlo.
tags: [node.js,testing,jest]
cover: /assets/es/blog/2022/por-que-no-usar-jest/cover.png
draft: false
---

## El problema

Llevo tiempo leyendo quejas desde la comunidad y miembros del core de Node.js sobre [Jest](https://jestjs.io). Hasta ahora siempre he usado Jest porque me parece una herramienta muy completa y cómoda. Además, cuando hago frontend también uso Jest, ya que es el *test framework* que viene con [Create React App](https://create-react-app.dev) por defecto.

Hace un par de meses probé [Node Tap](https://node-tap.org), que es el *test framework* que recomienda [Matteo Collina](https://twitter.com/matteocollina) como alternativa a Jest para testear tu código. Aunque me pareció una gran herramienta, no me terminó de convencer la forma de organizar los test y como hasta ahora no me he encontrado ningún problema con Jest, pues no me peleé mucho con él. Sin embargo, sigo viendo tweets en los que no recomiendan su uso y hasta ahora no me había puesto a indagar en el por qué. En este tweet podemos ver a lo que me refiero:

<blockquote class="twitter-tweet" data-lang="es" data-theme="light" data-align="center"><p lang="en" dir="ltr">Yep. Twice last week. Two separate conversations: &quot;Can you help, this Node.js thing isn&#39;t working... We&#39;re using Jest...&quot;<br></br><br></br>Me, &quot;I&#39;m going to stop you right there.&quot;<br></br><br></br>I generally do not disparage other open source projects but using jest is not something I could ever recommend. <a href="https://t.co/bC7h6oRykY">https://t.co/bC7h6oRykY</a></p>&mdash; James M Snell (@jasnell) <a href="https://twitter.com/jasnell/status/1458048635405438979?ref_src=twsrc%5Etfw">9 de Noviembre de 2021</a></blockquote>

 En primer lugar vemos a Matteo Collina quejándose sobre el hecho de que le llegan issues en Github a los paquetes que mantiene ([casi 500 en npm](https://www.npmjs.com/~matteo.collina)) en los que el problema es Jest y como este altera el entorno de ejecución. En segundo lugar, [James Snell](https://twitter.com/jasnell), pese a que no suele menospreciar los proyectos Open Source, nunca recomendaría usar Jest.

En el hilo del tweet hablan de este [issue en Github de serverless](https://github.com/serverless/serverless/pull/6517) donde se comenta las razones por las que acabaron pasando de Jest a Mocha:

  - Ejecuta los test en un entorno de Node.js modificado que presenta algunos problemas:
    - Los *outputs* de `stdout` y `stderr` no se imprimen en el mismo orden en el que se ejecutan. Se prioriza los `stderr` antes que `stdout`.
    - Algunas API públicas de Node.js se reemplazan con alternativas no estándar.
    - Debido al manejo de caché de módulos de una manera no estándar y desigual, es propenso a memory leaks.
  - El progreso de los test no se muestra hasta que finalizan, lo cual no es lo mejor en los test que requieren mucho tiempo, como los test de integración.
  - Cualquier *output* `stdout` / `stderr` está oculto hasta que finaliza el test.
  - El *test runner* predeterminado tiene varios errores (se puede parchear mediante el uso de `jest-circus` el *test runner* alternativo, que funciona por defecto a partir de Jest 27):
    - Fallos en beforeAll no impiden la ejecución de las pruebas.
    - Fallos en afterAll no están expuestos.
    - only y skip no se respetan por completo.
  - El código fuente es el resultado de la transpilación, lo que dificulta la depuración de posibles problemas en el *test runner*.

Además, he visto a Matteo Collina comentar una y mil veces que el problema que tiene con Jest es que no estás testeando tu aplicación corriendo en Node.js, sino corriendo en Jest. ¿Por qué afirma esto Matteo? Porque Jest se ejecuta en un contexto de V8 diferente, esto es porque Jest por debajo usa [*vm*](https://nodejs.org/api/vm.html), un módulo nativo de Node.js. En [este vídeo se explica la arquitectura de Jest](https://www.youtube.com/watch?v=3YDiloj8_d0) y concretamente en el [minuto 37:32](https://youtu.be/3YDiloj8_d0?t=2252) se habla de `jest-runtime`, que es la parte de **Jest** que se encarga de **simular entornos de ejecución**, ya sea `jest-dom` o lo que Christoph llama *like a fake node environment* que sería la parte de Node.js. Entre otras cosas **este *entorno simulado* tiene su propia implementación de *require* permitiéndonos mockear módulos**, que en la práctica significa que podemos mockear dependencias con Jest. Parafraseando lo que dice Matteo en el tweet que tenemos debajo: **Esto permite una experiencia de desarrollo increíble, pero nuestros tests son menos útiles porque no se están ejecutando en el entorno real.**

<blockquote class="twitter-tweet" data-lang="es" data-theme="light" data-align="center"><p lang="en" dir="ltr">The major downsides is <a href="https://t.co/Cc1z15gqEH">https://t.co/Cc1z15gqEH</a>. Essentially you are not running your code on top of Node or a Browser, but on top of Jest. They do it because it allows a HUGE amount of great DX. On the other hand… your test are less useful because it’s not the real env.</p>&mdash; Matteo Collina (@matteocollina) <a href="https://twitter.com/matteocollina/status/1479955450179301382?ref_src=twsrc%5Etfw">8 de Enero de 2022</a></blockquote>

En el tweet comparte un [issue en Github de Jest abierto por Thomas Huston](https://github.com/facebook/jest/issues/2549). En este issue se habla sobre que las variables globales en Jest difieren de las de Node.js. Además, se hace referencia a este [issue en Github de Jest abierto por Kent C. Dodds](https://github.com/facebook/jest/issues/2048) donde se habla sobre como las variables globales de Jest difieren de las del código fuente. [Kent C. Dodds](https://twitter.com/kentcdodds) descubrió y consiguió reproducir este error por primera vez. A partir de este hecho hicieron pequeñas pruebas para ver hasta dónde llegaba el error y descubrieron que el problema mayormente está al ejecutar Jest con la configuración para `testEnvironment` como `node`, que es el valor por defecto. Sin embargo, al ejecutarlo con `testEnvironment` como `jsdom` el error deja de ocurrir. Si quieres comprobarlo puedes hacerlo en [este repositorio](https://github.com/kentcdodds/jest-globals-bug/tree/json).

Pensando en esta prueba, y en el issue abierto por Thomas Huston, da la sensación de que los problemas con Jest ocurren cuando pruebas código para Node.js y no cuando estás probando código para el navegador. De todos modos, es una falsa sensación porque si coges el repositorio de Kent donde reproduce el error y cambias `jest-cli` por `jest` en la última versión, verás que el error está arreglado. Sin embargo, con el issue que comenta Thomas Huston si actualizas Jest en el [repositorio de prueba](https://github.com/thomas-huston-zocdoc/jest-fetch-array-bug) el error persiste. Si leemos los comentarios de este issue, parece ser que el problema está en las librerías y módulos que usamos en nuestro código, pero que no están en nuestro proyecto. Concretamente en esta parte en la que hablan de big.js como hipotética librería de terceros:

> Usar big.js directamente en la suite de test funcionará, tener código en otro proyecto / módulo que importe big.js y luego también importar big.js a tu proyecto y pasarlos entre funciones dará como resultado errores al realizar verificaciones sobre la instancia.
> <small>Craig McNicholas, <a href="https://github.com/facebook/jest/issues/2549#issuecomment-911359464">comentario en el issue de Jest número 2549</a> </small>

Sin duda alguna tenemos problemas para testear código en Node.js. El issue iniciado por Thomas Huston en 2017, sigue abierto a día de publicación de este artículo y con la última actualización hace menos de una semana. Si estás leyendo esto y quieres saber más sobre los problemas concretos con los que se han encontrado otras personas con Jest en Node.js te recomiendo encarecidamente que te hagas un ☕️ y te leas el issue de arriba a abajo. Este issue está referenciado en otros 50, por lo que tienes para rato. Una buena forma de echar la tarde. También puedes reproducir el error del que habla el issue en [este repositorio](https://github.com/thomas-huston-zocdoc/jest-fetch-array-bug).

## Alternativas

### Mocha

[Mocha](https://mochajs.org) con [Chai](https://www.chaijs.com) llevan siendo una buena opción para testear tu código en JavaScript desde hace casi 10 años. Es un tandem rápido y ligero: Mocha es el *test runner* y chai es la *assertion library*. Sin embargo, como comentaba antes, el ser ligero hace que si quieres añadir mocks, spies o informes de cobertura de test necesitas instalar nuevos paquetes.

### Node-Tap

[Node Tap](https://node-tap.org) también existe desde hace 10 años, pero no tiene tanta popularidad. Al contrario que Mocha, no es un *test runner*, sino un *test framework* y tal como dice su web: **viene con pilas incluidas**. Al igual que Jest permite mockear módulos, incluye su *assertion library* y puede generar informes de cobertura de test. Es bastante completo, sigue el [protocolo TAP](https://testanything.org) y es el *test framework* que recomienda Matteo Collina. Por cierto, quien creó Node Tap es [Isaac Schlueter](https://twitter.com/izs), el mismo que creó npm. La gran diferencia que con Mocha y Jest es que con Node Tap ejecutas el archivo en el que tienes los test con Node.js directamente, no con el *test runner*. En otras palabras, para ejecutar los test no ejecutas `tap add.test.js`, sino que ejecutas `node add.test.js`.

### Tape

[Tape](https://github.com/substack/tape) también existe desde hace casi 10 años y está influenciado por *Node Tap*. En la última edición de Node Cookbook, el libro que te recomiendan para sacarte la certificación de Node.js, es el primer *test framework* con el que te enseñan a hacer un test. Hay que añadir, que también te enseñan como hacer test con Mocha y con Jest. Pese a que es muy parecido a Node Tap, es menos potente y probablemente necesites librerías extra, pero también es más ligero. Por otro lado, la documentación no es más que el README del proyecto. Por último, también sigue el [protocolo TAP](https://testanything.org).

## Comparativa

|                                          |    Jest    |   Mocha   | Node Tap |   Tape  |
|------------------------------------------|:----------:|:---------:|:--------:|:-------:|
| Descargas semanales                      | [12,305,334](https://www.npmjs.com/package/jest) | [4,765,970](https://www.npmjs.com/package/mocha) | [153,919](https://www.npmjs.com/package/tap)  | [531,791](https://www.npmjs.com/package/tape) |
| Node Cookbook                            |     ✅     |     ✅     |    ❌     |    ✅   |
| Assertion library                        |     ✅     |     ❌     |    ✅     |    ✅   |
| Informes de cobertura de test            |     ✅     |     ❌     |    ✅     |    ❌   |
| Mockear Módulos                          |     ✅     |     ❌     |    ✅     |    ❌   |
| Mock & Spies de código                   |     ✅     |     ❌     |    ❌     |    ❌   |
| Se ejecuta con Node.js de forma nativa   |     ❌     |     ❌     |    ✅     |    ✅   |

## Mi experiencia

He usado Jest en más de 50 proyectos, desde CLI hasta API REST pasando por PWA o librerías y hasta ahora no he tenido ningún problema. Es más, siempre ha sido un placer testear mis aplicaciones con Jest. Lo que me encanta es que solo necesito `jest` y nada más. Dentro de ese paquete tengo todo lo que necesito: mocks, spies, informes de cobertura, watchers, etc. Es cierto que es un paquete generoso en cuanto a peso, pero la realidad es que es una dependencia de desarrollo por lo que nunca estará en el dispositivo final.

Además, como Jest es el *test framework* por defecto con React, cualquier persona que desarrolle React conoce Jest. Por no hablar que, debido a la grata experiencia de desarrollo que tiene, se ha abierto paso en la comunidad. Esto hace que cuando entras en un equipo de desarrollo lo más probable es que los test estén escritos con Jest.

Por otro lado, lo que usaba antes de que Jest llegara a mi vida era [Mocha](https://mochajs.org) y [Chai](https://www.chaijs.com), que si querías añadir mocks o spies necesitabas instalar [Sinon](https://sinonjs.org). ¿Quieres un informe sobre la cobertura de test? Más de lo mismo, necesitas instalar [Istanbul](https://istanbul.js.org) y configurarlo. Con Jest todo esto viene incluido.


## Conclusión

Si buscas una respuesta demoledora que te diga qué solución debes usar para hacer test con JavaScript me temo que no la vas a encontrar aquí. Pese a todo lo que hemos visto Jest no deja de ser un paquete con más de **12 millones de descargas a la semana** y que si aterrizas en un equipo de JavaScript lo más probable es que los test estén en Jest. Además, el libro *Node Cookbook*, que es el que te recomiendan para prepararte la certificación de Node.js, te enseña cómo hacer test con Jest, Mocha y Tape. Se me hace difícil decir que dejes de usar Jest, pero sí quiero que tengas claro que **no estás ejecutando tus test en el mismo entorno en el que se va a ejecutar en producción**. Esto último hace que no puedas tener una seguridad al 100% de que todo va a funcionar como esperas, tal vez el 99%, pero nunca el 100%. Ojo, que ese 99% puede ser válido para lo que vas a hacer. Es como la cobertura de test de un proyecto, en muchas ocasiones con tener un 90% es suficiente, pero probablemente sería mejor tener un 100% si se respeta la sostenibilidad del proyecto.

Por mi parte me he propuesto dos cosas. La primera es que quiero darle una segunda oportunidad a *Node Tap*, por el simple hecho de comprender la herramienta y ver en qué casos puede ser útil. La segunda es que en cada equipo nuevo que entre les voy a explicar este problema de Jest para que como equipo sepamos qué problemas pueden aparecer cuando usamos Jest en nuestros proyectos. Otra historia será que usemos o no Jest para nuevos proyectos o nos planteemos cambiar de *test framework*.





