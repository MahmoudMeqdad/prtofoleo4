import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  locales,
} from "./src/i18n/config";

const EXCLUDED_PREFIXES = ["/dev", "/design-system", "/api", "/media", "/_next"];

function isExcluded(pathname: string): boolean {
  if (pathname === "/favicon.ico") return true;
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return true;
  }
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function resolvePreferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isExcluded(pathname)) {
    return NextResponse.next();
  }

  const pathnameLocale = pathname.split("/")[1];
  const hasLocalePrefix = isLocale(pathnameLocale);

  if (hasLocalePrefix) {
    const response = NextResponse.next();
    response.cookies.set(localeCookieName, pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = resolvePreferredLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
