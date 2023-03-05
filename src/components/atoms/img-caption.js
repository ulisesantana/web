class ImageCaption extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    const imgPath = this.getAttribute('src')
    const imgAlt = this.getAttribute('alt')
    this.shadowRoot.innerHTML = /* html */`
      <style>
        figure {
          align-items: center;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }

        img {
          border-radius: var(--border-radius);
          margin: 0 auto;
          max-width: 100%;
        }

        ::slotted(a) {
          border-bottom: solid 4px var(--accent-color);
          color: var(--accent-color);
          font-weight: 700;
        }
      </style>
      <figure>
        <img src="${imgPath}" alt="${imgAlt}">
        <figcaption>
          <small>
            <slot></slot>
          </small>
        </figcaption>
      </figure>
    `
  }
};

window.customElements.define('img-caption', ImageCaption)
