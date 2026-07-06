import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LatestPosts } from "@/components/home/LatestPosts";
import { KeyBenefits } from "@/components/home/KeyBenefits";
import { CallToAction } from "@/components/home/CallToAction";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Impact Stories — Global Impact Insights",
  description:
    "Discover daily insights on AI, sustainability, global issues, tourism, and the future of work from Impact Stories.",
};

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPosts>> = [];

  try {
    posts = await getPosts({ limit: 3 });
  } catch {
    posts = [];
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Hero />
      <LatestPosts posts={posts} />
      <KeyBenefits />
      <CallToAction />
    </div>
  );
}
