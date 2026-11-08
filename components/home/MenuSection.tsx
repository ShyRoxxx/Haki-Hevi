import Link from "next/link";
import { MenuFinder } from "../MenuFinder";
import { weekMenu } from "@/lib/content";

export function MenuSection() {
  return (
    <section id="speiseplan" className="leaf-field grain on-leaf section" aria-labelledby="speiseplan-title">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:pt-4">
          <h2 id="speiseplan-title" className="h2 text-on-leaf" data-reveal="up">
            Was diese Woche in der Küche steht
          </h2>
          <p className="mt-6 max-w-[40ch] text-[length:var(--step-1)] leading-normal text-on-leaf-2" data-reveal="up">
            Der echte Plan aus unserem Bestellportal, mit den Allergen-Kennziffern, die auch am Kita-Brett hängen. Tippen Sie an, was Ihr Kind nicht verträgt.
          </p>
          <dl className="mt-10 space-y-5 text-on-leaf-2" data-reveal="up">
            <div>
              <dt className="font-semibold text-on-leaf">Jeden Tag zwei Gerichte</dt>
              <dd>eines mit Fleisch, eines vegetarisch, dazu Obst oder Rohkost, Dessert und Salat</dd>
            </div>
            <div>
              <dt className="font-semibold text-on-leaf">Portion</dt>
              <dd>{weekMenu.portion}</dd>
            </div>
          </dl>
          <Link href="/speiseplan" className="btn btn-turmeric mt-10" data-reveal="up">
            Speiseplan mit Allergen-Schlüssel
          </Link>
        </div>
        <div data-reveal="up" data-delay="0.1">
          <MenuFinder />
        </div>
      </div>
    </section>
  );
}
