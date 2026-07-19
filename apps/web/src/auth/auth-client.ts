import { AuthApiError } from "./auth-errors";
import type {
  AdminUserListResponse,
  AuthSessionResponse,
  AuthUser,
  LoginInput,
  RefreshResponse,
  RegisterInput,
} from "./auth-types";

const PROXY_BASE = "/api/backend";

type AccessTokenGetter = () => string | null;
type AccessTokenSetter = (token: string | null) => void;

let getAccessToken: AccessTokenGetter = () => null;
let setAccessToken: AccessTokenSetter = () => undefined;
let refreshPromise: Promise<string | null> | null = null;

export function bindAuthTokenAccessors(
  getter: AccessTokenGetter,
  setter: AccessTokenSetter,
) {
  getAccessToken = getter;
  setAccessToken = setter;
}

async function parseError(response: Response): Promise<AuthApiError> {
  const body = (await response.json().catch(() => ({}))) as {
    message?: string;
    code?: string;
    statusCode?: number;
  };
  return new AuthApiError(
    response.status,
    body.message || response.statusText || "Request failed",
    body.code,
  );
}

async function authFetch<T>(
  path: string,
  init: RequestInit = {},
  retry = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = getAccessToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${PROXY_BASE}${path}`, {
      ...init,
      headers,
      credentials: "include",
    });
  } catch {
    throw new AuthApiError(503, "API unavailable", "API_UNAVAILABLE");
  }

  if (response.status === 401 && retry && path !== "/auth/refresh" && path !== "/auth/login") {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return authFetch<T>(path, init, false);
    }
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as T;
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const data = await authFetch<RefreshResponse>(
        "/auth/refresh",
        { method: "POST", body: JSON.stringify({}) },
        false,
      );
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      setAccessToken(null);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

export async function login(input: LoginInput): Promise<AuthSessionResponse> {
  const data = await authFetch<AuthSessionResponse>(
    "/auth/login",
    { method: "POST", body: JSON.stringify(input) },
    false,
  );
  setAccessToken(data.accessToken);
  return data;
}

export async function register(input: RegisterInput): Promise<AuthSessionResponse> {
  const data = await authFetch<AuthSessionResponse>(
    "/auth/register",
    { method: "POST", body: JSON.stringify(input) },
    false,
  );
  setAccessToken(data.accessToken);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await authFetch<void>(
      "/auth/logout",
      { method: "POST", body: JSON.stringify({}) },
      false,
    );
  } finally {
    setAccessToken(null);
  }
}

export async function loadCurrentUser(): Promise<AuthUser> {
  return authFetch<AuthUser>("/auth/me", { method: "GET" });
}

export async function listAdminUsers(params: {
  status?: string;
  role?: string;
  page?: number;
  pageSize?: number;
}): Promise<AdminUserListResponse> {
  const search = new URLSearchParams();
  if (params.status && params.status !== "ALL") search.set("status", params.status);
  if (params.role && params.role !== "ALL") search.set("role", params.role);
  if (params.page) search.set("page", String(params.page));
  if (params.pageSize) search.set("pageSize", String(params.pageSize));
  const qs = search.toString();
  return authFetch<AdminUserListResponse>(
    `/admin/users${qs ? `?${qs}` : ""}`,
    { method: "GET" },
  );
}

export async function updateAccountStatus(
  id: string,
  status: "APPROVED" | "REJECTED" | "SUSPENDED",
  note?: string,
): Promise<AuthUser> {
  return authFetch<AuthUser>(`/admin/users/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, note }),
  });
}
