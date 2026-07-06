export const CATEGORIES = [
  "AI",
  "Technology",
  "Sustainability",
  "Tourism",
  "Global Issues",
  "Non-Profit",
  "Future Jobs",
  "World Economy",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isValidCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}
