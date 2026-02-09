import { routes } from '@/routes';
import type { Article, Comment } from '@/types/articles';
import type { LengthAwarePaginator } from '@/types/pagination';
import { getJson, postJson } from '@/api/apiClient';
import type { ApiSuccessResponse } from '@/types/api';
import { unwrapApiResponse } from '@/helpers/apiResponseHelper';

export async function fetchArticles(params: { page?: number; per_page?: number }): Promise<LengthAwarePaginator<Article>> {
    const response = await getJson<ApiSuccessResponse<{ articles: LengthAwarePaginator<Article> }>>(routes.api.articles.index(params));
    const data = unwrapApiResponse<{ articles: LengthAwarePaginator<Article> }>(response);
    return data.articles;
}

export async function fetchArticle(id: number | string): Promise<Article> {
    const response = await getJson<ApiSuccessResponse<{ article: Article }>>(routes.api.articles.show(id));
    const data = unwrapApiResponse<{ article: Article }>(response);
    return data.article;
}

export async function createArticle(payload: { title: string; content: string }): Promise<Article> {
    const response = await postJson<ApiSuccessResponse<{ article: Article }>>(routes.api.articles.store(), payload);
    const data = unwrapApiResponse<{ article: Article }>(response);
    return data.article;
}

export async function createComment(
    articleId: number | string,
    payload: { author_name: string; content: string }
): Promise<Comment> {
    const response = await postJson<ApiSuccessResponse<{ comment: Comment }>>(routes.api.articles.comments.store(articleId), payload);
    const data = unwrapApiResponse<{ comment: Comment }>(response);
    return data.comment;
}

