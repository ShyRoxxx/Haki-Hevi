import Image from "next/image";
import { Navigation, Phone, Mail } from "lucide-react";
import standortMap from "@/public/img/karte-standort.webp";
import { business, mailHref, telHref } from "@/lib/content";
import { project } from "@/lib/geo";
import { MapAttribution } from "./MapAttribution";
import { OfficeStatus } from "./OfficeStatus";

export function LocationSection({ title = "So erreichen Sie uns" }: { title?: string }) {
  const pos = project("karte-standort", business.geo.lat, business.geo.lon);
  return (
    <section className="section" aria-labelledby="standort-title">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 id="standort-title" className="h2" data-reveal="up">
            {title}
          </h2>
          <address className="mt-8 not-italic text-[length:var(--step-1)] leading-normal" data-reveal="up">
            {business.name}
            <br />
            {business.street}
            <br />
            {business.zip} {business.city}
          </address>
          <p className="mt-3 text-ink-2" data-reveal="up">
            Im Gewerbegebiet an der Dieselstraße, {business.district}, zwischen Langenhagen und Altwarmbüchen.
          </p>

          <div className="mt-8 rounded-[var(--radius-surface)] bg-paper-2 p-6" data-reveal="up">
            <h3 className="font-semibold">Bürozeiten</h3>
            <dl className="tnum mt-3 space-y-1 text-ink-2">
              <div className="flex justify-between gap-6">
                <dt>Montag bis Freitag</dt>
                <dd>9:00–12:00 Uhr</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt>Samstag und Sonntag</dt>
                <dd>geschlossen</dd>
              </div>
            </dl>
            <OfficeStatus className="mt-4 text-[0.95rem] text-ink-2" />
          </div>

          <ul className="mt-8 space-y-2" data-reveal="up">
            <li>
              <a href={telHref} className="group inline-flex min-h-11 items-center gap-3 font-semibold">
                <Phone size={18} strokeWidth={1.75} className="text-leaf-deep" aria-hidden />
                <span className="link tnum">{business.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={mailHref} className="group inline-flex min-h-11 items-center gap-3 font-semibold">
                <Mail size={18} strokeWidth={1.75} className="text-leaf-deep" aria-hidden />
                <span className="link">{business.email}</span>
              </a>
            </li>
            <li>
              <a href={business.routeUrl} target="_blank" rel="noopener" className="group inline-flex min-h-11 items-center gap-3 font-semibold">
                <Navigation size={18} strokeWidth={1.75} className="text-leaf-deep" aria-hidden />
                <span className="link">Route planen (Google Maps)</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="relative min-h-[20rem] overflow-hidden rounded-[var(--radius-stage)] bg-paper-2 lg:min-h-[32rem]" data-reveal="left">
          <Image
            src={standortMap}
            alt="Kartenausschnitt Isernhagen NB mit der Dieselstraße und dem Standort von Haki & Hevi"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 56vw, 96vw"
            className="object-cover"
            style={{ objectPosition: `${pos.x}% ${pos.y}%` }}
          />
          <div className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
            <svg width="40" height="52" viewBox="0 0 44 56" aria-hidden className="absolute -translate-x-1/2 -translate-y-full drop-shadow-[0_6px_10px_rgb(0_0_0/0.25)]">
              <path d="M22 55C22 55 42 33.5 42 21A20 20 0 0 0 2 21C2 33.5 22 55 22 55Z" fill="#e9b949" stroke="#1e2a17" strokeWidth="2" />
              <circle cx="22" cy="21" r="7.5" fill="#1e2a17" />
            </svg>
            <span className="absolute left-6 top-0 -translate-y-[160%] whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-[0.875rem] font-semibold text-paper">
              Haki & Hevi · Dieselstraße 13 A
            </span>
          </div>
          <MapAttribution className="absolute bottom-3 right-3" />
        </div>
      </div>
    </section>
  );
}
