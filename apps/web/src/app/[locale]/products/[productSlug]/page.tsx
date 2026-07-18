import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { getProduct, getProductSlugs } from "@/content/products";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProductSlugs().map((productSlug) => ({ locale, productSlug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}): Promise<Metadata> {
  const { locale, productSlug } = await params;
  if (!isLocale(locale)) return {};
  const product = getProduct(productSlug);
  if (!product) return {};
  return buildPageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title: `${product.name[locale]} | Velvet Kids`,
    description: product.shortDescription[locale],
    image: product.images[0]?.src,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; productSlug: string }>;
}) {
  const { locale: localeParam, productSlug } = await params;
  if (!isLocale(localeParam)) notFound();
  const product = getProduct(productSlug);
  if (!product) notFound();
  const locale = localeParam as Locale;
  const structured = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.shortDescription[locale],
    image: product.images.map((image) => image.src),
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/PreOrder",
      url: `/products/${product.slug}`,
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }}
      />
      <ProductDetailView product={product} locale={locale} />
    </>
  );
}
