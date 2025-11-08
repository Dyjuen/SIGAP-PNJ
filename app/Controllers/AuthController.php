<?php

namespace App\Controllers;

use App\Core\Response;
use App\Core\JWT;
use App\Models\User;
use App\Models\UserRole;
use App\Middlewares\AuthMiddleware;

class AuthController
{
    private $userModel;
    private $userRoleModel;

    public function __construct()
    {
        $this->userModel = new User();
        $this->userRoleModel = new UserRole();
    }

    /**
     * Generate Captcha Image
     * 
     * GET /api/captcha
     */
    public function generateCaptcha()
    {
        // Start session if not already started
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Check if GD library is available
        if (!extension_loaded('gd') || !function_exists('imagecreatetruecolor')) {
            $this->createErrorCaptcha("GD Library not installed");
            exit;
        }

        // Generate random captcha code
        $code = $this->generateCaptchaCode();
        $_SESSION["code"] = $code;

        // Create captcha image
        $width = 173;
        $height = 50;
        $image = imagecreatetruecolor($width, $height);
        
        // Colors
        $bgColor = imagecolorallocate($image, 22, 86, 165);  // Blue background
        $textColor = imagecolorallocate($image, 223, 230, 233); // Light gray text
        
        // Fill background
        imagefill($image, 0, 0, $bgColor);
        
        // Add some noise lines for security
        $lineColor = imagecolorallocate($image, 40, 100, 180);
        for ($i = 0; $i < 3; $i++) {
            imageline($image, 0, rand(0, $height), $width, rand(0, $height), $lineColor);
        }
        
        // Add captcha text with slight random positioning
        $x = 50 + rand(-5, 5);
        $y = 15 + rand(-3, 3);
        imagestring($image, 5, $x, $y, $code, $textColor);
        
        // Output image with proper headers
        header('Content-Type: image/jpeg');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header('Pragma: no-cache');
        header('Expires: 0');
        
        imagejpeg($image, null, 90);
        imagedestroy($image);
        exit;
    }

    /**
     * Generate random captcha code
     */
    private function generateCaptchaCode($length = 5)
    {
        $alphabet = "abcdefghijklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
        $code = '';
        $alphaLength = strlen($alphabet) - 1;
        
        for ($i = 0; $i < $length; $i++) {
            $code .= $alphabet[rand(0, $alphaLength)];
        }
        
        return $code;
    }

    /**
     * Create error captcha image
     */
    private function createErrorCaptcha($message)
    {
        $width = 173;
        $height = 50;
        $image = imagecreatetruecolor($width, $height);
        $bgColor = imagecolorallocate($image, 255, 255, 255);
        $textColor = imagecolorallocate($image, 211, 47, 47);
        
        imagefill($image, 0, 0, $bgColor);
        
        $lines = explode(' ', $message);
        $y = 15;
        foreach ($lines as $line) {
            if (empty(trim($line))) continue;
            $x = ($width - (imagefontwidth(3) * strlen($line))) / 2;
            imagestring($image, 3, $x, $y, $line, $textColor);
            $y += 15;
        }
        
        header('Content-Type: image/jpeg');
        header('Cache-Control: no-cache, no-store, must-revalidate');
        imagejpeg($image);
        imagedestroy($image);
    }

    /**
     * Register new user (Admin only)
     * 
     * POST /api/auth/register
     * Header: Authorization: Bearer <token>
     * Body: {username, password, nama_lengkap, email, unit_kerja_id, role_ids[]}
     */
    public function register()
    {
        try {
            // Get request body
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            $required = ['username', 'password', 'nama_lengkap', 'email', 'unit_kerja_id'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    Response::error("Field '$field' wajib diisi", 400);
                }
            }

            // Validate username format (alphanumeric and underscore only)
            if (!preg_match('/^[a-zA-Z0-9_]{4,50}$/', $data['username'])) {
                Response::error('Username harus 4-50 karakter (huruf, angka, underscore)', 400);
            }

            // Validate password strength
            if (strlen($data['password']) < 8) {
                Response::error('Password minimal 8 karakter', 400);
            }

            // Validate email format
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                Response::error('Format email tidak valid', 400);
            }

            // Check if username already exists
            if ($this->userModel->usernameExists($data['username'])) {
                Response::error('Username sudah digunakan', 409);
            }

            // Check if email already exists
            if ($this->userModel->emailExists($data['email'])) {
                Response::error('Email sudah terdaftar', 409);
            }

            // Create user
            $userId = $this->userModel->createUser([
                'username' => $data['username'],
                'password' => $data['password'],
                'nama_lengkap' => $data['nama_lengkap'],
                'email' => $data['email'],
                'unit_kerja_id' => $data['unit_kerja_id']
            ]);

            // Assign roles (if provided)
            if (!empty($data['role_ids']) && is_array($data['role_ids'])) {
                $this->userRoleModel->assignRoles($userId, $data['role_ids']);
            }

