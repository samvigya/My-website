"use client";

import { useEffect, useRef, useState } from "react";

type Job = {
  dates: string;
  company: string;
  location: string;
  title: string;
  current?: boolean;
  bullets: string[];
  accent: string;
};

const jobs: Job[] = [
  {
    dates: "Apr 2026 — Present",
    company: "Convosight",
    location: "Gurugram, India",
    title: "Customer Success Manager",
    current: true,
    accent: "var(--coral-deep)",
    bullets: [
      "Own end-to-end customer success for five global Fortune-level accounts — P&G (Asia, ~$500K), PepsiCo (Asia & Americas, ~$138K), Takasago (Americas, EU, Asia, ~$120K), Winland Foods (US, ~$120K), and Sun Pharma (South Africa, Thailand, Nigeria, ~$36K) — spanning FMCG, Flavour & Food, and Pharma, with combined ARR of $914K.",
      "Lead onboarding and drive product adoption by solving live client use cases on-platform, showing how the product resolves their business questions — translating consumer voice into decisions across brand, marketing, and innovation.",
      "Act as day-to-day trusted advisor: resolve queries, deepen platform usage, and grow account health, satisfaction, retention, and expansion.",
      "Built a proactive account health framework — segmenting accounts by usage signals to flag risk early and identify expansion opportunities — turning reactive support into a repeatable retention and growth motion.",
    ],
  },
  {
    dates: "Dec 2024 — Mar 2026",
    company: "Convosight",
    location: "Gurugram, India",
    title: "Senior Analyst — Consumer Insights & Social Intelligence",
    accent: "var(--lavender-deep)",
    bullets: [
      "Served as sole point of contact across the full report lifecycle, from initial client briefing calls through final delivery, personally presenting all 50+ executive-ready analyses to clients across 3+ international markets, while generating the highest revenue on the team (INR 2.6 Cr) with zero missed deadlines across multi-market, multi-phase studies.",
      "Proactively identified and automated a manual internal reporting process by building two tools — an influencer vetting platform, and a separate platform combining sentiment analysis and a purchase intent classification model — using Python, Vercel, and Claude Code to ship quickly, saving 5–6 man-hours per day across the team.",
      "Monitored sentiment and campaign effectiveness across 5+ digital channels for 10+ global brands; one client called a deliverable the best insights report they'd seen in over a decade in social listening.",
      "Collaborated with product, engineering, and marketing to integrate social performance data into client workflows, supporting A/B testing across 3+ campaigns.",
    ],
  },
  {
    dates: "Jul 2023 — Oct 2024",
    company: "Sundaram-Clayton Limited",
    location: "Chennai, India",
    title: "Data Analyst",
    accent: "var(--mint-deep)",
    bullets: [
      "Built and maintained 10+ Power BI and Excel dashboards across Marketing, Finance, and Sales, optimizing business operations by 20% while holding SLA data quality standards.",
      "Coordinated across 5+ divisions to investigate and resolve data discrepancies, saving 5–6 hours weekly through structured reporting improvements.",
    ],
  },
];

function JobNode({
  job,
  index,
  isOpen,
  onToggle,
}: {
  job: Job;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLit(true);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={nodeRef} className="relative pl-16 sm:pl-20 pb-10 last:pb-0">
      {/* dot on the line */}
      <div
        className="absolute left-0 top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500"
        style={{
          background: lit ? job.accent : "var(--butter-deep)",
          borderColor: lit ? job.accent : "var(--line)",
          transform: lit ? "scale(1)" : "scale(0.7)",
        }}
      >
        <span className="font-[family-name:var(--font-mono)] text-[12px] font-semibold text-white">
          {jobs.length - index}
        </span>
      </div>

      <button
        onClick={onToggle}
        className="w-full text-left rounded-3xl border border-[var(--line)] bg-white p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-[18px] sm:text-[19px] text-[var(--ink)]">
                {job.title}
              </h3>
              {job.current && (
                <span className="font-[family-name:var(--font-mono)] text-[10.5px] text-[var(--mint-deep)] border border-[var(--mint-deep)] rounded-full px-2 py-0.5">
                  current
                </span>
              )}
            </div>
            <p className="text-[14px] text-[var(--ink-soft)] mt-0.5">
              {job.company} · {job.location}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink-soft)]">
              {job.dates}
            </span>
            <span
              className="font-[family-name:var(--font-mono)] text-[var(--ink-soft)] transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </div>
        </div>

        <div
          className="grid transition-all duration-300 ease-out"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ul className="pt-5 space-y-3">
              {job.bullets.map((b, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-[14.5px] text-[var(--ink-soft)] leading-relaxed"
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: job.accent }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function Experience() {
  const [open, setOpen] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // progress from 0 (top of container at bottom of viewport) to 1 (bottom of container at top of viewport)
      const total = rect.height + viewportH * 0.6;
      const scrolled = viewportH * 0.85 - rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      setFillHeight(pct * 100);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* base line */}
      <div
        className="absolute left-[18px] sm:left-[20px] top-1 bottom-0 w-[3px] rounded-full"
        style={{ background: "var(--line)" }}
        aria-hidden
      />
      {/* animated fill line */}
      <div
        className="absolute left-[18px] sm:left-[20px] top-1 w-[3px] rounded-full transition-all duration-300 ease-out"
        style={{
          height: `${fillHeight}%`,
          background:
            "linear-gradient(to bottom, var(--coral-deep), var(--lavender-deep), var(--mint-deep))",
        }}
        aria-hidden
      />

      {jobs.map((job, i) => (
        <JobNode
          key={i}
          job={job}
          index={i}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}

      {/* starting point marker */}
      <div className="relative pl-16 sm:pl-20">
        <div
          className="absolute left-[3px] sm:left-[5px] top-0 w-7 h-7 rounded-full border-2 border-dashed flex items-center justify-center"
          style={{ borderColor: "var(--ink-soft)" }}
        >
          <span className="text-[12px]">🎓</span>
        </div>
        <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink-soft)] pt-1">
          Where it started — MBA, Business Analytics ↓
        </p>
      </div>
    </div>
  );
}
