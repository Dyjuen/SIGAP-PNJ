<?php
namespace App\Models;
use App\Core\Model;
class TelaahTahapan extends Model {
    protected $table = 't_telaah_tahapan';
    protected $primaryKey = 'tahapan_id'; // 
    public function findByTelaah($telaah_id) {
        return $this->findAllBy('telaah_id', $telaah_id);
    }
}