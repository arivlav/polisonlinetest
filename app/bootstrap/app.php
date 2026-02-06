<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use App\Http\Responses\ApiErrorResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Generic exceptions -> JSON for API requests
        $exceptions->renderable(function (Throwable $e, Request $request) {
            if ($request->is('api/*') && env('APP_DEBUG') !== 'production') {
                $status = $e instanceof HttpException ? $e->getStatusCode() : Response::HTTP_INTERNAL_SERVER_ERROR;
                return new ApiErrorResponse($e->getMessage() ?: 'Server Error', $status, $e);
            }
        });

        // Validation exceptions -> JSON for API requests
        $exceptions->renderable(function (ValidationException $e, Request $request) {
            if ($request->is('api/*') && env('APP_DEBUG') !== 'production') {
                $errorMessage = array_map(fn($errors) => implode('; ', $errors), $e->errors());
                return new ApiErrorResponse(implode('; ', $errorMessage), Response::HTTP_UNPROCESSABLE_ENTITY, $e);
            }
        });
    })->create();
