import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math"; // KaTeX
import rehypeKatex from "rehype-katex"; // KaTex
import tailwindcss from "@tailwindcss/vite";
// https://expressive-code.com/
// Reduce SVG:
// https://vecta.io/nano

// https://astro.build/config
export default defineConfig({
  site: "https://edelveart.github.io",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        return (
          !page.startsWith("https://edelveart.github.io/store/") &&
          !page.startsWith("https://edelveart.github.io/services/")
        );
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkMath], // KaTeX
    rehypePlugins: [rehypeKatex], // KaTeX
    shikiConfig: {
      theme: "catppuccin-macchiato",
      wrap: false, //code wrap
    },
  },

  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
