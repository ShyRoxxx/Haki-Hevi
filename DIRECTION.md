# DIRECTION — Haki & Hevi Ambiente & Service-Catering

## unslop-Richtung (fünf Zeilen)
- **Betrieb:** Eine Küche in einem Gewerbegebiet in Isernhagen NB, die jeden Vormittag Mittagessen für Kitas, Krippen, Schulen und Horte in der Region Hannover kocht und ausfährt, dazu Partyservice mit orientalischer und internationaler Küche.
- **Charakter:** gewissenhaft, herzlich, pünktlich.
- **Welt:** Großküche um 9 Uhr morgens, Thermoboxen im Lieferwagen, der Wochenspeiseplan mit Allergen-Kennziffern am Kita-Brett; Gewürze aus der orientalischen Küche (Kurkuma) neben norddeutschem Kartoffelgulasch.
- **Momente:** (1) Hero: die echte OpenStreetMap-Karte rund um Isernhagen in Logo-Grün, die Küche als Ausgangspunkt, die belieferten Einrichtungen als Punkte. (2) Der echte Speiseplan der Woche mit Allergenfilter: Eltern und Kitas tippen eine Unverträglichkeit an und sehen sofort, welche Gerichte betroffen sind.
- **Signatur:** Allergen-Kennziffern als kleine runde Marken (wie auf dem Speiseplan des Betriebs: 2 = Milcheiweiß, 4.1 = Weizen, 8 = Sellerie …). Sie tauchen nur dort auf, wo es um Zutaten geht: Speiseplan, Allergie-Seite, Leistungen.

## Drei Stichworte aus der Recherche
1. **Täglich unterwegs** — gekocht wird in Isernhagen NB, Fahrer bringen das Essen „pünktlich zum Mittagessen“ in die Einrichtungen (Bestellportal haki-hevi.com). Bestellschluss für Schüler 8:00 Uhr.
2. **Allergen-genau** — Speisepläne mit Kennziffern, Allergene je Gericht und Beilage, Präferenzen pro Kind im Bestellkonto, halal, ohne Schweinefleisch, täglich ein vegetarisches Gericht.
3. **Zwei Küchen in einer** — Kinderküche ohne Convenience-Food (Kartoffelgulasch, Fischstäbchen mit Bulgur, Chili sin Carne) und Partyservice mit orientalischen Spezialitäten und Fingerfood. Inhabergeführt (Geschäftsführerin Akide Ediz).

