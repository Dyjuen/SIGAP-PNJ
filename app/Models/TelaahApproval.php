<?php
namespace App\Models;
use App\Core\Model;
class TelaahApproval extends Model {
    protected $table = 't_telaah_approval';
    protected $primaryKey = 'approval_telaah_id'; // 
    public function findByTelaah($telaah_id) {
        return $this->findAllBy('telaah_id', $telaah_id);
    }
}