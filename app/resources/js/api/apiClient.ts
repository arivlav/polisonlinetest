export class ApiHttpError extends Error {
    public readonly status: number;
    public readonly payload: unknown;

    public constructor(status: number, payload: unknown) {
        super(`HTTP ${status}`);
        this.status = status;
        this.payload = payload;
    }
}

type Json = unknown;

function mergeHeaders(base: HeadersInit | undefined, extra: HeadersInit): HeadersInit {
    if (!base) return extra;
    return { ...(base as Record<string, string>), ...(extra as Record<string, string>) };
}

export async function requestJson<T = Json>(url: string, init: RequestInit = {}): Promise<T> {
    const headers = mergeHeaders(init.headers, {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    });

    const res = await fetch(url, { ...init, headers });
    const payload = await res.json().catch(() => null);

    if (!res.ok) {
        throw new ApiHttpError(res.status, payload);
    }

    return payload as T;
}

export async function getJson<T = Json>(url: string, init: RequestInit = {}): Promise<T> {
    return requestJson<T>(url, { ...init, method: 'GET' });
}

export async function postJson<T = Json>(
    url: string,
    body: unknown,
    init: RequestInit = {}
): Promise<T> {
    const headers = mergeHeaders(init.headers, { 'Content-Type': 'application/json' });
    return requestJson<T>(url, {
        ...init,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
}

