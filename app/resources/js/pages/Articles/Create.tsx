import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ArticleCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: { title?: string; content?: string } = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!content.trim()) errs.content = 'Content is required';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim(), content: content.trim() }),
    });
    if (res.ok) {
      window.location.href = '/articles';
    } else if (res.status === 422) {
      const data = await res.json().catch(() => ({}));
      setErrors(data.errors ?? {});
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.message ?? 'Error creating article');
    }
  }

  return (
    <>
      <Head title="Create article" />
      <div className="container py-4">
        <h1 className="mb-4">Create article</h1>
        <form onSubmit={submit} noValidate>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((s) => ({ ...s, title: undefined }));
              }}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              className={`form-control ${errors.content ? 'is-invalid' : ''}`}
              placeholder="Content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors((s) => ({ ...s, content: undefined }));
              }}
              rows={8}
            />
            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
          </div>

          <div>
            <button type="submit" className="btn btn-success">Create</button>
          </div>
        </form>
      </div>
    </>
  );
}

