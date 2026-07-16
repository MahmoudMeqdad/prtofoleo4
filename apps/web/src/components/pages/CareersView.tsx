"use client";

import Link from "next/link";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/pages/Reveal";
import { careersContent as c } from "@/content/pages/careers";
import { t } from "@/content/locale";
import { localizedPath, type Locale } from "@/i18n/config";

export function CareersView({ locale }: { locale: Locale }) {
  return (
    <PublicPageShell>
      <PageHero
        title={t(c.heroTitle, locale)}
        subtitle={t(c.heroSubtitle, locale)}
        desktopMedia="/media/home/collections/creative-studio-desktop.svg"
        mobileMedia="/media/home/collections/creative-studio-mobile.svg"
        textColor="dark"
        overlayStrength={0.12}
      />

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.introHeading, locale)}
          </h2>
          <p className="mt-5 text-muted-foreground">{t(c.introBody, locale)}</p>
        </Reveal>
      </section>

      <section className="px-6 pb-24 sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-3xl border border-border bg-surface px-8 py-14 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl">
            {t(c.emptyHeading, locale)}
          </h2>
          <p className="mt-4 text-muted-foreground">{t(c.emptyBody, locale)}</p>
          <Link
            href={localizedPath(locale, "/contact")}
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-[var(--logo-red)] px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t(c.contactCta, locale)}
          </Link>
        </Reveal>
      </section>
    </PublicPageShell>
  );
}
