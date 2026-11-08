import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/logo.png";

export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center rounded-md ${className}`} aria-label="Haki & Hevi – zur Startseite">
      <Image
        src={logo}
        alt="Haki & Hevi Ambiente & Service-Catering"
        className="h-full w-auto"
        sizes="200px"
        preload={priority}
      />
    </Link>
  );
}
