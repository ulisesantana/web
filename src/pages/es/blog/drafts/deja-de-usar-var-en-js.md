---
title: Deja de usar var en JavaScript
date: 2021-11-17
description: Pese a que ES2015 salió hace más de 6 años, todavía me encuentro con código nuevo usando var. Déjame explicarte por qué es una mala praxis usar var hoy en día.
tags: [javascript,node.js]
cover: ../../preview.png
draft: true
---

Pese a que ES2015 salió hace más de 6 años, todavía me encuentro con código nuevo usando var. Sospecho que su uso es por el desconocimiento de let y const, ya que es bastante común que la gente que trabaja con JavaScript no es realmente su lenguaje fuerte, sino que hacen otras cosas en otros lenguajes y a veces les toca trabajar con JavaScript en el frontend.

Sea como fuere no vengo aquí a hacer de policía de JavaScript, sino de explicar por qué es una mala praxis y por qué debería de dejar de usarse.

```js
function printMatrix (matrix) {
  for (var i = 0; i < matrix.length; i++) {
    var line = matrix[i];
    for (var i = 0; i < line.length; i++) {
      var element = line[i];
      console.log(element);
    }
  }
}

var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

printMatrix(matrix)
```

Por los problemas que da con aplicaciones complejas y porque hay opciones mejores, en este caso: let y const.

Var tiene ámbito global de manera que cualquier punto de la aplicación puede acceder a su contenido así como modificarlo. Eso en aplicaciones complicadas (y no tan complicadas tmb), puede ser un desastre a nivel de funcionamiento, mantenibilidad y depuración.

Otra cosa que tiene var es que se puede redefinir (que no asignar otro valor), en cualquier parte del código y siempre hará referencia a la misma variable.

Con var sucede que puedes usar la variable ANTES de definirla y en ese momento, la variable valdrá undefined.

Ahora hablemos de let.

Let tiene ámbito de bloque, es decir, su contexto está limitado al interior de una pareja {} y por lo tanto, a su contenido sólo se podrá acceder desde el interior de dicho bloque.

Dentro de un mismo bloque, a diferencia de lo que sucede con var, no se puede redefinir la variable, pero obviamente sí modificar su valor.

Y me dirás, pero sí puedo redefinir una variable con let dentro de una función que se encuentre dentro de un bloque {} que ya poseía dicha variable. Sí y no porque realmente, dado que la función en sí misma es un bloque independiente, ésta está delimitada por si propia pareja {} y por lo tanto, no sería una redefinición sino una declaración dentro de un bloque anidado.

A nivel de uso pre-definición, al contrario de lo q sucede con var, si usas la variable antes de declararla, ésta no tendrá el valor por defecto de undefined como sucede con var, sino que la ejecución de la aplicación dará un Reference Error.

Por todas estas razones es por lo que, desde su definición en el ES6, unido al incremento de la complejidad de las aplicaciones y la tendencia a modularizar y desacoplar los elementos que conforman las aplicaciones actuales basadas en JS, se prefiere el uso de let frente a var.
