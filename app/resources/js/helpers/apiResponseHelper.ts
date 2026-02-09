import type { ApiSuccessResponse } from '@/types/api';

export function unwrapApiResponse<T>(response: unknown): T {
    const maybeWrapped = response as Partial<ApiSuccessResponse<T>> | null;

    if (maybeWrapped && typeof maybeWrapped === 'object' && 'data' in maybeWrapped) {
        return (maybeWrapped as ApiSuccessResponse<T>).data;
    }

    return response as T;
}

