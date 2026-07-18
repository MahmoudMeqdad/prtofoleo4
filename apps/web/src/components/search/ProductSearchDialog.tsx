"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/content/products";
import { getCollection } from "@/content/collections";
import { localizedPath } from "@/i18n/config";
import { useLocale } from "@/providers/LocaleProvider";

export function ProductSearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchProducts(query, locale);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[210] bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={locale === "ar" ? "بحث المنتجات" : "Product search"}
        className="mx-auto mt-[10vh] max-h-[80vh] max-w-3xl overflow-y-auto bg-white p-6 text-black"
      >
        <div className="flex gap-3">
          <label className="flex min-h-14 flex-1 items-center gap-3 border-b-2 border-black">
            <Search />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={locale === "ar" ? "ابحث عن منتج" : "Search products"}
              className="w-full bg-transparent text-xl outline-none"
            />
          </label>
          <button
            type="button"
            onClick={onClose}
            aria-label={locale === "ar" ? "إغلاق البحث" : "Close search"}
            className="grid h-12 w-12 place-items-center"
          >
            <X />
          </button>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {results.map((product) => {
            const collection = getCollection(product.collectionSlug);
            return (
              <Link
                key={product.id}
                href={localizedPath(locale, `/products/${product.slug}`)}
                onClick={onClose}
                className="grid grid-cols-[90px_1fr] gap-4 bg-neutral-100 p-3"
              >
                <span className="relative aspect-square">
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt[locale]}
                    fill
                    className="object-contain"
                    sizes="90px"
                  />
                </span>
                <span>
                  <strong className="block">{product.name[locale]}</strong>
                  <small>{collection?.name[locale]}</small>
                </span>
              </Link>
            );
          })}
        </div>
        {query && !results.length && (
          <p className="py-12 text-center">
            {locale === "ar" ? "لا توجد منتجات مطابقة." : "No matching products."}
          </p>
        )}
      </section>
    </div>
  );
}
