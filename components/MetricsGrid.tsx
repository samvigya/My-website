"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { useTilt, TiltGlare } from "@/components/TiltCard";

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
    target: 914,
    suffix: "K",
    label: "Combined ARR across 5 Fortune-level global accounts",
    bg: "var(--coral)",
  },
  {
    target: 5,
    suffix: "",
    label: "Fortune-level accounts owned end-to-end, spanning NA, LATAM, EU & APAC",
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

function MetricCard({
  metric,
  index,
  active,
}: {
  metric: Metric;
  index: number;
  active: boolean;
}) {
  const tiltRef = useTilt(9);

  return (
    <Reveal delay={index * 80}>
      <div
        ref={tiltRef}
        className="tilt-card relative rounded-3xl p-6 bg-white border border-[var(--line)] hover:shadow-xl transition-shadow duration-300"
        style={{ boxShadow: "0 2px 0 0 var(--line)" }}
      >
        <div
          className="w-9 h-9 rounded-full mb-4"
          style={{ background: metric.bg }}
          aria-hidden
        />
        <div className="font-[family-name:var(--font-mono)] font-semibold text-[clamp(26px,3.5vw,34px)] text-[var(--ink)]">
          <CountUp metric={metric} active={active} />
        </div>
        <p className="mt-2 text-[13px] text-[var(--ink-soft)] leading-snug">
          {metric.label}
        </p>
        <TiltGlare />
      </div>
    </Reveal>
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
        <MetricCard key={i} metric={m} index={i} active={active} />
      ))}
    </div>
  );
}
