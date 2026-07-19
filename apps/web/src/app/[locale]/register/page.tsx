import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegisterPageView } from "@/components/auth/RegisterPageView";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  return {
    title: dictionary.auth.registerMetaTitle,
    description: dictionary.auth.registerMetaDescription,
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <RegisterPageView />;
}
