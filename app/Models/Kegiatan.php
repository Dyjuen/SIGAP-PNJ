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
        $baseSql = "FROM t_kegiatan k
                    JOIN t_kak t ON k.kak_id = t.kak_id
                    JOIN m_users u ON t.pengusul_user_id = u.user_id
                    LEFT JOIN m_kegiatan_status ks ON t.status_id = ks.status_id
                    LEFT JOIN t_kegiatan_approval active_approval ON k.kegiatan_id = active_approval.kegiatan_id AND active_approval.status = 'Aktif'
                    LEFT JOIN (
                        SELECT kegiatan_id, SUM(jumlah_dicairkan) as total_dicairkan
                        FROM t_pencairan_dana
                        GROUP BY kegiatan_id
                    ) pencairan_sum ON k.kegiatan_id = pencairan_sum.kegiatan_id";
        
        $whereSql = " WHERE 1=1";

        if (!empty($filters['status_id'])) {
            $whereSql .= " AND t.status_id = ?";
            $params[] = $filters['status_id'];
        }
        if (!empty($filters['search'])) {
            $whereSql .= " AND t.nama_kegiatan LIKE ?";
            $params[] = '%' . $filters['search'] . '%'; 
        }
        if (!empty($filters['user_id'])) {
            $whereSql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['user_id'];
        }
        if (!empty($filters['tanggal_mulai'])) {
            $whereSql .= " AND t.tanggal_mulai >= ?";
            $params[] = $filters['tanggal_mulai'];
        }
        if (!empty($filters['tanggal_selesai'])) {
            $whereSql .= " AND t.tanggal_selesai <= ?";
            $params[] = $filters['tanggal_selesai'];
        }
        if (!empty($filters['unit_pengusul'])) {
            $whereSql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['unit_pengusul'];
        }
        if (!empty($filters['kode_kegiatan'])) {
            $whereSql .= " AND t.kode_kegiatan = ?";
            $params[] = $filters['kode_kegiatan'];
        }
        if (!empty($filters['kategori_kegiatan'])) {
            $whereSql .= " AND t.tipe_kegiatan_id = ?";
            $params[] = $filters['kategori_kegiatan'];
        }
        if (!empty($filters['status'])) { // Added this filter
            $whereSql .= " AND ks.nama_status = ?";
            $params[] = $filters['status'];
        }

        // Count total records - This also needs $baseSql and $whereSql
        $countSql = "SELECT COUNT(k.kegiatan_id) " . $baseSql . $whereSql;
        $totalRecords = $this->query($countSql, $params)->fetchColumn();


        // Main query with direct join for active approval and disbursement sum
        $mainSelect = "SELECT 
                        k.kegiatan_id,
                        t.nama_kegiatan,
                        t.tanggal_mulai,
                        t.tanggal_selesai,
                        t.lokasi,
                        t.created_at,
                        u.nama_lengkap as pengusul_nama,
                        ks.nama_status,
                        ks.status_id,
                        (SELECT SUM(ta.jumlah_diusulkan) FROM t_kak_anggaran ta WHERE ta.kak_id = t.kak_id) as total_anggaran_diusulkan,
                        COALESCE(pencairan_sum.total_dicairkan, 0) as dana_dicairkan,
                        active_approval.approval_level,
                        active_approval.status as current_approval_status";
        
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 10;
        $offset = ($page - 1) * $perPage;
        
        $finalParams = array_merge($params, [$perPage, $offset]);
        $paginationSql = " ORDER BY k.created_at DESC LIMIT ? OFFSET ?";
        
        $sql = $mainSelect . " " . $baseSql . $whereSql . $paginationSql;
        
        $data = $this->query($sql, $finalParams)->fetchAll(PDO::FETCH_ASSOC);

        // Augment data with full approval history and structure the current_approval object
        $kegiatanIds = array_map(fn($k) => $k['kegiatan_id'], $data);

        if (!empty($kegiatanIds)) {
            $placeholders = implode(',', array_fill(0, count($kegiatanIds), '?'));
            $sqlApprovals = "SELECT * FROM t_kegiatan_approval WHERE kegiatan_id IN ({$placeholders}) ORDER BY approval_kegiatan_id ASC";
            $allApprovals = $this->query($sqlApprovals, $kegiatanIds)->fetchAll(PDO::FETCH_ASSOC);

            $groupedApprovals = [];
            foreach ($allApprovals as $approval) {
                $groupedApprovals[$approval['kegiatan_id']][] = $approval;
            }

            foreach ($data as &$kegiatan) {
                // Nest the full approval history
                $kegiatan['approvals'] = $groupedApprovals[$kegiatan['kegiatan_id']] ?? [];
                
                // Create the current_approval object from the joined data
                if (isset($kegiatan['approval_level'])) { 
                    $kegiatan['current_approval'] = [
                        'approval_level' => $kegiatan['approval_level'],
                        'status' => $kegiatan['current_approval_status']
                    ];
                } else {
                    $kegiatan['current_approval'] = null;
                }
                
                // Remove redundant fields that are now nested or unused
                unset($kegiatan['approval_level']);
                unset($kegiatan['current_approval_status']);
            }
        }

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
        $sql = "SELECT 
                    k.*, 
                    t.pengusul_user_id, 
                    t.status_id, 
                    t.nama_kegiatan,
                    (SELECT SUM(ta.jumlah_diusulkan) FROM t_kak_anggaran ta WHERE ta.kak_id = t.kak_id) as total_anggaran_disetujui,
                    (SELECT COALESCE(SUM(pd.jumlah_dicairkan), 0) FROM t_pencairan_dana pd WHERE pd.kegiatan_id = k.kegiatan_id) as dana_dicairkan
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
                WHERE k.tgl_batas_lpj IS NOT NULL";

        if (!empty($filters['search'])) {
            $sql .= " AND t.nama_kegiatan LIKE ?";
            $params[] = '%' . $filters['search'] . '%';
        }
        if (!empty($filters['unit_pengusul'])) {
            $sql .= " AND t.pengusul_user_id = ?";
            $params[] = $filters['unit_pengusul'];
        }
        
        $countSql = "SELECT COUNT(*) FROM ({$sql}) as count_table";
        $totalRecords = $this->query($countSql, $params)->fetchColumn();
        
        $page = $filters['page'] ?? 1;
        $perPage = $filters['per_page'] ?? 10;
        $offset = ($page - 1) * $perPage;

        $sql .= " ORDER BY k.tgl_batas_lpj DESC LIMIT ? OFFSET ?";
        
        $finalParams = array_merge($params, [$perPage, $offset]);

        $data = $this->query($sql, $finalParams)->fetchAll(PDO::FETCH_ASSOC);

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

    public function createApprovalSteps(int $kegiatanId)
    {
        $approvalHierarchy = ['PPK', 'Wadir', 'Bendahara-Cair', 'Bendahara-LPJ'];
        $sql = "INSERT INTO t_kegiatan_approval (kegiatan_id, status, approval_level) VALUES (?, ?, ?)";
        
        // Create steps based on the hierarchy
        foreach ($approvalHierarchy as $index => $level) {
            $status = ($index === 0) ? 'Aktif' : 'Menunggu';
            $this->query($sql, [$kegiatanId, $status, $level]);
        }
    }

    public function findAllApprovalsByKegiatanId(int $kegiatanId)
    {
        $sql = "SELECT * FROM t_kegiatan_approval WHERE kegiatan_id = ? ORDER BY approval_kegiatan_id ASC";
        return $this->query($sql, [$kegiatanId])->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function findCurrentApproval(int $kegiatanId)
    {
        $sql = "SELECT * FROM t_kegiatan_approval 
                WHERE kegiatan_id = ? AND status = 'Aktif' 
                ORDER BY approval_kegiatan_id ASC LIMIT 1";
        return $this->query($sql, [$kegiatanId])->fetch(PDO::FETCH_ASSOC);
    }

    public function updateApprovalStatus(int $approvalId, string $status, ?int $userId, ?string $catatan)
    {
        $sql = "UPDATE t_kegiatan_approval 
                SET status = ?, approver_user_id = ?, catatan = ?, updated_at = NOW()
                WHERE approval_kegiatan_id = ?";
        return $this->query($sql, [$status, $userId, $catatan, $approvalId]);
    }

    public function findNextApproval(int $kegiatanId, int $currentApprovalId)
    {
        $sql = "SELECT * FROM t_kegiatan_approval 
                WHERE kegiatan_id = ? AND approval_kegiatan_id > ? 
                ORDER BY approval_kegiatan_id ASC LIMIT 1";
        return $this->query($sql, [$kegiatanId, $currentApprovalId])->fetch(PDO::FETCH_ASSOC);
    }
}