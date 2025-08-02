---
title: Aprendí a programar en un chromebook
cover: /assets/es/blog/2025/aprendi-a-programar-en-un-chromebook/cover.png
date: 2025-08-02
description: Mis inicios en la programación vinieron de manos de un chromebook que tuve que manipular para poder tener un linux en el que poder realmente programar. Las limitaciones son el alimento de la creatividad.
tags: [chromebook]
draft: false
coverCopyright: null
---

Cuando empecé a programar, allá por 2015, no tenía un ordenador potente, ni siquiera un portátil normal. Lo que tenía era un Chromebook, un dispositivo que en teoría estaba diseñado para navegar por internet y usar aplicaciones web. Era más una tablet que un portátil y no tenía presupuesto para un portátil decente. Lo único que tenía era un *Chromebook Acer C720*, una máquina muy básica con:

- Procesador Intel Celeron 2955U a 1.4 GHz
- 4GB de RAM
- 32GB de almacenamiento SSD
- Pantalla de 11,6 pulgadas
- Cero expectativas de convertirse en una máquina de desarrollo

Y sin embargo, lo fue.

## Hackeando mi primer chromebook: el tornillo de la libertad

Los Chromebooks no están pensados para instalar Linux así como así. Tenía que *hackearlo* para hacerlo mínimamente útil para desarrollo. Literalmente: tuve que abrirlo con destornillador y quitar *un tornillo de seguridad* que impedía el modo escritura del firmware. Lo quité siguiendo un tutorial de un foro sin tener muy claro qué estaba haciendo. Era todo esperanza. La esperanza de no dejar el Chromebook como un pisapapeles.

<img-caption src="/assets/es/blog/2025/aprendi-a-programar-en-un-chromebook/c720-chromebook-board.png" alt="Placa del Chromebook C720 en el que se pueden ver los diferentes tornillos y componentes. El tornillo que tuve que quitar es el que está marcado con un 7">
Placa del Chromebook C720. El tornillo que tuve que quitar es el que está marcado con un 7. Un pequeño tornillo que separaba la frustración de las posibilidades infinitas.
</img-caption>

