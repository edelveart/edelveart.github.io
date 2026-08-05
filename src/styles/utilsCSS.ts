const rounded = "rounded-md";

// Links in .astro
export const LINKS_TO =
  "text-primary/90 underline underline-offset-2 hover:decoration-2 hover:text-primary transition-[color,text-underline-offset,text-decoration-thickness] duration-150 ease-in-out";

// CARD-ARCTIONS BORDER
export const BASE_BORDER = `border border-base-content/12 ${rounded}`;
export const BORDER_OPACITY = `${BASE_BORDER} hover:border-primary/20 transition-colors duration-150 ease-in-out hover:shadow-sm hover:shadow-base-300/15`;

// IMAGES BORDER
export const BASE_BORDER_IMG = `${rounded} shadow-md shadow-base-300/15`; // .astro
export const PROSE_IMG_BORDER = `prose-img:${rounded} prose-img:shadow-md prose-img:shadow-base-300/15`; // blog

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
const metaBase = "text-sm tracking-wider uppercase font-light";
export const BADGE_COLORS = {
  "field notes": `${metaBase} text-error/80`,
  "lab notes": `${metaBase} text-accent/80`,
  "sketch notes": `${metaBase} text-secondary/80`,
  "misc notes": `${metaBase} text-info/80`,
  tags: "text-sm text-primary/75 hover:text-primary underline transition-colors underline-offset-2 font-normal hover:decoration-2",
  warning: `${metaBase} text-warning/80`,
  cardsImg: `${metaBase} text-primary/80`,
  NO_LISTED: `${metaBase} text-base-content/80`,
} as const;

export type BadgeName = keyof typeof BADGE_COLORS;
export type BadgeClass = (typeof BADGE_COLORS)[BadgeName];

export function GET_COLORS_METADATA(badge?: BadgeName): BadgeClass {
  return BADGE_COLORS[badge ?? "NO_LISTED"];
}

export const NAV_LINKS_PAGES = {
  aLink: `group flex w-full min-h-14 items-center gap-3 ${rounded} px-3 py-2 no-underline`,
  prevLeft: "justify-start",
  nextRight: "justify-end",
  prevNext: "text-sm uppercase tracking-wider text-base-content/75 font-light",
  pageTitle:
    "text-base line-clamp-2 group-hover:text-primary group-hover:underline underline-offset-2 group-hover:decoration-2 font-normal transition-[color,text-underline-offset,text-decoration-thickness] duration-150 ease-in-out",
  arrowSpan:
    "transition-colors duration-150 ease-in-out group-hover:text-primary",
};
