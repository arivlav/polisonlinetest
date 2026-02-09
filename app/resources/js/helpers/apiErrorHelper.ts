import { ApiHttpError } from '@/api/apiClient';
import type { ApiErrorResponse } from '@/types/api';

export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof ApiHttpError) {
        const payload = (error.payload ?? {}) as Partial<ApiErrorResponse> | Record<string, unknown>;
        const message = (payload as any).message;
        if (typeof message === 'string' && message.trim().length > 0) {
            return message;
        }
    }

    return fallback;
}

export function getApiValidationErrors(error: unknown): Record<string, unknown> | null {
    if (!(error instanceof ApiHttpError)) {
        return null;
    }
    if (error.status !== 422) {
        return null;
    }

    const payload = (error.payload ?? {}) as any;
    if (payload && typeof payload === 'object' && payload.errors && typeof payload.errors === 'object') {
        return payload.errors as Record<string, unknown>;
    }

    return null;
}

