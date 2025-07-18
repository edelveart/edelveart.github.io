import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

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
});
