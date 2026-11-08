"use client";

import { useMemo, useState } from "react";
import { Check, CircleAlert, Leaf, RotateCcw } from "lucide-react";
import { allergens, weekMenu, type AllergenId, type Dish } from "@/lib/content";

const codeOf = (id: AllergenId) => allergens.find((a) => a.id === id)?.code ?? "";
const labelOf = (id: AllergenId) => allergens.find((a) => a.id === id)?.label ?? "";

// In dieser Woche vorkommende Allergene zuerst, in der Reihenfolge des Schlüssels
const usedIds = new Set(weekMenu.days.flatMap((d) => d.dishes.flatMap((x) => x.allergens)));
const filterChips = allergens.filter((a) => usedIds.has(a.id));

export function MenuFinder({ showSides = false }: { showSides?: boolean }) {
  const [selected, setSelected] = useState<AllergenId[]>([]);
  const [veggie, setVeggie] = useState(false);
  const [dayIdx, setDayIdx] = useState(0);

  const toggle = (id: AllergenId) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const conflicts = (d: Dish) => {
    const hits = d.allergens.filter((a) => selected.includes(a));
    const meat = veggie && d.kind === "Hauptgericht";
    return { hits, meat, blocked: hits.length > 0 || meat };
  };

  const { fit, total } = useMemo(() => {
    const all = weekMenu.days.flatMap((d) => d.dishes);
    const ok = all.filter((d) => {
      const hits = d.allergens.some((a) => selected.includes(a));
      return !hits && !(veggie && d.kind === "Hauptgericht");
    });
    return { fit: ok.length, total: all.length };
  }, [selected, veggie]);

  const active = selected.length > 0 || veggie;

  return (
    <div className="rounded-[var(--radius-surface)] bg-card p-5 text-ink shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)] sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="h3">Speiseplan {weekMenu.label}</h3>
        <p className="tnum text-ink-2">{weekMenu.range}</p>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 font-semibold">Was darf Ihr Kind nicht essen?</legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Allergene auswählen">
          {filterChips.map((a) => {
            const on = selected.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(a.id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] py-1.5 pl-1.5 pr-4 text-[0.95rem] font-semibold transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${
                  on ? "border-ink bg-ink text-paper" : "border-[var(--line-strong)] bg-card text-ink hover:border-ink"
                }`}
              >
                <span className="code-mark !h-8 !min-w-8" data-hit={on}>
                  {a.code}
                </span>
                {a.label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={veggie}
            onClick={() => setVeggie((v) => !v)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] px-4 py-1.5 text-[0.95rem] font-semibold transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${
              veggie ? "border-leaf-deep bg-leaf-deep text-on-leaf" : "border-[var(--line-strong)] bg-card text-ink hover:border-ink"
            }`}
          >
            <Leaf size={16} strokeWidth={1.75} aria-hidden /> Nur vegetarisch
          </button>
        </div>
      </fieldset>

      <div className="mt-5 flex min-h-12 flex-wrap items-center justify-between gap-3 rounded-[12px] bg-paper-2 px-4 py-3" aria-live="polite">
        <p className="tnum">
          {active ? (
            <>
              <strong className="font-semibold">
                {fit} von {total} Gerichten
              </strong>{" "}
              passen diese Woche ohne Anpassung.
            </>
          ) : (
            <>Tippen Sie eine Unverträglichkeit an, um zu sehen, welche Gerichte betroffen sind.</>
          )}
        </p>
        {active && (
          <button
            type="button"
            onClick={() => {
              setSelected([]);
              setVeggie(false);
            }}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-[10px] px-2 text-[0.95rem] font-semibold text-leaf-deep hover:bg-card"
          >
            <RotateCcw size={16} strokeWidth={1.75} aria-hidden /> Auswahl löschen
          </button>
        )}
      </div>

      {/* Tagesauswahl auf dem Handy */}
      <div className="mt-6 grid grid-cols-5 gap-1.5 md:hidden" role="tablist" aria-label="Wochentag wählen">
        {weekMenu.days.map((day, i) => {
          const blockedCount = day.dishes.filter((d) => conflicts(d).blocked).length;
          return (
            <button
              key={day.day}
              type="button"
              role="tab"
              aria-selected={dayIdx === i}
              onClick={() => setDayIdx(i)}
              className={`relative flex min-h-12 flex-col items-center justify-center rounded-[10px] text-[0.9rem] font-semibold leading-tight transition-colors duration-200 ${
                dayIdx === i ? "bg-ink text-paper" : "bg-paper-2 text-ink"
              }`}
            >
              {day.day.slice(0, 2)}
              <span className={`tnum text-[0.8rem] font-normal ${dayIdx === i ? "text-paper/75" : "text-ink-3"}`}>{day.date}</span>
              {active && blockedCount > 0 && (
                <span aria-label={`${blockedCount} betroffen`} className="absolute right-1.5 top-1.5 size-2 rounded-full bg-turmeric" />
              )}
            </button>
          );
        })}
      </div>

      <ol className="mt-4 divide-y divide-[var(--line)] border-[var(--line)] md:mt-6 md:border-y">
        {weekMenu.days.map((day, di) => (
          <li key={day.day} className={`${di === dayIdx ? "grid" : "hidden"} gap-3 py-3 md:grid md:grid-cols-[8.5rem_1fr_1fr] md:gap-5 md:py-5`}>
            <div className="hidden md:block">
              <p className="font-semibold">{day.day}</p>
              <p className="tnum text-ink-3">{day.date}</p>
            </div>
            {day.dishes.map((dish) => {
              const c = conflicts(dish);
              return (
                <div
                  key={dish.name}
                  className={`rounded-[12px] border-[1.5px] p-3.5 transition-[background-color,border-color,opacity] duration-300 ${
                    c.blocked ? "border-transparent bg-paper-2 opacity-75" : active ? "border-leaf/40 bg-card" : "border-transparent bg-card"
                  }`}
                >
                  <p className="flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-3">
                    {dish.kind === "Vegetarisch" ? (
                      <>
                        <Leaf size={14} strokeWidth={1.75} className="text-leaf-deep" aria-hidden /> Vegetarisch
                      </>
                    ) : (
                      <>Mit Fleisch{dish.meat ? ` · ${dish.meat}` : ""}</>
                    )}
                  </p>
                  <p className={`mt-1 font-semibold leading-snug ${c.blocked ? "text-ink-2" : "text-ink"}`}>{dish.name}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {dish.allergens.map((a) => (
                      <span key={a} className="code-mark" data-hit={selected.includes(a)} title={labelOf(a)}>
                        <span className="sr-only">{labelOf(a)}: Kennziffer </span>
                        {codeOf(a)}
                      </span>
                    ))}
                    {dish.extra && <span className="text-[0.875rem] text-ink-3">+ {dish.extra}</span>}
                    {active &&
                      (c.blocked ? (
                        <span className="ml-auto inline-flex items-center gap-1 text-[0.875rem] font-semibold text-ink">
                          <CircleAlert size={15} strokeWidth={1.75} aria-hidden />
                          {c.hits.length ? `enthält ${c.hits.map(labelOf).join(", ")}` : "mit Fleisch"}
                        </span>
                      ) : (
                        <span className="ml-auto inline-flex items-center gap-1 text-[0.875rem] font-semibold text-leaf-deep">
                          <Check size={15} strokeWidth={2} aria-hidden /> passt
                        </span>
                      ))}
                  </div>
                  {showSides && (
                    <p className="mt-2 text-[0.875rem] text-ink-3">
                      Dazu {day.sides.fruit}, {day.sides.dessert} und Salat
                    </p>
                  )}
                </div>
              );
            })}
          </li>
        ))}
      </ol>

      <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-3">
        Speiseplan und Allergenangaben aus dem {weekMenu.source}. Verbindlich ist der Plan im Bestellkonto Ihrer Einrichtung. Diese Ansicht speichert und versendet nichts.
      </p>
    </div>
  );
}
