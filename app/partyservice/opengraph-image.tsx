import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Partyservice mit orientalischer Küche", line: "Fingerfood und Buffets · Haki & Hevi, Isernhagen NB" });
}
