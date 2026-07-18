import type { CollectionContent, CollectionStorySection } from "./types";
import { creativeStudio } from "./creative-studio";

export const CREATIVE_STUDIO_DETAIL_SLUGS = [
  "make-something-new",
  "color-first",
  "share-the-process",
] as const;

export type CreativeStudioDetailSlug = (typeof CREATIVE_STUDIO_DETAIL_SLUGS)[number];

const creativeStudioOverview: CollectionStorySection = {
  id: "creative-studio-overview",
  layout: "editorial",
  title: creativeStudio.name,
  description: creativeStudio.introduction,
  media: {
    desktop: creativeStudio.hero.desktop,
    mobile: creativeStudio.hero.mobile,
    type: creativeStudio.hero.type,
    poster: creativeStudio.hero.poster,
    alt: creativeStudio.name,
  },
};

function withSelectedFirst(selected: CollectionStorySection): CollectionStorySection[] {
  return [
    selected,
    ...creativeStudio.sections.filter((item) => item.id !== selected.id),
    creativeStudioOverview,
  ];
}

export function getCreativeStudioDetail(slug: string): CollectionContent | undefined {
  const index = CREATIVE_STUDIO_DETAIL_SLUGS.indexOf(slug as CreativeStudioDetailSlug);
  if (index < 0) return undefined;

  const selected = creativeStudio.sections[index];

  return {
    ...creativeStudio,
    id: `creative-studio-${slug}`,
    slug,
    name: selected.title,
    shortDescription: selected.description,
    introduction: selected.description,
    hero: {
      desktop: selected.media.desktop,
      mobile: selected.media.mobile,
      type: selected.media.type,
      poster: selected.media.poster,
      focalPoint: "center center",
      overlayStrength: 0.35,
      textColor: "light",
    },
    sections: withSelectedFirst(selected),
    metaDescription: selected.description,
  };
}
