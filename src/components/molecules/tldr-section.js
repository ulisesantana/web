class TldrSection extends HTMLElement {
  show = false
  element = null
  content = null

  connectedCallback () {
    this.element = this.querySelector(':scope .tldr')
    this.content = this.querySelector(':scope .tldr .content')
    console.log(this.element)
    console.log(this.content)
    this.element.addEventListener('click', this.handleClick.bind(this))
  }

  disconnectedCallback () {
    this.element.removeEventListener('click', this.handleClick)
  }

  /**
   * Handle click on the button
   */
  handleClick () {
    console.log('click')
    this.show = !this.show
    this.content.classList.toggle('closed')
    this.content.classList.toggle('open')
  }
}

window.customElements.define('tldr-section', TldrSection)
