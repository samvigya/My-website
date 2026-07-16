"use client";

import { useCallback } from "react";

/**
 * Returns a ref callback for a mouse-reactive 3D tilt + glare effect.
 * Element needs className "tilt-card relative" and a <TiltGlare /> child.
 */
export function useTilt(max = 8) {
  return useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;

      function onMouseMove(e: MouseEvent) {
        const rect = el!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * max * 2;
        const rotateX = (0.5 - py) * max * 2;
        el!.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        el!.style.setProperty("--glare-x", `${px * 100}%`);
        el!.style.setProperty("--glare-y", `${py * 100}%`);
      }

      function onMouseLeave() {
        el!.style.transform = "";
      }

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      return () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    [max]
  );
}

export function TiltGlare() {
  return <span className="tilt-card-glare" aria-hidden />;
}
