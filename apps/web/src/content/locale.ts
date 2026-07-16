import type { Locale } from "@/i18n/config";

export type LocalizedString = {
  en: string;
  ar: string;
};

export function t(value: LocalizedString, locale: Locale): string {
  return value[locale];
}
