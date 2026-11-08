"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { telHref } from "@/lib/content";

/** Daumenleiste auf dem Handy: erscheint, sobald der erste Bildschirm verlassen ist. */
export function MobileCallBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/kontakt") return null;

  return (
    <div
      data-callbar
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-paper/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-[2px] transition-[translate,opacity] duration-300 ease-[var(--ease-out)] lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a href={telHref} className="btn btn-ghost flex-1 bg-card">
          <Phone size={18} strokeWidth={1.75} aria-hidden /> Anrufen
        </a>
        <Link href="/kontakt" className="btn btn-primary flex-[1.4]">
          Angebot anfragen
        </Link>
      </div>
    </div>
  );
}
