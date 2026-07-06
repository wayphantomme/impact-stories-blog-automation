const benefits = [
  {
    id: "scheduled-publishing",
    title: "Scheduled Publishing",
    description:
      "Automatically publish a new blog post every day at 09:00 without any manual effort.",
    icon: (
      <svg
        className="h-5 w-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
        />
      </svg>
    ),
  },
  {
    id: "seo-structure",
    title: "Built-in SEO Structure",
    description:
      "Each post includes optimized titles, headings, and meta descriptions out of the box.",
    icon: (
      <svg
        className="h-5 w-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    id: "image-content-ready",
    title: "Image & Content Ready",
    description:
      "Articles include relevant images sourced from Unsplash with SEO-friendly alt text.",
    icon: (
      <svg
        className="h-5 w-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "scalable-content",
    title: "Scalable Content Growth",
    description:
      "Build a consistent content pipeline that compounds traffic and authority over time.",
    icon: (
      <svg
        className="h-5 w-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
];

export function KeyBenefits() {
  return (
    <section className="py-16 sm:py-20">
      {/* Section header */}
      <div className="mb-12 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Why Impact Stories
        </p>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Key Benefits
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted">
          This blog is powered by an automated system using Google Gemini to
          generate SEO-structured articles. Each post includes relevant images
          from Unsplash with optimized alt text, and is published automatically
          on a scheduled basis.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="group rounded-xl border border-border bg-white p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
          >
            {/* Icon */}
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
              {benefit.icon}
            </div>

            {/* Title */}
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
