export function formatPostDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function getExcerpt(content: string, maxLength = 160): string {
  const plain = content
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trim()}…`;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
