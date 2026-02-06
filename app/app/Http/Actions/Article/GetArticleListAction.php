<?php

namespace App\Http\Actions\Article;

use App\Http\Requests\Article\ArticleListRequest;
use App\Models\Article;

class GetArticleListAction
{
    public function execute(ArticleListRequest $request): array
    {
        $dto = $request->toDto();
        $articles = Article::getArticleList($dto);
        return [
            'articles' => $articles
        ];
    }
}
