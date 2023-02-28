---
layout: author.webc
title: Test
---

{% renderTemplate "webc" %}
<tldr-section>

Chiquito pelete

</tldr-section>
{% endrenderTemplate %}

[Mi web](https://ulisesantana.dev)

<js-repl 
  title="Microfrontend rules" 
  height="500" 
  init="[`'1' === 1`, `'Ulises'.rainbow()`]"
  load-to-scope="[`String.prototype.rainbow = function(){return '🌈 ' + this.valueOf() + ' 🌈'}`]">
</js-repl>

## Highlight code 

<figure>
<figcaption>src/data/site.js</figcaption>

```js
/**
 * Number sorting following Quicksort algorithm
 * @function
 * @param {Array} x - Number array to order
 * @param {Boolean} [asc=true] - Ascending order flag
 * @returns {Array} - Sorted array
 */
function quickSort(x, asc = true){
  if (x.length < 2){
    return x;
  }

  const [ pivot, ...rest ] = x;
  const highers = rest.filter(n => n > pivot);
  const lowers = rest.filter(n => n <= pivot);
  const result = [
    ...quickSort(lowers),
    pivot,
    ...quickSort(highers)
  ]

  return asc
    ? result
    : result.reverse();
}
```
</figure>

![Hablando de cómo crear un paquete de npm en el JSDay Canarias de 2018](/assets/images/jsdaycanarias.jpg)

{% renderTemplate "webc" %}
<youtube-video @video-id="T9Frov6wS7U">
</youtube-video>
{% endrenderTemplate %}
