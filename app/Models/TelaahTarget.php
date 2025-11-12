<?php
namespace App\Models;
use App\Core\Model;
class TelaahTarget extends Model {
    protected $table = 't_telaah_target';
    protected $primaryKey = 'telaah_target_id'; // 
    public function findByTelaah($telaah_id) {
        return $this->findAllBy('telaah_id', $telaah_id);
    }
}