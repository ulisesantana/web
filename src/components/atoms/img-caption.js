class ImageCaption extends HTMLElement {
  connectedCallback () {
    const imgPath = this.getAttribute('src')
    const imgAlt = this.getAttribute('alt')
    const imgCaption = this.getAttribute('caption')
    this.innerHTML = /* html */`
      <figure>
        <img src="${imgPath}" alt="${imgAlt}">
        <figcaption>
          <small>
            ${imgCaption}
          </small>
        </figcaption>
      </figure>
    `
  }
};

window.customElements.define('img-caption', ImageCaption)
