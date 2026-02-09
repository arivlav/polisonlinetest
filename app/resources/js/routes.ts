import { buildRouteUrl } from '@/helpers/routesHelper';

export const routes = {
    home: () => buildRouteUrl('/'),
    articles: {
        index: () => buildRouteUrl('/articles'),
        create: () => buildRouteUrl('/articles/create'),
        show: (id: number | string) => buildRouteUrl(`/articles/${id}`),
    },
    api: {
        articles: {
            index: (query?: { page?: number; per_page?: number }) => buildRouteUrl('/api/articles', query),
            show: (id: number | string) => buildRouteUrl(`/api/articles/${id}`),
            store: () => buildRouteUrl('/api/articles'),
            comments: {
                store: (id: number | string) => buildRouteUrl(`/api/articles/${id}/comments`),
            },
        },
    },
} as const;

