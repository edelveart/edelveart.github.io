import { getCollection } from "astro:content";
import type { SatoriOptions } from "satori";
import satori from "satori";
import sharp from "sharp";
import fs from "node:fs/promises";

const posts = await getCollection("blog");

const font400 = await fs.readFile(
  "./public/source-sans-pro-latin-400-normal.ttf",
);

const font700 = await fs.readFile(
  "./public/source-sans-pro-latin-700-normal.ttf",
);

const SATORI_OPTIONS: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Source Sans 3",
      data: font400,
      weight: 400,
      style: "normal",
    },
    {
      name: "Source Sans 3",
      data: font700,
      weight: 700,
      style: "normal",
    },
  ],
};

export async function getStaticPaths() {
  return posts.map((post) => ({
    params: {
      route: post.id.replace(".md", ""),
    },
    props: {
      post,
    },
  }));
}
const COLORS = {
  badge: "#94e2d5",
  title: "#b4befe",
  desc: "#cdd6f4",
  myname: "#eba0ac",
};

export async function GET({ props }) {
  const { post } = props;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "#1e1e2e",
          color: "#cdd6f4",
          fontFamily: "Source Sans 3",
          border: "2px solid #313244",
          borderRadius: "20px",
          overflow: "hidden",
        },

        children: [
          // TERMINAL DOTS
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 45,
                left: 70,
                display: "flex",
                gap: 10,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: "3px",
                      background: COLORS.badge,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: "3px",
                      background: COLORS.title,
                    },
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      width: 12,
                      height: 12,
                      borderRadius: "3px",
                      background: COLORS.myname,
                    },
                  },
                },
              ],
            },
          },

          // BACKGROUND NODES
          //   {
          //     type: "div",
          //     props: {
          //       style: {
          //         position: "absolute",
          //         right: 80,
          //         top: 80,
          //         width: 170,
          //         height: 170,
          //         borderRadius: "999px",
          //         background: "#313244",
          //       },
          //     },
          //   },

          //   {
          //     type: "div",
          //     props: {
          //       style: {
          //         position: "absolute",
          //         right: 220,
          //         top: 220,
          //         width: 45,
          //         height: 45,
          //         borderRadius: "999px",
          //         background: "#89b4fa",
          //       },
          //     },
          //   },

          //   {
          //     type: "div",
          //     props: {
          //       style: {
          //         position: "absolute",
          //         right: 330,
          //         top: 140,
          //         width: 22,
          //         height: 22,
          //         borderRadius: "999px",
          //         background: "#94e2d5",
          //       },
          //     },
          //   },

          // DECORATIVE LINE
          //   {
          //     type: "div",
          //     props: {
          //       style: {
          //         width: "120px",
          //         height: "6px",
          //         background: "#b4befe",
          //         borderRadius: "999px",
          //         marginTop: 40,
          //       },
          //     },
          //   },

          // CONTENT
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
              },

              children: [
                // BADGE
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 26,
                      fontWeight: 400,
                      color: COLORS.badge,
                      letterSpacing: 2,
                      marginTop: 60,
                    },
                    children: post.data.badge?.toUpperCase(),
                  },
                },

                // TITLE
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 60,
                      fontWeight: 700,
                      marginTop: 20,
                      color: COLORS.title,
                      lineHeight: 1.1,
                      maxWidth: 900,
                    },
                    children: post.data.title,
                  },
                },

                // DESCRIPTION
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 30,
                      fontWeight: 400,
                      marginTop: 40,
                      color: COLORS.desc,
                      lineHeight: 1.2,
                      maxWidth: 850,
                    },
                    children: post.data.description,
                  },
                },
              ],
            },
          },

          // AUTHOR
          {
            type: "div",
            props: {
              style: {
                alignSelf: "flex-end",
                fontSize: 26,
                fontWeight: 400,
                color: COLORS.myname,
              },
              children: "Edgar Delgado Vega",
            },
          },
        ],
      },
    },
    SATORI_OPTIONS,
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
