"use client";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { CollectionShowcaseSection } from "@/components/pages/CollectionShowcaseSection";
import type { CollectionFeature } from "@/content/collections/showcase-types";

export function CollectionCampaignView({
  features,
}: {
  features: CollectionFeature[];
}) {
  return (
    <PublicPageShell>
      <div className="detail-showcase">
        {features.map((feature, index) => (
          <CollectionShowcaseSection
            key={feature.id}
            feature={feature}
            index={index}
          />
        ))}
      </div>
    </PublicPageShell>
  );
}
