import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { createPost } from "./src/lib/posts";
import { fetchUnsplashImage } from "./src/lib/unsplash";
import { slugify } from "./src/lib/slugify";
import { CATEGORIES, isValidCategory } from "./src/lib/categories";

const generatedPostSchema = z.object({
  title: z.string().min(1),
  metaDescription: z.string().min(1), // will be sliced to 160 on save
  category: z.string().refine(isValidCategory, "Invalid category"),
  content: z.string().min(1),
  imageAlt: z.string().min(1),
  imageQuery: z.string().min(1),
});

async function main() {
  const apiKey = process.env.GEMINI_API_KEY!;
  const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const category = CATEGORIES[new Date().getDate() % CATEGORIES.length];

  console.log(`→ Model: ${modelName}`);
  console.log(`→ Category: ${category}`);

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `You are a professional SEO content strategist writing for "Impact Stories", a blog about global impact topics.

Write one insightful, data-driven blog post in the category: "${category}".

Topics may relate to: World Economic Forum, global issues & geopolitics, foundations & non-profits, artificial intelligence, technology innovation, sustainability & climate, tourism (especially Bali/global destinations), green skilling & future jobs.

Return ONLY valid JSON with this exact shape:
{
  "title": "SEO-optimized title",
  "metaDescription": "Max 160 characters meta description",
  "category": "${category}",
  "content": "Full article in Markdown with # H1 title, ## H2 sections, ### H3 subsections. Professional tone, clear storytelling, insightful not generic.",
  "imageAlt": "SEO-optimized alt text for featured image",
  "imageQuery": "2-4 word Unsplash search query for a relevant featured image"
}`;

  console.log("→ Calling Gemini API...");
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = generatedPostSchema.parse(JSON.parse(text));
  console.log(`✓ Generated: "${parsed.title}"`);

  console.log(`→ Fetching image for query: "${parsed.imageQuery}"...`);
  const imageUrl = await fetchUnsplashImage(parsed.imageQuery, category);
  console.log(`✓ Image URL: ${imageUrl}`);

  console.log("→ Saving to database...");
  const post = await createPost({
    title: parsed.title,
    slug: slugify(parsed.title),
    content: parsed.content,
    metaDescription: parsed.metaDescription.slice(0, 160),
    imageUrl,
    imageAlt: parsed.imageAlt,
    category: parsed.category,
    publishedAt: new Date(),
  });
  console.log(`✓ Post saved! Slug: ${post.slug}`);
  console.log(`\n🎉 Done! Visit: http://localhost:3000/blog/${post.slug}`);
}

main().catch((err) => {
  console.error("✗ Error:", err?.message ?? err);
  process.exit(1);
});
