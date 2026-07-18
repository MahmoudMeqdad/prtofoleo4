"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { CollectionFeature } from "@/content/collections/showcase-types";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CollectionShowcaseSectionProps {
  feature: CollectionFeature;
  index: number;
}

function CtaArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10.6754 5.2702H0" stroke="currentColor" strokeWidth="0.5" />
      <path d="M6.93945 1L10.6758 5.27015L6.93945 9.5403" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export function CollectionShowcaseSection({ feature, index }: CollectionShowcaseSectionProps) {
  const { ref, isVisible } = useInViewOnce<HTMLElement>();
  const reducedMotion = useReducedMotion();
  const isHero = Boolean(feature.isHero);
  const TitleTag = isHero ? "h1" : "h2";

  const mediaStyle = {
    ["--media-position" as string]: feature.desktopPosition ?? "center center",
    ["--media-position-mobile" as string]:
      feature.mobilePosition ?? feature.desktopPosition ?? "center center",
  };

  return (
    <section
      ref={ref}
      id={isHero ? undefined : `feature-${feature.id}`}
      className={clsx(
        "collection-showcase collection-showcase--detail",
        (isVisible || reducedMotion) && "is-visible",
      )}
      style={mediaStyle}
      aria-label={feature.title}
    >
      <div className="collection-showcase__media">
        <div className="collection-showcase__media-frame">
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : undefined}
            sizes="100vw"
            className={clsx(
              "collection-showcase__image",
              feature.mobileImage && "collection-showcase__image--desktop",
            )}
          />
          {feature.mobileImage ? (
            <Image
              src={feature.mobileImage}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="collection-showcase__image collection-showcase__image--mobile"
              aria-hidden="true"
            />
          ) : null}
          {feature.href && feature.linkMedia ? (
            <Link
              href={feature.href}
              className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
              aria-label={`${feature.ctaLabel ?? "View"}: ${feature.title}`}
            />
          ) : null}
        </div>
      </div>

      <div
        className={clsx(
          "collection-showcase__media-overlay",
          feature.overlay === "none" && "collection-showcase__media-overlay--none",
        )}
        aria-hidden="true"
      />

      {feature.href && feature.ctaLabel ? (
        <div className="collection-showcase__content">
          <div className="collection-showcase__text">
            <TitleTag className="collection-showcase__title">{feature.title}</TitleTag>
          </div>

          <Link
            href={feature.href}
            className="collection-showcase__cta collection-showcase__cta--see-more focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label={`${feature.ctaLabel}: ${feature.title}`}
          >
            <span className="collection-showcase__cta-fill" aria-hidden="true" />
            <span className="collection-showcase__cta-inner">
              <span className="collection-showcase__cta-icon collection-showcase__cta-icon--left">
                <CtaArrow />
              </span>
              <span className="collection-showcase__cta-label">{feature.ctaLabel}</span>
              <span className="collection-showcase__cta-icon collection-showcase__cta-icon--right">
                <CtaArrow />
              </span>
            </span>
          </Link>
        </div>
      ) : (
        <TitleTag className="sr-only">{feature.title}</TitleTag>
      )}
    </section>
  );
}
