---
title: "oclif: el framework para hacer CLIs en Node.js y TypeScript"
date: 2021-10-03
description: oclif se define como el framework abierto para CLIs en Node.js. Te cuento sus bondades y por qué deberías planteártelo para tu próximo CLI.
tags: [node.js,cli]
cover: /assets/es/blog/2021/oclif/cover.png
draft: false
---

Tengo un pequeño proyecto que se trata de un CLI (*Command Line Interface* o en otras palabras una aplicación de terminal) con el que puedes generar informes sobre las contribuciones (commits) en un proyecto git. Hasta ahora había usado [stdio](https://www.npmjs.com/package/stdio), que para algo simple y pequeño está muy bien. Sin embargo, quería mejorar la [UX](https://es.wikipedia.org/wiki/Experiencia_de_usuario) del CLI y para esto stdio se me quedaba corto. Por otro lado, hacía tiempo que había leído sobre [oclif](https://oclif.io) y quería probarlo.

¿Nunca has oído hablar de oclif? Pues oclif es un framework para hacer CLI en Node.js. Está muy bien documentado y por defecto funciona en TypeScript, lo cual para mí es puro amor ❤️. Tiene su propio CLI para generar CLIs, además de otras utilidades como por ejemplo un [test runner](https://github.com/oclif/example-multi-ts/blob/master/test/commands/hello.test.ts) para poder hacer test *end to end* con tu comando y comprobar que lo que sale por la terminal es lo que esperas. Por último, está hecho por [Heroku](https://blog.heroku.com/open-cli-framework).

Si sólo vas a tener un comando puede parecer un poco *overkill* usar oclif en vez de stdio. Sin embargo, merece la pena por el simple hecho de que oclif es bastante más extensible. No sólo por si añades más comandos, sino que oclif también tiene plugins, que aunque ahora mismo sean pocos, puedes crear tus propios plugins y reusarlos entre proyectos. Por otro lado, me compró el hecho de que te parsee automáticamente las opciones que declaras para el CLI. Por ejemplo, en mi CLI hay una opción que es el número de semanas que quieres que cubra el informe; con stdio tenía que validarlo y pasarlo a `Number`, ya que parsea todo lo que viene de la línea de comandos a string. Sin embargo, oclif ya valida y parsea, lo cual es maravilloso.

Un aspecto que me pareció bastante interesante es que oclif está diseñado para hacer CLIs de un sólo comando o multicomando (un ejemplo de CLI multicomando sería git o npm), lo cual facilita mucho el trabajo para hacer aplicaciones enteras para terminal. A mí ya me ha dado todo el hype y no tardaré mucho en hacerme un port de [toggl](https://toggl.com/track/) para terminal.

Volviendo a oclif y el proyecto en el que lo estaba incluyendo, en mi caso usé el generador para crear un CLI con único comando. Cuando creamos un proyecto con el generador de oclif se nos genera todo lo necesario para comenzar con nuestro CLI.

<img-caption src="/assets/es/blog/2021/oclif/oclif-single-cli.png"  alt="Captura de pantalla de cómo genera oclif un cli de un sólo comando">
  oclif nos pregunta todo lo que necesita para crear nuestro CLI desde cero.
</img-caption>

Entre otras cosas, oclif también nos da la opción de añadir su propia configuración de eslint. En mi caso la incluí, ya que literalmente tienen su propio plugin de eslint, que se basa en `@typescript-eslint/eslint-recommended` y `@typescript-eslint/recommended`.

Es importante tener en cuenta que **el generador de boilerplate de oclif sólo funciona para proyectos nuevos**. Si quieres añadirlo a un proyecto existente no hay manera de hacerlo desde su CLI. En el fondo es lo mismo que te pasaría con cualquier framework de frontend; si tienes una aplicación en jQuery y la quieres pasar a React vas a tener que hacer un proyecto de cero y traerte todo lo que tenías en el proyecto antiguo.

En mi caso lo que hice fue crear un proyecto con el generador e ir copiando todos los archivos y configuración necesarios. No es que fuera muy tedioso, pero no es como otros generadores con los que he trabajado que se adaptan al proyecto. Un saludo desde aquí al equipo de [Storybook](https://storybook.js.org) por lo fácil que hacen poder integrarlo.

Volviendo al proyecto que te genera oclif, el proyecto viene preparado para que puedas ejecutar directamente el comando sin tener que hacer build. Hasta ahora tenía que hacer sí o sí un [npm link](https://docs.npmjs.com/cli/v7/commands/npm-link) para que me lanzara el build de TypeScript y así poder probar el CLI en mi terminal. Con el boilerplate de oclif contemplan que puedas estar en desarrollo y quieres probar el CLI, lo cual es lógico. Con esto me ahorro tener que estar haciendo el build cada vez que quiero hacer una pequeña prueba directamente en terminal al margen de mi suite de test.

Sin duda oclif mola, pero [cli-ux](https://github.com/oclif/cli-ux) mola muchísimo. Es un paquete hecho por el mismo equipo de oclif que facilita mucho el poder hacer un CLI bonito e interactivo. Lo mejor de todo es que se puede instalar por separado, ya que no es algo exclusivo de oclif. Entre otras cosas tienes spinners, barras de progreso, prompt o poder renderizar datos en una tabla. Todo esto en tu terminal.

<img-caption src="/assets/es/blog/2021/oclif/cli-ux-spinner.gif"  alt="Ejemplo de como se ve el spinner de cli-ux">
  Un spinner en tu terminal gracias a cli-ux. (Imagen sacada de la documentación de cli-ux)
</img-caption>

Desde mi experiencia añadiendo oclif y [cli-ux](https://github.com/oclif/cli-ux) a mi proyecto recomiendo completamente usarlo si necesitas hacerte un CLI. La experiencia de desarrollo es buena y el resultado que te da también lo es. Sin duda será el framework que use de ahora en adelante cuando quiera hacerme un CLI.
