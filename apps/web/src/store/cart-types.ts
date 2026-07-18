export interface CartSelectedOption {
  optionId: string;
  valueId: string;
}

export interface CartItem {
  key: string;
  productId: string;
  productSlug: string;
  quantity: number;
  selectedOptions: CartSelectedOption[];
}

export function createCartItemKey(productId: string, selectedOptions: CartSelectedOption[]) {
  const optionKey = [...selectedOptions]
    .sort((a, b) => a.optionId.localeCompare(b.optionId))
    .map((option) => `${option.optionId}:${option.valueId}`)
    .join("|");
  return optionKey ? `${productId}|${optionKey}` : productId;
}

export function addCartLine(items: CartItem[], incoming: CartItem): CartItem[] {
  const existing = items.find((item) => item.key === incoming.key);
  if (!existing)
    return [...items, { ...incoming, quantity: Math.min(99, Math.max(1, incoming.quantity)) }];
  return items.map((item) =>
    item.key === incoming.key
      ? { ...item, quantity: Math.min(99, item.quantity + incoming.quantity) }
      : item,
  );
}

export function updateCartLineQuantity(items: CartItem[], key: string, quantity: number) {
  const safe = Math.min(99, Math.max(1, Math.trunc(quantity || 1)));
  return items.map((item) => (item.key === key ? { ...item, quantity: safe } : item));
}
