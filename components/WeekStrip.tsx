import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { allergens, weekMenu } from "@/lib/content";

const label = (id: string) => allergens.find((a) => a.id === id)?.label;

const code = (id: string) => allergens.find((a) => a.id === id)?.code;

export function WeekStrip() {
  return (
    <section className="leaf-field grain on-leaf section" aria-labelledby="woche-title">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="woche-title" className="h2 max-w-[18ch] text-on-leaf" data-reveal="up">
            So sieht eine Woche bei uns aus
          </h2>
          <Link href="/speiseplan" className="btn btn-turmeric self-start md:self-auto" data-reveal="up">
            Mit Allergenfilter ansehen <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
          </Link>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {weekMenu.days.map((d) => (
            <li key={d.day} className="rounded-[var(--radius-surface)] bg-card p-5 text-ink" data-reveal="up">
              <p className="flex items-baseline justify-between font-semibold">
                {d.day}
                <span className="tnum text-[0.9rem] font-normal text-ink-3">{d.date}</span>
              </p>
              {d.dishes.map((dish) => (
                <div key={dish.name} className="mt-4 border-t border-[var(--line)] pt-3">
                  <p className="flex items-center gap-1.5 text-[0.875rem] font-semibold text-ink-3">
                    {dish.kind === "Vegetarisch" ? <Leaf size={14} strokeWidth={1.75} className="text-leaf-deep" aria-hidden /> : null}
                    {dish.kind === "Vegetarisch" ? "Vegetarisch" : "Mit Fleisch"}
                  </p>
                  <p className="mt-0.5 leading-snug">{dish.name}</p>
                  <p className="mt-2 flex flex-wrap gap-1">
                    {dish.allergens.map((a) => (
                      <span key={a} className="code-mark !h-6 !min-w-6 !text-[0.875rem]" title={label(a)}>
                        <span className="sr-only">{label(a)}: Kennziffer </span>
                        {code(a)}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[0.95rem] text-on-leaf-2">
          {weekMenu.label}, {weekMenu.range} · aus dem Bestellportal haki-hevi.com
        </p>
      </div>
    </section>
  );
}
