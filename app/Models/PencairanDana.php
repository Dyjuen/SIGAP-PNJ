<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class PencairanDana extends Model
{
    protected $table = 't_pencairan_dana';
    protected $primaryKey = 'pencairan_id';

    /**
     * Get all pencairan by kegiatan_id
     */
    public function getByKegiatanId(int $kegiatanId): array
    {
        $sql = "SELECT 
                    p.*,
                    u_creator.nama as nama_pengusul,
                    u_approver.nama as nama_bendahara
                FROM {$this->table} p
                LEFT JOIN m_users u_creator ON p.created_by = u_creator.user_id
                LEFT JOIN m_users u_approver ON p.approved_by = u_approver.user_id
                WHERE p.kegiatan_id = :kegiatan_id
                ORDER BY p.created_at DESC";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get total dana yang sudah dicairkan (approved)
     */
    public function getTotalDicairkan(int $kegiatanId): float
    {
        $sql = "SELECT COALESCE(SUM(nominal_pencairan), 0) as total
                FROM {$this->table}
                WHERE kegiatan_id = :kegiatan_id 
                AND status = 'Disetujui'";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return (float) $result['total'];
    }

    /**
     * Get sisa dana yang belum dicairkan
     */
    public function getSisaDana(int $kegiatanId): array
    {
        $sql = "SELECT 
                    COALESCE(SUM(ta.total), 0) as total_anggaran,
                    COALESCE((
                        SELECT SUM(nominal_pencairan) 
                        FROM {$this->table} 
                        WHERE kegiatan_id = :kegiatan_id 
                        AND status = 'Disetujui'
                    ), 0) as total_dicairkan
                FROM t_kegiatan k
                INNER JOIN t_telaah t ON k.telaah_id = t.telaah_id
                LEFT JOIN t_telaah_anggaran ta ON t.telaah_id = ta.telaah_id
                WHERE k.kegiatan_id = :kegiatan_id
                GROUP BY k.kegiatan_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $totalAnggaran = (float) $result['total_anggaran'];
        $totalDicairkan = (float) $result['total_dicairkan'];
        $sisaDana = $totalAnggaran - $totalDicairkan;
        
        return [
            'total_anggaran' => $totalAnggaran,
            'total_dicairkan' => $totalDicairkan,
            'sisa_dana' => $sisaDana
        ];
    }

    /**
     * Create pencairan baru
     */
    public function createPencairan(array $data): int
    {
        $sql = "INSERT INTO {$this->table} 
                (kegiatan_id, approval_kegiatan_id, nominal_pencairan, keterangan, created_by, status)
                VALUES 
                (:kegiatan_id, :approval_kegiatan_id, :nominal_pencairan, :keterangan, :created_by, 'Diajukan')";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'kegiatan_id' => $data['kegiatan_id'],
            'approval_kegiatan_id' => $data['approval_kegiatan_id'],
            'nominal_pencairan' => $data['nominal_pencairan'],
            'keterangan' => $data['keterangan'],
            'created_by' => $data['created_by']
        ]);
        
        return (int) $this->db->lastInsertId();
    }

    /**
     * Approve pencairan
     */
    public function approvePencairan(int $pencairanId, int $approvedBy, ?string $catatan = null): bool
    {
        $sql = "UPDATE {$this->table}
                SET status = 'Disetujui',
                    approved_by = :approved_by,
                    approved_at = CURRENT_TIMESTAMP,
                    catatan_bendahara = :catatan
                WHERE pencairan_id = :pencairan_id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'pencairan_id' => $pencairanId,
            'approved_by' => $approvedBy,
            'catatan' => $catatan
        ]);
    }

    /**
     * Reject pencairan
     */
    public function rejectPencairan(int $pencairanId, int $approvedBy, string $catatan): bool
    {
        $sql = "UPDATE {$this->table}
                SET status = 'Ditolak',
                    approved_by = :approved_by,
                    approved_at = CURRENT_TIMESTAMP,
                    catatan_bendahara = :catatan
                WHERE pencairan_id = :pencairan_id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'pencairan_id' => $pencairanId,
            'approved_by' => $approvedBy,
            'catatan' => $catatan
        ]);
    }

    /**
     * Update dana_dicairkan di t_kegiatan
     */
    public function updateDanaDicairkan(int $kegiatanId): bool
    {
        $totalDicairkan = $this->getTotalDicairkan($kegiatanId);
        
        $sql = "UPDATE t_kegiatan 
                SET dana_dicairkan = :dana_dicairkan
                WHERE kegiatan_id = :kegiatan_id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            'dana_dicairkan' => $totalDicairkan,
            'kegiatan_id' => $kegiatanId
        ]);
    }

    /**
     * Check apakah semua dana sudah dicairkan
     */
    public function isSemuaDanaDicairkan(int $kegiatanId): bool
    {
        $sisaDana = $this->getSisaDana($kegiatanId);
        return $sisaDana['sisa_dana'] <= 0;
    }

    /**
     * Update tgl_batas_lpj (14 hari dari sekarang)
     */
    public function updateTglBatasLpj(int $kegiatanId): bool
    {
        $sql = "UPDATE t_kegiatan 
                SET tgl_batas_lpj = DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY)
                WHERE kegiatan_id = :kegiatan_id";
        
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['kegiatan_id' => $kegiatanId]);
    }

    /**
     * Get pencairan by ID with details
     */
    public function getDetailById(int $pencairanId): ?array
    {
        $sql = "SELECT 
                    p.*,
                    k.kegiatan_id,
                    t.judul_telaah,
                    u_creator.nama as nama_pengusul,
                    u_creator.email as email_pengusul,
                    u_approver.nama as nama_bendahara,
                    u_approver.email as email_bendahara
                FROM {$this->table} p
                INNER JOIN t_kegiatan k ON p.kegiatan_id = k.kegiatan_id
                INNER JOIN t_telaah t ON k.telaah_id = t.telaah_id
                LEFT JOIN m_users u_creator ON p.created_by = u_creator.user_id
                LEFT JOIN m_users u_approver ON p.approved_by = u_approver.user_id
                WHERE p.pencairan_id = :pencairan_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['pencairan_id' => $pencairanId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return $result ?: null;
    }
}