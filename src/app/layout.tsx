import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteUrl } from "@/lib/format";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Impact Stories",
    template: "%s | Impact Stories",
  },
  description:
    "High-quality, SEO-optimized blog posts about global impact topics — AI, sustainability, tourism, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Impact Stories",
    title: "Impact Stories",
    description:
      "High-quality, SEO-optimized blog posts about global impact topics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact Stories",
    description:
      "High-quality, SEO-optimized blog posts about global impact topics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
