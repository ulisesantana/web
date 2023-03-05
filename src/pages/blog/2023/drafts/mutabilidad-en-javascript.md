---
title: "Mutabilidad en JavaScript: primitivo VS referencia"
date: 2021-10-09
description: JavaScript puede ser un pelín especial a la hora de copiar variables dando resultados que no esperamos o que a primera vista no son consistentes. Descubre cómo evitar mutaciones inesperadas en este artículo
tags: [javascript,basics]
cover: ../../preview.png
draft: true
---

En JavaScript a veces pasan cosas que no esperamos cuando estamos copiando valores, ya que cuando creas una variable a partir de otra esperas que sean dos variables diferentes con el mismo valor. Sin embargo, lo que pasa realmente es que tienes dos variables cuyo valor está asignado a la misma posición de memoria.

Antes de ahondar en esto tenemos que tener claro que en JavaScript una variable puede almacenar dos tipos de valores: primitivos y referencia. Los tipos primitivos en JavaScript son:

  1. `undefined`
  1. `null`
  1. `boolean`
  1. `number`
  1. `string`
  1. `symbol`

Por otro lado, todo lo que no sea un tipo primitivo se considera un tipo por referencia, que mayormente es todo lo que acabe siendo tipo `object` (a excepción de `null`).

Los valores primitivos tienen un tamaño fijo y JavaScript los almacena directamente en el *call stack*. El *call stack*, traducido literalmente como *pila de llamadas*, es una de las partes del *event loop* concretamente la que ejecuta el código JavaScript. 

En contraste, los valores asignados por referencia JavaScript los almacena en el *heap*

Si quieres saber más sobre los conceptos de *call stack*, *heap* o *event loop* y quieres saber más de ellos te recomiendo que le eches un ojo a [esta página de MDN](https://developer.mozilla.org/enUS/docs/Web/JavaScript/EventLoop).

Pese a que da la sensación de que estamos todo el rato creando variables nuevas, realmente esto no es así, estamos todo el tiempo tirando de referencias en memoria. Esto quiere decir que si una variable que hemos creado por destructuring la modificamos, modificaremos también el valor en el array original. De todos modos, esto tiene sus excepciones. Cuando en JavaScript estamos trabajando con valores primitivos (cadenas de texto, números o booleanos) estos sí que crean copias nuevas cuando los asignamos

No pasa sólo al declarar variables, sino también al pasarlas por parámetro en una función.


## Solución

Use el operador elipsis

## Solución con objetos y arrays anidados

Vas a tirar de recursividad o si puedes volver a tener el mismo problema.
