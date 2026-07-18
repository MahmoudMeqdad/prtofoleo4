"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/pages/Reveal";
import { collectionsIndexContent } from "@/content/pages/collections-index";
import { getAllCollections } from "@/content/collections";
import { t } from "@/content/locale";
import { localizedPath, type Locale } from "@/i18n/config";

export function CollectionsIndexView({ locale }: { locale: Locale }) {
  const c = collectionsIndexContent;
  const collections = getAllCollections();

  return (
    <PublicPageShell>
      <PageHero
        title={t(c.heroTitle, locale)}
        subtitle={t(c.heroSubtitle, locale)}
        desktopMedia="/media/home/collections/creative-studio-desktop.svg"
        mobileMedia="/media/home/collections/creative-studio-mobile.svg"
        textColor="dark"
        overlayStrength={0.15}
        focalPoint="center 50%"
      />

      <section className="px-6 py-16 sm:px-10 md:px-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            {t(c.introHeading, locale)}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t(c.introBody, locale)}
          </p>
        </Reveal>
      </section>

      <section className="pb-8">
        {collections.map((collection, index) => {
          const name = t(collection.name, locale);
          const short = t(collection.shortDescription, locale);
          const href = localizedPath(locale, `/collections/${collection.slug}`);
          const light = collection.hero.textColor === "light";

          return (
            <Reveal key={collection.id} delay={index * 0.03}>
              <Link
                href={href}
                className="group relative block min-h-[70svh] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
              >
                <Image
                  src={collection.hero.desktop}
                  alt={name}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{
                    objectPosition: collection.hero.focalPoint ?? "center",
                  }}
                />
                {collection.hero.mobile ? (
                  <Image
                    src={collection.hero.mobile}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover md:hidden"
                    aria-hidden="true"
                  />
                ) : null}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: `rgba(0,0,0,${collection.hero.overlayStrength ?? 0.4})`,
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex min-h-[70svh] items-end px-6 py-14 sm:px-10 md:px-16">
                  <div className="max-w-2xl">
                    <h2
                      className={
                        light
                          ? "font-[family-name:var(--font-display)] text-4xl font-bold text-white md:text-5xl"
                          : "font-[family-name:var(--font-display)] text-4xl font-bold text-white md:text-5xl"
                      }
                    >
                      {name}
                    </h2>
                    <p className="mt-3 max-w-xl text-base text-white/90 md:text-lg">{short}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      {t(c.exploreCta, locale)}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </section>
    </PublicPageShell>
  );
}
