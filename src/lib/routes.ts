export const normalizePath = (path: string) => path.split("?")[0].replace(/\/+$/, "") || "/";

export const isExactActive = (current: string, base: string) =>
  normalizePath(current) === normalizePath(base);

export const isSectionActive = (current: string, base: string) => {
  const c = normalizePath(current);
  const b = normalizePath(base);
  return c === b || c.startsWith(b + "/");
};
