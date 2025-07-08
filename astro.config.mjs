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
      filter: (page) =>
        page !== "https://edelveart.github.io/blog/" &&
        page !== "https://edelveart.github.io/store/" &&
        page !== "https://edelveart.github.io/services/",
    }),
    tailwind(),
  ],
  image: {
    service: passthroughImageService(),
  },
});
