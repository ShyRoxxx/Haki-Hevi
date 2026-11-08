import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { LocationSection } from "@/components/LocationSection";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { business, principles, services } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Über uns – Haki & Hevi Catering, Isernhagen NB",
  description: "Inhabergeführtes Catering aus Isernhagen NB: Kinderverpflegung ohne Convenience seit über 16 Jahren, dazu Partyservice mit orientalischer Küche.",
  path: "/ueber-uns",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Über uns", path: "/ueber-uns" }]}
        statement="Eine Küche aus Isernhagen, die für Kinder kocht wie für Gäste."
        h1="Über Haki & Hevi Ambiente & Service-Catering"
        intro={[
          "Wir sind ein regionaler Anbieter von Speisen für Kindergärten, Krippen, Schulen und Horte und versorgen seit über 16 Jahren Einrichtungen in der Region Hannover. Unsere Küche steht im Gewerbegebiet an der Dieselstraße in Isernhagen NB; von hier fahren wir jeden Werktag in Einrichtungen der Region Hannover.",
          "Neben der Kinderverpflegung kochen wir für Firmen und Feste — mit orientalischen Spezialitäten und internationaler Küche. Der Name steht für beides: Ambiente und Service, nicht nur Essen in Thermoboxen.",
        ]}
        aside={
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener"
            className="group block rounded-[var(--radius-surface)] bg-leaf-deep p-7 text-on-leaf transition-colors duration-200 hover:bg-leaf-night"
          >
            <span className="font-display text-[4rem] font-semibold leading-none tracking-[-0.02em]">{business.rating.value}</span>
            <span className="mt-3 flex gap-1" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={20} strokeWidth={1.5} className={i < 4 ? "fill-turmeric text-turmeric" : "fill-turmeric/50 text-turmeric"} />
              ))}
            </span>
            <span className="mt-3 block text-on-leaf-2">
              aus {business.rating.count} Bewertungen bei Google <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </a>
        }
      />

      <section className="wrap border-t border-[var(--line-strong)] py-14 lg:py-20" aria-labelledby="person-title">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 id="person-title" className="h2 text-[length:var(--step-3)]" data-reveal="up">
            Wer dahintersteht
          </h2>
          <div className="space-y-5 text-ink-2">
            <p className="prose-measure" data-reveal="up">
              Haki & Hevi wird von Geschäftsführerin <strong className="font-semibold text-ink">{business.owner}</strong> geführt. Kurze Wege sind uns wichtig: Wer bei uns anruft, spricht mit Menschen, die wissen, was morgen auf dem Plan steht und welches Kind keine Milch verträgt.
            </p>
            <p className="prose-measure" data-reveal="up">
              Unser Küchenteam kocht mit regionalen und saisonalen Produkten und verzichtet auf Convenience-Food. Unsere Fahrer kennen ihre Touren und die Mittagszeiten der Einrichtungen.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-14 lg:py-20" aria-labelledby="werte-title">
        <div className="wrap">
          <h2 id="werte-title" className="h2 max-w-[18ch] text-[length:var(--step-3)]" data-reveal="up">
            Woran wir uns messen lassen
          </h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="border-t-2 border-leaf pt-5" data-reveal="up">
                <h3 className="h3">{p.title}</h3>
                <p className="mt-3 text-ink-2">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-14 lg:py-20" aria-labelledby="angebot-title">
        <h2 id="angebot-title" className="h2 text-[length:var(--step-3)]" data-reveal="up">
          Was wir kochen
        </h2>
        <ul className="mt-8 divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
          {services.map((s) => (
            <li key={s.slug} data-reveal="up">
              <Link href={s.href} className="group flex min-h-16 flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-display text-[1.5rem] font-semibold transition-colors group-hover:text-leaf-deep">{s.title}</span>
                <span className="text-ink-2">{s.lead} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <LocationSection title="Hier finden Sie uns" />
      <ClosingCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "Über uns", path: "/ueber-uns" }])} />
    </>
  );
}
