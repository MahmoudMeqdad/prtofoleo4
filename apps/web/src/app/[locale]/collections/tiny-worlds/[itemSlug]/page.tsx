import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionProductShowcaseView } from "@/components/pages/OutdoorFunShowcaseView";
import {
  getTinyWorldsDetail,
  TINY_WORLDS_DETAIL_SLUGS,
} from "@/content/collections/tiny-worlds-details";
import { t } from "@/content/locale";
import { buildPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return TINY_WORLDS_DETAIL_SLUGS.map((itemSlug) => ({
    locale: "en",
    itemSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; itemSlug: string }>;
}): Promise<Metadata> {
  const { locale, itemSlug } = await params;
  if (locale !== "en") return {};
  const detail = getTinyWorldsDetail(itemSlug);
  if (!detail) return {};

  return buildPageMetadata({
    locale: "en",
    path: `/collections/tiny-worlds/${itemSlug}`,
    title: `${t(detail.name, "en")} | Tiny Worlds`,
    description: t(detail.metaDescription, "en"),
    image: detail.hero.desktop,
  });
}

export default async function TinyWorldsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; itemSlug: string }>;
}) {
  const { locale, itemSlug } = await params;
  if (locale !== "en") notFound();
  const detail = getTinyWorldsDetail(itemSlug);
  if (!detail) notFound();

  return <CollectionProductShowcaseView locale="en" collection={detail} />;
}
