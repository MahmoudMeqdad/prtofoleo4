import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatCurrency } from "@/lib/currency";
import { getFreeShippingProgress } from "@/lib/cart-totals";

export function FreeShippingProgress({
  subtotal,
  locale,
  dictionary,
}: {
  subtotal: number;
  locale: Locale;
  dictionary: Dictionary;
}) {
  const { remaining, progress, qualified, threshold } = getFreeShippingProgress(subtotal);
  const message = qualified
    ? dictionary.cart.freeShippingQualified
    : dictionary.cart.freeShippingRemaining.replace(
        "{amount}",
        formatCurrency(remaining, "ILS", locale),
      );

  return (
    <div className="rounded-md bg-white/70 p-4">
      <p className="text-sm font-medium leading-relaxed text-foreground">{message}</p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-surface-strong"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label={dictionary.cart.freeShippingQualified}
      >
        <div
          className="h-full rounded-full bg-foreground transition-[width] duration-200"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      {!qualified ? (
        <p className="mt-2 text-xs text-muted-foreground">
          {formatCurrency(subtotal, "ILS", locale)} / {formatCurrency(threshold, "ILS", locale)}
        </p>
      ) : null}
    </div>
  );
}
