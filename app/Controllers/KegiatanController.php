<?php

namespace App\Controllers;

use App\Core\Response;
use App\Models\Kegiatan;
use App\Models\KegiatanAnggaran;
use App\Models\KegiatanLampiran;
use App\Models\KegiatanLogStatus;
use App\Models\Notifikasi;
use App\Models\Role;
use App\Models\User;
use App\Validators\KegiatanValidator;
use App\Validators\AnggaranValidator;
use App\Core\FileUpload;
use App\Middlewares\AuthMiddleware;
use App\Models\Telaah;
use App\Services\LpjTimerService;

class KegiatanController
{
    private $kegiatanModel;
    private $anggaranModel;
    private $lampiranModel;
    private $logStatusModel;
    private $notifikasiModel;
    private $telaahModel;
    private $userModel;
    private $roleModel;
    private $userData;

    public function __construct()
    {
        $this->kegiatanModel = new Kegiatan();
        $this->anggaranModel = new KegiatanAnggaran();
        $this->lampiranModel = new KegiatanLampiran();
        $this->logStatusModel = new KegiatanLogStatus();
        $this->notifikasiModel = new Notifikasi();
        $this->telaahModel = new Telaah();
        $this->userModel = new User();
        $this->roleModel = new Role();
        
        // Get authenticated user data
        $this->userData = AuthMiddleware::getAuthUser();
    }

