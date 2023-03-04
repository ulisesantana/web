/**
 * @typedef {Object} EleventyPage
 * @property {string} inputPath
 * @property {string} url
 * @property {Date} date
 */

/**
 * @typedef {Object} PostCommonData
 * @property {string} title
 * @property {string} description
 * @property {boolean} draft
 * @property {Date} date
 * @property {string[]} tags
 */

/**
 * @typedef {Object} Post
 * @property {EleventyPage} page - Page data
 * @property {PostCommonData} data - Post minimal data
 * @property {string} content - Post content
 */

module.exports = {
  images: {
    fallback: '/assets/images/fallback.png',
    logo: '/assets/logo.png'
  },
  collections: {
    blog: {
      es: 'posts_es',
      en: 'posts_en'
    }
  },
  blog: {
    /**
     * Get related post based on shared tags
     * @param {string} fromPostUrl
     * @param {Post[]} posts
     * @returns {Post[]} A list of related post
     */
    getRelatedPosts (fromPostUrl, posts) {
      const { data: { tags } } = posts.find(({ page: { url } }) => url === fromPostUrl)
      return posts.filter(post =>
        post.page.url !== fromPostUrl &&
        post.data.tags.some(tag => tags.includes(tag))
      )
    },
    /**
     * Get tags from a post url
     * @param {string} fromPostUrl
     * @param {Post[]} posts
     * @returns {string[]} Post tags list
     */
    getTags (fromPostUrl, posts) {
      const { data: { tags } } = posts.find(({ page: { url } }) => url === fromPostUrl)
      return tags
    }
  },
  dates: {
    /**
     * @param {Date} date
     * @param {string} locale
     * @returns {string} Date string for locale
     */
    toLocaleDateString (date, locale) {
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString(locale, dateOptions)
    }
  }
}
