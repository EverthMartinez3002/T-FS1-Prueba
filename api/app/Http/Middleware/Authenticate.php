<?php
namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    protected function redirectTo(Request $request): ?string
    {
        // Si es API (JSON o /api/*), no redirigimos
        if ($request->expectsJson() || $request->is('api/*')) {
            return null;
        }

        // (opcional) si luego decides usar web:
        return route('login');
    }

}
