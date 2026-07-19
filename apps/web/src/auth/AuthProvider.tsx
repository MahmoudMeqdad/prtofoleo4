"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as authClient from "./auth-client";
import { bindAuthTokenAccessors } from "./auth-client";
import { isAuthApiError } from "./auth-errors";
import type {
  AuthState,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "./auth-types";

interface AuthContextValue extends AuthState {
  login: (input: LoginInput) => Promise<AuthUser>;
  register: (input: RegisterInput) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<AuthUser | null>;
  loadCurrentUser: () => Promise<AuthUser | null>;
  apiAvailable: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthState["status"]>("loading");
  const [apiAvailable, setApiAvailable] = useState(true);
  const accessTokenRef = useRef<string | null>(null);
  const bootstrapped = useRef(false);

  useEffect(() => {
    bindAuthTokenAccessors(
      () => accessTokenRef.current,
      (token) => {
        accessTokenRef.current = token;
      },
    );
  }, []);

  const normalizeUser = useCallback((raw: AuthUser): AuthUser => {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      phone: raw.phone ?? undefined,
      role: raw.role,
      status: raw.status,
      createdAt:
        typeof raw.createdAt === "string"
          ? raw.createdAt
          : raw.createdAt
            ? new Date(raw.createdAt as unknown as string).toISOString()
            : undefined,
    };
  }, []);

  const refresh = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const token = await authClient.refreshAccessToken();
      if (!token) {
        setUser(null);
        setStatus("unauthenticated");
        return null;
      }
      const me = normalizeUser(await authClient.loadCurrentUser());
      setUser(me);
      setStatus("authenticated");
      setApiAvailable(true);
      return me;
    } catch (error) {
      if (isAuthApiError(error) && error.code === "API_UNAVAILABLE") {
        setApiAvailable(false);
      }
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }
  }, [normalizeUser]);

  const loadCurrentUser = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const me = normalizeUser(await authClient.loadCurrentUser());
      setUser(me);
      setStatus("authenticated");
      setApiAvailable(true);
      return me;
    } catch (error) {
      if (isAuthApiError(error) && error.statusCode === 401) {
        return refresh();
      }
      if (isAuthApiError(error) && error.code === "API_UNAVAILABLE") {
        setApiAvailable(false);
      }
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }
  }, [normalizeUser, refresh]);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    let cancelled = false;
    (async () => {
      try {
        const token = await authClient.refreshAccessToken();
        if (cancelled) return;
        if (!token) {
          setStatus("unauthenticated");
          return;
        }
        const me = normalizeUser(await authClient.loadCurrentUser());
        if (cancelled) return;
        setUser(me);
        setStatus("authenticated");
        setApiAvailable(true);
      } catch (error) {
        if (cancelled) return;
        if (isAuthApiError(error) && error.code === "API_UNAVAILABLE") {
          setApiAvailable(false);
        }
        setUser(null);
        setStatus("unauthenticated");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [normalizeUser]);

  const login = useCallback(
    async (input: LoginInput) => {
      const session = await authClient.login(input);
      const next = normalizeUser(session.user);
      setUser(next);
      setStatus("authenticated");
      setApiAvailable(true);
      return next;
    },
    [normalizeUser],
  );

  const register = useCallback(
    async (input: RegisterInput) => {
      const session = await authClient.register(input);
      const next = normalizeUser(session.user);
      setUser(next);
      setStatus("authenticated");
      setApiAvailable(true);
      return next;
    },
    [normalizeUser],
  );

  const logout = useCallback(async () => {
    try {
      await authClient.logout();
    } finally {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      apiAvailable,
      login,
      register,
      logout,
      refresh,
      loadCurrentUser,
    }),
    [user, status, apiAvailable, login, register, logout, refresh, loadCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
