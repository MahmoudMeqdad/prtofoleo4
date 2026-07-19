import type { AccountStatus, AuthUser, UserRole } from "./auth-types";

export function isAdminRole(role: UserRole | undefined | null): boolean {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

export function accountStatusPath(status: AccountStatus): string {
  switch (status) {
    case "PENDING":
      return "/account/pending";
    case "REJECTED":
      return "/account/rejected";
    case "SUSPENDED":
      return "/account/suspended";
    case "APPROVED":
    default:
      return "/account";
  }
}

export function resolvePostAuthPath(user: AuthUser): string {
  if (user.status === "APPROVED") {
    if (isAdminRole(user.role)) {
      return "/account";
    }
    return "/account";
  }
  return accountStatusPath(user.status);
}

export function canAccessAccountHome(user: AuthUser | null): boolean {
  return Boolean(user && user.status === "APPROVED");
}

export function canAccessAdminAccounts(user: AuthUser | null): boolean {
  return Boolean(user && user.status === "APPROVED" && isAdminRole(user.role));
}
