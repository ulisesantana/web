#!/usr/bin/node
import * as readline from 'node:readline/promises'
import * as fs from 'node:fs/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })
await createPost(rl, fs)
rl.close()

async function createPost (rl, fs) {
  const title = await rl.question('What is the title of your new post?\n')
  const description = await rl.question('A short description for your post\n')
  const tags = await rl.question('Tags for your post (comma separated)\n')
  const slug = await rl.question('A friendly URL for your post\n')
  const post = generatePost({ title, description, tags })
  const postPath = `src/pages/blog/${new Date().getFullYear()}/${slug}.md`
  const assetsPath = `src/assets/blog/${new Date().getFullYear()}/${slug}`
  await Promise.all([
    fs.writeFile(postPath, post),
    fs.mkdir(assetsPath)
  ])
  await fs.cp('src/assets/images/fallback.png', assetsPath + '/cover.png')
}

function generatePost ({ title, description, tags }) {
  return `---
title: ${title}
date: ${new Date().toISOString().split('T')[0]}
description: ${description}
tags: [${tags.split(',')}]
draft: true
coverCopyright: null
---`
}
