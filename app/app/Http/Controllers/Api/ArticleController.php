<?php

namespace App\Http\Controllers\Api;

use App\Http\Actions\Article\ShowArticleAction;
use App\Http\Actions\Article\StoreArticleAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Article\ArticleListRequest;
use App\Http\Requests\Article\ArticleStoreRequest;
use App\Http\Responses\ApiSuccessResponse;
use App\Http\Actions\Article\GetArticleListAction;
use Illuminate\Contracts\Support\Responsable;
use Symfony\Component\HttpFoundation\Response;

class ArticleController extends Controller
{
    public function __construct(
        private readonly GetArticleListAction $getArticleAction,
        private readonly ShowArticleAction $showArticleAction,
        private readonly StoreArticleAction $storeArticleAction
    )
    {
    }

    public function index(ArticleListRequest $request): Responsable
    {
        $data = $this->getArticleAction->execute($request);
        return new ApiSuccessResponse($data);
    }

    public function show(int $id): Responsable
    {
        $data = $this->showArticleAction->execute($id);
        return new ApiSuccessResponse($data);
    }

    public function store(ArticleStoreRequest $request): Responsable
    {
        $data = $this->storeArticleAction->execute($request);
        return new ApiSuccessResponse($data, Response::HTTP_CREATED);
    }
}

