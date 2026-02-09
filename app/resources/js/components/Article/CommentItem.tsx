import type { Comment } from '@/types/articles';

type Props = {
    comment: Comment;
};

export function CommentItem({ comment }: Props) {
    return (
        <div className="mt-2 p-3 border rounded">
            <div className="text-sm text-gray-700 font-medium">{comment.author_name}</div>
            <div className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleString()}</div>
            <div className="mt-1 text-sm">{comment.content}</div>
        </div>
    );
}

