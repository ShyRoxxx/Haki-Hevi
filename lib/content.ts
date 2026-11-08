// Alle Inhalte der Website an einer Stelle. Ein Textwechsel ist eine Zeile hier.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://haki-hevi.demo.bilbaoconsulting.com";

export const business = {
  name: "Haki & Hevi Ambiente & Service-Catering",
  shortName: "Haki & Hevi",
  owner: "Akide Ediz",
  ownerRole: "Geschäftsführerin",
  street: "Dieselstraße 13 A",
  zip: "30916",
  city: "Isernhagen NB",
  district: "Niedernhägener Bauerschaft",
  region: "Region Hannover",
  phone: "+49 511 77951377",
  phoneDisplay: "0511 779 513 77",
  fax: "0511 779 513 78",
  email: "info@haki-hevi.de",
  geo: { lat: 52.4520832, lon: 9.7857494 },
  mapsUrl: "https://maps.google.com/?cid=1695933551604498723",
  routeUrl: "https://www.google.com/maps/dir/?api=1&destination=Haki+%26+Hevi+Ambiente+%26+Service-Catering,+Dieselstra%C3%9Fe+13+A,+30916+Isernhagen",
  orderPortal: "https://haki-hevi.com",
  rating: { value: "4,6", count: 25 },
  // Bürozeiten laut Google-Unternehmensprofil
  hours: [
    { days: "Montag bis Freitag", short: "Mo–Fr", open: "09:00", close: "12:00" },
    { days: "Samstag und Sonntag", short: "Sa–So", open: null, close: null },
  ],
  year: 2026,
} as const;

export const telHref = `tel:${business.phone.replace(/\s/g, "")}`;
export const mailHref = `mailto:${business.email}`;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/kita-verpflegung", label: "Kita & Krippe" },
  { href: "/schulverpflegung", label: "Schulen & Horte" },
  { href: "/partyservice", label: "Partyservice" },
  { href: "/speiseplan", label: "Speiseplan" },
  { href: "/ueber-uns", label: "Über uns" },
];

