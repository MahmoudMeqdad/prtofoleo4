import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchResultsView } from "@/components/search/SearchResultsView";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { q = "" } = await searchParams;
  const query = q.trim();
  return {
    title:
      locale === "ar"
        ? query
          ? `نتائج البحث عن “${query}” | Velvet Kids`
          : "نتائج البحث | Velvet Kids"
        : query
          ? `Search results for “${query}” | Velvet Kids`
          : "Search results | Velvet Kids",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { q = "" } = await searchParams;
  return <SearchResultsView locale={locale as Locale} query={q} />;
}
