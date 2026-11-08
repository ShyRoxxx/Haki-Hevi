import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "./PageHero";
import { FactsCard } from "./FactsCard";
import { FaqSection } from "./FaqSection";
import { ClosingCta } from "./ClosingCta";
import { JsonLd } from "./JsonLd";
import { footerNav, services, type ServicePage } from "@/lib/content";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export function ServicePageView({ page, crumb, children }: { page: ServicePage; crumb: string; children?: React.ReactNode }) {
  const service = services.find((s) => s.slug === page.slug);
  const related = page.related
    .map((href) => footerNav.find((n) => n.href === href))
    .filter((x): x is { href: string; label: string } => Boolean(x));

  return (
    <>
      <PageHero
        crumbs={[{ name: crumb, path: page.path }]}
        statement={page.statement}
        h1={page.h1}
        intro={page.intro}
        aside={service ? <FactsCard facts={service.facts} /> : undefined}
      />

      <div className="wrap">
        {page.sections.map((sec, i) => (
          <section
            key={sec.title}
            className={`grid gap-6 border-t border-[var(--line-strong)] py-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-20 ${i === 0 ? "" : ""}`}
            aria-labelledby={`sec-${i}`}
          >
            <h2 id={`sec-${i}`} className="h2 text-[length:var(--step-3)] lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start" data-reveal="up">
              {sec.title}
            </h2>
            <div className="space-y-5">
              {sec.paragraphs.map((p, j) => (
                <p key={j} className="prose-measure text-ink-2" data-reveal="up">
                  {p}
                </p>
              ))}
              {sec.list && (
                <ul className="grid gap-3 pt-2 sm:grid-cols-2" data-reveal="up">
                  {sec.list.map((li) => (
                    <li key={li} className="flex gap-3 rounded-[12px] bg-paper-2 px-4 py-3.5">
                      <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-leaf-deep" aria-hidden />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      {children}

      <FaqSection faqs={page.faqs} title="Fragen, die wir dazu oft hören" />

      <nav aria-label="Verwandte Seiten" className="wrap pb-[var(--section)]">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-ink-3">Auch interessant</h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group flex min-h-16 items-center justify-between gap-4 rounded-[14px] border-[1.5px] border-[var(--line-strong)] px-5 py-4 font-semibold transition-[border-color,background-color] duration-200 hover:border-leaf-deep hover:bg-card"
              >
                {r.label}
                <ArrowRight size={18} strokeWidth={1.75} className="text-leaf-deep transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ClosingCta />
      <JsonLd data={breadcrumbJsonLd([{ name: crumb, path: page.path }])} />
      <JsonLd data={faqJsonLd(page.faqs)} />
    </>
  );
}
