"use client";

import Reveal from "@/components/Reveal";
import { useMagnetic } from "@/components/useMagnetic";

const links = [
  {
    href: "mailto:trivedisamvigya@gmail.com",
    label: "trivedisamvigya@gmail.com",
    primary: true,
  },
  { href: "tel:+918982650501", label: "+91 89826 50501" },
  {
    href: "https://www.linkedin.com/in/samvigya",
    label: "LinkedIn ↗",
    external: true,
  },
  {
    href: "https://github.com/samvigya99",
    label: "GitHub ↗",
    external: true,
  },
];

function FooterLink({ link }: { link: (typeof links)[number] }) {
  const magneticRef = useMagnetic(0.2);

  return (
    <a
      ref={magneticRef}
      href={link.href}
      target={link.external ? "_blank" : undefined}
      className={
        link.primary
          ? "magnetic-btn bg-[var(--ink)] text-[var(--butter)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:bg-[var(--coral-deep)] transition-colors duration-200"
          : "magnetic-btn bg-white border border-[var(--line)] text-[var(--ink)] font-[family-name:var(--font-mono)] text-[13px] px-5 py-3 rounded-full hover:border-[var(--coral-deep)] hover:text-[var(--coral-deep)] transition-colors duration-200"
      }
    >
      {link.label}
    </a>
  );
}

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
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] font-semibold text-[clamp(30px,5vw,52px)] text-[var(--ink)]">
            Let&apos;s talk{" "}
            <span className="text-[var(--coral-deep)]">retention</span>.
          </h2>
          <p className="mt-4 text-[var(--ink-soft)] text-[15px]">
            Open to Customer Success Manager and Account Manager roles. Based
            in Gurugram, India — happy to work across time zones.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <FooterLink key={link.href} link={link} />
            ))}
          </div>
        </Reveal>
        <p className="mt-16 font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-soft)] opacity-60">
          Samvigya Trivedi — Gurugram, India
        </p>
      </div>
    </footer>
  );
}
