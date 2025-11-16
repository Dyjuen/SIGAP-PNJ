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

    public function __construct()
    {
        $this->panduanModel = new Panduan();
    }

    public function index()
    {
        try {
            $authUser = AuthMiddleware::getAuthUser();
            $role_id = $authUser['role_id'] ?? null;
            $userRoles = $authUser['roles'] ?? [];

            // Jika user adalah admin, tampilkan semua panduan
            if (in_array('Admin', $userRoles)) {
                 $panduan = $this->panduanModel->findAll();
            } else {
                 $panduan = $this->panduanModel->findByRole($role_id);
            }
            
            Response::json($panduan);
        } catch (\Exception $e) {
            Response::json(['error' => 'Gagal mengambil data panduan: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $panduan = $this->panduanModel->find($id);

            if (!$panduan) {
                Response::json(['error' => 'Panduan tidak ditemukan'], 404);
                return;
            }

            $authUser = AuthMiddleware::getAuthUser();
            $role_id = $authUser['role_id'] ?? null;
            $userRoles = $authUser['roles'] ?? [];

            // Admin bisa melihat semua
            if (in_array('Admin', $userRoles)) {
                Response::json($panduan);
                return;
            }

            // Pengguna biasa hanya bisa melihat panduan untuk perannya
            if ($panduan['target_role_id'] == $role_id) {
                Response::json($panduan);
            } else {
                Response::json(['error' => 'Panduan tidak ditemukan'], 404);
            }
            
        } catch (\Exception $e) {
            Response::json(['error' => 'Gagal mengambil data panduan: ' . $e->getMessage()], 500);
        }
    }

    public function store()
    {
        (new RoleMiddleware(['Admin']))->handle();
        
        $data = json_decode(file_get_contents('php://input'), true);

        $errors = PanduanValidator::validate($data);
        if (!empty($errors)) {
            Response::json(['errors' => $errors], 400);
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

            Response::json($newPanduan, 201);
        } catch (\Exception $e) {
            Response::json(['error' => 'Gagal menyimpan panduan: ' . $e->getMessage()], 500);
        }
    }

    public function update($id)
    {
        (new RoleMiddleware(['Admin']))->handle();

        $data = json_decode(file_get_contents('php://input'), true);
        
        $errors = PanduanValidator::validate($data);
        if (!empty($errors)) {
            Response::json(['errors' => $errors], 400);
            return;
        }

        try {
            if (!$this->panduanModel->exists($id)) {
                Response::json(['error' => 'Panduan tidak ditemukan'], 404);
                return;
            }

            $updateData = [
                'judul_panduan' => $data['judul_panduan'],
                'isi_panduan' => $data['isi_panduan'],
                'target_role_id' => $data['target_role_id'] ?? null,
            ];

            $this->panduanModel->update($id, $updateData);
            $updatedPanduan = $this->panduanModel->find($id);

            Response::json($updatedPanduan);
        } catch (\Exception $e) {
            Response::json(['error' => 'Gagal memperbarui panduan: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        (new RoleMiddleware(['Admin']))->handle();

        try {
            if (!$this->panduanModel->exists($id)) {
                Response::json(['error' => 'Panduan tidak ditemukan'], 404);
                return;
            }

            $this->panduanModel->delete($id);

            Response::json(['message' => 'Panduan berhasil dihapus']);
        } catch (\Exception $e) {
            Response::json(['error' => 'Gagal menghapus panduan: ' . $e->getMessage()], 500);
        }
    }
}