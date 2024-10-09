<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(append: [
            \Illuminate\Session\Middleware\StartSession::class,
        ]);
    })
    ->withExceptions(function ($exceptions) {
        $exceptions->render(function (Throwable $exception) {
            if ($exception instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'error' => $exception->errors()
                ], 422);
            }
            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response()->json([
                    'error' => 'Resource not found'
                ], 404);
            }
            if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                return response()->json([
                    'error' => 'Endpoint not found'
                ], 404);
            }
            if ($exception instanceof \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException) {
                return response()->json([
                    'error' => 'Unauthorized'
                ], 401);
            }
            if ($exception instanceof \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException) {
                return response()->json([
                    'error' => 'Forbidden'
                ], 403);
            }

            return response()->json([
                'error' => 'An error occurred'
            ], 500);
        });
    })->create();
