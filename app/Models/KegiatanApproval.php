<?php

namespace App\Models;

use App\Core\Model;

class KegiatanApproval extends Model
{
    protected $table = 't_kegiatan_approval';

    /**
     * Find the latest note for a given kegiatan ID and approval level.
     *
     * @param int $kegiatanId The ID of the kegiatan.
     * @param string $level The approval level (e.g., 'PPK').
     * @return array|false The approval record or false if not found.
     */
    public function findCatatanByKegiatanIdAndLevel($kegiatanId, $level)
    {
        $sql = "SELECT catatan, updated_at 
                FROM {$this->table} 
                WHERE kegiatan_id = :kegiatan_id 
                AND approval_level = :approval_level 
                AND catatan IS NOT NULL
                ORDER BY updated_at DESC 
                LIMIT 1";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'kegiatan_id' => $kegiatanId,
            'approval_level' => $level
        ]);
        
        return $stmt->fetch();
    }
}
