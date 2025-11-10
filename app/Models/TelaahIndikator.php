<?php
namespace App\Models;
use App\Core\Model;
class TelaahIndikator extends Model {
    protected $table = 't_telaah_indikator';
    protected $primaryKey = 'indikator_id'; // 
    public function findByTelaah($telaah_id) {
        return $this->findAllBy('telaah_id', $telaah_id);
    }
}