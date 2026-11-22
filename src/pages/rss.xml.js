// import rss from "@astrojs/rss";
// import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
// import { getCollection } from "astro:content";

// export async function GET(context) {
//   const blog = await getCollection("blog");
//   return rss({
//     title: SITE_TITLE,
//     description: SITE_DESCRIPTION,
//     site: import.meta.env.SITE,
//     items: blog.map((post) => ({
//       title: post.data.title,
//       pubDate: post.data.pubDate,
//       description: post.data.description,
//       link: `/blog/${post.slug}/`,
//     })),
//   });
// }

import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";
import createSlug from "@ts-config-path/lib/createSlug";

export async function GET(context) {
  const blog = await getCollection("blog");

  const sortedPosts = blog.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,

    items: sortedPosts.map((post) => {
      const slug = createSlug(post.data.title, post.id);
      const prefix = post.data.lang === "es" ? "/es/blog/" : "/blog/";

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `${prefix}${slug}/`,
      };
    }),
  });
}
