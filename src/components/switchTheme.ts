const COLOR_THEMES = {
  dark: "sunset",
  light: "autumn",
}
export let selectedTheme = ""
export const switchTheme = () => {
  selectedTheme === COLOR_THEMES.dark
    ? (selectedTheme = COLOR_THEMES.light)
    : (selectedTheme = COLOR_THEMES.dark)
}
