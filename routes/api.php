<?php

use App\Controllers\Api\AuthController;
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
// 404 - Route not found
// ====================================

http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint tidak ditemukan.'
]);
exit;