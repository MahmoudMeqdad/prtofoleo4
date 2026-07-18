"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { getProduct } from "@/content/products";
import { localizedPath } from "@/i18n/config";
import { formatCurrency } from "@/lib/currency";
import { calculateCartSubtotal } from "@/lib/whatsapp-order";
import { useCartStore } from "@/store/cart-store";
import { useLocale } from "@/providers/LocaleProvider";

export function CartDrawer() {
  const locale = useLocale();
  const { items, drawerOpen, setDrawerOpen, removeItem, updateQuantity } = useCartStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  const validItems = items
    .map((item) => ({ item, product: getProduct(item.productSlug) }))
    .filter((entry) => entry.product);
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [drawerOpen, setDrawerOpen]);
  if (!drawerOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/45"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setDrawerOpen(false);
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={locale === "ar" ? "سلتك" : "Your Cart"}
        className="absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-white p-6 text-black shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black">{locale === "ar" ? "سلتك" : "Your Cart"}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label={locale === "ar" ? "إغلاق السلة" : "Close cart"}
            className="grid h-12 w-12 place-items-center rounded-full border"
          >
            <X />
          </button>
        </div>
        <div className="mt-8 flex-1 space-y-6 overflow-y-auto">
          {validItems.length === 0 ? (
            <p>{locale === "ar" ? "سلتك فارغة." : "Your cart is empty."}</p>
          ) : (
            validItems.map(
              ({ item, product }) =>
                product && (
                  <article key={item.key} className="grid grid-cols-[88px_1fr] gap-4 border-b pb-6">
                    <div className="relative aspect-square bg-neutral-100">
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt[locale]}
                        fill
                        className="object-contain p-2"
                        sizes="88px"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold">{product.name[locale]}</h3>
                      <p className="mt-1 text-sm">
                        {formatCurrency(product.price, product.currency, locale)}
                      </p>
                      {item.selectedOptions.map(({ optionId, valueId }) => {
                        const option = product.options?.find((entry) => entry.id === optionId);
                        const value = option?.values.find((entry) => entry.id === valueId);
                        return option && value ? (
                          <p key={optionId} className="mt-1 text-sm text-neutral-600">
                            {option.name[locale]}: {value.label[locale]}
                          </p>
                        ) : null;
                      })}
                      <div className="mt-3 scale-90 origin-start">
                        <QuantitySelector
                          value={item.quantity}
                          onChange={(value) => updateQuantity(item.key, value)}
                          locale={locale}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="mt-3 text-sm underline"
                      >
                        {locale === "ar" ? `إزالة ${product.name.ar}` : `Remove ${product.name.en}`}
                      </button>
                    </div>
                  </article>
                ),
            )
          )}
        </div>
        <div className="border-t pt-5">
          <div className="flex justify-between text-lg font-black">
            <span>{locale === "ar" ? "الإجمالي التقديري" : "Estimated Subtotal"}</span>
            <span>{formatCurrency(calculateCartSubtotal(items), "ILS", locale)}</span>
          </div>
          <Link
            href={localizedPath(locale, "/cart")}
            onClick={() => setDrawerOpen(false)}
            className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-black font-bold text-white"
          >
            {locale === "ar" ? "عرض السلة" : "View Cart"}
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="mt-3 w-full min-h-12 rounded-full border border-black font-bold"
          >
            {locale === "ar" ? "متابعة التسوق" : "Continue Shopping"}
          </button>
        </div>
      </aside>
    </div>
  );
}
