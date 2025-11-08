<?php

use App\Controllers\Api\AuthController;
use App\Controllers\Api\KAKController;
use App\Controllers\Api\LpjController;
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

// GET /api/auth/profile
if ($method === 'GET' && $uri === '/auth/profile') {
    $controller = new AuthController();
    $controller->getProfile();
    exit;
}

// PUT /api/auth/profile
if ($method === 'PUT' && $uri === '/auth/profile') {
    $controller = new AuthController();
    $controller->updateProfile();
    exit;
}

// PUT /api/auth/change-password
if ($method === 'PUT' && $uri === '/auth/change-password') {
    $controller = new AuthController();
    $controller->changePassword();
    exit;
}

// POST /api/auth/refresh
if ($method === 'POST' && $uri === '/auth/refresh') {
    $controller = new AuthController();
    $controller->refresh();
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
// LPJ (LAPORAN PERTANGGUNGJAWABAN) ROUTES
// ====================================

// GET /api/lpj/status/{kegiatan_id} - Get status LPJ untuk kegiatan
if ($method === 'GET' && preg_match('/^\/lpj\/status\/(\d+)$/', $uri, $matches)) {
    $controller = new LpjController();
    $controller->getStatus();
    exit;
}

// POST /api/lpj/upload/{kegiatan_id} - Upload lampiran LPJ
if ($method === 'POST' && preg_match('/^\/lpj\/upload\/(\d+)$/', $uri, $matches)) {
    $controller = new LpjController();
    $controller->uploadLampiran();
    exit;
}

// POST /api/lpj/submit/{kegiatan_id} - Submit LPJ (final)
if ($method === 'POST' && preg_match('/^\/lpj\/submit\/(\d+)$/', $uri, $matches)) {
    $controller = new LpjController();
    $controller->submitLpj();
    exit;
}

// DELETE /api/lpj/lampiran/{lampiran_id} - Delete lampiran
if ($method === 'DELETE' && preg_match('/^\/lpj\/lampiran\/(\d+)$/', $uri, $matches)) {
    $controller = new LpjController();
    $controller->deleteLampiran();
    exit;
}

// POST /api/lpj/check-reminders - Manual trigger check reminders
if ($method === 'POST' && $uri === '/lpj/check-reminders') {
    $controller = new LpjController();
    $controller->checkReminders();
    exit;
}

// ====================================
// KEGIATAN & ANGGARAN & LAMPIRAN ROUTES
// ====================================

// Router berbasis objek tambahan (tidak mengubah route lama)
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

// ============================================
// PENCAIRAN DANA ROUTES
// ============================================

// GET /api/pencairan/kegiatan/{kegiatan_id} - List pencairan per kegiatan
$router->get('/api/pencairan/kegiatan/{kegiatan_id}', 'Api\PencairanController@index');

// GET /api/pencairan/sisa-dana/{kegiatan_id} - Cek sisa dana
$router->get('/api/pencairan/sisa-dana/{kegiatan_id}', 'Api\PencairanController@getSisaDana');

// POST /api/pencairan - Pengusul ajukan pencairan
$router->post('/api/pencairan', 'Api\PencairanController@create');

// PUT /api/pencairan/{id}/approve - Bendahara setujui pencairan
$router->put('/api/pencairan/{id}/approve', 'Api\PencairanController@approve');

// PUT /api/pencairan/{id}/reject - Bendahara tolak pencairan
$router->put('/api/pencairan/{id}/reject', 'Api\PencairanController@reject');

$router->run();

// ====================================
// 404 - Route not found
// ====================================

http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint tidak ditemukan.'
]);