"use client";

import { useSyncExternalStore } from "react";

type Slot = { time: string; title: string; text: string; from: number; to: number };

// Minuten seit Mitternacht (Europe/Berlin). Zeiten aus Bestellportal und Google-Profil.
const slots: Slot[] = [
  { time: "bis 8:00", title: "Bestellschluss für Schulkinder", text: "Letzte Änderungen im Bestellportal, auch bei Krankheit.", from: 360, to: 480 },
  { time: "ab 9:00", title: "Büro erreichbar", text: "Fragen, Abbestellungen und neue Einrichtungen am Telefon.", from: 480, to: 600 },
  { time: "Vormittag", title: "Frisch gekocht", text: "Soßen, Suppen und Aufläufe aus frischen Zutaten, ohne Convenience-Food.", from: 600, to: 660 },
  { time: "vor dem Mittag", title: "Die Fahrer fahren los", text: "Direkt nach dem Kochen, heiß und mit den Vermerken für jedes Kind.", from: 660, to: 705 },
  { time: "Mittag", title: "Essen auf dem Tisch", text: "In Kita, Schule oder Firma, pünktlich zu Ihrer Mittagszeit.", from: 705, to: 840 },
];

function currentIndex() {
  const parts = new Intl.DateTimeFormat("de-DE", { timeZone: "Europe/Berlin", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "";
  if (!["Mo", "Di", "Mi", "Do", "Fr"].some((d) => wd.startsWith(d))) return -1;
  const mins = Number(parts.find((p) => p.type === "hour")?.value) * 60 + Number(parts.find((p) => p.type === "minute")?.value);
  return slots.findIndex((s) => mins >= s.from && mins < s.to);
}

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 60_000);
  return () => window.clearInterval(id);
};

export function KitchenDay() {
  const now = useSyncExternalStore(subscribe, currentIndex, () => -1);

  return (
    <div className="mt-14 rounded-[var(--radius-stage)] bg-paper-2 p-6 sm:p-10" data-reveal="up">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="h3">Ein Vormittag bei Haki & Hevi</h3>
        <p className="text-ink-3">{now >= 0 ? "Markiert: was gerade passiert" : "Montag bis Freitag"}</p>
      </div>
      <ol className="relative mt-8 grid gap-6 md:grid-cols-5 md:gap-4">
        <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-[var(--line-strong)] md:bottom-auto md:left-2 md:right-2 md:top-[7px] md:h-0.5 md:w-auto" />
        {slots.map((s, i) => {
          const active = i === now;
          return (
            <li key={s.title} className="relative pl-8 md:pl-0 md:pt-9" aria-current={active ? "step" : undefined}>
              <span
                aria-hidden
                className={`absolute left-0 top-1 block size-4 rounded-full border-[3px] transition-colors duration-300 md:top-0 ${
                  active ? "border-ink bg-turmeric" : i < now ? "border-leaf-deep bg-leaf-deep" : "border-leaf-deep bg-paper-2"
                }`}
              />
              <p className={`tnum text-[0.95rem] font-semibold ${active ? "text-ink" : "text-leaf-deep"}`}>
                {s.time}
                {active && <span className="ml-2 rounded-md bg-ink px-1.5 py-0.5 text-[0.875rem] text-paper">jetzt</span>}
              </p>
              <p className="mt-1 font-display text-[1.2rem] font-semibold leading-tight">{s.title}</p>
              <p className="mt-1.5 text-[0.95rem] text-ink-2">{s.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
