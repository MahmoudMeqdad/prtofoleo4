"use client";

import { Container } from "@/components/ui/Container";
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
        <span className="truncate font-medium uppercase sm:hidden">IPLAY</span>
      </Container>
    </div>
  );
}
