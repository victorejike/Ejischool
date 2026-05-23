export const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let authorization: Record<string, string> = {};
  if (typeof window !== "undefined") {
    const saved = window.localStorage.getItem("ejischool-session");
    if (saved) {
      try {
        const session = JSON.parse(saved) as { accessToken?: string };
        if (session.accessToken) {
          authorization = { Authorization: `Bearer ${session.accessToken}` };
        }
      } catch {
        window.localStorage.removeItem("ejischool-session");
      }
    }
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authorization,
      ...(init?.headers ?? {})
    }
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof payload.error === "string" ? payload.error : "Request failed");
  }
  return payload as T;
}
