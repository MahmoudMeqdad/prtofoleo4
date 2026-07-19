"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { outdoorFun } from "@/content/collections/outdoor-fun";
import { getProductForShowcase } from "@/content/products";
import type { CollectionContent, CollectionStorySection } from "@/content/collections";
import { t } from "@/content/locale";
import { localizedPath, type Locale } from "@/i18n/config";
import styles from "./OutdoorFunShowcaseView.module.css";

export function CollectionProductShowcaseView({
  locale,
  collection,
  cardImageScale = 0.8,
  hideRelatedTitle = true,
}: {
  locale: Locale;
  collection: CollectionContent;
  cardImageScale?: number;
  hideRelatedTitle?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseRef = useRef<HTMLElement>(null);
  const productRailRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<number | null>(null);
  const overviewProduct: CollectionStorySection = {
    id: `${collection.id}-overview`,
    layout: "editorial",
    title: collection.name,
    description: collection.introduction,
    media: {
      desktop: collection.hero.desktop,
      mobile: collection.hero.mobile,
      type: collection.hero.type,
      poster: collection.hero.poster,
      alt: collection.name,
    },
  };
  const products =
    collection.sections.length >= 4
      ? collection.sections
      : [...collection.sections, overviewProduct];
  const active = products[activeIndex];
  const activeProduct = getProductForShowcase(
    products.map((section) => section.id),
    active.id,
  );
  const collectionName = t(collection.name, locale);
  const displayName = collectionName.toLocaleUpperCase(locale);
  const titleId = `${collection.slug}-title`;
  const relatedTitleId = `${collection.slug}-related-products-title`;

  const selectProduct = useCallback(
    (index: number) => {
      setActiveIndex((index + products.length) % products.length);
    },
    [products.length],
  );

  const move = useCallback(
    (direction: -1 | 1) => selectProduct(activeIndex + direction),
    [activeIndex, selectProduct],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move]);

  useEffect(() => {
    const rail = productRailRef.current;
    const card = cardRefs.current[activeIndex];
    if (!rail || !card) return;

    const targetLeft = card.offsetLeft - (rail.clientWidth - card.clientWidth) / 2;
    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);

    rail.scrollTo({
      left: Math.min(Math.max(0, targetLeft), maxScroll),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, reducedMotion, products.length]);

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <PublicPageShell>
      <div
        className={styles.page}
        style={
          {
            "--card-image-scale": cardImageScale,
            "--card-columns": 2,
          } as CSSProperties
        }
      >
        <section className={styles.hero} aria-labelledby={titleId}>
          <Image
            src={collection.hero.desktop}
            alt={`${collectionName} collection`}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroShade} />
          <motion.h1
            id={titleId}
            className={styles.heroTitle}
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {displayName}
          </motion.h1>
          <motion.div
            className={styles.scrollCue}
            animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <span />
          </motion.div>
        </section>

        <section
          ref={showcaseRef}
          className={styles.showcase}
          aria-label={`${collectionName} products`}
          onTouchStart={(event) => {
            touchStart.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
            touchStart.current = null;
          }}
        >
          <button
            className={`${styles.navButton} ${styles.previous}`}
            onClick={() => move(-1)}
            aria-label={`Previous ${collectionName} product`}
          >
            <ArrowLeft aria-hidden="true" />
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              className={styles.product}
              initial={reducedMotion ? false : { opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -20 }}
              transition={transition}
            >
              <div className={styles.productImageWrap}>
                <Image
                  src={active.media.desktop}
                  alt={t(active.media.alt, locale)}
                  fill
                  sizes="(max-width: 768px) 86vw, 720px"
                  className={styles.productImage}
                />
              </div>
              <p className={styles.eyebrow}>{displayName}</p>
              <h2 className={styles.productTitle}>{t(active.title, locale)}</h2>
              <p className={styles.description}>{t(active.description, locale)}</p>
              <Link
                href={
                  activeProduct
                    ? localizedPath(locale, `/products/${activeProduct.slug}`)
                    : localizedPath(locale, "/contact")
                }
                className={styles.cta}
              >
                <span>
                  {activeProduct
                    ? locale === "ar"
                      ? "عرض المنتج"
                      : "View Product"
                    : locale === "ar"
                      ? "أين تشتري"
                      : "Where To Buy"}
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </AnimatePresence>

          <button
            className={`${styles.navButton} ${styles.next}`}
            onClick={() => move(1)}
            aria-label={`Next ${collectionName} product`}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </section>

        <section
          className={`${styles.related} ${hideRelatedTitle ? styles.relatedWithoutTitle : ""}`}
          aria-labelledby={hideRelatedTitle ? undefined : relatedTitleId}
          aria-label={hideRelatedTitle ? `${collectionName} products` : undefined}
        >
          {!hideRelatedTitle && (
            <h2 id={relatedTitleId} className={styles.relatedTitle}>
              Explore {collectionName}
            </h2>
          )}
          <div
            ref={productRailRef}
            className={styles.productRail}
            role="list"
            aria-label={`${collectionName} product list`}
          >
            {products.map((product, index) => (
              <button
                type="button"
                key={product.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={styles.card}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => {
                  selectProduct(index);
                  showcaseRef.current?.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "center",
                  });
                }}
              >
                <span className={styles.cardImage}>
                  <Image
                    src={product.media.desktop}
                    alt={t(product.media.alt, locale)}
                    fill
                    sizes="256px"
                    className={styles.productImage}
                  />
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}

export function OutdoorFunShowcaseView({ locale }: { locale: Locale }) {
  return <CollectionProductShowcaseView locale={locale} collection={outdoorFun} />;
}
