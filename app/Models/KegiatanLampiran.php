<?php

namespace App\Models;

use App\Core\Model;
use PDO;

class KegiatanLampiran extends Model
{
    protected $table = 't_telaah_lampiran';
    protected $primaryKey = 'lampiran_id';
}
