<?php

namespace App\Controllers\Api;

use App\Core\Response;
use App\Models\Kegiatan;
use App\Models\KegiatanAnggaran;
use App\Validators\AnggaranValidator;
use App\Middlewares\AuthMiddleware;

class AnggaranController
{
    private $kegiatanModel;
    private $anggaranModel;
    private $userData;

    public function __construct()
    {
        // Initialize middleware
        $middleware = new AuthMiddleware();
        $middleware->handle();

        // Get authenticated user
        $this->userData = AuthMiddleware::getAuthUser();
        
        if (!$this->userData) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        // Initialize models
        $this->kegiatanModel = new Kegiatan();
        $this->anggaranModel = new KegiatanAnggaran();
    }

    /**
     * Get all anggaran for a kegiatan
     * 
     * GET /api/kegiatan/{id}/anggaran
     */
    public function index()
    {
        try {
            // Get kegiatan_id from URL
            $kegiatanId = $this->extractKegiatanId();

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization check
            $this->checkAccess($kegiatan);

            // Get anggaran items
            $anggaran = $this->anggaranModel->getByKegiatanId($kegiatanId);

            // Calculate total
            $total = $this->anggaranModel->calculateTotal($kegiatanId);

            Response::success([
                'items' => $anggaran,
                'summary' => [
                    'total_diusulkan' => (float) ($total['total_diusulkan'] ?? 0),
                    'total_disetujui' => (float) ($total['total_disetujui'] ?? 0),
                    'jumlah_item' => count($anggaran)
                ]
            ], 'Data anggaran berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil data anggaran: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Create anggaran item
     * 
     * POST /api/kegiatan/{id}/anggaran
     */
    public function create()
    {
        try {
            // Get kegiatan_id from URL
            $kegiatanId = $this->extractKegiatanId();

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization: Only owner can add
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk menambah anggaran.');
            }

            // Cannot add if not Draft or Revisi
            if (!in_array($kegiatan['status_id'], [1, 5])) {
                Response::error('Anggaran hanya bisa ditambah jika kegiatan berstatus Draft atau Revisi.', 400);
            }

            // Get JSON input
            $data = json_decode(file_get_contents('php://input'), true);

            if (!$data) {
                Response::badRequest('Data tidak valid atau kosong.');
            }

            // Validate input
            $validator = new AnggaranValidator();
            if (!$validator->validateAnggaran($data)) {
                Response::validationError($validator->getErrors(), 'Validasi gagal.');
            }

            // Calculate jumlah_diusulkan
            $data['jumlah_diusulkan'] = $data['volume'] * $data['harga_satuan'];
            $data['kegiatan_id'] = $kegiatanId;

            // Create anggaran item
            $anggaranId = $this->anggaranModel->create($data);

            // Update total anggaran kegiatan
            $this->updateTotalAnggaran($kegiatanId);

            // Get created item
            $item = $this->anggaranModel->findById($anggaranId);

            Response::created($item, 'Item anggaran berhasil ditambahkan.');

        } catch (\Exception $e) {
            Response::error('Gagal menambah item anggaran: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update anggaran item
     * 
     * PUT /api/kegiatan/{id}/anggaran/{item_id}
     */
    public function update()
    {
        try {
            // Get IDs from URL
            $ids = $this->extractAnggaranIds();
            $kegiatanId = $ids['kegiatan_id'];
            $anggaranId = $ids['anggaran_id'];

            if (!$kegiatanId || !$anggaranId) {
                Response::error('ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Check if anggaran exists
            $anggaran = $this->anggaranModel->findById($anggaranId);
            if (!$anggaran || $anggaran['kegiatan_id'] != $kegiatanId) {
                Response::notFound('Item anggaran tidak ditemukan.');
            }

            // Authorization
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk mengedit anggaran.');
            }

            // Cannot edit if not Draft or Revisi
            if (!in_array($kegiatan['status_id'], [1, 5])) {
                Response::error('Anggaran hanya bisa diedit jika kegiatan berstatus Draft atau Revisi.', 400);
            }

            // Get JSON input
            $data = json_decode(file_get_contents('php://input'), true);

            if (!$data) {
                Response::badRequest('Data tidak valid atau kosong.');
            }

            // Validate input
            $validator = new AnggaranValidator();
            if (!$validator->validateAnggaran($data)) {
                Response::validationError($validator->getErrors(), 'Validasi gagal.');
            }

            // Calculate jumlah_diusulkan
            $data['jumlah_diusulkan'] = $data['volume'] * $data['harga_satuan'];

            // Update anggaran item
            $this->anggaranModel->update($anggaranId, $data);

            // Update total anggaran kegiatan
            $this->updateTotalAnggaran($kegiatanId);

            // Get updated item
            $item = $this->anggaranModel->findById($anggaranId);

            Response::success($item, 'Item anggaran berhasil diupdate.');

        } catch (\Exception $e) {
            Response::error('Gagal update item anggaran: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete anggaran item
     * 
     * DELETE /api/kegiatan/{id}/anggaran/{item_id}
     */
    public function delete()
    {
        try {
            // Get IDs from URL
            $ids = $this->extractAnggaranIds();
            $kegiatanId = $ids['kegiatan_id'];
            $anggaranId = $ids['anggaran_id'];

            if (!$kegiatanId || !$anggaranId) {
                Response::error('ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Check if anggaran exists
            $anggaran = $this->anggaranModel->findById($anggaranId);
            if (!$anggaran || $anggaran['kegiatan_id'] != $kegiatanId) {
                Response::notFound('Item anggaran tidak ditemukan.');
            }

            // Authorization
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk menghapus anggaran.');
            }

            // Cannot delete if not Draft or Revisi
            if (!in_array($kegiatan['status_id'], [1, 5])) {
                Response::error('Anggaran hanya bisa dihapus jika kegiatan berstatus Draft atau Revisi.', 400);
            }

            // Delete anggaran item
            $this->anggaranModel->delete($anggaranId);

            // Update total anggaran kegiatan
            $this->updateTotalAnggaran($kegiatanId);

            Response::success(null, 'Item anggaran berhasil dihapus.');

        } catch (\Exception $e) {
            Response::error('Gagal menghapus item anggaran: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Helper: Update total anggaran kegiatan
     */
    private function updateTotalAnggaran($kegiatanId)
    {
        $total = $this->anggaranModel->calculateTotal($kegiatanId);
        
        // Update only total_anggaran_diusulkan field
        $this->kegiatanModel->db->query("
            UPDATE t_kegiatan 
            SET total_anggaran_diusulkan = :total_anggaran_diusulkan,
                updated_at = NOW()
            WHERE kegiatan_id = :kegiatan_id
        ");
        $this->kegiatanModel->db->bind(':total_anggaran_diusulkan', $total['total_diusulkan'] ?? 0);
        $this->kegiatanModel->db->bind(':kegiatan_id', $kegiatanId);
        $this->kegiatanModel->db->execute();
    }

    /**
     * Helper: Check access
     */
    private function checkAccess($kegiatan)
    {
        // Admin dan Verifikator bisa lihat semua
        if ($this->hasRole('Admin') || $this->hasRole('Verifikator')) {
            return;
        }

        // Pengusul hanya bisa akses kegiatan sendiri
        if ($kegiatan['pengusul_user_id'] != $this->userData['user_id']) {
            Response::forbidden('Anda tidak memiliki akses ke kegiatan ini.');
        }
    }

    /**
     * Helper: Check if user has role
     */
    private function hasRole($roleName)
    {
        return in_array($roleName, $this->userData['roles'] ?? []);
    }

    /**
     * Helper: Extract kegiatan_id from URL
     */
    private function extractKegiatanId()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        // Pattern: /api/kegiatan/{id}/anggaran
        if (preg_match('/\/kegiatan\/(\d+)\/anggaran(?:\/)?$/', $uri, $matches)) {
            return (int) $matches[1];
        }

        return null;
    }

    /**
     * Helper: Extract kegiatan_id and anggaran_id from URL
     */
    private function extractAnggaranIds()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        // Pattern: /api/kegiatan/{id}/anggaran/{item_id}
        if (preg_match('/\/kegiatan\/(\d+)\/anggaran\/(\d+)(?:\/)?$/', $uri, $matches)) {
            return [
                'kegiatan_id' => (int) $matches[1],
                'anggaran_id' => (int) $matches[2]
            ];
        }

        return [
            'kegiatan_id' => null,
            'anggaran_id' => null
        ];
    }
}