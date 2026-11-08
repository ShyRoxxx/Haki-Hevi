import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

const paths = ["/", "/kita-verpflegung", "/schulverpflegung", "/firmen-catering", "/partyservice", "/allergien", "/speiseplan", "/ueber-uns", "/fragen", "/kontakt", "/impressum", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: p === "/speiseplan" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.startsWith("/impressum") || p.startsWith("/datenschutz") ? 0.2 : 0.8,
  }));
}
