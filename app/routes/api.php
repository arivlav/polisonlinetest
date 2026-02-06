<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    ArticleController,
    CommentController
};

// API routes for articles
Route::resource('articles', ArticleController::class)
    ->only(['index', 'show', 'store']);
Route::post('/articles/{id}/comments', [CommentController::class, 'store']);
