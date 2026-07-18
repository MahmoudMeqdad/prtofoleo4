"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { VelvetProduct } from "@/content/products";
import type { Locale } from "@/i18n/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProductGallery({ product, locale }: { product: VelvetProduct; locale: Locale }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const images = product.images;
  const move = useCallback(
    (direction: number) =>
      setActive((current) => (current + direction + images.length) % images.length),
    [images.length],
  );
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [move]);
  if (!images.length) return <div className="aspect-square bg-neutral-100" />;
  return (
    <div
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
        touchStart.current = null;
      }}
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          key={images[active].src}
          src={images[active].src}
          alt={images[active].alt[locale]}
          fill
          priority
          className={`object-contain p-[8%] ${reduced ? "" : "transition-opacity duration-300"}`}
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={locale === "ar" ? "الصورة السابقة" : "Previous image"}
              className="absolute start-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-black bg-white"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={locale === "ar" ? "الصورة التالية" : "Next image"}
              className="absolute end-5 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-black bg-white"
            >
              <ArrowRight />
            </button>
          </>
        )}
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            type="button"
            key={`${image.src}-${index}`}
            aria-label={`${locale === "ar" ? "عرض الصورة" : "View image"} ${index + 1}`}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className="relative h-20 w-20 shrink-0 border-2 bg-neutral-100 aria-pressed:border-black"
          >
            <Image src={image.src} alt="" fill className="object-contain p-2" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
