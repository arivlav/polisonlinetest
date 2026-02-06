<?php

namespace App\Http\Actions\Article;

use App\DTO\Article\GetArticleListDto;
use App\Http\Responses\ApiErrorResponse;
use App\Models\Article;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\Response;

class ShowArticleAction
{
    public function execute(int $articleId): array
    {
        $article = Article::with('comments')->find($articleId);
        if (!$article) {
            abort(Response::HTTP_NOT_FOUND);
        }
        return ['article' => $article];
    }
}
