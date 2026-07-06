import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const samplePost = {
    title: "How AI Is Reshaping Global Sustainability Efforts",
    slug: "ai-reshaping-global-sustainability",
    content: `# How AI Is Reshaping Global Sustainability Efforts

Artificial intelligence is no longer a distant promise for environmental action—it is actively transforming how governments, NGOs, and corporations measure, predict, and reduce their ecological footprint.

## Data-Driven Climate Modeling

Machine learning models now process satellite imagery, ocean sensor data, and atmospheric readings at unprecedented scale. According to recent World Economic Forum reports, AI-enhanced climate models can improve forecast accuracy by up to 30%, enabling faster disaster response and smarter resource allocation.

### Predictive Analytics in Action

From forecasting wildfire spread to optimizing renewable energy grids, predictive AI systems help decision-makers act before crises escalate. Cities like Copenhagen and Singapore already deploy AI-driven traffic and energy systems that cut emissions while maintaining economic growth.

## The Role of Green Skilling

As AI automates routine tasks, the global workforce must adapt. Green skilling programs—training workers in renewable energy, circular economy design, and AI-assisted environmental monitoring—are emerging as critical investments for the Future Jobs agenda.

## Challenges Ahead

Despite its potential, AI itself carries an environmental cost. Training large language models consumes significant energy. The path forward requires transparent reporting, efficient model design, and equitable access so developing nations can participate in the AI-for-sustainability revolution.

## Conclusion

AI will not solve the climate crisis alone, but it offers powerful tools for insight, efficiency, and coordination. The organizations that combine ethical AI deployment with genuine sustainability commitments will lead the next decade of global impact.`,
    metaDescription:
      "Explore how AI is transforming global sustainability—from climate modeling to green skilling—and what it means for the future of environmental action.",
    imageUrl:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop",
    imageAlt: "Wind turbines and solar panels representing renewable energy and sustainability",
    author: "Wayan Phantom Megaditha",
    category: "Sustainability",
    publishedAt: new Date("2026-07-01T09:00:00.000Z"),
  };

  await prisma.post.upsert({
    where: { slug: samplePost.slug },
    update: samplePost,
    create: samplePost,
  });

  console.log("Seed complete: sample post created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
