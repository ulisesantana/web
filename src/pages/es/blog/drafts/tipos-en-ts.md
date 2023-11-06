---
title: Tipos en JavaScript y TypeScript 
date: 2022-07-13
description: Ayuda entender los diferentes tipos que hay en JavaScript y en TypeScript para prever ciertos comportamientos.
tags: [JavaScript,TypeScript,Bases]
cover: ../../preview.png
draft: true
---


## JavaScript

### `NaN`

## TypeScript

### `never`

Ejemplos en los que el never aplica

```ts
function foo(): never {
  throw new Error()
}
```

```ts
function foo(): never {
  while (true) {
    
  }
}
```

// Este es never
```ts
function foo(): never {
  while (true) {
    throw new Error() 
  }
}
```

// Este es void
```ts
function bar(): never {
  bar()
}
```