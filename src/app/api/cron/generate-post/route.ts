import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/auth";
import { CATEGORIES } from "@/lib/categories";
import { generateBlogPost } from "@/lib/gemini";
import { createPost } from "@/lib/posts";
import { slugify } from "@/lib/slugify";
import { fetchUnsplashImage } from "@/lib/unsplash";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type CronStage = "pick-category" | "generate-content" | "fetch-image" | "save-post";

function pickCategory(): (typeof CATEGORIES)[number] {
  const today = new Date();
  const index = today.getDate() % CATEGORIES.length;
  return CATEGORIES[index];
}

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let stage: CronStage = "pick-category";

  try {
    const category = pickCategory();

    stage = "generate-content";
    const generated = await generateBlogPost(category);

    stage = "fetch-image";
    const imageUrl = await fetchUnsplashImage(generated.imageQuery, category);

    stage = "save-post";
    const post = await createPost({
      title: generated.title,
      slug: slugify(generated.title),
      content: generated.content,
      metaDescription: generated.metaDescription.slice(0, 160),
      imageUrl,
      imageAlt: generated.imageAlt,
      category: generated.category,
      publishedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      slug: post.slug,
      title: post.title,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Cron generation failed:", { stage, error });

    return NextResponse.json(
      { error: "Failed to generate post", stage, message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
