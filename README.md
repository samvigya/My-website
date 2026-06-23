# Samvigya Trivedi — Interactive Resume

An interactive, pastel-themed resume site built with Next.js + Tailwind CSS, designed for Vercel deployment.

## What's inside

- **Hero** — name, location + LinkedIn, tagline (click to cycle through role framings), and a download-CV button
- **Profile metrics** — animated count-up stat cards (ARR, adoption %, reports delivered)
- **Get to know me** — personal interest cards (click to expand)
- **Approach** — interactive accordion: "Client's got a problem? Here's my move" (4-step framework)
- **Experience** — vertical timeline with animated scroll-fill connecting line
- **Said About Me** — anonymized client + manager quotes
- **Skills** — clickable skill/tool pills
- **Education**
- **Contact / Footer**
- **AI Chat Widget** — floating bubble (bottom-right) where visitors can ask an AI version of you questions, grounded in your real resume content

The downloadable CV PDF lives at `/public/Samvigya_Trivedi_CSM_Resume.pdf` and is linked from the hero button.

## Setting up the AI chat widget (required, free)

The chat widget needs a free Google Gemini API key to work. Without it, the widget still shows but politely tells visitors to email you directly instead.

**1. Get a free API key**
- Go to https://aistudio.google.com/app/apikey
- Sign in with any Google account
- Click "Create API Key" — no credit card needed
- Copy the key (starts with `AIza...`)

**2. Add it locally (for testing on your Mac)**
- Copy `.env.local.example` to a new file named `.env.local`
- Paste your key in: `GEMINI_API_KEY=AIza...`
- This file is already in `.gitignore` so it will never get pushed to GitHub

**3. Add it to Vercel (for the live site)**
- Go to your project on vercel.com → Settings → Environment Variables
- Add a new variable: Name = `GEMINI_API_KEY`, Value = your key, apply to all environments
- Redeploy (or just push any small change to trigger a new deploy)

**Free tier limits:** roughly 10 requests/minute and 250-500 requests/day on Gemini 2.5 Flash as of mid-2026 — more than enough for a personal resume site. The widget's resume context lives in `app/api/chat/route.ts` if you want to update what it knows about you.

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
- AI chat widget behavior/knowledge: `app/api/chat/route.ts` (the `RESUME_CONTEXT` constant)
- AI chat widget appearance: `components/ChatWidget.tsx`
