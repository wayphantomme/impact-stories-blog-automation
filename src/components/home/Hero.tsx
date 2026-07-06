"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&h=900&fit=crop", // charity/community
    alt: "Children smiling together",
  },
  {
    url: "https://images.unsplash.com/photo-1593113580332-ce288d8b2e16?w=1600&h=900&fit=crop", // helping hands
    alt: "People working together",
  },
  {
    url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1600&h=900&fit=crop", // community care
    alt: "Volunteers helping out",
  },
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); // Slide every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden w-full h-[80vh] min-h-[500px] max-h-[800px] flex items-center mb-12">
      {/* Background Image Carousel */}
      {HERO_IMAGES.map((img, index) => (
        <div
          key={img.url}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest text-white uppercase bg-primary/90 rounded backdrop-blur-sm">
            Featured Story
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Empowering Communities for a Better Tomorrow
          </h1>
          <p className="text-lg leading-relaxed text-gray-200 mb-8 max-w-2xl">
            Read our latest stories on sustainable development, global initiatives, and the people making a real difference. Your support makes this possible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#donate"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Donate Now
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm border border-white/20 transition-colors hover:bg-white/20"
            >
              Read Our Stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
