export default function Section({
  id,
  tag,
  title,
  highlight,
  children,
}: {
  id: string;
  tag: string;
  title: string;
  highlight?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 border-t border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="font-[family-name:var(--font-mono)] text-[12.5px] text-[var(--coral-deep)] tracking-wide mb-2">
            {tag}
          </p>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(28px,4vw,42px)] text-[var(--ink)]">
            {title} {highlight && <span className="text-[var(--lavender-deep)]">{highlight}</span>}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
