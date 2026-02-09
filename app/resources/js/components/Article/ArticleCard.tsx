import type { Article } from '@/types/articles';

type Props = {
    article: Article;
    href: string;
};

export function ArticleCard({ article, href }: Props) {
    const createdAt = new Date(article.created_at).toLocaleString();
    const excerpt = article.content.length > 200 ? `${article.content.slice(0, 200)}…` : article.content;
    const commentsCount =
        typeof article.comments_count === 'number' ? article.comments_count : undefined;

    return (
        <a
            href={href}
            className="d-block text-decoration-none text-body"
            aria-label={`Open article: ${article.title}`}
        >
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between gap-3">
                        <div className="h5 card-title mb-1">{article.title}</div>
                        {commentsCount !== undefined && (
                            <span
                                className="badge text-bg-secondary align-self-start"
                                title="Comments count"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                            >
                                {commentsCount}
                            </span>
                        )}
                    </div>
                    <div className="text-muted small">{createdAt}</div>
                    <p className="card-text mt-2 mb-0">{excerpt}</p>
                </div>
            </div>
        </a>
    );
}

