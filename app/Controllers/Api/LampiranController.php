<?php

namespace App\Controllers\Api;

use App\Core\Response;
use App\Core\FileUpload;
use App\Models\Kegiatan;
use App\Models\KegiatanLampiran;
use App\Middlewares\AuthMiddleware;

class LampiranController
{
    private $kegiatanModel;
    private $lampiranModel;
    private $fileUpload;
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

        // Initialize models and utilities
        $this->kegiatanModel = new Kegiatan();
        $this->lampiranModel = new KegiatanLampiran();
        $this->fileUpload = new FileUpload();
    }

    /**
     * Get all lampiran for a kegiatan
     * 
     * GET /api/kegiatan/{id}/lampiran
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

            // Get lampiran list
            $lampiran = $this->lampiranModel->getByKegiatanId($kegiatanId);

            Response::success([
                'lampiran' => $lampiran,
                'summary' => [
                    'jumlah_file' => count($lampiran),
                    'max_files' => 10
                ]
            ], 'Data lampiran berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil data lampiran: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Upload lampiran
     * 
     * POST /api/kegiatan/{id}/lampiran
     * Content-Type: multipart/form-data
     */
    public function upload()
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

            // Authorization: Only owner can upload
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk upload lampiran.');
            }

            // Cannot upload if not Draft or Revisi
            if (!in_array($kegiatan['status_id'], [1, 5])) {
                Response::error('Lampiran hanya bisa diupload jika kegiatan berstatus Draft atau Revisi.', 400);
            }

            // Check max files limit (10)
            $existingFiles = $this->lampiranModel->countByKegiatanId($kegiatanId);
            if ($existingFiles >= 10) {
                Response::error('Maksimal 10 file per kegiatan. Hapus file lama terlebih dahulu.', 400);
            }

            // Check if file exists
            if (!isset($_FILES['file'])) {
                Response::badRequest('File tidak ditemukan. Gunakan key "file" untuk upload.');
            }

            // Upload file
            $uploadResult = $this->fileUpload->upload($_FILES['file']);

            if (!$uploadResult['success']) {
                Response::error($uploadResult['message'], 400);
            }

            // Get keterangan from POST data (optional)
            $keterangan = $_POST['keterangan'] ?? null;

            // Save to database
            $lampiranId = $this->lampiranModel->create([
                'kegiatan_id' => $kegiatanId,
                'nama_file' => $uploadResult['original_name'],
                'file_path' => $uploadResult['file_path'],
                'file_size' => $uploadResult['file_size'],
                'mime_type' => $uploadResult['mime_type'],
                'keterangan' => $keterangan,
                'uploader_user_id' => $this->userData['user_id']
            ]);

            // Get created lampiran
            $lampiran = $this->lampiranModel->findById($lampiranId);

            Response::created($lampiran, 'File berhasil diupload.');

        } catch (\Exception $e) {
            Response::error('Gagal upload file: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Download lampiran
     * 
     * GET /api/kegiatan/{id}/lampiran/{file_id}
     */
    public function download()
    {
        try {
            // Get IDs from URL
            $ids = $this->extractLampiranIds();
            $kegiatanId = $ids['kegiatan_id'];
            $lampiranId = $ids['lampiran_id'];

            if (!$kegiatanId || !$lampiranId) {
                Response::error('ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Check if lampiran exists
            $lampiran = $this->lampiranModel->findById($lampiranId);
            if (!$lampiran || $lampiran['kegiatan_id'] != $kegiatanId) {
                Response::notFound('File tidak ditemukan.');
            }

            // Authorization check
            $this->checkAccess($kegiatan);

            // Check if file exists on server
            $filePath = $_SERVER['DOCUMENT_ROOT'] . $lampiran['file_path'];
            
            if (!file_exists($filePath)) {
                Response::notFound('File tidak ditemukan di server.');
            }

            // Download file
            header('Content-Type: ' . $lampiran['mime_type']);
            header('Content-Disposition: attachment; filename="' . $lampiran['nama_file'] . '"');
            header('Content-Length: ' . filesize($filePath));
            header('Cache-Control: no-cache, must-revalidate');
            header('Expires: 0');
            
            readfile($filePath);
            exit;

        } catch (\Exception $e) {
            Response::error('Gagal download file: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete lampiran
     * 
     * DELETE /api/kegiatan/{id}/lampiran/{file_id}
     */
    public function delete()
    {
        try {
            // Get IDs from URL
            $ids = $this->extractLampiranIds();
            $kegiatanId = $ids['kegiatan_id'];
            $lampiranId = $ids['lampiran_id'];

            if (!$kegiatanId || !$lampiranId) {
                Response::error('ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Check if lampiran exists
            $lampiran = $this->lampiranModel->findById($lampiranId);
            if (!$lampiran || $lampiran['kegiatan_id'] != $kegiatanId) {
                Response::notFound('File tidak ditemukan.');
            }

            // Authorization
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk menghapus lampiran.');
            }

            // Cannot delete if not Draft or Revisi
            if (!in_array($kegiatan['status_id'], [1, 5])) {
                Response::error('Lampiran hanya bisa dihapus jika kegiatan berstatus Draft atau Revisi.', 400);
            }

            // Delete file from server
            $filePath = $_SERVER['DOCUMENT_ROOT'] . $lampiran['file_path'];
            if (file_exists($filePath)) {
                unlink($filePath);
            }

            // Delete from database
            $this->lampiranModel->delete($lampiranId);

            Response::success(null, 'File berhasil dihapus.');

        } catch (\Exception $e) {
            Response::error('Gagal menghapus file: ' . $e->getMessage(), 500);
        }
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
        
        // Pattern: /api/kegiatan/{id}/lampiran
        if (preg_match('/\/kegiatan\/(\d+)\/lampiran(?:\/)?$/', $uri, $matches)) {
            return (int) $matches[1];
        }

        return null;
    }

    /**
     * Helper: Extract kegiatan_id and lampiran_id from URL
     */
    private function extractLampiranIds()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        
        // Pattern: /api/kegiatan/{id}/lampiran/{file_id}
        if (preg_match('/\/kegiatan\/(\d+)\/lampiran\/(\d+)(?:\/)?$/', $uri, $matches)) {
            return [
                'kegiatan_id' => (int) $matches[1],
                'lampiran_id' => (int) $matches[2]
            ];
        }

        return [
            'kegiatan_id' => null,
            'lampiran_id' => null
        ];
    }
}