export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function ensureUniqueSlug(
  baseSlug: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> {
  let slug = baseSlug;
  let counter = 2;

  while (await exists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  return slug;
}
