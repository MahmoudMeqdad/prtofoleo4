import type { Locale } from "../i18n/config";
import type { CartItem } from "../store/cart-types";
import { getProduct } from "../content/products/index";
import { roundMoney } from "./currency";
import {
  buildEncodedWhatsAppUrl,
  buildLocalizedOrderMessage,
  type ResolvedOrderItem,
} from "./whatsapp-core";

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  address: string;
  landmark?: string;
  notes?: string;
}

export function calculateCartSubtotal(items: CartItem[]) {
  return roundMoney(
    items.reduce(
      (sum, item) => sum + (getProduct(item.productSlug)?.price ?? 0) * item.quantity,
      0,
    ),
  );
}

export function buildWhatsAppOrderMessage({
  locale,
  cartItems,
  customer,
  subtotal,
}: {
  locale: Locale;
  cartItems: CartItem[];
  customer: CustomerOrderDetails;
  subtotal: number;
}) {
  const items: ResolvedOrderItem[] = cartItems.flatMap((item) => {
    const product = getProduct(item.productSlug);
    if (!product) return [];
    const options = item.selectedOptions.map((selected) => {
      const option = product.options?.find((entry) => entry.id === selected.optionId);
      const value = option?.values.find((entry) => entry.id === selected.valueId);
      return `${option?.name[locale] ?? selected.optionId}: ${value?.label[locale] ?? selected.valueId}`;
    });
    return [
      {
        name: product.name[locale],
        options,
        quantity: item.quantity,
        price: product.price,
        currency: product.currency,
      },
    ];
  });
  return buildLocalizedOrderMessage({ locale, items, customer, subtotal });
}

export function buildWhatsAppOrderUrl(number: string, message: string) {
  return buildEncodedWhatsAppUrl(number, message);
}
