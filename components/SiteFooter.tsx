import Link from "next/link";
import Image from "next/image";
import logo from "@/public/brand/logo.png";
import { business, footerNav, mailHref, telHref } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-paper-2 pb-28 pt-16 lg:pb-12">
      <div className="wrap grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-5" data-reveal="up">
          <div className="inline-flex rounded-[14px] bg-card p-3">
            <Image src={logo} alt="Haki & Hevi Ambiente & Service-Catering" className="h-16 w-auto" sizes="240px" />
          </div>
          <address className="not-italic leading-relaxed text-ink-2">
            {business.name}
            <br />
            {business.street}
            <br />
            {business.zip} {business.city}
          </address>
          <p className="text-ink-2">
            <a href={telHref} className="link tnum font-semibold text-ink">
              {business.phoneDisplay}
            </a>
            <br />
            <a href={mailHref} className="link">
              {business.email}
            </a>
          </p>
        </div>

        <div data-reveal="up">
          <h2 className="mb-4 text-[0.95rem] font-semibold text-ink">Angebot</h2>
          <ul className="space-y-1">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-10 items-center text-ink-2 transition-colors hover:text-leaf-deep">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8" data-reveal="up">
          <div>
            <h2 className="mb-4 text-[0.95rem] font-semibold text-ink">Bürozeiten</h2>
            <dl className="tnum space-y-1 text-ink-2">
              <div className="flex justify-between gap-6">
                <dt>Montag bis Freitag</dt>
                <dd>9:00–12:00 Uhr</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt>Samstag und Sonntag</dt>
                <dd>geschlossen</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="mb-4 text-[0.95rem] font-semibold text-ink">Liefergebiet</h2>
            <p className="text-ink-2">Isernhagen, Wedemark und weitere Orte in der Region Hannover — fragen Sie uns nach Ihrer Adresse.</p>
          </div>
          <a href={business.orderPortal} target="_blank" rel="noopener" className="link font-semibold text-leaf-deep">
            Zum Bestellportal
          </a>
        </div>
      </div>

      <div className="wrap mt-14 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p>© {business.year} {business.name}. Alle Rechte vorbehalten.</p>
          <p>
            <a href="https://bilbaoconsulting.com" target="_blank" rel="noopener" className="link">
              Website von Bilbao Consulting
            </a>
          </p>
        </div>
        <ul className="flex gap-5">
          <li>
            <Link href="/impressum" className="link inline-flex min-h-10 items-center">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/datenschutz" className="link inline-flex min-h-10 items-center">
              Datenschutz
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
