"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useAuth } from "@/auth/use-auth";
import { canAccessAdminAccounts, resolvePostAuthPath } from "@/auth/auth-guards";
import { localizedPath } from "@/i18n/config";
import { useDictionary, useLocale } from "@/providers/LocaleProvider";

interface HeaderAccountControlProps {
  className?: string;
  onMenuOpenChange?: (open: boolean) => void;
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

export function HeaderAccountControl({
  className,
  onMenuOpenChange,
}: HeaderAccountControlProps) {
  const { user, status, logout } = useAuth();
  const dictionary = useDictionary();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onMenuOpenChange?.(open);
  }, [open, onMenuOpenChange]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading") {
    return (
      <span
        className={className}
        aria-hidden="true"
      >
        <User className="h-5 w-5 opacity-40" />
      </span>
    );
  }

  if (status !== "authenticated" || !user) {
    return (
      <Link
        href={localizedPath(locale, "/login")}
        aria-label={dictionary.navigation.signIn}
        className={className}
      >
        <User className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only sm:ms-1 sm:text-sm">
          {dictionary.navigation.signIn}
        </span>
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dictionary.auth.accountMenu}
        onClick={() => setOpen((value) => !value)}
        className={className}
      >
        <User className="h-5 w-5" aria-hidden="true" />
        <span className="ms-1 hidden max-w-[7rem] truncate text-sm sm:inline">
          {firstName(user.name)}
        </span>
      </button>
      {open && (
        <ul
          role="menu"
          className="absolute end-0 top-full z-[60] mt-1 min-w-[11rem] rounded-md border border-border bg-white py-1 shadow-lg"
        >
          <li role="none">
            <Link
              role="menuitem"
              href={localizedPath(locale, resolvePostAuthPath(user))}
              className="block px-3 py-2 text-sm hover:bg-surface"
              onClick={() => setOpen(false)}
            >
              {dictionary.auth.myAccount}
            </Link>
          </li>
          {canAccessAdminAccounts(user) && (
            <li role="none">
              <Link
                role="menuitem"
                href={localizedPath(locale, "/admin/accounts")}
                className="block px-3 py-2 text-sm hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {dictionary.auth.reviewAccounts}
              </Link>
            </li>
          )}
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-start text-sm hover:bg-surface"
              onClick={async () => {
                setOpen(false);
                await logout();
              }}
            >
              {dictionary.auth.signOut}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
