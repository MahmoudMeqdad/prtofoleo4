"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import type { Locale } from "@/i18n/config";
import { useDictionary } from "@/providers/LocaleProvider";
import {
  searchBrands,
  searchNews,
  searchRanges,
  type SearchBrandResult,
  type SearchRangeResult,
} from "@/lib/site-search";

function ResultCard({
  href,
  image,
  label,
  title,
}: {
  href: string;
  image: string;
  label: string;
  title: string;
}) {
  return (
    <Link href={href} className="group block max-w-md text-start transition-opacity duration-200 hover:opacity-90">
      <span className="relative block aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-surface md:rounded-[1.75rem]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </span>
      <span className="mt-3 block text-sm text-muted-foreground">{label}</span>
      <strong className="mt-1 block font-display text-xl font-bold leading-snug text-foreground md:text-2xl">
        {title}
      </strong>
    </Link>
  );
}

function SearchSection({
  title,
  emptyLabel,
  children,
  isEmpty,
}: {
  title: string;
  emptyLabel: string;
  children: ReactNode;
  isEmpty: boolean;
}) {
  return (
    <section className="pt-2">
      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
      {isEmpty ? (
        <p className="mt-5 text-base text-muted-foreground">{emptyLabel}</p>
      ) : (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      )}
    </section>
  );
}

export function SearchResultsView({ locale, query }: { locale: Locale; query: string }) {
  const dictionary = useDictionary();
  const brands = searchBrands(query, locale);
  const ranges = searchRanges(query, locale);
  const news = searchNews(query, locale);
  const displayQuery = query.trim();

  return (
    <PublicPageShell>
      <div className="min-h-screen bg-white px-5 pb-24 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] text-foreground md:px-[7vw]">
        <div className="mx-auto max-w-6xl">
          <header className="mb-12">
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {dictionary.search.resultsFor}
            </h1>
            <p className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {displayQuery ? `“${displayQuery}”` : "“”"}
            </p>
          </header>

          <div className="space-y-14">
            <SearchSection
              title={dictionary.search.brands}
              emptyLabel={dictionary.search.noResults}
              isEmpty={brands.length === 0}
            >
              {brands.map((item: SearchBrandResult) => (
                <ResultCard
                  key={item.id}
                  href={item.href}
                  image={item.image}
                  label={dictionary.search.brandLabel}
                  title={item.name}
                />
              ))}
            </SearchSection>

            <SearchSection
              title={dictionary.search.ranges}
              emptyLabel={dictionary.search.noResults}
              isEmpty={ranges.length === 0}
            >
              {ranges.map((item: SearchRangeResult) => (
                <ResultCard
                  key={item.id}
                  href={item.href}
                  image={item.image}
                  label={dictionary.search.rangeLabel}
                  title={item.name}
                />
              ))}
            </SearchSection>

            <SearchSection
              title={dictionary.search.news}
              emptyLabel={dictionary.search.noResults}
              isEmpty={news.length === 0}
            >
              {null}
            </SearchSection>
          </div>
        </div>
      </div>
    </PublicPageShell>
  );
}
