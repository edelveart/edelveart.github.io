import { createCatppuccinPlugin } from "@catppuccin/daisyui";

export default createCatppuccinPlugin(
  "mocha",
  {
    primary: "lavender", // primary: default = mauve
    info: "rosewater", //  info: default = sky, optional good is teal
    "base-content": "text",
    "secondary-content": "subtext1",
    "neutral-content": "subtext0",
  },
  {
    default: true,
  },
);
