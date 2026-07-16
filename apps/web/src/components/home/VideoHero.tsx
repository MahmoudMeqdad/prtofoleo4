"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Pause, Play } from "lucide-react";
import clsx from "clsx";
import { HERO_MEDIA } from "@/config/homepage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useDictionary } from "@/providers/LocaleProvider";

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const reducedMotion = useReducedMotion();
  const dictionary = useDictionary();

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  const mediaVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
      };

  const controlVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { delay: 0.35, duration: 0.45 },
        },
      };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100svh",
      }}
      aria-label={dictionary.hero.sectionLabel}
    >
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate="visible"
        variants={mediaVariants}
      >
        {!videoError ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_MEDIA.posterSrc}
            onError={() => setVideoError(true)}
            aria-hidden="true"
          >
            <source src={HERO_MEDIA.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <>
            <Image
              src={HERO_MEDIA.posterSrc}
              alt=""
              fill
              priority
              className="object-cover"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                background: HERO_MEDIA.fallbackGradient,
                mixBlendMode: "multiply",
              }}
              aria-hidden="true"
            />
          </>
        )}
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 bg-black/35"
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={controlVariants}
      >
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? dictionary.hero.pause : dictionary.hero.play}
          className={clsx(
            "flex items-center justify-center rounded-full border-2 border-white/90 bg-black/20 text-white backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30",
            "h-14 w-14 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]",
          )}
        >
          {playing ? (
            <Pause className="h-6 w-6 fill-current" aria-hidden="true" />
          ) : (
            <Play className="ms-0.5 h-6 w-6 fill-current" aria-hidden="true" />
          )}
        </button>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm"
          aria-label={dictionary.hero.scroll}
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
