"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatCurrency } from "@/lib/currency";
import type { CustomerOrderDetails } from "@/lib/whatsapp-order";
import { DiscountCode } from "./DiscountCode";
import { FreeShippingProgress } from "./FreeShippingProgress";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(7),
  city: z.string().min(2),
  area: z.string().min(2),
  address: z.string().min(5),
  landmark: z.string().optional(),
  notes: z.string().optional(),
});

export function OrderSummary({
  locale,
  dictionary,
  subtotal,
  whatsappConfigured,
  submitting,
  onCheckout,
}: {
  locale: Locale;
  dictionary: Dictionary;
  subtotal: number;
  whatsappConfigured: boolean;
  submitting: boolean;
  onCheckout: (customer: CustomerOrderDetails) => void;
}) {
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

  const checkoutDisabled = !whatsappConfigured || submitting;
  const requiredFields = [
    { key: "fullName" as const, label: dictionary.cart.fullName },
    { key: "phone" as const, label: dictionary.cart.phone },
    { key: "city" as const, label: dictionary.cart.city },
    { key: "area" as const, label: dictionary.cart.area },
    { key: "address" as const, label: dictionary.cart.address },
  ];

  return (
    <aside className="h-fit rounded-xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(21,21,21,0.04)] md:p-6 lg:sticky lg:top-[calc(var(--utility-bar-height)+var(--main-header-height)+1.25rem)]">
      <h2 className="font-display text-xl font-bold text-foreground md:text-2xl">
        {dictionary.cart.orderSummary}
      </h2>

      <div className="mt-5">
        <FreeShippingProgress subtotal={subtotal} locale={locale} dictionary={dictionary} />
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">{dictionary.cart.subtotal}</dt>
          <dd className="font-medium tabular-nums text-foreground">
            {formatCurrency(subtotal, "ILS", locale)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">{dictionary.cart.discount}</dt>
          <dd className="font-medium tabular-nums text-foreground">
            {formatCurrency(0, "ILS", locale)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">{dictionary.cart.shipping}</dt>
          <dd className="text-end font-medium text-foreground">{dictionary.cart.shippingLater}</dd>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-base font-bold text-foreground">{dictionary.cart.total}</dt>
            <dd className="text-xl font-bold tabular-nums text-foreground">
              {formatCurrency(subtotal, "ILS", locale)}
            </dd>
          </div>
        </div>
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{dictionary.cart.deliveryNote}</p>

      <DiscountCode dictionary={dictionary} />

      <form onSubmit={handleSubmit(onCheckout)} className="mt-6 space-y-4" noValidate>
        <h3 className="text-sm font-bold text-foreground">{dictionary.cart.form}</h3>
        {requiredFields.map(({ key, label }) => (
          <label key={key} className="block text-sm font-semibold text-foreground">
            {label}
            <input
              {...register(key)}
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              className="mt-1.5 min-h-11 w-full rounded-md border border-border bg-white px-3 font-normal outline-none transition-colors duration-200 focus-visible:border-foreground/40"
            />
            {errors[key] ? (
              <span id={`${key}-error`} className="mt-1 block text-xs font-normal text-danger">
                {dictionary.cart.required}
              </span>
            ) : null}
          </label>
        ))}
        <label className="block text-sm font-semibold text-foreground">
          {dictionary.cart.landmark}
          <input
            {...register("landmark")}
            className="mt-1.5 min-h-11 w-full rounded-md border border-border bg-white px-3 font-normal outline-none transition-colors duration-200 focus-visible:border-foreground/40"
          />
        </label>
        <label className="block text-sm font-semibold text-foreground">
          {dictionary.cart.notes}
          <textarea
            {...register("notes")}
            rows={3}
            className="mt-1.5 w-full rounded-md border border-border bg-white p-3 font-normal outline-none transition-colors duration-200 focus-visible:border-foreground/40"
          />
        </label>

        {!whatsappConfigured ? (
          <p className="text-sm font-semibold text-danger">{dictionary.cart.configMissing}</p>
        ) : null}

        <button
          type="submit"
          disabled={checkoutDisabled}
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? dictionary.cart.placingOrder : dictionary.cart.checkout}
        </button>
      </form>

      <Link
        href={localizedPath(locale, "/collections")}
        className="mt-3 flex min-h-12 w-full items-center justify-center rounded-full border border-black px-6 text-sm font-bold text-foreground transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
      >
        {dictionary.cart.continueShopping}
      </Link>
    </aside>
  );
}
