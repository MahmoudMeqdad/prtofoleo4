"use client";

import { HomepageHeader } from "./HomepageHeader";
import { VideoHero } from "./VideoHero";
import { EditorialIntro } from "./EditorialIntro";
import { CollectionShowcase } from "./CollectionShowcase";
import { VisualFooter } from "@/components/layout/VisualFooter";
import { HOMEPAGE_COLLECTIONS } from "@/config/homepage";
import { useHeaderMode } from "@/hooks/useHeaderMode";

export function HomepageShell() {
  const headerMode = useHeaderMode();

  return (
    <div className="min-h-screen overflow-x-hidden">
      <HomepageHeader mode={headerMode} />

      <main>
        <VideoHero />
        <EditorialIntro />
        {HOMEPAGE_COLLECTIONS.map((collection, index) => (
          <CollectionShowcase
            key={collection.id}
            collection={collection}
            index={index}
          />
        ))}
        <VisualFooter />
      </main>
    </div>
  );
}
