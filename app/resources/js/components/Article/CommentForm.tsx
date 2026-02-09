import type { CommentCreateErrors } from '@/types/forms';

type Props = {
    authorName: string;
    content: string;
    errors: CommentCreateErrors;
    onAuthorNameChange: (value: string) => void;
    onContentChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
};

export function CommentForm({
    authorName,
    content,
    errors,
    onAuthorNameChange,
    onContentChange,
    onSubmit,
}: Props) {
    return (
        <section className="mt-3">
            <h3 className="mb-2">Add comment</h3>
            <form onSubmit={onSubmit} noValidate>
                <div className="mb-2">
                    <input
                        className={`form-control ${errors.author_name ? 'is-invalid' : ''}`}
                        placeholder="Your name"
                        value={authorName}
                        onChange={(e) => onAuthorNameChange(e.target.value)}
                    />
                    {errors.author_name && <div className="invalid-feedback">{errors.author_name}</div>}
                </div>
                <div className="mb-2">
                    <textarea
                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                        placeholder="Comment"
                        value={content}
                        onChange={(e) => onContentChange(e.target.value)}
                    />
                    {errors.content && <div className="invalid-feedback">{errors.content}</div>}
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
}

