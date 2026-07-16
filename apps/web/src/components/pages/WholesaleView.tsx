"use client";

import Link from "next/link";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PageHero } from "@/components/pages/PageHero";
import { FaqList } from "@/components/pages/FaqList";
import { Reveal } from "@/components/pages/Reveal";
import { wholesaleContent as c } from "@/content/pages/wholesale";
import { t } from "@/content/locale";
import { localizedPath, type Locale } from "@/i18n/config";

export function WholesaleView({ locale }: { locale: Locale }) {
  return (
    <PublicPageShell>
      <PageHero
        title={t(c.heroTitle, locale)}
        subtitle={t(c.heroSubtitle, locale)}
        desktopMedia="/media/home/collections/outdoor-fun-desktop.svg"
        textColor="light"
        overlayStrength={0.45}
      />

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
              {t(c.whoHeading, locale)}
            </h2>
            <p className="mt-4 text-muted-foreground">{t(c.whoBody, locale)}</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
              {t(c.tiersHeading, locale)}
            </h2>
            <p className="mt-4 text-muted-foreground">{t(c.tiersBody, locale)}</p>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
              {t(c.moqHeading, locale)}
            </h2>
            <p className="mt-4 text-muted-foreground">{t(c.moqBody, locale)}</p>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface px-6 py-16 sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-4xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.levelsHeading, locale)}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {c.levels.map((level) => (
              <div key={level.title.en} className="border border-border bg-white p-6">
                <h3 className="text-xl font-semibold">{t(level.title, locale)}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {t(level.body, locale)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-4xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.benefitsHeading, locale)}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {c.benefits.map((item) => (
              <li
                key={item.en}
                className="border border-border px-5 py-4 text-sm leading-relaxed"
              >
                {t(item, locale)}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="bg-[#171717] px-6 py-16 text-white sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.mapHeading, locale)}
          </h2>
          <p className="mt-4 text-white/85">{t(c.mapBody, locale)}</p>
        </Reveal>
      </section>

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.processHeading, locale)}
          </h2>
          <ol className="mt-8 space-y-4">
            {c.process.map((step, index) => (
              <li key={step.en} className="flex gap-4 text-base">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--logo-red)] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-1 font-medium">{t(step, locale)}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <FaqList
        heading={t(c.faqHeading, locale)}
        items={c.faqs.map((faq) => ({
          question: t(faq.question, locale),
          answer: t(faq.answer, locale),
        }))}
      />

      <section className="px-6 pb-24 text-center sm:px-10 md:px-16">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {t(c.ctaHeading, locale)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t(c.ctaBody, locale)}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              disabled
              className="inline-flex min-h-11 cursor-not-allowed items-center rounded-full bg-surface-strong px-6 text-sm font-semibold text-muted-foreground"
            >
              {t(c.ctaDisabled, locale)}
            </button>
            <Link
              href={localizedPath(locale, "/contact")}
              className="inline-flex min-h-11 items-center rounded-full border border-foreground px-6 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t(c.contactCta, locale)}
            </Link>
          </div>
        </Reveal>
      </section>
    </PublicPageShell>
  );
}
