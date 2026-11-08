import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="section" aria-labelledby="leistungen-title">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <h2 id="leistungen-title" className="h2" data-reveal="up">
            Eine Küche, vier Arten zu essen
          </h2>
          <p className="lead prose-measure mt-6" data-reveal="up">
            Mittags kochen wir für Kinder, Schulklassen und Teams. Am Wochenende und abends für Feste. Die Sorgfalt bei Zutaten und Allergenen ist überall dieselbe.
          </p>
        </div>

        <ul className="border-t border-[var(--line-strong)]">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-[var(--line-strong)]" data-reveal={i % 2 ? "left" : "right"}>
              <Link href={s.href} className="service-row group grid gap-3 py-8 sm:grid-cols-[1fr_auto] sm:gap-8 sm:py-10">
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-leaf-deep">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 font-semibold text-leaf-deep">{s.lead}</p>
                  <p className="prose-measure mt-3 text-ink-2">{s.text}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] text-ink-3">
                    {s.facts.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span aria-hidden className="size-1.5 rounded-full bg-leaf" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  aria-hidden
                  className="grid size-12 place-items-center self-start rounded-full border-[1.5px] border-[var(--line-strong)] text-ink transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out)] group-hover:border-leaf-deep group-hover:bg-leaf-deep group-hover:text-on-leaf sm:mt-2 group-hover:-rotate-12"
                >
                  <ArrowUpRight size={20} strokeWidth={1.75} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
