"use client";

import { useId, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { business } from "@/lib/content";

type Kind = "Kita oder Krippe" | "Schule oder Hort" | "Firma" | "Partyservice" | "Sonstiges";
const kinds: Kind[] = ["Kita oder Krippe", "Schule oder Hort", "Firma", "Partyservice", "Sonstiges"];

type Errors = Partial<Record<"name" | "contact" | "message", string>>;

export function ContactForm() {
  const id = useId();
  const [kind, setKind] = useState<Kind>("Kita oder Krippe");
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  const isGroup = kind !== "Partyservice" && kind !== "Sonstiges";
  const countLabel = kind === "Firma" ? "Essen pro Tag (ungefähr)" : kind === "Partyservice" ? "Anzahl Gäste" : "Anzahl Kinder (ungefähr)";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = "Bitte nennen Sie uns Ihren Namen, damit wir Sie ansprechen können.";
    const email = v("email");
    const phone = v("phone");
    if (!email && !phone) next.contact = "Bitte geben Sie eine E-Mail-Adresse oder eine Telefonnummer an, unter der wir antworten können.";
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.contact = "Die E-Mail-Adresse scheint unvollständig zu sein, zum Beispiel fehlt das @ oder die Endung.";
    if (!v("message") && !v("count")) next.message = "Schreiben Sie uns kurz, worum es geht, oder nennen Sie die ungefähre Anzahl.";
    setErrors(next);
    if (Object.keys(next).length) {
      const firstName = next.message ? "message" : next.name ? "name" : email || !phone ? "email" : "phone";
      const first = e.currentTarget.elements.namedItem(firstName);
      if (first instanceof HTMLElement) first.focus();
      return;
    }

    const opt = (key: string, label: string) => (v(key) ? `${label}: ${v(key)}` : null);
    const lines = [
      `Art der Anfrage: ${kind}`,
      opt("org", "Einrichtung / Firma"),
      opt("count", countLabel),
      opt("days", "Liefertage / Datum"),
      opt("allergies", "Allergien / Besonderheiten"),
      "",
      v("message") || null,
      v("message") ? "" : null,
      `Name: ${v("name")}`,
      email ? `E-Mail: ${email}` : null,
      phone ? `Telefon: ${phone}` : null,
    ].filter((l): l is string => l !== null);

    const subject = `Anfrage ${kind}${v("org") ? ` – ${v("org")}` : ""}`;
    const href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setOpened(true);
  }

  const field =
    "mt-2 block w-full min-h-12 rounded-[10px] border-[1.5px] border-[var(--line-strong)] bg-card px-4 py-3 text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] duration-200 hover:border-ink-3 focus:border-leaf-deep focus:outline-none focus:ring-4 focus:ring-[rgb(233_185_73/0.45)] aria-[invalid=true]:border-[#b4361f]";
  const label = "block font-semibold";
  const err = "mt-2 text-[0.95rem] font-semibold text-[#9a2d18]";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-describedby={`${id}-note`}>
      <fieldset>
        <legend className={label}>Worum geht es?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {kinds.map((k) => (
            <label key={k} className="cursor-pointer">
              <input type="radio" name="kind" value={k} checked={kind === k} onChange={() => setKind(k)} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full border-[1.5px] border-[var(--line-strong)] bg-card px-4 text-[0.97rem] font-semibold transition-[background-color,border-color,color] duration-200 hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {k}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-org`} className={label}>
            {kind === "Firma" ? "Firma" : isGroup ? "Name der Einrichtung" : "Anlass"} <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <input id={`${id}-org`} name="org" autoComplete="organization" className={field} placeholder={isGroup ? "z. B. Kita Sonnenblume, Isernhagen …" : "z. B. Hochzeit, Firmenjubiläum …"} />
        </div>
        <div>
          <label htmlFor={`${id}-count`} className={label}>
            {countLabel}
          </label>
          <input id={`${id}-count`} name="count" inputMode="numeric" className={field} placeholder="z. B. 45 …" autoComplete="off" />
        </div>
        <div>
          <label htmlFor={`${id}-days`} className={label}>
            {kind === "Partyservice" ? "Datum" : "Liefertage"} <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <input id={`${id}-days`} name="days" className={field} placeholder={kind === "Partyservice" ? "z. B. 14. März 2027 …" : "z. B. Montag bis Freitag …"} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-allergies`} className={label}>
            Allergien oder Besonderheiten <span className="font-normal text-ink-3">(optional)</span>
          </label>
          <input id={`${id}-allergies`} name="allergies" className={field} placeholder="z. B. 3 Kinder ohne Milcheiweiß, 1 Kind glutenfrei …" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={label}>
            Ihre Nachricht
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            className={`${field} resize-y`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${id}-message-err` : undefined}
          />
          {errors.message && (
            <p id={`${id}-message-err`} role="alert" className={err}>
              {errors.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className={label}>
            Ihr Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
          />
          {errors.name && (
            <p id={`${id}-name-err`} role="alert" className={err}>
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            E-Mail
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            className={field}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? `${id}-contact-err` : undefined}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Telefon für Rückruf
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? `${id}-contact-err` : undefined}
          />
        </div>
        {errors.contact && (
          <p id={`${id}-contact-err`} role="alert" className={`${err} sm:col-span-2 !mt-0`}>
            {errors.contact}
          </p>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          <Mail size={18} strokeWidth={1.75} aria-hidden /> Anfrage im E-Mail-Programm öffnen
          <ArrowRight size={18} strokeWidth={1.75} className="btn-arrow" aria-hidden />
        </button>
        <p id={`${id}-note`} className="max-w-[60ch] text-[0.95rem] text-ink-3">
          Beim Absenden öffnet sich Ihr E-Mail-Programm mit einer fertigen Nachricht an {business.email}. Erst wenn Sie dort auf „Senden“ tippen, geht die Anfrage an uns.
        </p>
        <div role="status" aria-live="polite">
          {opened && (
            <p className="rounded-[12px] bg-leaf-pale px-4 py-3 text-ink">
              Ihr E-Mail-Programm sollte sich geöffnet haben. Falls nicht, schreiben Sie direkt an{" "}
              <a className="link font-semibold" href={`mailto:${business.email}`}>
                {business.email}
              </a>{" "}
              oder rufen Sie uns an.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
