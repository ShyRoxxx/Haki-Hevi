import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FaqList } from "@/components/FaqList";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs, servicePages, type Faq } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Häufige Fragen: Kosten, Bestellung, BuT | Haki & Hevi",
  description: "Antworten zu Kosten, Bestellschluss, Allergien, Bildungs- und Teilhabepaket, Lieferung und Partyservice bei Haki & Hevi aus Isernhagen NB.",
  path: "/fragen",
});

const groups: { title: string; faqs: Faq[] }[] = [
  { title: "Bestellung, Kosten und Lieferung", faqs: homeFaqs },
  { title: "Kita und Krippe", faqs: servicePages.kita.faqs },
  { title: "Schulen und Horte", faqs: servicePages.schule.faqs },
  { title: "Firmen und Partyservice", faqs: [...servicePages.firmen.faqs, ...servicePages.party.faqs] },
];

export default function FaqPage() {
  const all = groups.flatMap((g) => g.faqs);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Häufige Fragen", path: "/fragen" }]}
        statement="Was am Telefon am häufigsten gefragt wird."
        h1="Häufige Fragen zu Kita-, Schul- und Firmen-Catering"
        intro={["Ihre Frage ist nicht dabei? Rufen Sie uns während der Bürozeiten an oder schreiben Sie uns — wir antworten in der Regel innerhalb von 24 Stunden."]}
      />
      <div className="wrap space-y-16 pb-[var(--section)]">
        {groups.map((g, i) => (
          <section key={g.title} className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16" aria-labelledby={`g-${i}`}>
            <h2 id={`g-${i}`} className="h3 lg:pt-5" data-reveal="up">
              {g.title}
            </h2>
            <FaqList faqs={g.faqs} />
          </section>
        ))}
      </div>
      <ClosingCta />
      <JsonLd data={breadcrumbJsonLd([{ name: "Häufige Fragen", path: "/fragen" }])} />
      <JsonLd data={faqJsonLd(all)} />
    </>
  );
}
