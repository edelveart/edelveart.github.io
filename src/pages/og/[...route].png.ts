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
  badge: "#94e2d5", // Teal
  title: "#b4befe", // Lavender
  desc: "#bac2de", // Subtext1
  myname: "#eba0ac", // Maroon
};

const WIDTH_OF_CARD = 1200;
const HEIGHT_OF_CARD = 630;

///
//
const BADGE_SIZE = 40;
const TITLE_SIZE = 40;
const NAME_SIZE = 40;

const SHAPE_GAP = 60;

const GROUP_HEIGHT =
  BADGE_SIZE + SHAPE_GAP + TITLE_SIZE + SHAPE_GAP + NAME_SIZE;

const TOP_POS = (HEIGHT_OF_CARD - GROUP_HEIGHT) / 2;

const RIGHT_POS = 60;

const isBgTransparent: boolean = true;

const SHAPES = {
  badge: {
    right: RIGHT_POS,
    top: TOP_POS,
    size: BADGE_SIZE,
    radius: 10,
    border: `3px solid ${COLORS.badge}`,
    background: isBgTransparent ? "transparent" : COLORS.badge,
    opacity: 0.5,
  },

  title: {
    right: RIGHT_POS,
    top: TOP_POS + BADGE_SIZE + SHAPE_GAP,
    size: TITLE_SIZE,
    radius: 10,
    border: `3px solid ${COLORS.title}`,
    background: isBgTransparent ? "transparent" : COLORS.title,
    opacity: 0.6,
  },

  myname: {
    right: RIGHT_POS,
    top: TOP_POS + BADGE_SIZE + SHAPE_GAP + TITLE_SIZE + SHAPE_GAP,
    size: NAME_SIZE,
    radius: 10,
    border: `3px solid ${COLORS.myname}`,
    background: isBgTransparent ? "transparent" : COLORS.myname,
    opacity: 0.4,
  },
} as const;

/////
export async function GET({ props }) {
  const { post } = props;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: `${WIDTH_OF_CARD}px`,
          height: `${HEIGHT_OF_CARD}px`,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "#1e1e2e",
          color: "#cdd6f4",
          fontFamily: "Source Sans 3",
          //   border: "2px solid #313244",
          //   borderRadius: "20px",
          overflow: "hidden",
        },

        children: [
          // BACKGROUND NODES
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                right: SHAPES.title.right,
                top: SHAPES.title.top,
                width: SHAPES.title.size,
                height: SHAPES.title.size,
                borderRadius: SHAPES.title.radius,
                border: SHAPES.title.border,
                background: SHAPES.title.background,
                opacity: SHAPES.title.opacity,
              },
            },
          },

          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                right: SHAPES.badge.right,
                top: SHAPES.badge.top,
                width: SHAPES.badge.size,
                height: SHAPES.badge.size,
                borderRadius: SHAPES.badge.radius,
                border: SHAPES.badge.border,
                background: SHAPES.badge.background,
                opacity: SHAPES.badge.opacity,
              },
            },
          },

          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                right: SHAPES.myname.right,
                top: SHAPES.myname.top,
                width: SHAPES.myname.size,
                height: SHAPES.myname.size,
                borderRadius: SHAPES.myname.radius,
                border: SHAPES.myname.border,
                background: SHAPES.myname.background,
                opacity: SHAPES.myname.opacity,
              },
            },
          },

          // CONTENT
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
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
                      alignSelf: "flex-start",
                    },
                    children: post.data.badge?.toUpperCase(),
                  },
                },

                // TITLE
                {
                  type: "div",
                  props: {
                    style: {
                      marginTop: 40,
                      fontSize: 60,
                      fontWeight: 700,
                      color: COLORS.title,
                      lineHeight: 1.1,
                      maxWidth: 850,
                    },
                    children: post.data.title,
                  },
                },

                // DESCRIPTION
                {
                  type: "div",
                  props: {
                    style: {
                      marginTop: 28,
                      fontSize: 28,
                      fontWeight: 400,
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

// TERMINAL DOTS
// {
//   type: "div",
//   props: {
//     style: {
//       position: "absolute",
//       top: 45,
//       left: 60,
//       display: "flex",
//       gap: 10,
//     },
//     children: [
//       {
//         type: "div",
//         props: {
//           style: {
//             width: 12,
//             height: 12,
//             borderRadius: "3px",
//             background: COLORS.badge,
//           },
//         },
//       },
//       {
//         type: "div",
//         props: {
//           style: {
//             width: 12,
//             height: 12,
//             borderRadius: "3px",
//             background: COLORS.title,
//           },
//         },
//       },
//       {
//         type: "div",
//         props: {
//           style: {
//             width: 12,
//             height: 12,
//             borderRadius: "3px",
//             background: COLORS.myname,
//           },
//         },
//       },
//     ],
//   },
// },

// DECORATIVE LINE
// {
//   type: "div",
//   props: {
//     style: {
//       width: "120px",
//       height: "6px",
//       background: "#b4befe",
//       borderRadius: "999px",
//       marginTop: 40,
//     },
//   },
// },
