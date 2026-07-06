import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { ensureUniqueSlug, slugify } from "./slugify";

export type Post = Prisma.PostGetPayload<object>;

export type CreatePostInput = {
  title: string;
  slug?: string;
  content: string;
  metaDescription: string;
  imageUrl: string;
  imageAlt: string;
  author?: string;
  category: string;
  publishedAt?: Date;
};

export type GetPostsOptions = {
  search?: string;
  category?: string;
  limit?: number;
  offset?: number;
};

export async function getPosts(options: GetPostsOptions = {}): Promise<Post[]> {
  const { search, category, limit, offset } = options;

  const where: Prisma.PostWhereInput = {};

  if (category) {
    where.category = category;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { content: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.post.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
    skip: offset,
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return prisma.post.findUnique({ where: { slug } });
}

export async function slugExists(slug: string): Promise<boolean> {
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { id: true },
  });
  return post !== null;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const baseSlug = input.slug ?? slugify(input.title);
  const slug = await ensureUniqueSlug(baseSlug, slugExists);

  return prisma.post.create({
    data: {
      title: input.title,
      slug,
      content: input.content,
      metaDescription: input.metaDescription.slice(0, 160),
      imageUrl: input.imageUrl,
      imageAlt: input.imageAlt,
      author: input.author ?? "Wayan Phantom Megaditha",
      category: input.category,
      publishedAt: input.publishedAt ?? new Date(),
    },
  });
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return prisma.post.findMany({
    select: { slug: true },
    orderBy: { publishedAt: "desc" },
  });
}
