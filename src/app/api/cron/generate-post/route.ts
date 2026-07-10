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

type CronStage =
  | "pick-category"
  | "generate-content"
  | "fetch-image"
  | "save-post";

const CRON_SLOT_BY_SCHEDULE: Record<string, number> = {
  "0 0 * * *": 0,
  "0 6 * * *": 1,
  "0 12 * * *": 2,
  "0 18 * * *": 3,
};

function getCronSlot(request: NextRequest, now: Date): number {
  const schedule = request.headers.get("x-vercel-cron-schedule");
  if (schedule && schedule in CRON_SLOT_BY_SCHEDULE) {
    return CRON_SLOT_BY_SCHEDULE[schedule];
  }

  return Math.floor(now.getUTCHours() / 6);
}

function pickCategory(request: NextRequest): (typeof CATEGORIES)[number] {
  const today = new Date();
  const slot = getCronSlot(request, today);
  const index = (today.getUTCDate() * 4 + slot) % CATEGORIES.length;
  return CATEGORIES[index];
}

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let stage: CronStage = "pick-category";

  try {
    const category = pickCategory(request);

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
      category: post.category,
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
