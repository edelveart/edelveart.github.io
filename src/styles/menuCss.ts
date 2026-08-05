export const transitionMenu =
  "transition-[color,opacity] duration-150 ease-in-out";

export const sideMenuCss = {
  base: `
    flex items-center gap-3 w-full rounded-md px-3 h-10
    ${transitionMenu}
  `,
  inactive: "text-neutral-content hover:text-primary",
  active: "text-primary font-semibold",
  spanText: "text-base",
  iconBox: "w-5 h-5 flex items-center justify-center shrink-0",
};

export const menuClass = (active: boolean) =>
  `${sideMenuCss.base} ${active ? sideMenuCss.active : sideMenuCss.inactive}`;

export const headerMenuClass = (active: boolean) => `
    px-1 py-3
    text-sm
    font-medium
    border-b-2
    transition-colors duration-150
    ${
      active
        ? "border-primary text-primary"
        : "border-transparent text-neutral-content hover:text-primary"
    }
`;
