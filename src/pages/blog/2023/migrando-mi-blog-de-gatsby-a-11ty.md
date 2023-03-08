---
title: Migrando mi blog de Gatsby a 11ty
date: 2023-03-08
description: Hace un par de años monté mi web con Gatsby y le acabé añadiendo un blog. Déjame contarte cómo y por qué acabé migrándolo a 11ty.
tags: [11ty,legacy]
draft: true
coverCopyright: null
---

En 2019 decidí que ya era hora de tener una web decente. En ese entonces trabajaba muchísimo con [React]() y [Gatsby]() parecía una gran opción para montarme una web rápidamente. Además, en [theme forest]() habían plantillas de Gatsby que podía comprar para acelerar el proceso. No parecía un mal plan y la verdad es que por 50$ quitarme todo el trabajo de diseñar una web junto con su blog me parecía bastante rentable. 

En fin me acabé poniendo manos a ello y creé mi web, al principio sin blog. Había comprado la plantilla y la había adaptado para que no fuera tal cual la compré, sino que tuviera un poco de mi estilo. La realidad es que le acabé metiendo muchísima mano e inviertiendo bastante tiempo. La web quedó a mi gusto y estaba bastante contento con el resultado final. Sin embargo, con el paso de los años [Gatsby]() siguió sacando versiones y los plugins que usaba mi web se estaban quedando obsoletos y tuve que migrar de Gatsby 2 a Gatsby 3. No fue un infierno, pero me hizo darme cuenta que tenía muy poco control sobre mi web. 

Al margen de la migración de versiones de Gatsby, me di cuenta de que se me hacía difícil hacer crecer la web, a veces incluso de mantenerla. Gatsby es muy potente, pero también tiene mucha magia negra por detrás 🧙‍♂️. A veces los flujos de datos se me complicaban un poco. Sin embargo, lo que más dolores de cabeza me daba es que la plantilla que había comprado seguía convenciones de código con las que no estaba de acuerdo, además de que la carpeta de componentes era un agujero negro en el que los sueños mueren. Estoy a favor de [Atomic Design](), pero no de tener componentes atómicos que solo se usan en un sitio.

La realidad es que el sentimiento que tenía a la hora de querer hacer cosas en mi web era negativo. La fricción que tenía con mi propia web no me gustaba así que decidí que había migrar a otro sistema. Como para ese entonces ya llevaba un par de meses usando Obsidian y gestionando mi cerebro digital, tenía claras un par de cosas. Mi web tenía que ser lo más *future proof* posible. Esto me parecía inviable con React de por medio, prefería buscar una alternativa que tuviera [*web components*]() de por medio. De esta manera, al basarse en un estándar el frontend que escribiera aguantaría mejor el paso del tiempo. Por otro lado, quería que todo lo que escribiera a nivel de contenido fueran ficheros markdown. En mi web con Gatsby tenía un buen lío entre ficheros .mdx y .tsx. Además, teniendo *web components* podía usarlos en mis archivos markdown, pero sin el dolor de cabeza de tener dependencias con React y MDX en general.

Tenía claro que es lo que quería, pero no tenía ni idea de con qué podía construirlo. Un día tomando un café con mi amiga [Alba](https://www.albaherrerias.dev/) me contó que su web se la había montado con [11ty]() y que estaba muy contenta. Antes había oído hablar de 11ty, pero no le había hecho caso. Resulta que viene a ser un [Jekyll](), pero basado en Node.js en vez de Ruby. Sonaba muy bien. Además, que todo fuera con Node.js era un gran punto a su favor. Curiosamente este no era su único punto a favor. El mismo creador de 11ty, **un fulano del cual pondré el nombre aquí**, había creado algo pensado para ser usado con 11ty: [WebC](https://github.com/11ty/webc). WebC, es una manera de tener *Single File Web Components* y poder usarlo como motor de plantillas como Nunjucks o Moustache.

Es la polla y no quiero volver atrás

Para las cosas complicadas he usado microfrontend. Por ahora es sólo un componente, pero mola saber que puedo usar React cuando lo necesite.