            // Get created user with roles
            $user = $this->userModel->getUserWithRoles($userId);

            Response::created([
                'user' => [
                    'user_id' => $user['user_id'],
                    'username' => $user['username'],
                    'nama_lengkap' => $user['nama_lengkap'],
                    'email' => $user['email'],
                    'unit_kerja' => [
                        'unit_kerja_id' => $user['unit_kerja_id'],
                        'nama_unit_kerja' => $user['nama_unit_kerja'],
                        'kode_unit' => $user['kode_unit']
                    ],
                    'roles' => $user['roles'],
                    'created_at' => $user['created_at']
                ]
            ], 'User berhasil didaftarkan');

        } catch (\Exception $e) {
            Response::error('Gagal mendaftar user: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Login user
     * 
     * POST /api/auth/login
     * Body: {username, password, captcha}
     */
    public function login()
    {
        try {
            // Start session if not already started
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }

            // Get request body
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            if (empty($data['username']) || empty($data['password'])) {
                Response::error('Username dan password wajib diisi', 400);
            }

            if (empty($data['captcha'])) {
                Response::error('Captcha wajib diisi', 400);
            }

            // Validate captcha
            if (!isset($_SESSION['code'])) {
                Response::error('Captcha sudah expired. Silakan refresh captcha.', 400);
            }

            // Case-insensitive comparison
            if (strcasecmp($_SESSION['code'], $data['captcha']) !== 0) {
                // Clear captcha on failed attempt
                unset($_SESSION['code']);
                Response::error('Kode captcha yang Anda masukkan salah.', 400);
            }

            // Clear captcha after successful validation
            unset($_SESSION['code']);

            // Find user by username
            $user = $this->userModel->findByUsername($data['username']);

            if (!$user) {
                Response::error('Username atau password salah', 401);
            }

            // Verify password
            if (!$this->userModel->verifyPassword($data['password'], $user['password_hash'])) {
                Response::error('Username atau password salah', 401);
            }

            // Convert roles string to array
            $roles = $user['roles'] ? explode(',', $user['roles']) : [];

            // Generate JWT token
            $token = JWT::encode([
                'user_id' => $user['user_id'],
                'username' => $user['username'],
                'nama_lengkap' => $user['nama_lengkap'],
                'roles' => $roles,
                'unit_kerja_id' => $user['unit_kerja_id']
            ]);

            // Get full user data with unit kerja
            $userData = $this->userModel->getUserWithRoles($user['user_id']);

            Response::success([
                'token' => $token,
                'token_type' => 'Bearer',
                'expires_in' => 86400, // 24 hours
                'user' => [
                    'user_id' => $userData['user_id'],
                    'username' => $userData['username'],
                    'nama_lengkap' => $userData['nama_lengkap'],
                    'email' => $userData['email'],
                    'unit_kerja' => [
                        'unit_kerja_id' => $userData['unit_kerja_id'],
                        'nama_unit_kerja' => $userData['nama_unit_kerja'] ?? null,
                        'kode_unit' => $userData['kode_unit'] ?? null
                    ],
                    'roles' => $userData['roles']
                ]
            ], 'Login berhasil');

        } catch (\Exception $e) {
            Response::error('Gagal login: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Logout user (client-side token removal)
     * 
     * POST /api/auth/logout
     * Header: Authorization: Bearer <token>
     * Requires: AuthMiddleware
     */
    public function logout()
    {
        try {
            // Note: JWT adalah stateless, jadi logout hanya memberikan instruksi
            // ke client untuk menghapus token. Server tidak menyimpan token.
            
            Response::success(null, 'Logout berhasil. Token harus dihapus dari client.');

        } catch (\Exception $e) {
            Response::error('Gagal logout: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get authenticated user profile
     * 
     * GET /api/auth/profile
     * Header: Authorization: Bearer <token>
     * Requires: AuthMiddleware
     */
    public function getProfile()
    {
        try {
            // Get authenticated user from middleware
            $authUser = AuthMiddleware::getAuthUser();
            
            if (!$authUser) {
                Response::unauthorized('User tidak terautentikasi');
            }

            // Get full user data with unit kerja
            $user = $this->userModel->getUserWithRoles($authUser['user_id']);

            if (!$user) {
                Response::notFound('User tidak ditemukan');
            }

            Response::success([
                'user' => [
                    'user_id' => $user['user_id'],
                    'username' => $user['username'],
                    'nama_lengkap' => $user['nama_lengkap'],
                    'email' => $user['email'],
                    'unit_kerja' => [
                        'unit_kerja_id' => $user['unit_kerja_id'],
                        'nama_unit_kerja' => $user['nama_unit_kerja'] ?? null,
                        'kode_unit' => $user['kode_unit'] ?? null
                    ],
                    'roles' => $user['roles'],
                    'created_at' => $user['created_at']
                ]
            ], 'Data profile berhasil diambil');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil profile: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update user profile
     * 
     * PUT /api/auth/profile
     * Header: Authorization: Bearer <token>
     * Body: {nama_lengkap, email, unit_kerja_id}
     * Requires: AuthMiddleware
     */
    public function updateProfile()
    {
        try {
            // Get authenticated user
            $authUser = AuthMiddleware::getAuthUser();
            
            if (!$authUser) {
                Response::unauthorized('User tidak terautentikasi');
            }

            // Get request body
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            $required = ['nama_lengkap', 'email', 'unit_kerja_id'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    Response::error("Field '$field' wajib diisi", 400);
                }
            }

            // Validate email format
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                Response::error('Format email tidak valid', 400);
            }

            // Check if email already used by another user
            if ($this->userModel->emailExists($data['email'], $authUser['user_id'])) {
                Response::error('Email sudah digunakan oleh user lain', 409);
            }

            // Update profile
            $success = $this->userModel->updateProfile($authUser['user_id'], [
                'nama_lengkap' => $data['nama_lengkap'],
                'email' => $data['email'],
                'unit_kerja_id' => $data['unit_kerja_id']
            ]);

            if (!$success) {
                Response::error('Gagal update profile', 500);
            }

            // Get updated user data
            $user = $this->userModel->getUserWithRoles($authUser['user_id']);

            Response::success([
                'user' => [
                    'user_id' => $user['user_id'],
                    'username' => $user['username'],
                    'nama_lengkap' => $user['nama_lengkap'],
                    'email' => $user['email'],
                    'unit_kerja' => [
                        'unit_kerja_id' => $user['unit_kerja_id'],
                        'nama_unit_kerja' => $user['nama_unit_kerja'] ?? null,
                        'kode_unit' => $user['kode_unit'] ?? null
                    ],
                    'roles' => $user['roles']
                ]
            ], 'Profile berhasil diupdate');

        } catch (\Exception $e) {
            Response::error('Gagal update profile: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Change user password
     * 
     * PUT /api/auth/change-password
     * Header: Authorization: Bearer <token>
     * Body: {old_password, new_password, new_password_confirmation}
     * Requires: AuthMiddleware
     */
    public function changePassword()
    {
        try {
            // Get authenticated user
            $authUser = AuthMiddleware::getAuthUser();
            
            if (!$authUser) {
                Response::unauthorized('User tidak terautentikasi');
            }

            // Get request body
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            $required = ['old_password', 'new_password', 'new_password_confirmation'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    Response::error("Field '$field' wajib diisi", 400);
                }
            }

            // Validate new password confirmation
            if ($data['new_password'] !== $data['new_password_confirmation']) {
                Response::error('Konfirmasi password baru tidak cocok', 400);
            }

            // Validate new password strength
            if (strlen($data['new_password']) < 8) {
                Response::error('Password baru minimal 8 karakter', 400);
            }

            // Check if new password same as old password
            if ($data['old_password'] === $data['new_password']) {
                Response::error('Password baru tidak boleh sama dengan password lama', 400);
            }

            // Get user with password hash
            $userWithPassword = $this->userModel->findByUsername($authUser['username']);

            if (!$userWithPassword) {
                Response::notFound('User tidak ditemukan');
            }

            // Verify old password
            if (!$this->userModel->verifyPassword($data['old_password'], $userWithPassword['password_hash'])) {
                Response::error('Password lama tidak sesuai', 401);
            }

            // Update password
            $success = $this->userModel->updatePassword($authUser['user_id'], $data['new_password']);

            if (!$success) {
                Response::error('Gagal mengubah password', 500);
            }

            Response::success(null, 'Password berhasil diubah. Silakan login kembali dengan password baru.');

        } catch (\Exception $e) {
            Response::error('Gagal mengubah password: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Refresh JWT token
     * 
     * POST /api/auth/refresh
     * Header: Authorization: Bearer <token>
     * Requires: AuthMiddleware
     */
    public function refresh()
    {
        try {
            // Get authenticated user
            $authUser = AuthMiddleware::getAuthUser();
            
            if (!$authUser) {
                Response::unauthorized('User tidak terautentikasi');
            }

            // Get fresh user data from database
            $user = $this->userModel->getUserWithRoles($authUser['user_id']);

            if (!$user) {
                Response::notFound('User tidak ditemukan');
            }

            // Generate new JWT token
            $token = JWT::encode([
                'user_id' => $user['user_id'],
                'username' => $user['username'],
                'nama_lengkap' => $user['nama_lengkap'],
                'roles' => $user['roles'],
                'unit_kerja_id' => $user['unit_kerja_id']
            ]);

            Response::success([
                'token' => $token,
                'token_type' => 'Bearer',
                'expires_in' => 86400 // 24 hours
            ], 'Token berhasil di-refresh');

        } catch (\Exception $e) {
            Response::error('Gagal refresh token: ' . $e->getMessage(), 500);
        }
    }
}