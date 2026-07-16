import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://iplay-web.vercel.app";

export function getSiteUrl(): string {
  return SITE_URL;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const canonicalPath = `/${locale}${normalized === "/" ? "" : normalized}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : undefined;

  const languages = Object.fromEntries(
    locales.map((code) => [
      code,
      `${SITE_URL}/${code}${normalized === "/" ? "" : normalized}`,
    ]),
  ) as Record<string, string>;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "IPLAY",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}
