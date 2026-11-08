import type { Metadata } from "next";
import { business, SITE_URL, type Faq } from "./content";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: business.shortName,
      locale: "de_DE",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    additionalType: "https://schema.org/CateringService",
    "@id": `${SITE_URL}/#betrieb`,
    name: business.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: business.phone,
    email: business.email,
    servesCuisine: ["Kinderverpflegung", "Orientalisch", "International"],
    founder: { "@type": "Person", name: business.owner, jobTitle: business.ownerRole },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.street,
      postalCode: business.zip,
      addressLocality: "Isernhagen",
      addressRegion: "Niedersachsen",
      addressCountry: "DE",
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lon },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "12:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Isernhagen" },
      { "@type": "City", name: "Wedemark" },
      { "@type": "AdministrativeArea", name: "Region Hannover" },
    ],
    sameAs: [business.mapsUrl, business.orderPortal],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Start", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
