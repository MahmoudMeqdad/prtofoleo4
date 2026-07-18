import type { AccountStatus, UserRole } from "@prisma/client";

/** Payload embedded in every access token. */
export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Shape attached to request.user by JwtAuthGuard. */
export interface AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
}
