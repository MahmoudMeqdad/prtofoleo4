"use client";

import Link from "next/link";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/pages/Reveal";
import { aboutContent } from "@/content/pages/about";
import { t } from "@/content/locale";
import { localizedPath, type Locale } from "@/i18n/config";

export function AboutView({ locale }: { locale: Locale }) {
  const c = aboutContent;

  return (
    <PublicPageShell>
      <PageHero
        title={t(c.heroTitle, locale)}
        subtitle={t(c.heroSubtitle, locale)}
        desktopMedia="/media/home/collections/learning-lab-desktop.svg"
        mobileMedia="/media/home/collections/learning-lab-mobile.svg"
        textColor="dark"
        overlayStrength={0.12}
      />

      <section className="px-6 py-16 sm:px-10 md:px-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.storyHeading, locale)}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {t(c.storyBody, locale)}
          </p>
        </Reveal>
      </section>

      <section className="bg-surface px-6 py-16 sm:px-10 md:px-16">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              {t(c.missionHeading, locale)}
            </h2>
            <p className="mt-4 text-muted-foreground">{t(c.missionBody, locale)}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
              {t(c.visionHeading, locale)}
            </h2>
            <p className="mt-4 text-muted-foreground">{t(c.visionBody, locale)}</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 md:px-16 md:py-24">
        <Reveal className="mx-auto max-w-5xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.valuesHeading, locale)}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {c.values.map((value) => (
              <div key={value.title.en}>
                <h3 className="text-xl font-semibold">{t(value.title, locale)}</h3>
                <p className="mt-2 text-muted-foreground">{t(value.body, locale)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-[#171717] px-6 py-16 text-white sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.focusHeading, locale)}
          </h2>
          <p className="mt-5 text-white/85">{t(c.focusBody, locale)}</p>
        </Reveal>
      </section>

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.partnersHeading, locale)}
          </h2>
          <p className="mt-5 text-muted-foreground">{t(c.partnersBody, locale)}</p>
        </Reveal>
      </section>

      <section className="px-6 pb-24 text-center sm:px-10 md:px-16">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.ctaHeading, locale)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t(c.ctaBody, locale)}</p>
          <Link
            href={localizedPath(locale, "/contact")}
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--logo-red)] px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t(c.ctaLabel, locale)}
          </Link>
        </Reveal>
      </section>
    </PublicPageShell>
  );
}
