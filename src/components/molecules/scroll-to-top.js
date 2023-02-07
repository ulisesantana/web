import { supportsPassiveEvents } from 'detect-passive-events'
import TweenFunctions from 'tween-functions'

class ScrollToTop extends HTMLElement {
  show = false
  showUnder = 300
  component = null
  data = {
    startValue: 0,
    currentTime: 0, // store current time of animation
    startTime: null,
    rafId: null
  }

  connectedCallback () {
    this.component = this.querySelector(':scope .scroll-to-top')
    this.handleScroll()

    // Add all listeners which can start scroll
    this.component.addEventListener('click', this.handleClick)
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('wheel', this.stopScrolling, supportsPassiveEvents ? { passive: true } : false)
    window.addEventListener('touchstart', this.stopScrolling, supportsPassiveEvents ? { passive: true } : false)
  }

  disconnectedCallback () {
    this.component.removeEventListener('click', this.handleClick)
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('wheel', this.stopScrolling, false)
    window.removeEventListener('touchstart', this.stopScrolling, false)
  }

  handleScroll () {
    this.show = window.pageYOffset > this.showUnder
  }

  /**
   * Handle click on the button
   */
  handleClick () {
    this.stopScrolling()
    this.data.startValue = window.pageYOffset
    this.data.currentTime = 0
    this.data.startTime = null
    this.data.rafId = window.requestAnimationFrame(this.scrollStep)
  }

  /**
 * Calculate new position
 * and scroll screen to new position or stop scrolling
 * @param timestamp
 */
  scrollStep (timestamp) {
    if (!this.data.startTime) {
      this.data.startTime = timestamp
    }

    this.data.currentTime = timestamp - this.data.startTime

    const position = TweenFunctions[this.props.easing](
      this.data.currentTime,
      this.data.startValue,
      this.props.topPosition,
      this.props.duration
    )

    if (window.pageYOffset <= this.props.topPosition) {
      this.stopScrolling()
    } else {
      window.scrollTo(window.pageYOffset, position)
      this.data.rafId = window.requestAnimationFrame(this.scrollStep)
    }
  }

  /**
   * Stop Animation Frame
   */
  stopScrolling () {
    window.cancelAnimationFrame(this.data.rafId)
  }
}

window.customElements.define('scroll-to-top', ScrollToTop)
