import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Angebot anfragen", line: "Haki & Hevi · Dieselstraße 13 A, Isernhagen NB · 0511 779 513 77" });
}
