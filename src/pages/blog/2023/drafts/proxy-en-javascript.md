---
title: ¿Para qué sirve el Proxy en JavaScript?
date: 2021-11-25
description: Desde 2015 tenemos un prototipo llamado Proxy JavaScript al que seguramente muchas personas no han tenido claro para qué sirve o cómo usarlo. Descúbrelo en este artículo.
tags: [javascript]
cover: ../../preview.png
draft: true
---



```js
const arr = new Proxy([1,2,3,4,5], {
  get: function (target, name) {
    if (name === 'last') {
      return target[target.length - 1]
    }
    if (name === 'first') {
      return target[0]
    }
    if (Number(name) < 0) {
      return target[target.length + Number(name)]
    }
    return target[name]
  }
})

arr.last // 5
arr.first // 1
arr[-2] // 4
```
