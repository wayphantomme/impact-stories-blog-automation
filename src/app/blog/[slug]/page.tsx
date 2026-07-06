import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/PostContent";
import { BlogPostingJsonLd } from "@/components/blog/BlogPostingJsonLd";
import { formatPostDateTime, getSiteUrl } from "@/lib/format";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export const dynamicParams = true;

const CATEGORY_STYLE = "bg-gray-100 text-gray-700 border-gray-200";

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      return { title: "Post Not Found" };
    }

    return {
      title: post.title,
      description: post.metaDescription,
      openGraph: {
        title: post.title,
        description: post.metaDescription,
        type: "article",
        publishedTime: post.publishedAt.toISOString(),
        authors: [post.author],
        images: [{ url: post.imageUrl, alt: post.imageAlt }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.metaDescription,
        images: [post.imageUrl],
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof getPostBySlug>> = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const postUrl = `${getSiteUrl()}/blog/${post.slug}`;
  const categoryStyle = CATEGORY_STYLE;
  const readTime = estimateReadTime(post.content);

  return (
    <>
      <BlogPostingJsonLd post={post} url={postUrl} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Meta row */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyle}`}
          >
            {post.category}
          </span>
          <time
            dateTime={post.publishedAt.toISOString()}
            className="text-sm text-muted"
          >
            {formatPostDateTime(post.publishedAt)}
          </time>
          <span className="text-muted/40">·</span>
          <span className="text-sm text-muted">{readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        {/* Author */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{post.author}</p>
            <p className="text-xs text-muted">Author</p>
          </div>
        </div>

        {/* Featured image */}
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* Article content */}
        <PostContent content={post.content} />

        {/* Footer divider */}
        <hr className="mt-12 border-border" />
        <div className="mt-6 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
          >
            ← More Articles
          </Link>
          <p className="text-xs text-muted">Published on Impact Stories</p>
        </div>
      </article>
    </>
  );
}
