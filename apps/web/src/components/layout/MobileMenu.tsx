"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useDictionary } from "@/providers/LocaleProvider";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string; key?: string }[];
  homeHref: string;
}

const linkVariants = {
  closed: { opacity: 0, x: 16 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 + i * 0.04, duration: 0.25 },
  }),
};

const CLOSED_OFFSET = "100%";

export function MobileMenu({ isOpen, onClose, links, homeHref }: MobileMenuProps) {
  const dictionary = useDictionary();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: CLOSED_OFFSET }}
            animate={{ x: 0 }}
            exit={{ x: CLOSED_OFFSET }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 start-0 z-50 w-[min(100%,20rem)] bg-white shadow-xl"
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label={dictionary.navigation.mobileNavLabel}
          >
            <div
              className="flex items-center justify-between border-b border-border px-4"
              style={{ height: "var(--main-header-height)" }}
            >
              <BrandLogo href={homeHref} onClick={onClose} />
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-md text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={dictionary.navigation.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-4">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  custom={index}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={link.href}
                    className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-500 transition-colors hover:bg-surface hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <LanguageSwitcher variant="mobile" onSwitch={onClose} />
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
