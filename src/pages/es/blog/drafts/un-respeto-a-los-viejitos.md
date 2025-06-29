---
title: Un respeto a los viejitos
date: 2023-03-01
description: A nadie le gusta trabajar en un proyecto legacy, pero tenemos que entender qué conlleva trabajar en un proyecto legacy.
tags: [software,legacy]
coverCopyright: Foto de <a href="https://unsplash.com/@vladsargu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vlad Sargu</a> en <a href="https://unsplash.com/es/fotos/ItphH2lGzuI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
draft: true
---

A menudo, cuando se menciona que trabajas en un proyecto *legacy*, la reacción es una mezcla de compasión y respeto, como si estuvieras sobreviviendo a diario en una jungla hostil. Sin embargo, creo que es importante reivindicar el valor y el respeto que merece el software legacy. Sí, a veces puede ser un infierno, pero la mayoría de las veces es simplemente el resultado de personas que hicieron lo mejor que pudieron con las herramientas, el conocimiento y el contexto que tenían en ese momento. No sabemos bajo qué presión trabajaban, ni en qué estado personal o profesional se encontraban quienes escribieron ese código. Juzgar el pasado con los ojos del presente es fácil, pero poco justo.

![GIF de un perro con estrés post-traumático de Vietnam](/assets/es/blog/2023/un-respeto-a-los-viejitos/stains-vietnam.gif)

Además, hay una verdad innegable: el software legacy es legacy porque funciona y porque genera dinero. Si ese código no aportara valor, no existiría el proyecto ni habría nada que mantener. El hecho de que siga en pie, a pesar de los años y los cambios tecnológicos, es una muestra de su resiliencia y utilidad. Muchas veces, el código que más criticamos es el que ha mantenido a flote a la empresa durante años.

En mi experiencia reciente, trabajar en un proyecto Node.js con más de 10 años fue casi como hacer arqueología del software. Cada módulo, cada función, era una capa de historia. Había partes que usaban prácticas de 2010, otras que reflejaban la evolución del lenguaje y del ecosistema. Lejos de frustrarme, empecé a admirar ese legado. Aprovechaba el tiempo libre en los sprints para entender mejor el código, añadir tests y, poco a poco, hacer que se sintiera menos "legacy" y más un sistema vivo y robusto.

<img-caption src="/assets/es/blog/2023/un-respeto-a-los-viejitos/mountain-strata.jpeg" alt="Una montaña con diferentes estratos">
La formación Yesera en Argentina
</img-caption>

Trabajar en legacy también te da una perspectiva única sobre cómo ha evolucionado la tecnología. Por ejemplo, en los proyectos Node.js de antes de 2015, la asincronía se gestionaba casi exclusivamente con callbacks y librerías como `async` para evitar el temido *callback hell*. Hoy en día, las promesas y `async/await` han simplificado enormemente el código asíncrono, haciéndolo más legible y mantenible.

![GIF de Ryu provocando los callback hell con un hadoken](/assets/es/blog/2023/un-respeto-a-los-viejitos/callback-hadoken.gif)

Pero las diferencias no acaban ahí. Aquí algunas comparaciones entre un proyecto Node.js de hace más de una década y uno actual:

- **Gestión de dependencias:** Antes, era común tener dependencias desactualizadas o incluso paquetes que ya no existen. Hoy, el ecosistema es más maduro, con herramientas como `npm audit` y actualizaciones automáticas.
- **Estructura de carpetas y modularidad:** Los proyectos antiguos solían tener estructuras menos organizadas, mientras que ahora es habitual seguir convenciones claras y separar responsabilidades.
- **Testing:** Hace años, los tests eran escasos o inexistentes. Ahora, la cultura del testing está mucho más extendida y existen herramientas como Jest, Mocha o Vitest que facilitan la integración continua.
- **Estilo de código:** El uso de linters y formateadores era raro. Hoy, herramientas como ESLint y Prettier son estándar.
- **Documentación:** Antes, la documentación era mínima o solo existía en la cabeza de quien programaba. Ahora, se valora mucho más y existen herramientas para mantenerla actualizada.
- **Seguridad:** La seguridad era un aspecto menos considerado. Actualmente, hay más conciencia y herramientas para detectar vulnerabilidades.


En definitiva, trabajar con software legacy es una oportunidad para aprender, para entender el pasado y para mejorar el futuro. Es un acto de respeto hacia quienes vinieron antes y una responsabilidad hacia quienes vendrán después. Si tienes la suerte de poder dedicar tiempo a entender ese código, añadir tests y modernizarlo poco a poco, no solo estarás mejorando el proyecto, sino también tu propia perspectiva como desarrollador.

Así que, la próxima vez que te toque lidiar con un "viejito", recuerda: si está ahí, es porque ha sobrevivido al tiempo y sigue aportando valor. Y eso, en el mundo del software, es digno de admiración.
