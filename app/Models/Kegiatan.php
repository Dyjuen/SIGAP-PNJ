<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class Kegiatan extends Model
{
    protected $table = 't_kegiatan';
    protected $primaryKey = 'kegiatan_id';

    public function getAllWithFilters(array $filters)
    {
        $params = [];
        $sql = "SELECT 
                    k.kegiatan_id,
                    t.nama_kegiatan,
                    t.tanggal_mulai,
                    t.tanggal_selesai,
                    t.lokasi,
                    u.nama_lengkap as pengusul_nama,
                    ks.nama_status,
                    ks.status_id,
                    (SELECT SUM(ta.jumlah_diusulkan) FROM t_kak_anggaran ta WHERE ta.kak_id = t.kak_id) as total_anggaran_diusulkan
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                JOIN m_users u ON t.pengusul_user_id = u.user_id
                JOIN m_kegiatan_status ks ON t.status_id = ks.status_id
                WHERE 1=1";

        if (!empty($filters['status_id'])) {
            $sql .= " AND t.status_id = ?";
            $params[] = $filters['status_id'];
        }
        if (!empty($filters['search'])) {
            $sql .= " AND t.nama_kegiatan LIKE ?";
            $params[] = '%' . $filters['search'] . '%';
        }
        if (!empty($filters['tanggal_mulai'])) {
            $sql .= " AND t.tanggal_mulai >= ?";
            $params[] = $filters['tanggal_mulai'];
        }
        if (!empty($filters['tanggal_selesai'])) {
            $sql .= " AND t.tanggal_selesai <= ?";
            $params[] = $filters['tanggal_selesai'];
        }
        if (!empty($filters['user_id'])) { // filter by specific proposer for non-admins
            $sql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['user_id'];
        }
        if (!empty($filters['unit_pengusul'])) { // filter by unit/proposer ID for admins
            $sql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['unit_pengusul'];
        }
        if (!empty($filters['kode_kegiatan'])) {
            // Asumsi `kode_kegiatan` ada di tabel `t_kak`
            $sql .= " AND t.kode_kegiatan = ?";
            $params[] = $filters['kode_kegiatan'];
        }
        if (!empty($filters['kategori_kegiatan'])) {
            // Asumsi `tipe_kegiatan_id` ada di tabel `t_kak`
            $sql .= " AND t.tipe_kegiatan_id = ?";
            $params[] = $filters['kategori_kegiatan'];
        }

        // Count total records for pagination
        $countSql = "SELECT COUNT(*) FROM ({$sql}) as count_table";
        $totalRecords = $this->query($countSql, $params)->fetchColumn();

        // Pagination
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 10;
        $offset = ($page - 1) * $perPage;

        $sql .= " ORDER BY k.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $perPage;
        $params[] = $offset;

        $data = $this->query($sql, $params)->fetchAll(PDO::FETCH_ASSOC);

        return [
            'data' => $data,
            'pagination' => [
                'total' => (int) $totalRecords,
                'per_page' => $perPage,
                'current_page' => $page,
                'last_page' => ceil($totalRecords / $perPage)
            ]
        ];
    }

    public function getKegiatanForPDF($kegiatanId)
    {
        $sql = "SELECT 
                    k.*, 
                    t.*, 
                    u.nama_lengkap as pengusul_nama, 
                    u.email as pengusul_email
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                JOIN m_users u ON t.pengusul_user_id = u.user_id
                WHERE k.kegiatan_id = ?";
        
        $kegiatan = $this->query($sql, [$kegiatanId])->fetch(PDO::FETCH_ASSOC);
        if ($kegiatan) {
            $kegiatan['anggaran_items'] = $this->query("SELECT * FROM t_kak_anggaran WHERE kak_id = ?", [$kegiatan['kak_id']])->fetchAll(PDO::FETCH_ASSOC);
        }
        return $kegiatan;
    }
    
    public function findById($id)
    {
        $sql = "SELECT k.*, t.pengusul_user_id, t.status_id, t.nama_kegiatan
                FROM {$this->table} k
                JOIN t_kak t ON k.kak_id = t.kak_id
                WHERE k.{$this->primaryKey} = ?";
        return $this->query($sql, [$id])->fetch(PDO::FETCH_ASSOC);
    }

    public function updateStatus($kegiatanId, $statusId)
    {
        $sql = "UPDATE t_kak SET status_id = ? WHERE kak_id = (SELECT kak_id FROM t_kegiatan WHERE kegiatan_id = ?)";
        return $this->query($sql, [$statusId, $kegiatanId]);
    }

    public function getStatistics($userId)
    {
        $sql = "SELECT 
                    COUNT(CASE WHEN ks.nama_status = 'Draft' THEN 1 END) as total_draft,
                    COUNT(CASE WHEN ks.nama_status = 'Review Verifikator' THEN 1 END) as total_review_verifikator,
                    COUNT(CASE WHEN ks.nama_status = 'Revisi' THEN 1 END) as total_revisi
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                JOIN m_kegiatan_status ks ON t.status_id = ks.status_id";
        
        $params = [];
        if ($userId) {
            $sql .= " WHERE t.pengusul_user_id = ?";
            $params[] = $userId;
        }

        return $this->query($sql, $params)->fetch(PDO::FETCH_ASSOC);
    }

    public function getLpjWithFilters(array $filters)
    {
        $params = [];
        $sql = "SELECT 
                    k.kegiatan_id,
                    t.nama_kegiatan,
                    u.nama_lengkap as pengusul_nama,
                    k.tgl_batas_lpj,
                    CASE 
                        WHEN ks.nama_status = 'Selesai' THEN 'Selesai'
                        WHEN ks.nama_status = 'Revisi' THEN 'Direvisi'
                        WHEN k.lpj_submitted_at IS NOT NULL THEN 'Diajukan'
                        ELSE 'Menunggu Penyerahan'
                    END as status_lpj,
                    CASE 
                        WHEN k.tgl_batas_lpj IS NOT NULL AND k.lpj_submitted_at IS NULL AND k.tgl_batas_lpj < NOW() THEN 'Terlambat'
                        ELSE 'Tepat Waktu'
                    END as status_ketepatan
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                JOIN m_users u ON t.pengusul_user_id = u.user_id
                JOIN m_kegiatan_status ks ON t.status_id = ks.status_id
                WHERE k.tgl_batas_lpj IS NOT NULL"; // Hanya ambil kegiatan yang sudah masuk tahap LPJ

        if (!empty($filters['search'])) {
            $sql .= " AND t.nama_kegiatan LIKE ?";
            $params[] = '%' . $filters['search'] . '%';
        }
        if (!empty($filters['unit_pengusul'])) {
            $sql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['unit_pengusul'];
        }
        
        // Count total records for pagination
        $countSql = "SELECT COUNT(*) FROM ({$sql}) as count_table";
        $totalRecords = $this->query($countSql, $params)->fetchColumn();
        
        // Pagination
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 10;
        $offset = ($page - 1) * $perPage;

        $sql .= " ORDER BY k.tgl_batas_lpj DESC LIMIT ? OFFSET ?";
        $params[] = $perPage;
        $params[] = $offset;

        $data = $this->query($sql, $params)->fetchAll(PDO::FETCH_ASSOC);

        return [
            'data' => $data,
            'pagination' => [
                'total' => (int) $totalRecords,
                'per_page' => $perPage,
                'current_page' => $page,
                'last_page' => ceil($totalRecords / $perPage)
            ]
        ];
    }


    //... sisa metode lainnya tetap sama

    public function findCurrentApproval(int $kegiatanId): ?array
    {
        $sql = "SELECT * FROM t_kegiatan_approval 
                WHERE kegiatan_id = :kegiatan_id AND status = 'Aktif'
                LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    public function updateApprovalStatus(int $approvalId, string $status, ?int $userId, ?string $catatan): bool
    {
        $sql = "UPDATE t_kegiatan_approval 
                SET status = :status, approver_user_id = :user_id, catatan = :catatan, updated_at = NOW()
                WHERE approval_kegiatan_id = :approval_id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'status' => $status,
            'user_id' => $userId,
            'catatan' => $catatan,
            'approval_id' => $approvalId
        ]);
    }

    public function findNextApproval(int $kegiatanId, int $currentApprovalId): ?array
    {
        $sql = "SELECT * FROM t_kegiatan_approval
                WHERE kegiatan_id = :kegiatan_id 
                AND approval_kegiatan_id > :current_approval_id
                ORDER BY approval_kegiatan_id ASC
                LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'kegiatan_id' => $kegiatanId,
            'current_approval_id' => $currentApprovalId
        ]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }

    public function updateApproval(int $kegiatanId, array $data): bool
    {
        $sql = "INSERT INTO t_kegiatan_approval (kegiatan_id, approval_level, approver_user_id, status, catatan)
                VALUES (:kegiatan_id, :approval_level, :approver_user_id, :status, :catatan)";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'kegiatan_id' => $kegiatanId,
            'approval_level' => $data['approval_level'],
            'approver_user_id' => $data['approver_user_id'],
            'status' => $data['status'],
            'catatan' => $data['catatan']
        ]);
    public function activateLpjApproval(int $kegiatanId): bool
    {
        $sql = "UPDATE t_kegiatan_approval 
                SET status = 'Aktif', updated_at = NOW()
                WHERE kegiatan_id = :kegiatan_id 
                AND approval_level = 'Bendahara-LPJ'";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['kegiatan_id' => $kegiatanId]);
    }
}