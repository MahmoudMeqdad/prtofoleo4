import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { t } from "@/content/locale";
import { creativeStudio } from "./creative-studio";
import { getRelatedCollections } from "./index";
import type { CollectionFeature } from "./showcase-types";

/** Maps Creative Studio into a Mini Brands–style campaign showcase. */
export function getCreativeStudioShowcase(
  locale: Locale,
  dictionary: Dictionary,
): CollectionFeature[] {
  const c = creativeStudio;
  const copy = dictionary.collections["creative-studio"];
  const seeMore = copy.cta;
  const related = getRelatedCollections(c);
  const detailSlugs = ["make-something-new", "color-first", "share-the-process"] as const;

  const relatedHref = (index: number) => {
    const target = related[index % Math.max(related.length, 1)];
    return target
      ? localizedPath(locale, `/collections/${target.slug}`)
      : localizedPath(locale, "/collections");
  };

  const alignments = ["bottom-left", "bottom-right", "center-left"] as const;

  const features: CollectionFeature[] = c.sections.map((section, index) => ({
    id: section.id,
    isHero: index === 0,
    title: t(section.title, locale),
    image: section.media.desktop,
    mobileImage: section.media.mobile,
    imageAlt: t(section.media.alt, locale),
    href:
      locale === "en"
        ? localizedPath(locale, `/collections/creative-studio/${detailSlugs[index]}`)
        : relatedHref(index),
    linkMedia: locale === "en",
    ctaLabel: seeMore,
    alignment: alignments[index % alignments.length],
    theme: "dark" as const,
    desktopPosition: "center center",
    mobilePosition: "center 50%",
    overlay: "soft" as const,
  }));

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
