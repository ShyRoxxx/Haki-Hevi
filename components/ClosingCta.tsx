import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { business, telHref } from "@/lib/content";

export function ClosingCta({
  title = "Wie viele Kinder sitzen bei Ihnen mittags am Tisch?",
  text = "Schreiben Sie uns Kinderzahl, Liefertage und Besonderheiten. Wir melden uns mit einem Angebot.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="wrap pb-[var(--section)]" aria-labelledby="cta-title">
      <div className="leaf-field grain on-leaf rounded-[var(--radius-stage)] px-6 py-14 sm:px-12 sm:py-20 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <h2 id="cta-title" className="h2 max-w-[20ch] text-on-leaf" data-reveal="up">
              {title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[length:var(--step-1)] leading-normal text-on-leaf-2" data-reveal="up">
              {text}
            </p>
          </div>
          <div className="flex flex-col gap-4" data-reveal="up">
            <Link href="/kontakt" className="btn btn-turmeric w-full sm:w-auto">
              Angebot anfragen <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
            </Link>
            <a href={telHref} className="btn w-full border-[1.5px] border-white/30 text-on-leaf hover:border-white/70 sm:w-auto">
              <Phone size={18} strokeWidth={1.75} aria-hidden /> {business.phoneDisplay}
            </a>
            <p className="text-center text-[0.95rem] text-on-leaf-2 lg:text-left">Antwort in der Regel innerhalb von 24 Stunden.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
