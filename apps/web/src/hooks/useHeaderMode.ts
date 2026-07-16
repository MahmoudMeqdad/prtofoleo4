"use client";

import { useEffect, useRef, useState } from "react";

export type HeaderMode = "top-over-hero" | "hidden" | "visible-white";

const TOP_THRESHOLD_PX = 80;
const DIRECTION_DELTA_PX = 14;

export function useHeaderMode(): HeaderMode {
  const [mode, setMode] = useState<HeaderMode>("top-over-hero");
  const modeRef = useRef<HeaderMode>("top-over-hero");
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;

      if (scrollY <= TOP_THRESHOLD_PX) {
        if (modeRef.current !== "top-over-hero") {
          modeRef.current = "top-over-hero";
          setMode("top-over-hero");
        }
      } else if (delta > DIRECTION_DELTA_PX) {
        if (modeRef.current !== "hidden") {
          modeRef.current = "hidden";
          setMode("hidden");
        }
      } else if (delta < -DIRECTION_DELTA_PX) {
        if (modeRef.current !== "visible-white") {
          modeRef.current = "visible-white";
          setMode("visible-white");
        }
      }

      lastScrollY.current = scrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return mode;
}
