"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { OfficeStatus } from "./OfficeStatus";
import { business, mainNav, telHref } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Menü bei Seitenwechsel schließen
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 h-[var(--header-h)] bg-paper transition-[box-shadow] duration-300 ${
        scrolled ? "shadow-[0_1px_0_var(--line)]" : ""
      }`}
    >
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Logo className="h-10 sm:h-12" priority />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-[10px] px-3 text-[0.97rem] font-semibold transition-colors duration-200 hover:bg-paper-2 ${
                      active ? "text-leaf-deep" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {active && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-leaf" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={telHref} className="group flex flex-col items-end leading-tight">
            <span className="tnum text-[1.02rem] font-semibold text-ink transition-colors group-hover:text-leaf-deep">
              {business.phoneDisplay}
            </span>
            <OfficeStatus className="text-sm text-ink-3" />
          </a>
          <Link href="/kontakt" className="btn btn-primary min-h-11">
            Angebot anfragen
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref}
            className="grid size-11 place-items-center rounded-[10px] border-[1.5px] border-[var(--line-strong)] text-ink"
            aria-label={`Anrufen: ${business.phoneDisplay}`}
          >
            <Phone size={18} strokeWidth={1.75} />
          </a>
          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[60] grid size-11 place-items-center rounded-[10px] bg-ink text-paper"
          >
            <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {/* Vollbild-Menü auf dem Handy */}
      <div
        id="mobile-menu"
        className={`leaf-field grain fixed inset-0 z-[55] flex flex-col px-[var(--gutter)] pb-8 pt-[calc(var(--header-h)+1.5rem)] transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile Navigation" className="flex-1">
          <ul className="flex flex-col">
            {[{ href: "/", label: "Start" }, ...mainNav, { href: "/kontakt", label: "Kontakt" }].map((item, i) => (
              <li
                key={item.href}
                className="border-b border-white/15 transition-[opacity,transform] duration-500 ease-[var(--ease-out)]"
                style={{
                  transitionDelay: open ? `${80 + i * 55}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(18px)",
                }}
              >
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-14 items-center justify-between py-3 font-display text-[1.75rem] font-semibold tracking-[-0.01em] text-on-leaf"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowRight size={20} strokeWidth={1.75} className="text-on-leaf-2" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 space-y-3 text-on-leaf-2">
          <a href={telHref} className="btn btn-turmeric w-full">
            <Phone size={18} strokeWidth={1.75} aria-hidden /> {business.phoneDisplay} anrufen
          </a>
          <OfficeStatus tone="leaf" className="justify-center text-sm w-full" />
        </div>
      </div>
    </header>
  );
}
