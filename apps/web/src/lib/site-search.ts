import { COLLECTIONS } from "@/content/collections";
import { getProduct } from "@/content/products";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";

export type SearchBrandResult = {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
};

export type SearchRangeResult = {
  id: string;
  name: string;
  description: string;
  brandName: string;
  image: string;
  href: string;
};

export type SearchNewsResult = {
  id: string;
  title: string;
  href: string;
};

function normalize(value: string, locale: Locale) {
  return value.trim().toLocaleLowerCase(locale);
}

function matches(haystack: string, query: string, locale: Locale) {
  if (!query) return false;
  return normalize(haystack, locale).includes(query);
}

export function searchBrands(rawQuery: string, locale: Locale): SearchBrandResult[] {
  const query = normalize(rawQuery, locale);
  if (!query) return [];

  return COLLECTIONS.filter(
    (collection) =>
      matches(collection.name[locale], query, locale) ||
      matches(collection.shortDescription[locale], query, locale) ||
      matches(collection.introduction[locale], query, locale),
  ).map((collection) => ({
    id: collection.id,
    name: collection.name[locale],
    description: collection.shortDescription[locale],
    image: collection.hero.desktop,
    href: localizedPath(locale, `/collections/${collection.slug}`),
  }));
}

export function searchRanges(rawQuery: string, locale: Locale): SearchRangeResult[] {
  const query = normalize(rawQuery, locale);
  if (!query) return [];

  return COLLECTIONS.flatMap((collection) =>
    collection.sections
      .filter(
        (section) =>
          matches(section.title[locale], query, locale) ||
          matches(section.description[locale], query, locale) ||
          matches(collection.name[locale], query, locale),
      )
      .map((section) => {
        const product = getProduct(`${collection.slug}-${section.id}`);
        return {
          id: `${collection.slug}-${section.id}`,
          name: section.title[locale],
          description: section.description[locale],
          brandName: collection.name[locale],
          image: section.media.desktop,
          href: product
            ? localizedPath(locale, `/products/${product.slug}`)
            : localizedPath(locale, `/collections/${collection.slug}`),
        };
      }),
  );
}

/** No news content exists in the catalog yet. */
export function searchNews(_rawQuery: string, _locale: Locale): SearchNewsResult[] {
  return [];
}
