import type { RouteQuery } from '@/types/routes';

export function buildQueryString(query?: RouteQuery): string {
    if (!query) {
        return '';
    }

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) {
            continue;
        }
        params.set(key, String(value));
    }

    const qs = params.toString();
    return qs ? `?${qs}` : '';
}

export function buildRouteUrl(path: string, query?: RouteQuery): string {
    return `${path}${buildQueryString(query)}`;
}

