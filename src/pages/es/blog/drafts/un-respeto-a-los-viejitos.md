---
title: Un respeto a los viejitos
date: 2023-03-01
description: A nadie le gusta trabajar en un proyecto legacy, pero tenemos que entender qué conlleva trabajar en un proyecto legacy.
tags: [software,legacy]
coverCopyright: Foto de <a href="https://unsplash.com/@vladsargu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vlad Sargu</a> en <a href="https://unsplash.com/es/fotos/ItphH2lGzuI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
draft: true
---

Por lo general cuando dices que estás trabajando en un proyecto *legacy* la gente te dice con la mirada cosas del tipo *no todos los héroes llevan capa* o les da la sensación de que mi día a día es como sobrevivir en Vietnam.

![GIF de un perro con estrés post-traumático de Vietnam](/assets/es/blog/2023/un-respeto-a-los-viejitos/stains-vietnam.gif)

Sin embargo, para mí la experiencia en el último proyecto legacy que he trabajado ha sido diferente. Se trata de un proyecto de Node.js que tiene más de 10 años. Estamos hablando de un proyecto que nació casi con Node.js y que hoy en día sigue usándose activamente. Para mí no hay mejor manera de explicar este proyecto:

<img-caption src="/assets/es/blog/2023/un-respeto-a-los-viejitos/mountain-strata.jpeg" alt="Una montaña con diferentes estratos">
La formación Yesera en Argentina
</img-caption>

Al final depende de la parte del proyecto en la que te metas verás prácticas que se usaban en 2010 y que hoy en día son más raras de ver porque el lenguaje a evolucionado. ¿Un ejemplo? Las promesas. Antes toda la asincronía se gestionaba con callbacks o apoyándose en la librería async para tratar de minimizar los *callback hells*.

![GIF de Ryu provocando los callback hell con un hadoken](/assets/es/blog/2023/un-respeto-a-los-viejitos/callback-hadoken.gif)