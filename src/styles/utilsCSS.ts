const rounded = "rounded-md";

// Links in .astro
export const LINKS_TO =
  "text-primary/95 underline underline-offset-2 hover:decoration-2 hover:text-primary transition-[color,text-underline-offset,text-decoration-thickness] duration-150 ease-in-out";

// CARD-ARCTIONS BORDER
export const BASE_BORDER = `border border-base-content/12 ${rounded}`;
export const BORDER_OPACITY = `${BASE_BORDER} hover:border-primary/40 transition-colors duration-150 ease-in-out hover:shadow-sm hover:shadow-base-300/15`;

// IMAGES BORDER
export const BASE_BORDER_IMG = `${rounded} shadow-md shadow-base-300/15`; // .astro
export const PROSE_IMG_BORDER = `prose-img:rounded-md prose-img:shadow-md prose-img:shadow-base-300/15`; // blog

// CARD CONTENT: BLOG + SOFTWARE
export const CARD_OP = {
  title: "text-lg font-semibold text-base-content",
  parr: "text-sm text-secondary-content",
  muteData: "text-sm text-neutral-content",
};

// DECORATION POST-BLOG BORDER
export const BORDER_INFO =
  "relative border-l-2 pl-4 border-base-content/20 before:absolute before:left-[-6px] before:top-1/2 before:-translate-y-1/2 before:size-2.5 before:rounded-xs before:border before:border-primary/40 before:bg-base-100";
export const BLOCK_QUOTE = `text-right ${CARD_OP.muteData}`;

// BADGES AND METADATA
const metaBase = "text-sm tracking-wide uppercase font-light";
export const BADGE_COLORS = {
  "field notes": `${metaBase} text-error/85`,
  "lab notes": `${metaBase} text-accent/85`,
  "sketch notes": `${metaBase} text-secondary/85`,
  "misc notes": `${metaBase} text-info/85`,
  tags: "text-sm text-primary/75 hover:text-primary underline transition-colors underline-offset-2 font-normal hover:decoration-2",
  warning: `${metaBase} text-warning/85`,
  cardsImg: `${metaBase} text-primary/85`,
  NO_LISTED: `${metaBase} text-base-content/85`,
} as const;

export type BadgeName = keyof typeof BADGE_COLORS;
export type BadgeClass = (typeof BADGE_COLORS)[BadgeName];

export function GET_COLORS_METADATA(badge?: BadgeName): BadgeClass {
  return BADGE_COLORS[badge ?? "NO_LISTED"];
}

export const NAV_LINKS_PAGES = {
  aLink: `group flex w-full min-h-14 items-center gap-1.5 ${rounded} px-1 py-2 no-underline`,
  prevLeft: "justify-start",
  nextRight: "justify-end",
  prevNext: "text-sm uppercase tracking-wide text-base-content/75 font-light",
  pageTitle:
    "text-base line-clamp-2 group-hover:text-primary group-hover:underline underline-offset-2 group-hover:decoration-2 font-normal transition-[color,text-underline-offset,text-decoration-thickness] duration-150 ease-in-out",
  arrowSpan:
    "transition-colors duration-150 ease-in-out group-hover:text-primary",
};

export const MAX_W_CONTENT = "xl:max-w-136";

// export const DRAWER_BREAKPOINTS = {
//   sideBar: "hidden xl:block",
//   baseLayout: "drawer xl:hidden",
//   headerPC: "hidden xl:flex",
//   headerMobile: "xl:hidden",
// };

export const DRAWER_BREAKPOINTS = {
  sideBar: "hidden min-[1280px]:block",
  baseLayout: "drawer min-[1280px]:hidden",
  headerPC: "hidden min-[1280px]:flex",
  headerMobile: "min-[1280px]:hidden",
};
