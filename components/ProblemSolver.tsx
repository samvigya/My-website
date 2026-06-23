"use client";

import { useState } from "react";

type Step = {
  tag: string;
  title: string;
  body: string;
  color: string;
};

const steps: Step[] = [
  {
    tag: "01 — Diagnose",
    title: "Find the real metric, not the loud one",
    body: "Before reacting to a support ticket or a dip in usage, I pull account-level data — Mixpanel events, login frequency, feature depth — to separate a real adoption problem from a one-off complaint.",
    color: "var(--coral)",
  },
  {
    tag: "02 — Align",
    title: "Get the right people in the room early",
    body: "Most client issues touch more than one team. I loop in product, data, or engineering immediately instead of relaying messages back and forth — it's faster and it shows the client we're already moving.",
    color: "var(--lavender)",
  },
  {
    tag: "03 — Act",
    title: "Fix the workflow, not just the ticket",
    body: "If three clients hit the same wall, that's a process problem, not three coincidences. I've built automation tooling (Python, Streamlit) more than once specifically because the manual fix wasn't going to scale.",
    color: "var(--mint)",
  },
  {
    tag: "04 — Close the loop",
    title: "Report back before they have to ask",
    body: "I tell the client what happened, what changed, and what to expect next — proactively. Retention isn't won in the fix, it's won in whether they had to chase me for the update.",
    color: "var(--sky)",
  },
];

export default function ProblemSolver() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="rounded-2xl border border-[var(--line)] overflow-hidden transition-colors duration-300"
            style={{ background: isOpen ? "white" : "var(--butter-deep)" }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: s.color }}
                aria-hidden
              />
              <span className="font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--ink-soft)] shrink-0 hidden sm:inline">
                {s.tag}
              </span>
              <span className="font-[family-name:var(--font-display)] font-medium text-[16px] sm:text-[18px] text-[var(--ink)] flex-1">
                {s.title}
              </span>
              <span
                className="font-[family-name:var(--font-mono)] text-[var(--ink-soft)] transition-transform duration-300 shrink-0"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pl-12 text-[15px] text-[var(--ink-soft)] leading-relaxed max-w-2xl">
                  {s.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
