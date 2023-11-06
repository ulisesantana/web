---
title: How I took a Node.js process from 5 hours to 5 minutes
date: 2022-05-20
description: In a project I had to face a process in Node.js that, after redoing it from scratch to make it more maintainable, was 4400% more inefficient. In this post I explain how I made it more than 20% faster than the original process.
tags: [node.js,performance]
cover: /assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/cover.png
draft: false
---

<youtube-video 
  video-id="V4sXNlzJIy8"
  video-caption="This post was originally a talk I gave at JSDay Canarias 2022">
</youtube-video>

## The context

This story begins with a team of 5 people, of which I had been part for almost a year and the other 4 had joined in the last 3 months. On this team my role was Senior Node.js Developer and I was the only one who had previous experience working with Node.js. In addition, there was another person with experience with JavaScript and Dart, which made it easy for him to adapt to projects in TypeScript, which is the language in which all the projects were written. However, the other three people on the team had very little prior JavaScript experience.

On the other hand, we were working on the different parts of a billing engine that needed to be adapted for a legislative change. The latter means that the deadline could not be moved, if the change was not made by that date the company could not generate the following month's billing. In case we didn't arrive we would break the cash flow. Cool, no pressure.

To conclude this contextualization:

1. Not the entire team controlled the technology being worked on.
1. The deadline is fixed and critical, since we break the company's cash flow if we are late.

## The calm before the storm

Abraham Lincoln is credited with the following phrase: **Give me 6 hours to cut down a tree and I will spend 4 sharpening the axe**. We knew that there was going to be a legislative change that would entail changes in the projects, so 2 months before the deadline we proposed refactoring parts of the projects and one in particular we requested to redo it from scratch, since at that time it was really a working prototype, but it was difficult to maintain and with the legislative change it was going to become more unsustainable. They gave us the green light for this proposal and said prototype was going to be redone from scratch. Let's call this project the *Lumberjack Project*:

![Me dressed as a Lumberjack with an ax on my shoulder](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/lumberjack.jpeg)

