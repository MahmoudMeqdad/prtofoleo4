export type ContentAlignment = "bottom-left" | "bottom-right" | "center-left" | "center-right";

export type ShowcaseTheme = "light" | "dark";

export interface CollectionFeature {
  id: string;
  title: string;
  description?: string;
  eyebrow?: string;
  image: string;
  mobileImage?: string;
  imageAlt: string;
  href?: string;
  linkMedia?: boolean;
  ctaLabel?: string;
  alignment: ContentAlignment;
  theme: ShowcaseTheme;
  desktopPosition?: string;
  mobilePosition?: string;
  overlay?: "default" | "soft" | "none";
  isHero?: boolean;
}
