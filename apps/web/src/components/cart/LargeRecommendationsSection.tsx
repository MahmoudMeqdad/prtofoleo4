import Image from "next/image";
import Link from "next/link";
import type { VelvetProduct } from "@/content/products/types";
import { localizedPath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { formatCurrency } from "@/lib/currency";

export function LargeRecommendationsSection({
  products,
  locale,
  dictionary,
}: {
  products: VelvetProduct[];
  locale: Locale;
  dictionary: Dictionary;
}) {
  if (!products.length) return null;

  return (
    <section className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
      <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {dictionary.cart.needAnythingElse}
      </h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <Link
            key={product.id}
            href={localizedPath(locale, `/products/${product.slug}`)}
            className="group overflow-hidden rounded-xl border border-border bg-white shadow-[0_8px_24px_rgba(21,21,21,0.04)] transition-opacity duration-200 hover:opacity-95"
          >
            <span className="relative block aspect-[4/3] bg-surface">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt[locale]}
                fill
                className="object-contain p-4 transition-transform duration-200 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {product.isFeatured ? (
                <span className="absolute start-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-bold text-white">
                  {dictionary.cart.featured}
                </span>
              ) : null}
            </span>
            <span className="block p-5">
              <strong className="block font-display text-lg font-bold text-foreground">
                {product.name[locale]}
              </strong>
              <span className="mt-2 line-clamp-3 block text-sm leading-relaxed text-muted-foreground">
                {product.shortDescription[locale]}
              </span>
              <span className="mt-4 block text-base font-bold tabular-nums text-foreground">
                {formatCurrency(product.price, product.currency, locale)}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
