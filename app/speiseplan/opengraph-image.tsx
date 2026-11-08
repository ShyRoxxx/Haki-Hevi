import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Speiseplan der Woche", line: "Mit Allergen-Kennziffern · Haki & Hevi, Isernhagen NB" });
}
