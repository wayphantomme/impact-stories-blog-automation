import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/auth";
import { CATEGORIES } from "@/lib/categories";
import { generateBlogPost } from "@/lib/gemini";
import { createPost, getPosts } from "@/lib/posts";
import { slugify } from "@/lib/slugify";
import { fetchUnsplashImage } from "@/lib/unsplash";

function pickCategory(): (typeof CATEGORIES)[number] {
  const today = new Date();
  const index = today.getDate() % CATEGORIES.length;
  return CATEGORIES[index];
}

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const category = pickCategory();
    const generated = await generateBlogPost(category);
    const imageUrl = await fetchUnsplashImage(generated.imageQuery, category);

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
    console.error("Cron generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate post" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
