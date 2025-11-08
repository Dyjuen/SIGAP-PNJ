<?php

namespace App\Controllers\Api;

use App\Core\Controller;
use App\Core\Response;
use App\Models\PencairanDana;
use App\Models\Kegiatan;
use App\Models\Notifikasi;
use App\Validators\PencairanValidator;
use PDO;

class PencairanController extends Controller
{
    private $pencairanModel;
    private $kegiatanModel;
    private $notifikasiModel;

    public function __construct()
    {
        parent::__construct();
        $this->pencairanModel = new PencairanDana();
        $this->kegiatanModel = new Kegiatan();
        $this->notifikasiModel = new Notifikasi();
    }

    /**
     * GET /api/pencairan/kegiatan/{kegiatan_id}
     * List semua pencairan untuk kegiatan tertentu
     */
    public function index()
    {
        try {
            $kegiatanId = (int) $this->getParam('kegiatan_id');
            
            // Cek akses user
            if (!$this->canAccessKegiatan($kegiatanId)) {
                return Response::json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses ke kegiatan ini'
                ], 403);
            }

            $pencairan = $this->pencairanModel->getByKegiatanId($kegiatanId);
            $sisaDana = $this->pencairanModel->getSisaDana($kegiatanId);

            return Response::json([
                'success' => true,
                'message' => 'Data pencairan berhasil diambil',
                'data' => [
                    'pencairan' => $pencairan,
                    'ringkasan' => $sisaDana
                ]
            ]);

        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Gagal mengambil data pencairan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET /api/pencairan/sisa-dana/{kegiatan_id}
     * Cek sisa dana yang belum dicairkan
     */
    public function getSisaDana()
    {
        try {
            $kegiatanId = (int) $this->getParam('kegiatan_id');
            
            if (!$this->canAccessKegiatan($kegiatanId)) {
                return Response::json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses ke kegiatan ini'
                ], 403);
            }

            $sisaDana = $this->pencairanModel->getSisaDana($kegiatanId);

            return Response::json([
                'success' => true,
                'data' => $sisaDana
            ]);

        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Gagal mengambil data sisa dana: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST /api/pencairan
     * Pengusul mengajukan pencairan
     */
    public function create()
    {
        try {
            $input = $this->getInput();
            
            // Validasi input
            $validation = PencairanValidator::validateCreate($input);
            if (!$validation['valid']) {
                return Response::json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validation['errors']
                ], 422);
            }

            $kegiatanId = (int) $input['kegiatan_id'];
            $nominalPencairan = (float) $input['nominal_pencairan'];

            // Cek apakah user adalah pengusul kegiatan ini
            if (!$this->isPengusul($kegiatanId)) {
                return Response::json([
                    'success' => false,
                    'message' => 'Hanya pengusul yang dapat mengajukan pencairan'
                ], 403);
            }

            // Cek apakah Bendahara-Cair sudah Aktif
            $approvalBendahara = $this->getApprovalBendaharaCair($kegiatanId);
            if (!$approvalBendahara || $approvalBendahara['status'] !== 'Aktif') {
                return Response::json([
                    'success' => false,
                    'message' => 'Pencairan belum dapat dilakukan. Menunggu persetujuan Bendahara-Cair.'
                ], 400);
            }

            // Cek sisa dana
            $sisaDana = $this->pencairanModel->getSisaDana($kegiatanId);
            if ($nominalPencairan > $sisaDana['sisa_dana']) {
                return Response::json([
                    'success' => false,
                    'message' => 'Nominal pencairan melebihi sisa dana yang tersedia',
                    'data' => [
                        'sisa_dana' => $sisaDana['sisa_dana'],
                        'nominal_diajukan' => $nominalPencairan
                    ]
                ], 400);
            }

