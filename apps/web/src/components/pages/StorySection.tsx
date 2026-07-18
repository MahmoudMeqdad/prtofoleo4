"use client";

import Image from "next/image";
import clsx from "clsx";
import type { Locale } from "@/i18n/config";
import type { CollectionStorySection } from "@/content/collections/types";
import { t } from "@/content/locale";
import { Reveal } from "./Reveal";

interface StorySectionProps {
  section: CollectionStorySection;
  locale: Locale;
  accent?: string;
}

export function StorySection({ section, locale, accent }: StorySectionProps) {
  const title = t(section.title, locale);
  const description = t(section.description, locale);
  const alt = t(section.media.alt, locale);

  if (section.layout === "full-media") {
    return (
      <Reveal className="relative min-h-[55svh] w-full overflow-hidden md:min-h-[70svh]">
        <Image src={section.media.desktop} alt={alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
        <div className="relative z-10 flex h-full min-h-[55svh] items-end px-6 py-14 sm:px-10 md:min-h-[70svh] md:px-16">
          <div className="max-w-2xl text-white">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">{description}</p>
          </div>
        </div>
      </Reveal>
    );
  }

  if (section.layout === "centered" || section.layout === "editorial") {
    return (
      <Reveal className="px-6 py-20 sm:px-10 md:px-16 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
          <div className="relative mx-auto mt-10 aspect-[16/10] w-full max-w-3xl overflow-hidden">
            <Image
              src={section.media.desktop}
              alt={alt}
              fill
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    );
  }

  const mediaFirst = section.layout === "media-left";

  return (
    <Reveal className="px-6 py-16 sm:px-10 md:px-16 md:py-24">
      <div className={clsx("mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16")}>
        <div
          className={clsx(
            "relative aspect-[4/3] w-full overflow-hidden",
            mediaFirst ? "md:order-1" : "md:order-2",
          )}
        >
          <Image
            src={section.media.desktop}
            alt={alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
        <div className={clsx(mediaFirst ? "md:order-2" : "md:order-1")}>
          <div
            className="mb-4 h-1 w-12"
            style={{ backgroundColor: accent ?? "var(--color-primary)" }}
            aria-hidden="true"
          />
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
