import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

// const blog = defineCollection({
//   loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     pubDate: z.coerce.date(),
//     updatedDate: z.string().optional(),
//     heroImage: z.string().optional(),
//     badge: z.string().optional(),
//     tags: z
//       .array(z.string())
//       .refine((items) => new Set(items).size === items.length, {
//         message: "tags must be unique",
//       })
//       .optional(),
//   }),
// });

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  tags: z
    .array(z.string())
    .refine((items) => new Set(items).size === items.length, {
      message: "tags must be unique",
    })
    .optional(),
});

// const storeSchema = z.object({
//   title: z.string(),
//   description: z.string(),
//   custom_link_label: z.string(),
//   custom_link: z.string().optional(),
//   updatedDate: z.coerce.date(),
//   pricing: z.string().optional(),
//   oldPricing: z.string().optional(),
//   badge: z.string().optional(),
//   checkoutUrl: z.string().optional(),
//   heroImage: z.string().optional(),
// });

export type BlogSchema = z.infer<typeof blogSchema>;
// export type StoreSchema = z.infer<typeof storeSchema>;

const blogCollection = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: blogSchema,
});
// const storeCollection = defineCollection({ schema: storeSchema });

export const collections = { blogCollection };
