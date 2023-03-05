---
title: "Corepack: el puente entre gestores de paquetes para Node.js"
date: 2021-09-10
description: Node.js acaba de sacar Corepack como solución nativa para los diferentes gestores de paquetes que existen en el ecosistema de Node.js.
tags: [node.js,development,npm]
draft: false
---

En el mundo de Node.js el gestor por defecto es [npm](https://www.npmjs.com), sin embargo existen otros gestores de
paquetes que son mantenidos por la comunidad como [yarn](https://yarnpkg.com) o [pnpm](https://pnpm.io/es/). En un
ecosistema en el que tienes varios gestores de paquetes multiplica los problemas de desarrollo, ya que aparte de Node.js
tienes que instalar el gestor de paquetes que usa el proyecto en el que vayas a trabajar y además en una versión
concreta.

Es cierto que esto no siempre da problemas, pero cuando los da son bastante difíciles de debuggear, consumiendo bastante
tiempo. Además, estos gestores de paquetes necesitan ser instalados para cada versión de Node.js, ya sea porque usas nvm
y tienes varias versiones de Node.js en tu sistema operativo o porque estás actualizando a la nueva LTS que sale cada
otoño. Al final cada vez que instalas una nueva versión de Node.js tiene npm como gestor de paquetes por defecto, el
cual tienes que utilizar para descargar yarn o pnpm. Algo así como cuando usabas Internet Explorer para descargar
Mozilla Firefox y no volver a tocarlo nunca más.

Por otro lado, el gestor de paquetes varía de un proyecto a otro. En algunos proyectos podrás encontrar que se usa yarn,
en otros npm y también quien usa pnpm. Aparte, cada proyecto podrá usar versiones diferentes del mismo gestor de
paquetes.

## Corepack: un script para gobernarlos a todos

Una parte considerable de la comunidad no usa npm como gestor de paquetes para sus proyectos, sino que se apoya en los
ya mencionados yarn y pnpm. Debido a la liada parda que puede ser estar gestionando diferentes gestores de paquetes en
diferentes versiones, desde Node.js llevan un par de años preocupados por esto y planteando una solución. 

Por suerte, en la versión [16.9.0 de Node.js](https://nodejs.org/en/blog/release/v16.9.0/) incluye Corepack, un script
que esperan ayude a los usuarios de otros gestores de paquetes a tener una experiencia más fluida y consistente. Tal
cual como comentan en las *release notes*:

> [...] Corepack, un script que actúa como puente entre los proyectos de Node.js y los gestores de paquetes con los que 
> están destinados a ser utilizados durante el desarrollo. En términos prácticos, Corepack le permitirá usar Yarn y pnpm 
> sin tener que instalarlos, tal como sucede actualmente con npm, que se instala junto con Node.js por defecto.
>
> <small>Release notes de Node.js v16.9.0</small>

Además de facilitar el desarrollo para las personas que trabajen en proyectos usando algo que no sea npm, también se
busca que npm no sea la única alternativa válida como gestor de paquetes. Pese a que npm es el gestor de paquetes
oficial de Node.js y que gracias a su *registry* Node.js es hoy en día el increíble ecosistema que es, nunca es bueno
que todo el peso caiga sobre una única entidad. De esta manera si hay varios gestores de paquetes ampliamente usados su
competencia nos traerá ventajas a la comunidad dotándonos de mejores herramientas. El monopolio nunca ha sido algo bueno.

## ¿Y esto se come? ¿Cómo se usa?

Antes que nada quiero aclarar que **Corepack se encuentra en estado experimental** todavía. Además, por
ahora [sólo funciona con yarn y pnpm](https://nodejs.org/dist/latest-v16.x/docs/api/corepack.html#corepack_supported_package_managers)
, dejando npm fuera. Sin embargo, nos permitirá tener varias versiones de yarn y pnpm, ya que la instalará y
usará en función de lo que tengamos definido en nuestro package.json. Esto sería un ejemplo de un proyecto que usa yarn 
en su versión 2.4.3:

```json
...
  "packageManager": "yarn@2.4.3"
...
```

Al Corepack estar en estado experimental necesitamos habilitarlo ejecutando el siguiente comando dentro del directorio
de nuestro proyecto:

```shell
corepack enable
```

Y con esto ya tendríamos yarn en la versión 2.4.3 para poder usarlo en nuestro proyecto como nuestro gestor de paquetes.
A partir de ahora cualquier persona que se descargue nuestro proyecto y habilite corepack no necesitará instalar yarn,
sólo tendrá que ejecutar `yarn` y ya comenzará a instalar las dependencias.

## Conclusión

La verdad es que Corepack me parece un gran movimiento por parte de la comunidad de Node.js, no sólo por evitar que npm
sea la única opción disponible, sino por facilitar y hacer más transparente el uso de otros gestores de paquetes.
Además, he de decir que mientras lo he probado me ha asombrado lo rápido que funciona, en ningún momento he notado que
estuviera instalando el gestor de paquetes por detrás. Tal como promete es completamente transparente.

## Enlaces de interés
- [Repositorio de Corepack](https://github.com/nodejs/corepack)
- [Documento de diseño de Corepack](https://github.com/nodejs/corepack/blob/main/DESIGN.md)
- [Release que incluye Corepack](https://nodejs.org/en/blog/release/v16.9.0/)
- [Documentación oficial de Corepack](https://nodejs.org/dist/latest-v16.x/docs/api/corepack.html)
- [Documentación sobre cómo definir un gestor de paquetes en el package.json](https://nodejs.org/dist/latest-v16.x/docs/api/packages.html#packages_determining_package_manager)
