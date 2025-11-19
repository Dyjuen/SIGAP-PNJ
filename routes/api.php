<?php

use App\Controllers\AuthController;
use App\Controllers\AccountController;
use App\Controllers\KAKController;
use App\Controllers\LpjController;
use App\Controllers\MasterController;
use App\Controllers\PanduanController;
use App\Controllers\DashboardController;
use App\Controllers\NotificationController;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\RoleMiddleware;
use App\Middlewares\RateLimitMiddleware;
use App\Middlewares\CorsMiddleware;
use App\Core\Router;

// =====================================================
// 1. APPLY GLOBAL CORS MIDDLEWARE
// =====================================================
$cors = new CorsMiddleware();
$cors->handle();

// =====================================================
// 1.1. APPLY GLOBAL RATE LIMIT MIDDLEWARE
// =====================================================
$rateLimit = new RateLimitMiddleware(50, 10, 'global_access');
$rateLimit->handle();


// Start session for captcha
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// =====================================================
// 2. GET REQUEST METHOD & URI
// =====================================================
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove /api prefix if exists
$uri = preg_replace('#^/api#', '', $uri);

// =====================================================
// 3. PUBLIC ROUTES (No authentication required)
// =====================================================

// GET /api/captcha - Generate captcha image
if ($method === 'GET' && $uri === '/captcha') {
    $controller = new AuthController();
    $controller->generateCaptcha();
    exit;
}

// POST /api/auth/login
if ($method === 'POST' && $uri === '/auth/login') {
    $controller = new AuthController();
    $controller->login();
    exit;
}

// =====================================================
// 4. APPLY AUTH MIDDLEWARE FOR PROTECTED ROUTES
// =====================================================
$auth = new AuthMiddleware();
$auth->handle();

// =====================================================
// 5. AUTH ROUTES (Authenticated users)
// =====================================================

// POST /api/auth/logout
if ($method === 'POST' && $uri === '/auth/logout') {
    (new AuthController())->logout();
    exit;
}

// POST /api/auth/refresh
if ($method === 'POST' && $uri === '/auth/refresh') {
    $controller = new AuthController();
    $controller->refresh();
    exit;
}

// =====================================================
// 6. ACCOUNT ROUTES (Profile Management)
// =====================================================

// GET /api/auth/profile
if ($method === 'GET' && $uri === '/auth/profile') {
    $controller = new AccountController();
    $controller->getProfile();
    exit;
}

// =====================================================
// 7. ADMIN ONLY ROUTES
// =====================================================

// POST /api/admin/register (Admin only)
if ($method === 'POST' && $uri === '/admin/register') {
    $roleMiddleware = new RoleMiddleware(['Admin']);
    $roleMiddleware->handle();
    
    $controller = new AuthController();
    $controller->register();
    exit;
}

// GET /api/admin/users (Admin only)
if ($method === 'GET' && $uri === '/admin/users') {
    $roleMiddleware = new RoleMiddleware(['Admin']);
    $roleMiddleware->handle();
    
    $controller = new AccountController();
    $controller->getAllProfiles();
    exit;
}

// PUT /api/admin/users/{id} (Admin only)
if ($method === 'PUT' && preg_match('/^\/admin\/users\/(\d+)$/', $uri, $matches)) {
    $roleMiddleware = new RoleMiddleware(['Admin']);
    $roleMiddleware->handle();
    
    $controller = new AccountController();
    $controller->updateUser($matches[1]);
    exit;
}

// PUT /api/admin/users/{id}/change-password (Admin only)
if ($method === 'PUT' && preg_match('/^\/admin\/users\/(\d+)\/change-password$/', $uri, $matches)) {
    $roleMiddleware = new RoleMiddleware(['Admin']);
    $roleMiddleware->handle();
    
    $controller = new AccountController();
    $controller->adminChangePassword($matches[1]);
    exit;
}

// =====================================================
// 8. KAK (KERANGKA ACUAN KERJA) ROUTES
// =====================================================

// GET /api/kak/{kak_id} - Download KAK PDF
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)$/', $uri)) {
    $controller = new KAKController();
    $controller->download();
    exit;
}

// GET /api/kak/{kak_id}/preview - Preview KAK HTML
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)\/preview$/', $uri)) {
    $controller = new KAKController();
    $controller->preview();
    exit;
}

// GET /api/kak/{kak_id}/data - Get KAK data as JSON
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)\/data$/', $uri)) {
    $controller = new KAKController();
    $controller->getData();
    exit;
}

// =====================================================
// 10. ROUTER-BASED ROUTES (Object Router)
// =====================================================

$router = new Router();

