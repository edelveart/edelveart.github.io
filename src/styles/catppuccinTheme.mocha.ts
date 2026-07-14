import { createCatppuccinPlugin } from "@catppuccin/daisyui";

export default createCatppuccinPlugin(
  "mocha",
  {
    primary: "lavender", // primary: default = mauve
    info: "teal", //  info: default = sky, optional good is teal
  },
  {
    default: true,
  },
);
