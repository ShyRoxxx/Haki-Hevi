import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, mainNav, telHref } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="wrap pb-[var(--section)] pt-16">
      <p className="display text-[length:var(--step-5)]">Dieses Gericht steht nicht auf dem Plan.</p>
      <h1 className="mt-5 text-[length:var(--step-1)] font-semibold text-leaf-deep">Seite nicht gefunden (Fehler 404)</h1>
      <p className="prose-measure mt-5 text-ink-2">
        Vielleicht hat sich die Adresse geändert. Hier geht es weiter — oder rufen Sie uns an:{" "}
        <a href={telHref} className="link tnum font-semibold text-ink">
          {business.phoneDisplay}
        </a>
        .
      </p>
      <ul className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {[{ href: "/", label: "Zur Startseite" }, ...mainNav, { href: "/kontakt", label: "Kontakt & Angebot" }].map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="group flex min-h-14 items-center justify-between rounded-[14px] border-[1.5px] border-[var(--line-strong)] px-5 font-semibold transition-colors hover:border-leaf-deep hover:bg-card">
              {i.label}
              <ArrowRight size={18} strokeWidth={1.75} className="text-leaf-deep transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
