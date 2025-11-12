<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class PencairanDana extends Model
{
    protected $table = 't_pencairan_dana'; // This table does not exist, but the property is here for structure.
    protected $primaryKey = 'pencairan_id';

    /**
     * Get all pencairan by kegiatan_id
     * NOTE: The table t_pencairan_dana does not exist. Returning an empty array.
     */
    public function getByKegiatanId(int $kegiatanId): array
    {
        // The table t_pencairan_dana does not exist based on user feedback.
        // Returning an empty array to avoid crashing the application.
        // The feature to list individual disbursements needs to be re-evaluated based on the correct schema.
        return [];
    }

    /**
     * Get total dana yang sudah dicairkan (approved)
     * NOTE: This method is likely obsolete as it queries a non-existent table.
     */
    public function getTotalDicairkan(int $kegiatanId): float
    {
        // This function is not used by the corrected getSisaDana and relies on a non-existent table.
        return 0.0;
    }

    /**
     * Get sisa dana yang belum dicairkan
     * This method is updated based on user's database schema description.
     */
    public function getSisaDana(int $kegiatanId): array
    {
        $sql = "SELECT 
                    k.dana_dicairkan,
                    (SELECT COALESCE(SUM(ta.jumlah_diusulkan), 0) 
                     FROM t_telaah_anggaran ta 
                     JOIN t_telaah t ON ta.telaah_id = t.telaah_id 
                     WHERE t.telaah_id = k.telaah_id) as total_anggaran
                FROM t_kegiatan k
                WHERE k.kegiatan_id = :kegiatan_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return [
                'total_anggaran' => 0,
                'total_dicairkan' => 0,
                'sisa_dana' => 0
            ];
        }
        
        $totalAnggaran = (float) ($result['total_anggaran'] ?? 0);
        $totalDicairkan = (float) ($result['dana_dicairkan'] ?? 0);
        $sisaDana = $totalAnggaran - $totalDicairkan;
        
        return [
            'total_anggaran' => $totalAnggaran,
            'total_dicairkan' => $totalDicairkan,
            'sisa_dana' => $sisaDana
        ];
    }

    /**
     * Create pencairan baru
     * NOTE: This method will fail as it tries to insert into a non-existent table.
     */
    public function createPencairan(array $data): int
    {
        // This will fail because t_pencairan_dana does not exist.
        // The logic for creating a disbursement needs to be re-evaluated.
        // For now, it will throw an exception which will be caught by the controller.
        $sql = "INSERT INTO {$this->table} 
                (kegiatan_id, approval_kegiatan_id, nominal_pencairan, keterangan, created_by, status)
                VALUES 
                (:kegiatan_id, :approval_kegiatan_id, :nominal_pencairan, :keterangan, :created_by, 'Diajukan')";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute($data);
        
        return (int) $this->db->lastInsertId();
    }

    /**
     * Approve pencairan
     * NOTE: This method will fail as it tries to update a non-existent table.
     */
    public function approvePencairan(int $pencairanId, int $approvedBy, ?string $catatan = null): bool
    {
        // This will fail because t_pencairan_dana does not exist.
        $sql = "UPDATE {$this->table} SET status = 'Disetujui' WHERE pencairan_id = :pencairan_id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['pencairan_id' => $pencairanId]);
    }

    /**
     * Reject pencairan
     * NOTE: This method will fail as it tries to update a non-existent table.
     */
    public function rejectPencairan(int $pencairanId, int $approvedBy, string $catatan): bool
    {
        // This will fail because t_pencairan_dana does not exist.
        $sql = "UPDATE {$this->table} SET status = 'Ditolak' WHERE pencairan_id = :pencairan_id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['pencairan_id' => $pencairanId]);
    }

    /**
     * Update dana_dicairkan di t_kegiatan
     * NOTE: This method's logic is flawed as getTotalDicairkan is obsolete.
     */
    public function updateDanaDicairkan(int $kegiatanId): bool
    {
        // The logic here is flawed because getTotalDicairkan relies on a non-existent table.
        // The process of updating t_kegiatan.dana_dicairkan should be handled differently.
        // For now, this method will do nothing to prevent incorrect updates.
        return true;
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
     * NOTE: This method will fail as it queries a non-existent table.
     */
    public function getDetailById(int $pencairanId): ?array
    {
        // This will fail because t_pencairan_dana does not exist.
        return null;
    }
}