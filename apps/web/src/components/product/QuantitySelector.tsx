"use client";

import { Minus, Plus } from "lucide-react";
import type { Locale } from "@/i18n/config";

export function QuantitySelector({
  value,
  onChange,
  locale,
  max = 99,
  min = 1,
  disabled = false,
  decreaseLabel,
  increaseLabel,
  quantityLabel,
}: {
  value: number;
  onChange: (value: number) => void;
  locale: Locale;
  max?: number;
  min?: number;
  disabled?: boolean;
  decreaseLabel?: string;
  increaseLabel?: string;
  quantityLabel?: string;
}) {
  const safeMin = Math.max(1, Math.trunc(min));
  const safeMax = Math.max(safeMin, Math.trunc(max));
  const set = (next: number) => {
    if (disabled) return;
    onChange(Math.min(safeMax, Math.max(safeMin, Math.trunc(next || safeMin))));
  };
  const atMin = value <= safeMin;
  const atMax = value >= safeMax;
  const decreaseAria = decreaseLabel ?? (locale === "ar" ? "تقليل الكمية" : "Decrease quantity");
  const increaseAria = increaseLabel ?? (locale === "ar" ? "زيادة الكمية" : "Increase quantity");
  const qtyAria = quantityLabel ?? (locale === "ar" ? "الكمية" : "Quantity");

  return (
    <div
      className="inline-flex min-h-11 items-center rounded-full border border-border bg-white transition-colors duration-200 focus-within:border-foreground/40"
      role="group"
      aria-label={qtyAria}
    >
      <button
        type="button"
        className="grid min-h-11 min-w-11 place-items-center rounded-s-full text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        onClick={() => set(value - 1)}
        disabled={disabled || atMin}
        aria-label={decreaseAria}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <input
        aria-label={qtyAria}
        className="h-11 w-12 bg-transparent text-center text-sm font-bold tabular-nums text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-40"
        type="number"
        min={safeMin}
        max={safeMax}
        value={value}
        disabled={disabled}
        onChange={(event) => set(Number(event.target.value))}
        onBlur={() => set(value)}
      />
      <button
        type="button"
        className="grid min-h-11 min-w-11 place-items-center rounded-e-full text-foreground transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        onClick={() => set(value + 1)}
        disabled={disabled || atMax}
        aria-label={increaseAria}
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
