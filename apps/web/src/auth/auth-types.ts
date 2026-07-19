import type { AccountStatus, UserRole } from "@iplay/shared";

export type { AccountStatus, UserRole } from "@iplay/shared";
export type { AuthUser, ApiErrorResponse } from "@iplay/shared";
export { AuthErrorCode, SELF_REGISTER_ROLES } from "@iplay/shared";
export type { SelfRegisterRole } from "@iplay/shared";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthState {
  user: import("@iplay/shared").AuthUser | null;
  status: AuthStatus;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: import("@iplay/shared").SelfRegisterRole;
  // Marketer
  whatsappNumber?: string;
  city?: string;
  businessOrPageName?: string;
  facebookPage?: string;
  instagramPage?: string;
  marketingMethod?: string;
  // Wholesale
  businessName?: string;
  businessType?: string;
  wholesaleCity?: string;
  address?: string;
  expectedOrderVolume?: string;
}

export interface AuthSessionResponse {
  user: import("@iplay/shared").AuthUser;
  accessToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface AdminUserListResponse {
  users: Array<
    import("@iplay/shared").AuthUser & {
      marketerProfile?: Record<string, string | null> | null;
      wholesaleTraderProfile?: Record<string, string | null> | null;
    }
  >;
  total: number;
}

export type AccountStatusFilter = AccountStatus | "ALL";
export type RoleFilter = UserRole | "ALL";