Tras eso, activé el Developer Mode, y le metí [*Crouton*](https://github.com/dnschneid/crouton), que básicamente te permite correr Linux (Ubuntu, en mi caso) como una especie de VM dentro de ChromeOS. Limitado, sí, pero funcional. Lo bastante como para tirar de *IntelliJ*, aunque todo fuera a pedales. Además, recalco que eran 32GB de almacenamiento SSD, así que no es que hubiera mucho espacio para instalar cosas. Era un linux muy minimalista, con lo justo para programar.

Ese era mi único ordenador. Un Chromebook con Linux corriendo en una VM, y aún así, me las arreglé para aprender a programar. Con ese Chromebook aprendí JavaScript, HTML, CSS, y más tarde, Node.js. Aprendí a usar Git, a hacer mis primeros proyectos y a colaborar en otros. Con ese Chromebook pasé la mayoría de los 2 años que duró el ciclo superior de Desarrollo de Aplicaciones Web.

Las limitaciones no fueron mi enemigo, fueron mi maestro. Me enseñaron a ser eficiente con los recursos, a valorar cada megabyte de almacenamiento, a optimizar el código no por hobby sino por necesidad. **Las limitaciones son el alimento de la creatividad**, y ese Chromebook me enseñó a ser creativo con lo que tenía.

## Mi primera hackathon: Moneyball en tiempo real

Con esa especie de tablet vitaminada fui a una hackathon que organizaban en Las Palmas. Allí me uní al equipo de un estadounidense con una idea que me llamó mucho la atención: *usar iPhones distribuidos por una cancha de baloncesto para analizar partidos en tiempo real*. Triangulación, estadísticas, toma de decisiones sobre la marcha… puro [*Moneyball*](https://en.wikipedia.org/wiki/Moneyball_(film)), pero en vivo y en directo. Además de ser barato, porque tres iPhones de segunda mano eran más asequibles que un sistema profesional de análisis de partidos.

Yo me encargué de la web. Mientras que el americano se curró una prueba de concepto a la cual le pasabas un vídeo y era capaz de reconocer el movimiento de la pelota, sentando las bases del producto que estábamos planteando. Al final ganamos el primer premio de la hackathon, aunque la startup no salió adelante por falta de financiación.

### El gesto que me cambió la perspectiva

Antes de quedarnos sin opciones de financiación, seguíamos reuniéndonos semanalmente para trabajar en el producto, los siguientes pasos, ir a eventos, hacer contactos y demás. En uno de esos eventos pasó algo curioso. Necesitábamos formatear un pendrive, pero mi entorno Linux no tenía acceso completo al hardware porque, como dije antes, era más una VM dentro de ChromeOS que un sistema real. Y yo no tenía ni idea de cómo solucionarlo.

El americano, días después, me llevó a *El Corte Inglés* y me dijo que eligiera un portátil. Yo flipé lo que no está escrito. Elegí un Acer de gama alta al que le iba a meter Ubuntu. Él lo pagó sin pensarlo. Dijo: _"No puede ser que estemos intentando montar una startup y tú no tengas un ordenador de verdad."_

Ese gesto me marcó profundamente. No solo por la generosidad, sino por lo que representaba: reconocer el potencial en alguien y apostar por él sin esperar nada a cambio.

### Pay it forward: el ciclo de la generosidad

Más adelante, cuando por fin me compré mi primer MacBook, decidí regalar ese portátil a un amigo que lo necesitaba más que yo. Era una forma de continuar el gesto que tuvo aquel americano conmigo. Porque creo firmemente en el concepto de *pay it forward*: cuando alguien te ayuda sin esperar nada a cambio, tu responsabilidad no es devolvérselo a esa persona, sino ayudar a otra que lo necesite.

## La evolución: mi segundo Chromebook

A pesar de todo, le cogí cariño al Chromebook. Era *pequeño, ligero, manejable*. Un buen compañero de aventuras. Tanto fue así que, con el tiempo, acabé pillándome otro: el *Acer Chromebook R11*.

Este era un paso adelante: ya traía *soporte nativo para aplicaciones Linux*, algo similar a WSL en Windows, y además permitía instalar apps de Android. Más versátil, menos parches para que funcionara todo.

Con ese segundo Chromebook, compilé Node.js desde cero en 2018 (sí, se puede, aunque hay que tener fe, café y paciencia) y también di mi primera charla en un evento, el JSDay Canarias 2018.

<img-caption src="/assets/es/blog/2025/aprendi-a-programar-en-un-chromebook/chromebook-node-conf-2018.jpeg" alt="El chromebook R11 compilando Node.js en la NodeCONF EU 2018">
Mi Chromebook R11 compilando Node.js en la NodeCONF EU 2018. Tardó casi 2 horas, pero lo conseguimos. A veces la paciencia es la virtud más importante de un programador.
</img-caption>

## Reflexiones de un programador que empezó con limitaciones

Mirando atrás, ese Chromebook me enseñó lecciones que ningún MacBook Pro de última generación me habría enseñado. Me enseñó que la programación no es sobre tener el mejor hardware, sino sobre resolver problemas con lo que tienes. Me enseñó que las limitaciones no son excusas, son oportunidades de ser más ingenioso.

Hoy en día, cuando veo a estudiantes preocupados porque no tienen el último modelo de portátil o la configuración perfecta para empezar a programar, les recuerdo mi historia aunque suene como el abuelo de turno. No necesitas una máquina perfecta para escribir código perfecto. Solo necesitas curiosidad, paciencia y las ganas de convertir cada obstáculo en una oportunidad de aprender algo nuevo.

**Las mejores historias no nacen de las mejores condiciones, sino de la determinación de hacer algo extraordinario con lo ordinario.** Mi Chromebook fue mi compañero de aventuras durante los años más formativos de mi carrera, y por eso siempre tendrá un lugar especial en mi memoria y en mi corazón.

Muchas veces lo importante no es lo que tienes, sino lo que haces con ello.
