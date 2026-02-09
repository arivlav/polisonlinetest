import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { routes } from '@/routes';
import { createArticle } from '@/api/articlesApi';
import { getApiErrorMessage, getApiValidationErrors } from '@/helpers/apiErrorHelper';
import type { ArticleCreateErrors } from '@/types/forms';
import { validateArticleCreate } from '@/helpers/formValidationHelper';
import { redirectTo } from '@/helpers/navigationHelper';
import { BootstrapModal } from '@/components/BootstrapModal';
import { useErrorModal } from '@/hooks/useErrorModal';

export default function ArticleCreate() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<ArticleCreateErrors>({});
  const { modalProps, showError } = useErrorModal();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateArticleCreate({ title, content });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createArticle({ title: title.trim(), content: content.trim() });
      redirectTo(routes.articles.index());
    } catch (e) {
      const apiValidationErrors = getApiValidationErrors(e);
      if (apiValidationErrors) {
        setErrors(apiValidationErrors as any);
        return;
      }

      showError(getApiErrorMessage(e, 'Error creating article'));
    }
  }

  return (
    <>
      <Head title="Create article" />
      <BootstrapModal
        {...modalProps}
      />
      <div className="container py-4">
        <div className="mb-3">
          <a href={routes.articles.index()} className="link-secondary text-decoration-none">
            ← Back to articles
          </a>
        </div>
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

