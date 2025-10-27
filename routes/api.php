<?php

use App\Middlewares\AuthMiddleware;
use App\Middlewares\RateLimitMiddleware;
use App\Middlewares\RoleMiddleware;

/**
 * ========================================
 * Health Check Endpoint
 * ========================================
 */
$router->get('/health', function() {
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'success',
        'message' => 'API Account Management is running',
        'timestamp' => date('Y-m-d H:i:s'),
        'version' => '1.0.0',
        'endpoints' => [
            'auth' => [
                'POST /api/auth/login',
                'POST /api/auth/logout',
                'POST /api/auth/refresh',
                'POST /api/auth/register (admin only)',
            ],
            'profile' => [
                'GET /api/auth/profile',
                'PUT /api/auth/profile',
                'PUT /api/auth/change-password'
            ]
        ]
    ]);
    exit;
});

/**
 * ========================================
 * Public Routes (No Authentication)
 * ========================================
 */

// Login with rate limiting (5 attempts per 15 minutes)
$loginRateLimit = new RateLimitMiddleware(5, 15, 'login');
$router->post('/auth/login', 'AuthController@login', [$loginRateLimit]);

/**
 * ========================================
 * Protected Routes (Authentication Required)
 * ========================================
 */

$authMiddleware = new AuthMiddleware();

// Profile Management
$router->get('/auth/profile', 'AuthController@getProfile', [$authMiddleware]);
$router->put('/auth/profile', 'AuthController@updateProfile', [$authMiddleware]);
$router->put('/auth/change-password', 'AuthController@changePassword', [$authMiddleware]);

// Token Management
$router->post('/auth/refresh', 'AuthController@refresh', [$authMiddleware]);
$router->post('/auth/logout', 'AuthController@logout', [$authMiddleware]);

/**
 * ========================================
 * Admin Only Routes
 * ========================================
 */

$adminOnly = new RoleMiddleware(['Admin']);

// User Registration (Admin only)
$router->post('/auth/register', 'AuthController@register', [
    $authMiddleware,
    $adminOnly
]);

/**
 * ========================================
 * 404 Not Found Handler
 * ========================================
 */
$router->fallback(function() {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode([
        'status' => 'error',
        'message' => 'Endpoint tidak ditemukan',
        'code' => 404,
        'hint' => 'Gunakan GET /api/health untuk melihat daftar endpoint yang tersedia'
    ]);
    exit;
});