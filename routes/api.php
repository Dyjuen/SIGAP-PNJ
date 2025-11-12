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

// =====================================================
// 8. KAK (KERANGKA ACUAN KERJA) ROUTES
// =====================================================

// GET /api/kak/{telaah_id} - Download KAK PDF
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)$/', $uri)) {
    $controller = new KAKController();
    $controller->download();
    exit;
}

// GET /api/kak/{telaah_id}/preview - Preview KAK HTML
if ($method === 'GET' && preg_match('/^\/kak\/(\d+)\/preview$/', $uri)) {
    $controller = new KAKController();
    $controller->preview();
    exit;
}

// GET /api/kak/{telaah_id}/data - Get KAK data as JSON
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

$router->get('/telaah', 'TelaahController@index');
$router->post('/telaah', 'TelaahController@store');
$router->get('/telaah/{id}', 'TelaahController@show');

// Aksi Pengusul
$router->post('/telaah/{id}/submit', 'TelaahController@submitForVerification');
$router->post('/telaah/{id}/resubmit', 'TelaahController@resubmitAfterRevision');

// Aksi Verifikator
$router->post('/telaah/{id}/approve', 'TelaahController@approve');
$router->post('/telaah/{id}/reject', 'TelaahController@reject');
$router->post('/telaah/{id}/revise', 'TelaahController@requestRevision');

// ============================================
// KEGIATAN ROUTES (Workflow & Features)
// ============================================

$router->get('/kegiatan', 'KegiatanController@index');
$router->post('/kegiatan', 'KegiatanController@create');
$router->get('/kegiatan/{id}', 'KegiatanController@show');

// Status Workflow
$router->post('/kegiatan/{id}/submit', 'KegiatanController@submit');
$router->post('/kegiatan/{id}/revise', 'KegiatanController@revise');
$router->post('/kegiatan/{id}/approve', 'KegiatanController@approve');
$router->get('/kegiatan/{id}/logs', 'KegiatanController@logs');

// Fitur Tambahan
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

// GET /api/pencairan/kegiatan/{kegiatan_id} - List pencairan per kegiatan
$router->get('/pencairan/kegiatan/{kegiatan_id}', 'PencairanController@index');

// GET /api/pencairan/sisa-dana/{kegiatan_id} - Cek sisa dana
$router->get('/pencairan/sisa-dana/{kegiatan_id}', 'PencairanController@getSisaDana');

// POST /api/pencairan - Pengusul ajukan pencairan
$router->post('/pencairan', 'PencairanController@create');

// PUT /api/pencairan/{id}/approve - Bendahara setujui pencairan
$router->put('/pencairan/{id}/approve', 'PencairanController@approve');

// PUT /api/pencairan/{id}/reject - Bendahara tolak pencairan
$router->put('/pencairan/{id}/reject', 'PencairanController@reject');

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
