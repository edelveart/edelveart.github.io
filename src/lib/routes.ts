export const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

export const isSamePath = (a: string, b: string) =>
  normalizePath(a) === normalizePath(b);

export const isSectionActive = (current: string, base: string) => {
  const c = normalizePath(current);
  const b = normalizePath(base);
  return c === b || c.startsWith(b + "/");
};
