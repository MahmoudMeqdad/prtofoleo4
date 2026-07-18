"use client";

import { useEffect, useState } from "react";

/** True while the hero section still occupies the top of the viewport. */
export function useHeroInView(hero: HTMLElement | null): boolean {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    if (!hero) return;

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const utilityBar = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--utility-bar-height") || "32",
      );
      setOverHero(rect.bottom > utilityBar + 64);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [hero]);

  return overHero;
}
