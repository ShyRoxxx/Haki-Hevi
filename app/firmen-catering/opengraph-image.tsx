import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Mittagstisch für Ihr Team", line: "Firmen-Catering · Haki & Hevi, Isernhagen NB" });
}
