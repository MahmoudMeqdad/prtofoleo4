"use client";

import { useState, type FormEvent } from "react";
import { contactContent } from "@/content/pages/contact";
import { t } from "@/content/locale";
import type { Locale } from "@/i18n/config";

interface ContactFormProps {
  locale: Locale;
  whatsappHref?: string;
}

export function ContactForm({ locale, whatsappHref }: ContactFormProps) {
  const c = contactContent;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t(c.validationRequired, locale));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t(c.validationEmail, locale));
      return;
    }

    setNotice(t(c.formNotice, locale));
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-5" noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
          {t(c.nameLabel, locale)}
        </label>
        <input
          id="contact-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
          {t(c.emailFieldLabel, locale)}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
          {t(c.messageLabel, locale)}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p
          className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground"
          role="status"
        >
          {notice}{" "}
          {whatsappHref ? (
            <a
              href={whatsappHref}
              className="font-semibold text-primary underline-offset-2 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          ) : null}
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--logo-red)] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {t(c.submitLabel, locale)}
      </button>
    </form>
  );
}
