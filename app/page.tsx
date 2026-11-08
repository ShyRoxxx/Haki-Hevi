import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { MenuSection } from "@/components/home/MenuSection";
import { Process } from "@/components/home/Process";
import { About } from "@/components/home/About";
import { LocationSection } from "@/components/LocationSection";
import { FaqSection } from "@/components/FaqSection";
import { ClosingCta } from "@/components/ClosingCta";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs } from "@/lib/content";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Catering Isernhagen NB – Kita, Schule, Firmen | Haki & Hevi",
  description:
    "Täglich frisch gekochtes Mittagessen für Kitas, Schulen und Firmen aus Isernhagen NB: ohne Convenience, halal, Allergien pro Kind. Jetzt Angebot anfragen.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <MenuSection />
      <Process />
      <About />
      <LocationSection />
      <FaqSection faqs={homeFaqs} />
      <ClosingCta />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