// ============================================
// MASTER DATA ROUTES
// ============================================
$router->get('/master/iku', 'MasterController@getIku');
$router->get('/master/tipe-kegiatan', 'MasterController@getTipeKegiatan');
$router->get('/master/satuan', 'MasterController@getSatuan');
$router->get('/panduan', 'PanduanController@index');
$router->post('/panduan', 'PanduanController@store');
$router->get('/panduan/{id}', 'PanduanController@show');
$router->put('/panduan/{id}', 'PanduanController@update');
$router->delete('/panduan/{id}', 'PanduanController@destroy');


// ============================================
// KAK ROUTES (CRUD & Workflow)
// ============================================

$router->get('/kak', 'KAKController@index');
$router->post('/kak', 'KAKController@store');
$router->get('/kak/{id}', 'KAKController@show');

// PUT /api/kak/{id}/update - Update KAK
$router->put('/kak/{id}/update', 'KAKController@update');

// Aksi Pengusul
$router->post('/kak/{id}/submit', 'KAKController@submitForVerification');
$router->post('/kak/{id}/resubmit', 'KAKController@resubmitAfterRevision');

// Aksi Verifikator
$router->post('/kak/{id}/approve', 'KAKController@approve');
$router->post('/kak/{id}/reject', 'KAKController@reject');
$router->post('/kak/{id}/revise', 'KAKController@requestRevision');

// ============================================
// KEGIATAN ROUTES (Workflow & Features)
// ============================================

$router->get('/kegiatan', 'KegiatanController@index');
$router->post('/kegiatan', 'KegiatanController@create');
$router->get('/kegiatan/{id}', 'KegiatanController@show');
$router->get('/kegiatan/{id}/detail', 'KegiatanController@getDetail');

// Status Workflow
$router->post('/kegiatan/{id}/submit', 'KegiatanController@submit');
$router->post('/kegiatan/{id}/revise', 'KegiatanController@revise');
$router->post('/kegiatan/{id}/approve', 'KegiatanController@approve');
$router->get('/kegiatan/{id}/logs', 'KegiatanController@logs');
$router->get('/kegiatan/{id}/catatan-ppk', 'KegiatanController@getCatatanPPK');

// Fitur Tambahan
$router->post('/kegiatan/{id}/cairkan', 'PencairanController@cairkanDana');
$router->post('/kegiatan/{id}/duplicate', 'KegiatanController@duplicate');

$router->get('/kegiatan/export/excel', 'KegiatanController@exportExcel');
$router->get('/kegiatan/statistics/dashboard', 'KegiatanController@statistics');

// ============================================
// LAMPIRAN MANAGEMENT ROUTES
// ============================================

$router->get('/kegiatan/{id}/lampiran', 'LampiranController@index');
$router->post('/kegiatan/{id}/lampiran', 'LampiranController@upload');
$router->get('/kegiatan/{id}/lampiran/{file_id}', 'LampiranController@download');
$router->delete('/kegiatan/{id}/lampiran/{file_id}', 'LampiranController@delete');

// ============================================
// PENCAIRAN DANA ROUTES
// ============================================

// GET /pencairan/kegiatan/{kegiatan_id} - List pencairan per kegiatan
$router->get('/pencairan/kegiatan/{kegiatan_id}', 'PencairanController@index');

// GET /pencairan/sisa-dana/{kegiatan_id} - Cek sisa dana
$router->get('/pencairan/sisa-dana/{kegiatan_id}', 'PencairanController@getSisaDana');

// POST /kegiatan/{kegiatan_id}/pencairan - Bendahara mencatat transaksi pencairan
$router->post('/kegiatan/{kegiatan_id}/pencairan', 'PencairanController@logPencairan');

// ============================================
// LPJ (LAPORAN PERTANGGUNGJAWABAN) ROUTES
// ============================================
$router->post('/kegiatan/{kegiatan_id}/lpj', 'LpjController@submit');


// ============================================
// NOTIFICATION ROUTES
// ============================================
$router->get('/notifications', 'NotificationController@getNotificationsForUser');
$router->post('/notifications/{id}/read', 'NotificationController@markAsRead');

// ============================================
// DASHBOARD ROUTES
// ============================================
$router->get('/dashboard/summary', 'DashboardController@getSummary');
$router->get('/dashboard/lpj', 'DashboardController@getLpj');
$router->get('/dashboard/template', 'DashboardController@getTemplates');
$router->get('/dashboard/video', 'DashboardController@getVideos');

// =====================================================
// 11. DISPATCH ROUTER & HANDLE 404
// =====================================================

$router->dispatch();

// If router didn't handle the request, return 404
http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint tidak ditemukan.',
    'requested_uri' => $uri,
    'method' => $method
]);
exit;
