export type FieldErrors<TFields extends string> = Partial<Record<TFields, string>>;

export type ArticleCreateFields = 'title' | 'content';
export type ArticleCreateValues = Record<ArticleCreateFields, string>;
export type ArticleCreateErrors = FieldErrors<ArticleCreateFields>;

export type CommentCreateFields = 'author_name' | 'content';
export type CommentCreateValues = Record<CommentCreateFields, string>;
export type CommentCreateErrors = FieldErrors<CommentCreateFields>;

