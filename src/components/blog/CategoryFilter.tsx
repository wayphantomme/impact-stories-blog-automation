"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function buildHref(category: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref(null)}
        className={`rounded-md border px-4 py-1.5 text-sm font-semibold transition-colors ${
          !activeCategory
            ? "bg-gray-800 text-white border-gray-800"
            : "bg-surface text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        All
      </Link>
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <Link
            key={category}
            href={buildHref(category)}
            className={`rounded-md border px-4 py-1.5 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-surface text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}
