import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactView } from "@/components/pages/ContactView";
import { contactContent } from "@/content/pages/contact";
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
    path: "/contact",
    title: t(contactContent.metaTitle, locale),
    description: t(contactContent.metaDescription, locale),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <ContactView locale={localeParam} />;
}
