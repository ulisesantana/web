module.exports = {
  /**
   * @param {}
   * @returns {Post}
   */
  generatePost ({
    url,
    tags
  }) {
    const date = new Date()
    return {
      page: {
        url,
        date
      },
      data: {
        date,
        tags
      }
    }
  }
}
