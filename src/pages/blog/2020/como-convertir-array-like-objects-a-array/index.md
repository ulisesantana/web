---
title: Cómo convertir array-like objects a array
date: 2020-10-10
description: En JavaScript existen los array-like objects que pueden parecerse a un array e incluso algunos se pueden iterar, pero no tienen el mismo comportamiento que un array. Por ello en ocasiones es necesario convertirlo en un array para poder trabajar mejor con ellos.
tags: [javascript,array,array-like objects]
cover: ./thumbnail.png
draft: false
---

{% renderTemplate "webc" %}
<tldr-section>

Estas son las tres maneras posibles de convertir un array-like object a array en JavaScript, siendo el `Array.prototype.slice` el que mejor rendimiento ofrece:

```js
const charsArray = Array.prototype.slice.call('Hola Mundo!')
const charsArray2 = Array.from('Hola Mundo!')
const charsArray3 = [...'Hola Mundo!']
```

</tldr-section>
{% endrenderTemplate %}

En JavaScript existen los array-like objects que pueden parecerse a un array e incluso algunos se pueden iterar,
pero no tienen el mismo comportamiento que un array. Por ello en ocasiones es necesario convertirlo en un array para
poder tener a acceso a métodos tan útiles como Array.filter.

**Se considera un array-like object todo objeto que tiene propiedades cuyas claves son números y tienen una propiedad length.**
Algunos array-like objects también incluyen [el protocolo iterable](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Iteration_protocols)
que les permiten ser iterados por un bucle *for of*, como por ejemplo los
[NodeList](https://developer.mozilla.org/es/docs/Web/API/NodeList), el [objeto arguments](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/arguments)
o cualquier String. Estos casos en concreto pueden llevar a errores durante el desarrollo, ya que se pueden acceder por índice, tienen propiedad *length* y se pueden iterar en un *for of*,
pero carecen del resto de métodos del prototipo Array. Por lo que si intentas hacer un Array.includes, Array.filter o
cualquier otro método del prototipo Array te explotará en la cara. También comentar que existen otros elementos en JavaScript
como [Set](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Set) y
[Map](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map) que son iterables y se les
puede considerar también como array-like objects. Podemos decir que **todo iterable es un array-like object, pero no todo
array-like object es un iterable.**

## Antes de ES2015

**Antes de ES2015** sólo existía una manera de pasar un array-like object a array, usando **Array.prototype.slice.** Concretamente
tenemos que usar el prototipo y llamar al método [*Function.prototype.call*](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/call)
del método *Array.prototype.slice:*

```js
const charsArray = Array.prototype.slice.call('Hola Mundo!')
// [].slice.call('Hola Mundo!') da el mismo resultado
console.log(charsArray) // [ 'H', 'o', 'l', 'a', ' ', 'M', 'u', 'n', 'd', 'o', '!' ]
```

Por otro lado, en el caso de String, también se puede usar el método *String.split* pasar de array-like object a array:

```js
const charsArray = 'Hola Mundo!'.split('');
console.log(charsArray) // [ 'H', 'o', 'l', 'a', ' ', 'M', 'u', 'n', 'd', 'o', '!' ]
```


## A partir de ES2015

Con ES2015 JavaScript dió un gran salto gracias a la gran cantidad de nuevas características dentro del lenguaje que
llegaron para facilitar el desarrollo y también atraer a nuevos desarrolladores a JavaScript. Entre todas las novedades
que llegaron con este nuevo estándar hay dos que permitieron facilitar el paso de array-like objects a array:
**Array.from** y la sintaxis extendida o syntax spread, también conocida como **spread operator**.

### Array.from

*Array.from* funciona exactamente de la misma manera que *Array.prototype.slice*, pero sin necesidad de invocar
*Function.prototype.call*:
```js
const charsArray = Array.from('Hola Mundo!')
console.log(charsArray) // [ 'H', 'o', 'l', 'a', ' ', 'M', 'u', 'n', 'd', 'o', '!' ]
```

### Sintaxis extendida (Spread operator)

La sintaxis extendida permite a los iterables expandirse dentro de un array junto a más elementos o en el
caso de objetos literales expandir sus claves y valores junto con otros objetos. En otras palabras, nos permite combinar
tanto arrays e iterables entre sí como también objetos literales entre sí, además de también poder extenderlos.
```js
const charsArray = [...'Hola Mundo!']
console.log(charsArray) // [ 'H', 'o', 'l', 'a', ' ', 'M', 'u', 'n', 'd', 'o', '!' ]
```

## Benchmark

Después de haber visto estás opciones podríamos usar la forma que más nos convenza o más clara nos parezca y aplicarla
donde necesitemos. Sin embargo, estas tres opciones difieren en cuanto a rendimiento y en algunos casos usar una u otra
opción puede hacer que el programa que escribimos sea más o menos eficiente. Déjame mostrarte el resultado sacado de este
[proyecto](https://github.com/ulisesantana/benchmark-js/blob/master/benchmark/arrays/arrayLikeToArray.js) en el que hago
benchmarking sobre funcionalidades de JavaScript:


```text
Results for Converting array-like object with 100 elements to array
┌───────────────────────┬─────────────────┬─────────────────────┬─────────┐
│        (index)        │ totalIterations │ perSecondIterations │  diff   │
├───────────────────────┼─────────────────┼─────────────────────┼─────────┤
│      Array.from       │   '1.240.975'   │      '384.321'      │  '0%'   │
│    Spread operator    │   '1.257.741'   │      '380.441'      │ '1.01%' │
│ Array.prototype.slice │   '1.175.874'   │      '362.141'      │ '5.77%' │
└───────────────────────┴─────────────────┴─────────────────────┴─────────┘


Results for Converting array-like object with 1000 elements to array
┌───────────────────────┬─────────────────┬─────────────────────┬─────────┐
│        (index)        │ totalIterations │ perSecondIterations │  diff   │
├───────────────────────┼─────────────────┼─────────────────────┼─────────┤
│ Array.prototype.slice │    '126.923'    │      '40.064'       │  '0%'   │
│    Spread operator    │    '117.857'    │      '36.612'       │ '8.62%' │
│      Array.from       │    '120.474'    │      '36.551'       │ '8.77%' │
└───────────────────────┴─────────────────┴─────────────────────┴─────────┘


Results for Converting array-like object with 10000 elements to array
┌───────────────────────┬─────────────────┬─────────────────────┬─────────┐
│        (index)        │ totalIterations │ perSecondIterations │  diff   │
├───────────────────────┼─────────────────┼─────────────────────┼─────────┤
│ Array.prototype.slice │     '6.333'     │       '1.904'       │  '0%'   │
│      Array.from       │     '5.989'     │       '1.837'       │ '3.52%' │
│    Spread operator    │     '6.021'     │       '1.830'       │ '3.89%' │
└───────────────────────┴─────────────────┴─────────────────────┴─────────┘


Results for Converting array-like object with 100000 elements to array
┌───────────────────────┬─────────────────┬─────────────────────┬─────────┐
│        (index)        │ totalIterations │ perSecondIterations │  diff   │
├───────────────────────┼─────────────────┼─────────────────────┼─────────┤
│ Array.prototype.slice │      '539'      │        '162'        │  '0%'   │
│      Array.from       │      '493'      │        '149'        │ '8.02%' │
│    Spread operator    │      '492'      │        '149'        │ '8.02%' │
└───────────────────────┴─────────────────┴─────────────────────┴─────────┘


Results for Converting array-like object with 500000 elements to array
┌───────────────────────┬─────────────────┬─────────────────────┬──────┐
│        (index)        │ totalIterations │ perSecondIterations │ diff │
├───────────────────────┼─────────────────┼─────────────────────┼──────┤
│ Array.prototype.slice │      '87'       │        '25'         │ '0%' │
│      Array.from       │      '81'       │        '24'         │ '4%' │
│    Spread operator    │      '80'       │        '24'         │ '4%' │
└───────────────────────┴─────────────────┴─────────────────────┴──────┘
```

Por lo que vemos en los resultados, *Array.from* y la sintaxis extendida (spread operator) tienen rendimientos similares,
aunque de nada que pasamos a una lista de 1.000 elementos *Array.prototype.slice* se mantiene como la opción con mejor
rendimiento. La diferencia no es abismal, pero es bueno saber que el viejo *Array.prototype.slice* es la mejor opción
si necesitas afinar el rendimiento del proceso al máximo y sabes que te vas a enfrentar a listas de más de 100 elementos.
