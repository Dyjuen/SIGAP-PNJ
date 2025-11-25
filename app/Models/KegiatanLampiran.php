<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class KegiatanLampiran extends Model
{
    protected $table = 't_kegiatan_lampiran';
    protected $primaryKey = 'lampiran_id';

    /**
     * Cari semua lampiran berdasarkan ID anggaran.
     */
    public function findByAnggaran($anggaran_id) {
        return $this->findAllBy('anggaran_id', $anggaran_id);
    }

    /**
     * Cari semua lampiran berdasarkan array ID anggaran.
     * @param array $anggaranIds Array of anggaran_id
     * @return array
     */
    public function findByAnggaranIds(array $anggaranIds) {
        if (empty($anggaranIds)) {
            return [];
        }
        $placeholders = implode(',', array_fill(0, count($anggaranIds), '?'));
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE anggaran_id IN ({$placeholders})");
        $stmt->execute($anggaranIds);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
