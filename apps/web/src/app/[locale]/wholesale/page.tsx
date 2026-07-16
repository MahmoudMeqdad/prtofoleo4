import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WholesaleView } from "@/components/pages/WholesaleView";
import { wholesaleContent } from "@/content/pages/wholesale";
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
    path: "/wholesale",
    title: t(wholesaleContent.metaTitle, locale),
    description: t(wholesaleContent.metaDescription, locale),
  });
}

export default async function WholesalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <WholesaleView locale={localeParam} />;
}
