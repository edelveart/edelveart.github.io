/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
        // sans: ["IBM Plex Sans Variable", ...defaultTheme.fontFamily.sans],
        // sans: ["Rubik Variable", ...defaultTheme.fontFamily.sans],
        // sans: ["Manrope Variable", ...defaultTheme.fontFamily.sans],
        sans: ["Sora Variable", ...defaultTheme.fontFamily.sans],
        // sans: ["Space Grotesk Variable", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono Variable", ...defaultTheme.fontFamily.mono],
        // sans: ["Ubuntu Sans Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["night"],
    // darkTheme: "night", // name of one of the included themes for dark mode
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
