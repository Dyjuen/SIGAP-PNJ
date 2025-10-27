<?php

namespace App\Controllers;

use App\Core\Response;
use App\Core\JWT;
use App\Models\User;
use App\Middlewares\AuthMiddleware;

class AuthController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    /**
     * Register new user (Admin only)
     * 
     * POST /api/auth/register
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
                    Response::badRequest("Field '$field' wajib diisi");
                }
            }

            // Validate username format (alphanumeric and underscore only)
            if (!preg_match('/^[a-zA-Z0-9_]{4,50}$/', $data['username'])) {
                Response::badRequest('Username harus 4-50 karakter (huruf, angka, underscore)');
            }

            // Validate password strength
            if (strlen($data['password']) < 8) {
                Response::badRequest('Password minimal 8 karakter');
            }

            // Validate email format
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                Response::badRequest('Format email tidak valid');
            }

            // Check if username already exists
            if ($this->userModel->usernameExists($data['username'])) {
                Response::conflict('Username sudah digunakan');
            }

            // Check if email already exists
            if ($this->userModel->emailExists($data['email'])) {
                Response::conflict('Email sudah terdaftar');
            }

            // Create user
            $userId = $this->userModel->createUser([
                'username' => $data['username'],
                'password' => $data['password'],
                'nama_lengkap' => $data['nama_lengkap'],
                'email' => $data['email'],
                'unit_kerja_id' => $data['unit_kerja_id']
            ]);

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
            Response::error('Gagal mendaftar user: ' . $e->getMessage());
        }
    }

    /**
     * Login user
     * 
     * POST /api/auth/login
     * Body: {username, password}
     */
    public function login()
    {
        try {
            // Get request body
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate required fields
            if (empty($data['username']) || empty($data['password'])) {
                Response::badRequest('Username dan password wajib diisi');
            }

            // Find user by username
            $user = $this->userModel->findByUsername($data['username']);

            if (!$user) {
                Response::unauthorized('Username atau password salah');
            }

            // Verify password
            if (!$this->userModel->verifyPassword($data['password'], $user['password_hash'])) {
                Response::unauthorized('Username atau password salah');
            }

            // Convert roles string to array
            $roles = $user['roles'] ? explode(',', $user['roles']) : [];

            // Generate JWT token
            $token = JWT::encode([
                'user_id' => $user['user_id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'roles' => $roles,
                'unit_kerja_id' => $user['unit_kerja_id']
            ]);

            // Get full user data with unit kerja
            $userData = $this->userModel->getUserWithRoles($user['user_id']);

            Response::success([
                'token' => $token,
                'token_type' => 'Bearer',
                'expires_in' => JWT::getExpiryTime(),
                'user' => [
                    'user_id' => $userData['user_id'],
                    'username' => $userData['username'],
                    'nama_lengkap' => $userData['nama_lengkap'],
                    'email' => $userData['email'],
                    'unit_kerja' => [
                        'unit_kerja_id' => $userData['unit_kerja_id'],
                        'nama_unit_kerja' => $userData['nama_unit_kerja'],
                        'kode_unit' => $userData['kode_unit']
                    ],
                    'roles' => $userData['roles']
                ]
            ], 'Login berhasil');

        } catch (\Exception $e) {
            Response::error('Gagal login: ' . $e->getMessage());
        }
    }

    /**
     * Get authenticated user profile
     * 
     * GET /api/auth/profile
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
                        'nama_unit_kerja' => $user['nama_unit_kerja'],
                        'kode_unit' => $user['kode_unit']
                    ],
                    'roles' => $user['roles'],
                    'created_at' => $user['created_at']
                ]
            ], 'Data profile berhasil diambil');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil profile: ' . $e->getMessage());
        }
    }

    /**
     * Update user profile
     * 
     * PUT /api/auth/profile
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
                    Response::badRequest("Field '$field' wajib diisi");
                }
            }

            // Validate email format
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                Response::badRequest('Format email tidak valid');
            }

            // Check if email already used by another user
            if ($this->userModel->emailExists($data['email'], $authUser['user_id'])) {
                Response::conflict('Email sudah digunakan oleh user lain');
            }

            // Update profile
            $success = $this->userModel->updateProfile($authUser['user_id'], [
                'nama_lengkap' => $data['nama_lengkap'],
                'email' => $data['email'],
                'unit_kerja_id' => $data['unit_kerja_id']
            ]);

            if (!$success) {
                Response::error('Gagal update profile');
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
                        'nama_unit_kerja' => $user['nama_unit_kerja'],
                        'kode_unit' => $user['kode_unit']
                    ],
                    'roles' => $user['roles']
                ]
            ], 'Profile berhasil diupdate');

        } catch (\Exception $e) {
            Response::error('Gagal update profile: ' . $e->getMessage());
        }
    }

    /**
     * Change user password
     * 
     * PUT /api/auth/change-password
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
                    Response::badRequest("Field '$field' wajib diisi");
                }
            }

            // Validate new password confirmation
            if ($data['new_password'] !== $data['new_password_confirmation']) {
                Response::badRequest('Konfirmasi password baru tidak cocok');
            }

            // Validate new password strength
            if (strlen($data['new_password']) < 8) {
                Response::badRequest('Password baru minimal 8 karakter');
            }

            // Check if new password same as old password
            if ($data['old_password'] === $data['new_password']) {
                Response::badRequest('Password baru tidak boleh sama dengan password lama');
            }

            // Get current user data
            $user = $this->userModel->findById($authUser['user_id']);

            if (!$user) {
                Response::notFound('User tidak ditemukan');
            }

            // Get user with password hash
            $userWithPassword = $this->userModel->findByUsername($authUser['username']);

            // Verify old password
            if (!$this->userModel->verifyPassword($data['old_password'], $userWithPassword['password_hash'])) {
                Response::unauthorized('Password lama tidak sesuai');
            }

            // Update password
            $success = $this->userModel->updatePassword($authUser['user_id'], $data['new_password']);

            if (!$success) {
                Response::error('Gagal mengubah password');
            }

            Response::success(null, 'Password berhasil diubah. Silakan login kembali dengan password baru.');

        } catch (\Exception $e) {
            Response::error('Gagal mengubah password: ' . $e->getMessage());
        }
    }

    /**
     * Refresh JWT token
     * 
     * POST /api/auth/refresh
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
                'email' => $user['email'],
                'roles' => $user['roles'],
                'unit_kerja_id' => $user['unit_kerja_id']
            ]);

            Response::success([
                'token' => $token,
                'token_type' => 'Bearer',
                'expires_in' => JWT::getExpiryTime()
            ], 'Token berhasil di-refresh');

        } catch (\Exception $e) {
            Response::error('Gagal refresh token: ' . $e->getMessage());
        }
    }

    /**
     * Logout user (client-side token removal)
     * 
     * POST /api/auth/logout
     * Requires: AuthMiddleware
     */
    public function logout()
    {
        try {
            // Note: JWT adalah stateless, jadi logout hanya memberikan instruksi
            // ke client untuk menghapus token. Server tidak menyimpan token.
            
            Response::success(null, 'Logout berhasil. Token harus dihapus dari client.');

        } catch (\Exception $e) {
            Response::error('Gagal logout: ' . $e->getMessage());
        }
    }
}