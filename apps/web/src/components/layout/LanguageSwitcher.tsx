"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { localeCookieName, swapLocaleInPath, type Locale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

interface LanguageSwitcherProps {
  variant?: "header" | "mobile";
  onSwitch?: () => void;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function LanguageSwitcher({ variant = "header", onSwitch }: LanguageSwitcherProps) {
  const locale = useLocale();
  const dictionary = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    setLocaleCookie(nextLocale);
    router.push(swapLocaleInPath(pathname, nextLocale));
    onSwitch?.();
  };

  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {dictionary.language.label}
        </p>
        <div className="flex flex-col gap-1">
          {(["en", "ar"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => switchTo(code)}
              aria-current={locale === code ? "true" : undefined}
              aria-label={
                code === "en"
                  ? dictionary.language.switchToEnglish
                  : dictionary.language.switchToArabic
              }
              className={clsx(
                "rounded-md px-3 py-2.5 text-start text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                locale === code
                  ? "bg-surface text-foreground"
                  : "text-gray-500 hover:bg-surface hover:text-gray-900",
              )}
            >
              {code === "en" ? dictionary.language.english : dictionary.language.arabic}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="hidden items-center gap-1 rounded-md border border-border px-1 py-0.5 md:flex"
      role="group"
      aria-label={dictionary.language.label}
    >
      {(["en", "ar"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-current={locale === code ? "true" : undefined}
          aria-label={
            code === "en" ? dictionary.language.switchToEnglish : dictionary.language.switchToArabic
          }
          className={clsx(
            "min-h-9 min-w-9 rounded px-2 text-xs font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            locale === code ? "bg-surface text-foreground" : "text-gray-500 hover:text-gray-900",
          )}
        >
          {code === "en" ? dictionary.language.en : dictionary.language.ar}
        </button>
      ))}
    </div>
  );
}