export const footerNav: NavItem[] = [
  { href: "/kita-verpflegung", label: "Kita- und Krippenverpflegung" },
  { href: "/schulverpflegung", label: "Schulverpflegung" },
  { href: "/firmen-catering", label: "Firmen-Catering" },
  { href: "/partyservice", label: "Partyservice" },
  { href: "/allergien", label: "Allergien & besondere Ernährung" },
  { href: "/speiseplan", label: "Speiseplan der Woche" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/fragen", label: "Häufige Fragen" },
  { href: "/kontakt", label: "Kontakt & Angebot" },
];

/* ------------------------------------------------------------------ */
/* Allergene: Kennziffern wie auf dem Speiseplan von Haki & Hevi       */
/* ------------------------------------------------------------------ */

export type AllergenId = "ei" | "milch" | "fisch" | "gluten" | "soja" | "sellerie" | "huelsen" | "senf" | "schalen";

export const allergens: { id: AllergenId; code: string; label: string; long: string }[] = [
  { id: "milch", code: "2", label: "Milch", long: "Milch, Milcheiweiß und Laktose" },
  { id: "gluten", code: "4", label: "Gluten", long: "Glutenhaltiges Getreide, z. B. Weizen (4.1)" },
  { id: "ei", code: "1", label: "Ei", long: "Eier und Erzeugnisse daraus" },
  { id: "sellerie", code: "8", label: "Sellerie", long: "Sellerie und Erzeugnisse daraus" },
  { id: "huelsen", code: "12", label: "Hülsenfrüchte", long: "Hülsenfrüchte, z. B. Erbsen, Bohnen, Linsen" },
  { id: "fisch", code: "3", label: "Fisch", long: "Fisch und Erzeugnisse daraus" },
  { id: "soja", code: "6", label: "Soja", long: "Sojabohnen und Erzeugnisse daraus" },
  { id: "senf", code: "9", label: "Senf", long: "Senf und Erzeugnisse daraus" },
  { id: "schalen", code: "7", label: "Schalenfrüchte", long: "Schalenfrüchte (Nüsse)" },
];

/** Vollständiger Kennziffern-Schlüssel aus dem Speiseplan von Haki & Hevi */
export const allergenKey: { code: string; label: string }[] = [
  { code: "1", label: "Ei" },
  { code: "2", label: "Milcheiweiß" },
  { code: "3", label: "Fisch" },
  { code: "4", label: "Glutenhaltiges Getreide (4.1 Weizen, 4.2 Roggen, 4.3 Gerste, 4.4 Hafer, 4.5 Dinkel)" },
  { code: "5", label: "Erdnüsse" },
  { code: "6", label: "Sojabohnen" },
  { code: "7", label: "Schalenfrüchte" },
  { code: "8", label: "Sellerie" },
  { code: "9", label: "Senf" },
  { code: "11", label: "Lupine" },
  { code: "12", label: "Hülsenfrüchte" },
  { code: "13", label: "Geflügel" },
  { code: "R", label: "mit Rindfleisch" },
];

export type Dish = {
  name: string;
  kind: "Hauptgericht" | "Vegetarisch";
  allergens: AllergenId[];
  /** Fleisch-Hinweis wie im Bestellportal */
  meat?: "Rind" | "Geflügel";
  extra?: string;
};

export type MenuDay = {
  day: string;
  date: string;
  dishes: [Dish, Dish];
  sides: { fruit: "Obst" | "Rohkost"; dessert: string };
};

/** Speiseplan KW 46 / 2026, übernommen aus haki-hevi.com/weekly-menu (Stand 8. November 2026) */
export const weekMenu: {
  label: string;
  range: string;
  source: string;
  days: MenuDay[];
  sideNote: string;
  portion: string;
} = {
  label: "KW 46",
  range: "9. bis 13. November 2026",
  source: "Bestellportal haki-hevi.com, Stand 8. November 2026",
  days: [
    {
      day: "Montag",
      date: "9.11.",
      dishes: [
        { name: "Nudeln mit Thunfischsauce", kind: "Hauptgericht", allergens: ["milch", "fisch", "gluten", "sellerie"] },
        { name: "Nudeln mit Käse-Erbsen-Sahnesauce", kind: "Vegetarisch", allergens: ["milch", "sellerie", "huelsen", "gluten"] },
      ],
      sides: { fruit: "Obst", dessert: "Fruchtquark" },
    },
    {
      day: "Dienstag",
      date: "10.11.",
      dishes: [
        { name: "Asiatische Reispfanne mit Rindfleisch", kind: "Hauptgericht", allergens: ["soja", "huelsen"], meat: "Rind" },
        { name: "Gemüseauflauf", kind: "Vegetarisch", allergens: ["ei", "milch", "sellerie", "gluten"] },
      ],
      sides: { fruit: "Rohkost", dessert: "Wackelpeter" },
    },
    {
      day: "Mittwoch",
      date: "11.11.",
      dishes: [
        { name: "Bratwurst mit Kartoffelpüree und Sauerkraut", kind: "Hauptgericht", allergens: ["milch"], meat: "Geflügel" },
        { name: "Milchreis mit Apfelmus", kind: "Vegetarisch", allergens: ["milch"] },
      ],
      sides: { fruit: "Obst", dessert: "Orangenpudding" },
    },
    {
      day: "Donnerstag",
      date: "12.11.",
      dishes: [
        { name: "Fischstäbchen mit Bulgur und Sauce", kind: "Hauptgericht", allergens: ["fisch", "sellerie", "huelsen"], meat: "Geflügel" },
        { name: "Chili sin Carne mit Reis", kind: "Vegetarisch", allergens: ["sellerie", "huelsen"], extra: "Paprika" },
      ],
      sides: { fruit: "Rohkost", dessert: "Fruchtjoghurt" },
    },
    {
      day: "Freitag",
      date: "13.11.",
      dishes: [
        { name: "Käse-Lauchsuppe mit Rinderhackfleisch und Brot", kind: "Hauptgericht", allergens: ["milch", "sellerie"], meat: "Rind" },
        { name: "Kartoffel-Möhren-Eintopf und Brot", kind: "Vegetarisch", allergens: ["sellerie"] },
      ],
      sides: { fruit: "Obst", dessert: "Apfelkuchen" },
    },
  ],
  sideNote:
    "Zu jedem Gericht gibt es wahlweise Obst oder Rohkost, ein Dessert und einen Beilagensalat. Die Desserts enthalten in dieser Woche Milch und Weizen, der Salat Milch, das Obst kann Steinobst enthalten.",
  portion: "Bis zu 400 g pro Kind, ausgewogen und nährstoffreich zusammengestellt.",
};

/* ------------------------------------------------------------------ */
/* Leistungen                                                          */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  href: string;
  title: string;
  lead: string;
  text: string;
  facts: string[];
};

