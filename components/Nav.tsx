"use client";

const links = [
  { href: "#profile", label: "Profile" },
  { href: "#personal", label: "Outside Work" },
  { href: "#approach", label: "Approach" },
  { href: "#experience", label: "Experience" },
  { href: "#words", label: "Said About Me" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[var(--butter)]/80 border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className="font-[family-name:var(--font-display)] font-semibold text-lg text-[var(--ink)]"
        >
          Samvigya<span className="text-[var(--coral-deep)]">.</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 font-[family-name:var(--font-mono)] text-[13px] text-[var(--ink-soft)]">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className="hover:text-[var(--coral-deep)] transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={(e) => scrollTo(e, "#contact")}
          className="md:hidden font-[family-name:var(--font-mono)] text-[13px] text-[var(--coral-deep)] font-medium"
        >
          Contact ↓
        </a>
      </div>
    </nav>
  );
}
