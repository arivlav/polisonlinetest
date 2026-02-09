import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { Article } from '@/types/articles';
import { routes } from '@/routes';
import { fetchArticles } from '@/api/articlesApi';
import { ArticleCard } from '@/components/Article/ArticleCard';
import type { LengthAwarePaginator } from '@/types/pagination';
import { Pagination } from '@/components/Pagination';

export default function ArticlesIndex() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [paginator, setPaginator] = useState<LengthAwarePaginator<Article> | null>(null);

  useEffect(() => {
    fetchArticles({ per_page: perPage, page }).then((paginator) => {
      setPaginator(paginator);
    });
  }, [page, perPage]);

  const articles = paginator?.data ?? [];
  const currentPage = paginator?.current_page ?? page;
  const lastPage = paginator?.last_page ?? page;

  function goToPage(p: number) {
    const next = Math.min(Math.max(1, p), lastPage);
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Head title="Articles" />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Articles</h1>
          <a href={routes.articles.create()} className="btn btn-outline-primary btn-sm">New article</a>
        </div>

        <div className="row g-3">
          {articles.map((a) => (
            <div key={a.id} className="col-12">
              <ArticleCard article={a} href={routes.articles.show(a.id)} />
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          ariaLabel="Articles pagination"
          onPageChange={goToPage}
        />
      </div>
    </>
  );
}

