import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionProductShowcaseView } from "@/components/pages/OutdoorFunShowcaseView";
import {
  CREATIVE_STUDIO_DETAIL_SLUGS,
  getCreativeStudioDetail,
} from "@/content/collections/creative-studio-details";
import { t } from "@/content/locale";
import { buildPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return CREATIVE_STUDIO_DETAIL_SLUGS.map((itemSlug) => ({
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
  const detail = getCreativeStudioDetail(itemSlug);
  if (!detail) return {};

  return buildPageMetadata({
    locale: "en",
    path: `/collections/creative-studio/${itemSlug}`,
    title: `${t(detail.name, "en")} | Creative Studio`,
    description: t(detail.metaDescription, "en"),
    image: detail.hero.desktop,
  });
}

export default async function CreativeStudioDetailPage({
  params,
}: {
  params: Promise<{ locale: string; itemSlug: string }>;
}) {
  const { locale, itemSlug } = await params;
  if (locale !== "en") notFound();
  const detail = getCreativeStudioDetail(itemSlug);
  if (!detail) notFound();

  return (
    <CollectionProductShowcaseView
      locale="en"
      collection={detail}
      cardImageScale={0.8}
      hideRelatedTitle
    />
  );
}
