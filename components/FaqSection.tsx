import Link from "next/link";
import { FaqList } from "./FaqList";
import type { Faq } from "@/lib/content";

export function FaqSection({ faqs, title = "Was Kitas und Eltern uns oft fragen", more = true }: { faqs: Faq[]; title?: string; more?: boolean }) {
  return (
    <section className="section pt-0" aria-labelledby="faq-title">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 id="faq-title" className="h2 max-w-[16ch]" data-reveal="up">
            {title}
          </h2>
          {more && (
            <p className="mt-6 text-ink-2" data-reveal="up">
              Weitere Antworten zu Bestellung, Abrechnung und Lieferung finden Sie unter{" "}
              <Link href="/fragen" className="link font-semibold text-leaf-deep">
                Häufige Fragen
              </Link>
              .
            </p>
          )}
        </div>
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}
