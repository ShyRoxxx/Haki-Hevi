"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const OFFSETS: Record<string, string> = {
  up: "translate3d(0, 28px, 0)",
  down: "translate3d(0, -20px, 0)",
  left: "translate3d(-32px, 0, 0)",
  right: "translate3d(32px, 0, 0)",
  fade: "none",
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Gestaffelte Einblendungen für alle Elemente mit data-reveal.
 * data-reveal="up|left|right|down|fade", optional data-delay (Sekunden).
 * Elemente, die gemeinsam ins Bild kommen, werden um 80 ms versetzt.
 * Läuft auf dem nativen Scrollen (IntersectionObserver + Web Animations API), ohne Scroll-Bibliothek.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.documentElement.classList.contains("reduce-motion")) return;

    let io: IntersectionObserver | undefined;
    let queue: HTMLElement[] = [];
    let raf = 0;
    let cancelled = false;

    const flush = () => {
      raf = 0;
      const batch = queue.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top || a.getBoundingClientRect().left - b.getBoundingClientRect().left);
      queue = [];
      batch.forEach((el, i) => {
        const delay = Math.min(i, 5) * 80 + Number(el.dataset.delay ?? 0) * 1000;
        const anim = el.animate(
          [
            { opacity: 0, transform: OFFSETS[el.dataset.reveal ?? "up"] ?? OFFSETS.up },
            { opacity: 1, transform: "none" },
          ],
          { duration: 800, delay, easing: EASE, fill: "backwards" },
        );
        el.setAttribute("data-revealed", "");
        anim.onfinish = () => anim.cancel();
      });
    };

    // Erst nach der Hydration starten, damit React keine fremden Attribute sieht
    const start = () => {
      if (cancelled) return;
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io?.unobserve(e.target);
            queue.push(e.target as HTMLElement);
          });
          if (queue.length && !raf) raf = requestAnimationFrame(flush);
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => io?.observe(el));
    };

    const idle = () => requestAnimationFrame(() => setTimeout(start, 0));
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    if (document.readyState !== "loading") ric(idle, { timeout: 300 });
    else window.addEventListener("DOMContentLoaded", idle, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("DOMContentLoaded", idle);
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
