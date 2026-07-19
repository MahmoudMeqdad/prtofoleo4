"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { getCollection } from "@/content/collections";
import type { VelvetProduct } from "@/content/products/types";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatCurrency } from "@/lib/currency";
import type { CartItem as CartLine } from "@/store/cart-types";

export function CartItem({
  item,
  product,
  locale,
  dictionary,
  removing,
  onQuantityChange,
  onRemove,
}: {
  item: CartLine;
  product: VelvetProduct;
  locale: Locale;
  dictionary: Dictionary;
  removing?: boolean;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}) {
  const collection = getCollection(product.collectionSlug);
  const brandName = collection?.name[locale];
  const lineTotal = product.price * item.quantity;
  const qtyDisabled =
    product.availability === "unavailable" || product.availability === "coming-soon";

  return (
    <article
      className={`rounded-xl border border-border bg-white p-4 shadow-[0_8px_24px_rgba(21,21,21,0.04)] transition-all duration-200 md:p-5 ${
        removing ? "pointer-events-none translate-y-1 opacity-0" : "opacity-100"
      }`}
    >
      <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 md:grid-cols-[112px_minmax(0,1.4fr)_auto_auto] md:items-center md:gap-6">
        <Link
          href={localizedPath(locale, `/products/${product.slug}`)}
          className="relative aspect-square overflow-hidden rounded-lg bg-surface"
        >
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt[locale]}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 88px, 112px"
          />
        </Link>

        <div className="min-w-0">
          {brandName ? (
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {brandName}
            </p>
          ) : null}
          <h2 className="mt-1 font-display text-base font-bold leading-snug text-foreground md:text-lg">
            <Link
              href={localizedPath(locale, `/products/${product.slug}`)}
              className="transition-opacity duration-200 hover:opacity-75"
            >
              {product.name[locale]}
            </Link>
          </h2>
          {product.sku ? (
            <p className="mt-1 text-xs text-muted-foreground">
              {dictionary.cart.sku}: {product.sku}
            </p>
          ) : null}
          {item.selectedOptions.map(({ optionId, valueId }) => {
            const option = product.options?.find((entry) => entry.id === optionId);
            const value = option?.values.find((entry) => entry.id === valueId);
            return option && value ? (
              <p key={optionId} className="mt-1 text-sm text-muted-foreground">
                {option.name[locale]}: {value.label[locale]}
              </p>
            ) : null;
          })}
          <p className="mt-2 text-sm font-semibold tabular-nums text-foreground md:hidden">
            {formatCurrency(product.price, product.currency, locale)}
          </p>
          <button
            type="button"
            onClick={onRemove}
            aria-label={dictionary.cart.removeAria.replace("{name}", product.name[locale])}
            className="mt-3 text-sm font-semibold text-muted-foreground underline-offset-2 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 md:hidden"
          >
            {dictionary.cart.remove}
          </button>
        </div>

        <div className="col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 md:col-span-1 md:flex-col md:items-center md:justify-center md:border-0 md:pt-0">
          <p className="hidden text-sm font-semibold tabular-nums text-foreground md:block">
            {formatCurrency(product.price, product.currency, locale)}
          </p>
          <QuantitySelector
            value={item.quantity}
            onChange={onQuantityChange}
            locale={locale}
            disabled={qtyDisabled}
            decreaseLabel={dictionary.cart.decreaseQty}
            increaseLabel={dictionary.cart.increaseQty}
            quantityLabel={dictionary.cart.quantity}
          />
          <button
            type="button"
            onClick={onRemove}
            aria-label={dictionary.cart.removeAria.replace("{name}", product.name[locale])}
            className="hidden text-sm font-semibold text-muted-foreground underline-offset-2 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 md:inline"
          >
            {dictionary.cart.remove}
          </button>
        </div>

        <div className="col-span-2 text-end md:col-span-1 md:min-w-[6.5rem]">
          <p className="text-xs text-muted-foreground md:hidden">{dictionary.cart.itemTotal}</p>
          <p className="text-base font-bold tabular-nums text-foreground md:text-lg">
            {formatCurrency(lineTotal, product.currency, locale)}
          </p>
        </div>
      </div>
    </article>
  );
}
