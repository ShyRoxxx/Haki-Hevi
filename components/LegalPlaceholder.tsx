import { Breadcrumbs } from "./PageHero";

export function LegalPlaceholder({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return (
    <section className="wrap pb-[var(--section)] pt-8">
      <Breadcrumbs items={[{ name: title, path }]} />
      <h1 className="display mt-6 text-[length:var(--step-4)]">{title}</h1>
      <div role="note" className="mt-8 max-w-[70ch] rounded-[var(--radius-surface)] border-2 border-dashed border-turmeric bg-turmeric-pale/60 p-6">
        <p className="font-semibold">Platzhalter — noch kein geprüfter Rechtstext</p>
        <p className="mt-2 text-ink-2">
          Diese Seite gehört zur Website-Vorschau. Der endgültige, rechtlich geprüfte Text wird vor dem Livegang ergänzt.
        </p>
      </div>
      <div className="prose-measure mt-10 space-y-4 text-ink-2">{children}</div>
    </section>
  );
}
