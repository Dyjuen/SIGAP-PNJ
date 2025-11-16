<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class MediaPanduan extends Model
{
    protected $table = 'm_media_panduan';
    protected $primaryKey = 'media_id';

    public function getByType(string $tipe)
    {
        $sql = "SELECT * FROM {$this->table} WHERE tipe = ? ORDER BY media_id ASC";
        return $this->query($sql, [$tipe])->fetchAll(PDO::FETCH_ASSOC);
    }
}
