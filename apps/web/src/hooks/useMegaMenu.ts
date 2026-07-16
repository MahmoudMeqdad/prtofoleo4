"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type MegaMenuId = "collections" | "about";

const OPEN_DELAY_MS = 75;
const CLOSE_DELAY_MS = 100;

export function useMegaMenu() {
  const [activeMenu, setActiveMenu] = useState<MegaMenuId | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef<MegaMenuId | null>(null);

  useEffect(() => {
    activeRef.current = activeMenu;
  }, [activeMenu]);

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const openMenu = useCallback(
    (id: MegaMenuId, immediate = false) => {
      clearTimers();
      if (immediate || activeRef.current) {
        setActiveMenu(id);
        return;
      }
      openTimer.current = setTimeout(() => {
        setActiveMenu(id);
        openTimer.current = null;
      }, OPEN_DELAY_MS);
    },
    [clearTimers],
  );

  const scheduleClose = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearTimers();
    setActiveMenu(null);
  }, [clearTimers]);

  return {
    activeMenu,
    isOpen: activeMenu !== null,
    openMenu,
    scheduleClose,
    cancelClose,
    closeMenu,
  };
}
