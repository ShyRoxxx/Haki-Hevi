import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-[var(--line-strong)] border-y border-[var(--line-strong)]">
      {faqs.map((f) => (
        <details key={f.q} className="faq group" data-reveal="up">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 font-display text-[clamp(1.15rem,1.05rem+0.5vw,1.45rem)] font-semibold leading-snug transition-colors duration-200 hover:text-leaf-deep">
            {f.q}
            <span
              aria-hidden
              className="grid size-10 shrink-0 place-items-center rounded-full border-[1.5px] border-[var(--line-strong)] transition-[transform,background-color,border-color,color] duration-300 ease-[var(--ease-out)] group-open:rotate-45 group-open:border-leaf-deep group-open:bg-leaf-deep group-open:text-on-leaf"
            >
              <Plus size={18} strokeWidth={1.75} />
            </span>
          </summary>
          <div className="faq-body">
            <p className="prose-measure pb-6 text-ink-2">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
