const youTubeVideoStyle = /* html */`
<style>
  .youtube-video {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .youtube-video .video-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%;
    /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
  }

  /* Then style the iframe to fit in the container div with full height and width */
  .youtube-video .video-wrapper iframe {
    border-radius: var(--border-radius);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
`

class YouTubeVideo extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const videoId = this.getAttribute('video-id')
    const caption = this.getAttribute('video-caption') || ''
    this.shadowRoot.innerHTML = /* html */`
    ${youTubeVideoStyle}
    <div class="youtube-video">
      <div class="video-wrapper">
        <iframe src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
      <small>${caption}</small>
    </div>
    `
  }
};

window.customElements.define('youtube-video', YouTubeVideo)
