"use client";

import type { VelvetProduct } from "@/content/products/types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CartItem as CartLine } from "@/store/cart-types";
import { CartItem } from "./CartItem";

export type CartEntry = {
  item: CartLine;
  product: VelvetProduct;
};

export function CartItemsList({
  entries,
  locale,
  dictionary,
  removingKeys,
  onQuantityChange,
  onRemove,
}: {
  entries: CartEntry[];
  locale: Locale;
  dictionary: Dictionary;
  removingKeys: Set<string>;
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}) {
  return (
    <section aria-label={dictionary.cart.title} className="space-y-4">
      {entries.map(({ item, product }) => (
        <CartItem
          key={item.key}
          item={item}
          product={product}
          locale={locale}
          dictionary={dictionary}
          removing={removingKeys.has(item.key)}
          onQuantityChange={(quantity) => onQuantityChange(item.key, quantity)}
          onRemove={() => onRemove(item.key)}
        />
      ))}
    </section>
  );
}
