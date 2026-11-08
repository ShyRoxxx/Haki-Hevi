import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { business, principles } from "@/lib/content";

export function About() {
  return (
    <section className="section bg-paper-2" aria-labelledby="ueber-title">
      <div className="wrap">
        <h2 id="ueber-title" className="sr-only">
          Über Haki & Hevi
        </h2>
        <figure className="max-w-[60rem]" data-reveal="up">
          <blockquote className="display text-[length:var(--step-5)] text-ink">
            <span aria-hidden className="text-leaf">„</span>Eine gesunde, ausgewogene, frische und vollwertige Küche, ohne Conveniencefood.<span aria-hidden className="text-leaf">“</span>
          </blockquote>
          <figcaption className="mt-6 text-[length:var(--step-1)] text-ink-2">Darauf legt das Küchenteam von Haki & Hevi bei jedem Mittagessen Wert.</figcaption>
        </figure>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <dl className="divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
              {principles.map((p, i) => (
                <div key={p.title} className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8" data-reveal="up" data-delay={String(i * 0.06)}>
                  <dt className="font-display text-[1.35rem] font-semibold leading-tight">{p.title}</dt>
                  <dd className="text-ink-2">{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-6">
            <div className="rounded-[var(--radius-surface)] bg-card p-6 sm:p-8" data-reveal="right">
              <p className="font-display text-[1.35rem] font-semibold">Inhabergeführt aus Isernhagen</p>
              <p className="mt-3 text-ink-2">
                Hinter Haki & Hevi steht Geschäftsführerin {business.owner}. Gekocht wird in der eigenen Küche in der Dieselstraße — für Kindergärten, Krippen, Schulen und Horte, für Firmen und für Feste.
              </p>
              <Link href="/ueber-uns" className="link mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-leaf-deep">
                Mehr über uns <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-5 rounded-[var(--radius-surface)] bg-leaf-deep p-6 text-on-leaf transition-colors duration-200 hover:bg-leaf-night sm:p-8"
              data-reveal="right"
            >
              <span className="font-display text-[3.25rem] font-semibold leading-none tracking-[-0.02em]">{business.rating.value}</span>
              <span>
                <span className="flex gap-0.5" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={18} strokeWidth={1.5} className={i < 4 ? "fill-turmeric text-turmeric" : "fill-turmeric/50 text-turmeric"} />
                  ))}
                </span>
                <span className="mt-1 block text-on-leaf-2">
                  aus {business.rating.count} Bewertungen bei Google
                  <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
