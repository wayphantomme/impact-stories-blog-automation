import Link from "next/link";

export function CallToAction() {
  return (
    <section className="my-16 overflow-hidden rounded-2xl bg-surface px-6 py-16 text-center sm:px-12 lg:py-24 border border-border">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Stand With Us
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted">
          Your contribution helps us continue to uncover stories that shape our world, empower local communities, and drive sustainable global development. Safe, easy, and impactful.
        </p>
        <Link
          href="#donate"
          className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Donate Now
        </Link>
      </div>
    </section>
  );
}
