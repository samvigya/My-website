"use client";

import { useCallback } from "react";

/** Returns a ref callback that makes an element drift toward the cursor on hover. */
export function useMagnetic(strength = 0.35) {
  return useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;

      function onMouseMove(e: MouseEvent) {
        const rect = el!.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el!.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }

      function onMouseLeave() {
        el!.style.transform = "translate(0px, 0px)";
      }

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onMouseLeave);

      return () => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onMouseLeave);
      };
    },
    [strength]
  );
}
