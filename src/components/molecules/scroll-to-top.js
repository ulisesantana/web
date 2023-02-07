class ScrollToTop extends HTMLElement {
  show = false
  element = null

  connectedCallback () {
    this.element = this.querySelector(':scope .scroll-to-top')
    this.handleScroll()
    // Add all listeners which can start scroll
    this.element.addEventListener('click', this.handleClick.bind(this))
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  disconnectedCallback () {
    this.element.removeEventListener('click', this.handleClick)
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const scrollLimit = 300
    if (window.pageYOffset > scrollLimit && !this.show) {
      this.show = true
      this.element.classList.remove('hidden')
    } else if (window.pageYOffset <= scrollLimit) {
      this.show = false
      this.element.classList.add('hidden')
    }
  }

  /**
   * Handle click on the button
   */
  handleClick () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

window.customElements.define('scroll-to-top', ScrollToTop)
