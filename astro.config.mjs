// import { defineConfig, passthroughImageService } from "astro/config";
// import mdx from "@astrojs/mdx";
// import sitemap from "@astrojs/sitemap";
// import tailwind from "@astrojs/tailwind";

// // https://astro.build/config
// export default defineConfig({
//   site: "https://edelveart.github.io",
//   integrations: [
//     mdx(),
//     sitemap({
//       filter: (page) =>
//         page !== "https://edelveart.github.io/blog/" &&
//         page !== "https://edelveart.github.io/store/" &&
//         page !== "https://edelveart.github.io/store/item1/" &&
//         page !== "https://edelveart.github.io/store/item2/" &&
//         page !== "https://edelveart.github.io/store/item3/" &&
//         page !== "https://edelveart.github.io/blog/tag/" &&
//         page !== "https://edelveart.github.io/blog/funciones-currificadas-en-typescript/" &&
//         page !== "https://edelveart.github.io/blog/tag/typescript/" &&
//         page !== "https://edelveart.github.io/services/",
//     }),
//     tailwind(),
//   ],
//   image: {
//     service: passthroughImageService(),
//   },
// });

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
