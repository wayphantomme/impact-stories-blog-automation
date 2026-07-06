"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const [isFocused, setIsFocused] = useState(false);
  // Track if the change originated from the user (not from URL sync)
  const userTyped = useRef(false);

  // Sync from URL → input (e.g. browser back/forward), but only if user isn't actively typing
  useEffect(() => {
    if (!userTyped.current) {
      setQuery(searchParams.get("search") ?? "");
    }
  }, [searchParams]);

  // Debounce: push to URL only when user types
  useEffect(() => {
    if (!userTyped.current) return;

    const timeout = setTimeout(() => {
      userTyped.current = false;
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = query.trim();

      if (trimmed) {
        params.set("search", trimmed);
      } else {
        params.delete("search");
      }

      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname);
    }, 300);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); // intentionally only depends on query to avoid loop

  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${
          isFocused ? "text-primary" : "text-muted"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        id="blog-search"
        type="search"
        value={query}
        onChange={(event) => {
          userTyped.current = true;
          setQuery(event.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search articles..."
        className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted transition-all focus:border-primary focus:outline-none focus:ring-3 focus:ring-primary/15 hover:border-primary/40"
        aria-label="Search articles"
      />

      {/* Clear button */}
      {query && (
        <button
          type="button"
          onClick={() => {
            userTyped.current = true;
            setQuery("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-muted/20 text-muted transition-colors hover:bg-muted/30"
          aria-label="Clear search"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
