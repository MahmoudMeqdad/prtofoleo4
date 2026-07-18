const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export interface ApiError {
  message: string;
  status: number;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: body.message || response.statusText || "Request failed",
      status: response.status,
    };
    throw error;
  }
  return response.json() as Promise<T>;
}

export async function apiGet<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  return handleResponse<T>(response);
}

export async function apiPost<T>(path: string, body: unknown, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    ...options,
  });
  return handleResponse<T>(response);
}
