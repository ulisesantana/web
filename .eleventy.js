const pluginWebc = require("@11ty/eleventy-plugin-webc");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles')
  eleventyConfig.addPlugin(pluginWebc, { 
    components: 'src/_components/*.webc' 
  });
  eleventyConfig.addCollection("posts_es", function (collection) {
    return collection.getFilteredByGlob("./src/es/posts/*.md");
  });
  eleventyConfig.addCollection("posts_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/posts/*.md");
  });

  return {
    templateFormats: ["webc", "md"],
    dir: {
      input: "./src",
      output: "_site",
      layouts: "_includes/layouts",
      includes: "_includes",
      data: "_data"
    },
    passthroughFileCopy: true
  }
};