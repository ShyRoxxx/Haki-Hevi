"use client";

// Angepasst nach Magic UI „highlighter“ (magicui.design): zeichnet einmal, sobald sichtbar
import { useLayoutEffect, useRef } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { annotate } from "rough-notation";

export function Highlighter({
  children,
  action = "underline",
  color = "#e9b949",
  strokeWidth = 4,
}: {
  children: React.ReactNode;
  action?: "underline" | "highlight" | "circle";
  color?: string;
  strokeWidth?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const reduce = document.documentElement.classList.contains("reduce-motion");
    const a = annotate(el, { type: action, color, strokeWidth, animationDuration: reduce ? 0 : 800, animate: !reduce, iterations: 1, padding: 2, multiline: true });
    a.show();
    let raf = 0;
    let lastW = el.parentElement?.clientWidth ?? 0;
    const ro = new ResizeObserver(() => {
      const w = el.parentElement?.clientWidth ?? 0;
      if (w === lastW) return;
      lastW = w;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        a.animate = false;
        a.hide();
        a.show();
      });
    });
    if (el.parentElement) ro.observe(el.parentElement);
    return () => {
      ro.disconnect();
      a.remove();
    };
  }, [inView, action, color, strokeWidth]);

  return (
    <span ref={ref} className="relative inline">
      {children}
    </span>
  );
}
