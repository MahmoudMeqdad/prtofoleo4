import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartPageView } from "@/components/cart/CartPageView";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "سلتك | Velvet Kids" : "Your Cart | Velvet Kids",
    robots: { index: false, follow: true },
  };
}

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CartPageView locale={locale as Locale} />;
}
