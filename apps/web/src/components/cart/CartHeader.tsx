import type { Dictionary } from "@/i18n/dictionaries";

function formatItemsInCart(count: number, dictionary: Dictionary) {
  if (count === 1) return dictionary.cart.itemsCountOne;
  return dictionary.cart.itemsCount.replace("{count}", String(count));
}

export function CartHeader({
  dictionary,
  itemCount,
  onClearCart,
}: {
  dictionary: Dictionary;
  itemCount: number;
  onClearCart?: () => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {dictionary.cart.title}
        </h1>
        {itemCount > 0 ? (
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {formatItemsInCart(itemCount, dictionary)}
          </p>
        ) : null}
      </div>
      {itemCount > 0 && onClearCart ? (
        <button
          type="button"
          onClick={onClearCart}
          className="min-h-10 rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
        >
          {dictionary.cart.clearCart}
        </button>
      ) : null}
    </header>
  );
}
