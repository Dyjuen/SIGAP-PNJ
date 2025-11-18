<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Response;
use App\Models\PencairanDana;
use App\Validators\PencairanValidator;
use PDO;

class PencairanController extends Controller
{
    private $pencairanModel;

    public function __construct()
    {
        parent::__construct();
        $this->pencairanModel = new PencairanDana();
    }

    /**
     * GET /api/pencairan/kegiatan/{kegiatan_id}
     * List semua pencairan untuk kegiatan tertentu.
     */
    public function index($kegiatan_id)
    {
        try {
            $kegiatanId = (int) $kegiatan_id;
            
            if (!$this->canAccessKegiatan($kegiatanId)) {
                return Response::json(['success' => false, 'message' => 'Anda tidak memiliki akses ke kegiatan ini'], 403);
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
            return Response::json(['success' => false, 'message' => 'Gagal mengambil data pencairan: ' . $e->getMessage()], 500);
        }
    }

    /**
     * GET /api/pencairan/sisa-dana/{kegiatan_id}
     * Cek sisa dana yang belum dicairkan.
     */
    public function getSisaDana($kegiatan_id)
    {
        try {
            $kegiatanId = (int) $kegiatan_id;
            
            if (!$this->canAccessKegiatan($kegiatanId)) {
                return Response::json(['success' => false, 'message' => 'Anda tidak memiliki akses ke kegiatan ini'], 403);
            }

            $sisaDana = $this->pencairanModel->getSisaDana($kegiatanId);

            return Response::json(['success' => true, 'data' => $sisaDana]);

        } catch (\Exception $e) {
            return Response::json(['success' => false, 'message' => 'Gagal mengambil data sisa dana: ' . $e->getMessage()], 500);
        }
    }

    /**
     * POST /api/pencairan
     * Bendahara mencatat transaksi pencairan dana.
     */
    public function logPencairan($kegiatan_id)
    {
        try {
            $kegiatanId = (int) $kegiatan_id; // Get kegiatan_id from URL parameter
            $input = $this->getInput();
            
            // Add kegiatan_id from URL back to input for validation
            $input['kegiatan_id'] = $kegiatanId;

            $validator = new PencairanValidator();
            $validation = $validator->validateCreate($input); 
            if (!$validation['valid']) {
                return Response::json(['success' => false, 'message' => 'Validasi gagal', 'errors' => $validation['errors']], 422);
            }

            $nominalPencairan = (float) $input['nominal_pencairan'];

            if (!$this->isBendahara()) {
                return Response::json(['success' => false, 'message' => 'Hanya bendahara yang dapat mencatat pencairan'], 403);
            }

            // Cek apakah persetujuan Bendahara-Cair sudah Aktif
            $approvalBendahara = $this->getApprovalBendaharaCair($kegiatanId);
            if (!$approvalBendahara || $approvalBendahara['status'] !== 'Aktif') {
                return Response::json([
                    'success' => false,
                    'message' => 'Pencairan belum dapat dilakukan. Status persetujuan Bendahara-Cair belum Aktif.'
                ], 400);
            }


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

            $pencairanId = $this->pencairanModel->logTransaksi([
                'kegiatan_id' => $kegiatanId,
                'jumlah_dicairkan' => $nominalPencairan,
                'keterangan' => $input['keterangan'] ?? null,
                'created_by' => $this->user['user_id']
            ]);

            return Response::json([
                'success' => true,
                'message' => 'Pencairan dana berhasil dicatat',
                'data' => [
                    'pencairan_id' => $pencairanId
                ]
            ], 201);

        } catch (\Exception $e) {
            return Response::json(['success' => false, 'message' => 'Gagal mencatat pencairan: ' . $e->getMessage()], 500);
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
        $sql = "SELECT k.kegiatan_id 
                FROM t_kegiatan k
                INNER JOIN t_kak kak ON k.kak_id = kak.kak_id
                WHERE k.kegiatan_id = :kegiatan_id 
                AND kak.pengusul_user_id = :user_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId, 'user_id' => $this->user['user_id']]);
        
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
}