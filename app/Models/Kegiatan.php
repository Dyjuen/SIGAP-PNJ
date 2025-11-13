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

        $params = [];

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

        if (!empty($filters['user_id'])) {
            $sql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['user_id'];
        }

        // Pagination
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 10;
        $offset = ($page - 1) * $perPage;

        $sql .= " ORDER BY k.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $perPage;
        $params[] = $offset;

        return $this->query($sql, $params)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getKegiatanForPDF($kegiatanId)
    {
        // This is a complex query, for now, a simplified version.
        // You might need to build a more detailed query based on PDF requirements.
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
            // Fetch related items like anggaran, lampiran etc.
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

    public function updateApproval($kegiatanId, array $data)
    {
        $sql = "INSERT INTO t_kegiatan_approval 
                (kegiatan_id, approver_user_id, status, catatan) 
                VALUES (?, ?, ?, ?)";
        
        $params = [
            $kegiatanId,
            $data['approver_user_id'] ?? null,  // ✅ FIX: Tambahkan approver_user_id
            $data['status'],
            $data['catatan'] ?? null            // ✅ FIX: Tambahkan catatan
        ];
        
        return $this->query($sql, $params);
    }

    public function findCurrentApproval($kegiatanId)
    {
        $sql = "SELECT * FROM t_kegiatan_approval 
                WHERE kegiatan_id = ? AND status = 'Aktif' 
                ORDER BY approval_kegiatan_id ASC LIMIT 1";
        return $this->query($sql, [$kegiatanId])->fetch(PDO::FETCH_ASSOC);
    }

    public function updateApprovalStatus($approvalKegiatanId, $status, $approverUserId = null, $catatan = null)
    {
        $sql = "UPDATE t_kegiatan_approval 
                SET status = ?, approver_user_id = ?, catatan = ?, updated_at = NOW() 
                WHERE approval_kegiatan_id = ?";
        return $this->query($sql, [$status, $approverUserId, $catatan, $approvalKegiatanId]);
    }

    public function findNextApproval($kegiatanId, $currentApprovalId)
    {
        $sql = "SELECT * FROM t_kegiatan_approval 
                WHERE kegiatan_id = ? AND approval_kegiatan_id > ? 
                ORDER BY approval_kegiatan_id ASC LIMIT 1";
        return $this->query($sql, [$kegiatanId, $currentApprovalId])->fetch(PDO::FETCH_ASSOC);
    }

    public function getStatistics($userId)
    {
        // Placeholder for statistics logic
        return ['message' => 'Statistics not implemented yet.'];
    }

    public function getAllForExport(array $filters)
    {
        $sql = "SELECT 
                    t.nama_kegiatan,
                    t.tanggal_mulai,
                    t.tanggal_selesai,
                    t.lokasi,
                    u.nama_lengkap as pengusul_nama,
                    ks.nama_status,
                    (SELECT SUM(ta.jumlah_diusulkan) FROM t_kak_anggaran ta WHERE ta.kak_id = t.kak_id) as total_anggaran_diusulkan,
                    NULL as total_anggaran_disetujui
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                JOIN m_users u ON t.pengusul_user_id = u.user_id
                JOIN m_kegiatan_status ks ON t.status_id = ks.status_id
                WHERE 1=1";

        $params = [];

        if (!empty($filters['status_id'])) {
            $sql .= " AND t.status_id = ?";
            $params[] = $filters['status_id'];
        }

        if (!empty($filters['user_id'])) {
            $sql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['user_id'];
        }

        $sql .= " ORDER BY k.created_at DESC";

        return $this->query($sql, $params)->fetchAll(PDO::FETCH_ASSOC);
    }
}
