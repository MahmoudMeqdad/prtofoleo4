"use client";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PageHero } from "@/components/pages/PageHero";
import { StorySection } from "@/components/pages/StorySection";
import { ProductsComingSoon } from "@/components/pages/ProductsComingSoon";
import { RelatedCollections } from "@/components/pages/RelatedCollections";
import { Reveal } from "@/components/pages/Reveal";
import { CreativeStudioShowcaseView } from "@/components/pages/CreativeStudioShowcaseView";
import {
  CollectionProductShowcaseView,
  OutdoorFunShowcaseView,
} from "@/components/pages/OutdoorFunShowcaseView";
import { TinyWorldsShowcaseView } from "@/components/pages/TinyWorldsShowcaseView";
import { getRelatedCollections, type CollectionContent } from "@/content/collections";
import { t } from "@/content/locale";
import type { Locale } from "@/i18n/config";
import { useDictionary } from "@/providers/LocaleProvider";

export function CollectionDetailView({
  locale,
  collection,
}: {
  locale: Locale;
  collection: CollectionContent;
}) {
  const dictionary = useDictionary();
  const related = getRelatedCollections(collection);
  const name = t(collection.name, locale);

  if (collection.slug === "creative-studio") {
    return <CreativeStudioShowcaseView locale={locale} />;
  }

  if (collection.slug === "tiny-worlds") {
    return <TinyWorldsShowcaseView locale={locale} />;
  }

  if (collection.slug === "outdoor-fun" && locale === "en") {
    return <OutdoorFunShowcaseView locale={locale} />;
  }

  if (
    locale === "en" &&
    ["learning-lab", "plush-friends", "action-zone"].includes(collection.slug)
  ) {
    return <CollectionProductShowcaseView locale={locale} collection={collection} />;
  }

  return (
    <PublicPageShell>
      <PageHero
        title={name}
        subtitle={t(collection.shortDescription, locale)}
        eyebrow={collection.eyebrow ? t(collection.eyebrow, locale) : undefined}
        desktopMedia={collection.hero.desktop}
        mobileMedia={collection.hero.mobile}
        textColor={collection.hero.textColor}
        overlayStrength={collection.hero.overlayStrength}
        focalPoint={collection.hero.focalPoint}
      />

      <section className="px-6 py-16 sm:px-10 md:px-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            {dictionary.pages.collectionIntroHeading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t(collection.introduction, locale)}
          </p>
        </Reveal>
      </section>

      {collection.sections.map((section) => (
        <StorySection
          key={section.id}
          section={section}
          locale={locale}
          accent={collection.theme.accent}
        />
      ))}

      <ProductsComingSoon
        heading={dictionary.pages.productsComingSoonHeading}
        body={dictionary.pages.productsComingSoonBody}
      />

      <RelatedCollections
        collections={related}
        locale={locale}
        heading={dictionary.pages.relatedHeading}
        ctaLabel={dictionary.pages.exploreCollection}
      />
    </PublicPageShell>
  );
}
