<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Response;
use App\Models\PencairanDana;
use App\Models\Kegiatan;
use App\Models\Notifikasi;
use App\Validators\PencairanValidator;
use App\Middlewares\AuthMiddleware;
use PDO;

class PencairanController extends Controller
{
    private $pencairanModel;
    private $kegiatanModel;
    private $notifikasiModel;
    private $userData;

    public function __construct()
    {
        // The parent Controller's constructor should handle DB initialization.
        // The models can get the DB connection from the parent controller if needed,
        // or they might establish their own. For now, we trust the models' internal workings.
        parent::__construct(); // It's good practice to call parent constructor
        
        $this->pencairanModel = new PencairanDana();
        $this->kegiatanModel = new Kegiatan();
        $this->notifikasiModel = new Notifikasi();
        $this->userData = AuthMiddleware::getAuthUser();
    }

    /**
     * GET /api/pencairan/kegiatan/{kegiatan_id}
     * List semua pencairan untuk kegiatan tertentu
     */
    public function index($kegiatan_id)
    {
        try {
            $kegiatanId = (int) $kegiatan_id;
            
            if (!$this->canAccessKegiatan($kegiatanId)) {
                Response::forbidden('Anda tidak memiliki akses ke kegiatan ini.');
            }

            $pencairan = $this->pencairanModel->getByKegiatanId($kegiatanId);
            $sisaDana = $this->pencairanModel->getSisaDana($kegiatanId);

            $data = [
                'pencairan' => $pencairan,
                'ringkasan' => $sisaDana
            ];

            Response::success($data, 'Data pencairan berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil data pencairan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * GET /api/pencairan/sisa-dana/{kegiatan_id}
     * Cek sisa dana yang belum dicairkan
     */
    public function getSisaDana($kegiatan_id)
    {
        try {
            $kegiatanId = (int) $kegiatan_id;
            
            if (!$this->canAccessKegiatan($kegiatanId)) {
                Response::forbidden('Anda tidak memiliki akses ke kegiatan ini.');
            }

            $sisaDana = $this->pencairanModel->getSisaDana($kegiatanId);

            Response::success($sisaDana, 'Data sisa dana berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil data sisa dana: ' . $e->getMessage(), 500);
        }
    }

    /**
     * POST /api/kegiatan/{id}/cairkan
     * Bendahara mencatat pencairan dana.
     */
    public function cairkanDana($kegiatanId)
    {
        try {
            $input = $this->getInput();

            // 1. Validasi Input
            $nominal = $input['nominal'] ?? null;

            if (!$kegiatanId || !$nominal || !is_numeric($nominal) || $nominal <= 0) {
                Response::error('Kegiatan ID dan nominal pencairan yang valid harus diisi.', 400);
            }

            // 2. Authorisasi: Hanya Bendahara
            if (!$this->isBendahara() && !$this->isAdmin()) {
                Response::forbidden('Hanya Bendahara yang dapat mencatat pencairan.');
            }

            // 3. Get Kegiatan & Cek Status
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                Response::notFound('Kegiatan tidak ditemukan.');
            }
            
            $currentApproval = $this->kegiatanModel->findCurrentApproval($kegiatanId);
            if (!$currentApproval || $currentApproval['approval_level'] !== 'Bendahara-Cair') {
                Response::error('Pencairan hanya bisa dilakukan saat alur persetujuan berada di level Bendahara-Cair.', 400);
            }
            
            // 4. Cek Sisa Dana
            $sisaDana = (float)($kegiatan['total_anggaran_disetujui'] ?? 0) - (float)($kegiatan['dana_dicairkan'] ?? 0);
            if ($nominal > $sisaDana) {
                Response::error('Nominal pencairan melebihi sisa dana yang tersedia. Sisa: ' . number_format($sisaDana, 0, ',', '.'), 400);
            }

            // 5. Simpan ke t_pencairan_dana
            $this->pencairanModel->create([
                'kegiatan_id' => $kegiatanId,
                'jumlah_dicairkan' => $nominal,
                'created_by' => $this->userData['user_id'],
                'tanggal_pencairan' => date('Y-m-d'),
                'keterangan' => 'Pencairan oleh Bendahara pada ' . date('d-m-Y')
            ]);
            

            Response::success(['kegiatan_id' => $kegiatanId, 'dicairkan' => $nominal], 'Pencairan dana berhasil dicatat.');

        } catch (\Exception $e) {
            Response::error('Gagal mencatat pencairan dana: ' . $e->getMessage(), 500);
        }
    }
    
    /**
     * POST /api/pencairan/pengajuan
     * Pengusul mengajukan pencairan
     */
    public function create()
    {
        try {
            $input = $this->getInput();
            
            $validation = PencairanValidator::validateCreate($input);
            if (!$validation['valid']) {
                Response::validationError($validation['errors'], 'Validasi gagal.');
            }

            $kegiatanId = (int) $input['kegiatan_id'];
            $jumlahDicairkan = (float) $input['jumlah_dicairkan']; // Changed from nominal_pencairan

            if (!$this->isPengusul($kegiatanId)) {
                Response::forbidden('Hanya pengusul yang dapat mengajukan pencairan.');
            }

            $approvalBendahara = $this->getApprovalBendaharaCair($kegiatanId);
            if (!$approvalBendahara || $approvalBendahara['status'] !== 'Aktif') {
                Response::error('Pencairan belum dapat dilakukan. Menunggu persetujuan Bendahara-Cair.', 400);
            }

            $sisaDana = $this->pencairanModel->getSisaDana($kegiatanId);
            if ($jumlahDicairkan > $sisaDana['sisa_dana']) {
                $errorData = [
                    'sisa_dana' => $sisaDana['sisa_dana'],
                    'jumlah_dicairkan' => $jumlahDicairkan // Changed from nominal_diajukan
                ];
                Response::error('Nominal pencairan melebihi sisa dana yang tersedia.', 400, $errorData);
            }

            $pencairanId = $this->pencairanModel->createPencairan([
                'kegiatan_id' => $kegiatanId,
                'approval_kegiatan_id' => $approvalBendahara['approval_kegiatan_id'],
                'jumlah_dicairkan' => $jumlahDicairkan, // Changed from nominal_pencairan
                'keterangan' => $input['keterangan'],
                'created_by' => $this->userData['user_id']
            ]);

            $this->sendNotifikasiPengajuan($kegiatanId, $approvalBendahara['approver_user_id'], $jumlahDicairkan); // Changed from nominalPencairan

            Response::created(['pencairan_id' => $pencairanId], 'Pengajuan pencairan berhasil diajukan.');

        } catch (\Exception $e) {
            Response::error('Gagal mengajukan pencairan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * PUT /api/pencairan/{id}/approve
     * Bendahara menyetujui pencairan
     */
    public function approve($id)
    {
        try {
            $pencairanId = (int) $id;
            $input = $this->getInput();
            
            $validation = PencairanValidator::validateApproval($input);
            if (!$validation['valid']) {
                Response::validationError($validation['errors'], 'Validasi gagal.');
            }

            $pencairan = $this->pencairanModel->getDetailById($pencairanId);
            if (!$pencairan) {
                Response::notFound('Pencairan tidak ditemukan.');
            }

            if (!$this->isBendahara()) {
                Response::forbidden('Hanya bendahara yang dapat menyetujui pencairan.');
            }

            if ($pencairan['status'] !== 'Diajukan') {
                Response::error('Pencairan ini sudah diproses sebelumnya.', 400);
            }

            $this->pencairanModel->approvePencairan(
                $pencairanId, 
                $this->userData['user_id'],
                $input['catatan_bendahara'] ?? null
            );

            // Refactor: No longer updating dana_dicairkan here. It's now calculated on-the-fly.
            // $this->pencairanModel->updateDanaDicairkan($pencairan['kegiatan_id']); 
            
            $this->sendNotifikasiApproval($pencairan['kegiatan_id'], $pencairan['created_by'], $pencairan['jumlah_dicairkan'], true); // Changed from nominal_pencairan

            // These checks are now done by the 'Selesaikan Pencairan' endpoint
            /*
            if ($this->pencairanModel->isSemuaDanaDicairkan($pencairan['kegiatan_id'])) {
                $this->pencairanModel->updateTglBatasLpj($pencairan['kegiatan_id']);
                $this->sendNotifikasiTimerLpj($pencairan['kegiatan_id'], $pencairan['created_by']);
            }
            */

            Response::success(null, 'Pencairan berhasil disetujui.');

        } catch (\Exception $e) {
            Response::error('Gagal menyetujui pencairan: ' . $e->getMessage(), 500);
        }
    }

    /**
     * PUT /api/pencairan/{id}/reject
     * Bendahara menolak pencairan
     */
    public function reject($id)
    {
        try {
            $pencairanId = (int) $id;
            $input = $this->getInput();
            
            $validation = PencairanValidator::validateReject($input);
            if (!$validation['valid']) {
                Response::validationError($validation['errors'], 'Validasi gagal.');
            }

            $pencairan = $this->pencairanModel->getDetailById($pencairanId);
            if (!$pencairan) {
                Response::notFound('Pencairan tidak ditemukan.');
            }

            if (!$this->isBendahara()) {
                Response::forbidden('Hanya bendahara yang dapat menolak pencairan.');
            }

            if ($pencairan['status'] !== 'Diajukan') {
                Response::error('Pencairan ini sudah diproses sebelumnya.', 400);
            }

            $this->pencairanModel->rejectPencairan(
                $pencairanId, 
                $this->userData['user_id'],
                $input['catatan_bendahara']
            );

            $this->sendNotifikasiApproval($pencairan['kegiatan_id'], $pencairan['created_by'], $pencairan['jumlah_dicairkan'], false); // Changed from nominal_pencairan

            Response::success(null, 'Pencairan berhasil ditolak.');

        } catch (\Exception $e) {
            Response::error('Gagal menolak pencairan: ' . $e->getMessage(), 500);
        }
    }

    // ========================================
    // HELPER METHODS
    // ========================================

    private function canAccessKegiatan(int $kegiatanId): bool
    {
        if ($this->isBendahara() || $this->isAdmin()) {
            return true;
        }
        return $this->isPengusul($kegiatanId);
    }

    private function isPengusul(int $kegiatanId): bool
    {
        $kegiatan = $this->kegiatanModel->findById($kegiatanId);
        return $kegiatan && $kegiatan['pengusul_user_id'] == $this->userData['user_id'];
    }

    private function isBendahara(): bool
    {
        return in_array('Bendahara', $this->userData['roles'] ?? []);
    }

    private function isAdmin(): bool
    {
        return in_array('Admin', $this->userData['roles'] ?? []);
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
            'penerima_user_id' => $bendaharaUserId,
            'pesan' => "Ada pengajuan pencairan dana sebesar Rp " . number_format($nominal, 0, ',', '.') . " yang menunggu persetujuan Anda.",
            'link_tujuan' => "/verifikator/kegiatan/{$kegiatanId}",
        ]);
    }

    private function sendNotifikasiApproval(int $kegiatanId, int $pengusulUserId, float $nominal, bool $isApproved): void
    {
        $status = $isApproved ? 'disetujui' : 'ditolak';
        
        $this->notifikasiModel->create([
            'penerima_user_id' => $pengusulUserId,
            'pesan' => "Pencairan dana sebesar Rp " . number_format($nominal, 0, ',', '.') . " untuk kegiatan Anda telah {$status}.",
            'link_tujuan' => "/pengusul/kegiatan/{$kegiatanId}",
        ]);
    }

    private function sendNotifikasiTimerLpj(int $kegiatanId, int $pengusulUserId): void
    {
        $this->notifikasiModel->create([
            'penerima_user_id' => $pengusulUserId,
            'pesan' => "Semua dana telah dicairkan. Anda memiliki waktu 14 hari untuk mengirimkan Laporan Pertanggungjawaban (LPJ).",
            'link_tujuan' => "/pengusul/kegiatan/{$kegiatanId}/lpj",
        ]);
    }

    protected function getInput()
    {
        return json_decode(file_get_contents('php://input'), true);
    }
}