import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { Article } from '@/types/articles';
import { createComment, fetchArticle } from '@/api/articlesApi';
import { getApiErrorMessage, getApiValidationErrors } from '@/helpers/apiErrorHelper';
import type { CommentCreateErrors } from '@/types/forms';
import { validateCommentCreate } from '@/helpers/formValidationHelper';
import { BootstrapModal } from '@/components/BootstrapModal';
import { useErrorModal } from '@/hooks/useErrorModal';
import { ArticleDetails } from '@/components/Article/ArticleDetails';
import { CommentItem } from '@/components/Article/CommentItem';
import { CommentForm } from '@/components/Article/CommentForm';
import { routes } from '@/routes';

export default function ArticleShow({ id }: { id: number | string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<CommentCreateErrors>({});
  const { modalProps, showError } = useErrorModal();

  useEffect(() => {
    fetchArticle(id).then(setArticle);
  }, [id]);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateCommentCreate({ author_name: authorName, content });
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const newComment = await createComment(id, {
        author_name: authorName.trim(),
        content: content.trim(),
      });

      setArticle((prev) => {
        if (!prev) return prev;
        const nextComments = [...(prev.comments ?? []), newComment];
        return { ...prev, comments: nextComments };
      });

      setAuthorName('');
      setContent('');
      setErrors({});
    } catch (e) {
      const apiValidationErrors = getApiValidationErrors(e);
      if (apiValidationErrors) {
        setErrors(apiValidationErrors as any);
        return;
      }

      showError(getApiErrorMessage(e, 'Error adding comment'));
    }
  }

  if (!article) {
    return <div className="p-6">Loading…</div>;
  }

  return (
    <>
      <Head title={article.title} />
      <BootstrapModal
        {...modalProps}
      />
      <div className="container py-4">
        <div className="mb-3">
          <a href={routes.articles.index()} className="link-secondary text-decoration-none">
            ← Back to articles
          </a>
        </div>
        <ArticleDetails article={article} />

        <section className="mt-3 mb-6">
          <h2 className="text-lg font-medium mb-2">Comments</h2>
          <div className="space-y-3">
            {(article.comments ?? []).map((c) => (
              <CommentItem key={c.id} comment={c} />
            ))}
          </div>
        </section>

        <CommentForm
          authorName={authorName}
          content={content}
          errors={errors}
          onAuthorNameChange={(value) => {
            setAuthorName(value);
            if (errors.author_name) setErrors((s) => ({ ...s, author_name: undefined }));
          }}
          onContentChange={(value) => {
            setContent(value);
            if (errors.content) setErrors((s) => ({ ...s, content: undefined }));
          }}
          onSubmit={submitComment}
        />
      </div>
    </>
  );
}

