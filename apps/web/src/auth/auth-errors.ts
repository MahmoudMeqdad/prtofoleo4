import { AuthErrorCode } from "@iplay/shared";

export class AuthApiError extends Error {
  readonly statusCode: number;
  readonly code?: string;

  constructor(statusCode: number, message: string, code?: string) {
    super(message);
    this.name = "AuthApiError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function isAuthApiError(error: unknown): error is AuthApiError {
  return error instanceof AuthApiError;
}

/** Map stable backend codes to dictionary keys under `auth.errors.*`. */
export function authErrorDictionaryKey(code?: string): string {
  switch (code) {
    case AuthErrorCode.EMAIL_EXISTS:
      return "emailExists";
    case AuthErrorCode.PHONE_EXISTS:
      return "phoneExists";
    case AuthErrorCode.INVALID_CREDENTIALS:
      return "invalidCredentials";
    case AuthErrorCode.ACCOUNT_SUSPENDED:
      return "accountSuspended";
    case AuthErrorCode.ACCOUNT_REJECTED:
      return "accountRejected";
    case AuthErrorCode.ACCOUNT_PENDING:
      return "accountPending";
    case AuthErrorCode.FORBIDDEN:
      return "forbidden";
    case AuthErrorCode.RATE_LIMITED:
      return "rateLimited";
    case AuthErrorCode.VALIDATION_FAILED:
      return "validationFailed";
    case AuthErrorCode.API_UNAVAILABLE:
      return "apiUnavailable";
    case AuthErrorCode.UNAUTHORIZED:
      return "unauthorized";
    default:
      return "generic";
  }
}
