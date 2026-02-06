<?php

namespace App\Http\Controllers\Api;

use App\Http\Actions\Comment\StoreCommentAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\CommentStoreRequest;
use App\Http\Responses\ApiSuccessResponse;
use Illuminate\Contracts\Support\Responsable;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends Controller
{
    public function __construct(
        private readonly StoreCommentAction $storeCommentAction
    )
    {
    }
    /**
     * Store a newly created comment for a given article.
     */
    public function store(CommentStoreRequest $request, int $id): Responsable
    {
        $data = $this->storeCommentAction->execute($request, $id);
        return new ApiSuccessResponse($data, Response::HTTP_CREATED);
    }
}

