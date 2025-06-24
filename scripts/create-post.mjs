#!/usr/bin/env node
import * as readline from 'node:readline/promises'
import * as fs from 'node:fs/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })
await createPost(rl, fs)
rl.close()

async function createPost(rl, fs) {
  const lang = await rl.question('Which language? (es/en)\n')
  const validLangs = ['en', 'es']
  if (!validLangs.includes(lang)) {
    throw new Error(`Invalid language. Excpected ${validLangs}. Received: ${lang}`)
  }
  const title = await rl.question('What is the title of your new post?\n')
  const description = await rl.question('A short description for your post\n')
  const tags = await rl.question('Tags for your post (comma separated)\n')
  const slug = await rl.question('A friendly URL for your post\n')
  const postPath = lang === 'en'
    ? `src/pages/blog/drafts/${slug}.md`
    : `src/pages/es/blog/drafts/${slug}.md`
  const assetsPath = `src/assets/${lang}/blog/${new Date().getFullYear()}/${slug}`
  const post = generatePost({ title, description, tags, assetsPath })
  await Promise.all([
    fs.writeFile(postPath, post),
    fs.mkdir(assetsPath)
  ])
  await fs.cp('src/assets/images/fallback.png', assetsPath + '/cover.png')
}

function generatePost({ title, description, tags, assetsPath }) {
  return `---
title: ${title}
cover: ${assetsPath.replace('src', '')}
date: ${new Date().toISOString().split('T')[0]}
description: ${description}
tags: [${tags.split(',')}]
draft: true
coverCopyright: null
---`
}
