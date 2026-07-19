"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { Toast } from "@/components/ui/Toast";
import { ProductGallery } from "./ProductGallery";
import { QuantitySelector } from "./QuantitySelector";
import { getRelatedProducts, type VelvetProduct } from "@/content/products";
import { getCollection } from "@/content/collections";
import { localizedPath, type Locale } from "@/i18n/config";
import { formatCurrency } from "@/lib/currency";
import { useDictionary } from "@/providers/LocaleProvider";
import { createCartItemKey, type CartSelectedOption } from "@/store/cart-types";
import { useCartStore } from "@/store/cart-store";

const availability = {
  en: {
    "available-to-order": "Available to Order",
    limited: "Limited Availability",
    "coming-soon": "Coming Soon",
    unavailable: "Currently Unavailable",
  },
  ar: {
    "available-to-order": "متاح للطلب",
    limited: "توفر محدود",
    "coming-soon": "متاح قريبًا",
    unavailable: "غير متوفر حاليًا",
  },
};

export function ProductDetailView({ product, locale }: { product: VelvetProduct; locale: Locale }) {
  const dictionary = useDictionary();
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const dismissToast = useCallback(() => setToastVisible(false), []);
  const collection = getCollection(product.collectionSlug);
  const related = getRelatedProducts(product);
  const orderable =
    product.availability === "available-to-order" || product.availability === "limited";
  const add = (goToCart = false) => {
    const missing = product.options?.find((option) => option.required && !selected[option.id]);
    if (missing) {
      setError(
        locale === "ar" ? `يرجى اختيار ${missing.name.ar}` : `Please select ${missing.name.en}`,
      );
      return;
    }
    const selectedOptions: CartSelectedOption[] = Object.entries(selected).map(
      ([optionId, valueId]) => ({ optionId, valueId }),
    );
    addItem({
      key: createCartItemKey(product.id, selectedOptions),
      productId: product.id,
      productSlug: product.slug,
      quantity,
      selectedOptions,
    });
    setError("");
    setToastVisible(true);
    if (goToCart) window.location.href = localizedPath(locale, "/cart");
  };
  return (
    <PublicPageShell>
      <div className="bg-white px-5 pb-24 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+3rem)] text-black md:px-[6vw]">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <ProductGallery product={product} locale={locale} />
          <section className="flex flex-col justify-center lg:sticky lg:top-32 lg:self-start lg:py-12">
            <p className="text-sm font-bold uppercase tracking-[.16em]">
              {collection?.name[locale]}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.5rem)] font-black leading-[.9] tracking-[-.04em]">
              {product.name[locale]}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              {product.shortDescription[locale]}
            </p>
            <p className="mt-7 text-3xl font-black">
              {formatCurrency(product.price, product.currency, locale)}
            </p>
            <p className="mt-3 font-bold">{availability[locale][product.availability]}</p>
            {product.sku && <p className="mt-2 text-sm text-neutral-500">SKU: {product.sku}</p>}
            {product.ageRange && (
              <p className="mt-2 text-sm text-neutral-600">{product.ageRange[locale]}</p>
            )}
            {product.options?.map((option) => (
              <fieldset key={option.id} className="mt-7">
                <legend className="mb-3 font-bold">
                  {option.name[locale]}
                  {option.required ? " *" : ""}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      type="button"
                      key={value.id}
                      aria-pressed={selected[option.id] === value.id}
                      onClick={() =>
                        setSelected((current) => ({ ...current, [option.id]: value.id }))
                      }
                      className="min-h-12 rounded-full border border-black px-5 font-semibold aria-pressed:bg-black aria-pressed:text-white"
                    >
                      {value.label[locale]}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            {error && (
              <p className="mt-3 text-sm font-semibold text-red-700" role="alert">
                {error}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} locale={locale} />
              <button
                type="button"
                disabled={!orderable}
                onClick={() => add()}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-black px-7 font-bold text-white disabled:opacity-40"
              >
                <ShoppingBag className="h-5 w-5" />
                {dictionary.cart.addToCart}
              </button>
            </div>
            <button
              type="button"
              disabled={!orderable}
              onClick={() => add(true)}
              className="mt-3 min-h-12 rounded-full border-2 border-black px-7 font-bold disabled:opacity-40"
            >
              {dictionary.cart.orderWhatsApp}
            </button>
            <p className="mt-5 text-sm leading-6 text-neutral-600">
              {dictionary.cart.deliveryNote}
            </p>
          </section>
        </div>
        <Toast
          message={dictionary.cart.addedToCart}
          visible={toastVisible}
          onDismiss={dismissToast}
        />
        <div className="mx-auto mt-24 max-w-5xl border-t pt-16">
          <h2 className="text-4xl font-black">{locale === "ar" ? "المميزات" : "Features"}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {product.features[locale].map((feature) => (
              <li key={feature} className="border-b py-4 text-lg">
                {feature}
              </li>
            ))}
          </ul>
          {product.contents && (
            <>
              <h2 className="mt-16 text-4xl font-black">
                {locale === "ar" ? "محتويات العبوة" : "What’s Included"}
              </h2>
              <ul className="mt-6 list-inside list-disc space-y-3">
                {product.contents[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <section className="mx-auto mt-24 max-w-[1500px]">
          <h2 className="text-4xl font-black">
            {locale === "ar" ? "منتجات ذات صلة" : "Related Products"}
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={localizedPath(locale, `/products/${item.slug}`)}
                className="group bg-neutral-100 p-5"
              >
                <span className="relative mx-auto block h-[150px] w-[365px] max-w-full overflow-hidden">
                  <Image
                    src={item.images[0].src}
                    alt={item.images[0].alt[locale]}
                    width={365}
                    height={150}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    sizes="365px"
                  />
                </span>
                <strong className="mt-4 block text-lg">{item.name[locale]}</strong>
                <span className="mt-2 block">
                  {formatCurrency(item.price, item.currency, locale)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
