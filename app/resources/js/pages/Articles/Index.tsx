import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Article = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  comments_count?: number;
};

export default function ArticlesIndex() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  useEffect(() => {
    fetch(`/api/articles?per_page=${perPage}&page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        // API wraps data under `data` key because of ApiSuccessResponse
        const payload = data.data?.articles ?? data.articles ?? data;
        setArticles(payload.data ?? payload);
      });
  }, [page, perPage]);

  return (
    <>
      <Head title="Articles" />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">Articles</h1>
          <a href="/articles/create" className="btn btn-outline-primary btn-sm">New article</a>
        </div>

        <div className="row g-3">
          {articles.map((a) => (
            <div key={a.id} className="col-12">
              <div className="card">
                <div className="card-body">
                  <a href={`/articles/${a.id}`} className="h5 card-title text-decoration-none">{a.title}</a>
                  <div className="text-muted small">{new Date(a.created_at).toLocaleString()}</div>
                  <p className="card-text mt-2">{a.content.slice(0, 200)}{a.content.length > 200 ? '…' : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="btn btn-sm btn-secondary"
          >
            Prev
          </button>
          <div>Page {page}</div>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="btn btn-sm btn-secondary"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

