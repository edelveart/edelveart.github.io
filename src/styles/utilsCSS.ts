export const NAV_LINKS_PAGES = {
  aLink:
    "group flex w-full min-h-24 items-center gap-3 rounded-md px-3 py-2 transition-colors duration-150 no-underline",
  prevLeft: "justify-start",
  nextRight: "justify-end",
  prevNext: "text-sm uppercase traking-wide text-base-content/65 font-light",
  pageTitle:
    "text-base line-clamp-2 transition-colors duration-150 group-hover:text-primary group-hover:underline underline-offset-2 group-hover:decoration-2 font-normal",

  arrowSpan: "transition-colors duration-150 group-hover:text-primary",
};

export const LINKS_TO =
  "text-primary underline underline-offset-2 decoration-1 transition-[text-underline-offset,text-decoration-thickness] duration-150 hover:decoration-2";

export const BORDER_INFO =
  "relative border-l-[2px] pl-4 border-base-content/20 before:absolute before:left-[-5px] before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-xs before:border before:border-primary/40 before:bg-base-100";

export const CARD_OP = {
  title: "text-lg font-semibold text-base-content",
  parr: "text-sm text-secondary-content",
  muteData: "text-sm text-neutral-content",
};

export const BLOCK_QUOTE = `text-right ${CARD_OP.muteData}`;

const metaBase = "text-sm tracking-wide uppercase font-light";

export const BADGE_COLORS = {
  "field notes": `${metaBase} text-accent/75`,
  "lab notes": `${metaBase} text-secondary/75`,
  "sketch notes": `${metaBase} text-info/75`,
  tags: "text-sm text-primary/75 hover:text-primary/100 underline transition-colors underline-offset-2 font-normal hover:decoration-2",
  warning: `${metaBase} text-warning/85`,
  cardsImg: `${metaBase} text-error/90`,
  NO_LISTED: `${metaBase} text-base-content/75`,
} as const;

export type BadgeName = keyof typeof BADGE_COLORS;
export type BadgeClass = (typeof BADGE_COLORS)[BadgeName];

export function GET_COLORS_METADATA(badge?: BadgeName): BadgeClass {
  return BADGE_COLORS[badge ?? "NO_LISTED"];
}
