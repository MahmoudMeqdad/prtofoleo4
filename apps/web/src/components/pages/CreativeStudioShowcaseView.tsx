"use client";

import { CollectionCampaignView } from "@/components/pages/CollectionCampaignView";
import { getCreativeStudioShowcase } from "@/content/collections/creative-studio-showcase";
import type { Locale } from "@/i18n/config";
import { useDictionary } from "@/providers/LocaleProvider";

export function CreativeStudioShowcaseView({ locale }: { locale: Locale }) {
  const dictionary = useDictionary();
  const features = getCreativeStudioShowcase(locale, dictionary);

  return <CollectionCampaignView features={features} />;
}
