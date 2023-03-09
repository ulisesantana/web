---
layout: author.webc
title: Test
---

<tldr-section>
Chiquito pelete
</tldr-section>

[Mi web](https://ulisesantana.dev)

# Heading H1
Lorem ipsum

## Heading H2
Lorem ipsum

### Heading H3
Lorem ipsum

#### Heading H4
Lorem ipsum

##### Heading H5
Lorem ipsum

###### Heading H6
Lorem ipsum

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

## JavaScript REPL

<js-repl 
  title="Microfrontend rules" 
  height="500" 
  init="[`'1' === 1`, `'Ulises'.rainbow()`]"
  load-to-scope="[`String.prototype.rainbow = function(){return '🌈 ' + this.valueOf() + ' 🌈'}`]">
</js-repl>

![Hablando de cómo crear un paquete de npm en el JSDay Canarias de 2018](/assets/about/jsdaycanarias2018.jpg)

<youtube-video video-id="T9Frov6wS7U"></youtube-video>

