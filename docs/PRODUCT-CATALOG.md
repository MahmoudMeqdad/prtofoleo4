# Product Catalog

The bilingual local catalog lives in `apps/web/src/content/products`. `VelvetProduct` defines identity, unique slug, source collection/section, localized copy, features, optional contents/age/SKU/options, numeric price, explicit currency, honest availability, project-owned images, and related-product hints.

Slugs are lowercase kebab-case and globally unique. UI and cart store stable product/option IDs; localized labels are resolved at render/message time. No compare-at prices, stock quantities, ratings, or delivery claims are present. Initial review prices use ILS and must be approved before production commerce promotion.

To add a product: add a valid catalog entry, reuse approved project assets, add both locales, give it a unique ID/slug, numeric price/currency, honest availability, and optionally map it to a collection `sourceSectionId`.
