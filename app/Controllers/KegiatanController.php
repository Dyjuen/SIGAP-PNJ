<?php

namespace App\Controllers\Api;

use App\Core\Response;
use App\Models\Kegiatan;
use App\Models\KegiatanAnggaran;
use App\Models\KegiatanLampiran;
use App\Models\KegiatanLogStatus;
use App\Models\Notifikasi;
use App\Validators\KegiatanValidator;
use App\Validators\AnggaranValidator;
use App\Core\FileUpload;
use App\Middlewares\AuthMiddleware;
use App\Services\LpjTimerService;

class KegiatanController
{
    private $kegiatanModel;
    private $anggaranModel;
    private $lampiranModel;
    private $logStatusModel;
    private $notifikasiModel;
    private $userData;

    public function __construct()
    {
        $this->kegiatanModel = new Kegiatan();
        $this->anggaranModel = new KegiatanAnggaran();
        $this->lampiranModel = new KegiatanLampiran();
        $this->logStatusModel = new KegiatanLogStatus();
        $this->notifikasiModel = new Notifikasi();
        
        // Get authenticated user data
        $this->userData = AuthMiddleware::getAuthUser();
    }

    /**
     * Get all kegiatan with filters
     * 
     * GET /api/kegiatan?status=1&unit_kerja=1&search=workshop&page=1&per_page=10
     */
    public function index()
    {
        try {
            // Get query parameters
            $status = $_GET['status'] ?? null;
            $unitKerja = $_GET['unit_kerja'] ?? null;
            $search = $_GET['search'] ?? null;
            $tanggalMulai = $_GET['tanggal_mulai'] ?? null;
            $tanggalSelesai = $_GET['tanggal_selesai'] ?? null;
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $perPage = isset($_GET['per_page']) ? (int)$_GET['per_page'] : 10;

            // Authorization: Pengusul hanya bisa lihat kegiatan sendiri
            $userId = null;
            if ($this->hasRole('Pengusul') && !$this->hasRole('Admin')) {
                $userId = $this->userData['user_id'];
            }

            // Get kegiatan with filters
            $kegiatan = $this->kegiatanModel->getAllWithFilters([
                'status_id' => $status,
                'unit_kerja_id' => $unitKerja,
                'search' => $search,
                'tanggal_mulai' => $tanggalMulai,
                'tanggal_selesai' => $tanggalSelesai,
                'user_id' => $userId,
                'page' => $page,
                'per_page' => $perPage
            ]);

            Response::success($kegiatan, 'Data kegiatan berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil data kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get kegiatan detail
     * 
     * GET /api/kegiatan/{id}
     */
    public function show()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Get kegiatan detail
            $kegiatan = $this->kegiatanModel->getKegiatanForPDF($kegiatanId);

            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization: Pengusul hanya bisa lihat kegiatan sendiri
            if ($this->hasRole('Pengusul') && !$this->hasRole('Admin')) {
                if ($kegiatan['pengusul_user_id'] != $this->userData['user_id']) {
                    Response::forbidden('Anda tidak memiliki akses ke kegiatan ini.');
                }
            }

            Response::success($kegiatan, 'Detail kegiatan berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil detail kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Create new kegiatan
     * 
     * POST /api/kegiatan
     */
    public function create()
    {
        try {
            // Get JSON input
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate input
            $validator = new KegiatanValidator();
            if (!$validator->validateCreate($data)) {
                Response::validationError($validator->getErrors(), 'Validasi gagal.');
            }

            // Set pengusul user ID
            $data['pengusul_user_id'] = $this->userData['user_id'];
            $data['status_id'] = 1; // Draft

            // Create kegiatan
            $kegiatanId = $this->kegiatanModel->create($data);

            // Log status
            $this->logStatusModel->create([
                'kegiatan_id' => $kegiatanId,
                'status_id_lama' => null,
                'status_id_baru' => 1,
                'actor_user_id' => $this->userData['user_id'],
                'catatan' => 'Kegiatan dibuat'
            ]);

            // Get created kegiatan
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);

            Response::created($kegiatan, 'Kegiatan berhasil dibuat.');

        } catch (\Exception $e) {
            Response::error('Gagal membuat kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update kegiatan
     * 
     * PUT /api/kegiatan/{id}
     */
    public function update()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization: Only owner can edit
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk mengedit kegiatan ini.');
            }

            // Cannot edit if not Draft or Revisi
            if (!in_array($kegiatan['status_id'], [1, 5])) { // 1=Draft, 5=Revisi
                Response::error('Kegiatan hanya bisa diedit jika berstatus Draft atau Revisi.', 400);
            }

            // Get JSON input
            $data = json_decode(file_get_contents('php://input'), true);

            // Validate input
            $validator = new KegiatanValidator();
            if (!$validator->validateUpdate($data)) {
                Response::validationError($validator->getErrors(), 'Validasi gagal.');
            }

            // Update kegiatan
            $this->kegiatanModel->update($kegiatanId, $data);

            // Get updated kegiatan
            $updatedKegiatan = $this->kegiatanModel->findById($kegiatanId);

            Response::success($updatedKegiatan, 'Kegiatan berhasil diupdate.');

        } catch (\Exception $e) {
            Response::error('Gagal update kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Delete kegiatan (Draft only)
     * 
     * DELETE /api/kegiatan/{id}
     */
    public function delete()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization: Only owner can delete
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk menghapus kegiatan ini.');
            }

            // Only Draft can be deleted
            if ($kegiatan['status_id'] != 1) {
                Response::error('Hanya kegiatan berstatus Draft yang bisa dihapus.', 400);
            }

            // Delete kegiatan (cascade akan hapus anggaran & lampiran)
            $this->kegiatanModel->delete($kegiatanId);

            Response::success(null, 'Kegiatan berhasil dihapus.');

        } catch (\Exception $e) {
            Response::error('Gagal menghapus kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Submit kegiatan for review
     * 
     * POST /api/kegiatan/{id}/submit
     */
    public function submit()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)\/submit$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization
            if ($kegiatan['pengusul_user_id'] != $this->userData['user_id'] && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk submit kegiatan ini.');
            }

            // Check if status is Draft or Revisi
            if (!in_array($kegiatan['status_id'], [1, 5])) {
                Response::error('Hanya kegiatan berstatus Draft atau Revisi yang bisa disubmit.', 400);
            }

            // Check if has anggaran items
            $anggaran = $this->anggaranModel->getByKegiatanId($kegiatanId);
            if (empty($anggaran)) {
                Response::error('Kegiatan harus memiliki minimal 1 item anggaran sebelum disubmit.', 400);
            }

            // Update status to Dalam Review
            $oldStatus = $kegiatan['status_id'];
            $this->kegiatanModel->updateStatus($kegiatanId, 2); // 2 = Dalam Review

            // Log status change
            $this->logStatusModel->create([
                'kegiatan_id' => $kegiatanId,
                'status_id_lama' => $oldStatus,
                'status_id_baru' => 2,
                'actor_user_id' => $this->userData['user_id'],
                'catatan' => 'Kegiatan disubmit untuk review'
            ]);

            Response::success(null, 'Kegiatan berhasil disubmit untuk review.');

        } catch (\Exception $e) {
            Response::error('Gagal submit kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Revise kegiatan (by approver)
     * 
     * POST /api/kegiatan/{id}/revise
     */
    public function revise()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)\/revise$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Get JSON input
            $data = json_decode(file_get_contents('php://input'), true);
            $catatan = $data['catatan'] ?? null;

            if (!$catatan) {
                Response::error('Catatan revisi harus diisi.', 400);
            }

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization: Only approvers can revise
            if (!in_array('Verifikator', $this->userData['roles'] ?? []) && 
                !in_array('PPK', $this->userData['roles'] ?? []) &&
                !in_array('Admin', $this->userData['roles'] ?? [])) {
                Response::forbidden('Anda tidak memiliki akses untuk revisi kegiatan.');
            }

            // Update status to Revisi
            $oldStatus = $kegiatan['status_id'];
            $this->kegiatanModel->updateStatus($kegiatanId, 5); // 5 = Revisi

            // Log status change
            $this->logStatusModel->create([
                'kegiatan_id' => $kegiatanId,
                'status_id_lama' => $oldStatus,
                'status_id_baru' => 5,
                'actor_user_id' => $this->userData['user_id'],
                'catatan' => $catatan
            ]);

            // Send notification to pengusul
            $this->notifikasiModel->create([
                'penerima_user_id' => $kegiatan['pengusul_user_id'],
                'pesan' => "Kegiatan \"{$kegiatan['nama_kegiatan']}\" perlu direvisi. Catatan: {$catatan}",
                'link_tujuan' => '/pengusul/kegiatan/' . $kegiatanId,
                'is_read' => false
            ]);

            Response::success(null, 'Kegiatan berhasil dikembalikan untuk revisi.');

        } catch (\Exception $e) {
            Response::error('Gagal revisi kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Approve kegiatan
     * INTEGRATED WITH LPJ TIMER SERVICE
     * 
     * POST /api/kegiatan/{id}/approve
     */
    public function approve()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)\/approve$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Get JSON input
            $data = json_decode(file_get_contents('php://input'), true);
            $approvalLevel = $data['approval_level'] ?? null;
            $status = $data['status'] ?? 'Disetujui';
            $catatan = $data['catatan'] ?? null;

            // Check if kegiatan exists
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Authorization check based on approval level
            $allowedRoles = [
                'Verifikator' => ['Verifikator', 'Admin'],
                'PPK' => ['PPK', 'Admin'],
                'Bendahara-Cair' => ['Bendahara', 'Admin']
            ];

            if (!isset($allowedRoles[$approvalLevel])) {
                Response::error('Approval level tidak valid.', 400);
            }

            $hasPermission = false;
            foreach ($allowedRoles[$approvalLevel] as $role) {
                if ($this->hasRole($role)) {
                    $hasPermission = true;
                    break;
                }
            }

            if (!$hasPermission) {
                Response::forbidden('Anda tidak memiliki akses untuk approval level ini.');
            }

            // Update approval status
            $this->kegiatanModel->updateApproval($kegiatanId, [
                'approval_level' => $approvalLevel,
                'approver_user_id' => $this->userData['user_id'],
                'status' => $status,
                'catatan' => $catatan
            ]);

            // Log status change
            $this->logStatusModel->create([
                'kegiatan_id' => $kegiatanId,
                'status_id_lama' => $kegiatan['status_id'],
                'status_id_baru' => $kegiatan['status_id'],
                'actor_user_id' => $this->userData['user_id'],
                'catatan' => "Approval {$approvalLevel}: {$status}" . ($catatan ? " - {$catatan}" : "")
            ]);

            // ==========================================
            // INTEGRATION POINT: START LPJ TIMER
            // ==========================================
            // Jika approval level adalah 'Bendahara-Cair' dan status 'Disetujui'
            // Maka mulai timer LPJ 14 hari
            if ($approvalLevel === 'Bendahara-Cair' && $status === 'Disetujui') {
                try {
                    $lpjService = new LpjTimerService();
                    $timerStarted = $lpjService->startLpjTimer($kegiatanId);
                    
                    if ($timerStarted) {
                        // Log bahwa timer sudah dimulai
                        error_log("LPJ Timer started for kegiatan ID: {$kegiatanId}");
                        
                        // Kirim notifikasi ke pengusul
                        $this->notifikasiModel->create([
                            'penerima_user_id' => $kegiatan['pengusul_user_id'],
                            'pesan' => "Pencairan dana untuk kegiatan \"{$kegiatan['nama_kegiatan']}\" telah disetujui. Anda memiliki 14 hari untuk submit LPJ.",
                            'link_tujuan' => '/pengusul/kegiatan/' . $kegiatanId . '/lpj',
                            'is_read' => false
                        ]);

                        Response::success([
                            'lpj_timer_started' => true,
                            'lpj_deadline_days' => 14
                        ], 'Kegiatan berhasil disetujui. Timer LPJ 14 hari dimulai.');
                    } else {
                        Response::success([
                            'lpj_timer_started' => false
                        ], 'Kegiatan berhasil disetujui, namun gagal memulai timer LPJ.');
                    }
                } catch (\Exception $e) {
                    error_log("Failed to start LPJ timer: " . $e->getMessage());
                    Response::success([
                        'lpj_timer_started' => false,
                        'lpj_error' => $e->getMessage()
                    ], 'Kegiatan berhasil disetujui, namun terjadi error saat memulai timer LPJ.');
                }
            } else {
                Response::success(null, 'Approval berhasil disimpan.');
            }

        } catch (\Exception $e) {
            Response::error('Gagal approve kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Duplicate kegiatan
     * 
     * POST /api/kegiatan/{id}/duplicate
     */
    public function duplicate()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)\/duplicate$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Get original kegiatan
            $original = $this->kegiatanModel->getKegiatanForPDF($kegiatanId);
            if (!$original) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // Create new kegiatan
            $newData = [
                'nama_kegiatan' => $original['nama_kegiatan'] . ' (Copy)',
                'deskripsi_kegiatan' => $original['deskripsi_kegiatan'],
                'iku_id' => $original['iku_id'],
                'tanggal_mulai' => $original['tanggal_mulai'],
                'tanggal_selesai' => $original['tanggal_selesai'],
                'lokasi' => $original['lokasi'],
                'total_anggaran_diusulkan' => $original['total_anggaran_diusulkan'],
                'pengusul_user_id' => $this->userData['user_id'],
                'unit_kerja_id' => $original['unit_kerja_id'],
                'mata_anggaran_id' => $original['mata_anggaran_id'],
                'status_id' => 1 // Draft
            ];

            $newKegiatanId = $this->kegiatanModel->create($newData);

            // Copy anggaran items
            foreach ($original['anggaran_items'] as $item) {
                $this->anggaranModel->create([
                    'kegiatan_id' => $newKegiatanId,
                    'uraian' => $item['uraian'],
                    'volume' => $item['volume'],
                    'satuan_id' => $item['satuan_id'],
                    'harga_satuan' => $item['harga_satuan'],
                    'jumlah_diusulkan' => $item['jumlah_diusulkan'],
                    'catatan' => $item['catatan']
                ]);
            }

            // Get duplicated kegiatan
            $newKegiatan = $this->kegiatanModel->findById($newKegiatanId);

            Response::created($newKegiatan, 'Kegiatan berhasil diduplikasi.');

        } catch (\Exception $e) {
            Response::error('Gagal duplikasi kegiatan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get status history
     * 
     * GET /api/kegiatan/{id}/logs
     */
    public function logs()
    {
        try {
            // Get kegiatan_id from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)\/logs$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            // Get logs
            $logs = $this->logStatusModel->getByKegiatanId($kegiatanId);

            Response::success($logs, 'Log status berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil log status: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get statistics
     * 
     * GET /api/kegiatan/statistics/dashboard
     */
    public function statistics()
    {
        try {
            // Authorization: Admin, Verifikator, PPK, Bendahara
            if ($this->hasRole('Pengusul') && !$this->hasRole('Admin')) {
                $userId = $this->userData['user_id'];
            } else {
                $userId = null;
            }

            $stats = $this->kegiatanModel->getStatistics($userId);

            Response::success($stats, 'Statistik berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil statistik: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Export to Excel
     * 
     * GET /api/kegiatan/export/excel
     */
    public function exportExcel()
    {
        try {
            // Get filters
            $status = $_GET['status'] ?? null;
            $unitKerja = $_GET['unit_kerja'] ?? null;

            // Authorization: Pengusul hanya export kegiatan sendiri
            $userId = null;
            if ($this->hasRole('Pengusul') && !$this->hasRole('Admin')) {
                $userId = $this->userData['user_id'];
            }

            // Get kegiatan
            $kegiatan = $this->kegiatanModel->getAllForExport([
                'status_id' => $status,
                'unit_kerja_id' => $unitKerja,
                'user_id' => $userId
            ]);

            // Generate Excel
            $this->generateExcel($kegiatan);

        } catch (\Exception $e) {
            Response::error('Gagal export data: ' . $e->getMessage(), 500);
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
     * Helper: Generate Excel file
     */
    private function generateExcel($data)
    {
        // Set headers for Excel download
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="Kegiatan_' . date('YmdHis') . '.xls"');
        header('Cache-Control: max-age=0');

        // Start output
        echo '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">';
        echo '<head><meta charset="UTF-8"></head><body>';
        echo '<table border="1">';
        echo '<thead>';
        echo '<tr>';
        echo '<th>No</th>';
        echo '<th>Nama Kegiatan</th>';
        echo '<th>Tanggal Mulai</th>';
        echo '<th>Tanggal Selesai</th>';
        echo '<th>Lokasi</th>';
        echo '<th>Unit Kerja</th>';
        echo '<th>Pengusul</th>';
        echo '<th>Status</th>';
        echo '<th>Total Anggaran Diusulkan</th>';
        echo '<th>Total Anggaran Disetujui</th>';
        echo '</tr>';
        echo '</thead>';
        echo '<tbody>';

        $no = 1;
        foreach ($data as $row) {
            echo '<tr>';
            echo '<td>' . $no++ . '</td>';
            echo '<td>' . htmlspecialchars($row['nama_kegiatan']) . '</td>';
            echo '<td>' . $row['tanggal_mulai'] . '</td>';
            echo '<td>' . $row['tanggal_selesai'] . '</td>';
            echo '<td>' . htmlspecialchars($row['lokasi']) . '</td>';
            echo '<td>' . htmlspecialchars($row['nama_unit_kerja']) . '</td>';
            echo '<td>' . htmlspecialchars($row['pengusul_nama']) . '</td>';
            echo '<td>' . htmlspecialchars($row['nama_status']) . '</td>';
            echo '<td>' . number_format($row['total_anggaran_diusulkan'], 0, ',', '.') . '</td>';
            echo '<td>' . ($row['total_anggaran_disetujui'] ? number_format($row['total_anggaran_disetujui'], 0, ',', '.') : '-') . '</td>';
            echo '</tr>';
        }

        echo '</tbody>';
        echo '</table>';
        echo '</body></html>';
        exit;
    }
}