"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/use-auth";
import {
  accountStatusPath,
  canAccessAccountHome,
  canAccessAdminAccounts,
} from "@/auth/auth-guards";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { Container } from "@/components/ui/Container";

type GuardMode = "account" | "admin" | "status";

interface AuthGateProps {
  mode: GuardMode;
  expectedStatus?: "PENDING" | "REJECTED" | "SUSPENDED";
  children: ReactNode;
}

export function AuthGate({ mode, expectedStatus, children }: AuthGateProps) {
  const { user, status, apiAvailable } = useAuth();
  const locale = useLocale();
  const dictionary = useDictionary();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (status === "loading" || redirected.current) return;

    if (status === "unauthenticated") {
      redirected.current = true;
      router.replace(localizedPath(locale, "/login"));
      return;
    }

    if (!user) return;

    if (mode === "status" && expectedStatus) {
      if (user.status !== expectedStatus) {
        redirected.current = true;
        router.replace(localizedPath(locale, accountStatusPath(user.status)));
      }
      return;
    }

    if (mode === "account") {
      if (!canAccessAccountHome(user)) {
        redirected.current = true;
        router.replace(localizedPath(locale, accountStatusPath(user.status)));
      }
      return;
    }

    if (mode === "admin") {
      if (!canAccessAdminAccounts(user)) {
        redirected.current = true;
        if (user.status !== "APPROVED") {
          router.replace(localizedPath(locale, accountStatusPath(user.status)));
        } else {
          router.replace(localizedPath(locale, "/account"));
        }
      }
    }
  }, [status, user, mode, expectedStatus, locale, router]);

  if (status === "loading") {
    return (
      <PublicPageShell>
        <Container className="pb-24 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] text-center text-sm text-muted-foreground">
          {dictionary.loading.default}
        </Container>
      </PublicPageShell>
    );
  }

  if (!apiAvailable && status === "unauthenticated") {
    return (
      <PublicPageShell>
        <Container className="pb-24 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] text-center">
          <p className="text-base text-foreground">{dictionary.auth.apiUnavailable}</p>
        </Container>
      </PublicPageShell>
    );
  }

  if (status !== "authenticated" || !user) {
    return (
      <PublicPageShell>
        <Container className="pb-24 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] text-center text-sm text-muted-foreground">
          {dictionary.loading.default}
        </Container>
      </PublicPageShell>
    );
  }

  if (mode === "account" && !canAccessAccountHome(user)) return null;
  if (mode === "admin" && !canAccessAdminAccounts(user)) return null;
  if (mode === "status" && expectedStatus && user.status !== expectedStatus) return null;

  return <>{children}</>;
}
