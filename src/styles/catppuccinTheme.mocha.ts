import { createCatppuccinPlugin } from "@catppuccin/daisyui";

export default createCatppuccinPlugin(
  "mocha",
  {
    primary: "lavender", // primary: default = mauve
    secondary: "teal",
    info: "rosewater", //  info: default = sky, optional good is teal
    accent: "peach",
    // "accent-content": "sapphire",
    "base-content": "text",
    "secondary-content": "subtext1",
    "neutral-content": "subtext0",
  },
  {
    default: true,
  },
);
