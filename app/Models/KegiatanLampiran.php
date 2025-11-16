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
}
