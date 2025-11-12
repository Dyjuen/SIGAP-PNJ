<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class KegiatanAnggaran extends Model
{
    protected $table = 't_telaah_anggaran';
    protected $primaryKey = 'anggaran_id';

    /**
     * Get anggaran items by kegiatan_id by joining through t_kegiatan and t_telaah
     */
    public function getByKegiatanId($kegiatanId)
    {
        $sql = "SELECT ta.* 
                FROM t_telaah_anggaran ta
                JOIN t_telaah t ON ta.telaah_id = t.telaah_id
                JOIN t_kegiatan k ON t.telaah_id = k.telaah_id
                WHERE k.kegiatan_id = ?";
        
        return $this->query($sql, [$kegiatanId])->fetchAll(PDO::FETCH_ASSOC);
    }
}
