import type { Article } from '@/types/articles';

type Props = {
    article: Article;
};

export function ArticleDetails({ article }: Props) {
    return (
        <header>
            <h1 className="mb-2">{article.title}</h1>
            <div className="text-muted mb-4">{new Date(article.created_at).toLocaleString()}</div>
            <div className="mb-6">{article.content}</div>
        </header>
    );
}

