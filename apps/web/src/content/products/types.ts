export type ProductAvailability = "available-to-order" | "limited" | "coming-soon" | "unavailable";

export interface ProductOptionValue {
  id: string;
  label: { en: string; ar: string };
}

export interface ProductOption {
  id: string;
  name: { en: string; ar: string };
  required: boolean;
  values: ProductOptionValue[];
}

export interface VelvetProduct {
  id: string;
  slug: string;
  collectionSlug: string;
  sourceSectionId: string;
  name: { en: string; ar: string };
  shortDescription: { en: string; ar: string };
  description: { en: string; ar: string };
  features: { en: string[]; ar: string[] };
  contents?: { en: string[]; ar: string[] };
  ageRange?: { en: string; ar: string };
  sku?: string;
  price: number;
  currency: string;
  availability: ProductAvailability;
  images: { src: string; alt: { en: string; ar: string } }[];
  options?: ProductOption[];
  relatedProductSlugs?: string[];
  isFeatured?: boolean;
}
