export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-24 px-6 text-center border-t border-[var(--line)] relative overflow-hidden"
    >
      <div
        className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full opacity-40 blur-2xl pointer-events-none"
        style={{ background: "var(--coral)" }}
      />
      <div className="relative max-w-2xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(30px,5vw,52px)] text-[var(--ink)]">
          Let&apos;s talk{" "}
          <span className="text-[var(--coral-deep)]">retention</span>.
        </h2>
        <p className="mt-4 text-[var(--ink-soft)] text-[15px]">
          Open to Senior CSM and Client Success roles. Based in Gurugram,
          India — happy to work across time zones.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:trivedisamvigya@gmail.com"
            className="bg-[var(--ink)] text-[var(--butter)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:bg-[var(--coral-deep)] transition-colors duration-200"
          >
            trivedisamvigya@gmail.com
          </a>
          <a
            href="tel:+918982650501"
            className="bg-white border border-[var(--line)] text-[var(--ink)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:border-[var(--coral-deep)] hover:text-[var(--coral-deep)] transition-colors duration-200"
          >
            +91 89826 50501
          </a>
          <a
            href="https://www.linkedin.com/in/samvigya"
            target="_blank"
            className="bg-white border border-[var(--line)] text-[var(--ink)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:border-[var(--coral-deep)] hover:text-[var(--coral-deep)] transition-colors duration-200"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/samvigya99"
            target="_blank"
            className="bg-white border border-[var(--line)] text-[var(--ink)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:border-[var(--coral-deep)] hover:text-[var(--coral-deep)] transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
        <p className="mt-16 font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-soft)] opacity-60">
          Samvigya Trivedi — Gurugram, India
        </p>
      </div>
    </footer>
  );
}
