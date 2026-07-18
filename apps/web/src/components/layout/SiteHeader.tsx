"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import clsx from "clsx";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

const NAV_KEYS = ["collections", "about"] as const;

const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  collections: "/collections",
  about: "/about",
};

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const dictionary = useDictionary();
  const pathname = usePathname();

  const navLinks = NAV_KEYS.map((key) => ({
    href: localizedPath(locale, NAV_HREFS[key]),
    label: dictionary.navigation[key],
    key,
  }));

  const homeHref = localizedPath(locale);

  return (
    <>
      <header
        className="w-full border-b border-border/80 bg-white shadow-sm"
        style={{ height: "var(--main-header-height)" }}
      >
        <Container className="flex h-full items-center justify-between gap-4">
          <BrandLogo href={homeHref} />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={dictionary.navigation.mainNavLabel}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "text-primary"
                      : "text-gray-500 hover:text-gray-900 focus-visible:text-gray-900",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher />

            <button
              type="button"
              aria-label={dictionary.navigation.search}
              className="hidden h-11 items-center gap-2 rounded-md border border-border px-3 text-sm text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:flex"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>{dictionary.navigation.search}</span>
            </button>

            <Link
              href={localizedPath(locale, "/sign-in")}
              className="hidden h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:inline-flex"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              <span>{dictionary.navigation.signIn}</span>
            </Link>

            <Link
              href={localizedPath(locale, "/cart")}
              aria-label={dictionary.navigation.cart}
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            <button
              type="button"
              aria-label={dictionary.navigation.openMenu}
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        homeHref={homeHref}
      />
    </>
  );
}
