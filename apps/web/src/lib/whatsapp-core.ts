import type { Locale } from "../i18n/config.ts";
import { formatCurrency, roundMoney } from "./currency.ts";

export interface ResolvedOrderItem {
  name: string;
  options: string[];
  quantity: number;
  price: number;
  currency: string;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  address: string;
  landmark?: string;
  notes?: string;
}

export function calculateResolvedSubtotal(items: ResolvedOrderItem[]) {
  return roundMoney(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
}

export function buildLocalizedOrderMessage({
  locale,
  items,
  customer,
  subtotal,
}: {
  locale: Locale;
  items: ResolvedOrderItem[];
  customer: OrderCustomer;
  subtotal: number;
}) {
  const ar = locale === "ar";
  const lines = [
    ar ? "طلب جديد من Velvet Kids" : "New Velvet Kids Order",
    "",
    ar ? "بيانات العميل" : "Customer Details",
    `${ar ? "الاسم" : "Name"}: ${customer.fullName}`,
    `${ar ? "رقم الهاتف" : "Phone"}: ${customer.phone}`,
    `${ar ? "المدينة" : "City"}: ${customer.city}`,
    `${ar ? "المنطقة" : "Area"}: ${customer.area}`,
    `${ar ? "العنوان" : "Address"}: ${customer.address}`,
  ];
  if (customer.landmark?.trim())
    lines.push(`${ar ? "علامة مميزة" : "Landmark"}: ${customer.landmark.trim()}`);
  lines.push("", ar ? "المنتجات" : "Order Items", "");
  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    if (item.options.length)
      lines.push(`${ar ? "الخيارات" : "Options"}: ${item.options.join(", ")}`);
    lines.push(
      `${ar ? "الكمية" : "Quantity"}: ${item.quantity}`,
      `${ar ? "سعر الوحدة" : "Unit Price"}: ${formatCurrency(item.price, item.currency, locale)}`,
      `${ar ? "الإجمالي" : "Item Total"}: ${formatCurrency(item.price * item.quantity, item.currency, locale)}`,
      "",
    );
  });
  lines.push(
    `${ar ? "الإجمالي التقديري" : "Estimated Subtotal"}: ${formatCurrency(subtotal, "ILS", locale)}`,
  );
  if (customer.notes?.trim())
    lines.push("", `${ar ? "الملاحظات" : "Notes"}: ${customer.notes.trim()}`);
  lines.push(
    "",
    ar
      ? "يرجى تأكيد توفر المنتجات ورسوم التوصيل وموعد التسليم."
      : "Please confirm product availability, delivery fees and delivery time.",
  );
  return lines.join("\n");
}

export function buildEncodedWhatsAppUrl(number: string, message: string) {
  if (!/^\d{8,15}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
