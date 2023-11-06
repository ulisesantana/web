---
title: Creando matchers personalizados en Jest
date: 2023-09-08
description: 
tags: [jest,test]
draft: true
coverCopyright: null
---

Jest es una gran herramienta de testing, aúna en un solo paquete todas las utilidades que podamos necesitar para comprobar que nuestro programa hace lo que queramos. Desde sus propios asserts hasta un suite para medir la cobertura de tests de nuestro proyecto pasando por sus propios `spies` y `mocks`. Agrupa todas estas funcionalidades de una manera completamente transparente para el equipo de desarrollo y sin necesidad de configurar nada.

<tldr-section>

Si vives la vida a fuegote, sabes lo que buscas y no quieres leerte el artículo entero, entra directamente en este [repl.it 1](https://repl.it/@ulisesantana/toBeValidDate#validDate.matcher.js) donde hay un ejemplo funcional para un custom matcher.

</tldr-section>


## ¿Qué es un custom matcher?

Aún siendo tan completo, existe otro paquete llamado [jest-extended](https://github.com/jest-community/jest-extended) en el que la comunidad de JS ha añadido más matchers para que podamos hacer `asserts` más concretos. Por ejemplo, comprobar si un número es negativo, positivo o finito. A priori pueden parecer cosas muy simples que escribiendo un poco más de código podrías hacer sin tener que añadir un paquete extra al proyecto. Sin embargo, ganas mucha legibilidad haciendo que cualquier persona que entre en el proyecto le sea más fácil saber qué especificaciones tiene el código.

```jsx
expect(isFinite(num)).toBe(true)

expect(num).toBeFinite()

```

En el anterior ejemplo pese a que ambos `asserts` tratan de comprobar lo mismo, y en el fondo hacen lo mismo, la segunda es más claro y fácil de leer. En este otro ejemplo se puede ver más claro la diferencia de carga cognitiva que conlleva tener un matcher customizado.

```jsx
expect(typeof date === 'object' && date !== null && date.constructor ===Date).toBe(true) && !isNaN(value) && !isNaN(value.getTime())

expect(date).toBeValidDate()

```

En este caso el primer `assert` es bastante complicado de leer, se puede comprender, pero conlleva a una complejidad innecesaria. Sin embargo, el segundo se lee de una forma mucho más natural e inmediata.

## ¿Cómo creo mi propio custom matcher?

Vamos a replicar el custom matcher de toBeValidDate, para empezar tendremos que crear una función que reciba como parámetro la fecha que vamos a validar y que vuelva un objeto con dos propiedades:

1. *pass*: booleano que determina si pasa o no pasa el test. En caso de que usemos el `expect(date).not.toBeValidDate()`, el test pasará si *pass* es `false`.
2. *message*: función sin parámetros que devuelve una string con el mensaje que se desea dar en caso de que no pase el test.

```jsx
functionisValidDate(date) {
returntypeof date === 'object' &&
    date !== null &&
    date.constructor ===Date &&
    !isNaN(date) &&
    !isNaN(date.getTime())
}

functiontoBeValidDate(received) {
const pass =isValidDate(received);
if (pass) {
return { pass: true, message:passMessage(received) };
  }

return { pass: false, message:failMessage(received) };
}

```

Una vez tengamos nuestro matcher, debemos añadirlo al expect de jest para poder usarlo. Es tan simple como utilizar su [método extend](https://jestjs.io/docs/en/expect#expectextendmatchers) y pasarle un objeto con nuestro custom matchers:

```jsx
 expect.extend({toBeValidDate})

```

A partir de ahora podremos usar `expect(date).toBeValidDate()` y `expect(date).not.toBeValidDate()` en el fichero donde hayamos aplicado ese extend.

## Formatear errores

En la respuesta de *toBeValidDate* podemos ver que en *message* se llama a otra función a la que se le pasa lo que hemos recibido en el *expect*. Esta función nos ayuda a generar un mensaje de error para nuestro matcher:

```jsx
const { matcherHint, printReceived } = require('jest-matcher-utils');

constpassMessage = received => () => `
${matcherHint('not.toBeValidDate', 'received', '')}

Expected value to not be a valid date received:
  ${printReceived(received)}
`;

constfailMessage = received => () => `
${matcherHint('.toBeValidDate', 'received', '')}

Expected value to be a valid date received:
  ${printReceived(received)}
`;

```

Usamos dos helpers de `jest-matchers-utils`:

- matcherHint: nos ayuda a mostrar la parte del error donde se muestra la llamada al matcher, que se vería así `expect(received).not.toBeValidDate()` en el caso del *passMessage*
- printReceived: imprime el valor formateado.

El output final de un error *passMessage* sería así:

```scss
expect(received).not.toBeValidDate()

Expected value to not be a valid date received:
  2018-01-09T00:00:00.000Z

```

De esta manera podemos hacer que en caso de que el test que estemos haciendo de error, nos lo muestre de una forma a la que ya estamos acostumbrados y además formateando con diferentes colores para facilitar la lectura.

### Errores más informativos

Sin embargo, podemos ir un paso más allá y tener mensaje de error más específicos que nos ayuden a depurar en caso de que algún test falle. Para empezar deberemos cambiar nuestro *isValidDate* para que nos dé más información sobre el error:

```jsx
// Aqui sólo devolvemos si es una fecha válida o nofunctionisValidDate(date) {
returntypeof date === 'object' &&
    date !== null &&
    date.constructor ===Date &&
    !isNaN(date) &&
    !isNaN(date.getTime())
  }
}

// En cambio en esta función devolvemos si es una fecha válida o no y por quéfunctionisValidDate(date) {
if (typeof date !== 'object') {
return {
      pass: false,
      reason: `Value received is not an object:`
    }
  }
if (date === null) {
return {
      pass: false,
      reason: `Value received is null:`
    }
  }
if (date.constructor !==Date) {
return {
      pass: false,
      reason: `Value received is not an instance of Date:`
    }
  }
if (isNaN(date) || isNaN(date.getTime())) {
return {
      pass: false,
      reason: `Value received is not a valid date.`
    }
  }
return  {
    pass: true,
    reason: `Received a valid date:`
  }
}

```

Ahora que la firma de *isValidDate* ha cambiado también necesitaremos hacer cambios en *toBeValidDate* y además añadir la razón del porque no pasa el test al mensaje de error.

```jsx
const { matcherHint, printReceived } = require('jest-matcher-utils');

constpassMessage = (received, reason = '') => () => `
${matcherHint('not.toBeValidDate', 'received', '')}

Expected value to not be a valid date.
${reason} ${printReceived(received)}
`;

constfailMessage = (received, reason = '') => () => `
${matcherHint('.toBeValidDate', 'received', '')}

Expected value to be a valid date.
${reason} ${printReceived(received)}
`;

functiontoBeValidDate(received) {
const {pass, reason} =isValidDate(received);
if (pass) {
return { pass: true, message:passMessage(received, reason) };
  }
return { pass: false, message:failMessage(received, reason) };
}

```

En este caso puede parece poco útil, pero en matchers más complejos que, por ejemplo, implican iterar recursivamente en un objeto, es útil poder ir un paso más allá y detallar lo máximo posible el error. En [este repl.it 1](https://repl.it/@ulisesantana/toBeValidDate#validDate.matcher.js) puedes probar a romper los tests para ver los diferentes errores (para ejecutar los tests, vete a la pestaña de *Shell* y lanza el comando `npm test`.

## Añadiendo parámetros de entrada a un custom matcher

Ahora vamos a hacer otro matcher más simple sólo para ver cómo prodríamos pasarle parámetros al matcher. El matcher se va a llamar toBeDivisibleBy y va a validar que el número que le vas a pasar por el expect va a ser divisible por el número que le pases al matcher:

```jsx
expect(4).toBeDivisibleBy(2)

```

Para ello añadiremos un segundo parámetro a la función que vayamos a poner en el extend del expect:

```jsx
functiontoBeDivisibleBy(received, factor) {
const {pass, reason} =isDivisibleBy(received, factor);
if (pass) {
return { pass: true, message:passMessage(received, factor, reason) };
  }
return { pass: false, message:failMessage(received, factor, reason) };
}

```

Y con esto ya podríamos usar el matcher en nuestra suite de tests. Si quieres ver el matcher en este [repl.it](https://repl.it/@ulisesantana/toBeDivisibleBy#toBeDivisibleBy.matcher.js)

Espero que te haya sido útil esta breve explicación sobre cómo crear tus propios matchers en Jest. Si buscas más información puedes consultar la [documentación oficial](https://jestjs.io/docs/en/expect#custom-matchers-api).
