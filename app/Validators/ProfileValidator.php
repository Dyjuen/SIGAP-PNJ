<?php

namespace App\Validators;

use App\Core\Validator;
use App\Models\User;
use App\Models\UnitKerja;

class ProfileValidator extends Validator
{
    private $userModel;
    private $unitKerjaModel;

    public function __construct()
    {
        $this->userModel = new User();
        $this->unitKerjaModel = new UnitKerja();
    }

    /**
     * Validate update profile data
     * 
     * @param array $data Data profile yang akan diupdate
     * @param int $userId ID user yang sedang login
     * @return bool
     */
    public function validateUpdateProfile(array $data, $userId): bool
    {
        // Basic validation rules
        $rules = [
            'nama_lengkap' => 'required|min:3|max:100',
            'email' => 'required|email|max:100',
            'unit_kerja_id' => 'required|integer'
        ];

        // Apply basic validation
        if (!$this->validate($data, $rules)) {
            return false;
        }

        // Custom validations
        $this->validateEmailUnique($data['email'] ?? '', $userId);
        $this->validateUnitKerja($data['unit_kerja_id'] ?? null);

        return !$this->hasErrors();
    }

    /**
     * Validate change password data
     * 
     * @param array $data Data password (current_password, new_password, new_password_confirmation)
     * @param int $userId ID user yang sedang login
     * @return bool
     */
    public function validateChangePassword(array $data, $userId): bool
    {
        // Basic validation rules
        $rules = [
            'current_password' => 'required',
            'new_password' => 'required|min:8|max:100',
            'new_password_confirmation' => 'required'
        ];

        // Apply basic validation
        if (!$this->validate($data, $rules)) {
            return false;
        }

        // Custom validations
        $this->validateCurrentPassword($data['current_password'] ?? '', $userId);
        $this->validateNewPasswordConfirmation(
            $data['new_password'] ?? '', 
            $data['new_password_confirmation'] ?? ''
        );
        $this->validateNewPasswordDifferent(
            $data['current_password'] ?? '', 
            $data['new_password'] ?? ''
        );

        return !$this->hasErrors();
    }

    /**
     * Validate email uniqueness (exclude current user)
     */
    private function validateEmailUnique($email, $userId)
    {
        if (empty($email)) {
            return;
        }

        if ($this->userModel->emailExists($email, $userId)) {
            $this->addError('email', 'Email sudah digunakan oleh user lain.');
        }
    }

    /**
     * Validate unit kerja exists
     */
    private function validateUnitKerja($unitKerjaId)
    {
        if (empty($unitKerjaId)) {
            return;
        }

        if (!$this->unitKerjaModel->unitKerjaExists($unitKerjaId)) {
            $this->addError('unit_kerja_id', 'Unit kerja tidak ditemukan.');
        }
    }

    /**
     * Validate current password is correct
     */
    private function validateCurrentPassword($currentPassword, $userId)
    {
        if (empty($currentPassword)) {
            return;
        }

        $user = $this->userModel->findById($userId);
        
        if (!$user) {
            $this->addError('current_password', 'User tidak ditemukan.');
            return;
        }

        if (!$this->userModel->verifyPassword($currentPassword, $user['password_hash'])) {
            $this->addError('current_password', 'Password saat ini tidak sesuai.');
        }
    }

    /**
     * Validate new password confirmation
     */
    private function validateNewPasswordConfirmation($newPassword, $newPasswordConfirmation)
    {
        if ($newPassword !== $newPasswordConfirmation) {
            $this->addError('new_password_confirmation', 'Konfirmasi password baru tidak sama.');
        }
    }

    /**
     * Validate new password different from current
     */
    private function validateNewPasswordDifferent($currentPassword, $newPassword)
    {
        if (!empty($currentPassword) && !empty($newPassword) && $currentPassword === $newPassword) {
            $this->addError('new_password', 'Password baru harus berbeda dengan password saat ini.');
        }
    }
}