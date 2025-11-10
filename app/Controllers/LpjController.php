<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Response;
use App\Core\FileUpload;
use App\Models\Kegiatan;
use App\Models\KegiatanLampiran;
use App\Services\LpjTimerService;

class LpjController extends Controller
{
    private $kegiatanModel;
    private $lampiranModel;
    private $lpjService;
    private $fileUpload;

    public function __construct()
    {
        parent::__construct();
        $this->kegiatanModel = new Kegiatan();
        $this->lampiranModel = new KegiatanLampiran();
        $this->lpjService = new LpjTimerService();
        $this->fileUpload = new FileUpload();
    }

    /**
     * Get status LPJ untuk kegiatan
     * GET /api/lpj/status/{kegiatan_id}
     */
    public function getStatus(int $kegiatanId)
    {
        try {
            // Check kegiatan exists dan user adalah pengusul
            $kegiatan = $this->kegiatanModel->find($kegiatanId);
            if (!$kegiatan) {
                return Response::json([
                    'success' => false,
                    'message' => 'Kegiatan tidak ditemukan'
                ], 404);
            }

            // Check authorization
            $userId = $_SESSION['user']['user_id'] ?? null;
            if ($kegiatan['pengusul_user_id'] !== $userId) {
                return Response::json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses ke kegiatan ini'
                ], 403);
            }

            // Get LPJ status
            $status = $this->lpjService->getLpjStatus($kegiatanId);
            
            // Get lampiran yang sudah diupload
            $lampiran = $this->lampiranModel->getLampiranByKegiatan($kegiatanId);

            return Response::json([
                'success' => true,
                'data' => [
                    'kegiatan' => [
                        'kegiatan_id' => $kegiatan['kegiatan_id'],
                        'nama_kegiatan' => $kegiatan['nama_kegiatan']
                    ],
                    'lpj_status' => $status,
                    'lampiran' => $lampiran,
                    'total_lampiran' => count($lampiran)
                ]
            ]);
        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload lampiran LPJ
     * POST /api/lpj/upload/{kegiatan_id}
     */
    public function uploadLampiran(int $kegiatanId)
    {
        try {
            // Validasi kegiatan dan authorization
            $kegiatan = $this->kegiatanModel->find($kegiatanId);
            if (!$kegiatan) {
                return Response::json([
                    'success' => false,
                    'message' => 'Kegiatan tidak ditemukan'
                ], 404);
            }

            $userId = $_SESSION['user']['user_id'] ?? null;
            if ($kegiatan['pengusul_user_id'] !== $userId) {
                return Response::json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses'
                ], 403);
            }

            // Check apakah sudah submitted
            $status = $this->lpjService->getLpjStatus($kegiatanId);
            if ($status['status'] === 'submitted') {
                return Response::json([
                    'success' => false,
                    'message' => 'LPJ sudah disubmit, tidak bisa upload lagi'
                ], 400);
            }

            // Check apakah ada file
            if (!isset($_FILES['file'])) {
                return Response::json([
                    'success' => false,
                    'message' => 'File tidak ditemukan'
                ], 400);
            }

            // Upload file
            $uploadConfig = [
                'upload_path' => 'storage/uploads/lampiran/',
                'allowed_types' => ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx'],
                'max_size' => 5120 // 5MB
            ];

            $uploadResult = $this->fileUpload->upload($_FILES['file'], $uploadConfig);

            if (!$uploadResult['success']) {
                return Response::json([
                    'success' => false,
                    'message' => $uploadResult['message']
                ], 400);
            }

            // Save ke database
            $fileData = [
                'nama_file' => $_FILES['file']['name'],
                'path_file' => $uploadResult['file_path'],
                'tipe_file' => $_FILES['file']['type'],
                'ukuran_file' => $_FILES['file']['size']
            ];

            $inserted = $this->lampiranModel->uploadLampiran($kegiatanId, $fileData);

            if (!$inserted) {
                // Hapus file jika gagal save ke DB
                unlink($uploadResult['file_path']);
                
                return Response::json([
                    'success' => false,
                    'message' => 'Gagal menyimpan data lampiran'
                ], 500);
            }

            return Response::json([
                'success' => true,
                'message' => 'Lampiran berhasil diupload',
                'data' => $fileData
            ]);
        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit LPJ (final)
     * POST /api/lpj/submit/{kegiatan_id}
     */
    public function submitLpj(int $kegiatanId)
    {
        try {
            // Validasi
            $kegiatan = $this->kegiatanModel->find($kegiatanId);
            if (!$kegiatan) {
                return Response::json([
                    'success' => false,
                    'message' => 'Kegiatan tidak ditemukan'
                ], 404);
            }

            $userId = $_SESSION['user']['user_id'] ?? null;
            if ($kegiatan['pengusul_user_id'] !== $userId) {
                return Response::json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses'
                ], 403);
            }

            // Check apakah sudah ada lampiran
            $hasLampiran = $this->lampiranModel->hasLampiran($kegiatanId);
            if (!$hasLampiran) {
                return Response::json([
                    'success' => false,
                    'message' => 'Belum ada lampiran yang diupload'
                ], 400);
            }

            // Mark sebagai submitted
            $submitted = $this->lpjService->markLpjSubmitted($kegiatanId);
            
            if (!$submitted) {
                return Response::json([
                    'success' => false,
                    'message' => 'Gagal submit LPJ'
                ], 500);
            }

            return Response::json([
                'success' => true,
                'message' => 'LPJ berhasil disubmit',
                'data' => [
                    'kegiatan_id' => $kegiatanId,
                    'submitted_at' => date('Y-m-d H:i:s')
                ]
            ]);
        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete lampiran
     * DELETE /api/lpj/lampiran/{lampiran_id}
     */
    public function deleteLampiran(int $lampiranId)
    {
        try {
            // Get lampiran data
            $filePath = $this->lampiranModel->getFilePath($lampiranId);
            
            if (!$filePath) {
                return Response::json([
                    'success' => false,
                    'message' => 'Lampiran tidak ditemukan'
                ], 404);
            }

            // Delete from database
            $deleted = $this->lampiranModel->deleteLampiran($lampiranId);
            
            if ($deleted) {
                // Delete physical file
                if (file_exists($filePath)) {
                    unlink($filePath);
                }

                return Response::json([
                    'success' => true,
                    'message' => 'Lampiran berhasil dihapus'
                ]);
            }

            return Response::json([
                'success' => false,
                'message' => 'Gagal menghapus lampiran'
            ], 500);
        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Trigger manual check reminders (untuk development/testing)
     * POST /api/lpj/check-reminders
     */
    public function checkReminders()
    {
        try {
            // Check apakah user adalah admin
            $userRole = $_SESSION['user']['role'] ?? null;
            if ($userRole !== 'Admin') {
                return Response::json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 403);
            }

            $results = $this->lpjService->checkAndSendReminders();

            return Response::json([
                'success' => true,
                'message' => 'Reminder check completed',
                'data' => $results
            ]);
        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Terjadi kesalahan: ' . $e->getMessage()
            ], 500);
        }
    }
}