---
title: Introducción al Array Destructuring en JavaScript
date: 2021-10-09
description: El destructuring es una funcionalidad que se añadió a JavaScript en ES2015 y que desde que llegó se ha convertido en un recurso increíblemente útil.
tags: [javascript, arrays, basics]
slug: array-destructuring
cover: cover.png
draft: false
---

## Conceptos básicos

El concepto de *destructuring* (*desestructuración* en español) es algo que vino con ES2015 y que no aplica sólo a arrays, sino también a objetos, aunque en este artículo nos centraremos en el *array destructuring*. El *array destructuring* es un método simplificado de extraer múltiples propiedades de un array tomando la estructura y deconstruyéndola a través de asignaciones usando una sintaxis similar a los arrays literales. El *destructuring* de array se basa en las posiciones para hacer la asignación.

```javascript
const [one, two, three] = [1,2,3]
```

<js-repl
  title="Ejemplo de destructuring"
  load-to-scope="['const [one, two, three] = [1,2,3]']"
  init="['one','two','three']">
</js-repl>


En caso de que vayas a hacer *destructuring* de una posición para la que el array no tiene ningún valor asignado devolvería `undefined`:
```javascript
const [one, two, three, four] = [1,2,3]
```

<js-repl
  title="Ejemplo de destructuring"
  load-to-scope="['const [one, two, three, four] = [1,2,3]']"
  init="['one','two','three','four']">
</js-repl>

Estamos hablando de *destructuring* de array, pero realmente se puede aplicar a cualquier [*iterable*](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Iteration_protocols), como por ejemplo una cadena de texto o un *Set*.

```javascript
const [firstLetter] = 'Hello World!'
const [x, y, z] = new Set([1,1,1,2,2,3])
```

<js-repl
  title="Ejemplo de destructuring de un iterable"
  load-to-scope="['const [x, y, z] = new Set([1,1,1,2,2,3])', `const [firstLetter] = 'Hello World!'`]"
  init="['firstLetter','x','y','z']">
</js-repl>

El *destructuring* también se puede hacer con arrays anidados:

```javascript
const [[one, two], [three, four], [five, six]] = [[1,2], [3,4], [5,6]]
```

<js-repl
  title="Ejemplo de destructuring de un array anidado"
  load-to-scope="['const [[one, two], [three, four], [five, six]] = [[1,2], [3,4], [5,6]]']"
  init="['one','two','three','four','five','six']">
</js-repl>

## Valores por defecto

En caso de que no exista la posición de la que vamos a hacer *destructuring* podemos asignar un valor por defecto y así poder evitar cualquier resultado inesperado al recibir `undefined`:

```javascript
const [one = 0, two = 0, three = 0, four = 0] = [1,2,3]
```

<js-repl
  title="Ejemplo valor por defecto en destructuring"
  load-to-scope="['const [one = 0, two = 0, three = 0, four = 0] = [1,2,3]']">
</js-repl>

Si no tuviéramos esa asignación por defecto el resultado de `total` hubiera sido diferente:
```javascript
const [one, two, three, four] = [1,2,3]
```

<js-repl
  title="Ejemplo valor por defecto en destructuring"
  load-to-scope="['const [one, two, three, four] = [1,2,3]']"
  init="['one','two','three','four','const total = one + two + three + four']">
</js-repl>

También podemos hacer que el valor por defecto sea alguno de los valores que de los que ya hayamos hecho *destructuring*:

```javascript
const [one, two, three, four = one] = [1,2,3]
```

<js-repl
  title="Ejemplo valor por defecto en destructuring"
  load-to-scope="['const [one, two, three, four = one] = [1,2,3]']"
  init="['one','two','three','four','const total = one + two + three + four']">
</js-repl>


## Ignorando valores

En caso de que existe algún valor que no te interese te lo puedes saltar y JavaScript no se quejará:

```javascript
const [one, , three] = [1,2,3]
```

<js-repl
  title="Ejemplo de destructuring ignorando valores"
  load-to-scope="['const [one, , three] = [1,2,3]']"
  init="['one','three']">
</js-repl>

Como vemos no hay ningún error, pero yo prefiero usar las barras bajas para declarar variables que no se van a usar. Es una práctica común y aceptada que mejora la legibilidad, ya que a primera vista cuesta ver que te estás saltando un elemento.


```javascript
const [one, _, three] = [1,2,3]
```

<js-repl
  title="Ejemplo de destructuring ignorando valores"
  load-to-scope="['const [one, _, three] = [1,2,3]']"
  init="['one','three']">
</js-repl>

## Uso con funciones

Otra forma de usarlo es haciendo destructuring directamente en los parámetros de una función. Esto lo hago mucho cuando uso `Object.entries`, ya que me permite iterar cómodamente por las claves y los valores de un objeto.


