class TldrSection extends HTMLElement {
  content = null
  cta = null
  show = false

  connectedCallback () {
    this.cta = document.querySelector(':scope .tldr .summary')
    this.content = document.querySelector(':scope .tldr .content')

    this.cta.addEventListener('click', this.handleClick.bind(this))
    this.content.addEventListener('click', this.handleClick.bind(this))
  }

  disconnectedCallback () {
    this.cta.removeEventListener('click', this.handleClick)
    this.content.removeEventListener('click', this.handleClick)
  }

  /**
   * Handle click on the button
   */
  handleClick () {
    if (this.show) {
      this.close()
    } else {
      this.open()
    }
  }

  open () {
    this.show = true
    this.content.classList.remove('closed')
    this.content.classList.add('open')
  }

  close () {
    this.show = false
    this.content.classList.add('closed')
    this.content.classList.remove('open')
  }
}

window.customElements.define('tldr-section', TldrSection)
