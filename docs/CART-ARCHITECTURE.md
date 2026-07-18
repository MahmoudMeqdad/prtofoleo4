# Cart Architecture

The cart uses Zustand with the versioned key `velvet-kids-cart-v1`. A line key is product ID plus sorted option/value IDs, so different configurations remain separate. Quantities are clamped to 1–99. The store supports add, merge, remove, update, clear, drawer state, and a hydration-ready flag.

Persistence contains only serializable IDs, quantities, and option IDs. Rehydration is explicitly started client-side by `CartHydration`; the header hides the badge until ready. Storage operations are guarded. Catalog data is resolved at render time, and removed/unknown products are ignored instead of crashing the drawer or cart page. Customer delivery data stays in component memory and is not persisted.

The badge represents total units, not unique lines.
