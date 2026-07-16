"use client";

import Reveal from "@/components/Reveal";
import { useTilt, TiltGlare } from "@/components/TiltCard";

const education = [
  {
    degree: "MBA, Business Analytics",
    school: "BML Munjal University",
    dates: "Aug 2021 — Mar 2023",
    color: "var(--coral)",
  },
  {
    degree: "B.Com (Hons)",
    school: "Medi-Caps University",
    dates: "Aug 2017 — Jun 2021",
    color: "var(--mint)",
  },
];

function EducationCard({
  e,
  index,
}: {
  e: (typeof education)[number];
  index: number;
}) {
  const tiltRef = useTilt(6);

  return (
    <Reveal delay={index * 90}>
      <div
        ref={tiltRef}
        className="tilt-card relative rounded-3xl p-6 h-full bg-white border border-[var(--line)] hover:shadow-xl transition-shadow duration-300"
      >
        <span
          className="inline-block w-8 h-1.5 rounded-full mb-4"
          style={{ background: e.color }}
        />
        <h3 className="font-[family-name:var(--font-display)] font-semibold text-[18px] text-[var(--ink)]">
          {e.degree}
        </h3>
        <p className="text-[14px] text-[var(--ink-soft)] mt-1">{e.school}</p>
        <p className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--ink-soft)] mt-3">
          {e.dates}
        </p>
        <TiltGlare />
      </div>
    </Reveal>
  );
}

export default function Education() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {education.map((e, i) => (
        <EducationCard key={e.degree} e={e} index={i} />
      ))}
    </div>
  );
}
