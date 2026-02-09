import type {
    ArticleCreateErrors,
    ArticleCreateValues,
    CommentCreateErrors,
    CommentCreateValues,
} from '@/types/forms';

function isBlank(value: string): boolean {
    return value.trim().length === 0;
}

export function validateArticleCreate(values: ArticleCreateValues): ArticleCreateErrors {
    const errors: ArticleCreateErrors = {};

    if (isBlank(values.title)) {
        errors.title = 'Title is required';
    }
    if (isBlank(values.content)) {
        errors.content = 'Content is required';
    }

    return errors;
}

export function validateCommentCreate(values: CommentCreateValues): CommentCreateErrors {
    const errors: CommentCreateErrors = {};

    if (isBlank(values.author_name)) {
        errors.author_name = 'Name is required';
    }
    if (isBlank(values.content)) {
        errors.content = 'Comment is required';
    }

    return errors;
}

