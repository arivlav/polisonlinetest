import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Comment = {
  id: number;
  author_name: string;
  content: string;
  created_at: string;
};

type Article = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  comments?: Comment[];
};

export default function ArticleShow({ id }: { id: number | string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ author_name?: string; content?: string }>({});

  useEffect(() => {
    fetch(`/api/articles/${id}`, {
        headers: {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
      .then((r) => r.json())
      .then((data) => {
        const payload = data.data ?? data;
        // handle API that returns { data: { article: {...} } } or { article: {...} } or direct article
        const articlePayload = payload.article ?? payload;
        setArticle(articlePayload);
      });
  }, [id]);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    const errs: { author_name?: string; content?: string } = {};
    if (!authorName.trim()) errs.author_name = 'Name is required';
    if (!content.trim()) errs.content = 'Comment is required';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const res = await fetch(`/api/articles/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author_name: authorName.trim(), content: content.trim() }),
    });

    if (res.ok) {
      const responseJson = await res.json().catch(() => ({}));
      const payload = responseJson.data ?? responseJson;
      const newComment = payload.comment ?? payload;

      setArticle((prev) => {
        if (!prev) return prev;
        const nextComments = [...(prev.comments ?? []), newComment];
        return { ...prev, comments: nextComments };
      });

      setAuthorName('');
      setContent('');
      setErrors({});
    } else if (res.status === 422) {
      const data = await res.json().catch(() => ({}));
      setErrors(data.errors ?? {});
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message ?? 'Error adding comment');
    }
  }

  if (!article) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <>
      <Head title={article.title} />
      <div className="container py-4">
        <h1 className="mb-2">{article.title}</h1>
        <div className="text-muted mb-4">{new Date(article.created_at).toLocaleString()}</div>
        <div className="mb-6">{article.content}</div>

        <section className="mb-6">
          <h2 className="text-lg font-medium mb-2">Comments</h2>
          <div className="space-y-3">
            {(article.comments ?? []).map((c) => (
              <div key={c.id} className="p-3 border rounded">
                <div className="text-sm text-gray-700 font-medium">{c.author_name}</div>
                <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
                <div className="mt-1 text-sm">{c.content}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-2">Add comment</h3>
          <form onSubmit={submitComment} noValidate>
            <div className="mb-2">
              <input
                className={`form-control ${errors.author_name ? 'is-invalid' : ''}`}
                placeholder="Your name"
                value={authorName}
                onChange={(e) => {
                  setAuthorName(e.target.value);
                  if (errors.author_name) setErrors((s) => ({ ...s, author_name: undefined }));
                }}
              />
              {errors.author_name && <div className="invalid-feedback">{errors.author_name}</div>}
            </div>
            <div className="mb-2">
              <textarea
                className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                placeholder="Comment"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  if (errors.content) setErrors((s) => ({ ...s, content: undefined }));
                }}
              />
              {errors.content && <div className="invalid-feedback">{errors.content}</div>}
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </section>
      </div>
    </>
  );
}

