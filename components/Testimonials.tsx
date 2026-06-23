type Quote = {
  text: string;
  source: string;
  context: string;
  bg: string;
};

const quotes: Quote[] = [
  {
    text:
      "Best insights report I've seen in my career of more than 12 years into social listening.",
    source: "Client feedback",
    context: "Global pharma & FMCG brand, Southeast Asia division",
    bg: "var(--coral)",
  },
  {
    text:
      "Solution-oriented mindset, paired with a hunger for more — that's exactly why this promotion makes sense.",
    source: "Manager, on the promotion to CSM",
    context: "ConvoTrack.ai leadership",
    bg: "var(--lavender)",
  },
  {
    text:
      "Operating above current level. Performance this year justified the role change — ready for the next challenge.",
    source: "Manager assessment",
    context: "FY 2025–26 performance review",
    bg: "var(--mint)",
  },
];

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {quotes.map((q, i) => (
        <figure
          key={i}
          className="rounded-3xl p-7 bg-white border border-[var(--line)] flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-[family-name:var(--font-display)] text-lg text-white mb-5"
            style={{ background: q.bg }}
            aria-hidden
          >
            &ldquo;
          </div>
          <blockquote className="flex-1 font-[family-name:var(--font-display)] text-[17px] leading-snug text-[var(--ink)]">
            {q.text}
          </blockquote>
          <figcaption className="mt-5 pt-4 border-t border-[var(--line)]">
            <p className="text-[13px] font-semibold text-[var(--ink)]">
              {q.source}
            </p>
            <p className="text-[12px] text-[var(--ink-soft)] mt-0.5">
              {q.context}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
