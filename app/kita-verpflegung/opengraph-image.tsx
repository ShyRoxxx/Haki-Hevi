import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Mittagessen für Kita und Krippe", line: "Täglich frisch gekocht in Isernhagen NB · Haki & Hevi" });
}
