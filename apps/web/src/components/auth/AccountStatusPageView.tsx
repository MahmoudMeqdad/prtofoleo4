"use client";

import Link from "next/link";
import { AuthGate } from "@/components/auth/AuthGate";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/auth/use-auth";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

interface AccountStatusPageViewProps {
  kind: "PENDING" | "REJECTED" | "SUSPENDED";
}

export function AccountStatusPageView({ kind }: AccountStatusPageViewProps) {
  const dictionary = useDictionary();
  const locale = useLocale();
  const { logout } = useAuth();

  const copy = {
    PENDING: {
      title: dictionary.auth.pendingTitle,
      body: dictionary.auth.pendingBody,
    },
    REJECTED: {
      title: dictionary.auth.rejectedTitle,
      body: dictionary.auth.rejectedBody,
    },
    SUSPENDED: {
      title: dictionary.auth.suspendedTitle,
      body: dictionary.auth.suspendedBody,
    },
  }[kind];

  return (
    <AuthGate mode="status" expectedStatus={kind}>
      <PublicPageShell>
        <Container className="max-w-lg pb-16 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] sm:pb-24">
          <h1 className="text-3xl tracking-tight text-foreground">{copy.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={localizedPath(locale, "/")} variant="primary">
              {dictionary.auth.backHome}
            </Button>
            {(kind === "REJECTED" || kind === "SUSPENDED") && (
              <Button href={localizedPath(locale, "/contact")} variant="outline">
                {dictionary.auth.contactSupport}
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={() => logout()}>
              {dictionary.auth.signOut}
            </Button>
            <Link href={localizedPath(locale, "/")} className="sr-only">
              {dictionary.auth.backHome}
            </Link>
          </div>
        </Container>
      </PublicPageShell>
    </AuthGate>
  );
}
