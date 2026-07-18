import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleHtmlAttributes } from "@/components/layout/LocaleHtmlAttributes";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocaleDirection, isLocale, locales, type Locale } from "@/i18n/config";
import { CartHydration } from "@/components/cart/CartHydration";
import { CartDrawer } from "@/components/cart/CartDrawer";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {};
  }

  const dictionary = await getDictionary(localeParam);
  const alternateLocale = localeParam === "en" ? "ar" : "en";

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
        [alternateLocale]: `/${alternateLocale}`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const direction = getLocaleDirection(locale);

  return (
    <>
      <LocaleHtmlAttributes locale={locale} />
      <div lang={locale} dir={direction}>
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <CartHydration />
          {children}
          <CartDrawer />
        </LocaleProvider>
      </div>
    </>
  );
}
