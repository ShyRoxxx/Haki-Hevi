import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Bis 8 Uhr bestellt, mittags auf dem Tisch.", line: "Schulverpflegung · Haki & Hevi, Isernhagen NB" });
}
