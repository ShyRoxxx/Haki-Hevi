import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import regionMap from "@/public/img/karte-region.webp";
import { business } from "@/lib/content";
import { project } from "@/lib/geo";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Brotkrumen" className="text-[0.95rem] text-ink-3">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="link inline-flex min-h-10 items-center">
            Start
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-1">
            <ChevronRight size={14} strokeWidth={1.75} aria-hidden />
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink-2">
                {it.name}
              </span>
            ) : (
              <Link href={it.path} className="link inline-flex min-h-10 items-center">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Kopf für Unterseiten: Kartenband (Ort zuerst), Aussage, h1, Einleitung */
export function PageHero({
  crumbs,
  statement,
  h1,
  intro,
  aside,
}: {
  crumbs: { name: string; path: string }[];
  statement: string;
  h1: string;
  intro?: string[];
  aside?: React.ReactNode;
}) {
  const k = project("karte-region", business.geo.lat, business.geo.lon);
  return (
    <section className="pb-[calc(var(--section)*0.75)]" aria-labelledby="page-title">
      <div className="wrap pt-3 lg:pt-4">
        <div className="relative h-28 overflow-hidden rounded-[var(--radius-surface)] bg-leaf-deep sm:h-36">
          <Image
            src={regionMap}
            alt=""
            aria-hidden
            fill
            placeholder="blur"
            quality={70}
            sizes="(min-width: 1440px) 1344px, 96vw"
            className="hero-map-img object-cover"
            style={{ objectPosition: `${k.x}% ${k.y}%` }}
          />
          <div className="absolute" style={{ left: `${k.x}%`, top: `${k.y}%` }} aria-hidden>
            <div className="hero-pin">
              <svg width="34" height="44" viewBox="0 0 44 56" className="drop-shadow-[0_6px_10px_rgb(0_0_0/0.3)]">
                <path d="M22 55C22 55 42 33.5 42 21A20 20 0 0 0 2 21C2 33.5 22 55 22 55Z" fill="#e9b949" stroke="#1e2a17" strokeWidth="2" />
                <circle cx="22" cy="21" r="7.5" fill="#1e2a17" />
              </svg>
            </div>
          </div>
          <p className="absolute bottom-3 left-4 rounded-md bg-ink px-2.5 py-1 text-[0.875rem] font-semibold text-paper">
            Küche · {business.street}, {business.city}
          </p>
        </div>

        <div className="mt-8">
          <Breadcrumbs items={crumbs} />
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="display hero-line text-[length:var(--step-5)]">{statement}</p>
            <h1 id="page-title" className="hero-line mt-5 text-[length:var(--step-1)] font-semibold leading-snug text-leaf-deep" style={{ animationDelay: "100ms" }}>
              {h1}
            </h1>
            {intro?.map((p, i) => (
              <p key={i} className="hero-line prose-measure mt-5 text-ink-2" style={{ animationDelay: `${180 + i * 60}ms` }}>
                {p}
              </p>
            ))}
          </div>
          {aside && (
            <div className="hero-line lg:pt-3" style={{ animationDelay: "260ms" }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
