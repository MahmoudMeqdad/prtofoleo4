export type LocalizedString = {
  en: string;
  ar: string;
};

export interface CollectionStorySection {
  id: string;
  layout:
    | "media-left"
    | "media-right"
    | "full-media"
    | "centered"
    | "editorial";
  title: LocalizedString;
  description: LocalizedString;
  media: {
    desktop: string;
    mobile?: string;
    type: "image" | "video";
    poster?: string;
    alt: LocalizedString;
  };
}

export interface CollectionContent {
  id: string;
  slug: string;
  name: LocalizedString;
  eyebrow?: LocalizedString;
  shortDescription: LocalizedString;
  introduction: LocalizedString;
  hero: {
    desktop: string;
    mobile?: string;
    type: "image" | "video";
    poster?: string;
    focalPoint?: string;
    overlayStrength?: number;
    textColor: "light" | "dark";
  };
  theme: {
    background: string;
    foreground: string;
    accent: string;
  };
  sections: CollectionStorySection[];
  relatedCollectionSlugs: string[];
  metaDescription: LocalizedString;
}

export type CollectionSlug =
  | "tiny-worlds"
  | "creative-studio"
  | "outdoor-fun"
  | "plush-friends"
  | "action-zone"
  | "learning-lab";
