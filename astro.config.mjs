import { defineConfig, passthroughImageService } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math"; // KaTeX
import rehypeKatex from "rehype-katex"; // KaTeX
import tailwindcss from "@tailwindcss/vite";
import { addCopyButton } from "shiki-transformer-copy-button";

export default defineConfig({
  site: "https://edelveart.github.io",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        if (!page) return false;
        return (
          !page.startsWith("https://edelveart.github.io/store/") &&
          !page.startsWith("https://edelveart.github.io/services/")
        );
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),

    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: false,
      transformers: [
        addCopyButton({
          toggle: 2000,
          button: {
            class: "my-copy-button",
            title: "copy",
          },
        }),
      ],
    },
  },

  image: {
    service: passthroughImageService(),
  },
});
