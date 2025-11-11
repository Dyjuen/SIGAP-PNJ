<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class KegiatanLogStatus extends Model
{
    protected $table = 't_telaah_log_status';
    protected $primaryKey = 'log_id';

    /**
     * Get logs by kegiatan_id by joining through t_kegiatan and t_telaah
     */
    public function getByKegiatanId($kegiatanId)
    {
        $sql = "SELECT tls.*, u.nama_lengkap as actor_nama, s_lama.nama_status as status_lama, s_baru.nama_status as status_baru
                FROM t_telaah_log_status tls
                JOIN t_telaah t ON tls.telaah_id = t.telaah_id
                JOIN t_kegiatan k ON t.telaah_id = k.telaah_id
                JOIN m_users u ON tls.actor_user_id = u.user_id
                LEFT JOIN m_kegiatan_status s_lama ON tls.status_id_lama = s_lama.status_id
                JOIN m_kegiatan_status s_baru ON tls.status_id_baru = s_baru.status_id
                WHERE k.kegiatan_id = ?
                ORDER BY tls.timestamp ASC";
        
        return $this->query($sql, [$kegiatanId])->fetchAll(PDO::FETCH_ASSOC);
    }
}
