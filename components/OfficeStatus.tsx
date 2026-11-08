"use client";

import { useSyncExternalStore } from "react";

/** Berechnet anhand der Bürozeiten (Mo–Fr 9–12 Uhr, Europe/Berlin), ob gerade jemand am Telefon ist. */
function computeStatus(now: Date) {
  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "";
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const mins = h * 60 + m;
  const weekday = ["Mo", "Di", "Mi", "Do", "Fr"].some((d) => wd.startsWith(d));
  if (weekday && mins >= 540 && mins < 720) return { open: true, text: "Büro jetzt erreichbar · bis 12 Uhr" };
  if (weekday && mins < 540) return { open: false, text: "Büro heute ab 9 Uhr erreichbar" };
  const isFri = wd.startsWith("Fr");
  const isWeekend = wd.startsWith("Sa") || wd.startsWith("So");
  return { open: false, text: isFri || isWeekend ? "Büro wieder Montag ab 9 Uhr" : "Büro morgen ab 9 Uhr erreichbar" };
}

let cached: { open: boolean; text: string } | null = null;
let cachedAt = 0;
const getSnapshot = () => {
  if (!cached || Date.now() - cachedAt > 60_000) {
    cached = computeStatus(new Date());
    cachedAt = Date.now();
  }
  return cached;
};
const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
};
const serverSnapshot = { open: false, text: "Bürozeiten Mo–Fr 9–12 Uhr" };

export function OfficeStatus({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "leaf" }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden
        className="inline-block size-2 rounded-full"
        style={{ background: status.open ? (tone === "leaf" ? "var(--turmeric)" : "var(--leaf)") : "var(--ink-3)" }}
      />
      <span>{status.text}</span>
    </span>
  );
}
