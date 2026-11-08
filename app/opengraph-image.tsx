import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Hier kochen wir für Ihre Kita.", line: "Haki & Hevi · Kita-, Schul- und Firmen-Catering aus Isernhagen NB" });
}
