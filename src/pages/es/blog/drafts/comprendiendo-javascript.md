---
title: Comprendiendo JavaScript
date: 2021-09-11
description: JavaScript es un lenguaje que es nativamente asíncrono y es clave entenderlo para poder trabajar con él eficientemente.
tags: [asincronía,callbacks,promesas,javascript,node.js]
cover: ../../preview.png
draft: true
---

JavaScript es un lenguaje bastante incomprendido entre otras cosas porque no es lo normal que sea tu primer lenguaje de programación, o al menos no tu lenguaje *nativo*. Lo normal es que tu primer lenguaje de programación o el lenguaje que sientes que dominas sea un lenguaje de backend como Java, Python o PHP. Entre otras cosas porque la mayoría de las veces los algoritmos más complicados se hacen del lado del servidor. Digo todo esto desde el respeto, sé que en frontend también hay retos, que no se limita simplemente a *pintar APIs* y mucho menos en la web moderna.

Por esto, ya que hasta 2009 JavaScript sólo se podía usar en el navegador, su uso se limitaba a las personas que programaban webs. Por otro lado, JavaScript estuvo 10 años sin recibir ni una sola actualización, ninguna nueva funcionalidad o mejora. Sin embargo, en 2009 recibió una actualización que entre otras cosas incluía la implementación de JSON y una mejor gestión de arrays. Esto dió algo de oxígeno al lenguaje, aunque fue en 2015 cuando JavaScript realmente creció, ya que recibió una actualización llena de mejoras que hicieron al lenguaje mucho más cómodo y potente. A partir de ahí ha crecido sin parar, teniendo cada año nuevas funcionalidades que mejoran la experiencia de desarrollo.

Además, el nacimiento de Node.js gracias a Ryan Dahl (y a Google por liberar [V8](https://v8.dev) en 2008) en 2009 y la posibilidad de usar JavaScript fuera del navegador hubo otro crecimiento exponencial en JavaScript, en este caso su comunidad. A partir de este momento empezó a fraguarse algo maravilloso porque como había comentado más arriba, en backend tienes varios lenguajes donde elegir, pero en frontend sólo tenías uno: JavaScript. Y claro, ¿qué pasa cuando toda persona que hacía frontend ahora podía empezar a hacer también backend usando Node.js? Pues que los *Full Stacks* dejaron de ser unicornios y que las herramientas para hacer frontend empezaron a mejorar y poco a poco se originó el desarrollo web moderno impulsado gracias a Node.js y npm.

Teniendo en cuenta esto no es de extrañar que Jeff Atwood, cofundador de StackOverflow afirmara lo siguiente:

> Cualquier aplicación que pueda ser escrita en JavaScript, eventualmente será escrita en JavaScript.
>
> <cite>Jeff Atwood, Cofundador de StackOverflow</cite>

Por otro lado, en la NodeCONF EU de 2019 se dijo esta involvidable frase que a día de hoy sigo teniendo pineada en mi perfil de Twitter:

> JavaScript es la cucaracha de los lenguajes de programación, nunca va a morir.
>
> <cite> <a href="https://twitter.com/nodebotanist"> Kassian Rosner Wren </a> </cite>

Entonces, si JavaScript es un lenguaje que tiene tanta tracción y que es tan ampliamente usado, ¿por qué no tratar de comprenderlo y aprender a usarlo de la mejor manera posible?

## ¿De dónde salió JavaScript?

Una empresa llamada Netscape fue fundada en 1994 y creó uno de los primeros navegadores web. En 1995 reclutaron a Brendan Eich para que creara un lenguaje de programación para ese navegador web. El atractivo para él era que él podría basar el idioma en el [Scheme](https://es.wikipedia.org/wiki/Scheme) (un dialecto [Lisp](https://es.wikipedia.org/wiki/Lisp)), lenguajes de programación funcional. La influencia de Scheme llevó a JavaScript a tener *closures*. Otra influencia fue Self, un lenguaje de programación basado en prototipos, que es responsable de la herencia prototípica de JavaScript, que en 2015 sería encubierta por el azúcar sintáctico de las clases.

- La idea detrás de JavaScript
    - En qué está basado JavaScript
- Cómo funciona JavaScript
    - Single threats
    - Event loop
- Scope y Closure
- Prototipos
- Tipos y coerción
- Asincronía
    - Qué parte es asíncrona y qué parte es síncrona
    - Callbacks
    - Promesas
    - Async / await
    - Async Generators
        - ¿Qué es un generator?
        - for await
