"use client";

import { CollectionCampaignView } from "@/components/pages/CollectionCampaignView";
import { getOutdoorFunShowcase } from "@/content/collections/outdoor-fun-showcase";
import type { Locale } from "@/i18n/config";
import { useDictionary } from "@/providers/LocaleProvider";

export function OutdoorFunShowcaseView({ locale }: { locale: Locale }) {
  const dictionary = useDictionary();
  const features = getOutdoorFunShowcase(locale, dictionary);

  return <CollectionCampaignView features={features} />;
}
