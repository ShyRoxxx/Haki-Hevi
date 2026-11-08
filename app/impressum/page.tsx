import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";
import { business } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Impressum · Haki & Hevi", description: "Impressum von Haki & Hevi Ambiente & Service-Catering, Isernhagen NB.", path: "/impressum" });

export default function ImprintPage() {
  return (
    <LegalPlaceholder title="Impressum" path="/impressum">
      <p>Angaben wie auf der bisherigen Website (zur Prüfung):</p>
      <p>
        {business.name}
        <br />
        {business.street}
        <br />
        30916 Isernhagen
      </p>
      <p>Geschäftsführerin: {business.owner}</p>
      <p>
        Telefon: +49 (0)511 779 513 77
        <br />
        Telefax: +49 (0)511 779 513 78
        <br />
        E-Mail: {business.email}
      </p>
    </LegalPlaceholder>
  );
}
