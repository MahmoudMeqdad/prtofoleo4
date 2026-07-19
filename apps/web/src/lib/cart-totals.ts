import { FREE_SHIPPING_THRESHOLD } from "@/config/cart";
import type { CartItem } from "@/store/cart-types";
import { calculateCartSubtotal } from "@/lib/whatsapp-order";
import { roundMoney } from "@/lib/currency";

export function getCartSubtotal(items: CartItem[]) {
  return calculateCartSubtotal(items);
}

export function getCartTotalItems(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getFreeShippingProgress(subtotal: number) {
  const threshold = FREE_SHIPPING_THRESHOLD;
  const remaining = roundMoney(Math.max(0, threshold - subtotal));
  const progress = Math.min(1, threshold > 0 ? subtotal / threshold : 1);
  return {
    threshold,
    remaining,
    progress,
    qualified: remaining <= 0,
  };
}
