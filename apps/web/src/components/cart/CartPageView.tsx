"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { getProduct } from "@/content/products";
import { localizedPath, type Locale } from "@/i18n/config";
import { formatCurrency } from "@/lib/currency";
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  calculateCartSubtotal,
  type CustomerOrderDetails,
} from "@/lib/whatsapp-order";
import { useCartStore } from "@/store/cart-store";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  city: z.string().min(2),
  area: z.string().min(2),
  address: z.string().min(5),
  landmark: z.string().optional(),
  notes: z.string().optional(),
});

export function CartPageView({ locale }: { locale: Locale }) {
  const { items, hydrated, removeItem, updateQuantity } = useCartStore();
  const entries = items
    .map((item) => ({ item, product: getProduct(item.productSlug) }))
    .filter((entry) => entry.product);
  const subtotal = calculateCartSubtotal(items);
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const configured = /^\d{8,15}$/.test(number);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerOrderDetails>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      city: "",
      area: "",
      address: "",
      landmark: "",
      notes: "",
    },
    shouldFocusError: true,
  });
  const submit = (customer: CustomerOrderDetails) => {
    if (!entries.length || !configured) return;
    const message = buildWhatsAppOrderMessage({ locale, cartItems: items, customer, subtotal });
    const url = buildWhatsAppOrderUrl(number, message);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };
  const labels =
    locale === "ar"
      ? {
          title: "سلتك",
          empty: "سلتك فارغة.",
          subtotal: "الإجمالي التقديري",
          form: "معلومات التوصيل",
          name: "الاسم الكامل",
          phone: "رقم الهاتف",
          city: "المدينة",
          area: "المنطقة",
          address: "عنوان التوصيل",
          landmark: "علامة مميزة قريبة",
          notes: "ملاحظات الطلب",
          order: "إرسال الطلب عبر واتساب",
          required: "هذا الحقل مطلوب",
          delivery: "سيتم تأكيد رسوم التوصيل عبر واتساب.",
          continue: "متابعة التسوق",
          config: "رقم واتساب التجاري غير مضبوط.",
        }
      : {
          title: "Your Cart",
          empty: "Your cart is empty.",
          subtotal: "Estimated Subtotal",
          form: "Delivery Information",
          name: "Full name",
          phone: "Phone number",
          city: "City",
          area: "Area",
          address: "Delivery address",
          landmark: "Nearby landmark",
          notes: "Order notes",
          order: "Order on WhatsApp",
          required: "This field is required",
          delivery: "Delivery fees will be confirmed through WhatsApp.",
          continue: "Continue Shopping",
          config: "The business WhatsApp number is not configured.",
        };
  return (
    <PublicPageShell>
      <main className="min-h-screen bg-white px-5 pb-24 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+3rem)] text-black md:px-[7vw]">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl font-black md:text-7xl">{labels.title}</h1>
          {!hydrated ? (
            <div className="mt-12 h-40 animate-pulse bg-neutral-100" />
          ) : entries.length === 0 ? (
            <div className="mt-12 border-y py-20 text-center">
              <p className="text-xl">{labels.empty}</p>
              <Link
                href={localizedPath(locale, "/collections")}
                className="mt-6 inline-flex rounded-full bg-black px-7 py-4 font-bold text-white"
              >
                {labels.continue}
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
              <section className="space-y-7">
                {entries.map(
                  ({ item, product }) =>
                    product && (
                      <article
                        key={item.key}
                        className="grid grid-cols-[120px_1fr] gap-5 border-b pb-7"
                      >
                        <div className="relative aspect-square bg-neutral-100">
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt[locale]}
                            fill
                            className="object-contain p-3"
                            sizes="120px"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-black">{product.name[locale]}</h2>
                          <p className="mt-2">
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
                          <div className="mt-4">
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(value) => updateQuantity(item.key, value)}
                              locale={locale}
                            />
                          </div>
                          <p className="mt-3 font-bold">
                            {formatCurrency(
                              product.price * item.quantity,
                              product.currency,
                              locale,
                            )}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            className="mt-3 underline"
                          >
                            {locale === "ar" ? "إزالة" : "Remove"}
                          </button>
                        </div>
                      </article>
                    ),
                )}
                <div className="flex justify-between text-2xl font-black">
                  <span>{labels.subtotal}</span>
                  <span>{formatCurrency(subtotal, "ILS", locale)}</span>
                </div>
                <p>{labels.delivery}</p>
              </section>
              <form
                onSubmit={handleSubmit(submit)}
                className="bg-neutral-100 p-6 md:p-8"
                noValidate
              >
                <h2 className="text-3xl font-black">{labels.form}</h2>
                <div className="mt-7 space-y-5">
                  {(["fullName", "phone", "city", "area", "address"] as const).map((field) => {
                    const fieldLabel = labels[field === "fullName" ? "name" : field];
                    return (
                      <label key={field} className="block font-bold">
                        {fieldLabel}
                        <input
                          {...register(field)}
                          aria-invalid={Boolean(errors[field])}
                          aria-describedby={errors[field] ? `${field}-error` : undefined}
                          className="mt-2 min-h-12 w-full border border-black bg-white px-4 font-normal"
                        />
                        {errors[field] && (
                          <span id={`${field}-error`} className="mt-1 block text-sm text-red-700">
                            {labels.required}
                          </span>
                        )}
                      </label>
                    );
                  })}
                  <label className="block font-bold">
                    {labels.landmark}
                    <input
                      {...register("landmark")}
                      className="mt-2 min-h-12 w-full border border-black bg-white px-4 font-normal"
                    />
                  </label>
                  <label className="block font-bold">
                    {labels.notes}
                    <textarea
                      {...register("notes")}
                      rows={4}
                      className="mt-2 w-full border border-black bg-white p-4 font-normal"
                    />
                  </label>
                </div>
                {!configured && (
                  <p className="mt-5 text-sm font-bold text-red-700">{labels.config}</p>
                )}
                <button
                  type="submit"
                  disabled={!configured || !entries.length}
                  className="mt-7 min-h-14 w-full rounded-full bg-[#1f9d55] px-6 font-black text-white disabled:opacity-40"
                >
                  {labels.order}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </PublicPageShell>
  );
}
