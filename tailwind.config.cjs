/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme"
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Iosevka", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["autumn", "sunset"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "sunset", // name of one of the included themes for dark mode
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
}