```javascript
function buildQueryParams(data) {
  return Object.entries(data)
    .reduce(
      (query, [key, value], index) => `${query}${index > 0 ? '&' : '' }${key}=${value}`,
      '?'
    )
    .replaceAll(/\s/g,'%20')
}
```
<js-repl
  title="Ejemplo de destructuring en los parámetros de una función"
  load-to-scope="['const buildQueryParams = data => Object.entries(data).reduce((query, [key, value], index) => `${query}${index > 0 ? \'&\' : \'\' }${key}=${value}`,\'?\').replaceAll(\' \',\'%20\')']"
  init="[`buildQueryParams({name:'Ulises',age:'32',position:'JavaScript Freak'})`]">
</js-repl>

Esto es sólo un ejemplo para mostrarte cómo podrías usar el *destructuring* en los parámetros de una función. Si realmente necesitas generar los *query params* para tu aplicación usa [URLSearchParams](https://developer.mozilla.org/es/docs/Web/API/URLSearchParams).

## Rest parameters y spread operator

El operador elipsis (los famosos tres puntitos: ...) entró en JavaScript con ES2015 y significa una cosa u otra dependiendo de si usa para la declaración o la asignación de una variable. Cuando lo usamos para declarar variables o parámetros de una función se conoce como *rest parameters* y cuando se usa para asignar estamos hablando del *spread operator*. No se usa sólo con *array destructuring*, sino también con *object destructuring*, pero como he dicho anteriormente, en este artículo nos centraremos en el *array destructuring*.

Los *rest parameters* se usan para agrupar todos los elementos restantes del array en una variable. Es como decir *quiero esto, aquello y lo otro y el resto me lo pones en un tupper para llevar*.
```javascript
const [monday, ...restOfTheWeek] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
```

<js-repl
  title="Ejemplo de rest parameters"
  load-to-scope="[`const [monday, ...restOfTheWeek] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']`]"
  init="['monday','restOfTheWeek']">
</js-repl>

Es importante tener en cuenta que la variable en la que hagamos uso del operador elipsis debe ser la última, ya que si no lo es nos lanzará un bonito *SyntaxError*.

<js-repl
  title="Ejemplo de error de sintaxis con rest parameters"
  init="[`const [monday, ...restOfTheWeek, sunday] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']`]">
</js-repl>

Por otro lado, el *spread operator* hace todo lo contrario. Si *rest parameters* agrupa, el *spread operator* divide. Esto puede ser útil para combinar dos arrays por ejemplo. También se suele usar mucho para clonar arrays, ya que al usarlo genera un nuevo array de cero, en vez de hacer referencias a memoria:

```javascript
const workdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const weekend = ['Sábado', 'Domingo']
const week = [...workdays, ...weekend]
```

<js-repl
  title="Ejemplo de spread operator"
  load-to-scope="[`const workdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']`,`const weekend = ['Sábado', 'Domingo']`,`const week = [...workdays, ...weekend]`]"
  init="['week', `week[0] = 'Viernes'`, `week[0]`, `workdays[0]`]">
</js-repl>

Si te ayuda a verlo mejor, también podemos decir que es *rest operator* cuando está a la izquierda del `=` en la asignación de una variable y *spread operator* cuando está a la derecha. Sin embargo, esto no es del todo cierto, ya que el operador elipsis se puede usar en los parámetros de una función (actuando como *rest parameter*) o al devolver un valor (actuando como *spread operator*).

```javascript
function add(...numbers) {
  return numbers.reduce((total, number) => total + number)
}
```

<js-repl
  title="Ejemplo de rest parameter en una función"
  load-to-scope="['const add = (...numbers) => numbers.reduce((total, number) => total + number']"
  init="['add(1,1)','add(1,2,3,4,5)']">
</js-repl>

En este ejemplo lo que hace el operador elipsis es actuar como *rest parameter* agrupando todos los parámetros que nos vengan por función en un array, permitiéndonos tener una función cuyo número de parámetros es variable. En este otro ejemplo vemos como usando el operador elipsis al devolver un valor en una función:

 ```javascript
 function reverse(arrayOfThings) {
   return arrayOfThings.reduce((result, element) => [element, ...result], [])
 }
 ```

 <js-repl
  title="Ejemplo de spread operator en una función"
  load-to-scope="['const reverse = (arrayOfThings) => arrayOfThings.reduce((result, element) => [element, ...result], [])']"
  init="['const fromFiveToOne = reverse([1,2,3,4,5])']">
</js-repl>


## Conclusión

El *array destructuring* es una funcionalidad muy potente en JavaScript, ya que permite gestionar arrays de una manera más cómoda y legible. Además, ha sido ampliamente acogida por la comunidad, ya que su uso sólo aporta ventajas. Espero haberte ayudado a comprender mejor esta característica de JavaScript.
