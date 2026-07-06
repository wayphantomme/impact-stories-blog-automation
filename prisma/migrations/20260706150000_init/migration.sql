-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "meta_description" VARCHAR(160) NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_alt" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Wayan Phantom Megaditha',
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE INDEX "posts_category_idx" ON "posts"("category");

-- CreateIndex
CREATE INDEX "posts_published_at_idx" ON "posts"("published_at" DESC);

