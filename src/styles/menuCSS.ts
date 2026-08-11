export const transitionMenu =
  "transition-[color,opacity] duration-150 ease-in-out";

export const sideMenuCss = {
  base: `
    flex items-center gap-3 w-full rounded-md px-3 h-10
    ${transitionMenu}
  `,
  inactive: "text-neutral-content hover:text-primary",
  active: "text-primary font-medium ", // bg-primary/5
  spanText: "text-base flex-1",
  iconBox: "w-5 h-5 flex items-center justify-center shrink-0",
};

export const menuClass = (active: boolean) =>
  `${sideMenuCss.base} ${active ? sideMenuCss.active : sideMenuCss.inactive}`;