export const services: Service[] = [
  {
    slug: "kita",
    href: "/kita-verpflegung",
    title: "Kita und Krippe",
    lead: "Mittagessen für Kindergärten und Krippen",
    text: "Täglich frisch gekocht, kindgerecht gewürzt und mit Portionen, die zu kleinen Mägen passen. Jeden Tag steht ein vegetarisches Gericht zur Wahl, Schweinefleisch kommt in der Kita-Küche nicht vor.",
    facts: ["Täglich ein vegetarisches Gericht", "Ohne Schweinefleisch", "Allergien pro Kind vermerkt"],
  },
  {
    slug: "schule",
    href: "/schulverpflegung",
    title: "Schulen und Horte",
    lead: "Mittagsverpflegung mit Online-Bestellung",
    text: "Eltern oder Kinder wählen im Bestellportal aus dem Wochenplan, bis 8 Uhr am selben Morgen. Abgerechnet wird monatlich als Sammelrechnung, mit dem Bildungs- und Teilhabepaket direkt über das Amt.",
    facts: ["Bestellung bis 8:00 Uhr", "Abrechnung über BuT möglich", "Unterkonten für jedes Kind"],
  },
  {
    slug: "firmen",
    href: "/firmen-catering",
    title: "Firmen und Institutionen",
    lead: "Mittagstisch für Ihr Team",
    text: "Ihre Mitarbeitenden wählen täglich aus dem wechselnden Plan, wir liefern an Ihre Adresse. Für Termine mit Gästen richten wir ein Buffet aus, das zu Anlass und Raum passt.",
    facts: ["Tägliche Auswahl", "Lieferung an Ihre Adresse", "Angebot auf Anfrage"],
  },
  {
    slug: "party",
    href: "/partyservice",
    title: "Partyservice",
    lead: "Fingerfood, orientalische Spezialitäten, internationale Küche",
    text: "Für Feiern, Empfänge und Firmenjubiläen: Fingerfood und Buffets aus der orientalischen und internationalen Küche, mit derselben Sorgfalt bei Allergien wie im Kita-Alltag.",
    facts: ["Fingerfood und Buffets", "Orientalische Spezialitäten", "Halal auf Wunsch"],
  },
];

export const principles: { title: string; text: string }[] = [
  { title: "Ohne Convenience-Food", text: "Soßen, Suppen und Aufläufe entstehen in unserer Küche aus frischen Zutaten, nicht aus Tüten und Fertigkomponenten." },
  { title: "Regional und saisonal", text: "Unser Küchenteam kauft bevorzugt regionale Produkte und kocht mit dem, was gerade Saison hat." },
  { title: "Jedes Kind zählt einzeln", text: "Allergien, Unverträglichkeiten und Wünsche wie „kein Schweinefleisch“ werden pro Kind vermerkt und bei der Ausgabe beachtet." },
];

/* ------------------------------------------------------------------ */
/* Ablauf (aus dem Bestellportal haki-hevi.com)                        */
/* ------------------------------------------------------------------ */

