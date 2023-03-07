const tldrStyles = /* html */`
<style>
  .tldr {
    color: var(--bg-color);
    padding: 0;
  }

  .tldr .summary {
    align-items: center;
    display: flex;
    background-color: var(--accent-color);
    border: none;
    border-radius: var(--border-radius);
    color: var(--bg-color);
    cursor: pointer;
    font-size: var(--font-size-3);
    font-weight: bold;
    justify-content: space-between;
    margin-bottom: 24px;
    padding: 8px;
    text-align: center;
  }

  .tldr .content.open {
    display: block;
  }

  .tldr .content.closed {
    display: none;
  }

  .tldr .content {
    left: 0;
    position: fixed;
    top: 0;
  }

  .tldr .blur {
    align-items: center;
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    display: flex; 
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: var(--z-index-6);
  }

  .tldr .text {
    background-color: var(--accent-color);
    border-radius: var(--border-radius);
    max-height: 65%;
    max-width: 80ch;
    overflow-y: auto;
    padding: 48px;
    width: 80%;
    z-index: var(--z-index-6);
  }

  .tldr .text> :first-child {
    margin-top: 0;
  }

  .tldr .text> :last-child {
    margin-bottom: 0;
  }

  @media print {
    .tldr {
      display: none;
    }
  }

  @media (max-width: 575px) {
    .tldr .summary {
      font-size: var(--font-size-2);
      font-weight: bold;
    }

    .tldr .summary~div {
      padding: 16px;
      padding-left: 50%;
    }

    .tldr blockquote {
      font-size: var(--font-size-1);
      margin: 0 0 16px;
    }

    .tldr blockquote p {
      font-size: var(--font-size-2);
    }
  }

  @media (min-width: 1500px) {
    .summary~div {
      left: 0;
      padding-left: 48px;
      width: 100%;
    }
  }
</style>
`

class TldrSection extends HTMLElement {
  content = null
  cta = null
  text = null
  show = false

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /* html */`
    ${tldrStyles}
    <div class="tldr">
      <button title="Open TL;DR" class="summary">
        <span>
          TL;DR 🔥
        </span>
      </button>
      <div class="content closed">
        <div class="blur">
          <div class="text">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>`
    this.cta = this.shadowRoot.querySelector('.tldr .summary')
    this.content = this.shadowRoot.querySelector('.tldr .content')
    this.text = this.shadowRoot.querySelector('.tldr .content .text')

    this.cta.addEventListener('click', this.handleClick.bind(this))
    this.content.addEventListener('click', this.handleClick.bind(this))
  }

  disconnectedCallback() {
    this.cta.removeEventListener('click', this.handleClick)
    this.content.removeEventListener('click', this.handleClick)
  }

  /**
   * Handle click on the button
   */
  handleClick(event) {
    if (!this.text.contains(event.target)) {
      if (this.show) {
        this.close()
      } else {
        this.open()
      }
    }
  }

  open() {
    this.show = true
    this.content.classList.remove('closed')
    this.content.classList.add('open')
  }

  close() {
    this.show = false
    this.content.classList.add('closed')
    this.content.classList.remove('open')
  }
}

window.customElements.define('tldr-section', TldrSection)
