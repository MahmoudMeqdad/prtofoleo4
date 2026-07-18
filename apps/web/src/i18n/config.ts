export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "velvet-kids-locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Build a locale-prefixed path, preserving the path without an existing locale prefix. */
export function localizedPath(locale: Locale, path: string = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }

  const suffix = segments.length > 0 ? `/${segments.join("/")}` : "";
  return `/${locale}${suffix}`;
}

export function swapLocaleInPath(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`;
}
