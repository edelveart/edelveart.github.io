import { GENERATE_SLUG_FROM_TITLE } from "../config";

export default function createSlug(title: string, staticSlug?: string): string {
  if (!GENERATE_SLUG_FROM_TITLE && staticSlug) return staticSlug;

  // Fallback
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/^-+|-+$/g, "");
}
