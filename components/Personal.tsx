"use client";

import { useState } from "react";

type Card = {
  emoji: string;
  title: string;
  body: string;
  bg: string;
};

const cards: Card[] = [
  {
    emoji: "🏍️",
    title: "Biker by heart",
    body: "Give me an open road and a full tank and I'm gone. There's something about long rides that resets my head completely — no notifications, no dashboards, just the next bend in the road.",
    bg: "var(--coral)",
  },
  {
    emoji: "💍",
    title: "Married",
    body: "Partnered up and very happy about it. Apparently I once managed a wedding break with zero disruption to client deliverables — balance is the whole game.",
    bg: "var(--lavender)",
  },
  {
    emoji: "✈️",
    title: "Travel, when I can",
    body: "Haven't been able to do as much of this as I'd like lately, but every trip I do manage goes straight to the top of my favorite-memories list. Always planning the next one, even if it's a while away.",
    bg: "var(--sky)",
  },
  {
    emoji: "🎮",
    title: "Gamer at heart",
    body: "Not just for fun — I genuinely think gaming sharpens problem-solving. Pattern recognition, resource management, staying calm under pressure: turns out that's also just... my job description.",
    bg: "var(--mint)",
  },
  {
    emoji: "💻",
    title: "Tech nerd",
    body: "I'll happily go down a rabbit hole on a new tool, framework, or gadget for way longer than is strictly necessary. It's also probably why I ended up somewhere between data and product.",
    bg: "var(--coral)",
  },
  {
    emoji: "🔍",
    title: "Curious by default",
    body: "I ask 'why' more than is socially convenient. It's served me well in analytics and even better in client conversations — the real problem is rarely the first one mentioned.",
    bg: "var(--lavender)",
  },
  {
    emoji: "⚙️",
    title: "Automate-by-design",
    body: "If I'm doing something manually more than twice, I'm already thinking about how to script it away. It's less about saving time and more that repetition without a system just bothers me.",
    bg: "var(--sky)",
  },
];

export default function Personal() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((c, i) => {
        const isFlipped = flipped === i;
        return (
          <button
            key={c.title}
            onClick={() => setFlipped(isFlipped ? null : i)}
            className="text-left rounded-3xl p-7 border border-[var(--line)] bg-white hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            aria-expanded={isFlipped}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
              style={{ background: c.bg }}
              aria-hidden
            >
              {c.emoji}
            </div>
            <h3 className="font-[family-name:var(--font-display)] font-semibold text-[19px] text-[var(--ink)] mb-2">
              {c.title}
            </h3>
            <p
              className="text-[14.5px] text-[var(--ink-soft)] leading-relaxed transition-all duration-300"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: isFlipped ? "unset" : 2,
                overflow: isFlipped ? "visible" : "hidden",
              }}
            >
              {c.body}
            </p>
            <span className="inline-block mt-3 font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--ink-soft)] group-hover:text-[var(--coral-deep)]">
              {isFlipped ? "show less −" : "read more +"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
