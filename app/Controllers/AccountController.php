<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\User;
use App\Validators\ProfileValidator;

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
        // Get authenticated user from helper function
        $authUser = auth_user();

        if (!$authUser) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        $userId = $authUser['user_id'];

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
     * Body: { nama_lengkap, email }
     * 
     * Note: unit_kerja_id is now OPTIONAL
     */
    public function updateProfile()
    {
        // Get authenticated user
        $authUser = auth_user();

        if (!$authUser) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        $userId = $authUser['user_id'];

        // Get JSON input
        $input = json_decode(file_get_contents('php://input'), true);

        // Validate required fields only
        $rules = [
            'nama_lengkap' => 'required|min:3|max:100',
            'email' => 'required|email|max:100'
        ];

        $validator = new ProfileValidator();
        if (!$validator->validate($input, $rules)) {
            Response::validationError($validator->getErrors(), 'Validasi gagal.');
        }

        // Check email uniqueness
        if ($this->userModel->emailExists($input['email'], $userId)) {
            Response::validationError([
                'email' => ['Email sudah digunakan oleh user lain.']
            ], 'Validasi gagal.');
        }

        try {
            // Update profile (only nama_lengkap and email)
            $updateData = [
                'nama_lengkap' => $input['nama_lengkap'],
                'email' => $input['email']
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
        // Get authenticated user
        $authUser = auth_user();

        if (!$authUser) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        $userId = $authUser['user_id'];

        // Get JSON input
        $input = json_decode(file_get_contents('php://input'), true);

        // Validate required fields
        $rules = [
            'current_password' => 'required',
            'new_password' => 'required|min:8|max:100',
            'new_password_confirmation' => 'required'
        ];

        $validator = new ProfileValidator();
        if (!$validator->validate($input, $rules)) {
            Response::validationError($validator->getErrors(), 'Validasi gagal.');
        }

        // Check if new password matches confirmation
        if ($input['new_password'] !== $input['new_password_confirmation']) {
            Response::validationError([
                'new_password_confirmation' => ['Konfirmasi password tidak sama.']
            ], 'Validasi gagal.');
        }

        // Verify current password
        $user = $this->userModel->findById($userId);
        
        if (!$user) {
            Response::notFound('User tidak ditemukan.');
        }

        if (!$this->userModel->verifyPassword($input['current_password'], $user['password_hash'])) {
            Response::validationError([
                'current_password' => ['Password saat ini tidak sesuai.']
            ], 'Validasi gagal.');
        }

        // Check if new password is different from current
        if ($input['current_password'] === $input['new_password']) {
            Response::validationError([
                'new_password' => ['Password baru harus berbeda dengan password saat ini.']
            ], 'Validasi gagal.');
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