<?php
namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Throwable;

class Handler extends ExceptionHandler
{
    // …

    /**
     * Convert an authentication exception into an unauthenticated response.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        // Si es petición JSON o /api/* devolvemos JSON 401
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json([
                'message' => 'No autenticado',
            ], 401);
        }

        // Si luego tienes login web, podrías redirigir:
        return redirect()->guest(route('login'));
    }
}
