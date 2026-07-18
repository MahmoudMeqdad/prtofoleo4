import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutView } from "@/components/pages/AboutView";
import { aboutContent } from "@/content/pages/about";
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
    path: "/about",
    title: t(aboutContent.metaTitle, locale),
    description: t(aboutContent.metaDescription, locale),
    image: "/media/home/collections/learning-lab-desktop.svg",
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <AboutView locale={localeParam} />;
}
