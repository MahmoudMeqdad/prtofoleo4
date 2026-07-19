"use client";

import { useCallback, useEffect, useState } from "react";
import { listAdminUsers, updateAccountStatus } from "@/auth/auth-client";
import type { AdminUserListResponse } from "@/auth/auth-types";
import { AuthGate } from "@/components/auth/AuthGate";
import { PublicPageShell } from "@/components/layout/PublicPageShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

type StatusFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
type RoleFilter =
  | "ALL"
  | "CUSTOMER"
  | "MARKETER"
  | "WHOLESALE_TRADER"
  | "ORDER_EMPLOYEE"
  | "SALES_MANAGER"
  | "ADMIN"
  | "SUPER_ADMIN";

function partnerSummary(
  user: AdminUserListResponse["users"][number],
): string | null {
  if (user.marketerProfile) {
    const p = user.marketerProfile;
    return [p.businessOrPageName, p.city, p.marketingMethod]
      .filter(Boolean)
      .join(" · ");
  }
  if (user.wholesaleTraderProfile) {
    const p = user.wholesaleTraderProfile;
    return [p.businessName, p.businessType, p.city].filter(Boolean).join(" · ");
  }
  return null;
}

export function AdminAccountsView() {
  const dictionary = useDictionary();
  const locale = useLocale();
  const [status, setStatus] = useState<StatusFilter>("PENDING");
  const [role, setRole] = useState<RoleFilter>("ALL");
  const [data, setData] = useState<AdminUserListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await listAdminUsers({
        status,
        role,
        page: 1,
        pageSize: 50,
      });
      setData(result);
    } catch {
      setError(dictionary.auth.actionFailed);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [status, role, dictionary.auth.actionFailed]);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      void load();
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  const runAction = async (
    id: string,
    next: "APPROVED" | "REJECTED" | "SUSPENDED",
    confirmMessage: string,
  ) => {
    if (!window.confirm(confirmMessage)) return;
    setBusyId(id);
    setError(null);
    try {
      await updateAccountStatus(id, next);
      await load();
    } catch {
      setError(dictionary.auth.actionFailed);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AuthGate mode="admin">
      <PublicPageShell>
        <Container className="pb-12 pt-[calc(var(--utility-bar-height)+var(--main-header-height)+2.5rem)] sm:pb-16">
          <h1 className="text-3xl tracking-tight">{dictionary.auth.reviewAccounts}</h1>

          <div className="mt-6 flex flex-wrap gap-3">
            <label className="text-sm">
              <span className="me-2 text-muted-foreground">{dictionary.auth.filterStatus}</span>
              <select
                className="h-10 rounded-md border border-border bg-background px-2"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusFilter)}
              >
                <option value="ALL">{dictionary.auth.filterAll}</option>
                <option value="PENDING">{dictionary.auth.statusPending}</option>
                <option value="APPROVED">{dictionary.auth.statusApproved}</option>
                <option value="REJECTED">{dictionary.auth.statusRejected}</option>
                <option value="SUSPENDED">{dictionary.auth.statusSuspended}</option>
              </select>
            </label>
            <label className="text-sm">
              <span className="me-2 text-muted-foreground">{dictionary.auth.filterRole}</span>
              <select
                className="h-10 rounded-md border border-border bg-background px-2"
                value={role}
                onChange={(e) => setRole(e.target.value as RoleFilter)}
              >
                <option value="ALL">{dictionary.auth.filterAll}</option>
                <option value="CUSTOMER">{dictionary.auth.roleCustomer}</option>
                <option value="MARKETER">{dictionary.auth.roleMarketer}</option>
                <option value="WHOLESALE_TRADER">{dictionary.auth.roleWholesale}</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm text-danger">
              {error}
            </p>
          )}

          {loading && (
            <p className="mt-8 text-sm text-muted-foreground">{dictionary.auth.loadingAccounts}</p>
          )}

          {!loading && data && data.users.length === 0 && (
            <p className="mt-8 text-sm text-muted-foreground">{dictionary.auth.emptyAccounts}</p>
          )}

          {!loading && data && data.users.length > 0 && (
            <ul className="mt-8 space-y-4">
              {data.users.map((account) => {
                const summary = partnerSummary(account);
                return (
                  <li
                    key={account.id}
                    className="rounded-lg border border-border bg-white/70 p-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">{account.email}</p>
                        <p className="text-sm text-muted-foreground">{account.phone || "—"}</p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                          {account.role} · {account.status}
                        </p>
                        {account.createdAt && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {new Date(account.createdAt).toLocaleString(
                              locale === "ar" ? "ar" : "en",
                            )}
                          </p>
                        )}
                        {summary && (
                          <p className="mt-2 text-sm">
                            <span className="text-muted-foreground">
                              {dictionary.auth.partnerSummary}:{" "}
                            </span>
                            {summary}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {account.status === "PENDING" && (
                          <>
                            <Button
                              size="sm"
                              loading={busyId === account.id}
                              onClick={() =>
                                runAction(
                                  account.id,
                                  "APPROVED",
                                  dictionary.auth.confirmApprove,
                                )
                              }
                            >
                              {dictionary.auth.approve}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              loading={busyId === account.id}
                              onClick={() =>
                                runAction(
                                  account.id,
                                  "REJECTED",
                                  dictionary.auth.confirmReject,
                                )
                              }
                            >
                              {dictionary.auth.reject}
                            </Button>
                          </>
                        )}
                        {account.status === "APPROVED" && (
                          <Button
                            size="sm"
                            variant="danger"
                            loading={busyId === account.id}
                            onClick={() =>
                              runAction(
                                account.id,
                                "SUSPENDED",
                                dictionary.auth.confirmSuspend,
                              )
                            }
                          >
                            {dictionary.auth.suspend}
                          </Button>
                        )}
                        {account.status === "SUSPENDED" && (
                          <Button
                            size="sm"
                            loading={busyId === account.id}
                            onClick={() =>
                              runAction(
                                account.id,
                                "APPROVED",
                                dictionary.auth.confirmReactivate,
                              )
                            }
                          >
                            {dictionary.auth.reactivate}
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </PublicPageShell>
    </AuthGate>
  );
}
