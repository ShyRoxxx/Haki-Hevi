import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

// Vorschau: komplett gesperrt. Vor dem Livegang auf "allow: /" umstellen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
