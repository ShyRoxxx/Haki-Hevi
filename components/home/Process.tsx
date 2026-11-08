import { ArrowUpRight } from "lucide-react";
import { business, steps } from "@/lib/content";

export function Process() {
  return (
    <section className="section" aria-labelledby="ablauf-title">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <h2 id="ablauf-title" className="h2 max-w-[18ch]" data-reveal="up">
            Vom Wochenplan bis auf den Tisch
          </h2>
          <p className="lead prose-measure" data-reveal="up">
            Für Schulen, Horte und Firmen läuft die Bestellung über unser eigenes Portal. Kitas bestellen auf Wunsch mit festen Mengen.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative" data-reveal="up" data-delay={String(i * 0.08)}>
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-leaf-pale font-display text-xl font-semibold text-leaf-night">
                  {i + 1}
                </span>
                <span aria-hidden className="h-px flex-1 bg-[var(--line-strong)]" />
              </div>
              <h3 className="h3 mt-6 max-w-[16ch]">{step.title}</h3>
              <p className="mt-3 text-ink-2">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col gap-4 rounded-[var(--radius-surface)] bg-paper-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" data-reveal="up">
          <p className="max-w-[52ch] text-ink-2">
            <strong className="font-semibold text-ink">Schon angemeldet oder neu dabei?</strong> Bestellungen, Unterkonten und BuT-Nummer verwalten Sie im Bestellportal.
          </p>
          <a href={business.orderPortal} target="_blank" rel="noopener" className="btn btn-ghost shrink-0 bg-card">
            Zum Bestellportal <ArrowUpRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
