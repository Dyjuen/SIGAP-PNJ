<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class PencairanDana extends Model
{
    protected $table = 't_pencairan_dana';
    protected $primaryKey = 'pencairan_id';

    /**
     * Get all disbursement records for a given kegiatan ID.
     *
     * @param int $kegiatanId
     * @return array
     */
    public function getByKegiatanId(int $kegiatanId): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE kegiatan_id = :kegiatan_id ORDER BY tanggal_pencairan DESC";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create a new disbursement record.
     *
     * @param array $data
     * @return integer The ID of the newly created record.
     */
    public function create(array $data): int
    {
        $sql = "INSERT INTO {$this->table} (kegiatan_id, jumlah_dicairkan, created_by, tanggal_pencairan, keterangan)
                VALUES (:kegiatan_id, :jumlah_dicairkan, :created_by, :tanggal_pencairan, :keterangan)";
        
        $this->query($sql, $data);
        
        return (int) $this->db->lastInsertId();
    }

    /**
     * Get sisa dana yang belum dicairkan for a specific kegiatan.
     *
     * @param integer $kegiatanId
     * @return array
     */
    public function getSisaDana(int $kegiatanId): array
    {
        // This query joins with t_kak to get the approved budget.
        $sql = "SELECT 
                    k.total_anggaran_disetujui,
                    k.dana_dicairkan
                FROM t_kegiatan k
                WHERE k.kegiatan_id = :kegiatan_id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['kegiatan_id' => $kegiatanId]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return [
                'total_anggaran_disetujui' => 0,
                'total_dicairkan' => 0,
                'sisa_dana' => 0
            ];
        }
        
        $totalAnggaran = (float) ($result['total_anggaran_disetujui'] ?? 0);
        $totalDicairkan = (float) ($result['dana_dicairkan'] ?? 0);
        $sisaDana = $totalAnggaran - $totalDicairkan;
        
        return [
            'total_anggaran_disetujui' => $totalAnggaran,
            'total_dicairkan' => $totalDicairkan,
            'sisa_dana' => $sisaDana
        ];
    }
}
