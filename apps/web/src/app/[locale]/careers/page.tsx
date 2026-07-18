import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersView } from "@/components/pages/CareersView";
import { careersContent } from "@/content/pages/careers";
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
    path: "/careers",
    title: t(careersContent.metaTitle, locale),
    description: t(careersContent.metaDescription, locale),
  });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <CareersView locale={localeParam} />;
}
