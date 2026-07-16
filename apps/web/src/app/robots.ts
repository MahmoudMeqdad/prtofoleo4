import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dev/", "/design-system", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
