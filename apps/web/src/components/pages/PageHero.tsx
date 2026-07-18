"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  desktopMedia: string;
  mobileMedia?: string;
  textColor?: "light" | "dark";
  overlayStrength?: number;
  focalPoint?: string;
  minHeightClass?: string;
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  desktopMedia,
  mobileMedia,
  textColor = "light",
  overlayStrength = 0.4,
  focalPoint = "center center",
  minHeightClass = "min-h-[70svh] md:min-h-[80svh]",
}: PageHeroProps) {
  const reducedMotion = useReducedMotion();
  const isLight = textColor === "light";

  return (
    <section
      className={clsx("relative flex w-full items-end overflow-hidden", minHeightClass)}
      aria-label={title}
    >
      <div className="absolute inset-0">
        <Image
          src={desktopMedia}
          alt=""
          fill
          priority
          sizes="100vw"
          className={clsx("object-cover", mobileMedia ? "hidden md:block" : "block")}
          style={{ objectPosition: focalPoint }}
          aria-hidden="true"
        />
        {mobileMedia ? (
          <Image
            src={mobileMedia}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover md:hidden"
            style={{ objectPosition: focalPoint }}
            aria-hidden="true"
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${overlayStrength})` }}
          aria-hidden="true"
        />
      </div>

      <motion.div
        className="relative z-10 w-full px-6 pb-14 pt-32 sm:px-10 md:px-16 md:pb-20"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="mx-auto max-w-4xl">
          {eyebrow ? (
            <p
              className={clsx(
                "mb-3 text-xs font-semibold uppercase tracking-[0.2em]",
                isLight ? "text-white/80" : "text-foreground/70",
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={clsx(
              "font-[family-name:var(--font-display)] text-4xl font-bold leading-tight sm:text-5xl md:text-6xl",
              isLight ? "text-white" : "text-foreground",
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={clsx(
                "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
                isLight ? "text-white/90" : "text-foreground/80",
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