At [Lean Mind](https://leanmind.es/es/) as a general rule we work doing pair or mob programming, so no one is ever alone and thus we make the code more sustainable, in addition to both authorship of the code as knowledge is shared. However, since we had 5 projects to update, we decided to divide ourselves as much as possible to be able to cover at least 3 projects at a time and be able to have the changes as soon as possible. That works out to 2 people per project and one person alone. That person who was left alone was me and I was in several bands assisting the different teams while working on the project in which I was involved.

This situation caused me to neglect the code review process due to lack of time and simply focus on resolving the team's doubts, especially in the domain, since I remember that the rest of the team had only been with the client for 3 months and the business domain had an assimilation curve of at least 6 months. Furthermore, since we did TDD, if the tests passed and reflected the business specifications well, there was nothing to worry about.

*Project Lumberjack* was carried out by team members who did not have much experience in JavaScript and none in TypeScript. This did not pose any problem a priori because they had already been doing pair or mob programming for three months with other members of the team who did have experience and these same people had made contributions to the different projects in TypeScript. They simply asked for help or advice when they needed it and were assisted.

The reality is that the leap in quality in the *Lumberjack Project* was more than evident. I didn't see the project in its final state directly, but rather I saw it evolve over the weeks and it really was much clearer in its purpose and there were no surprises in the implementation. I had been part of the team that had made that prototype 9 months ago and the truth is that there were certain parts that were a bit obscure to me, that I didn't fully understand how they worked or what their final purpose was. This was due, among other things, to the fact that the original prototype had not been made entirely in mob or pair programming, but rather there were entire parts that had been made by a developer who was no longer part of the team.

Going back to *Project Lumberjack*, I was very proud of what the team had achieved, it really was a much more sustainable project, eliminating surprises. However, when it was finished and I did a more extensive last review with the team, I saw some data flows that had every indication of blocking the Event Loop, or at least part of it, potentially causing performance losses. To check the performance of this new project, I went to the next step we had planned: doing a test comparing the original prototype with the *Lumberjack Project*.

The original prototype based on a data set of a few hundred thousand records was able to do everything in about 7 minutes. With the same set of data I tried the *Lumberjack Project* and the result was that it took nothing more and nothing less than **5 hours 7 minutes and 54 seconds.** We are talking about taking 44 times as long. The actual process in production took about 40 minutes each night, so if we sent this to production the new process would take about 29 hours and 20 minutes, each day. This loss of performance was unacceptable. At that moment my inner self was something like this:

![GIF of the coffin dancers](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/coffin-dance.gif)

To add more fuel to the fire, this happened about 10 days from the deadline, 10 calendar days. We couldn't rethink the project, we had to optimize it in less than a week, plus there were more things on the grid. I remember that there were 4 other projects that needed to be updated for the legislative change. In this situation, on the one hand I motivated myself by thinking things like *I've been preparing for this moment all my life, the workshops on asynchrony in Node.js with [Matteo Collina](https://twitter.com/matteocollina) and [James Snell](https://twitter.com/jasnell) are going to pay off*. However, another part of me was a mix of this:

![GIF of Sheldon breathing compulsively into a paper bag](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/sheldon-bag.gif)

![GIF of Pickle Rick about to die of heat stroke](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/pickle-rick.gif)

The reality is that I went into panic mode and started refactoring the project and trying to improve performance as much as I could. I didn't change any of the logic, I limited myself to changing the asynchronous data flow, which was mostly everything that had to do with reading or writing to the database.

## Weathering the storm

After this refactor I saw certain patterns that I want to highlight and show:

### 1. Avoid unnecessary async

```js
export function randomNumber() {
    return Math.random()
}

export async function asyncRandomNumber() {
    return Math.random()
}
```

These two functions are identical except that the second one is asynchronous. For no reason, but it's asynchronous. Every time we use async in a function, we are automatically making it return a promise, and that has to be managed more.

It may seem silly, but it affects. I made a small demo to demonstrate the extent to which this affects our performance. What the script does is run each of these functions separately a million times.

![Result of running the demo for async comparison](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/useless-async.png)

As we can see, just by putting that `async` we have made it take almost six times longer. Applying it to real life, in a test suite we reduced the time it took to execute by 40% just by removing the unnecessary async that we had left after a refactor. We simply removed the async that we had in the arrow functions that we no longer needed. By doing this we went from taking just over 2 minutes to throw the test suit to just under a minute and a half.

### 2. Avoid awaits inside loops.

Imagine that you have a task that is: *Based on a list of IDs you have to retrieve information from an API*. Due to technical limitations, you cannot pass the list of IDs to the API, but rather you have to make a call for each ID. What is the first idea that comes to mind? Probably a loop, stinks of a loop. The implementation could be something like this:

```js
async function fetchUserListInfo(ids) {
  const values = []
  for (const id of ids) {
    values.push(await fetchUserInfo(id))
  }
  return values
}
```

It seems simple and if we try it we will see that it works. Get information from all users without problems. No problem? That await inside the `for` forces each promise to finish completing before processing the next one.

<img-caption src="/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/await-loop.jpeg" alt= "Promises are resolved one by one">
   Resolving promises with an await inside a for
</img-caption>

This means that if on average the API takes 50ms to respond and we have 100 IDS to process, it will take about 5 seconds to complete the task. It's not that it's a drama, but if we implement this other solution things change a lot:

```js
function fetchUserListInfo(ids) {
  const values = []
  for (const id of ids) {
    values.push(fetchUserInfo(id))
  }
  return Promise.all(values)
}
```

Although it may seem the same, there are three subtle differences here:
1. The function is no longer asynchronous, although it does return a promise.
2. Within the for we no longer do an await
3. We return a Promise.all instead of the values as we did before.

The big difference with this solution is that within the loop we do not resolve the promises, but we simply add them to our array pending resolution. Any function that returns a promise returns it in this state that until you use `await` or `.then` it will not be *fulfilled* or *rejected*. We can see it as Schrodinger's cat experiment, until you open the box you don't know if the cat is alive or dead. Something similar happens to promises, until you resolve them they are in *pending* state and once resolved they can be *fulfilled*, which is when it has been resolved satisfactorily and what you have is the value, or *rejected* which is when there has been an error and what it does is throw the exception that you have to catch with a try/catch or with the `.catch`.

Returning to the solution, we see that the promises are not resolved, but are stored directly in the *Pending* state, and the function when returning them resolves them all *at once*. This now means that the task is done much faster, taking as long as it takes to respond to the slower API call.

<img-caption src="/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/promise-all.jpeg" alt= "Promises are resolved at the same time">
   Resolving promises with a Promise.all
</img-caption>

To see this better I'm going to show another demo in which we use almost the same code, the only thing that changes is that we replace the API call with a simple 1 millisecond wait. What we are going to see is how long each of the solutions takes executing this task for a list of 100 IDS and it will do it 1000 times so that we can see if there really is a performance difference or not.

![Result of running the demo for asynchronous loops](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/async-loop.png)

As we see, the difference is abysmal. For the same task when we use `Promise.all` it takes just over 1 second, but when we use `await` inside the for it takes **almost 2 minutes**. This difference in a real environment is critical and the worst thing is that we usually do not realize that the problem is in these types of sites.

Something to keep in mind about the `Promise.all`; If any promise throws an error, it will stop Promise.all, leaving promises unfulfilled. To avoid this, the method that returns the promise must have its own try/catch and handle the error. For example:

```ts
async function fetchUserInfo(id): User {
  try {
    const response = await fetch(`https://api.awesome-project.com/user/${id}`)
    return User.fromResponse(response)
  } catch(err) {
    console.error(`Error fetching user ${id}`)
    console.error(err.message)
    console.error(err.stack)
    return new NullUser()
  }
}
```

There is also [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) which prevents the error from stopping the process of resolving all promises. Another difference is that what this structure returns to us:

```ts
type PromiseAllSettleReturnValue<T> = Array<{
  status: 'fulfilled' | 'rejected',
  value?: T,
  reason?: Error
}>
```

### 3. Use Promise.all whenever you can

In our daily life developing software solutions we find that on more than one occasion we need several resources from different sites, whether tables, databases or APIs. All of this also has an asynchronous nature and we need to manage it.

```js
async function readAllUserInfo(userId) {
  const user = await readUser(userId)
  const contracts = await readContractsForUser(userId)
  const invoices = await readInvoicesForUser(userId)
  return {
    ...user,
    contracts,
    invoices
  }
}
```

Here we see a problem similar to the previous one, but without loops. Although it is less dramatic, it is another place where we can improve a little bit of performance if we use `Promise.all`, since as we see none of the requests depends on the other, so we could request all the information at once and thus reduce the time the function needs to perform the task.

```js
async function readAllUserInfo(userId) {
  const [ user, contracts, invoices ] = await Promise.all([
    readUser(userId),
    readContractsForUser(userId),
    readInvoicesForUser(userId)
  ])
  return {
    ...user,
    contracts,
    invoices
  }
}
```

Here we see how all the calls are passed to `Promise.all` and we destruct them in the same order in which we passed them. As before, this will take as long as the slowest request takes, instead of having to wait for all of them one after the other.

### 4. Be aware of how many promises you are managing

```js
function fetchUserListInfo(ids) {
  return Promise.all(ids.map(fetchUserInfo))
}
```

This would be another way to do the `fetchUserListInfo` that we saw a couple of slides ago. Both this and the previous solution have a problem, you don't know how many promises you are going to have in the `Promise.all`. In cases where you do not know the number of promises you are going to manage or this number is very high, it is advisable to use the `p-map` library and limit concurrency. The reason for doing this is that if you have too many promises you can end up doing a denial of service attack on yourself without realizing it.

In the *Project Lumberjack*, more than a denial of service attack, what we were worried about was drowning the database. In these projects, the usual practice was to limit concurrency to the number of connections we had configured for the database, thus avoiding drowning it.

```js
import pMap from 'p-map';

