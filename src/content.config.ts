import type { SchemaContext } from "astro:content";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import createSlug from "./lib/createSlug";
import { BADGE_COLORS, type BadgeName } from "@styles/utilsCSS";

const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),

    lang: z.literal("es").optional(),

    heroImage: image().optional(),

    badge: z
      .enum(Object.keys(BADGE_COLORS) as [BadgeName, ...BadgeName[]])
      .optional(),

    tags: z
      .array(z.string().transform((val) => createSlug(val)))
      .refine((items) => new Set(items).size === items.length, {
        message: "tags must be unique",
      })
      .optional(),
  });

const FigurateSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  //   pubDate: z.coerce.date(),
  //   updatedDate: z.string().optional(),
  //   heroImage: z.string().optional(),
  //   badge: z.string().optional(),
  //   tags: z
  //     .array(z.string())
  //     .refine((items) => new Set(items).size === items.length, {
  //       message: "tags must be unique",
  //     })
  //     .optional(),
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

// export type BlogSchema = z.infer<typeof blogSchema>;
export type BlogSchema = z.infer<ReturnType<typeof blogSchema>>;
const blogCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
    deferRender: true,
  }),
  schema: blogSchema,
});

export type FigurateSchema = z.infer<typeof FigurateSchema>;
const figurateCollection = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/figuratenum",
    deferRender: true,
  }),
  schema: FigurateSchema,
});

// export type StoreSchema = z.infer<typeof storeSchema>;
// const storeCollection = defineCollection({
//   loader: glob({
//     pattern: "**/*.md",
//     base: "./src/content/store",
//     deferRender: true,
//   }),
//   schema: storeSchema,
// });

export const collections = {
  blog: blogCollection,
  figurate: figurateCollection,
  //   store: storeCollection,
};
