"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logos/logo-is-blue-nobg.png" 
              alt="Impact Stories Logo" 
              width={32} 
              height={32} 
              className="object-contain"
            />
            <span className="text-lg font-bold text-foreground tracking-tight">
              Impact Stories
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Donate Button */}
        <div className="flex items-center gap-4">
          <Link
            href="#donate"
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Donate Now
          </Link>
        </div>
        
      </div>
    </header>
  );
}