export const steps: { title: string; text: string }[] = [
  {
    title: "Konto anlegen und Einrichtung wählen",
    text: "Die Anmeldung im Bestellportal ist kostenfrei. Sie wählen Ihre Schule, Kita oder Firma und legen für jedes Kind ein eigenes Unterkonto an. Wer Anspruch auf das Bildungs- und Teilhabepaket hat, trägt gleich die BuT-Nummer ein.",
  },
  {
    title: "Gerichte aus dem Wochenplan wählen",
    text: "Jeden Tag gibt es ein Gericht mit Fleisch und ein vegetarisches, dazu Obst oder Rohkost, Dessert und Salat. Allergien und Wünsche hinterlegen Sie einmal im Konto. Bestellen und ändern können Sie bis 24 Stunden vorher, Schulkinder bis 8 Uhr am selben Morgen.",
  },
  {
    title: "Unser Fahrer bringt das Essen",
    text: "Direkt nach dem Kochen fahren wir los, das Essen kommt heiß und pünktlich zum Mittag. Abgerechnet wird einmal im Monat als Sammelrechnung; BuT-Leistungen rechnen wir direkt mit dem Amt ab.",
  },
];

/* ------------------------------------------------------------------ */
/* Einrichtungen aus dem Bestellportal (Karte)                         */
/* ------------------------------------------------------------------ */

export const deliveryPoints: { name: string; place: string; lat: number; lon: number; align?: "left" | "right" }[] = [
  { name: "Friedrich-Dierks-Schule", place: "Isernhagen HB", lat: 52.4758873, lon: 9.8023821, align: "right" },
  { name: "Grundschule Brelingen", place: "Wedemark", lat: 52.5530283, lon: 9.6824534, align: "right" },
];

export const nearbyPlaces: { name: string; lat: number; lon: number }[] = [
  { name: "Langenhagen", lat: 52.443118, lon: 9.738994 },
  { name: "Großburgwedel", lat: 52.4914501, lon: 9.856156 },
  { name: "Altwarmbüchen", lat: 52.4347962, lon: 9.8483711 },
  { name: "Mellendorf", lat: 52.5467746, lon: 9.7340236 },
];

/* ------------------------------------------------------------------ */
/* Häufige Fragen                                                      */
/* ------------------------------------------------------------------ */

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "Was kostet das Mittagessen?",
    a: "Die Anmeldung im Bestellportal ist kostenfrei. Kosten entstehen erst mit der Bestellung und richten sich nach Art und Anzahl der Mahlzeiten. Für Kitas, Schulen und Firmen erstellen wir ein Angebot nach Kinderzahl und Liefertagen — schreiben Sie uns kurz, wie viele Essen Sie täglich brauchen.",
  },
  {
    q: "Bis wann muss bestellt werden?",
    a: "Bestellungen und Änderungen nehmen wir bis 24 Stunden im Voraus an. Für Schulkinder gilt: bis 8:00 Uhr am selben Morgen.",
  },
  {
    q: "Wie gehen Sie mit Allergien um?",
    a: "Unverträglichkeiten werden pro Kind im Konto hinterlegt. Jedes Gericht im Speiseplan ist mit Allergen-Kennziffern versehen, und unsere Köche achten bei der Ausgabe darauf, dass jedes Kind das richtige Essen bekommt. Bei schweren Allergien sprechen wir vor dem Start persönlich mit Ihnen.",
  },
  {
    q: "Kann über das Bildungs- und Teilhabepaket abgerechnet werden?",
    a: "Ja. Tragen Sie bei der Anmeldung Ihre BuT-Nummer mit dem Gültigkeitsdatum ein. Wir rechnen die Zuschüsse direkt mit dem zuständigen Amt ab.",
  },
  {
    q: "Gibt es Essen ohne Schweinefleisch oder halal?",
    a: "Unsere Kita-Küche kocht komplett ohne Schweinefleisch, bei der Kindermittagsverpflegung achten wir auf Halal. Jeden Tag steht außerdem ein vegetarisches Gericht zur Wahl.",
  },
  {
    q: "Liefern Sie auch zu uns?",
    a: "Wir kochen in Isernhagen NB und beliefern Einrichtungen in der Region Hannover, zum Beispiel in Isernhagen und der Wedemark. Ob Ihre Adresse auf einer unserer Touren liegt, klären wir am schnellsten am Telefon oder per Anfrage.",
  },
];

/* ------------------------------------------------------------------ */
/* Unterseiten                                                         */
/* ------------------------------------------------------------------ */

export type ServicePage = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  statement: string;
  intro: string[];
  sections: { title: string; paragraphs: string[]; list?: string[] }[];
  faqs: Faq[];
  related: string[];
};

