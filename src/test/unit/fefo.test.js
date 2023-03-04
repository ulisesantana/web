const { strict: assert } = require('node:assert')
const { describe, it } = require('node:test')
const fefo = require('../../data/fefo')
const { generatePost } = require('../builders/post')

describe('fefo should', () => {
  describe('work whit dates', () => {
    it('returning the date string based on locale', () => {
      const date = new Date('2023/03/01')

      assert.equal(
        fefo.dates.toLocaleDateString(date, 'es-ES'),
        'miércoles, 1 de marzo de 2023'
      )
      assert.equal(
        fefo.dates.toLocaleDateString(date, 'en-US'),
        'Wednesday, March 1, 2023'
      )
    })
  })

  describe('work with blog posts', () => {
    describe('returning the related posts', () => {
      const posts = [
        generatePost({
          url: '/test1',
          tags: ['software', 'food']
        }),
        generatePost({
          url: '/test2',
          tags: ['software']
        }),
        generatePost({
          url: '/test3',
          tags: ['food']
        })
      ]

      it('successfully', () => {
        assert.deepEqual(
          fefo.blog.getRelatedPosts(posts[2].page.url, posts),
          [posts[0]]
        )
        assert.deepEqual(
          fefo.blog.getRelatedPosts(posts[0].page.url, posts),
          [posts[1], posts[2]]
        )
      })
    })
  })
})
