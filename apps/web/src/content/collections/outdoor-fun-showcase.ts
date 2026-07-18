import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { t } from "@/content/locale";
import { getRelatedCollections } from "./index";
import { outdoorFun } from "./outdoor-fun";
import type { CollectionFeature } from "./showcase-types";

/** Maps Outdoor Fun into a ZURU product-range style showcase. */
export function getOutdoorFunShowcase(locale: Locale, dictionary: Dictionary): CollectionFeature[] {
  const c = outdoorFun;
  const seeMore = dictionary.collections["outdoor-fun"].cta;
  const related = getRelatedCollections(c);

  const relatedHref = (index: number) => {
    const target = related[index % Math.max(related.length, 1)];
    return target
      ? localizedPath(locale, `/collections/${target.slug}`)
      : localizedPath(locale, "/collections");
  };

  const alignments = ["bottom-left", "bottom-right", "center-left"] as const;

  const features: CollectionFeature[] = [
    {
      id: "hero",
      isHero: true,
      title: t(c.name, locale),
      image: c.hero.desktop,
      mobileImage: c.hero.mobile ?? c.hero.poster,
      imageAlt: t(c.name, locale),
      href: relatedHref(0),
      ctaLabel: seeMore,
      alignment: "bottom-left",
      theme: "dark",
      desktopPosition: c.hero.focalPoint ?? "center 35%",
      mobilePosition: "center 40%",
      overlay: "soft",
    },
    ...c.sections.map((section, index) => ({
      id: section.id,
      title: t(section.title, locale),
      image: section.media.desktop,
      mobileImage: section.media.mobile,
      imageAlt: t(section.media.alt, locale),
      href: relatedHref(index),
      ctaLabel: seeMore,
      alignment: alignments[index % alignments.length],
      theme: "dark" as const,
      desktopPosition: "center center",
      mobilePosition: "center 50%",
      overlay: "soft" as const,
    })),
  ];

  related.forEach((item, index) => {
    features.push({
      id: `related-${item.slug}`,
      title: t(item.name, locale),
      image: item.hero.desktop,
      mobileImage: item.hero.mobile,
      imageAlt: t(item.name, locale),
      href: localizedPath(locale, `/collections/${item.slug}`),
      ctaLabel: seeMore,
      alignment: alignments[index % alignments.length],
      theme: item.hero.textColor === "dark" ? "dark" : "light",
      desktopPosition: item.hero.focalPoint ?? "center",
      mobilePosition: "center center",
      overlay: "default",
    });
  });

  return features;
}
