---
title: Mi top 5 de métodos Array de JavaScript
date: 2021-11-10
description: Continuamente estoy trabajando con listas de datos y he acabado descubriendo formas de trabajar con los arrays en JavaScript que molan mucho. En este artículo te muestro mis 5 métodos favoritos del Array de JavaScript.
tags: [javascript,array,node.js]
cover: ../../preview.png
draft: true
---

La realidad es que en el día a día mayormente trabajo con listas de datos. Es muy raro que trabaje con algún dato que al final no acabe o salga de un array. Por esto, con el paso del tiempo he ido usando cada uno de los diferentes métodos que tiene el prototipo de Array en JavaScript. La finalidad de este artículo es compartir contigo cuáles me parecen más útiles.

## Callback básico de gestión de arrays en JavaScript

(element, index, array) => { ... }

## Array.some

Comencemos con `Array.some`, este método

## Array.every
## Array.map
## Array.filter
## Array.reduce

## Extra: Array.at

Este método oficialmente todavía no es parte del estándar de EcmaScript, pero es muy probable que salga en ES2022. De todos modos, en la fecha en la que se escribe este artículo ya está disponible en V8, haciéndolo disponible en las últimas versiones de los navegadores basados en Chromium y en Node.js a partir de la versión 16.6.0.

Aunque parezca una tontería, este método nos permite acceder a una posición concreta del array. Seguro que pensarás que al final esto es lo que ya puedes hacer desde hace años:

<JavaScriptRepl
  title="Ejemplo de Array.at"
  init={[
    "const list = [1,2,3,4,5]",
    "list[0]",
    "list.at(0)",
  ]}
/>

Sin embargo, donde brilla `Array.at` es cuando queremos acceder al último o penúltimo elemento:

<JavaScriptRepl
  title="Ejemplo de Array.at"
  loadToScope={["const list = [1,2,3,4,5]",]}
  init={[
    "list[list.length - 1]",
    "list[list.length - 2]",
    "list.at(-1)",
    "list.at(-2)",
  ]}
/>

Es un método simple, pero que nos permite escribir un código más legible. Aunque todo el mundo pueda entender `list[list.length - 1]`, es más fácil de leer `list.at(-1)`, además de más rápido de escribir.

Si alguno de los ejemplos no se te muestra correctamente necesitarás ver este artículo en un navegador compatible o ejecutar el código con la última versión de Node.js.
