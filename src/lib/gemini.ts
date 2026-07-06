import { z } from "zod";
import { CATEGORIES, isValidCategory } from "./categories";

export const generatedPostSchema = z.object({
  title: z.string().min(1),
  metaDescription: z.string().min(1), // sliced to 160 before saving
  category: z.string().refine(isValidCategory, "Invalid category"),
  content: z.string().min(1),
  imageAlt: z.string().min(1),
  imageQuery: z.string().min(1),
});

export type GeneratedPost = z.infer<typeof generatedPostSchema>;

export async function generateBlogPost(
  category: (typeof CATEGORIES)[number],
): Promise<GeneratedPost> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
    },
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

  const runGeneration = async () => {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text) as unknown;
    return generatedPostSchema.parse(parsed);
  };

  try {
    return await runGeneration();
  } catch {
    return runGeneration();
  }
}
