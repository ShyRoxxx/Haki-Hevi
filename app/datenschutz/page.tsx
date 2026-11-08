import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Datenschutz · Haki & Hevi", description: "Datenschutzerklärung von Haki & Hevi Ambiente & Service-Catering.", path: "/datenschutz" });

export default function PrivacyPage() {
  return (
    <LegalPlaceholder title="Datenschutz" path="/datenschutz">
      <p>
        Technischer Stand dieser Vorschau: Die Seite setzt keine Cookies, lädt keine Analyse- oder Werbedienste und bindet keine Schriften, Karten oder Skripte fremder Server ein. Die Karten sind fest
        eingebundene Bilder aus OpenStreetMap-Daten.
      </p>
      <p>Das Anfrageformular verschickt selbst nichts, sondern öffnet eine vorbereitete E-Mail in Ihrem E-Mail-Programm.</p>
    </LegalPlaceholder>
  );
}
