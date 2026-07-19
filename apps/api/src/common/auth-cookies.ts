import type { CookieOptions, Request, Response } from "express";

export const REFRESH_COOKIE_NAME = "vk_refresh";

export function getRefreshTokenFromRequest(req: Request): string | undefined {
  const cookies = (req as Request & { cookies?: Record<string, string> })
    .cookies;
  const fromCookie = cookies?.[REFRESH_COOKIE_NAME];
  if (typeof fromCookie === "string" && fromCookie.length > 0) {
    return fromCookie;
  }
  return undefined;
}

export function refreshCookieOptions(): CookieOptions {
  const sameSiteEnv = (process.env.COOKIE_SAME_SITE ?? "lax").toLowerCase();
  const sameSite =
    sameSiteEnv === "none" || sameSiteEnv === "strict" || sameSiteEnv === "lax"
      ? sameSiteEnv
      : "lax";

  const secure =
    process.env.COOKIE_SECURE === "true" ||
    process.env.NODE_ENV === "production";

  const options: CookieOptions = {
    httpOnly: true,
    secure,
    sameSite,
    path: process.env.COOKIE_PATH || "/api/auth",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  const domain = process.env.COOKIE_DOMAIN;
  if (domain) {
    options.domain = domain;
  }

  return options;
}

export function setRefreshCookie(res: Response, refreshToken: string): void {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions());
}

export function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    ...refreshCookieOptions(),
    maxAge: 0,
  });
}
