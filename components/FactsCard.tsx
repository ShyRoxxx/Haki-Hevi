import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { business, telHref } from "@/lib/content";

export function FactsCard({ title = "Auf einen Blick", facts, cta = "Angebot anfragen" }: { title?: string; facts: string[]; cta?: string }) {
  return (
    <div className="rounded-[var(--radius-surface)] bg-card p-6 shadow-[0_18px_40px_-24px_rgb(30_42_23/0.35)] sm:p-8">
      <p className="font-display text-[1.35rem] font-semibold">{title}</p>
      <ul className="mt-5 space-y-3">
        {facts.map((f) => (
          <li key={f} className="flex gap-3 text-ink-2">
            <Check size={18} strokeWidth={2} className="mt-1 shrink-0 text-leaf-deep" aria-hidden />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex flex-col gap-3">
        <Link href="/kontakt" className="btn btn-primary">
          {cta} <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
        </Link>
        <a href={telHref} className="link tnum text-center font-semibold">
          oder anrufen: {business.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
