"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OFFSETS: Record<string, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -20 },
  left: { x: -32 },
  right: { x: 32 },
  fade: {},
};

/**
 * Gestaffelte Einblendungen für alle Elemente mit data-reveal.
 * data-reveal="up|left|right|down|fade", optional data-delay (Sekunden).
 * Elemente, die gemeinsam im Bild auftauchen, werden um 80 ms versetzt.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("reduce-motion")) return;

    let ctx: gsap.Context | undefined;
    let cancelled = false;
    // Erst nach abgeschlossener Hydration Inline-Styles setzen
    const start = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-revealed])");
      els.forEach((el) => {
        const o = OFFSETS[el.dataset.reveal ?? "up"] ?? OFFSETS.up;
        gsap.set(el, { opacity: 0, x: o.x ?? 0, y: o.y ?? 0 });
      });
      ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.08,
            delay: (i, t: HTMLElement) => Number(t.dataset.delay ?? 0),
            overwrite: true,
            onComplete() {
              batch.forEach((b) => {
                b.setAttribute("data-revealed", "");
                gsap.set(b, { clearProps: "transform" });
              });
            },
          });
        },
      });
      });
    };
    const idle = () => requestAnimationFrame(() => setTimeout(start, 0));
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      window.removeEventListener("load", idle);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
