"use client";

import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { PageHero } from "@/components/pages/PageHero";
import { ContactForm } from "@/components/pages/ContactForm";
import { Reveal } from "@/components/pages/Reveal";
import { contactContent as c } from "@/content/pages/contact";
import { t } from "@/content/locale";
import type { Locale } from "@/i18n/config";

function getWhatsappHref(): string | undefined {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!number) return undefined;
  return `https://wa.me/${number}`;
}

export function ContactView({ locale }: { locale: Locale }) {
  const whatsappHref = getWhatsappHref();
  const whatsappDisplay =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    (locale === "ar" ? "سيتم إضافة الرقم قريباً" : "Number coming soon");

  return (
    <PublicPageShell>
      <PageHero
        title={t(c.heroTitle, locale)}
        subtitle={t(c.heroSubtitle, locale)}
        desktopMedia="/media/home/collections/plush-friends-desktop.svg"
        mobileMedia="/media/home/collections/plush-friends-mobile.svg"
        textColor="light"
        overlayStrength={0.4}
      />

      <section className="px-6 py-16 sm:px-10 md:px-16">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold">
                  {t(c.whatsappLabel, locale)}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(c.whatsappHint, locale)}
                </p>
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center text-primary underline-offset-2 hover:underline"
                  >
                    {whatsappDisplay}
                  </a>
                ) : (
                  <p className="mt-3 text-foreground">{whatsappDisplay}</p>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {t(c.emailLabel, locale)}
                </h2>
                <a
                  href={`mailto:${t(c.emailValue, locale)}`}
                  className="mt-3 inline-flex text-primary underline-offset-2 hover:underline"
                >
                  {t(c.emailValue, locale)}
                </a>
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {t(c.socialHeading, locale)}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(c.socialHint, locale)}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-bold">
              {t(c.formHeading, locale)}
            </h2>
            <ContactForm locale={locale} whatsappHref={whatsappHref} />
          </Reveal>
        </div>
      </section>
    </PublicPageShell>
  );
}
