const pluginWebC = require('@11ty/eleventy-plugin-webc')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/styles': 'styles' })
  eleventyConfig.addPlugin(pluginWebC, {
    components: 'src/components/**/*.webc'
  })

  eleventyConfig.addPassthroughCopy({ public: '.' })

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
    },
    markdownTemplateEngine: false
  }
}
