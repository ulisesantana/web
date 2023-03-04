class ImageCaption extends HTMLElement {
  connectedCallback () {
    console.log('RUN')
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
    console.log(this.innerHTML)
  }
};

window.customElements.define('img-caption', ImageCaption)
