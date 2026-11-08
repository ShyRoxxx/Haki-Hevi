import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileCallBar } from "@/components/MobileCallBar";
import { RevealController } from "@/components/RevealController";
import { JsonLd } from "@/components/JsonLd";
import { business, SITE_URL } from "@/lib/content";
import { localBusinessJsonLd } from "@/lib/seo";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-bricolage",
  display: "swap",
  adjustFontFallback: true,
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.shortName} · Isernhagen NB`,
    template: `%s · ${business.shortName}`,
  },
  description:
    "Täglich frisch gekochtes Mittagessen für Kitas, Schulen und Firmen aus Isernhagen NB, dazu Partyservice mit orientalischer Küche.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  applicationName: business.shortName,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#3f6a1f",
  width: "device-width",
  initialScale: 1,
};

// Wird vor dem ersten Rendern ausgeführt: JS-Klasse und reduzierte Bewegung setzen
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduce-motion')}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${bricolage.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[10px] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCallBar />
        <RevealController />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
