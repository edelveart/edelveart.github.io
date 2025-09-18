import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math"; // KaTeX
import rehypeKatex from "rehype-katex"; // KaTex

// https://astro.build/config
export default defineConfig({
  site: "https://edelveart.github.io",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        return (
          !page.startsWith("https://edelveart.github.io/blog/") &&
          !page.startsWith("https://edelveart.github.io/store/") &&
          !page.startsWith("https://edelveart.github.io/services/")
        );
      },
    }),
    tailwind(),
  ],
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    remarkPlugins: [remarkMath], // KaTeX
    rehypePlugins: [rehypeKatex], // KaTeX
    shikiConfig: {
      theme: "tokyo-night",
      // theme: "material-theme-ocean",
      // theme: "rose-pine-moon",
      wrap: false, //code wrap
    },
  },
});
