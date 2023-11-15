---
title: Why not use Jest
date: 2022-01-09
description: I've been using Jest for my Node.js projects for years, but I'm hearing more and more complaints from the Node.js community about Jest and that you shouldn't use it.
tags: [node.js,testing,jest]
cover: /assets/en/blog/2022/why-not-use-jest/cover.png
draft: false
---

## The problem

I have been reading complaints for some time from the community and members of the Node.js core about [Jest](https://jestjs.io). Until now I have always used Jest because I find it to be a very complete and comfortable tool. Also, when I do frontend I also use Jest, since it is the *test framework* that comes with [Create React App](https://create-react-app.dev) by default.

A couple of months ago I tried [Node Tap](https://node-tap.org), which is the *test framework* that [Matteo Collina](https://twitter.com/matteocollina) recommends as an alternative to Jest to test your code. Although I found it to be a great tool, I was not convinced by the way the tests were organized and since so far I have not encountered any problems with Jest, I did not fight much with it. However, I keep seeing tweets in which they do not recommend its use and until now I had not started to investigate why. In this tweet we can see what I mean:

<blockquote class="twitter-tweet" data-lang="es" data-theme="light" data-align="center"><p lang="en" dir="ltr">Yep. Twice last week. Two separate conversations: &quot;Can you help, this Node.js thing isn&#39;t working... We&#39;re using Jest...&quot;<br></br><br></br>Me, &quot;I&#39;m going to stop you right there.&quot;<br></br><br></br>I generally do not disparage other open source projects but using jest is not something I could ever recommend. <a href="https://t.co/bC7h6oRykY">https://t.co/bC7h6oRykY</a></p>&mdash; James M Snell (@jasnell) <a href="https://twitter.com/jasnell/status/1458048635405438979?ref_src=twsrc%5Etfw">November 9, 2021</a></blockquote>

First of all we see Matteo Collina complaining about the fact that he receives issues on Github for the packages he maintains ([almost 500 on npm](https://www.npmjs.com/~matteo.collina)) in which The problem is Jest and how it alters the execution environment. Secondly, [James Snell] (https://twitter.com/jasnell), although he does not usually disparage Open Source projects, would never recommend using Jest.

In the tweet thread they talk about this [issue on serverless Github](https://github.com/serverless/serverless/pull/6517) where they discuss the reasons why they ended up switching from Jest to Mocha:

   - Run the tests in a modified Node.js environment that presents some problems:
     - The *outputs* of `stdout` and `stderr` are not printed in the same order in which they are executed. `stderr` is prioritized before `stdout`.
     - Some public Node.js APIs are replaced with non-standard alternatives.
     - Due to module cache management in a non-standard and uneven manner, it is prone to memory leaks.
   - Test progress is not shown until they are finished, which is not ideal for time-consuming tests such as integration tests.
   - Any *output* `stdout` / `stderr` is hidden until the test finishes.
   - The default *test runner* has several bugs (can be patched by using `jest-circus` the alternative *test runner*, which works by default as of Jest 27):
     - Failures in beforeAll do not prevent the execution of tests.
     - Bugs in afterAll are not exposed.
     - only and skip are not fully respected.
   - The source code is the result of transpilation, which makes it difficult to debug possible problems in the *test runner*.

Además, he visto a Matteo Collina comentar una y mil veces que el problema que tiene con Jest es que no estás testeando tu aplicación corriendo en Node.js, sino corriendo en Jest. ¿Por qué afirma esto Matteo? Porque Jest se ejecuta en un contexto de V8 diferente, esto es porque Jest por debajo usa [*vm*](https://nodejs.org/api/vm.html), un módulo nativo de Node.js. En [este vídeo se explica la arquitectura de Jest](https://www.youtube.com/watch?v=3YDiloj8_d0) y concretamente en el [minuto 37:32](https://youtu.be/3YDiloj8_d0?t=2252) se habla de `jest-runtime`, que es la parte de **Jest** que se encarga de **simular entornos de ejecución**, ya sea `jest-dom` o lo que Christoph llama *like a fake node environment* que sería la parte de Node.js. Entre otras cosas **este *entorno simulado* tiene su propia implementación de *require* permitiéndonos mockear módulos**, que en la práctica significa que podemos mockear dependencias con Jest. Parafraseando lo que dice Matteo en el tweet que tenemos debajo: **Esto permite una experiencia de desarrollo increíble, pero nuestros tests son menos útiles porque no se están ejecutando en el entorno real.**

<blockquote class="twitter-tweet" data-lang="es" data-theme="light" data-align="center"><p lang="en" dir="ltr">The major downsides is <a href="https://t.co/Cc1z15gqEH">https://t.co/Cc1z15gqEH</a>. Essentially you are not running your code on top of Node or a Browser, but on top of Jest. They do it because it allows a HUGE amount of great DX. On the other hand… your test are less useful because it’s not the real env.</p>&mdash; Matteo Collina (@matteocollina) <a href="https://twitter.com/matteocollina/status/1479955450179301382?ref_src=twsrc%5Etfw">January 8, 2022</a></blockquote>

In the tweet he shares a [Jest Github issue opened by Thomas Huston](https://github.com/facebook/jest/issues/2549). This issue talks about how global variables in Jest differ from those in Node.js. Additionally, reference is made to this [Jest Github issue opened by Kent C. Dodds](https://github.com/facebook/jest/issues/2048) which talks about how Jest global variables differ from Jest global variables of the source code. [Kent C. Dodds](https://twitter.com/kentcdodds) discovered and managed to reproduce this bug for the first time. From this fact they did small tests to see how far the error went and discovered that the problem is mostly when running Jest with the configuration for `testEnvironment` as `node`, which is the default value. However, when running it with `testEnvironment` as `jsdom` the error stops occurring. If you want to check it you can do it in [this repository](https://github.com/kentcdodds/jest-globals-bug/tree/json).

Thinking about this test, and the issue opened by Thomas Huston, it seems that the problems with Jest occur when you test code for Node.js and not when you are testing code for the browser. Anyway, it's a false feeling because if you take the Kent repository where the bug is reproduced and change `jest-cli` to `jest` in the latest version, you will see that the bug is fixed. However, with the issue that Thomas Huston comments on, if you update Jest in the [test repository](https://github.com/thomas-huston-zocdoc/jest-fetch-array-bug) the error persists. If we read the comments in this issue, it seems that the problem is in the libraries and modules that we use in our code, but that are not in our project. Specifically in this part where they talk about big.js as a hypothetical third-party library:

> using big.js directly in the test suite will work, having code in another project/module which imports big.js and then also importing big.js into your test project and passing them between functions will result in errors when performing instanceof checks.
> <small>Craig McNicholas, <a href="https://github.com/facebook/jest/issues/2549#issuecomment-911359464">comment on Jest issue number 2549</a> </small>

Without a doubt we have problems testing code in Node.js. The issue started by Thomas Huston in 2017 is still open as of the publication of this article and with the last update less than a week ago. If you are reading this and want to know more about the specific problems that other people have encountered with Jest in Node.js, I highly recommend you to do yourself a ☕️ and spend a morning reading the issue from top to bottom. This issue is referenced in 50 others, so you can make yourself an idea.You can also reproduce the bug mentioned in the issue in [this repository](https://github.com/thomas-huston-zocdoc/jest-fetch-array-bug).

## Alternatives

### Mocha

[Mocha](https://mochajs.org) with [Chai](https://www.chaijs.com) have been a good option for testing your JavaScript code for almost 10 years. It is a fast and light tandem: Mocha is the *test runner* and chai is the *assertion library*. However, as I mentioned before, being lightweight means that if you want to add mocks, spies or test coverage reports you need to install new packages.

### Node Tap

[Node Tap](https://node-tap.org) has also been around for 10 years, but it's not as popular. Unlike Mocha, it is not a *test runner*, but a *test framework* and as its website says: **it comes with batteries included**. Like Jest, it allows you to mock modules, includes its *assertion library* and can generate test coverage reports. It is quite complete, follows the [TAP protocol](https://testanything.org) and is the *test framework* that Matteo Collina recommends. By the way, the person who created Node Tap is [Isaac Schlueter](https://twitter.com/izs), the same one who created npm. The big difference with Mocha and Jest is that with Node Tap you run the file in which you have the tests with Node.js directly, not with the *test runner*. In other words, to run the tests you do not run `tap add.test.js`, but rather you run `node add.test.js`.

### Tape

[Tape](https://github.com/substack/tape) has also been around for almost 10 years and is influenced by *Node Tap*. In the latest edition of Node Cookbook, the book they recommend to get your Node.js certification, it is the first *test framework* with which they teach you how to do a test. It should be added that they also teach you how to test with Mocha and Jest. Although it is very similar to Node Tap, it is less powerful and you will probably need extra libraries, but it is also lighter. On the other hand, the documentation is nothing more than the README of the project. Lastly, also follow the [TAP protocol](https://testanything.org).

## Comparativa

|                                          |    Jest    |   Mocha   | Node Tap |   Tape  |
|------------------------------------------|:----------:|:---------:|:--------:|:-------:|
| Weekly downloads                      | [12,305,334](https://www.npmjs.com/package/jest) | [4,765,970](https://www.npmjs.com/package/mocha) | [153,919](https://www.npmjs.com/package/tap)  | [531,791](https://www.npmjs.com/package/tape) |
| Node Cookbook                            |     ✅     |     ✅     |    ❌     |    ✅   |
| Assertion library                        |     ✅     |     ❌     |    ✅     |    ✅   |
| Test coverage reports                    |     ✅     |     ❌     |    ✅     |    ❌   |
| Mock Modules                             |     ✅     |     ❌     |    ✅     |    ❌   |
| Mock & Code Spies                        |     ✅     |     ❌     |    ❌     |    ❌   |
| Runs with Node.js natively               |     ❌     |     ❌     |    ✅     |    ✅   |

## My experience

I have used Jest in more than 50 projects, from CLI to REST API to PWA or libraries and so far I have not had any problems. What's more, it has always been a pleasure to test my applications with Jest. What I love is that I only need `jest` and nothing else. Inside that package I have everything I need: mocks, spies, coverage reports, watchers, etc. It is true that it is a generous package in terms of weight, but the reality is that it is a development dependency so it will never be in the final device.

Also, since Jest is the default *test framework* with React, anyone who develops React knows Jest. Not to mention that, due to the pleasant development experience it has, it has made its way into the community. This means that when you join a development team, the tests will most likely be written with Jest.

On the other hand, what I used before Jest came into my life was [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com), which if you wanted to add mocks or spies you needed to install [Sinon](https://sinonjs.org). Do you want a report on test coverage? More of the same, you need to install [Istanbul](https://istanbul.js.org) and configure it. With Jest all this is included.


## Conclusion

If you are looking for a devastating answer that tells you what solution you should use to test with JavaScript, I'm afraid you won't find it here. Despite everything we have seen, Jest is still a package with more than **12 million downloads per week** and if you land on a JavaScript team, the tests will most likely be in Jest. In addition, the book *Node Cookbook*, which is the one recommended to prepare for the Node.js certification, teaches you how to test with Jest, Mocha and Tape. It's hard for me to say that you should stop using Jest, but I do want you to be clear that **you are not running your tests in the same environment in which they will be run in production**. The latter means that you cannot be 100% sure that everything will work as you expect, maybe 99%, but never 100%. Be careful, that 99% may be valid for what you are going to do. It is like the test coverage of a project, in many cases having 90% is enough, but it would probably be better to have 100% if the sustainability of the project is respected.

For my part, I have proposed two things. The first is that I want to give *Node Tap* a second chance, for the simple fact of understanding the tool and seeing in which cases it can be useful. The second is that in each new team that joins I am going to explain this Jest problem so that as a team we know what problems can appear when we use Jest in our projects. Another story will be whether or not we use Jest for new projects or consider changing *test framework*.





