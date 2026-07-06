import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import type { Post } from "@/lib/posts";

type LatestPostsProps = {
  posts: Post[];
};

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) {
    return (
      <section className="py-12">
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Latest Stories
        </h2>
        <p className="text-muted">No posts yet. Check back soon.</p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Latest Stories</h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:text-primary-hover"
        >
          View all →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
