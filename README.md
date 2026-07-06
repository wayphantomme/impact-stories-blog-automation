# 🌍 Impact Stories - AI-Powered Blog Automation Platform

> A scalable, AI-driven blog platform designed for NGOs and foundations to share impactful stories, campaign updates, and community news with automated daily content generation.

**Live Demo:** [impact-stories-blog.vercel.app](https://impact-stories-blog.vercel.app)

<!-- Screenshots: cropped previews of the app (referencing files in public/images/) -->
<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;margin-bottom:18px">
  <img src="https://raw.githubusercontent.com/wayphantomme/impact-stories-blog-automation/main/public/images/home-page.png" alt="Home - Impact Stories" style="width:32%;min-width:220px;object-fit:cover;height:200px;border-radius:6px;border:1px solid #eaeaea" />
  <img src="https://raw.githubusercontent.com/wayphantomme/impact-stories-blog-automation/main/public/images/blog-page.png" alt="Blog listing - Impact Stories" style="width:32%;min-width:220px;object-fit:cover;height:200px;border-radius:6px;border:1px solid #eaeaea" />
  <img src="https://raw.githubusercontent.com/wayphantomme/impact-stories-blog-automation/main/public/images/post.png" alt="Post view - Impact Stories" style="width:32%;min-width:220px;object-fit:cover;height:200px;border-radius:6px;border:1px solid #eaeaea" />
</div>

---

## 📖 Table of Contents

- [Business Overview](#-business-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Deployment](#-deployment)
- [Content Pipeline](#-content-pipeline)

---

## 💼 Business Overview

### Why Impact Stories?

**Impact Stories** solves a critical problem for NGOs, foundations, and non-profits: **consistent, high-quality content without constant effort**.

#### The Problem
- NGOs struggle to maintain regular blog updates
- Manual content creation is time-consuming and costly
- Inconsistent publishing leads to reduced audience engagement and SEO visibility
- Stories of impact often go untold due to resource constraints

#### The Solution
An **AI-powered content automation engine** that:
- ✅ Generates SEO-optimized articles **automatically every day at 09:00**
- ✅ Covers trending global topics (climate, AI, sustainability, global issues)
- ✅ Requires **zero manual intervention** after setup
- ✅ Builds organic traffic and improves search rankings
- ✅ Creates an **audience asset** for future monetization or partnerships

#### Target Topics
- 🌱 **Sustainability & Climate Action**
- 🤖 **Artificial Intelligence & Technology**
- 🌐 **Global Issues & Geopolitics**
- 💼 **Non-Profit Impact & Foundations**
- 🏨 **Tourism & Community Development**
- 📚 **Green Skilling & Future Jobs**
- 💰 **World Economy & Impact Investing**

---

## ✨ Key Features

### For Readers
- 📰 **Clean, Editorial Blog** - minimalist white + blue design inspired by foundation publications
- 🔍 **Smart Search** - Find posts by keyword across all content
- 📂 **Category Filtering** - Browse by topic (AI, Sustainability, Tourism, etc.)
- 📱 **Mobile-Responsive** - Perfect reading experience on all devices
- 🔗 **SEO-Optimized** - Each post is structured for search visibility

### For Organizations
- 🤖 **AI Content Generation** - Powered by Google Gemini 3.1 Flash
- ⏰ **Scheduled Automation** - Daily posts at 09:00 UTC (configurable)
- 📊 **Database-Backed** - PostgreSQL for reliability and scaling
- 🚀 **One-Click Deploy** - Vercel integration, instant CI/CD
- 🎨 **Donation CTA** - Optional call-to-action for fundraising

### For Developers
- 🏗️ **Modern Stack** - Next.js 16, React 19, TypeScript
- 🗄️ **Type-Safe ORM** - Prisma for database queries
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧪 **Production-Ready** - ESLint, TypeScript strict mode
- 📦 **Minimal Dependencies** - 9 direct dependencies, lightweight

---

## 🏗️ Architecture

### System Flow Diagram

```mermaid
graph LR
    A["⏰ Cron Trigger<br/>(Daily 09:00)"] -->|Calls| B["🤖 AI Engine<br/>(Gemini 3.1 Flash)"]
    B -->|Generates| C["📝 Content Bundle<br/>(Title, Content, Meta)"]
    C -->|Stores| D[("🗄️ PostgreSQL Database<br/>(Neon Hosted)")]
    D -->|Powers| E["🌐 Next.js Frontend<br/>(Blog + Search + Filter)"]
    E -->|Serves| F["👥 Readers<br/>(Web + Mobile)"]
    
    G["📸 Unsplash API"] -->|Provides| B
    
    style A fill:#4F46E5,color:#fff
    style B fill:#10B981,color:#fff
    style D fill:#F59E0B,color:#fff
    style E fill:#3B82F6,color:#fff
    style F fill:#8B5CF6,color:#fff
    style G fill:#EC4899,color:#fff
```

### Content Generation Pipeline

```mermaid
sequenceDiagram
    participant Cron as Cron Job
    participant Gemini as AI Engine
    participant Unsplash as Unsplash
    participant DB as Database
    participant Frontend as Blog Frontend

    Cron->>Gemini: 1. Request blog post
    activate Gemini
    Gemini->>Gemini: Generate title, slug, content, meta
    Gemini->>Unsplash: 2. Request image
    activate Unsplash
    Unsplash-->>Gemini: Return image URL
    deactivate Unsplash
    Gemini-->>Cron: Return complete post data
    deactivate Gemini

    Cron->>DB: 3. Insert post into database
    activate DB
    DB->>DB: Store: title, slug, content,<br/>image_url, category, author, timestamp
    DB-->>Cron: Confirmation
    deactivate DB

    Frontend->>DB: 4. Query posts
    DB-->>Frontend: Return posts
    Frontend-->>Frontend: Render blog with search/filters
```

### Data Model

```mermaid
erDiagram
    POSTS ||--o{ CATEGORY : belongs
    
    POSTS {
        int id PK
        string title UK
        string slug UK
        text content
        string meta_description
        string image_url
        string image_alt
        string author
        string category FK
        timestamp created_at
        timestamp published_at
    }
    
    CATEGORY {
        int id PK
        string name
        string slug
    }
```

---

## 🛠️ Tech Stack

### Frontend
| Layer | Tech |
|-------|------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Content** | React Markdown + GFM |
| **Validation** | Zod |

### Backend & Data
| Service | Tech |
|---------|------|
| **ORM** | Prisma 6 |
| **Database** | PostgreSQL (Neon) |
| **API** | Next.js Route Handlers |
| **AI** | Google Generative AI (Gemini 3.1 Flash) |
| **Images** | Unsplash API |

### Infrastructure
| Aspect | Solution |
|--------|----------|
| **Hosting** | Vercel |
| **CI/CD** | Vercel Auto-Deploy |
| **Cron Jobs** | Vercel Crons / External Scheduler |
| **Version Control** | Git + GitHub |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **PostgreSQL database** (Neon recommended for zero-setup)
- **Environment variables** for API keys

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/wayphantomme/impact-stories-blog-automation.git
cd impact-stories-blog-automation
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:
```env
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# AI & Content APIs
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Blog Configuration
BLOG_ADMIN_SECRET=your_admin_secret_here
```

4. **Initialize database**
```bash
npm run db:push
# or for migrations
npm run db:migrate
```

5. **Seed sample data (optional)**
```bash
npm run db:seed
```

---

## 💻 Development

### Local Development Server
```bash
npm run dev
```
Visit **http://localhost:3000**

### Project Structure
```
impact-stories-blog-automation/
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   │   ├── api/          # REST API endpoints
│   │   ├── blog/         # Blog pages
│   │   └── page.tsx      # Homepage
│   ├── components/       # React components
│   ├── lib/              # Utilities (Gemini, Unsplash, AI)
│   └── types/            # TypeScript types
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

### Key API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/posts` | List all posts (with pagination) |
| `GET` | `/api/posts?search=keyword` | Search posts by keyword |
| `GET` | `/api/posts?category=ai` | Filter posts by category |
| `GET` | `/api/posts/[slug]` | Get single post by slug |
| `POST` | `/api/posts` | Create new post (admin only) |
| `GET` | `/api/categories` | List all categories |

### Available Scripts
```bash
# Development
npm run dev              # Start dev server on port 3000

# Database
npm run db:push         # Apply schema changes to database
npm run db:migrate      # Run Prisma migrations
npm run db:seed         # Seed database with sample data

# Build & Production
npm run build           # Build for production
npm start              # Start production server

# Code Quality
npm run lint           # Run ESLint
```

---

## 📝 Content Pipeline

### Automated Daily Generation

The system runs a **cron job at 09:00 UTC daily** that:

1. **Triggers AI Generation**
   - Sends prompt to Google Gemini 3.1 Flash
   - Specifies topic categories (AI, sustainability, global issues, etc.)
   - Requests: title, slug, content (2000+ words), meta description

2. **Fetches Complementary Image**
   - Calls Unsplash API for relevant image
   - Stores URL and alt text for SEO

3. **Stores in Database**
   - Saves post with metadata (author, category, published_at)
   - Generates URL slug automatically

4. **Publishes Instantly**
   - Post becomes live on frontend
   - Indexed for search
   - Appears in category/chronological feeds

### Content Quality Standards
- ✅ **SEO-optimized** titles and meta descriptions
- ✅ **Well-structured** with H1 → H2 → H3 hierarchy
- ✅ **1500-2000+ words** per article
- ✅ **Data-driven** insights and references
- ✅ **Professional tone** suitable for NGO/foundation audience
- ✅ **Relevant imagery** from Unsplash

---

## 🌐 Deployment

### Deploy to Vercel

1. **Connect GitHub repository**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Select "Next.js" framework

2. **Set Environment Variables**
   - Add `DATABASE_URL`, `NEXT_PUBLIC_GEMINI_API_KEY`, `UNSPLASH_ACCESS_KEY`

3. **Deploy**
   - Vercel will auto-build and deploy on every commit to `main`

### Set Up Scheduled Content Generation

**Option 1: Vercel Crons** (Recommended)
```typescript
// app/api/cron/generate-post/route.ts
export const runtime = 'nodejs';

export async function GET(req: Request) {
  // Verify cron secret
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Trigger AI post generation
  const post = await generateBlogPost();
  return Response.json({ success: true, post });
}

export const config = {
  schedule: '0 9 * * *', // Daily at 09:00 UTC
};
```

**Option 2: External Services**
- [EasyCron](https://www.easycron.com/) - Free tier available
- [GitHub Actions](https://github.com/features/actions) - Workflow-based
- [AWS Lambda + EventBridge](https://aws.amazon.com/blogs/compute/scheduling-lambda-functions-using-eventbridge/) - Serverless

---

## 📊 Monitoring & Maintenance

### Database Backups
- Neon provides automatic daily backups
- Access via Neon dashboard

### Performance Monitoring
- Monitor API response times in Vercel dashboard
- Check Gemini API quota usage
- Track database query performance

### Content Quality
- Manually review weekly generated posts
- Adjust AI prompt if content quality drifts
- Update category list based on trending topics

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/)
- [Google Generative AI](https://ai.google.dev/)
- [Vercel Deployment](https://vercel.com/docs)
- [Unsplash API](https://unsplash.com/api)

---

## 💬 Support & Questions

For questions or issues:
- 📧 Email: [contact info]
- 🐛 GitHub Issues: [Create an issue](https://github.com/wayphantomme/impact-stories-blog-automation/issues)
- 💭 Discussions: [GitHub Discussions](https://github.com/wayphantomme/impact-stories-blog-automation/discussions)

---

## 🙏 Acknowledgments

Built with ❤️ for NGOs, foundations, and organizations creating positive global impact.

**Author:** Wayan Phantom Megaditha  
**Status:** Active Development  
**Last Updated:** July 2026
