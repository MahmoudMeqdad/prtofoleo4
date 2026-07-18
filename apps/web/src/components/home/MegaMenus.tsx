"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";
import { HOMEPAGE_COLLECTIONS } from "@/config/homepage";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";
import type { MegaMenuId } from "@/hooks/useMegaMenu";

interface MegaMenusProps {
  activeMenu: MegaMenuId | null;
  onNavigate?: () => void;
}

export function MegaMenus({ activeMenu, onNavigate }: MegaMenusProps) {
  const locale = useLocale();
  const dictionary = useDictionary();
  const collections = HOMEPAGE_COLLECTIONS;
  const featured = collections.find((item) => item.id === "creative-studio") ?? collections[0];
  const featuredCopy = dictionary.collections[featured.id as keyof typeof dictionary.collections];

  const columns = [collections.slice(0, 2), collections.slice(2, 4), collections.slice(4, 6)];

  const aboutLinks = [
    {
      href: localizedPath(locale, "/about"),
      label: dictionary.navigation.about,
    },
    {
      href: localizedPath(locale, "/contact"),
      label: dictionary.footer.contact,
    },
    {
      href: localizedPath(locale, "/careers"),
      label: dictionary.footer.careers,
    },
  ];

  return (
    <div className={clsx("mega-menu", activeMenu && "mega-menu--open")} aria-hidden={!activeMenu}>
      <div
        id="mega-menu-collections"
        className={clsx(
          "mega-menu__panel collections-mega-menu",
          activeMenu === "collections" && "mega-menu__panel--active",
        )}
        role="region"
        aria-label={dictionary.navigation.collections}
      >
        <div className="collections-mega-menu__inner">
          <div className="collections-mega-menu__links">
            {columns.map((column, columnIndex) => (
              <ul key={columnIndex} className="collections-mega-menu__column">
                {column.map((collection) => {
                  const copy =
                    dictionary.collections[collection.id as keyof typeof dictionary.collections];
                  return (
                    <li key={collection.id}>
                      <Link
                        href={localizedPath(locale, `/collections/${collection.slug}`)}
                        className="collections-mega-menu__link"
                        onClick={onNavigate}
                      >
                        {copy.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>

          <Link
            href={localizedPath(locale, `/collections/${featured.slug}`)}
            className="collections-mega-menu__feature"
            onClick={onNavigate}
          >
            <Image
              src={featured.desktopMedia}
              alt={featuredCopy.name}
              fill
              sizes="(min-width: 1024px) 38.5vw, 100vw"
              className="collections-mega-menu__feature-image"
              priority={false}
            />
            <div className="collections-mega-menu__feature-overlay">
              <p className="collections-mega-menu__feature-title">{featuredCopy.name}</p>
              <span className="collections-mega-menu__feature-cta">
                {dictionary.pages.exploreCollection}
                <ArrowRight className="collections-mega-menu__feature-arrow" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div
        id="mega-menu-about"
        className={clsx(
          "mega-menu__panel about-mega-menu",
          activeMenu === "about" && "mega-menu__panel--active",
        )}
        role="region"
        aria-label={dictionary.navigation.about}
      >
        {aboutLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="about-mega-menu__link"
            onClick={onNavigate}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
