"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { HomepageCollection } from "@/config/homepage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CollectionMediaProps {
  collection: HomepageCollection;
  priority?: boolean;
}

export function CollectionMedia({ collection, priority = false }: CollectionMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const mediaSrc =
    isMobile && collection.mobileMedia ? collection.mobileMedia : collection.desktopMedia;

  useEffect(() => {
    if (collection.mediaType !== "video" || reducedMotion) return;
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [collection.mediaType, reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-black">
      {collection.mediaType === "video" && !reducedMotion ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={collection.poster ?? collection.desktopMedia}
          style={{ objectPosition: collection.focalPoint ?? "center" }}
          aria-hidden="true"
        >
          <source src={mediaSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={mediaSrc}
          alt=""
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: collection.focalPoint ?? "center" }}
        />
      )}

      <div className="collection-showcase__media-overlay" aria-hidden="true" />
    </div>
  );
}
