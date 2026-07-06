const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  AI: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
  Technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop",
  Sustainability:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop",
  Tourism:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=630&fit=crop",
  "Global Issues":
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=630&fit=crop",
  "Non-Profit":
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&h=630&fit=crop",
  "Future Jobs":
    "https://images.unsplash.com/photo-1521737711862-e3b97375f902?w=1200&h=630&fit=crop",
  "World Economy":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop",
};

export async function fetchUnsplashImage(
  query: string,
  category: string,
): Promise<string> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return (
      CATEGORY_FALLBACK_IMAGES[category] ??
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop"
    );
  }

  try {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", query);
    url.searchParams.set("per_page", "1");
    url.searchParams.set("orientation", "landscape");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Unsplash API request failed");
    }

    const data = (await response.json()) as {
      results: { urls: { regular: string } }[];
    };

    const imageUrl = data.results[0]?.urls.regular;
    if (!imageUrl) {
      throw new Error("No Unsplash results");
    }

    return imageUrl;
  } catch {
    return (
      CATEGORY_FALLBACK_IMAGES[category] ??
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop"
    );
  }
}
