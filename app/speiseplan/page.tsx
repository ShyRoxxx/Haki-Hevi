import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { MenuFinder } from "@/components/MenuFinder";
import { FaqSection } from "@/components/FaqSection";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { allergenKey, business, weekMenu } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Speiseplan & Allergene – Kita-Catering | Haki & Hevi",
  description: "Der aktuelle Wochenspeiseplan von Haki & Hevi mit Allergen-Kennziffern und Filter: sehen Sie sofort, welche Gerichte Ihr Kind verträgt. Bestellung im Portal.",
  path: "/speiseplan",
});

const faqs = [
  { q: "Wo finde ich den Plan für die nächste Woche?", a: "Im Bestellportal haki-hevi.com unter „Speiseplan“. Dort können Sie auch zur nächsten Woche weiterblättern und direkt bestellen." },
  { q: "Wie oft wechselt der Speiseplan?", a: "Jede Woche. Jeden Tag gibt es ein Gericht mit Fleisch und ein vegetarisches, dazu wechselnde Desserts." },
  { q: "Bekommt unsere Kita den Plan auch ausgedruckt?", a: "Ja, auf Wunsch schicken wir Ihrer Einrichtung den Wochenplan mit Allergen-Schlüssel zum Aushängen." },
];

export default function MenuPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Speiseplan", path: "/speiseplan" }]}
        statement="Jede Woche neu, jedes Allergen beschriftet."
        h1="Speiseplan der Woche mit Allergen-Kennziffern"
        intro={[
          `Hier sehen Sie den Plan für ${weekMenu.label} (${weekMenu.range}) aus unserem Bestellportal. Tippen Sie an, was Ihr Kind nicht verträgt: Betroffene Gerichte werden markiert, passende bleiben hervorgehoben.`,
        ]}
      />

      <section className="leaf-field grain on-leaf section" aria-label="Speiseplan mit Allergenfilter">
        <div className="wrap max-w-[72rem]">
          <MenuFinder showSides />
          <p className="mt-6 max-w-[70ch] text-on-leaf-2">{weekMenu.sideNote}</p>
        </div>
      </section>

      <section className="wrap py-14 lg:py-20" aria-labelledby="key-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="key-title" className="h2 text-[length:var(--step-3)]" data-reveal="up">
              Was die Kennziffern bedeuten
            </h2>
            <p className="prose-measure mt-5 text-ink-2" data-reveal="up">
              Der Schlüssel ist derselbe wie auf unseren gedruckten Speiseplänen. Bestellen und ändern können Sie im Portal bis 24 Stunden vorher, Schulkinder bis 8 Uhr am selben Morgen.
            </p>
            <a href={`${business.orderPortal}/weekly-menu`} target="_blank" rel="noopener" className="btn btn-primary mt-8" data-reveal="up">
              Nächste Woche im Bestellportal <ArrowUpRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
            </a>
          </div>
          <dl className="grid gap-x-8 sm:grid-cols-2" data-reveal="up">
            {allergenKey.map((a) => (
              <div key={a.code} className="flex items-start gap-4 border-b border-[var(--line)] py-3.5">
                <dt className="code-mark shrink-0">{a.code}</dt>
                <dd className="pt-0.5 text-ink-2">{a.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Fragen zum Speiseplan" />
      <ClosingCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "Speiseplan", path: "/speiseplan" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
