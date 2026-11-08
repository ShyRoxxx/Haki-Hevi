import type { Metadata } from "next";
import { ServicePageView } from "@/components/ServicePageView";
import { WeekStrip } from "@/components/WeekStrip";
import { servicePages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const page = servicePages.schule;

export const metadata: Metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

export default function Page() {
  return (
    <ServicePageView page={page} crumb="Schulen & Horte">
      <WeekStrip />
    </ServicePageView>
  );
}
