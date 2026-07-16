import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DropshippingView } from "@/components/pages/DropshippingView";
import { dropshippingContent } from "@/content/pages/dropshipping";
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
    path: "/dropshipping",
    title: t(dropshippingContent.metaTitle, locale),
    description: t(dropshippingContent.metaDescription, locale),
  });
}

export default async function DropshippingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <DropshippingView locale={localeParam} />;
}
