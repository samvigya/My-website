"use client";

import { useState } from "react";

const titles = [
  "Client Success Partner",
  "Analyst-turned-CSM",
  "Retention Strategist",
  "Dashboard-to-Decisions Translator",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  const cycleTitle = () => {
    setTitleIndex((i) => (i + 1) % titles.length);
  };

  return (
    <header
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
    >
      {/* decorative blobs */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-60 blur-2xl pointer-events-none"
        style={{ background: "var(--lavender)" }}
      />
      <div
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full opacity-50 blur-2xl pointer-events-none"
        style={{ background: "var(--mint)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full opacity-40 blur-2xl pointer-events-none"
        style={{ background: "var(--sky)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="inline-flex items-center gap-2 mb-6 bg-white/70 border border-[var(--line)] rounded-full px-4 py-1.5 font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink-soft)]">
          <span className="w-2 h-2 rounded-full bg-[var(--mint-deep)] animate-pulse" />
          Open to Senior CSM / Client Success roles
        </div>

        <h1 className="font-[family-name:var(--font-display)] font-semibold leading-[0.95] text-[clamp(44px,8vw,96px)] text-[var(--ink)]">
          Samvigya
          <br />
          Trivedi
        </h1>

        <button
          onClick={cycleTitle}
          className="mt-5 group inline-flex items-center gap-3 cursor-pointer"
          aria-label="Click to see another way to describe my role"
        >
          <span className="font-[family-name:var(--font-mono)] text-[clamp(16px,2.4vw,22px)] text-[var(--ink-soft)] border-b-2 border-dashed border-[var(--lavender-deep)] group-hover:border-[var(--coral-deep)] transition-colors">
            {titles[titleIndex]}
          </span>
          <span className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--coral-deep)] bg-[var(--coral)]/30 rounded-full px-2.5 py-1 group-hover:bg-[var(--coral)]/50 transition-colors">
            tap me ↻
          </span>
        </button>

        <p className="mt-7 max-w-xl text-[17px] text-[var(--ink-soft)] leading-relaxed">
          I spent years inside the data before moving to the seat that uses it —
          now I own client relationships the way I used to build the reports
          they were based on. Currently managing a{" "}
          <span className="font-semibold text-[var(--ink)]">
            $794K ARR portfolio
          </span>{" "}
          across Fortune-level FMCG, Flavour &amp; Food, and Pharma clients
          spanning NA, LATAM, EU, and APAC.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#approach"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#approach")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[var(--ink)] text-[var(--butter)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:bg-[var(--coral-deep)] transition-colors duration-200 cursor-pointer"
          >
            See how I solve client problems →
          </a>
          <a
            href="/Samvigya_Trivedi_CSM_Resume.pdf"
            download
            className="bg-white border border-[var(--line)] text-[var(--ink)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:border-[var(--coral-deep)] hover:text-[var(--coral-deep)] transition-colors duration-200"
          >
            ↓ Download CV (PDF)
          </a>
        </div>
      </div>
    </header>
  );
}
