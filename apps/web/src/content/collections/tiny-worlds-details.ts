import type { CollectionContent, CollectionStorySection } from "./types";
import { tinyWorlds } from "./tiny-worlds";

export const TINY_WORLDS_DETAIL_SLUGS = [
  "tiny-worlds",
  "play-at-a-smaller-scale",
  "stories-without-a-script",
  "details-that-reward-attention",
] as const;

export type TinyWorldsDetailSlug = (typeof TINY_WORLDS_DETAIL_SLUGS)[number];

function withSelectedFirst(selected?: CollectionStorySection): CollectionStorySection[] {
  if (!selected) return tinyWorlds.sections;
  return [selected, ...tinyWorlds.sections.filter((item) => item.id !== selected.id)];
}

export function getTinyWorldsDetail(slug: string): CollectionContent | undefined {
  const index = TINY_WORLDS_DETAIL_SLUGS.indexOf(slug as TinyWorldsDetailSlug);
  if (index < 0) return undefined;

  const selected = index === 0 ? undefined : tinyWorlds.sections[index - 1];
  const name = selected?.title ?? tinyWorlds.name;
  const description = selected?.description ?? tinyWorlds.introduction;
  const media = selected?.media;

  return {
    ...tinyWorlds,
    id: `tiny-worlds-${slug}`,
    slug,
    name,
    shortDescription: description,
    introduction: description,
    hero: media
      ? {
          desktop: media.desktop,
          mobile: media.mobile,
          type: media.type,
          poster: media.poster,
          focalPoint: "center center",
          overlayStrength: 0.45,
          textColor: "light",
        }
      : tinyWorlds.hero,
    sections: withSelectedFirst(selected),
    metaDescription: description,
  };
}
