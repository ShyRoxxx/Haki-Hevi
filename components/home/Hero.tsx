import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import regionMap from "@/public/img/karte-region.webp";
import { business, deliveryPoints, telHref } from "@/lib/content";
import { mapInfo, project, pxPerKm } from "@/lib/geo";
import { MapAttribution } from "../MapAttribution";

export function Hero() {
  const info = mapInfo("karte-region");
  const ratio = info.width / info.height;
  const kitchen = project("karte-region", business.geo.lat, business.geo.lon);
  const km = pxPerKm("karte-region", business.geo.lat);
  const kx = (kitchen.x / 100) * info.width;
  const ky = (kitchen.y / 100) * info.height;

  return (
    <section className="hero relative" aria-labelledby="hero-title">
      <div className="wrap pt-3 lg:pt-4">
        <div className="relative">
          {/* Karte */}
          <div
            className="hero-map relative overflow-hidden rounded-[var(--radius-stage)] bg-leaf-deep"
            style={{ ["--map-ratio" as string]: ratio }}
          >
            <div className="hero-map-inner absolute left-1/2 top-1/2">
              <Image
                src={regionMap}
                alt="Karte der Region nördlich von Hannover: die Küche von Haki & Hevi in Isernhagen NB und belieferte Schulen in Isernhagen HB und Brelingen"
                fill
                preload
                fetchPriority="high"
                placeholder="blur"
                quality={70}
                sizes="(min-width: 1440px) 1344px, 96vw"
                className="hero-map-img object-cover"
              />
              {/* Entfernungsringe */}
              <svg
                viewBox={`0 0 ${info.width} ${info.height}`}
                className="absolute inset-0 h-full w-full"
                aria-hidden
                preserveAspectRatio="none"
              >
                {[5, 10].map((r, i) => (
                  <g key={r} className="hero-ring" style={{ animationDelay: `${600 + i * 140}ms` }}>
                    <circle cx={kx} cy={ky} r={r * km} fill="none" stroke="#f5f7ef" strokeOpacity={0.55} strokeWidth={2.5} strokeDasharray="2 12" strokeLinecap="round" />
                    <text x={kx + r * km * 0.7071 + 10} y={ky - r * km * 0.7071 - 10} fill="#f5f7ef" fontSize={30} fontWeight={600} fontFamily="var(--font-figtree)">
                      {r} km
                    </text>
                  </g>
                ))}
              </svg>

              {/* Belieferte Einrichtungen */}
              {deliveryPoints.map((p, i) => {
                const pos = project("karte-region", p.lat, p.lon);
                return (
                  <div
                    key={p.name}
                    className="hero-point absolute flex items-center gap-2"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%`, animationDelay: `${900 + i * 120}ms` }}
                  >
                    <span aria-hidden className="block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-paper bg-turmeric shadow-[0_2px_6px_rgb(0_0_0/0.25)]" />
                    <span className="-translate-y-1/2 whitespace-nowrap rounded-md bg-card/95 px-2 py-1 text-[0.875rem] leading-tight text-ink shadow-[0_2px_8px_rgb(0_0_0/0.12)]">
                      <span className="font-semibold">{p.name}</span>
                      <span className="hidden sm:inline text-ink-2"> · {p.place}</span>
                    </span>
                  </div>
                );
              })}

              {/* Küche */}
              <div className="absolute" style={{ left: `${kitchen.x}%`, top: `${kitchen.y}%` }}>
                <div className="hero-pin">
                  <svg width="44" height="56" viewBox="0 0 44 56" aria-hidden className="drop-shadow-[0_6px_10px_rgb(0_0_0/0.3)]">
                    <path d="M22 55C22 55 42 33.5 42 21A20 20 0 0 0 2 21C2 33.5 22 55 22 55Z" fill="#e9b949" stroke="#1e2a17" strokeWidth="2" />
                    <circle cx="22" cy="21" r="7.5" fill="#1e2a17" />
                  </svg>
                </div>
                <span className="hero-ring-once absolute left-0 top-0 block size-16 rounded-full border-2 border-turmeric" aria-hidden />
                <span className="hero-point absolute right-4 top-0 -translate-y-[170%] sm:left-4 sm:right-auto whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[0.875rem] font-semibold leading-tight text-paper shadow-[0_2px_8px_rgb(0_0_0/0.2)]" style={{ animationDelay: "700ms" }}>
                  Unsere Küche<span className="hidden sm:inline font-normal text-on-leaf-2"> · Dieselstraße 13 A</span>
                </span>
              </div>
            </div>

            <MapAttribution className="absolute bottom-3 right-3 z-10" />
          </div>

          {/* Aussage, an der Küche verankert */}
          <div className="hero-card relative z-10 -mt-10 rounded-[var(--radius-surface)] bg-card p-6 shadow-[0_18px_40px_-18px_rgb(30_42_23/0.35)] sm:p-8 lg:absolute lg:left-8 lg:top-1/2 lg:mt-0 lg:w-[min(36rem,44%)] lg:-translate-y-[46%] lg:p-10">
            <p className="display hero-line text-[clamp(2.5rem,1.6rem+3.4vw,4.25rem)] text-ink" style={{ animationDelay: "120ms" }}>
              Hier kochen wir für Ihre Kita.
            </p>
            <h1 id="hero-title" className="hero-line mt-4 text-[1.0625rem] font-semibold leading-snug text-leaf-deep sm:text-[1.15rem]" style={{ animationDelay: "220ms" }}>
              Kita-, Schul- und Firmen-Catering aus Isernhagen NB für die Region Hannover
            </h1>
            <p className="hero-line mt-4 hidden max-w-[44ch] text-ink-2 sm:block" style={{ animationDelay: "300ms" }}>
              Täglich frisch gekocht, ohne Convenience-Food und ohne Schweinefleisch, jedes Allergen pro Kind im Blick. Unsere Fahrer bringen das Essen pünktlich zum Mittag.
            </p>
            <div className="hero-line mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6" style={{ animationDelay: "380ms" }}>
              <Link href="/kontakt" className="btn btn-primary">
                Angebot für Ihre Einrichtung <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
              </Link>
              <a href={telHref} className="link tnum font-semibold text-ink">
                oder {business.phoneDisplay}
              </a>
            </div>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener"
              className="hero-line mt-6 inline-flex items-center gap-2 text-[0.95rem] text-ink-2 transition-colors hover:text-ink"
              style={{ animationDelay: "460ms" }}
            >
              <Star size={16} strokeWidth={1.75} className="fill-turmeric text-turmeric" aria-hidden />
              <span>
                <strong className="font-semibold text-ink">{business.rating.value}</strong> aus {business.rating.count} Google-Bewertungen
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
