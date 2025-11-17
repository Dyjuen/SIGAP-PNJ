<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Response;
use App\Models\Panduan;
use App\Middlewares\AuthMiddleware;
use App\Middlewares\RoleMiddleware;
use App\Validators\PanduanValidator;

class PanduanController extends Controller
{
    private $panduanModel;
    private $userData;

    public function __construct()
    {
        $this->panduanModel = new Panduan();
        $this->userData = AuthMiddleware::getAuthUser();
    }

    public function index()
    {
        try {
            $role_id = $this->userData['role_id'] ?? null;
            $userRoles = $this->userData['roles'] ?? [];

            // Jika user adalah admin, tampilkan semua panduan
            if (in_array('Admin', $userRoles)) {
                 $panduan = $this->panduanModel->findAll();
            } else {
                 $panduan = $this->panduanModel->findByRole($role_id);
            }
            
            Response::success($panduan, 'Data panduan berhasil diambil.');
        } catch (\Exception $e) {
            Response::error('Gagal mengambil data panduan: ' . $e->getMessage(), 500);
        }
    }

    public function show($id)
    {
        try {
            $panduan = $this->panduanModel->find($id);

            if (!$panduan) {
                Response::notFound('Panduan tidak ditemukan.');
                return;
            }

            $role_id = $this->userData['role_id'] ?? null;
            $userRoles = $this->userData['roles'] ?? [];

            // Admin bisa melihat semua
            if (in_array('Admin', $userRoles)) {
                Response::success($panduan, 'Detail panduan berhasil diambil.');
                return;
            }

            // Pengguna biasa hanya bisa melihat panduan untuk perannya
            if ($panduan['target_role_id'] == $role_id) {
                Response::success($panduan, 'Detail panduan berhasil diambil.');
            } else {
                Response::notFound('Panduan tidak ditemukan atau Anda tidak memiliki akses.');
            }
            
        } catch (\Exception $e) {
            Response::error('Gagal mengambil data panduan: ' . $e->getMessage(), 500);
        }
    }

    public function store()
    {
        (new RoleMiddleware(['Admin']))->handle();
        
        $data = json_decode(file_get_contents('php://input'), true);

        $errors = PanduanValidator::validate($data);
        if (!empty($errors)) {
            Response::validationError($errors, 'Validasi gagal.');
            return;
        }

        try {
            $createData = [
                'judul_panduan' => $data['judul_panduan'],
                'isi_panduan' => $data['isi_panduan'],
                'target_role_id' => $data['target_role_id'] ?? null,
            ];

            $panduanId = $this->panduanModel->create($createData);
            $newPanduan = $this->panduanModel->find($panduanId);

            Response::created($newPanduan, 'Panduan berhasil dibuat.');
        } catch (\Exception $e) {
            Response::error('Gagal menyimpan panduan: ' . $e->getMessage(), 500);
        }
    }

    public function update($id)
    {
        (new RoleMiddleware(['Admin']))->handle();

        $data = json_decode(file_get_contents('php://input'), true);
        
        $errors = PanduanValidator::validate($data);
        if (!empty($errors)) {
            Response::validationError($errors, 'Validasi gagal.');
            return;
        }

        try {
            if (!$this->panduanModel->exists($id)) {
                Response::notFound('Panduan tidak ditemukan.');
                return;
            }

            $updateData = [
                'judul_panduan' => $data['judul_panduan'],
                'isi_panduan' => $data['isi_panduan'],
                'target_role_id' => $data['target_role_id'] ?? null,
            ];

            $this->panduanModel->update($id, $updateData);
            $updatedPanduan = $this->panduanModel->find($id);

            Response::success($updatedPanduan, 'Panduan berhasil diperbarui.');
        } catch (\Exception $e) {
            Response::error('Gagal memperbarui panduan: ' . $e->getMessage(), 500);
        }
    }

    public function destroy($id)
    {
        (new RoleMiddleware(['Admin']))->handle();

        try {
            if (!$this->panduanModel->exists($id)) {
                Response::notFound('Panduan tidak ditemukan.');
                return;
            }

            $this->panduanModel->delete($id);

            Response::success(null, 'Panduan berhasil dihapus.');
        } catch (\Exception $e) {
            Response::error('Gagal menghapus panduan: ' . $e->getMessage(), 500);
        }
    }
}