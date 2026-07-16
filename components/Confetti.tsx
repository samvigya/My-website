"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  "var(--coral)",
  "var(--coral-deep)",
  "var(--lavender)",
  "var(--lavender-deep)",
  "var(--mint)",
  "var(--mint-deep)",
  "var(--sky)",
  "var(--sky-deep)",
];

type Piece = {
  id: number;
  style: React.CSSProperties;
};

let idCounter = 0;

/** Fire a confetti burst from a viewport position. Safe to call from anywhere client-side. */
export function fireConfetti(x: number, y: number, count = 26) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("app:confetti", { detail: { x, y, count } })
  );
}

export default function Confetti() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function onConfetti(e: Event) {
      if (reducedMotion.current) return;
      const detail = (e as CustomEvent).detail as {
        x: number;
        y: number;
        count: number;
      };
      const { x, y, count } = detail;

      const newPieces: Piece[] = Array.from({ length: count }).map(() => {
        const dx = (Math.random() - 0.5) * 260;
        const dy = 140 + Math.random() * 180;
        const size = 6 + Math.random() * 6;
        const isCircle = Math.random() > 0.5;
        const duration = 1000 + Math.random() * 700;
        idCounter += 1;
        return {
          id: idCounter,
          style: {
            left: 0,
            top: 0,
            width: size,
            height: isCircle ? size : size * 0.5,
            background: COLORS[Math.floor(Math.random() * COLORS.length)],
            borderRadius: isCircle ? "50%" : "2px",
            ["--x0" as string]: `${x}px`,
            ["--y0" as string]: `${y}px`,
            ["--x1" as string]: `${x + dx}px`,
            ["--y1" as string]: `${y + dy}px`,
            ["--spin" as string]: `${
              (Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 360)
            }deg`,
            ["--confetti-duration" as string]: `${duration}ms`,
          } as React.CSSProperties,
        };
      });

      setPieces((prev) => [...prev, ...newPieces]);
      const ids = newPieces.map((p) => p.id);
      setTimeout(() => {
        setPieces((prev) => prev.filter((p) => !ids.includes(p.id)));
      }, 2000);
    }

    window.addEventListener("app:confetti", onConfetti);
    return () => window.removeEventListener("app:confetti", onConfetti);
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <span key={p.id} className="confetti-piece" style={p.style} aria-hidden />
      ))}
    </>
  );
}
