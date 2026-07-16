"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronUp,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

export function VisualFooter() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const footer = dictionary.footer;
  const year = new Date().getFullYear();

  const columns = [
    {
      title: footer.quickLinks,
      links: [
        { href: localizedPath(locale), label: footer.home },
        { href: localizedPath(locale, "/news"), label: footer.news },
        {
          href: localizedPath(locale, "/where-to-buy"),
          label: footer.whereToBuy,
        },
        {
          href: localizedPath(locale, "/safety"),
          label: footer.recallsSafety,
        },
      ],
    },
    {
      title: footer.ourCompany,
      links: [
        { href: localizedPath(locale, "/about"), label: footer.aboutUs },
        { href: localizedPath(locale, "/careers"), label: footer.careers },
        { href: localizedPath(locale, "/contact"), label: footer.contact },
        { href: localizedPath(locale, "/patents"), label: footer.patents },
      ],
    },
    {
      title: footer.followUs,
      links: [
        { href: "#", label: footer.socialHandle, external: true },
        { href: "#", label: footer.linkedIn, external: true },
        { href: "#", label: footer.tiktok, external: true },
      ],
    },
    {
      title: footer.policies,
      links: [
        {
          href: localizedPath(locale, "/terms"),
          label: footer.termsOfUse,
        },
        {
          href: localizedPath(locale, "/privacy"),
          label: footer.privacyPolicy,
        },
        {
          href: localizedPath(locale, "/cookies"),
          label: footer.cookiePolicy,
        },
        {
          href: localizedPath(locale, "/conformity"),
          label: footer.declarationOfConformity,
        },
      ],
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div className="site-footer__cta-row">
          <h2 className="site-footer__heading">{footer.heading}</h2>
          <Link
            href={localizedPath(locale, "/careers")}
            className="site-footer__careers focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>{footer.careers}</span>
            <ArrowRight className="site-footer__careers-arrow" aria-hidden="true" />
          </Link>
        </div>

        <div className="site-footer__divider" aria-hidden="true" />

        <div className="site-footer__columns">
          {columns.map((column) => (
            <div key={column.title} className="site-footer__column">
              <h3 className="site-footer__column-title">{column.title}</h3>
              <ul className="site-footer__list">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        className="site-footer__link"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="site-footer__link">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__bottom-start">
            <div className="site-footer__socials">
              {[
                { label: footer.facebook, Icon: Facebook },
                { label: footer.instagram, Icon: Instagram },
                { label: footer.linkedIn, Icon: Linkedin },
              ].map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="site-footer__social"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="site-footer__copyright">
              {footer.copyright.replace("{year}", String(year))}
            </p>
          </div>

          <div className="site-footer__bottom-end">
            <div className="site-footer__badges" aria-hidden="true">
              <span className="site-footer__badge">GDPR</span>
              <span className="site-footer__badge">COPPA</span>
            </div>
            <button
              type="button"
              className="site-footer__back-top"
              onClick={scrollToTop}
              aria-label={footer.backToTop}
            >
              <ChevronUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
