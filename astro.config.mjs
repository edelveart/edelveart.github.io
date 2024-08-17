import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

const LIVE_URL = "https://edelveart.github.io"
// https://astro.build/config
export default defineConfig({
  site: "https://edelveart.github.io",
  integrations: [mdx(), sitemap(), tailwind()],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
})
