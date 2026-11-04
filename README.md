# Dhika Mahesa Syaputra, S.Kom. – AI Engineer Portfolio

A personal portfolio website for **Dhika Mahesa Syaputra, S.Kom.**, AI Engineer specializing in LLM applications, agentic RAG, and computer vision.

Designed with an original, technical, and calm aesthetic (near-black slate background, off-white text, emerald/teal accents, muted borders, and monospace accents). Engineered for recruiters and hiring managers to evaluate core competencies and quantitative proof of impact within 30 seconds.

---

## ⚡ Tech Stack & Architecture

- **Markup & Layout**: HTML5, Semantic Landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`), CSS Grid, Flexbox.
- **Styling**: Tailwind CSS v3.4 (minified to `/public/css/main.css`). Custom theme system with dark-mode first design and instant light-mode toggle respecting `prefers-color-scheme`.
- **Interactivity**: Alpine.js v3 (declarative reactive state for tabbed skills, category filter buttons, animated stat counters, mobile drawer navigation, and contact form handling).
- **Typography**: Geist Sans for body text paired with JetBrains Mono for metrics, section labels, and engineering tags.
- **Detail Pages**: Static multi-page case studies at `/projects/[slug]` with comprehensive architecture breakdowns, problem statements, engineering approaches, empirical results, and key learnings.
- **Serverless API**: Vercel Serverless Function at `POST /api/contact` validated with **Zod**, sending inquiries via **Resend** with honeypot spam protection, sliding-window rate limiting, and automatic graceful fallback to direct `mailto:` links when unconfigured.
- **Performance & Accessibility**: Zero tracking cookies, sub-second mobile page loads, WCAG AA contrast, accessible keyboard navigation, and visible `:focus-visible` indicators.

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- Node.js `^20.0.0 || ^22.0.0 || >=23.0.0`
- npm `10+`

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable               | Description                                      | Default                                                          |
| :--------------------- | :----------------------------------------------- | :--------------------------------------------------------------- |
| `RESEND_API_KEY`       | Resend API key for contact email delivery        | `re_your_api_key_here` (falls back to `mailto:` if unconfigured) |
| `CONTACT_EMAIL_TO`     | Recipient address for form inquiries             | `dhikamahesa45@gmail.com`                                        |
| `CONTACT_EMAIL_FROM`   | Verified sender address in Resend                | `onboarding@resend.dev`                                          |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata & sitemap        | `https://dhikamahesa.vercel.app`                                 |
| `NODE_ENV`             | Environment flag (`development` or `production`) | `development`                                                    |

### 3. Start Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev server serves static assets and handles `POST /api/contact` submissions locally.

---

## 🛠️ Build & Quality Scripts

```bash
# Run full production build (pages, minified CSS, CV PDF, and SEO assets)
npm run build

# Run TypeScript strict type-check
npm run typecheck

# Run ESLint validation
npm run lint

# Format code with Prettier
npm run format

# Rebuild only CSS
npm run build:css

# Rebuild only HTML pages
npm run build:pages

# Rebuild public CV PDF
npm run build:cv

# Regenerate sitemap, robots.txt, and Open Graph banner
npm run build:seo
```

---

## 📂 Content Management (`src/data/`)

All content is strictly isolated into typed TypeScript modules within `src/data/`:

- [`src/data/profile.ts`](src/data/profile.ts): Bio, headline, sub-headline, education, GPA, award, animated stat metrics, and quick facts.
- [`src/data/skills.ts`](src/data/skills.ts): The 5 tabbed skill categories:
  1. _LLM and agentic AI_
  2. _ML and computer vision_
  3. _Data and BI_
  4. _Backend and deployment_
  5. _Cloud and tools_
     _(Note: All project tags are strictly constrained to this master list)._
- [`src/data/projects.ts`](src/data/projects.ts): All 8 featured systems with problem statements, solutions, tech tags, empirical results, and case study details.
- [`src/data/research.ts`](src/data/research.ts): Numbered research cards (01 to 04) with Objective, Method, and Status.
- [`src/data/experience.ts`](src/data/experience.ts): Research Assistantship and Data Analyst internship details.
- [`src/data/timeline.ts`](src/data/timeline.ts): Milestones from 2022 to 2026.
- [`src/data/certifications.ts`](src/data/certifications.ts): 10 accredited credentials and programs.

After modifying any file in `src/data/`, simply run:

```bash
npm run build
```

---

## 🖼️ How to Replace Project Images & Screenshots

By default, clean SVG architectural schematics are generated into `/public/img/projects/`.

To replace an SVG with a real project screenshot:

1. Place your screenshot image (PNG, JPG, or WebP) inside `/public/img/projects/` (e.g. `/public/img/projects/citecheck-screenshot.png`).
2. Open [`src/data/projects.ts`](src/data/projects.ts).
3. Update the `imageSlot.src` property for that project:
   ```typescript
   imageSlot: {
     src: '/img/projects/citecheck-screenshot.png',
     alt: 'CiteCheck AI user interface running real-time citation verification',
     aspectRatio: '16/9',
     isPlaceholder: false
   }
   ```
4. Run `npm run build`.

---

## 📄 Public CV (`/public/cv.pdf`)

In accordance with privacy requirements, no phone number or street address appears anywhere on the website or in the downloadable CV.

To update or regenerate the public CV:

- The PDF generator script is located at [`scripts/generate-cv.ts`](scripts/generate-cv.ts).
- Run `npm run build:cv` to regenerate `/public/cv.pdf`.
- Alternatively, you can drop your own pre-compiled PDF directly at `public/cv.pdf`.

---

## 🚢 Deploying to Vercel

The project includes a ready-to-deploy [`vercel.json`](vercel.json) configured with clean URLs, security headers, and asset caching rules.

### Option 1: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Deploy via GitHub / GitLab Repository

1. Push this repository to GitHub.
2. In your Vercel Dashboard, select **Add New Project** and import the repository.
3. Keep default settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `public`
4. Under **Environment Variables**, add:
   - `RESEND_API_KEY`: Your Resend API key (e.g. `re_...`)
   - `CONTACT_EMAIL_TO`: `dhikamahesa45@gmail.com`
   - `NEXT_PUBLIC_SITE_URL`: Your custom domain (e.g. `https://dhikamahesa.com`)
5. Click **Deploy**.

---

## 📋 List of Remaining [TODO] Placeholders

Per project specifications, all items in `[brackets]` are rendered as visibly marked badges during development (`NODE_ENV=development`) and are hidden cleanly in production builds when empty.

Here is the complete checklist of placeholders ready for Dhika to fill in:

| File                           | Field          | Current Value             | What to Provide                                               |
| :----------------------------- | :------------- | :------------------------ | :------------------------------------------------------------ |
| `src/data/experience.ts`       | `type`         | `[part-time / full-time]` | Engagement type for Research Assistant position               |
| `src/data/projects.ts` (All 8) | `links.github` | `[add link]`              | Specific GitHub repository URLs for projects when made public |
| `src/data/projects.ts` (All 8) | `links.demo`   | `[add demo link]`         | Live interactive demo or Hugging Face Space links             |

---

## 🛡️ License

© 2026 Dhika Mahesa Syaputra. All rights reserved.
