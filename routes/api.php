<?php

use App\Controllers\Api\AuthController;
use App\Controllers\Api\AccountController;
use App\Controllers\Api\KAKController;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\RoleMiddleware;
use App\Middlewares\CorsMiddleware;

// Apply CORS to all requests
$corsMiddleware = new CorsMiddleware();
$corsMiddleware->handle();

// Get request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove /api prefix if exists
$uri = preg_replace('#^/api#', '', $uri);

// ====================================
// PUBLIC ROUTES (No authentication required)
// ====================================


// POST /api/auth/login
if ($method === 'POST' && $uri === '/auth/login') {
    $controller = new AuthController();
    $controller->login();
    exit;
}

// ====================================
// PROTECTED ROUTES (Authentication required)
// ====================================

// Apply authentication middleware
$authMiddleware = new AuthMiddleware();
$authMiddleware->handle();

// POST /api/auth/logout
if ($method === 'POST' && $uri === '/auth/logout') {
    $controller = new AuthController();
    $controller->logout();
    exit;
}

// POST /api/auth/refresh
if ($method === 'POST' && $uri === '/auth/refresh') {
    $controller = new AuthController();
    $controller->refresh();
    exit;
}

// ====================================
// ACCOUNT ROUTES (Profile Management)
// ====================================

// GET /api/account/profile
if ($method === 'GET' && $uri === '/account/profile') {
    $controller = new AccountController();
    $controller->getProfile();
    exit;
}

// PUT /api/account/profile
if ($method === 'PUT' && $uri === '/account/profile') {
    $controller = new AccountController();
    $controller->updateProfile();
    exit;
}

// PUT /api/account/change-password
if ($method === 'PUT' && $uri === '/account/change-password') {
    $controller = new AccountController();
    $controller->changePassword();
    exit;
}

// Backward compatibility - Keep old routes
// GET /api/auth/profile
if ($method === 'GET' && $uri === '/auth/profile') {
    $controller = new AccountController();
    $controller->getProfile();
    exit;
}

// PUT /api/auth/profile
if ($method === 'PUT' && $uri === '/auth/profile') {
    $controller = new AccountController();
    $controller->updateProfile();
    exit;
}

// PUT /api/auth/change-password
if ($method === 'PUT' && $uri === '/auth/change-password') {
    $controller = new AccountController();
    $controller->changePassword();
    exit;
}

// ====================================
// ADMIN ONLY ROUTES
// ====================================

// POST /api/auth/register (Admin only)
if ($method === 'POST' && $uri === '/auth/register') {
    $roleMiddleware = new RoleMiddleware(['Admin']);
    $roleMiddleware->handle();
    
    $controller = new AuthController();
    $controller->register();
    exit;
}

// ====================================
// KAK (KERANGKA ACUAN KERJA) ROUTES
// ====================================

// GET /api/kak/{kegiatan_id} - Download KAK PDF
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)$/', $uri)) {
    $controller = new KAKController();
    $controller->download();
    exit;
}

// GET /api/kak/{kegiatan_id}/preview - Preview KAK HTML
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)\/preview$/', $uri)) {
    $controller = new KAKController();
    $controller->preview();
    exit;
}

// GET /api/kak/{kegiatan_id}/data - Get KAK data as JSON
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)\/data$/', $uri)) {
    $controller = new KAKController();
    $controller->getData();
    exit;
}

// ====================================
// KEGIATAN & ANGGARAN & LAMPIRAN ROUTES
// ====================================

// Router berbasis objek tambahan
use App\Core\Router;

// Inisialisasi router baru
$router = new Router();

// ============================================
// KEGIATAN CRUD ROUTES
// ============================================

// List & Detail
$router->get('/api/kegiatan', 'Api\KegiatanController@index');
$router->get('/api/kegiatan/{id}', 'Api\KegiatanController@show');

// Create, Update, Delete
$router->post('/api/kegiatan', 'Api\KegiatanController@create');
$router->put('/api/kegiatan/{id}', 'Api\KegiatanController@update');
$router->delete('/api/kegiatan/{id}', 'Api\KegiatanController@delete');

// Status Workflow
$router->post('/api/kegiatan/{id}/submit', 'Api\KegiatanController@submit');
$router->post('/api/kegiatan/{id}/revise', 'Api\KegiatanController@revise');
$router->get('/api/kegiatan/{id}/logs', 'Api\KegiatanController@logs');

// Fitur Tambahan
$router->post('/api/kegiatan/{id}/duplicate', 'Api\KegiatanController@duplicate');
$router->get('/api/kegiatan/export/excel', 'Api\KegiatanController@exportExcel');
$router->get('/api/kegiatan/statistics/dashboard', 'Api\KegiatanController@statistics');

// ============================================
// ANGGARAN MANAGEMENT ROUTES
// ============================================

$router->get('/api/kegiatan/{id}/anggaran', 'Api\AnggaranController@index');
$router->post('/api/kegiatan/{id}/anggaran', 'Api\AnggaranController@create');
$router->put('/api/kegiatan/{id}/anggaran/{item_id}', 'Api\AnggaranController@update');
$router->delete('/api/kegiatan/{id}/anggaran/{item_id}', 'Api\AnggaranController@delete');

// ============================================
// LAMPIRAN MANAGEMENT ROUTES
// ============================================

$router->get('/api/kegiatan/{id}/lampiran', 'Api\LampiranController@index');
$router->post('/api/kegiatan/{id}/lampiran', 'Api\LampiranController@upload');
$router->get('/api/kegiatan/{id}/lampiran/{file_id}', 'Api\LampiranController@download');
$router->delete('/api/kegiatan/{id}/lampiran/{file_id}', 'Api\LampiranController@delete');

$router->run();

// ====================================
// 404 - Route not found
// ====================================

http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint tidak ditemukan.'
]);