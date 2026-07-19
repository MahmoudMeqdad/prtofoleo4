import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function EmptyCart({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-white px-6 py-16 text-center shadow-[0_8px_30px_rgba(21,21,21,0.04)] md:py-20">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-surface text-foreground">
        <ShoppingBag className="h-7 w-7" aria-hidden />
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold text-foreground md:text-3xl">
        {dictionary.cart.emptyTitle}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {dictionary.cart.emptyDescription}
      </p>
      <Link
        href={localizedPath(locale, "/collections")}
        className="mt-8 inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-black px-7 text-sm font-bold !text-white transition-opacity duration-200 hover:opacity-90 hover:!text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 sm:w-auto"
      >
        <span className="text-white">{dictionary.cart.startShopping}</span>
      </Link>
    </div>
  );
}