    /**
     * Get all kegiatan with filters
     * 
     * GET /api/kegiatan?status=1&search=workshop&page=1&per_page=10
     */
    public function index()
    {
        try {
            // Get query parameters for filtering, searching, and pagination
            $filters = [
                'status_id' => $_GET['status'] ?? null,
                'search' => $_GET['search'] ?? null,
                'tanggal_mulai' => $_GET['tanggal_mulai'] ?? null,
                'tanggal_selesai' => $_GET['tanggal_selesai'] ?? null,
                'unit_pengusul' => $_GET['unit_pengusul'] ?? null,
                'kategori_kegiatan' => $_GET['kategori_kegiatan'] ?? null,
                'kode_kegiatan' => $_GET['kode_kegiatan'] ?? null,
                'page' => isset($_GET['page']) ? (int)$_GET['page'] : 1,
                'per_page' => isset($_GET['per_page']) ? (int)$_GET['per_page'] : 10
            ];

            // Authorization: Pengusul can only see their own activities.
            // Admin and other high-level roles can see all, but can filter by 'unit_pengusul'.
            if ($this->hasRole('Pengusul') && !$this->hasRole('Admin')) {
                $filters['user_id'] = $this->userData['user_id'];
            }

            // Get kegiatan with filters
            $result = $this->kegiatanModel->getAllWithFilters($filters);

            Response::success($result, 'Data kegiatan berhasil diambil.');

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
     * Create new kegiatan from an approved telaah, including surat pengantar upload.
     * 
     * POST /api/kegiatan
     * Expects multipart/form-data with 'telaah_id' and 'surat_pengantar' file.
     */
    public function create()
    {
        $db = $this->kegiatanModel->getDb();
        $uploader = null;
        $uploadResult = null;

        try {
            // This endpoint now expects multipart/form-data
            $telaahId = $_POST['telaah_id'] ?? null;
            $suratPengantarFile = $_FILES['surat_pengantar'] ?? null;

            // --- 1. Basic Validation ---
            if (!$telaahId) {
                Response::error('telaah_id harus diisi.', 400);
            }
            if (!$suratPengantarFile || $suratPengantarFile['error'] !== UPLOAD_ERR_OK) {
                Response::error('File surat_pengantar harus diupload.', 400);
            }

            // --- 2. Find and Validate Telaah ---
            $telaah = $this->telaahModel->find($telaahId);
            if (!$telaah) {
                Response::notFound('Telaah tidak ditemukan.');
            }
            if ($telaah['status_id'] != 3) { // 3 = Disetujui Verifikator
                Response::error('Hanya telaah yang sudah disetujui verifikator yang bisa dijadikan kegiatan.', 400);
            }
            
            // --- 3. Check for Existing Kegiatan ---
            $existingKegiatan = $this->kegiatanModel->findBy('telaah_id', $telaahId);
            if ($existingKegiatan) {
                Response::error('Kegiatan untuk telaah ini sudah ada.', 409); // 409 Conflict
            }

            // --- 4. Upload Surat Pengantar ---
            $uploader = new FileUpload(
                '/storage/uploads/documents/', // Path to save the file
                ['pdf', 'doc', 'docx'],      // Allowed extensions
                5242880                       // Max size 5MB
            );
            $uploadResult = $uploader->upload($suratPengantarFile);

            if (!$uploadResult['success']) {
                Response::error('Gagal mengupload surat pengantar: ' . $uploadResult['message'], 400);
            }

            $db->beginTransaction();

            // --- 5. Create New Kegiatan with Surat Pengantar Path ---
            $kegiatanData = [
                'telaah_id' => $telaahId,
                'surat_pengantar_path' => $uploadResult['file_path'], // Save the file path
                'tanggal_mulai_final' => $telaah['tanggal_mulai'],
                'penanggung_jawab_manual' => 'Ditentukan kemudian',
                'pelaksana_manual' => 'Ditentukan kemudian'
            ];
            $kegiatanId = $this->kegiatanModel->create($kegiatanData);

            // --- 6. Create Initial Approval Flow ---
            $approvalLevels = ['PPK', 'Wadir', 'Bendahara-Cair', 'Bendahara-LPJ'];
            foreach ($approvalLevels as $level) {
                $this->kegiatanModel->updateApproval($kegiatanId, [
                    'approval_level' => $level,
                    'approver_user_id' => null,
                    'status' => $level === 'PPK' ? 'Aktif' : 'Menunggu', // PPK is the first active step
                    'catatan' => null
                ]);
            }
            
            // --- 7. Update Telaah Status ---
            $this->telaahModel->update($telaahId, ['status_id' => 6]); // 6 = Proses Pencairan

            $db->commit();

            // Notify PPK
            $role = $this->roleModel->findByName('PPK');
            if ($role) {
                $ppkUsers = $this->userModel->findByRoleId($role['role_id']);
                $kegiatan = $this->kegiatanModel->findById($kegiatanId);
                foreach ($ppkUsers as $ppk) {
                    $this->notifikasiModel->create([
                        'penerima_user_id' => $ppk['user_id'],
                        'pesan' => "Kegiatan baru \"{$kegiatan['nama_kegiatan']}\" telah dibuat dan menunggu persetujuan Anda.",
                        'link_tujuan' => '/verifikator/kegiatan/' . $kegiatanId,
                    ]);
                }
            }

            Response::created([
                'kegiatan_id' => $kegiatanId,
                'surat_pengantar_path' => $uploadResult['file_path']
            ], 'Kegiatan berhasil dibuat dan alur persetujuan dimulai.');

        } catch (\Exception $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            // If something goes wrong after upload, delete the orphaned file
            if (isset($uploadResult) && $uploadResult['success']) {
                $uploader->delete($uploadResult['file_path']);
            }
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
        $db = $this->kegiatanModel->getDb();
        try {
            $db->beginTransaction();

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

            $db->commit();
            Response::success(null, 'Kegiatan berhasil disubmit untuk review.');

        } catch (\Exception $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
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
        $db = $this->kegiatanModel->getDb();
        try {
            $db->beginTransaction();

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

            $db->commit();
            Response::success(null, 'Kegiatan berhasil dikembalikan untuk revisi.');

        } catch (\Exception $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
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
        // Get the database connection and start a transaction
        $db = $this->kegiatanModel->getDb();
        try {
            $db->beginTransaction();

            // 1. Get Input and Find Kegiatan
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)\/approve$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            $data = json_decode(file_get_contents('php://input'), true);
            $status = $data['status'] ?? null; // 'Disetujui' or 'Revisi'
            $catatan = $data['catatan'] ?? null;

            if (!in_array($status, ['Disetujui', 'Revisi'])) {
                Response::error("Status harus 'Disetujui' atau 'Revisi'.", 400);
            }
            if ($status === 'Revisi' && empty($catatan)) {
                Response::error('Catatan revisi harus diisi.', 400);
            }

            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }

            // 2. Find the Current Active Approval Step
            $currentApproval = $this->kegiatanModel->findCurrentApproval($kegiatanId);
            if (!$currentApproval) {
                Response::error('Tidak ada alur persetujuan yang aktif untuk kegiatan ini.', 400);
            }

            // 3. Authorization Check
            $approvalLevel = $currentApproval['approval_level'];
            $allowedRoles = [
                'PPK' => ['PPK', 'Admin'],
                'Wadir' => ['Wadir', 'Admin'],
                'Bendahara-Cair' => ['Bendahara', 'Admin'],
                'Bendahara-LPJ' => ['Bendahara', 'Admin'],
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
                Response::forbidden("Anda tidak memiliki akses untuk persetujuan level {$approvalLevel}.");
            }

            // 4. Handle Revision
            if ($status === 'Revisi') {
                // Update current approval status
                $this->kegiatanModel->updateApprovalStatus(
                    $currentApproval['approval_kegiatan_id'],
                    'Revisi',
                    $this->userData['user_id'],
                    $catatan
                );

                // Update main kegiatan status to Revisi
                $this->kegiatanModel->updateStatus($kegiatanId, 5); // 5 = Revisi

                // Log status change
                $this->logStatusModel->create([
                    'telaah_id' => $kegiatan['telaah_id'],
                    'status_id_lama' => $kegiatan['status_id'],
                    'status_id_baru' => 5,
                    'actor_user_id' => $this->userData['user_id'],
                    'catatan' => "Revisi dari {$approvalLevel}: {$catatan}"
                ]);

                // Notify proposer
                $this->notifikasiModel->create([
                    'penerima_user_id' => $kegiatan['pengusul_user_id'],
                    'pesan' => "Kegiatan \"{$kegiatan['nama_kegiatan']}\" perlu direvisi oleh {$approvalLevel}. Catatan: {$catatan}",
                    'link_tujuan' => '/pengusul/kegiatan/' . $kegiatanId,
                ]);

                // Commit the transaction
                $db->commit();
                Response::success(null, 'Kegiatan berhasil dikembalikan untuk revisi.');
                return;
            }

            // 5. Handle Approval
            $this->kegiatanModel->updateApprovalStatus(
                $currentApproval['approval_kegiatan_id'],
                'Disetujui',
                $this->userData['user_id'],
                $catatan
            );

            // Log this specific approval
            $this->logStatusModel->create([
                'telaah_id' => $kegiatan['telaah_id'],
                'status_id_lama' => $kegiatan['status_id'],
                'status_id_baru' => $kegiatan['status_id'], // Status utama belum berubah
                'actor_user_id' => $this->userData['user_id'],
                'catatan' => "Disetujui oleh {$approvalLevel}." . ($catatan ? " Catatan: {$catatan}" : "")
            ]);

            // --- START LPJ TIMER LOGIC ON BENDAHARA-CAIR APPROVAL ---
            $timerStarted = false;
            if ($approvalLevel === 'Bendahara-Cair') {
                // Prerequisite check: Ensure funds have been disbursed before approving.
                if (empty($kegiatan['dana_dicairkan']) || (float)$kegiatan['dana_dicairkan'] <= 0) {
                    Response::error(
                        "Dana harus dicairkan terlebih dahulu sebelum menyetujui. Gunakan endpoint /kegiatan/{$kegiatanId}/cairkan.",
                        422 // Unprocessable Entity
                    );
                }

                // Update main kegiatan status to "Uang Muka Dicairkan"
                $this->kegiatanModel->updateStatus($kegiatanId, 7);
                
                // START LPJ TIMER
                $lpjService = new LpjTimerService();
                $lpjService->startLpjTimer($kegiatanId);
                $timerStarted = true;

                // Notify proposer that funds are ready and LPJ timer has started
                $this->notifikasiModel->create([
                    'penerima_user_id' => $kegiatan['pengusul_user_id'],
                    'pesan' => "Persetujuan oleh Bendahara Cair berhasil untuk kegiatan \"{$kegiatan['nama_kegiatan']}\". Segera submit LPJ sebelum batas waktu.",
                    'link_tujuan' => '/pengusul/kegiatan/' . $kegiatanId . '/lpj',
                ]);
            }
            // --- END OF LPJ TIMER LOGIC ---

            // 6. Activate Next Step or Finalize
            $nextApproval = $this->kegiatanModel->findNextApproval($kegiatanId, $currentApproval['approval_kegiatan_id']);

            if ($nextApproval) {
                $this->kegiatanModel->updateApprovalStatus($nextApproval['approval_kegiatan_id'], 'Aktif');
                
                // Notify next approver
                $nextApproverRoleName = $nextApproval['approval_level'];
                if (in_array($nextApproverRoleName, ['Bendahara-Cair', 'Bendahara-LPJ'])) {
                    $nextApproverRoleName = 'Bendahara';
                }

                $role = $this->roleModel->findByName($nextApproverRoleName);
                if ($role) {
                    $nextApprovers = $this->userModel->findByRoleId($role['role_id']);
                    foreach ($nextApprovers as $approver) {
                        $this->notifikasiModel->create([
                            'penerima_user_id' => $approver['user_id'],
                            'pesan' => "Kegiatan \"{$kegiatan['nama_kegiatan']}\" membutuhkan persetujuan Anda.",
                            'link_tujuan' => '/verifikator/kegiatan/' . $kegiatanId, // Generic link for approvers
                        ]);
                    }
                }

                $db->commit();

                $message = "Disetujui oleh {$approvalLevel}. Menunggu persetujuan {$nextApproval['approval_level']}.";
                if ($timerStarted) {
                    $message = "Disetujui oleh {$approvalLevel}. Status kegiatan menjadi 'Uang Muka Dicairkan' dan timer LPJ dimulai. Menunggu persetujuan {$nextApproval['approval_level']}.";
                }
                Response::success(['lpj_timer_started' => $timerStarted], $message);
            
            } else {
                // This was the final approval step (now should only be Bendahara-LPJ)
                if ($approvalLevel === 'Bendahara-LPJ') {
                    // This is the final LPJ approval
                    $this->kegiatanModel->updateStatus($kegiatanId, 9); // 9 = Selesai
                    
                    // Notify proposer
                     $this->notifikasiModel->create([
                        'penerima_user_id' => $kegiatan['pengusul_user_id'],
                        'pesan' => "LPJ untuk kegiatan \"{$kegiatan['nama_kegiatan']}\" telah disetujui. Kegiatan selesai.",
                        'link_tujuan' => '/pengusul/kegiatan/' . $kegiatanId,
                    ]);

                    // General final approval notification
                    $this->notifikasiModel->create([
                        'penerima_user_id' => $kegiatan['pengusul_user_id'],
                        'pesan' => "Kegiatan Anda \"{$kegiatan['nama_kegiatan']}\" telah sepenuhnya disetujui.",
                        'link_tujuan' => '/pengusul/kegiatan/' . $kegiatanId,
                    ]);

                    $db->commit();
                    Response::success(null, 'LPJ disetujui. Kegiatan telah selesai.');
                } else {
                     // Fallback for other potential final steps
                    $db->commit();
                    Response::success(null, 'Persetujuan akhir berhasil.');
                }
            }

        } catch (\Exception $e) {
            // Rollback the transaction on error
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            Response::error('Gagal memproses persetujuan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Duplicate kegiatan
     * 
     * POST /api/kegiatan/{id}/duplicate
     */
    public function duplicate()
    {
        $db = $this->kegiatanModel->getDb();
        try {
            $db->beginTransaction();

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

            $db->commit();
            Response::created($newKegiatan, 'Kegiatan berhasil diduplikasi.');

        } catch (\Exception $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
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

            // Authorization: Pengusul hanya export kegiatan sendiri
            $userId = null;
            if ($this->hasRole('Pengusul') && !$this->hasRole('Admin')) {
                $userId = $this->userData['user_id'];
            }

            // Get kegiatan
            $kegiatan = $this->kegiatanModel->getAllForExport([
                'status_id' => $status,
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

    /**
     * Records a fund disbursement amount. Can be called multiple times.
     * This action is separate from the approval workflow.
     * 
     * POST /api/kegiatan/{id}/cairkan
     */
    public function cairkanDana()
    {
        $db = $this->kegiatanModel->getDb();
        try {
            // Get ID from URL
            $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            preg_match('/\/kegiatan\/(\d+)\/cairkan$/', $uri, $matches);
            $kegiatanId = $matches[1] ?? null;

            if (!$kegiatanId) {
                Response::error('Kegiatan ID tidak valid.', 400);
            }

            $db->beginTransaction();

            // 1. Authorization: Only Bendahara or Admin
            if (!$this->hasRole('Bendahara') && !$this->hasRole('Admin')) {
                Response::forbidden('Anda tidak memiliki akses untuk melakukan pencairan dana.');
            }

            // 2. Get and Validate Kegiatan
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Data kegiatan tidak ditemukan.');
            }

            // 3. Condition Check: Must be in Bendahara-Cair approval step
            $currentApproval = $this->kegiatanModel->findCurrentApproval($kegiatanId);
            if (!$currentApproval || $currentApproval['approval_level'] !== 'Bendahara-Cair') {
                Response::error('Pencatatan dana hanya bisa dilakukan saat dalam tahap persetujuan Bendahara-Cair.', 400);
            }

            // 4. Get and Validate Input
            $data = json_decode(file_get_contents("php://input"), true);
            $nominalBaru = $data['nominal'] ?? 0;

            if (!is_numeric($nominalBaru) || $nominalBaru <= 0) {
                Response::error('Nominal pencairan harus berupa angka dan lebih dari 0.', 422);
            }

            // 5. Calculate and Update Dana
            $totalSekarang = (float) ($kegiatan['dana_dicairkan'] ?? 0);
            $totalBaru = $totalSekarang + $nominalBaru;

            $updateSql = "UPDATE t_kegiatan SET dana_dicairkan = ? WHERE kegiatan_id = ?";
            $stmt = $db->prepare($updateSql);
            $stmt->execute([$totalBaru, $kegiatanId]);

            $db->commit();

            Response::success([
                "message" => "Dana sebesar Rp " . number_format($nominalBaru, 0, ',', '.') . " berhasil dicatat.",
                "total_dana_dicairkan" => $totalBaru
            ], "Pencatatan dana berhasil.");

        } catch (\Exception $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            Response::error('Gagal memproses pencatatan dana: ' . $e->getMessage(), 500);
        }
    }
}