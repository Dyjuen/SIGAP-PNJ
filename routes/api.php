<?php

use App\Controllers\Api\AuthController;
use App\Controllers\Api\TelaahController;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\RoleMiddleware;
use App\Middlewares\CorsMiddleware;
use App\Core\Router;

// ---------------------------------------------
// 1. Apply global CORS middleware
// ---------------------------------------------
$cors = new CorsMiddleware();
$cors->handle();

// ---------------------------------------------
// 2. Ambil method & uri
// ---------------------------------------------
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// ---------------------------------------------
// 3. Public Route (tidak butuh login)
// ---------------------------------------------
if ($method === 'POST' && $uri === '/api/auth/login') {
    (new AuthController())->login();
    exit;
}

// ---------------------------------------------
// 4. Protected route → pakai middleware auth
// ---------------------------------------------
$auth = new AuthMiddleware();
$auth->handle();

// Auth routes (sudah login)
if ($method === 'POST' && $uri === '/api/auth/logout') {
    (new AuthController())->logout();
    exit;
}

if ($method === 'GET' && $uri === '/api/auth/profile') {
    (new AuthController())->getProfile();
    exit;
}

if ($method === 'PUT' && $uri === '/api/auth/profile') {
    (new AuthController())->updateProfile();
    exit;
}

if ($method === 'PUT' && $uri === '/api/auth/change-password') {
    (new AuthController())->changePassword();
    exit;
}

if ($method === 'POST' && $uri === '/api/auth/refresh') {
    (new AuthController())->refresh();
    exit;
}

// ---------------------------------------------
// 5. Admin only route
// ---------------------------------------------
if ($method === 'POST' && $uri === '/api/auth/register') {
    (new RoleMiddleware(['Admin']))->handle();
    (new AuthController())->register();
    exit;
}

// ---------------------------------------------
// 6. Gunakan Router Objek untuk endpoint Telaah
// ---------------------------------------------
$router = new Router();

// CRUD KAK / Telaah
$router->get('/api/telaah', 'Api\TelaahController@index');
$router->post('/api/telaah', 'Api\TelaahController@store');
$router->get('/api/telaah/{id}', 'Api\TelaahController@show');
// ❌ HAPUS INI - tidak ada method update()
// $router->put('/api/telaah/{id}', 'Api\TelaahController@update');

// Aksi Pengusul
$router->post('/api/telaah/{id}/submit', 'Api\TelaahController@submitForVerification');
$router->post('/api/telaah/{id}/resubmit', 'Api\TelaahController@resubmitAfterRevision');

// Aksi Verifikator
$router->post('/api/telaah/{id}/approve', 'Api\TelaahController@approve');
$router->post('/api/telaah/{id}/reject', 'Api\TelaahController@reject');
$router->post('/api/telaah/{id}/revise', 'Api\TelaahController@requestRevision');

// Jalankan router
$router->dispatch();
exit;