"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import { getLocaleDirection } from "@/i18n/config";

export function LocaleHtmlAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDirection(locale);
  }, [locale]);

  return null;
}
