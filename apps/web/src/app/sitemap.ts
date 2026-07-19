import type { MetadataRoute } from "next";
import { getCollectionSlugs } from "@/content/collections";
import { locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/metadata";
import { getProductSlugs } from "@/content/products";

const STATIC_PATHS = [
  "",
  "/collections",
  "/about",
  "/contact",
  "/careers",
  "/login",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const collectionSlugs = getCollectionSlugs();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const slug of collectionSlugs) {
      entries.push({
        url: `${siteUrl}/${locale}/collections/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    for (const slug of getProductSlugs()) {
      entries.push({
        url: `${siteUrl}/${locale}/products/${slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
