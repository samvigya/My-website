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
      "Promoted from Senior Analyst after ARR responsibility jumped from $192K to $794K (313.5% increase) — a step-change my manager flagged as justifying both the raise and the role change.",
      "Own end-to-end relationships for international Fortune-level clients in FMCG, Flavour & Food, and Pharma, spanning NA, LATAM, EU, and APAC.",
      "Track account-level KPIs via Mixpanel to proactively surface adoption gaps, retention risk, and expansion opportunity before clients raise them.",
      "Lead onboarding and activation for 4+ enterprise accounts, coordinating across data, product, and engineering to hit measurable value within the first 30 days.",
      "Run weekly usage reviews to separate power users from low-engagement accounts, driving the targeted outreach that lifted adoption 20%+.",
    ],
  },
  {
    dates: "Dec 2024 — Mar 2026",
    company: "Convosight",
    location: "Gurugram, India",
    title: "Senior Analyst — Consumer Insights & Social Intelligence",
    accent: "var(--lavender-deep)",
    bullets: [
      "Delivered the highest volume of revenue-generating reports on the team — totaling INR 2.6 Cr in revenue generated, the highest on the team — across 50+ executive-ready analyses spanning 3+ international markets, with zero missed deadlines across multi-market, multi-phase studies.",
      "Built an automated social listening and sentiment analysis platform (Python, NLTK, TextBlob, Streamlit) proactively — cutting report turnaround by 3 hours per cycle and manual effort by 40%, hours that fed straight back to the team.",
      "Monitored sentiment and campaign effectiveness across 5+ channels for 10+ global brands, including a report a client called the best they'd seen in over a decade in social listening.",
      "Managed a wedding break mid-cycle with zero disruption to client deliverables.",
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
      "Coordinated across 5+ divisions to resolve data discrepancies, saving 5–6 hours weekly through structured reporting fixes.",
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
