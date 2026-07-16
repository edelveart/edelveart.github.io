import { createCatppuccinPlugin } from "@catppuccin/daisyui";

export default createCatppuccinPlugin(
  "mocha",
  {
    primary: "lavender", // primary: default = mauve
    secondary: "teal",
    info: "rosewater", //  info: default = sky, optional good is teal
    accent: "peach",
    "base-content": "text",
    "secondary-content": "subtext1",
    "neutral-content": "subtext0",
  },
  {
    default: true,
  },
);
