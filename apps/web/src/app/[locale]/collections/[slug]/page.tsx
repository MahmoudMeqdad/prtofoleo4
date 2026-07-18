import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionDetailView } from "@/components/pages/CollectionDetailView";
import {
  getAllCollections,
  getCollection,
  getCollectionSlugs,
} from "@/content/collections";
import { t } from "@/content/locale";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const slugs = getCollectionSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const collection = getCollection(slug);
  if (!collection) return {};
  const locale = localeParam as Locale;
  const titleSuffix =
    locale === "ar" ? "علامات Velvet Kids" : "Velvet Kids Brands";
  return buildPageMetadata({
    locale,
    path: `/collections/${slug}`,
    title: `${t(collection.name, locale)} | ${titleSuffix}`,
    description: t(collection.metaDescription, locale),
    image: collection.hero.desktop,
  });
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();
  const collection = getCollection(slug);
  if (!collection) notFound();

  // Ensure static generation knows all collections exist
  void getAllCollections();

  return <CollectionDetailView locale={localeParam} collection={collection} />;
}
