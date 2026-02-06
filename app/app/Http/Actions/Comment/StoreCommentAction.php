<?php

namespace App\Http\Actions\Comment;

use App\DTO\Comment\StoreCommentDto;
use App\Http\Requests\Comment\CommentStoreRequest;
use App\Models\Article;
use App\Models\Comment;
use Symfony\Component\HttpFoundation\Response;

class StoreCommentAction
{
    public function execute(CommentStoreRequest $request, int $articleId): array
    {
        $article = Article::find($articleId);
        if (!$article) {
            abort('Article not found', Response::HTTP_NOT_FOUND);
        }
        $dto = $request->toDto();
        $comment = $this->storeComment($dto, $articleId);
        return ['comment' => $comment];
    }

    private function storeComment(StoreCommentDto $dto, int $articleId): Comment
    {
        $newComment = new Comment();
        $newComment->article_id = $articleId;
        $newComment->author_name = $dto->author_name;
        $newComment->content = $dto->content;
        $newComment->save();
        return $newComment;
    }
}
