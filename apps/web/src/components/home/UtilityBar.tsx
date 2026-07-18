"use client";

import { Container } from "@/components/ui/Container";
import { BRAND_NAME } from "@/config/brand";
import { useDictionary } from "@/providers/LocaleProvider";

export function UtilityBar() {
  const dictionary = useDictionary();

  return (
    <div
      className="w-full border-b border-border/60 bg-white text-foreground"
      style={{ height: "var(--utility-bar-height)" }}
    >
      <Container className="flex h-full items-center justify-between gap-4 text-xs tracking-wide">
        <span className="hidden truncate font-medium uppercase sm:inline">
          {dictionary.utility.message}
        </span>
        <span className="truncate font-medium sm:hidden">{BRAND_NAME}</span>
      </Container>
    </div>
  );
}
