# Samvigya Trivedi — Interactive Resume

An interactive, pastel-themed resume site built with Next.js + Tailwind CSS, designed for Vercel deployment.

## What's inside

- **Hero** — name, tagline (click to cycle through role framings), and a download-CV button
- **Profile metrics** — animated count-up stat cards (ARR, adoption %, reports delivered)
- **Approach** — interactive accordion: "Client's got a problem? Here's my move" (4-step framework)
- **Experience** — expandable job cards with full bullet detail
- **Said About Me** — anonymized client + manager quotes
- **Skills** — clickable skill/tool pills
- **Education**
- **Contact / Footer**

The downloadable CV PDF lives at `/public/Samvigya_Trivedi_CSM_Resume.pdf` and is linked from the hero button.

## Running locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deploying to Vercel

**Option A — via GitHub (recommended):**
1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — just click **Deploy**. No config needed.

**Option B — via Vercel CLI (no GitHub needed):**
```bash
npm install -g vercel
cd this-project-folder
vercel
```
Follow the prompts (link or create a project) — it'll give you a live URL in under a minute.
Run `vercel --prod` to push it to your permanent production URL.

## Editing content

- Job history: `components/Experience.tsx`
- Metrics/stats: `components/MetricsGrid.tsx`
- The "approach" framework steps: `components/ProblemSolver.tsx`
- Testimonials/quotes: `components/Testimonials.tsx`
- Skills/tools list: `components/Skills.tsx`
- Education: `components/Education.tsx`
- Colors/fonts: CSS variables at the top of `app/globals.css`
- Resume PDF: replace `public/Samvigya_Trivedi_CSM_Resume.pdf` with an updated file (keep the same filename, or update the `href` in `components/Hero.tsx`)
