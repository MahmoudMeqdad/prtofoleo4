"use client";

import { CollectionCampaignView } from "@/components/pages/CollectionCampaignView";
import { getTinyWorldsShowcase } from "@/content/collections/tiny-worlds-showcase";
import type { Locale } from "@/i18n/config";
import { useDictionary } from "@/providers/LocaleProvider";

export function TinyWorldsShowcaseView({ locale }: { locale: Locale }) {
  const dictionary = useDictionary();
  const features = getTinyWorldsShowcase(locale, dictionary);

  return <CollectionCampaignView features={features} />;
}