export const servicePages: Record<string, ServicePage> = {
  kita: {
    slug: "kita",
    path: "/kita-verpflegung",
    metaTitle: "Kita-Catering Isernhagen & Hannover | Haki & Hevi",
    metaDescription: "Täglich frisch gekochtes Mittagessen für Kitas und Krippen aus Isernhagen NB: ohne Convenience, ohne Schweinefleisch, Allergien pro Kind. Jetzt Angebot anfragen.",
    h1: "Kita- und Krippenverpflegung aus Isernhagen",
    statement: "Mittagessen, bei dem die Kita nichts mehr nachrechnen muss.",
    intro: [
      "Wir versorgen Kindergärten, Krippen und Horte in der Region Hannover mit täglich frisch gekochten Speisen. Gekocht wird in unserer Küche in der Dieselstraße in Isernhagen NB, unsere Fahrer bringen das Essen heiß und pünktlich zum Mittag in Ihre Einrichtung.",
      "Für Kita-Leitungen heißt das: ein fester Ansprechpartner, ein Wochenplan mit allen Allergenen und eine Küche, die weiß, welches Kind was nicht essen darf.",
    ],
    sections: [
      {
        title: "Was auf den Teller kommt",
        paragraphs: [
          "Kinder essen, was sie kennen — und probieren, wenn es schmeckt. Deshalb mischt unser Plan Klassiker wie Kartoffelgulasch, Milchreis mit Apfelmus oder Fischstäbchen mit neuen Gerichten wie Bulgur-Ratatouille oder Couscouspfanne mit vegetarischer Soße.",
          "Gewürzt wird kindgerecht, ohne Geschmacksverstärker aus der Tüte. Soßen, Suppen und Aufläufe entstehen in unserer Küche, nicht aus Fertigkomponenten.",
        ],
        list: ["Jeden Tag ein vegetarisches Gericht zur Wahl", "Komplett ohne Schweinefleisch", "Halal bei der Kindermittagsverpflegung", "Obst oder Rohkost, Dessert und Salat dazu"],
      },
      {
        title: "Allergien und besondere Bedürfnisse",
        paragraphs: [
          "Jedes Gericht im Speiseplan trägt die Kennziffern der enthaltenen Allergene, von 2 für Milcheiweiß bis 12 für Hülsenfrüchte. Unverträglichkeiten werden pro Kind vermerkt und bei der Ausgabe berücksichtigt.",
          "Bei schweren Allergien oder ärztlich verordneter Diät sprechen wir vor dem Start mit Ihnen und den Eltern, damit klar ist, was die Küche leisten kann.",
        ],
      },
      {
        title: "So starten Sie mit uns",
        paragraphs: [
          "Sie schreiben oder rufen uns an und nennen Kinderzahl, Liefertage und Besonderheiten. Wir melden uns mit einem Angebot und klären Lieferzeit und Ausgabe. Danach bekommen Sie den Wochenplan und können über das Bestellportal oder mit festen Mengen bestellen.",
        ],
      },
    ],
    faqs: [
      { q: "Wie viele Kinder müssen mindestens mitessen?", a: "Eine feste Untergrenze nennen wir lieber im Gespräch, weil sie von Lieferweg und Liefertagen abhängt. Rufen Sie uns an oder schreiben Sie uns die ungefähre Kinderzahl." },
      { q: "Zu welcher Uhrzeit wird geliefert?", a: "Pünktlich zu Ihrer Mittagszeit. Ihre Wunschzeit stimmen wir beim Start ab; bei Stau kann es selten etwas später werden, dann melden wir uns." },
      { q: "Wie groß sind die Portionen?", a: "Bis zu 400 g pro Kind, ausgewogen und nährstoffreich. Für Krippenkinder stimmen wir die Mengen mit Ihnen ab." },
    ],
    related: ["/allergien", "/speiseplan", "/schulverpflegung"],
  },
  schule: {
    slug: "schule",
    path: "/schulverpflegung",
    metaTitle: "Schulverpflegung Isernhagen & Wedemark | Haki & Hevi",
    metaDescription: "Mittagessen für Grundschulen und Horte mit Online-Bestellung bis 8 Uhr, BuT-Abrechnung und Allergenen pro Kind. Haki & Hevi aus Isernhagen NB.",
    h1: "Schulverpflegung für Grundschulen und Horte",
    statement: "Bis 8 Uhr bestellt, mittags auf dem Tisch.",
    intro: [
      "Für Schulen und Horte haben wir ein eigenes Bestellportal: Eltern melden ihre Kinder kostenfrei an, wählen wöchentlich aus dem Speiseplan und ändern Bestellungen bis 8 Uhr am selben Morgen.",
      "Wir beliefern unter anderem die Friedrich-Dierks-Schule in Isernhagen HB und die Grundschule Brelingen in der Wedemark.",
    ],
    sections: [
      {
        title: "Bestellen im Portal",
        paragraphs: [
          "Nach der Anmeldung legen Eltern für jedes Kind ein Unterkonto an. Ältere Kinder können sich mit eigenem Passwort anmelden und selbst wählen — zwischen einem Gericht mit Fleisch und einem vegetarischen, dazu verschiedene Desserts.",
          "Allergien und Wünsche werden einmal im Konto hinterlegt und gelten für jede Bestellung.",
        ],
        list: ["Kostenfreie Anmeldung", "Unterkonten mit eigenem Passwort", "Ändern bis 8:00 Uhr am selben Tag", "Zugang auch für Lehrkräfte"],
      },
      {
        title: "Abrechnung ohne Papierkram",
        paragraphs: [
          "Abgerechnet wird einmal im Monat als Sammelrechnung, so behalten Eltern den Überblick. Wer Anspruch auf das Bildungs- und Teilhabepaket hat, trägt die BuT-Nummer mit Gültigkeitsdatum ein — wir rechnen direkt mit dem zuständigen Amt ab.",
        ],
      },
      {
        title: "Für Schulleitungen und Träger",
        paragraphs: [
          "Sie möchten die Mittagsverpflegung neu vergeben oder ergänzen? Wir stellen Ihre Schule im Portal ein, stimmen Lieferzeit und Ausgabe ab und geben Eltern eine kurze Anleitung zur Anmeldung an die Hand.",
        ],
      },
    ],
    faqs: [
      { q: "Was passiert, wenn mein Kind krank ist?", a: "Bestellungen lassen sich bis 8:00 Uhr am selben Morgen im Portal ändern oder stornieren." },
      { q: "Können Lehrkräfte mitessen?", a: "Ja, bei der Anmeldung gibt es eine eigene Auswahl für Lehrkräfte." },
      { q: "Wie funktioniert die BuT-Abrechnung?", a: "Sie tragen BuT-Nummer und Gültigkeitsdatum im Konto ein. Den Rest rechnen wir direkt mit dem Amt ab." },
    ],
    related: ["/speiseplan", "/allergien", "/kita-verpflegung"],
  },
  firmen: {
    slug: "firmen",
    path: "/firmen-catering",
    metaTitle: "Firmen-Catering & Mittagstisch Hannover | Haki & Hevi",
    metaDescription: "Mittagstisch für Firmen und Institutionen in der Region Hannover: tägliche Auswahl, Lieferung an Ihre Adresse, Buffets für Gäste. Angebot anfordern.",
    h1: "Firmen-Catering und Mittagstisch in der Region Hannover",
    statement: "Ein warmes Mittagessen, ohne dass jemand die Kantine betreiben muss.",
    intro: [
      "Bieten Sie Ihren Mitarbeitenden ein gesundes, warmes Mittagessen, aus dem sie täglich selbst wählen. Sobald Ihre Firma bei uns registriert ist, bestellt jeder für sich im Portal, und wir liefern gesammelt an Ihre Adresse.",
    ],
    sections: [
      {
        title: "Täglicher Mittagstisch",
        paragraphs: [
          "Der Wochenplan wechselt, jeden Tag gibt es ein Gericht mit Fleisch und ein vegetarisches. Ihr Team bestellt bis zum Vortag, Allergien und Vorlieben sind im Konto hinterlegt.",
        ],
        list: ["Tägliche Auswahl aus dem Wochenplan", "Lieferung an Ihre Firmenadresse", "Monatliche Sammelrechnung"],
      },
      {
        title: "Ambiente- und Service-Catering für Gäste",
        paragraphs: [
          "Für Kundentermine, Schulungen oder das Sommerfest richten wir Buffets und Fingerfood aus — von orientalischen Spezialitäten bis zur internationalen Küche. Auf Wunsch mit Geschirr, Aufbau und Service vor Ort.",
        ],
      },
    ],
    faqs: [
      { q: "Ab wie vielen Essen lohnt sich der Mittagstisch?", a: "Das hängt von Lage und Liefertagen ab. Schreiben Sie uns, wie viele Mitarbeitende ungefähr mitessen würden, dann rechnen wir es durch." },
      { q: "Fallen Liefergebühren an?", a: "Für registrierte Firmen ist die Lieferung im Liefergebiet kostenfrei. Außerhalb nennen wir Ihnen die Gebühr vorab." },
    ],
    related: ["/partyservice", "/speiseplan", "/kontakt"],
  },
  party: {
    slug: "party",
    path: "/partyservice",
    metaTitle: "Partyservice Isernhagen – orientalisch & international | Haki & Hevi",
    metaDescription: "Fingerfood, Buffets und orientalische Spezialitäten für Feiern und Firmenfeste in Isernhagen und Hannover. Frisch zubereitet, halal auf Wunsch.",
    h1: "Partyservice mit orientalischer und internationaler Küche",
    statement: "Für Feste, an die sich Ihre Gäste beim Essen erinnern.",
    intro: [
      "Neben der Kinderverpflegung kochen wir für Feiern, Empfänge und Firmenfeste in Isernhagen, Hannover und Umgebung. Unsere Stärke ist die orientalische Küche — Mezze, gefüllte Teigtaschen, Fladenbrot, würzige Hauptgerichte — kombiniert mit internationalen Klassikern.",
    ],
    sections: [
      {
        title: "Was wir anbieten",
        paragraphs: [
          "Wir stellen Ihr Buffet nach Anlass, Gästezahl und Budget zusammen. Fingerfood für Stehempfänge, warme Buffets für Feiern oder ein gemischtes Menü — immer aus frischen Zutaten und mit Liebe zum Detail angerichtet.",
        ],
        list: ["Fingerfood für Empfänge und Events", "Orientalische Spezialitäten", "Internationale Küche", "Halal und vegetarisch auf Wunsch"],
      },
      {
        title: "Allergien auch am Buffet im Blick",
        paragraphs: [
          "Was wir jeden Tag für Kitas leisten, gilt auch für Ihr Fest: Zu jedem Gericht nennen wir die Allergene. Gäste mit Unverträglichkeiten finden ihr Essen, ohne nachfragen zu müssen.",
        ],
      },
      {
        title: "Ablauf",
        paragraphs: [
          "Sie nennen uns Datum, Ort, Gästezahl und Wünsche. Wir schicken einen Vorschlag mit Preis, stimmen Details ab und liefern zum vereinbarten Zeitpunkt — auf Wunsch mit Aufbau und Service.",
        ],
      },
    ],
    faqs: [
      { q: "Wie früh sollten wir anfragen?", a: "Je früher, desto sicherer der Termin. Für größere Feiern empfehlen wir zwei bis drei Wochen Vorlauf; kurzfristige Anfragen prüfen wir gern." },
      { q: "Gibt es feste Buffet-Pakete mit Preisen?", a: "Wir stellen jedes Buffet individuell zusammen und nennen Ihnen den Preis im Angebot." },
    ],
    related: ["/firmen-catering", "/allergien", "/kontakt"],
  },
};

export const allergyPage = {
  metaTitle: "Allergiker-Essen für Kita & Schule | Haki & Hevi",
  metaDescription: "Wie Haki & Hevi Allergien, Unverträglichkeiten, Halal und vegetarische Ernährung in der Kita- und Schulverpflegung berücksichtigt. Mit Allergen-Schlüssel.",
  h1: "Allergien, Unverträglichkeiten und besondere Ernährung",
  statement: "Ein Kind mit Milchallergie isst bei uns nicht einfach die Beilage.",
};

/* Bilddatenbank-Fotos der alten Website werden bewusst nicht verwendet. */
