const pluginWebC = require('@11ty/eleventy-plugin-webc')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const { EleventyRenderPlugin } = require('@11ty/eleventy')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/styles': 'styles' })
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets' })
  eleventyConfig.addPassthroughCopy({ 'src/components/**/*.js': 'components' })
  eleventyConfig.addPlugin(EleventyRenderPlugin)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginWebC, {
    components: 'src/components/**/*.webc'
  })

  eleventyConfig.addCollection('posts_es', function (collection) {
    return collection.getFilteredByGlob('./src/pages/es/posts/*.md')
  })
  eleventyConfig.addCollection('posts_en', function (collection) {
    return collection.getFilteredByGlob('./src/pages/en/posts/*.md')
  })

  return {
    dir: {
      input: 'src/pages',
      includes: '../components',
      layouts: '../layouts',
      data: '../data'
    }
  }
}
