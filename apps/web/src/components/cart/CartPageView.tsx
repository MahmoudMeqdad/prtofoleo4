"use client";

import { useCallback, useState } from "react";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { getCartRecommendations, getProduct } from "@/content/products";
import type { Locale } from "@/i18n/config";
import { getCartSubtotal, getCartTotalItems } from "@/lib/cart-totals";
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  type CustomerOrderDetails,
} from "@/lib/whatsapp-order";
import { useDictionary } from "@/providers/LocaleProvider";
import { useCartStore } from "@/store/cart-store";
import { CartHeader } from "./CartHeader";
import { CartItemsList } from "./CartItemsList";
import { CartRecommendations } from "./CartRecommendations";
import { CartSkeleton } from "./CartSkeleton";
import { EmptyCart } from "./EmptyCart";
import { LargeRecommendationsSection } from "./LargeRecommendationsSection";
import { OrderSummary } from "./OrderSummary";

export function CartPageView({ locale }: { locale: Locale }) {
  const dictionary = useDictionary();
  const { items, hydrated, removeItem, updateQuantity, clearCart } = useCartStore();
  const [removingKeys, setRemovingKeys] = useState<Set<string>>(() => new Set());
  const [submitting, setSubmitting] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const entries = items
    .map((item) => {
      const product = getProduct(item.productSlug);
      return product ? { item, product } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const itemCount = getCartTotalItems(entries.map((entry) => entry.item));
  const subtotal = getCartSubtotal(entries.map((entry) => entry.item));
  const excludeIds = entries.map((entry) => entry.product.id);
  const sideRecommendations = getCartRecommendations(excludeIds, 4);
  const largeRecommendations = getCartRecommendations(excludeIds, 3);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappConfigured = /^\d{8,15}$/.test(whatsappNumber);

  const handleQuantityChange = useCallback(
    (key: string, quantity: number) => {
      try {
        setUpdateError(null);
        updateQuantity(key, quantity);
      } catch {
        setUpdateError(dictionary.cart.updateError);
      }
    },
    [dictionary.cart.updateError, updateQuantity],
  );

  const handleRemove = useCallback(
    (key: string) => {
      setUpdateError(null);
      setRemovingKeys((prev) => new Set(prev).add(key));
      window.setTimeout(() => {
        try {
          removeItem(key);
        } catch {
          setUpdateError(dictionary.cart.updateError);
        } finally {
          setRemovingKeys((prev) => {
            const next = new Set(prev);
            next.delete(key);
            return next;
          });
        }
      }, 200);
    },
    [dictionary.cart.updateError, removeItem],
  );

  const handleClearCart = useCallback(() => {
    setUpdateError(null);
    clearCart();
  }, [clearCart]);

  const handleCheckout = useCallback(
    (customer: CustomerOrderDetails) => {
      if (!entries.length || !whatsappConfigured || submitting) return;
      setSubmitting(true);
      try {
        const cartItems = entries.map((entry) => entry.item);
        const message = buildWhatsAppOrderMessage({
          locale,
          cartItems,
          customer,
          subtotal,
        });
        const url = buildWhatsAppOrderUrl(whatsappNumber, message);
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      } finally {
        window.setTimeout(() => setSubmitting(false), 600);
      }
    },
    [entries, locale, submitting, subtotal, whatsappConfigured, whatsappNumber],
  );

  return (
    <PublicPageShell>
      <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f7f7f3_0%,#ffffff_38%,#ffffff_100%)] px-5 pb-20 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] text-foreground md:px-[7vw] md:pb-24">
        <div className="mx-auto max-w-6xl">
          {!hydrated ? (
            <>
              <CartHeader dictionary={dictionary} itemCount={0} />
              <CartSkeleton />
            </>
          ) : entries.length === 0 ? (
            <>
              <CartHeader dictionary={dictionary} itemCount={0} />
              <div className="mt-8">
                <EmptyCart locale={locale} dictionary={dictionary} />
              </div>
              <LargeRecommendationsSection
                products={largeRecommendations}
                locale={locale}
                dictionary={dictionary}
              />
            </>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
                <div className="min-w-0 space-y-6">
                  <CartHeader
                    dictionary={dictionary}
                    itemCount={itemCount}
                    onClearCart={handleClearCart}
                  />
                  {updateError ? (
                    <p role="alert" className="text-sm font-medium text-danger">
                      {updateError}
                    </p>
                  ) : null}
                  <CartItemsList
                    entries={entries}
                    locale={locale}
                    dictionary={dictionary}
                    removingKeys={removingKeys}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                  <CartRecommendations
                    products={sideRecommendations}
                    locale={locale}
                    dictionary={dictionary}
                  />
                </div>
                <div className="min-w-0">
                  <OrderSummary
                    locale={locale}
                    dictionary={dictionary}
                    subtotal={subtotal}
                    whatsappConfigured={whatsappConfigured}
                    submitting={submitting}
                    onCheckout={handleCheckout}
                  />
                </div>
              </div>
              <LargeRecommendationsSection
                products={largeRecommendations}
                locale={locale}
                dictionary={dictionary}
              />
            </>
          )}
        </div>
      </div>
    </PublicPageShell>
  );
}
