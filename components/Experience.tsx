"use client";

import { useState } from "react";

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
    company: "ConvoTrack.ai",
    location: "Gurugram, India",
    title: "Manager, Client Success Partner (CSM)",
    current: true,
    accent: "var(--coral)",
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
    company: "ConvoTrack.ai",
    location: "Gurugram, India",
    title: "Senior Analyst — Consumer Insights & Social Intelligence",
    accent: "var(--lavender)",
    bullets: [
      "Delivered the highest volume of revenue-generating reports on the team — 50+ executive-ready analyses across 3+ international markets — with zero missed deadlines across multi-market, multi-phase studies.",
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
    accent: "var(--mint)",
    bullets: [
      "Built and maintained 10+ Power BI and Excel dashboards across Marketing, Finance, and Sales, optimizing business operations by 20% while holding SLA data quality standards.",
      "Coordinated across 5+ divisions to resolve data discrepancies, saving 5–6 hours weekly through structured reporting fixes.",
    ],
  },
];

export default function Experience() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="space-y-4">
      {jobs.map((job, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="rounded-3xl border border-[var(--line)] bg-white overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
              aria-expanded={isOpen}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: job.accent }}
                aria-hidden
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-[19px] text-[var(--ink)]">
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
                <span className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--ink-soft)]">
                  {job.dates}
                </span>
                <span
                  className="font-[family-name:var(--font-mono)] text-[var(--ink-soft)] transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </div>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <ul className="px-6 pb-6 space-y-3">
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
          </div>
        );
      })}
    </div>
  );
}
