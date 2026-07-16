"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, ShoppingBag, User } from "lucide-react";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { MegaMenus } from "@/components/home/MegaMenus";
import { ComingSoonControl } from "@/components/pages/ComingSoonControl";
import {
  localeCookieName,
  localizedPath,
  swapLocaleInPath,
  type Locale,
} from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMegaMenu, type MegaMenuId } from "@/hooks/useMegaMenu";
import type { HeaderMode } from "@/hooks/useHeaderMode";

const NAV_KEYS = [
  "collections",
  "about",
  "dropshipping",
  "wholesale",
] as const;

const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  collections: "/collections",
  about: "/about",
  dropshipping: "/dropshipping",
  wholesale: "/wholesale",
};

const MEGA_MENU_KEYS: MegaMenuId[] = ["collections", "about"];

interface HomepageHeaderProps {
  mode: HeaderMode;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function LanguageDropdown({ onSwitch }: { onSwitch?: () => void }) {
  const locale = useLocale();
  const dictionary = useDictionary();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const switchTo = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }
    setLocaleCookie(nextLocale);
    router.push(swapLocaleInPath(pathname, nextLocale));
    setOpen(false);
    onSwitch?.();
  };

  const currentLabel =
    locale === "en" ? dictionary.language.english : dictionary.language.arabic;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dictionary.language.label}
        onClick={() => setOpen((value) => !value)}
        className="homepage-header__lang-trigger inline-flex min-h-8 items-center gap-1 rounded-md px-1 text-xs font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className={clsx("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={dictionary.language.label}
          className="absolute end-0 top-full z-50 mt-1 min-w-[9rem] rounded-md border border-border bg-white py-1 shadow-lg"
        >
          {(["en", "ar"] as const).map((code) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                type="button"
                onClick={() => switchTo(code)}
                aria-current={locale === code ? "true" : undefined}
                aria-label={
                  code === "en"
                    ? dictionary.language.switchToEnglish
                    : dictionary.language.switchToArabic
                }
                className={clsx(
                  "block w-full px-3 py-2 text-start text-xs transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                  locale === code
                    ? "font-semibold text-foreground"
                    : "text-gray-500",
                )}
              >
                {code === "en"
                  ? dictionary.language.english
                  : dictionary.language.arabic}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IplayLogo({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="iplay-logo-badge shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      style={{ fontFamily: "var(--font-display)" }}
    >
      IPLAY
    </Link>
  );
}

export function HomepageHeader({ mode }: HomepageHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const dictionary = useDictionary();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const {
    activeMenu,
    isOpen: megaOpen,
    openMenu,
    scheduleClose,
    cancelClose,
    closeMenu,
  } = useMegaMenu();
  const triggerRefs = useRef<Partial<Record<MegaMenuId, HTMLButtonElement | null>>>(
    {},
  );

  const overHero = mode === "top-over-hero";

  const navLinks = NAV_KEYS.map((key) => ({
    href: localizedPath(locale, NAV_HREFS[key]),
    label: dictionary.navigation[key],
    key,
  }));

  const homeHref = localizedPath(locale);

  useEffect(() => {
    if (!megaOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const current = activeMenu;
      closeMenu();
      if (current) {
        triggerRefs.current[current]?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, activeMenu, closeMenu]);

  return (
    <>
      <header
        data-header-mode={megaOpen ? "visible-white" : mode}
        className={clsx(
          "homepage-header fixed inset-x-0 top-0 z-[100] will-change-transform",
          !reducedMotion && "transition-transform duration-300 ease-out",
          mode === "hidden" && !megaOpen && "-translate-y-full",
          megaOpen && "homepage-header--menu-open",
        )}
        aria-hidden={mode === "hidden" && !megaOpen}
      >
        <div
          className="homepage-header__utility w-full"
          style={{ height: "var(--utility-bar-height)" }}
        >
          <Container className="flex h-full items-center justify-between gap-4">
            <span className="homepage-header__utility-message hidden truncate text-xs font-normal tracking-normal sm:inline">
              {dictionary.utility.message}
            </span>
            <span className="homepage-header__utility-message truncate text-xs font-normal sm:hidden">
              IPLAY
            </span>
            <LanguageDropdown />
          </Container>
        </div>

        <div
          className="homepage-header__main w-full"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {overHero && !megaOpen && (
            <div className="homepage-header__hero-gradient" aria-hidden="true" />
          )}

          <div className="homepage-header__main-inner relative z-10 w-full">
            <IplayLogo href={homeHref} />

            <nav
              className="hidden min-w-0 flex-1 items-center gap-1 lg:flex lg:gap-2"
              aria-label={dictionary.navigation.mainNavLabel}
            >
              {navLinks.map((link) => {
                const isMega = MEGA_MENU_KEYS.includes(link.key as MegaMenuId);
                const megaId = link.key as MegaMenuId;
                const isActive = pathname === link.href;
                const isMenuActive = activeMenu === megaId;

                if (isMega) {
                  return (
                    <button
                      key={link.key}
                      ref={(node) => {
                        triggerRefs.current[megaId] = node;
                      }}
                      type="button"
                      className={clsx(
                        "homepage-nav-link homepage-nav-trigger inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-2 text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:px-3",
                        isMenuActive && "nav-item--active",
                      )}
                      aria-expanded={isMenuActive}
                      aria-haspopup="true"
                      aria-controls={`mega-menu-${megaId}`}
                      onMouseEnter={() => openMenu(megaId)}
                      onFocus={() => openMenu(megaId, true)}
                      onClick={() =>
                        isMenuActive ? closeMenu() : openMenu(megaId, true)
                      }
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className="nav-chevron h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.key}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className="homepage-nav-link whitespace-nowrap px-2 py-2 text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:px-3"
                    onMouseEnter={scheduleClose}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ms-auto flex shrink-0 items-center gap-1 sm:gap-2">
              <ComingSoonControl
                label={dictionary.navigation.search}
                className="homepage-search-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{dictionary.navigation.search}</span>
                <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              </ComingSoonControl>

              <ComingSoonControl
                label={dictionary.navigation.signIn}
                className="homepage-header-action homepage-header-action--icon hidden sm:inline-flex"
              >
                <User className="h-5 w-5" aria-hidden="true" />
              </ComingSoonControl>

              <ComingSoonControl
                label={dictionary.navigation.cart}
                className="homepage-header-action homepage-header-action--icon"
              >
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              </ComingSoonControl>

              <button
                type="button"
                aria-label={dictionary.navigation.openMenu}
                className="homepage-header-action homepage-header-action--icon homepage-header__menu-toggle"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="homepage-header__mega-desktop">
            <MegaMenus activeMenu={activeMenu} onNavigate={closeMenu} />
          </div>
        </div>
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