function fetchUserListInfo(ids) {
  return pMap(
    ids,
    fetchUserInfo,
    {concurrency: 10}
  )
}
```

The difference using `p-map` is that you have to separately pass the list over which you want to iterate, the function that will be executed for each of the elements in the list and finally the `p-map` options. In this case we only define that we want it to resolve a maximum of 10 promises at a time.

Finally, keep in mind that `p-map` in version 5 became of type ESModules and unless your project is done this way it will not work for you. To be able to use it with CommonJS you need to use version 4. The reality is that both versions only differ in whether they work with ESModules or CommonJS. In other words, if you import things into files with `import` or `require` respectively.

![Go from CommonJS to ESModules](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/cjs-to-esm.png)

### 5. Pay attention to the warnings

I don't know if it happens to anyone else that most of the time you ignore warnings and only give them importance when they are errors. In the console when I ran the process I got this:

```shell
(node) warning: possible EventEmitter memory leak detected.
11 listeners added.
Use emitter.setMaxListeners() to increase limit.
```

The message tells us that Node.js has detected a possible memory leak due to the *Event Emitter* because more listeners than recommended are being added. It offers you the option to increase the limit in case you are sure about what you are doing and you need it.

I thought *Meh, it's a warning*. In the first instance I simply did what I was told and increased the listeners without giving it much importance. However, the process was still too slow so I investigated the warning.

The problem was that there were event handlers that were being continuously created with each connection that was requested to the database connection pool, but that were not being eliminated, causing the memory leak. After implementing the fix in which every time a connection is returned to the pool the event handlers associated with the connection are cleaned, we saw an improvement in performance, taking 4 times less than what it took before.

## Result

With all these improvements in the *Lumberjack Project* we ran it again with the same data set and this time it took **04:52**. It was even faster than the original prototype which took 7 minutes. At that moment my inner self was something like this:

![GIF of The Dude in the Big Lebowski celebrating in his car](/assets/en/blog/2022/how-i-took-a-node.js-process-from-5-hours-to-5-minutes/fuck-yeah-dude.gif)

I don't remember if it was day, night, or what time it was. I just remember that feeling of *FUCK YEAH*, that step from anxiety to peace. And because we were completely sure that there was an improvement, we ran a test with a data set similar to what was faced in production every day, which was millions of records in the database. In this case the result was clear:

- Prototype: 41:29 minutes
- *Lumberjack Project:* 31:56 minutes

Apart from having improved the sustainability of the project, we had improved performance, making the process more than 20% faster. And all this reaching the deadline.

## Things I learned

In the end everything turned out well, but I definitely learned a couple of things from this experience:

- **Asynchrony in JS is more misunderstood than I thought.** Asynchrony management in JavaScript is something that not everyone has internalized. Everyone uses promises and async/await and starting to work with JavaScript or TypeScript is not that complicated, what is more complicated is knowing how to manage asynchrony in JavaScript. Clarify that asynchrony itself is something that is not easy to understand, since this also happens in other languages.
- **Train your team, share knowledge.** Find time to gradually train it. In my experience, mob programming helps a lot, but it is not enough. Some concepts you need to internalize and for that it is best to do katas or have training with specific objectives. At first it is quite hard to prepare these kinds of formations, but as you have them you can reuse them as new people join or if you change teams you can train that new team.
- **Responsibility must be shared.** It is quite typical for the most experienced people on the team to carry things on their shoulders. Responsibility must be shared, both technologically and in relation to software design or methodologies. The idea is that team members learn from each other no matter what level of experience they have. The exchange of ideas from different points of view can greatly enrich the team.
- **Be expendable.** If you are expendable you will not be the bottleneck. In this story I was a bottleneck for technical and businness knowledge. It's something I regret, but also something I learned from. Be careful, I say dispensable, not unnecessary. By this I mean that you should not be critical of knowledge, whether it is business, process or technology. Always try to share your knowledge with the team and document it. Everything that has a beginning has an end, so at some point you will no longer be on the team you are on now. When that happens, the important thing is that you do not take knowledge with you, but that you have left it on the team in the form of documentation. This way you will be expendable.

And this has been the story and learning of how I took a process in Node.js from 5 hours to 5 minutes. Recapping these are my 6 tips when managing async in JavaScript:
1. Avoid unnecessary async
2. Avoid awaits inside loops
3. Use Promise.all whenever you can
4. Be aware of how many promises you are managing
5. Read and take care of the warnings.

## A couple more things

I have a couple more things in the pipeline that are not a product of this experience with *The Lumberjack Project*, but rather from day to day life over the last few years and I want to share them.

- **Do not mix asynchrony types**: Apart from being more difficult to read, it also ends up affecting performance because most of the time what we do is complicate asynchronous behavior.
- **Async generators, that great unknown**: In JavaScript there is a thing called generators, of which its asynchronous version arrived a couple of years ago. Where async generators shine is when managing streams. However, there are other use cases that are also very useful. Lucciano Mammino gave a [talk about them at NodeCONF EU in 2021](https://www.youtube.com/watch?v=uTzBHPpMEhA).
- **Research the Event Loop**: Understanding how JavaScript works below helps you understand why sometimes things don't happen as we expect. In the Node.js documentation there is a guides section in which there is a call [*The Node.js Event Loop, Timers, and process.nextTick()*](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/). It is a document that took 6 months to write and that explains the different processes and the order in which they are executed in each round of the Event Loop in Node.js.

I also left here [this article by James Snell](https://www.nearform.com/blog/optimise-node-js-performance-avoiding-broken-promises/) on promise management in Node.js.
