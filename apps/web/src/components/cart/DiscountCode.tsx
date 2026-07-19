"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

type DiscountFeedback = { type: "error" | "info"; message: string } | null;

export function DiscountCode({ dictionary }: { dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<DiscountFeedback>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setFeedback({ type: "error", message: dictionary.cart.discountCodeEmpty });
      return;
    }
    setLoading(true);
    setFeedback(null);
    // No discount engine in the project yet — keep the UI ready without fake savings.
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    setLoading(false);
    setFeedback({ type: "info", message: dictionary.cart.discountCodeUnavailable });
  };

  return (
    <div className="border-t border-border pt-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 text-start text-sm font-semibold text-foreground transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span>{dictionary.cart.discountCodeTitle}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <form onSubmit={onSubmit} className="mt-4 space-y-3" noValidate>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
                if (feedback) setFeedback(null);
              }}
              placeholder={dictionary.cart.discountCodePlaceholder}
              autoComplete="off"
              disabled={loading}
              className="min-h-11 w-full flex-1 rounded-md border border-border bg-white px-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground focus-visible:border-foreground/40 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-black px-5 text-sm font-bold text-foreground transition-opacity duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? dictionary.cart.discountCodeApplying : dictionary.cart.discountCodeApply}
            </button>
          </div>
          {feedback ? (
            <p
              role="status"
              className={`text-sm ${feedback.type === "error" ? "text-danger" : "text-muted-foreground"}`}
            >
              {feedback.message}
            </p>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}
