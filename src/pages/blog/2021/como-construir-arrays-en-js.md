---
title: Cómo construir arrays en JavaScript
date: 2021-09-24
description: En JavaScript hay más de una forma de construir un array. En este artículo podrás ver a base de ejemplos cada una de las maneras posibles.
tags: [javascript, arrays, basics]
draft: false
---

{% renderTemplate "webc" %}
<tldr-section>

  Hay varias formas de crear arrays en JavaScript:

```javascript
// Array literal
["pizza", "sandwich"];

// Constructor de Array
// // Cuando tiene un único parámetro y es un número
// // se crea una array con la longitud que se l
// // ha pasado al constructor con todos los elementos vacíos
new Array(3); // [ , , ]
// // Con cualquier otro parámetro o con varios parámetros
// // crea un array con los parámetros pasados
// // (Usar new es completamente opcional)
Array(1, 2, 3, 4, 5); // [ 1, 2, 3, 4, 5 ]

// Array.from
// // Convierte un iterable o un array-like object en un array
Array.from("Hola!"); // ['H', 'o', 'l', 'a', '!']
Array.from(new Set([1, 2, 3, 4, 5, 4, 3, 2, 1])); // [ 1, 2, 3, 4, 5 ]
Array.from({ length: 4, 0: "foo" }); // [ 'foo', , , ]

// Array.of
// // Funciona igual que el constructor de Array
// // a excepción de que se comporta siempre igual.
// // Si le pasas un único parámetro y es un número
// // creará un array de un solo elemento con
// // el número que le has pasado como valor
Array.of(5); // [ 5 ]
```

</tldr-section>
{% endrenderTemplate %}

## ¿Qué es un array?

En JavaScript los arrays son objetos que contienen una lista de valores con métodos para poder recorrerla, mutarla o generar nuevas listas. Tanto su longitud como el tipo de elementos que contiene es variable. El array sigue el [protocolo iterable de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Iteration_protocols). Todo array es un iterable, pero no todo iterable es un array. Otros iterables en JavaScript son las cadenas de texto, Set, Map o los generadores.

## Cómo crear un array

Un array se puede crear de diferentes maneras:

### Expresando el array ([Array literals](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types#arreglos_literales))

Directamente expresando el array con los valores que queramos incluir. También al tener longitud variable podemos instanciarlo vacío para posteriormente rellenarlo, ya que el rellenarlo su longitud irá aumentando.

<js-repl
  title="Array literal"
  init="[`const food = ['pizza', 'sandwich']`,'food.length','const emptyArray = []','emptyArray.length']">
</js-repl>

### Usando el constructor Array

El constructor de Array se comporta de una manera u otra dependiendo del número y tipo de parámetros que reciba. Si le pasamos sólo un parámetro y este parámetro es un número, entonces instanciará un array con la longitud del número que le hayamos pasado y todos sus posiciones estarán vacías.

En caso de que le pasemos más de un parámetro o si el único parámetro que le pasamos no es un número, instanciará un nuevo array con los elementos que le hemos pasado y su longitud será igual al número de parámetros que le hemos pasado. Por cierto, usar la palabra reservada **_new_ es completamente opcional**.

<js-repl
  title="Constructor de Array"
  init="['const numberArray = new Array(5)',`const stringArray = new Array('foo')`,`const fibonacciNumbers = new Array(1,1,2,3,5,8,13)`]">
</js-repl>

### Array.from

Este método fue introducido en ES2015 y funciona a modo de factoría convirtiendo iterables y cosas parecidas a un array (también conocidos como array-like objects) como los NodeList a un array para poder usar sus métodos y trabajar con ellos con mayor comodidad.

<js-repl
  title="Array.from"
  init="[`const mapExample = new Map().set('first',1).set('second',2)`,`Array.from(mapExample)`,`Array.from(mapExample.values())`,`Array.from('Hola!')`,`Array.from(new Set([1,2,3,4,5,4,3,2,1]))`,]">
</js-repl>

Un array no deja de ser un objeto con una propiedad `length` y claves numéricas para los índices, por lo que no es tan extraño pensar que puedes hacer esto con `Array.from`:

<js-repl
  title="Array.from"
  init="[`Array.from({length: 4, 0: 'foo'})`]">
</js-repl>

### Array.of

Funciona exactamente igual que el constructor Array, pero con una sutil diferencia que lo hace más coherente: cuando le pasas un número como único argumento en vez de crear un array con una longitud igual al número dado, creará un array con ese número como único elemento.

<js-repl
  title="Array.of"
  init="[`const numberArray = Array.of(5)`, `const stringArray = Array.of('foo')`, `const fibonacciNumbers = Array.of(1,1,2,3,5,8,13)`]">
</js-repl>

## Conclusión

Como vemos tenemos varias opciones a la hora de crear un array en JavaScript. En mi día a día lo que más hago para crear arrays es creando un _array literal_ o usando `Array.from`. Prefiero el _array literal_ porque por un lado escribo menos código y por otro lado es como la mayoría de las personas que programan en JavaScript lo declaran, por lo que si otra persona lee mi código lo entenderá. **Al final escribimos código para que lo lean personas, no sólo para máquinas**.

El `Array.from` lo uso sobre todo cuando necesito pasar un iterable o array-like object a array para trabajar con él. También lo uso para hacer cosas como esta y tratar de parecer más inteligente ☕️🧐:

<JavaScriptRepl
  title="Array.from fancy"
  init={[
    "",
  ]}
/>
<js-repl
  title="Array.from fancy"
  init="[`Array.from({length: 5}).map((_, index) => \`${'*'.repeat(index + 1)}\`)`]">
</js-repl>

Además, `Array.from` es bastante legible, lo puedes leer casi como si fuera lenguaje natural. Y si no has entendido de qué va ese `.map` no te preocupes, estoy preparando más entradas en las que explicaré todo lo que sé sobre los arrays en JavaScript.
