<?php
namespace App\Http\Middleware;
use Closure;
class Cors
{
  public function handle($request, Closure $next)
    {
        if ($request->isMethod('OPTIONS')) {
            $response = Response::make();
        } else {
            $response = $next($request);
        }
        return $response
            ->header('Access-Control-Allow-Origin', 'http://localhost:4200')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'XMLHttpRequest, Content-Type, Accept, Authorization, X-Requested-With, Application');
    }
}