## Material (was es wirklich gibt)
- Logo (PNG, 629×202, Grün #57882F, Schriftzug in Schreibmaschinen-Mono). Wird unverändert verwendet.
- Echter Wochenspeiseplan KW 46/2026 aus haki-hevi.com/weekly-menu (Hauptgericht + vegetarisch, Beilagen, Allergene, Portion bis 400 g).
- Älterer Speiseplan (KW 41–44/2020) mit Allergen-Schlüssel.
- Belieferte Einrichtungen aus dem Bestellportal: Friedrich-Dierks-Schule (Isernhagen HB), Grundschule Brelingen (Wedemark), Vorschule Koglin.
- Google: 4,6 ★ aus 25 Bewertungen; Profil ohne Fotos, Bewertungstexte ohne Login nicht einsehbar.
- **Fotos:** Die Bilder der alten Website sind erkennbar Bilddatenbank-Fotos (fremde Kinder, Pixabay-Lebensmittel mit Farbkarte). Sie werden nicht verwendet. Die Demo folgt deshalb dem Weg „Wenig eigene Fotos“: Karte, Logo-Farbe als Fläche, große Typografie, Speiseplan als Grafik. Motivliste für ein Shooting steht in der CRM-Notiz.

## Drei mögliche Richtungen
- **A · Speiseplan-Blatt.** Hell, papierweiß mit grünem Raster wie ein ausgedruckter Wochenplan; Schrift in Schreibmaschinen-Mono (aus dem Logo) für Gerichte und Kennziffern, Grotesk für Text. Layout als Tabelle/Raster. Ehrlich und eigen, aber auf Dauer trocken und schwer zu lesen auf dem Handy.
- **B · Logo-Grün als Fläche, Karte als Bühne.** Das Logo-Grün trägt große Flächen (Hero-Karte, ein Band in der Mitte, Schlussaufruf), dazwischen ein leicht grünstichiges Weiß; eine warme, leicht eigenwillige Grotesk als Display; Kurkuma-Gelb als einziger Akzent für Allergen-Marken und Fokus. Die Seite erzählt Ort → Speiseplan → Ablauf → Kontakt.
- **C · Orientalische Gastgeberküche.** Dunkel, Gewürztöne, Ornamentik, Fokus auf Partyservice. Passt zum Namen, aber nicht zur Kernkundschaft (Kita-Leitungen, Träger, Eltern), die Verlässlichkeit sucht.

**Gewählt: B.** Die Kundschaft (Kita-Leitungen, Schulträger, Eltern) entscheidet nach Verlässlichkeit, Allergien und Logistik — nicht nach Stimmung. Grün kommt direkt aus dem Logo, die Karte zeigt, wo gekocht wird und wohin geliefert wird, und der echte Speiseplan beweist die Allergen-Sorgfalt. Aus A übernehmen wir die Kennziffern als Signatur.

## System
- **Farben:** Grundtöne Tannengrün-Tinte `#1E2A17` (Text, dunkle Flächen) und Blattweiß `#F5F7EF` (Seite); Markengrün `#57882F` (Logo) als große Fläche, dunkler `#3F6A1F` für Text auf Hell; einziger Akzent Kurkuma `#E9B949` (Allergen-Marken, Fokus, Markierung) — nie als Text auf Hell.
- **Schrift:** Display **Bricolage Grotesque** (600): warme Grotesk mit leichten Tintenfallen und runden Formen — wirkt handgemacht und freundlich, ohne kindlich zu sein, und bleibt bei 390 px gut lesbar (keine Haarlinien). Text **Figtree** (400/600): ruhig, offene Formen, gute Ziffern für Uhrzeiten und Kennziffern. Drei Schnitte insgesamt.
- **Raster:** Abstände 4/8-Skala; Abschnittsabstand `clamp(4.5rem, 3rem + 6vw, 8rem)`, Seitenrand `clamp(1.25rem, 0.75rem + 2.5vw, 3rem)`, Inhaltsbreite 88rem.
- **Radien:** Bedienelemente 10 px, Flächen 20 px, Karte im Hero 28 px; keine Pillen außer den runden Kennziffern.
- **Hero-Grundform:** Ort zuerst (vom CRM zugeteilt) — OSM-Karte, getönt im Logo-Grün, Küche markiert, belieferte Einrichtungen als Punkte; Aussage verankert an der Küche. Auf dem Handy steht die Karte oben als Band, die Aussage überlappt ihre Unterkante.
- **Bewegung:** Machart „Ruhig“ (vom CRM zugeteilt) — gestaffelte Einblendungen (Überschriften zeilenweise, Listen von unten), der Küchen-Marker setzt sich beim Laden einmal, dazu sorgfältige Hover-, Fokus- und Aktivzustände. Höhepunkt ist inhaltlich: der Speiseplan-Filter. Kein Pinning, kein Parallax, kein Smooth-Scroll-Plugin.

## Suchbegriff-Plan
| Begriff | Seite |
|---|---|
| Catering Isernhagen / Catering Isernhagen NB | `/` |
| Kita Catering Hannover / Mittagessen Kindergarten Isernhagen | `/kita-verpflegung` |
| Schulverpflegung Isernhagen / Mittagessen Grundschule Wedemark | `/schulverpflegung` |
| Partyservice Isernhagen / orientalisches Catering Hannover | `/partyservice` |
| Allergiker Essen Kita / halal Kita Essen Hannover | `/allergien` |
| Speiseplan Kita Catering / Mittagessen bestellen Schule (BuT) | `/speiseplan` |
| Haki & Hevi Akide Ediz | `/ueber-uns` |
| Catering Anfrage Isernhagen | `/kontakt` |
| Kita Essen Kosten / Bildungs- und Teilhabepaket Mittagessen | `/fragen` |

---
Feedback-Runden werden oben als „Update n“ ergänzt.
