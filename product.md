You are an elite Product Manager and Fullstack Developer specializing in building scalable AI-powered content platforms.

Your task is to design and implement a complete blog system called **“Impact Stories”** with the following requirements:

---

## 🧠 PRODUCT OVERVIEW

**Product Name:** Impact Stories
**Theme:** Light, clean, modern (white, blue aesthetic)
**Purpose:** Publish high-quality, SEO-optimized blog posts about global impact topics.

The website must include:

* **Main/Home Page** for the primary landing experience
* **Blog Page** for listing all articles
* **Blog Detail Page** for reading individual posts

Each blog post must display:

* **Date**
* **Time**
* **Category**

The blog page must also support:

* **Category filtering**
* **Search functionality**

---

## 🎯 TARGET CONTENT TOPICS

Focus on creating meaningful, insightful, and high-value articles related to:

* World Economic Forum
* Global issues & geopolitics
* Foundations & non-profits (yayasan)
* Artificial Intelligence
* Technology innovation
* Sustainability & climate
* Tourism (especially Bali/global destinations)
* Green skilling & future jobs

---

## ⚙️ TECH STACK

### Frontend

* Framework: Next.js (App Router)
* Styling: Clean UI (white + blue theme)
* SEO optimized pages
* Dynamic routing for blog posts (`/blog/[slug]`)
* Main/Home Page
* Blog Page with search and category filters
* Blog detail page with date, time, and category display

### Backend / Data

* Database: PostgreSQL
* Hosting: Neon
* ORM: Prisma (recommended)

---

## 🤖 AUTOMATION SYSTEM

Build an automated content generation system with the following flow:

### Trigger:

* Cron job runs **every day at 09:00**

### Process:

1. Generate a new blog post using AI (Gemini 3.1 Flash API)
2. Automatically:

   * Create title
   * Generate slug
   * Write full article
   * Add SEO structure
   * Assign category
   * Add date and time metadata
3. Fetch a relevant image from Unsplash (use hyperlink only)

### Output:

* Store post in PostgreSQL (Neon)
* Make it instantly available on frontend

---

## ✍️ CONTENT GENERATION RULES (VERY IMPORTANT)

Every generated blog post MUST include:

### 1. SEO Structure

* Title (optimized for SEO)
* Meta description (max 160 characters)
* Proper heading hierarchy:

  * H1 (title)
  * H2 (sections)
  * H3 (subsections)

### 2. Content Quality

* Insightful, not generic
* Data-driven if possible
* Professional tone
* Clear storytelling style

### 3. Image

* Use image from Unsplash (URL only)
* Include:

  * image URL
  * alt text (SEO optimized)

### 4. Author

Always set:
Author: **Wayan Phantom Megaditha**
Add the date and time for each post.

### 5. Category

Every post must have a clear category, such as:

* AI
* Technology
* Sustainability
* Tourism
* Global Issues
* Non-Profit
* Future Jobs
* World Economy

---

## 🧱 DATABASE SCHEMA (SUGGESTION)

Create a `posts` table with:

* id
* title
* slug (unique)
* content
* meta_description
* image_url
* image_alt
* author
* category
* created_at
* published_at

The `created_at` or `published_at` field must be used to display the **date and time** of each post.

---

## 🔌 API STRUCTURE

Create endpoints:

* `GET /posts` → list posts
* `GET /posts/:slug` → detail
* `POST /posts` → insert post (used by automation)
* `GET /posts?search=` → search posts by keyword
* `GET /posts?category=` → filter posts by category

---

## ⏰ CRON SYSTEM

Implement a cron job that:

* Runs daily at 09:00
* Calls AI (Gemini 3.1 Flash)
* Generates 1 new article
* Assigns a category
* Saves it to database

---

## 🎨 UI REQUIREMENTS

* Minimalist design
* Clean typography
* White background
* Blue accent color
* Responsive (mobile-first)
* Main/Home Page with strong hero section
* Blog Page with:

  * Search bar
  * Category filter
  * Post cards showing title, excerpt, category, date, and time
* Blog Detail Page showing:

  * Title
  * Author
  * Category
  * Date and time
  * Featured image
  * Full content

---

## 🚀 GOAL

Build a scalable **AI-powered content engine** that:

* Automatically publishes blog posts daily
* Is SEO optimized
* Has a clear homepage and blog page structure
* Supports search and category filtering
* Displays date and time on every post
* Can grow into a traffic + monetization asset

---

## ⚠️ EXECUTION RULE

You must:

* Think like a Product Manager (clarity, structure, scalability)
* Build like a Senior Fullstack Engineer (clean architecture)
* Write like a professional SEO content strategist

---

Now start by:

1. Designing the folder structure
2. Creating the database schema (Prisma)
3. Building the API
4. Implementing cron automation
5. Generating a sample blog post

Output everything step-by-step in a clear and structured way.
