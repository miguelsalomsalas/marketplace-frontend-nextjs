import { apiConfig } from "@/lib/config";

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type QueryValue = string | number | boolean | undefined;

interface ApiFetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, QueryValue>;
  body?: unknown;
  /** Next.js ISR revalidation window in seconds. `false` disables caching. */
  revalidate?: number | false;
  tags?: string[];
}

/**
 * Thin fetch wrapper around the separate NestJS backend.
 * All marketplace data (cars, sellers, etc.) is expected to live there —
 * this app only renders it.
 */
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  if (!apiConfig.baseUrl) {
    throw new ApiError("API_URL no está configurada.");
  }

  const { method = "GET", params, body, revalidate = 60, tags } = options;

  const url = new URL(`${apiConfig.baseUrl}${path.startsWith("/") ? path : `/${path}`}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const res = await fetch(url.toString(), {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next: { revalidate, tags },
  });

  if (!res.ok) {
    throw new ApiError(
      `La API respondió ${res.status} para ${path}`,
      res.status
    );
  }

  return (await res.json()) as T;
}
