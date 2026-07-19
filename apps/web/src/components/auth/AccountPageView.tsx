"use client";

import Link from "next/link";
import { useAuth } from "@/auth/use-auth";
import { AuthGate } from "@/components/auth/AuthGate";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

function statusLabel(
  status: string,
  dictionary: ReturnType<typeof useDictionary>,
) {
  switch (status) {
    case "APPROVED":
      return dictionary.auth.statusApproved;
    case "PENDING":
      return dictionary.auth.statusPending;
    case "REJECTED":
      return dictionary.auth.statusRejected;
    case "SUSPENDED":
      return dictionary.auth.statusSuspended;
    default:
      return status;
  }
}

function roleLabel(role: string, dictionary: ReturnType<typeof useDictionary>) {
  switch (role) {
    case "CUSTOMER":
      return dictionary.auth.roleCustomer;
    case "MARKETER":
      return dictionary.auth.roleMarketer;
    case "WHOLESALE_TRADER":
      return dictionary.auth.roleWholesale;
    default:
      return role.replaceAll("_", " ");
  }
}

export function AccountPageView() {
  const dictionary = useDictionary();
  const locale = useLocale();
  const { user, logout } = useAuth();

  return (
    <AuthGate mode="account">
      <PublicPageShell>
        <Container className="max-w-lg pb-16 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] sm:pb-24">
          <h1 className="text-3xl tracking-tight text-foreground">{dictionary.auth.myAccount}</h1>
          {user && (
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">{dictionary.auth.fullName}</dt>
                <dd className="mt-1 font-medium">{user.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{dictionary.auth.email}</dt>
                <dd className="mt-1 font-medium">{user.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{dictionary.auth.phone}</dt>
                <dd className="mt-1 font-medium">{user.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{dictionary.auth.role}</dt>
                <dd className="mt-1 font-medium">{roleLabel(user.role, dictionary)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{dictionary.auth.status}</dt>
                <dd className="mt-1 font-medium">{statusLabel(user.status, dictionary)}</dd>
              </div>
              {user.createdAt && (
                <div>
                  <dt className="text-muted-foreground">{dictionary.auth.registeredAt}</dt>
                  <dd className="mt-1 font-medium">
                    {new Date(user.createdAt).toLocaleDateString(locale === "ar" ? "ar" : "en")}
                  </dd>
                </div>
              )}
            </dl>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={() => logout()}>
              {dictionary.auth.signOut}
            </Button>
            <Link
              href={localizedPath(locale, "/")}
              className="inline-flex h-10 items-center px-4 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {dictionary.auth.backHome}
            </Link>
          </div>
        </Container>
      </PublicPageShell>
    </AuthGate>
  );
}
