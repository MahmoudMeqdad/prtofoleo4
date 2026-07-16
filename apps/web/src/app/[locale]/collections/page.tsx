import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionsIndexView } from "@/components/pages/CollectionsIndexView";
import { collectionsIndexContent } from "@/content/pages/collections-index";
import { t } from "@/content/locale";
import { isLocale, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  return buildPageMetadata({
    locale,
    path: "/collections",
    title: t(collectionsIndexContent.metaTitle, locale),
    description: t(collectionsIndexContent.metaDescription, locale),
    image: "/media/home/collections/creative-studio-desktop.svg",
  });
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <CollectionsIndexView locale={localeParam} />;
}
