import type { Post } from "@/lib/posts";
import { getSiteUrl } from "@/lib/format";

type BlogPostingJsonLdProps = {
  post: Post;
  url: string;
};

export function BlogPostingJsonLd({ post, url }: BlogPostingJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.imageUrl,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.createdAt.toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: "Impact Stories",
      url: getSiteUrl(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
