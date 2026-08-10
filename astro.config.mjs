import { defineConfig, passthroughImageService } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
// import mdx from "@astrojs/mdx"; // NOT INSTALLED (only .md content)
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math"; // KaTeX
import rehypeKatex from "rehype-katex"; // KaTeX
import rehypeExternalLinks from "rehype-external-links";
import tailwindcss from "@tailwindcss/vite";
import { addCopyButton } from "shiki-transformer-copy-button";
// expresivecode
export default defineConfig({
  site: "https://edelveart.github.io",
  trailingSlash: "always",
  integrations: [
    // mdx(),
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
  //   compressHTML: true,

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeExternalLinks,
          { rel: ["noreferrer", "noopener"], target: "_blank" },
        ],
      ],
    }),

    shikiConfig: {
      theme: "catppuccin-macchiato",
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
