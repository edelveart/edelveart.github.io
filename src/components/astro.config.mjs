import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import remarkMath from "remark-math"; // KaTeX
import rehypeKatex from "rehype-katex"; // KaTex
// https://expressive-code.com/

// https://astro.build/config
export default defineConfig({
  site: "https://edelveart.github.io",
  integrations: [
    tailwind(),
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
      theme: "aurora-x",
      wrap: false, //code wrap
    },
  },
  image: {
    service: passthroughImageService(),
  },
});
