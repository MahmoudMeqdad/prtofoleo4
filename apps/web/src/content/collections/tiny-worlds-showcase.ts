import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { t } from "@/content/locale";
import { getRelatedCollections } from "./index";
import { tinyWorlds } from "./tiny-worlds";
import type { CollectionFeature } from "./showcase-types";

/** Maps Tiny Worlds content into a ZURU-style brand showcase. */
export function getTinyWorldsShowcase(locale: Locale, dictionary: Dictionary): CollectionFeature[] {
  const c = tinyWorlds;
  const seeMore = dictionary.collections["tiny-worlds"].cta;
  const related = getRelatedCollections(c);
  const detailHref = (slug: string) => localizedPath(locale, `/collections/tiny-worlds/${slug}`);

  const alignments = ["bottom-left", "bottom-right", "center-left"] as const;

  const features: CollectionFeature[] = [
    {
      id: "hero",
      isHero: true,
      title: t(c.name, locale),
      image: c.hero.desktop,
      mobileImage: c.hero.mobile,
      imageAlt: t(c.name, locale),
      href: detailHref("tiny-worlds"),
      linkMedia: true,
      ctaLabel: seeMore,
      alignment: "bottom-left",
      theme: "dark",
      desktopPosition: c.hero.focalPoint ?? "center 40%",
      mobilePosition: "center 45%",
      overlay: "soft",
    },
    ...c.sections.map((section, index) => ({
      id: section.id,
      title: t(section.title, locale),
      image: section.media.desktop,
      mobileImage: section.media.mobile,
      imageAlt: t(section.media.alt, locale),
      href: detailHref(
        ["play-at-a-smaller-scale", "stories-without-a-script", "details-that-reward-attention"][
          index
        ],
      ),
      linkMedia: true,
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
