import Link from "next/link";
import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizedPath,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function NotFound() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const locale: Locale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const dictionary = await getDictionary(locale);
  const isArabic = locale === "ar";

  return (
    <div
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-foreground"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-4 max-w-xl text-center font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
        {dictionary.errors.notFoundTitle}
      </h1>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        {dictionary.errors.notFoundBody}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={localizedPath(locale)}
          className="inline-flex min-h-11 items-center rounded-full bg-[var(--logo-red)] px-6 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {dictionary.errors.backHome}
        </Link>
        <Link
          href={localizedPath(locale, "/collections")}
          className="inline-flex min-h-11 items-center rounded-full border border-foreground px-6 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {dictionary.errors.browseCollections}
        </Link>
      </div>
    </div>
  );
}
