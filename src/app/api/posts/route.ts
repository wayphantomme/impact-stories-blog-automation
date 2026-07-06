import { NextRequest, NextResponse } from "next/server";
import { verifyApiSecret } from "@/lib/auth";
import { createPost, getPosts } from "@/lib/posts";
import { isValidCategory } from "@/lib/categories";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  content: z.string().min(1),
  metaDescription: z.string().max(160),
  imageUrl: z.string().url(),
  imageAlt: z.string().min(1),
  author: z.string().optional(),
  category: z.string().refine(isValidCategory, "Invalid category"),
  publishedAt: z.string().datetime().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;

  if (category && !isValidCategory(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    const posts = await getPosts({ search, category });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyApiSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const post = await createPost({
      ...parsed.data,
      publishedAt: parsed.data.publishedAt
        ? new Date(parsed.data.publishedAt)
        : undefined,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
