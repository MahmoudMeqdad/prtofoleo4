"use client";

import { Minus, Plus } from "lucide-react";
import type { Locale } from "@/i18n/config";

export function QuantitySelector({
  value,
  onChange,
  locale,
}: {
  value: number;
  onChange: (value: number) => void;
  locale: Locale;
}) {
  const set = (next: number) => onChange(Math.min(99, Math.max(1, Math.trunc(next || 1))));
  return (
    <div className="inline-flex min-h-12 items-center rounded-full border border-black/30 bg-white">
      <button
        type="button"
        className="grid min-h-12 min-w-12 place-items-center"
        onClick={() => set(value - 1)}
        aria-label={locale === "ar" ? "تقليل الكمية" : "Decrease quantity"}
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        aria-label={locale === "ar" ? "الكمية" : "Quantity"}
        className="h-12 w-12 bg-transparent text-center font-bold outline-none"
        type="number"
        min={1}
        max={99}
        value={value}
        onChange={(event) => set(Number(event.target.value))}
      />
      <button
        type="button"
        className="grid min-h-12 min-w-12 place-items-center"
        onClick={() => set(value + 1)}
        aria-label={locale === "ar" ? "زيادة الكمية" : "Increase quantity"}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
