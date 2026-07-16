"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { HomepageCollection } from "@/config/homepage";
import { CollectionMedia } from "./CollectionMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

interface CollectionShowcaseProps {
  collection: HomepageCollection;
  index: number;
}

function CtaArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 4H24M24 4L20 1M24 4L20 7"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CollectionShowcase({
  collection,
  index,
}: CollectionShowcaseProps) {
  const reducedMotion = useReducedMotion();
  const locale = useLocale();
  const dictionary = useDictionary();
  const copy =
    dictionary.collections[
      collection.id as keyof typeof dictionary.collections
    ];

  const sectionMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0.98 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5 },
      };

  const mediaMotion = reducedMotion
    ? {}
    : {
        initial: { scale: 1.04 },
        whileInView: { scale: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
      };

  const titleMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.55, delay: 0.08 },
      };

  const ctaMotion = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.45, delay: 0.16 },
      };

  return (
    <motion.section
      className="collection-showcase"
      aria-labelledby={`collection-${collection.id}-title`}
      {...sectionMotion}
    >
      <motion.div className="absolute inset-0" {...mediaMotion}>
        <CollectionMedia collection={collection} priority={index === 0} />
      </motion.div>

      <div className="collection-showcase__content">
        <motion.h2
          id={`collection-${collection.id}-title`}
          className="collection-showcase__title"
          {...titleMotion}
        >
          {copy.name}
        </motion.h2>

        <motion.div {...ctaMotion}>
          <Link
            href={localizedPath(locale, `/collections/${collection.slug}`)}
            className="collection-showcase__cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span className="collection-showcase__cta-fill" aria-hidden="true" />
            <span className="collection-showcase__cta-inner">
              <span className="collection-showcase__cta-icon collection-showcase__cta-icon--left">
                <CtaArrow className="collection-showcase__cta-arrow" />
              </span>
              <span className="collection-showcase__cta-label">{copy.cta}</span>
              <span className="collection-showcase__cta-icon collection-showcase__cta-icon--right">
                <CtaArrow className="collection-showcase__cta-arrow" />
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}