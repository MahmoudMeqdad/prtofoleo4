"use client";

import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { ComingSoonControl } from "@/components/pages/ComingSoonControl";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

type FooterLinkItem = {
  label: string;
  href?: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLinkItem[];
};

function FooterTextLink({ link }: { link: FooterLinkItem }) {
  if (link.href) {
    if (link.external) {
      return (
        <a
          href={link.href}
          className="footer-column-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      );
    }

    return (
      <Link href={link.href} className="footer-column-link">
        {link.label}
      </Link>
    );
  }

  return (
    <ComingSoonControl label={link.label} className="footer-column-link">
      {link.label}
    </ComingSoonControl>
  );
}

export function VisualFooter() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const footer = dictionary.footer;
  const currentYear = new Date().getFullYear();

  const footerSections: FooterColumn[] = [
    {
      title: footer.quickLinks,
      links: [
        { label: footer.home, href: localizedPath(locale) },
        { label: footer.news },
        { label: footer.whereToBuy, href: localizedPath(locale, "/contact") },
        { label: footer.recallsSafety },
      ],
    },
    {
      title: footer.ourCompany,
      links: [
        { label: footer.aboutUs, href: localizedPath(locale, "/about") },
        { label: footer.careers, href: localizedPath(locale, "/careers") },
        { label: footer.contact, href: localizedPath(locale, "/contact") },
        { label: footer.patents },
      ],
    },
    {
      title: footer.followUs,
      links: [
        { label: footer.socialHandle },
        { label: footer.linkedIn },
        { label: footer.tiktok },
      ],
    },
    {
      title: footer.policies,
      links: [
        { label: footer.termsOfUse },
        { label: footer.privacyPolicy },
        { label: footer.cookiePolicy },
        { label: footer.declarationOfConformity },
      ],
    },
  ];

  const socialIcons = [
    { label: footer.facebook, Icon: Facebook },
    { label: footer.instagram, Icon: Instagram },
    { label: footer.linkedInIcon, Icon: Linkedin },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <section className="footer-careers">
          <h2>{footer.heading}</h2>
          <Link
            href={localizedPath(locale, "/careers")}
            className="footer-careers-button"
          >
            <span>{footer.careers}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <div className="footer-divider" aria-hidden="true" />

        <section className="footer-links-grid" aria-label={footer.explore}>
          {footerSections.map((column) => (
            <div key={column.title} className="footer-column">
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <FooterTextLink
                  key={`${column.title}-${link.label}`}
                  link={link}
                />
              ))}
            </div>
          ))}
        </section>

        <section className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="footer-social-icons">
              {socialIcons.map(({ label, Icon }) => (
                <ComingSoonControl
                  key={label}
                  label={label}
                  className="footer-social-icon"
                >
                  <Icon aria-hidden="true" />
                </ComingSoonControl>
              ))}
            </div>

            <p className="footer-legal-text">
              {footer.copyright.replace("{year}", String(currentYear))}
            </p>
          </div>

          <div className="footer-certifications" aria-hidden="true" />
        </section>
      </div>
    </footer>
  );
}
