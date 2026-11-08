import { renderOg, ogSize } from "@/lib/og/render";

export const alt = "Haki & Hevi · Isernhagen NB";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ statement: "Eine Küche aus Isernhagen", line: "Über Haki & Hevi Ambiente & Service-Catering" });
}
