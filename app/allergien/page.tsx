import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { FactsCard } from "@/components/FactsCard";
import { FaqSection } from "@/components/FaqSection";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { allergenKey, allergyPage } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: allergyPage.metaTitle, description: allergyPage.metaDescription, path: "/allergien" });

const faqs = [
  { q: "Kochen Sie auch für Kinder mit mehreren Allergien?", a: "In vielen Fällen ja. Sprechen Sie uns vor dem Start an: Wir klären gemeinsam mit Eltern und Einrichtung, welche Gerichte infrage kommen und wie die Ausgabe gekennzeichnet wird." },
  { q: "Ist das Essen halal?", a: "Bei der Kindermittagsverpflegung achten wir auf Halal, und die Kita-Küche kocht komplett ohne Schweinefleisch. Nachweise unserer Zulieferer schicken wir Ihnen auf Anfrage." },
  { q: "Wo sehe ich, was in einem Gericht steckt?", a: "Im Speiseplan steht hinter jedem Gericht die Kennziffer der enthaltenen Allergene. Im Bestellportal sind die Allergene zusätzlich ausgeschrieben, auch für Dessert, Obst und Salat." },
  { q: "Was ist mit glutenfreier oder laktosefreier Ernährung?", a: "Unverträglichkeiten wie Laktose oder Gluten vermerken Sie im Konto Ihres Kindes. Ob wir eine ärztlich verordnete Diät vollständig abdecken können, besprechen wir vorher persönlich." },
];

const steps = [
  { t: "Einmal hinterlegen", d: "Eltern vermerken Allergien, Unverträglichkeiten und Wünsche wie „kein Schweinefleisch“ im Bestellkonto ihres Kindes oder teilen sie der Kita mit." },
  { t: "Im Plan erkennen", d: "Jedes Gericht im Wochenplan trägt die Kennziffern seiner Allergene. Wer weiß, wonach er sucht, sieht in Sekunden, welche Tage passen." },
  { t: "Bei der Ausgabe beachten", d: "Unsere Köche berücksichtigen die Vermerke und achten bei der Ausgabe darauf, dass jedes Kind das richtige Essen bekommt." },
];

export default function AllergyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Allergien & besondere Ernährung", path: "/allergien" }]}
        statement={allergyPage.statement}
        h1={allergyPage.h1}
        intro={[
          "Auch Kinder mit Lebensmittelallergien und Unverträglichkeiten sind bei uns gut aufgehoben. Wir berücksichtigen individuelle Bedürfnisse — vom Milcheiweiß bis zum Verzicht auf Schweinefleisch — und kennzeichnen jedes Gericht mit seinen Allergenen.",
        ]}
        aside={<FactsCard facts={["Allergen-Kennziffern bei jedem Gericht", "Unverträglichkeiten pro Kind im Konto", "Komplett ohne Schweinefleisch in der Kita-Küche", "Halal bei der Kindermittagsverpflegung", "Täglich ein vegetarisches Gericht"]} cta="Allergien vorab besprechen" />}
      />

      <section className="wrap border-t border-[var(--line-strong)] py-14 lg:py-20" aria-labelledby="ablauf-allergie">
        <h2 id="ablauf-allergie" className="h2 max-w-[20ch] text-[length:var(--step-3)]" data-reveal="up">
          So kommt das richtige Essen beim richtigen Kind an
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} data-reveal="up" data-delay={String(i * 0.08)}>
              <span className="grid size-11 place-items-center rounded-full bg-leaf-pale font-display text-lg font-semibold text-leaf-night">{i + 1}</span>
              <h3 className="h3 mt-5">{s.t}</h3>
              <p className="mt-2 text-ink-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper-2 py-14 lg:py-20" aria-labelledby="schluessel-title">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="schluessel-title" className="h2 text-[length:var(--step-3)]" data-reveal="up">
              Unser Allergen-Schlüssel
            </h2>
            <p className="prose-measure mt-5 text-ink-2" data-reveal="up">
              Diese Kennziffern stehen auf unseren Speiseplänen hinter jedem Gericht. Hängen Sie den Schlüssel neben den Wochenplan — dann reicht ein Blick.
            </p>
            <Link href="/speiseplan" className="btn btn-primary mt-8" data-reveal="up">
              Zum Speiseplan der Woche
            </Link>
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

      <section className="wrap py-14 lg:py-20" aria-labelledby="halal-title">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <h2 id="halal-title" className="h2 text-[length:var(--step-3)]" data-reveal="up">
            Ohne Schweinefleisch, halal und vegetarisch
          </h2>
          <div className="space-y-5 text-ink-2">
            <p className="prose-measure" data-reveal="up">
              In Kitas und Schulen essen Kinder aus vielen Familien und Kulturen an einem Tisch. Deshalb kocht unsere Kita-Küche komplett ohne Schweinefleisch, und bei der Kindermittagsverpflegung achten wir auf Halal. Wurst und Würstchen sind aus Geflügel, Hackfleisch aus Rind.
            </p>
            <p className="prose-measure" data-reveal="up">
              Jeden Tag steht neben dem Gericht mit Fleisch ein vegetarisches zur Wahl — kein Beilagenteller, sondern ein eigenes Gericht wie Gemüseauflauf, Chili sin Carne oder Milchreis mit Apfelmus.
            </p>
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Fragen zu Allergien" more />
      <ClosingCta title="Ihr Kind hat eine schwere Allergie?" text="Rufen Sie uns vor dem Start an. Wir besprechen mit Ihnen und der Einrichtung, was die Küche leisten kann." />
      <JsonLd data={breadcrumbJsonLd([{ name: "Allergien & besondere Ernährung", path: "/allergien" }])} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
