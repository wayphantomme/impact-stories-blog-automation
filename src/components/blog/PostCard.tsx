import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatPostDateTime, getExcerpt } from "@/lib/format";

type PostCardProps = {
  post: Post;
};

// Use a subdued, uniform color scheme for all categories to feel more institutional
const CATEGORY_STYLE = "bg-gray-100 text-gray-700 border-gray-200";

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:shadow-md">
      {/* Featured image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/9] overflow-hidden bg-surface">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category + date row */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <span
            className={`rounded-sm border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${CATEGORY_STYLE}`}
          >
            {post.category}
          </span>
          <time
            dateTime={post.publishedAt.toISOString()}
            className="text-xs text-muted"
          >
            {formatPostDateTime(post.publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {getExcerpt(post.content)}
        </p>

        {/* Read more */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Read the story
          <svg
            className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
