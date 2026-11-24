// Theme switching
const toggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

// Apply a theme to the page and update the button's label
function applyTheme(theme) {
  root.dataset.theme = theme;
  if (theme === "dark") {
    toggle.textContent = "Switch to light theme";
  } else {
    toggle.textContent = "Switch to dark theme";
  }
}

// Read the saved theme
function loadTheme() {
  try {
    return localStorage.getItem("theme") || "light";
  } catch (error) {
    return "light";
  }
}

// Save the theme
function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    console.warn("The theme preference could not be saved.");
  }
}

// restore saved theme on load and reveal button
applyTheme(loadTheme());
toggle.hidden = false;

// flip the theme on click, apply then try to save
toggle.addEventListener("click", () => {
    const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    saveTheme(newTheme);
});