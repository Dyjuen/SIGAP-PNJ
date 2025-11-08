<?php

namespace App\Controllers\Api;

use App\Core\Response;
use App\Models\User;
use App\Validators\ProfileValidator;
use App\Middlewares\AuthMiddleware;

class AccountController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    /**
     * Get authenticated user profile
     * 
     * GET /api/account/profile
     * Header: Authorization: Bearer <token>
     */
    public function getProfile()
    {
        // Get authenticated user ID from middleware
        $userId = AuthMiddleware::getAuthUserId();

        if (!$userId) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        // Get user with roles
        $user = $this->userModel->getUserWithRoles($userId);

        if (!$user) {
            Response::notFound('User tidak ditemukan.');
        }

        Response::success($user, 'Data profile berhasil diambil.');
    }

    /**
     * Update user profile
     * 
     * PUT /api/account/profile
     * Header: Authorization: Bearer <token>
     * Body: { nama_lengkap, email, unit_kerja_id }
     */
    public function updateProfile()
    {
        // Get authenticated user ID
        $userId = AuthMiddleware::getAuthUserId();

        if (!$userId) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        // Get JSON input
        $input = json_decode(file_get_contents('php://input'), true);

        // Validate input
        $validator = new ProfileValidator();
        if (!$validator->validateUpdateProfile($input, $userId)) {
            Response::validationError($validator->getErrors(), 'Validasi gagal.');
        }

        try {
            // Update profile
            $updateData = [
                'nama_lengkap' => $input['nama_lengkap'],
                'email' => $input['email'],
                'unit_kerja_id' => $input['unit_kerja_id']
            ];

            $this->userModel->updateProfile($userId, $updateData);

            // Get updated user
            $user = $this->userModel->getUserWithRoles($userId);

            Response::success($user, 'Profile berhasil diupdate.');

        } catch (\Exception $e) {
            Response::serverError('Gagal update profile: ' . $e->getMessage());
        }
    }

    /**
     * Change user password
     * 
     * PUT /api/account/change-password
     * Header: Authorization: Bearer <token>
     * Body: { current_password, new_password, new_password_confirmation }
     */
    public function changePassword()
    {
        // Get authenticated user ID
        $userId = AuthMiddleware::getAuthUserId();

        if (!$userId) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        // Get JSON input
        $input = json_decode(file_get_contents('php://input'), true);

        // Validate input
        $validator = new ProfileValidator();
        if (!$validator->validateChangePassword($input, $userId)) {
            Response::validationError($validator->getErrors(), 'Validasi gagal.');
        }

        try {
            // Update password
            $this->userModel->updatePassword($userId, $input['new_password']);

            Response::success(null, 'Password berhasil diubah.');

        } catch (\Exception $e) {
            Response::serverError('Gagal ubah password: ' . $e->getMessage());
        }
    }
}