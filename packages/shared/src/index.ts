export type UserRole =
  | "CUSTOMER"
  | "MARKETER"
  | "WHOLESALE_TRADER"
  | "ORDER_EMPLOYEE"
  | "SALES_MANAGER"
  | "ADMIN"
  | "SUPER_ADMIN";

export type AccountStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export const SELF_REGISTER_ROLES = [
  "CUSTOMER",
  "MARKETER",
  "WHOLESALE_TRADER",
] as const satisfies readonly UserRole[];

export type SelfRegisterRole = (typeof SELF_REGISTER_ROLES)[number];

export const ACCOUNT_STATUSES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "SUSPENDED",
] as const satisfies readonly AccountStatus[];

/** Allowed admin-driven status transitions. */
export const ACCOUNT_STATUS_TRANSITIONS: Record<
  AccountStatus,
  readonly AccountStatus[]
> = {
  PENDING: ["APPROVED", "REJECTED"],
  APPROVED: ["SUSPENDED"],
  REJECTED: [],
  SUSPENDED: ["APPROVED"],
};

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  status: AccountStatus;
  createdAt?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  code?: string;
  message: string;
}

export const AuthErrorCode = {
  EMAIL_EXISTS: "EMAIL_EXISTS",
  PHONE_EXISTS: "PHONE_EXISTS",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  ACCOUNT_SUSPENDED: "ACCOUNT_SUSPENDED",
  ACCOUNT_REJECTED: "ACCOUNT_REJECTED",
  ACCOUNT_PENDING: "ACCOUNT_PENDING",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  INVALID_STATUS_TRANSITION: "INVALID_STATUS_TRANSITION",
  VALIDATION_FAILED: "VALIDATION_FAILED",
  RATE_LIMITED: "RATE_LIMITED",
  NOT_FOUND: "NOT_FOUND",
  API_UNAVAILABLE: "API_UNAVAILABLE",
} as const;

export type AuthErrorCode =
  (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

export interface HealthResponse {
  status: "ok" | "error";
  service: string;
  timestamp: string;
}

export interface DatabaseHealthResponse {
  status: "ok" | "error";
  database: string;
}