            // Create pencairan
            $pencairanId = $this->pencairanModel->createPencairan([
                'kegiatan_id' => $kegiatanId,
                'approval_kegiatan_id' => $approvalBendahara['approval_kegiatan_id'],
                'nominal_pencairan' => $nominalPencairan,
                'keterangan' => $input['keterangan'],
                'created_by' => $this->user['user_id']
            ]);

            // Kirim notifikasi ke bendahara
            $this->sendNotifikasiPengajuan($kegiatanId, $approvalBendahara['approver_user_id'], $nominalPencairan);

            return Response::json([
                'success' => true,
                'message' => 'Pengajuan pencairan berhasil diajukan',
                'data' => [
                    'pencairan_id' => $pencairanId
                ]
            ], 201);

        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Gagal mengajukan pencairan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /api/pencairan/{id}/approve
     * Bendahara menyetujui pencairan
     */
    public function approve()
    {
        try {
            $pencairanId = (int) $this->getParam('id');
            $input = $this->getInput();
            
            // Validasi input
            $validation = PencairanValidator::validateApproval($input);
            if (!$validation['valid']) {
                return Response::json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validation['errors']
                ], 422);
            }

            // Get detail pencairan
            $pencairan = $this->pencairanModel->getDetailById($pencairanId);
            if (!$pencairan) {
                return Response::json([
                    'success' => false,
                    'message' => 'Pencairan tidak ditemukan'
                ], 404);
            }

            // Cek apakah user adalah bendahara
            if (!$this->isBendahara()) {
                return Response::json([
                    'success' => false,
                    'message' => 'Hanya bendahara yang dapat menyetujui pencairan'
                ], 403);
            }

            // Cek apakah status masih Diajukan
            if ($pencairan['status'] !== 'Diajukan') {
                return Response::json([
                    'success' => false,
                    'message' => 'Pencairan ini sudah diproses sebelumnya'
                ], 400);
            }

            // Approve pencairan
            $this->pencairanModel->approvePencairan(
                $pencairanId, 
                $this->user['user_id'],
                $input['catatan_bendahara'] ?? null
            );

            // Update dana_dicairkan di t_kegiatan
            $this->pencairanModel->updateDanaDicairkan($pencairan['kegiatan_id']);

            // Kirim notifikasi ke pengusul
            $this->sendNotifikasiApproval($pencairan['kegiatan_id'], $pencairan['created_by'], $pencairan['nominal_pencairan'], true);

            // Cek apakah semua dana sudah dicairkan
            if ($this->pencairanModel->isSemuaDanaDicairkan($pencairan['kegiatan_id'])) {
                // Update tgl_batas_lpj (14 hari dari sekarang)
                $this->pencairanModel->updateTglBatasLpj($pencairan['kegiatan_id']);
                
                // Kirim notifikasi timer LPJ dimulai
                $this->sendNotifikasiTimerLpj($pencairan['kegiatan_id'], $pencairan['created_by']);
            }

            return Response::json([
                'success' => true,
                'message' => 'Pencairan berhasil disetujui'
            ]);

        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Gagal menyetujui pencairan: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT /api/pencairan/{id}/reject
     * Bendahara menolak pencairan
     */
    public function reject()
    {
        try {
            $pencairanId = (int) $this->getParam('id');
            $input = $this->getInput();
            
            // Validasi input
            $validation = PencairanValidator::validateReject($input);
            if (!$validation['valid']) {
                return Response::json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $validation['errors']
                ], 422);
            }

            // Get detail pencairan
            $pencairan = $this->pencairanModel->getDetailById($pencairanId);
            if (!$pencairan) {
                return Response::json([
                    'success' => false,
                    'message' => 'Pencairan tidak ditemukan'
                ], 404);
            }

            // Cek apakah user adalah bendahara
            if (!$this->isBendahara()) {
                return Response::json([
                    'success' => false,
                    'message' => 'Hanya bendahara yang dapat menolak pencairan'
                ], 403);
            }

