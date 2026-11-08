import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { LocationSection } from "@/components/LocationSection";
import { OfficeStatus } from "@/components/OfficeStatus";
import { JsonLd } from "@/components/JsonLd";
import { business, mailHref, telHref } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt & Angebot – Catering Isernhagen | Haki & Hevi",
  description: "Angebot für Kita, Schule, Firma oder Feier anfragen: Haki & Hevi, Dieselstraße 13 A, Isernhagen NB, Telefon 0511 779 513 77. Antwort meist binnen 24 Stunden.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <section className="pb-[var(--section)]" aria-labelledby="page-title">
        <div className="wrap pt-8">
          <Breadcrumbs items={[{ name: "Kontakt & Angebot", path: "/kontakt" }]} />
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <p className="display hero-line text-[length:var(--step-5)]">Erzählen Sie uns, wer mittags isst.</p>
              <h1 id="page-title" className="hero-line mt-5 text-[length:var(--step-1)] font-semibold leading-snug text-leaf-deep" style={{ animationDelay: "100ms" }}>
                Angebot anfragen für Kita, Schule, Firma oder Feier
              </h1>
              <p className="hero-line prose-measure mt-5 text-ink-2" style={{ animationDelay: "180ms" }}>
                Je mehr wir wissen — Kinderzahl, Liefertage, Allergien —, desto genauer wird unser Angebot. Wir antworten in der Regel innerhalb von 24 Stunden.
              </p>

              <ul className="hero-line mt-10 space-y-4" style={{ animationDelay: "240ms" }}>
                <li>
                  <a href={telHref} className="group flex items-center gap-4 rounded-[var(--radius-surface)] bg-leaf-deep p-5 text-on-leaf transition-colors hover:bg-leaf-night">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/12">
                      <Phone size={20} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span>
                      <span className="tnum block font-display text-[1.6rem] font-semibold leading-tight">{business.phoneDisplay}</span>
                      <OfficeStatus tone="leaf" className="text-[0.95rem] text-on-leaf-2" />
                    </span>
                  </a>
                </li>
                <li>
                  <a href={mailHref} className="flex items-center gap-4 rounded-[var(--radius-surface)] bg-card p-5 transition-colors hover:bg-paper-2">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper-2 text-leaf-deep">
                      <Mail size={20} strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-semibold">{business.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-4 p-5 text-ink-2">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper-2 text-leaf-deep">
                    <Clock size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="tnum">Bürozeiten Mo–Fr 9:00–12:00 Uhr</span>
                </li>
              </ul>
            </div>

            <div className="hero-line rounded-[var(--radius-stage)] bg-paper-2 p-6 sm:p-10" style={{ animationDelay: "160ms" }}>
              <h2 className="h3">Ihre Anfrage</h2>
              <p className="mt-2 text-ink-2">Pflicht sind nur Name, ein Rückweg und ein Satz zum Anliegen.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <LocationSection title="Anfahrt" />
      <JsonLd data={breadcrumbJsonLd([{ name: "Kontakt & Angebot", path: "/kontakt" }])} />
    </>
  );
}
