class TldrSection extends HTMLElement {
  content = null
  cta = null
  show = false

  connectedCallback () {
    this.cta = document.querySelector(':scope .tldr .summary')
    this.content = document.querySelector(':scope .tldr .content')

    this.cta.addEventListener('click', this.handleClick.bind(this))
    document.addEventListener('click', this.onDocumentClick.bind(this))
  }

  disconnectedCallback () {
    this.cta.removeEventListener('click', this.handleClick)
    document.removeEventListener('click', this.onDocumentClick)
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

  onDocumentClick (event) {
    if (
      this.show &&
      !this.cta.contains(event.target) &&
      !this.content.contains(event.target)
    ) {
      this.close()
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
