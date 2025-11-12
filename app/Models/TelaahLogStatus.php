<?php
namespace App\Models;
use App\Core\Model;
class TelaahLogStatus extends Model {
    protected $table = 't_telaah_log_status';
    protected $primaryKey = 'log_id'; // 
    public function findByTelaah($telaah_id) {
        return $this->findAllBy('telaah_id', $telaah_id);
    }
}