"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, User } from "lucide-react";
import clsx from "clsx";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "علاماتنا" },
  { href: "/products", label: "المنتجات" },
  { href: "/about", label: "حول" },
  { href: "/contact", label: "اتصل بنا" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useScrollPosition(56);
  const isHome = pathname === "/";
  const heroMode = isHome && !scrolled;

  return (
    <header
      className={clsx(
        "sticky top-0 z-30 transition-all duration-300",
        heroMode
          ? "border-transparent bg-transparent"
          : "border-b border-border bg-background/90 shadow-sm backdrop-blur-md",
      )}
      style={{ height: "var(--header-height)" }}
    >
      <Container className="flex h-full items-center justify-between">
        <BrandLogo href="/" />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                heroMode ? "text-white/90 hover:bg-white/10 hover:text-white" : "hover:bg-surface",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            href="/login"
            aria-label="Login"
            className={clsx(heroMode && "text-white hover:bg-white/10")}
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            href="/cart"
            aria-label="Shopping cart"
            className={clsx(heroMode && "text-white hover:bg-white/10")}
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={clsx("md:hidden", heroMode && "text-white hover:bg-white/10")}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </Container>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
        homeHref="/en"
      />
    </header>
  );
}
