---
title: Mockeando dependencias con Jest
date: 2021-02-08
description: Mockeando dependencias con Jest
tags: [jest,test]
draft: true
coverCopyright: null
---

En ocasiones quieres testear alguna funcionalidad que por dentro utiliza una librería de terceros que no se inyecta, sino que se importa desde el node_modules ya que se trata de una dependencia de npm.

Trabajando en un proyecto interno de [Lean Mind](https://leanmind.es/), [Adrián Ferrera](https://adrianferrera.dev/es) y yo nos encontramos con este caso. Al crear un usuario generamos el id desde el dominio con una función que nos genera un hash. El problema es que no es una función pura, cada vez que la llamas genera un hash diferente, por lo que testear que un usuario se ha creado con el id correcto es imposible. Para poder testear la funcionalidad de crear un usuario y que este se creara con el id correcto nos planteamos dos opciones:

1. Inyectar el generador de ids como dependencia en el servicio que crea los usuarios y después en el test inyectar un mock del generador de ids.
2. Mockear el generador de id a nivel de test, sin realizar ningún cambio en el servicio que crea los usuarios.

La primera opción no tiene nada de malo, pero nos parecía innecesaria y aparte queríamos aprender cosas nuevas con Jest (si no lo hubiéramos hecho no habría escrito este artículo). Así que nos decantamos por la segunda.

Es importante tener en cuenta que el mock de la dependencia debe hacerse fuera de los `describe` y los `it`. En nuestro caso lo ubicamos entre el bloque de los imports y el primer `describe` del fichero. Esto se debe a que Jest debe mockear la dependencia antes de arrancar los tests. Al menos en nuestro caso, al tratar de moverlo al describe nos falló el mock y consecuentemente el test.

```tsx
...
import {Roles,User,UserToBeAuthenticated }from '../../user/domain/user.model'

const mockedUserId = 'irrelevant id'
jest.mock('../../common/domain/generateId', () => ({
  ...(jest.requireActual<any>('../../common/domain/generateId')),
  generateId: () => mockedUserId
}))

describe('User services', () => {
it('create a new authenticated user',async () => {
const givenUser:UserToBeAuthenticated = {
...

```

Una vez tenemos claro donde debemos mockear la dependencia, analicemos qué es lo que hace Jest realmente:

```tsx
const mockedUserId = 'irrelevant id'
jest.mock('../../common/domain/generateId', () => ({
  ...(jest.requireActual<any>('../../common/domain/generateId')),
  generateId: () => mockedUserId
}))

```

La función `jest.mock` espera dos parámetros:

1. La ruta en la que tenemos la dependencia. En nuestro caso es una función que hemos hecho nosotros y está dentro del proyecto, por eso ponemos la ruta `../../common/domain/generateId`. Si lo queremos mockear es una librería de terceros como podría ser `axios`, simplemente deberíamos pasar `axios` como argumento.
2. Una función que debe devolver lo que exportaría la dependencia. Aquí podemos elegir sobrescribir lo que exporta la librería o extenderla, ya que Jest va reemplazar el uso de la dependencia en tu código. En el ejemplo sobrescribimos la función `generateId` para que devuelva siempre el mismo id.

Con esto ya tendríamos mockeada la dependencia que tiene nuestro servicio con `generateId` sin cambiar la implementación del servicio. Aunque esta opción no debería ser la primera que nos venga a la cabeza, es bueno saber que está ahí si en algún momento nos vemos en la necesidad de mockear un código de terceros para poder testear nuestro código.

Por último, puede sonar interesante tener todos los mocks sobre dependencias que podamos necesitar en el setupTests de Jest, pero al hacer esto tienes que tener en cuenta que afectaría a los tests end to end, restándole fiablidad a los mismos.
