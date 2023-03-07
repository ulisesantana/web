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

        figcaption {
          font-size: var(--font-size-1);
          text-align: center;
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
