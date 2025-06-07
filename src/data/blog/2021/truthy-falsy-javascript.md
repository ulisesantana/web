---
title: Truthy y Falsy en JavaScript
pubDatetime: 2021-09-19
description: En JavaScript existe el concepto de Truthy y Falsy values. Déjame explicarte en este artículo de qué se trata.
tags: [javascript]
cover: /assets/es/blog/2021/truthy-falsy-javascript/cover.png
draft: false
---

<tldr-section>

  Debido a la coerción en JavaScript cuando una expresión se evalúa como booleano (un *if*, la condición de un *while*, una ternaria, etc) el lenguaje convertirá el valor en *true* o *false*. Hay casos concretos que darán *false*:

  ```javascript
  0  // cero
  -0 // cero negativo
  0n // cero de tipo BigInt
  "" // cadena de text vacía
  '' // cadena de text vacía
  `` // cadena de text vacía
  null
  undefined
  NaN
  ```

  Cualquier otro valor al ser evaluado como booleano devolverá *true*.

  <js-repl
    title="Ejemplos de falsy y truthy values"
    init="[`0 ? 'Soy truthy' : 'Soy falsy'`,`-42 ? 'Soy truthy' : 'Soy falsy'`]">
  </js-repl>
  

</tldr-section>

En JavaScript existe la coerción, que se trata de una conversión de tipos cuando se va a evaluar una variable. Por ejemplo, si vamos a comparar entre un número y una cadena de texto:

<js-repl
  title="Ejemplos de coerción"
  init="[`'1' == 1`,`'1' === 1`]">
</js-repl>

Como vemos en el primer caso nos devuelve `true` y en el segundo `false`. La diferencia entre `==` y `===` es que `==` hace una coerción de tipos a la hora de comparar. Lo mismo pasa en casos negativos:

<js-repl
  title="Ejemplos de coerción"
  init="[`'1' != 1`,`'1' !== 1`]">
</js-repl>

En estos ejemplos cuando comparamos números y cadenas de texto, pero, ¿qué pasa si evaluamos variables como si fueran booleanos?

<js-repl
  title="Coerción de booleanos"
  init="[`0 ? 'Soy truthy' : 'Soy falsy'`,`-42 ? 'Soy truthy' : 'Soy falsy'`]">
</js-repl>

Lo que pasa es que JavaScript trata de convertir la variable a booleano, ya que estás evaluándola como una condición. En la práctica es lo mismo que tratar de hacer `Boolean(0)`:

<js-repl
  title="Convirtiendo a booleano"
  init="[`Boolean(0)`,`Boolean(-42)`]">
</js-repl>

Por eso en JavaScript se habla de valores *truthy* y *falsy*, que no son *true* o *false*, pero si son evaluados como booleanos se comportan como tales. Esto puede conllevar a problemas, ya que un valor es *truthy* o *falsy* dependiendo de cómo está siendo evaluado:

<js-repl
  title="Un valor puede ser falsy dependiendo de cómo sea evaluado"
  init="[`const zeroNumber = 1 - 1`, `zeroNumber + 1`, `Boolean(zeroNumber)`, `const zeroString = String(zeroNumber)`, `Boolean(zeroString)`]">
</js-repl>

La parte positiva es que los valores que pueden ser *falsy* son limitados:

```javascript
0  // cero
-0 // cero negativo
0n // cero de tipo BigInt
"" // cadena de text vacía
'' // cadena de text vacía
`` // cadena de text vacía
null
undefined
NaN
```

Por otro lado, todo valor que no es *falsy* es *truthy*:

<js-repl
  title="Valores truthy"
  init="[`Boolean(1)`, `Boolean('En un lugar de la Mancha...')`, `Boolean({})`, `Boolean([])`, `Boolean(class Test {})"`, ``Boolean(() => {})]">
</js-repl>

Saber esto te ayudará a mejorar la forma en la que construyes tus condicionales en JavaScript. Por ejemplo, imagina que te han pedido que para un usuario de la plataforma en la que estás trabajando muestre un mensaje con su saldo. En caso de que el usuario no tenga saldo, que no que sea 0, significa que todavía no ha activado su cuenta por lo que debería mostrar un mensaje notificándolo. Teniendo todo esto en cuenta hemos hecho esta función:

```javascript
function parseBalance({name, balance}) {
  if (balance) {
    return `El saldo de ${name} es ${balance.toFixed(2)} €.`
  } else {
    return `La cuenta de ${name} no ha sido activada.`
  }
}
```

Ahora vamos a probar con diferentes combinaciones para ver si podemos tener algún resultado inesperado:

<js-repl
  title="Mostrar saldo del usuario"
  load-to-scope="[`const parseBalance = ({name, balance}) => balance ? 'El saldo de '+name+' es '+balance.toFixed(2)+' €.' : 'La cuenta de '+name+' no ha sido activada.'`]"
  init="[`parseBalance({name: 'Carlos', balance: 120})`, `parseBalance({name: 'Juan'})`, `parseBalance({name: 'Pepe', balance: 0})`]">
</js-repl>

Uy, parece ser que en el caso de Pepe ha pasado algo que no debería. Según lo que nos han dicho Pepe debería tener la cuenta activada, ya que nos han pasado el saldo de su cuenta. Lo que pasa es que su saldo es `0`, lo cual al pasar por nuestro `if` se evalúa como `false`. Arreglar esto es fácil, sólo tenemos que comprobar que el saldo no sea `undefined`:

```javascript
function parseBalance({name, balance}) {
  if (balance !== undefined) {
    return `El saldo de ${name} es ${balance.toFixed(2)} €.`
  } else {
    return `La cuenta de ${name} no ha sido activada.`
  }
}
```

<js-repl
  title="Mostrar saldo del usuario"
  load-to-scope="[`const parseBalance = ({name, balance}) => balance !== undefined ? 'El saldo de '+name+' es '+balance.toFixed(2)+' €.' : 'La cuenta de '+name+' no ha sido activada.'`]"
  init="[`parseBalance({name: 'Carlos', balance: 120})`, `parseBalance({name: 'Juan'})`, `parseBalance({name: 'Pepe', balance: 0})`]">
</js-repl>

Ahora sí funciona como nos ha pedido. Es un ejemplo muy básico, pero creo que refleja bien el problema de no controlar los valores *falsy*. Resumiéndolo: **el problema es que a veces un *falsy* value puede ser un valor válido en el dominio de nuestra aplicación, llevando a errores inesperados.** Si el caso de Pepe hubiera sido real habría intentado una y otra vez activar su cuenta, contactado con Atención al Cliente o dejado de usar la aplicación directamente.

Espero que esto te haya ayudado a que partir de ahora le des una vuelta de más cuando tengas que escribir un condicional en JavaScript 😉.
