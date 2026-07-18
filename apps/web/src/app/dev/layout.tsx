import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Design System — Velvet Kids",
  description: "Internal design system review page",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default async function DevLayout({ children }: { children: React.ReactNode }) {
  const dictionary = await getDictionary("en");

  return (
    <LocaleProvider locale="en" dictionary={dictionary}>
      <SiteLayout>{children}</SiteLayout>
    </LocaleProvider>
  );
}