            // Cek apakah status masih Diajukan
            if ($pencairan['status'] !== 'Diajukan') {
                return Response::json([
                    'success' => false,
                    'message' => 'Pencairan ini sudah diproses sebelumnya'
                ], 400);
            }

            // Reject pencairan
            $this->pencairanModel->rejectPencairan(
                $pencairanId, 
                $this->user['user_id'],
                $input['catatan_bendahara']
            );

            // Kirim notifikasi ke pengusul
            $this->sendNotifikasiApproval($pencairan['kegiatan_id'], $pencairan['created_by'], $pencairan['nominal_pencairan'], false);

            return Response::json([
                'success' => true,
                'message' => 'Pencairan berhasil ditolak'
            ]);

        } catch (\Exception $e) {
            return Response::json([
                'success' => false,
                'message' => 'Gagal menolak pencairan: ' . $e->getMessage()
            ], 500);
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    private function canAccessKegiatan(int $kegiatanId): bool
    {
        // User bisa akses jika:
        // 1. Pengusul kegiatan
        // 2. Bendahara
        // 3. Admin
        
        if ($this->isBendahara() || $this->isAdmin()) {
            return true;
        }

        return $this->isPengusul($kegiatanId);
    }

    private function isPengusul(int $kegiatanId): bool
    {
        $sql = "SELECT k.kegiatan_id 
                FROM t_kegiatan k
                INNER JOIN t_telaah t ON k.telaah_id = t.telaah_id
                WHERE k.kegiatan_id = :kegiatan_id 
                AND t.created_by = :user_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'kegiatan_id' => $kegiatanId,
            'user_id' => $this->user['user_id']
        ]);
        
        return $stmt->fetch(PDO::FETCH_ASSOC) !== false;
    }

    private function isBendahara(): bool
    {
        return in_array('Bendahara', $this->user['roles'] ?? []);
    }

    private function isAdmin(): bool
    {
        return in_array('Admin', $this->user['roles'] ?? []);
    }

    private function getApprovalBendaharaCair(int $kegiatanId): ?array
    {
        $sql = "SELECT * FROM t_kegiatan_approval
                WHERE kegiatan_id = :kegiatan_id
                AND approval_level = 'Bendahara-Cair'
                LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $result ?: null;
    }

    private function sendNotifikasiPengajuan(int $kegiatanId, int $bendaharaUserId, float $nominal): void
    {
        $this->notifikasiModel->create([
            'user_id' => $bendaharaUserId,
            'judul' => 'Pengajuan Pencairan Dana Baru',
            'pesan' => "Ada pengajuan pencairan dana sebesar Rp " . number_format($nominal, 0, ',', '.') . " yang menunggu persetujuan Anda.",
            'link' => "/pencairan/kegiatan/{$kegiatanId}",
            'is_read' => 0
        ]);
    }

    private function sendNotifikasiApproval(int $kegiatanId, int $pengusulUserId, float $nominal, bool $isApproved): void
    {
        $status = $isApproved ? 'disetujui' : 'ditolak';
        
        $this->notifikasiModel->create([
            'user_id' => $pengusulUserId,
            'judul' => 'Status Pencairan Dana',
            'pesan' => "Pencairan dana sebesar Rp " . number_format($nominal, 0, ',', '.') . " telah {$status}.",
            'link' => "/pencairan/kegiatan/{$kegiatanId}",
            'is_read' => 0
        ]);
    }

    private function sendNotifikasiTimerLpj(int $kegiatanId, int $pengusulUserId): void
    {
        $this->notifikasiModel->create([
            'user_id' => $pengusulUserId,
            'judul' => 'Timer LPJ Dimulai',
            'pesan' => "Semua dana telah dicairkan. Anda memiliki waktu 14 hari untuk mengirimkan Laporan Pertanggungjawaban (LPJ).",
            'link' => "/lpj/{$kegiatanId}",
            'is_read' => 0
        ]);
    }
}