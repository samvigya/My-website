"use client";

import { useEffect, useState } from "react";
import { fireConfetti } from "@/components/Confetti";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

export default function EasterEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let progress = 0;
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === SEQUENCE[progress]) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          setShow(true);
          fireConfetti(window.innerWidth / 2, window.innerHeight / 3, 60);
          setTimeout(
            () => fireConfetti(window.innerWidth / 4, window.innerHeight / 2, 40),
            200
          );
          setTimeout(
            () => fireConfetti((window.innerWidth * 3) / 4, window.innerHeight / 2, 40),
            400
          );
        }
      } else {
        progress = key === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 8000);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[9999] bg-[var(--ink)]/20 backdrop-blur-sm"
        onClick={() => setShow(false)}
        aria-hidden
      />
      <div
        className="fixed top-1/2 left-1/2 z-[10000] max-w-sm w-[calc(100vw-2.5rem)] rounded-3xl border border-[var(--line)] bg-white shadow-2xl p-7 text-center"
        style={{ animation: "egg-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
        role="dialog"
        aria-live="polite"
      >
        <button
          onClick={() => setShow(false)}
          aria-label="Dismiss"
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--ink)] text-[var(--butter)] text-[13px] flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>
        <div className="text-4xl mb-3">🕹️</div>
        <h3 className="font-[family-name:var(--font-display)] font-semibold text-[20px] text-[var(--ink)] mb-2">
          You found it.
        </h3>
        <p className="text-[14px] text-[var(--ink-soft)] leading-relaxed">
          The Konami code, hidden on a CSM&apos;s resume site. If you know that
          sequence by heart, we&apos;re probably going to get along — I&apos;m a
          gamer at heart too. Bonus points for reaching out:{" "}
          <a
            href="mailto:trivedisamvigya@gmail.com"
            className="text-[var(--coral-deep)] underline decoration-dashed"
          >
            trivedisamvigya@gmail.com
          </a>
        </p>
      </div>
    </>
  );
}
