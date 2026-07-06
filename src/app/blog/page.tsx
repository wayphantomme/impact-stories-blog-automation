import type { Metadata } from "next";
import { Suspense } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { SearchBar } from "@/components/blog/SearchBar";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { getPosts } from "@/lib/posts";
import { isValidCategory } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Browse all Impact Stories articles. Search and filter by category including AI, Sustainability, Tourism, and more.",
};

type BlogPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const search = params.search?.trim();
  const category =
    params.category && isValidCategory(params.category)
      ? params.category
      : undefined;

  let posts: Awaited<ReturnType<typeof getPosts>> = [];

  try {
    posts = await getPosts({ search, category });
  } catch {
    posts = [];
  }

  const hasFilters = Boolean(search || category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          All Articles
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Impact Stories Blog
        </h1>
        <p className="max-w-2xl text-muted">
          Explore insights on AI, sustainability, global issues, tourism, and
          the future of work. Use search and category filters to find what
          matters to you.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <Suspense fallback={<div className="h-12 rounded-xl skeleton" />}>
          <SearchBar />
        </Suspense>
        <Suspense fallback={<div className="h-10 rounded-xl skeleton" />}>
          <CategoryFilter />
        </Suspense>
      </div>

      {/* Results count */}
      {posts.length > 0 && (
        <p className="mb-6 text-sm text-muted">
          {hasFilters
            ? `${posts.length} result${posts.length !== 1 ? "s" : ""} found`
            : `${posts.length} article${posts.length !== 1 ? "s" : ""}`}
        </p>
      )}

      {/* Posts grid or empty state */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-foreground">No posts found</p>
          <p className="mt-2 text-sm text-muted">
            Try adjusting your search or category filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
