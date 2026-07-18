"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import type { CollectionContent } from "@/content/collections/types";
import { t } from "@/content/locale";
import { Reveal } from "./Reveal";

interface RelatedCollectionsProps {
  collections: CollectionContent[];
  locale: Locale;
  heading: string;
  ctaLabel: string;
}

export function RelatedCollections({
  collections,
  locale,
  heading,
  ctaLabel,
}: RelatedCollectionsProps) {
  if (collections.length === 0) return null;

  return (
    <section className="bg-surface px-6 py-20 sm:px-10 md:px-16 md:py-24">
      <Reveal>
        <h2 className="mx-auto mb-10 max-w-6xl font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
          {heading}
        </h2>
      </Reveal>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {collections.map((collection, index) => {
          const name = t(collection.name, locale);
          const href = localizedPath(locale, `/collections/${collection.slug}`);
          return (
            <Reveal key={collection.id} delay={index * 0.06}>
              <Link
                href={href}
                className="group relative block aspect-[4/5] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  src={collection.hero.desktop}
                  alt={name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                    {name}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium">
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
