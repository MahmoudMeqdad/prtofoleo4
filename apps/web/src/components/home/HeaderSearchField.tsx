"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

export function HeaderSearchField() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const skipSearchNav = useRef(false);
  const isSearchPage = pathname === localizedPath(locale, "/search");

  useEffect(() => {
    if (!isSearchPage) return;
    const urlQuery = searchParams.get("q") ?? "";
    skipSearchNav.current = true;
    queueMicrotask(() => {
      setSearchQuery(urlQuery);
    });
  }, [isSearchPage, searchParams]);

  useEffect(() => {
    if (skipSearchNav.current) {
      skipSearchNav.current = false;
      return;
    }

    const trimmed = searchQuery.trim();
    const timer = window.setTimeout(() => {
      const urlQuery = searchParams.get("q") ?? "";
      if (isSearchPage && trimmed === urlQuery) return;
      if (!trimmed) {
        if (isSearchPage) router.replace(localizedPath(locale, "/search"));
        return;
      }
      const href = localizedPath(locale, `/search?q=${encodeURIComponent(trimmed)}`);
      if (isSearchPage) router.replace(href);
      else router.push(href);
    }, 320);

    return () => window.clearTimeout(timer);
  }, [searchQuery, isSearchPage, locale, router, searchParams]);

  return (
    <label className="homepage-search-pill">
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          const trimmed = searchQuery.trim();
          const href = trimmed
            ? localizedPath(locale, `/search?q=${encodeURIComponent(trimmed)}`)
            : localizedPath(locale, "/search");
          router.push(href);
        }}
        placeholder={dictionary.navigation.search}
        aria-label={dictionary.navigation.search}
        className="homepage-search-pill__input"
        autoComplete="off"
      />
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
    </label>
  );
}
