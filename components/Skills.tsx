"use client";

import { useState } from "react";

const groups = [
  {
    label: "Client Success & Analytics",
    color: "var(--coral)",
    items: [
      "Account Health Monitoring",
      "Client Onboarding",
      "Retention & Upsell",
      "ARR Growth",
      "Social Listening",
      "Sentiment Analysis",
      "Campaign Effectiveness",
      "A/B Testing",
      "Stakeholder Management",
      "Executive Reporting",
      "Process Automation",
    ],
  },
  {
    label: "Tools & Platforms",
    color: "var(--lavender)",
    items: [
      "Python",
      "SQL",
      "Power BI",
      "Tableau",
      "Streamlit",
      "Mixpanel",
      "Vercel",
      "Excel",
      "Google Workspace",
      "Project Management",
    ],
  },
];

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-9">
      {groups.map((g) => (
        <div key={g.label}>
          <div className="flex items-center gap-2 mb-4">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: g.color }}
            />
            <h3 className="font-[family-name:var(--font-mono)] text-[12.5px] tracking-wide text-[var(--ink-soft)] uppercase">
              {g.label}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {g.items.map((item) => {
              const isActive = active === item;
              return (
                <button
                  key={item}
                  onClick={() => setActive(isActive ? null : item)}
                  className="font-[family-name:var(--font-mono)] text-[13px] rounded-full px-4 py-2 border transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? g.color : "white",
                    borderColor: isActive ? g.color : "var(--line)",
                    color: isActive ? "var(--ink)" : "var(--ink-soft)",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
