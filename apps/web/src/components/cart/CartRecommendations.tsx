"use client";

import Image from "next/image";
import Link from "next/link";
import type { VelvetProduct } from "@/content/products/types";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatCurrency } from "@/lib/currency";
import { createCartItemKey } from "@/store/cart-types";
import { useCartStore } from "@/store/cart-store";

function hasRequiredOptions(product: VelvetProduct) {
  return Boolean(product.options?.some((option) => option.required));
}

export function CartRecommendations({
  products,
  locale,
  dictionary,
}: {
  products: VelvetProduct[];
  locale: Locale;
  dictionary: Dictionary;
}) {
  const addItem = useCartStore((state) => state.addItem);

  if (!products.length) return null;

  return (
    <section className="mt-6">
      <h3 className="font-display text-base font-bold text-foreground md:text-lg">
        {dictionary.cart.youMayAlsoLike}
      </h3>
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {products.slice(0, 4).map((product) => {
          const needsOptions = hasRequiredOptions(product);
          const href = localizedPath(locale, `/products/${product.slug}`);

          return (
            <li
              key={product.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-[0_8px_24px_rgba(21,21,21,0.05)]"
            >
              <Link href={href} className="relative block aspect-[4/3] bg-surface sm:aspect-[5/4]">
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt[locale]}
                  fill
                  className="object-contain p-5 sm:p-6"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
                <Link
                  href={href}
                  className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-opacity duration-200 hover:opacity-75 sm:text-lg"
                >
                  {product.name[locale]}
                </Link>
                <p className="text-sm font-semibold tabular-nums text-foreground">
                  {formatCurrency(product.price, product.currency, locale)}
                </p>
                {needsOptions ? (
                  <Link
                    href={href}
                    className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full border border-black px-4 text-sm font-bold text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
                  >
                    {dictionary.cart.add}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        key: createCartItemKey(product.id, []),
                        productId: product.id,
                        productSlug: product.slug,
                        quantity: 1,
                        selectedOptions: [],
                      })
                    }
                    className="mt-auto inline-flex min-h-11 items-center justify-center rounded-full bg-black px-4 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
                  >
                    {dictionary.cart.add}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
