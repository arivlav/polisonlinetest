export type ApiSuccessResponse<T> = {
    success: true;
    data: T;
};

export type ApiErrorResponse = {
    success: false;
    message: string;
    debug?: unknown;
    errors?: Record<string, string | string[]>;
};

