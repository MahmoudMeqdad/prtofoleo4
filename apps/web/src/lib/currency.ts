import type { Locale } from "@/i18n/config";

export function formatCurrency(amount: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-PS" : "en-PS", {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

export function roundMoney(amount: number) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}
