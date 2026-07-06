import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/posts";
import { getSiteUrl } from "@/lib/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const slugs = await getAllPostSlugs();
    const postRoutes: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
