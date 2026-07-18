import type { Locale } from "../../i18n/config";
import { COLLECTIONS } from "../collections";
import type { VelvetProduct } from "./types";

const prices: Record<string, number> = {
  "tiny-worlds": 79,
  "creative-studio": 69,
  "outdoor-fun": 89,
  "plush-friends": 59,
  "action-zone": 99,
  "learning-lab": 74,
};

export const PRODUCTS: VelvetProduct[] = COLLECTIONS.flatMap((collection) =>
  collection.sections.map((source, index) => {
    return {
      // The first product keeps the historical id so persisted carts stay valid.
      id:
        index === 0
          ? `product-${collection.slug}`
          : `product-${collection.slug}-${source.id}`,
      slug: `${collection.slug}-${source.id}`,
      collectionSlug: collection.slug,
      sourceSectionId: source.id,
      name: source.title,
      shortDescription: source.description,
      description: collection.introduction,
      features: {
        en: [source.description.en, collection.shortDescription.en],
        ar: [source.description.ar, collection.shortDescription.ar],
      },
      contents: {
        en: ["One Velvet Kids play set", "Product guide"],
        ar: ["مجموعة لعب واحدة من Velvet Kids", "دليل المنتج"],
      },
      ageRange: { en: "Ages 3+", ar: "للأعمار من 3 سنوات فأكثر" },
      sku: `VK-${collection.slug.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
      price: prices[collection.slug],
      currency: "ILS",
      availability: "available-to-order",
      images: [
        { src: source.media.desktop, alt: source.media.alt },
        ...(source.media.mobile
          ? [{ src: source.media.mobile, alt: source.media.alt }]
          : []),
        { src: collection.hero.desktop, alt: collection.name },
      ],
      options:
        collection.slug === "creative-studio"
          ? [
              {
                id: "style",
                name: { en: "Style", ar: "النمط" },
                required: true,
                values: [
                  { id: "classic", label: { en: "Classic", ar: "كلاسيكي" } },
                  { id: "bright", label: { en: "Bright", ar: "زاهٍ" } },
                ],
              },
            ]
          : undefined,
      isFeatured: index === 0,
    } satisfies VelvetProduct;
  }),
);

const bySlug = new Map(PRODUCTS.map((product) => [product.slug, product]));

export function getProduct(slug: string) {
  return bySlug.get(slug);
}

export function getProductSlugs() {
  return PRODUCTS.map((product) => product.slug);
}

/**
 * Resolves the product for a showcase card. Detail pages override the
 * collection slug, so matching happens through the section ids instead.
 * Cards without their own product (e.g. the collection overview) fall
 * back to the first product of the same collection.
 */
export function getProductForShowcase(sectionIds: string[], activeSectionId: string) {
  const candidates = PRODUCTS.filter((product) =>
    sectionIds.includes(product.sourceSectionId),
  );
  return (
    candidates.find((product) => product.sourceSectionId === activeSectionId) ??
    candidates[0]
  );
}

export function getRelatedProducts(product: VelvetProduct) {
  const explicit = (product.relatedProductSlugs ?? [])
    .map(getProduct)
    .filter((item): item is VelvetProduct => Boolean(item));
  const same = PRODUCTS.filter(
    (item) => item.id !== product.id && item.collectionSlug === product.collectionSlug,
  );
  const featured = PRODUCTS.filter((item) => item.id !== product.id && item.isFeatured);
  return Array.from(
    new Map([...explicit, ...same, ...featured].map((item) => [item.id, item])).values(),
  ).slice(0, 4);
}

export function searchProducts(query: string, locale: Locale) {
  const normalized = query.trim().toLocaleLowerCase(locale);
  if (!normalized) return [];
  return PRODUCTS.filter((product) => {
    const collection = COLLECTIONS.find((item) => item.slug === product.collectionSlug);
    return [product.name[locale], product.shortDescription[locale], collection?.name[locale] ?? ""]
      .join(" ")
      .toLocaleLowerCase(locale)
      .includes(normalized);
  });
}

export type { VelvetProduct, ProductOption, ProductAvailability } from "./types";
