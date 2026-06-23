"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  prefix?: string;
  target: number;
  suffix?: string;
  label: string;
  bg: string;
};

const metrics: Metric[] = [
  {
    prefix: "$",
    target: 794,
    suffix: "K",
    label: "ARR portfolio owned today — up 313.5% from $192K",
    bg: "var(--coral)",
  },
  {
    target: 20,
    suffix: "%+",
    label: "Adoption lift from targeted 1:1 enablement",
    bg: "var(--mint)",
  },
  {
    target: 50,
    suffix: "+",
    label: "Executive analytics reports delivered, zero missed deadlines",
    bg: "var(--lavender)",
  },
  {
    target: 0,
    suffix: "",
    label: "Missed deadlines across multi-market, multi-phase studies",
    bg: "var(--sky)",
  },
];

function CountUp({ metric, active }: { metric: Metric; active: boolean }) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    const dur = 1100;
    const start = performance.now();
    function tick(now: number) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(metric.target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [active, metric.target]);

  return (
    <span>
      {metric.prefix}
      {val}
      {metric.suffix}
    </span>
  );
}

export default function MetricsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="rounded-3xl p-6 bg-white border border-[var(--line)] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
          style={{ boxShadow: "0 2px 0 0 var(--line)" }}
        >
          <div
            className="w-9 h-9 rounded-full mb-4"
            style={{ background: m.bg }}
            aria-hidden
          />
          <div className="font-[family-name:var(--font-mono)] font-semibold text-[clamp(26px,3.5vw,34px)] text-[var(--ink)]">
            <CountUp metric={m} active={active} />
          </div>
          <p className="mt-2 text-[13px] text-[var(--ink-soft)] leading-snug">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}
