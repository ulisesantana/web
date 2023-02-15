class ThemeSwitch extends HTMLElement {
  themeKey = 'theme'
  theme = {
    dark: 'dark',
    light: 'light'
  }

  connectedCallback () {
    const component = document.querySelector(':scope .theme-switch')
    const checkbox = document.querySelector(':scope input')
    checkbox.checked = this.getDarkModeCachedValue()
    this.setTheme(checkbox.checked)
    component.addEventListener('click', () => {
      checkbox.checked = !checkbox.checked
      this.setTheme(checkbox.checked)
    })
  }

  isDarkModeEnabled = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  setDarkModeCachedValue = (value) => window.localStorage.setItem(this.themeKey, value ? this.theme.dark : this.theme.light)
  getDarkModeCachedValue = () => {
    const state = window.localStorage.getItem(this.themeKey)
    if (state !== null) {
      return state === this.theme.dark
    }
    return this.isDarkModeEnabled()
  }

  setTheme (isDark) {
    this.setDarkModeCachedValue(isDark)
    if (isDark) {
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
    } else {
      document.body.classList.add('theme-light')
      document.body.classList.remove('theme-dark')
    }
  }
}

window.customElements.define('theme-switch', ThemeSwitch)
