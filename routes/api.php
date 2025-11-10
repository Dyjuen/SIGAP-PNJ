<?php

use App\Controllers\TelaahController;
use App\Controllers\AuthController;
use App\Controllers\AccountController;
use App\Controllers\KAKController;
use App\Controllers\LpjController;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\RoleMiddleware;
use App\Middlewares\CorsMiddleware;
use App\Core\Router;

// =====================================================
// 1. APPLY GLOBAL CORS MIDDLEWARE
// =====================================================
$cors = new CorsMiddleware();
$cors->handle();

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

// Backward compatibility - Keep old auth routes
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

// =====================================================
// 7. ADMIN ONLY ROUTES
// =====================================================

// POST /api/auth/register (Admin only)
if ($method === 'POST' && $uri === '/auth/register') {
    $roleMiddleware = new RoleMiddleware(['Admin']);
    $roleMiddleware->handle();
    
    $controller = new AuthController();
    $controller->register();
    exit;
}

// =====================================================
// 8. KAK (KERANGKA ACUAN KERJA) ROUTES
// =====================================================

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

// =====================================================
// 9. LPJ (LAPORAN PERTANGGUNGJAWABAN) ROUTES
// =====================================================

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

// =====================================================
// 10. ROUTER-BASED ROUTES (Object Router)
// =====================================================

$router = new Router();

// ============================================
// TELAAH ROUTES (CRUD & Workflow)
// ============================================

$router->get('/api/telaah', 'TelaahController@index');
$router->post('/api/telaah', 'TelaahController@store');
$router->get('/api/telaah/{id}', 'TelaahController@show');
// $router->put('/api/telaah/{id}', 'Api\TelaahController@update'); // Uncomment jika perlu

// Aksi Pengusul
$router->post('/api/telaah/{id}/submit', 'TelaahController@submitForVerification');
$router->post('/api/telaah/{id}/resubmit', 'TelaahController@resubmitAfterRevision');

// Aksi Verifikator
$router->post('/api/telaah/{id}/approve', 'TelaahController@approve');
$router->post('/api/telaah/{id}/reject', 'TelaahController@reject');
$router->post('/api/telaah/{id}/revise', 'TelaahController@requestRevision');

// ============================================
// KEGIATAN ROUTES (Workflow & Features)
// ============================================

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