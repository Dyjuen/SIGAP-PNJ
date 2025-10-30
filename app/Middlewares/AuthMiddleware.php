<?php

namespace App\Middlewares;

use App\Core\Middleware;
use App\Core\JWT;
use App\Core\Response;
use App\Models\User;

class AuthMiddleware implements Middleware
{
    /**
     * Handle authentication check
     * 
     * Validates JWT token from Authorization header and sets user data in request
     */
    public function handle(): void
    {
        // Get Authorization header
        $headers = getallheaders();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        // Check if Authorization header exists
        if (!$authHeader) {
            Response::unauthorized('Token tidak ditemukan. Silakan login terlebih dahulu.');
        }

        // Extract token from header
        $token = JWT::extractFromHeader($authHeader);

        if (!$token) {
            Response::unauthorized('Format token tidak valid. Gunakan format: Bearer <token>');
        }

        // Validate and decode token
        $decoded = JWT::decode($token);

        if (!$decoded) {
            Response::unauthorized('Token tidak valid atau sudah expired. Silakan login ulang.');
        }

        // Verify user still exists in database
        $userModel = new User();
        $user = $userModel->findById($decoded->user_id);

        if (!$user) {
            Response::unauthorized('User tidak ditemukan. Token tidak valid.');
        }

        // Set authenticated user data in global variable (dapat diakses di controller)
        $GLOBALS['auth_user'] = [
            'user_id' => $decoded->user_id,
            'username' => $decoded->username,
            'nama_lengkap' => $decoded->nama_lengkap,  // ✅ Ganti email jadi nama_lengkap
            'roles' => $decoded->roles ?? [],
            'unit_kerja_id' => $decoded->unit_kerja_id ?? null
        ];

        // Check if token is about to expire (kurang dari 1 jam)
        $timeToExpire = JWT::getTimeToExpire($token);
        if ($timeToExpire !== null && $timeToExpire < 3600) {
            // Add header to inform client that token will expire soon
            header('X-Token-Expiring: true');
            header('X-Token-Expires-In: ' . $timeToExpire);
        }
    }

    /**
     * Get authenticated user data
     * 
     * @return array|null
     */
    public static function getAuthUser(): ?array
    {
        return $GLOBALS['auth_user'] ?? null;
    }

    /**
     * Get authenticated user ID
     * 
     * @return int|null
     */
    public static function getAuthUserId(): ?int
    {
        $user = self::getAuthUser();
        return $user['user_id'] ?? null;
    }

    /**
     * Check if user is authenticated
     * 
     * @return bool
     */
    public static function isAuthenticated(): bool
    {
        return isset($GLOBALS['auth_user']);
    }
}
