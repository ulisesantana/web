---
title: Introducción al Array de JavaScript
date: 2021-09-20
description: Durante los últimos 5 años los arrays en JavaScript han experimentado muchas mejoras. Te muestro algunas de ellas en esta entrada.
tags: [javascript, arrays, basics]
cover: ./js-arrays-basic.png
draft: true
---


## La mutabilidad del array en JavaScript

Un array puede ser mutado tanto en su longitud como en sus valores.

<js-repl title="Mutando la longitud de un array" init="['const array = []','array[0] = 1','array','array[4] = 5','array','array.length','array.length = 0','array','array.length']"></js-repl>

Como has podido ver en el último caso, si alteras la propiedad length puedes incluso borrar el contenido del array. Para hacer un array inmutable deberíamos *congelarlo* con el método estático `Object.freeze`

<js-repl title="Haciendo un array inmutable"   init="['const array = Object.freeze(Array(1,2,3,4))','array.push(5)','array[0] = 0','array.length = 0','array']">
</js-repl>

También existen métodos del prototipo Array que mutan el contenido del array:
- [copyWithin](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin): copia una parte del array en otra posición modificando los elementos, pero no su longitud.
- [fill](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/fill): asigna un valor a todos los elementos de un array.
- [pop](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/pop): elimina el último elemento de un array y lo devuelve.
- [push](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/push): añade uno o varios elementos al final del array y devuelve la nueva longitud del array.
- [reverse](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse): invierte el orden del array.
- [shift](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/shift): elimina el primer elemento de un array y lo devuelve.
- [sort](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort): ordena el array.
- [splice](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice):
- [unshift](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift): añade uno o varios elementos al principio del array y devuelve la nueva longitud del array.

## Cómo clonar un array en JavaScript

En más de una ocasión querrás trabajar con un array, pero sin mutar la copia original, por lo que tendrás que hacer una copia o clonarlo. Existen varias formas de hacerlo:

### Usando Array.from

Como habíamos visto a la hora de crear un array se puede usar Array.from, ya que acepta cualquier cosa que se parezca a un array y crea una nueva instancia del mismo.

```js
const array = [1, 2, 3, 4, 5]
const array2 = Array.from(array)

array2[0] = 'foo'

console.table({'Array original': array, 'Array clonado': array2})
/**
┌────────────────┬───────┬───┬───┬───┬───┐
│    (index)     │   0   │ 1 │ 2 │ 3 │ 4 │
├────────────────┼───────┼───┼───┼───┼───┤
│ Array original │   1   │ 2 │ 3 │ 4 │ 5 │
│ Array clonado  │ 'foo' │ 2 │ 3 │ 4 │ 5 │
└────────────────┴───────┴───┴───┴───┴───┘
*/

const array3 = array

array3[0] = 'bar'

console.table({'Array original': array, 'Array copiado': array3})
/**
┌────────────────┬───────┬───┬───┬───┬───┐
│    (index)     │   0   │ 1 │ 2 │ 3 │ 4 │
├────────────────┼───────┼───┼───┼───┼───┤
│ Array original │ 'bar' │ 2 │ 3 │ 4 │ 5 │
│ Array copiado  │ 'bar' │ 2 │ 3 │ 4 │ 5 │
└────────────────┴───────┴───┴───┴───┴───┘
*/
```
La diferencia entre *array2* y *array3* es que *array2* se crea a partir de una nueva instancia de Array basándose en *array*, mientras que *array3* copia la referencia en memoria de *array*. De esta manera, cualquier mutación en *array3* hará que *array* mute también y viceversa.

### Rest operator


## Formas de recorrer un array

### for

El clásico

### forEach

### for of
Esta forma de recorrer arrays (realmente recorre iterables, pero eso lo explicaré otro artículo) llegó con ES2015 y hace muy cómodo recorrer listas de valores.

### Comparativa con benchmark




