<?php

namespace App\Http\Actions\Article;

use App\Http\Requests\Article\ArticleStoreRequest;
use App\Models\Article;

class StoreArticleAction
{
    public function execute(ArticleStoreRequest $request): array
    {
        $dto = $request->toDto();
        $newArticle = new Article();
        $newArticle->title = $dto->title;
        $newArticle->content = $dto->content;
        $newArticle->save();
        return ['article' => $newArticle];
    }
}
