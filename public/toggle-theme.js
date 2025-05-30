const primaryColorScheme = "dark"; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme") || "dark";

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;

  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

let themeValue = getPreferTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  for (const switchElement of document.querySelectorAll(
    ".theme-switch input"
  )) {
    switchElement.checked = themeValue === "dark";
  }
  reflectPreference();
}

function reflectPreference() {
  document.firstElementChild.setAttribute("data-theme", themeValue);

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

// set early so no page flashes / CSS is made aware
reflectPreference();

function setupMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  if (!btn) return;
  function handleClick() {
    document.querySelector(".mobile-nav .nav-items")?.classList?.toggle("active");
    btn?.classList.toggle("active");
  }
  btn.addEventListener("click", handleClick);
}

window.onload = () => {
  function setThemeFeature() {
    // set on load so screen readers can get the latest value on the button
    setPreference();
    reflectPreference();

    // now this script can find and listen for clicks on the control
    const buttons = document.querySelectorAll("#theme-btn");
    for (const button of buttons) {
      button.addEventListener("click", () => {
        themeValue = themeValue === "light" ? "dark" : "light";
        setPreference();
      });
    }
  }

  setThemeFeature();
  setupMobileMenu();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", () => {
    setThemeFeature();
    setupMobileMenu();
  });
};

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeValue);
    setPreference();
  });
