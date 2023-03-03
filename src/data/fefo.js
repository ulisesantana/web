module.exports = {
  images: {
    fallback: '/assets/images/fallback.png',
    logo: '/assets/logo.png'
  },
  dates: {
    toLocaleDateString (date, locale) {
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString(locale, dateOptions)
    }
  }
}
