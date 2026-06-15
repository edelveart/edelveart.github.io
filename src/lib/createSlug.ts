import { GENERATE_SLUG_FROM_TITLE } from "../config";

export default function createSlug(title: string, staticSlug?: string): string {
  if (!GENERATE_SLUG_FROM_TITLE && staticSlug) return staticSlug;

  // Fallback
  return title
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
