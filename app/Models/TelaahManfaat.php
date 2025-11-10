<?php
namespace App\Models;
use App\Core\Model;
class TelaahManfaat extends Model {
    protected $table = 't_telaah_manfaat';
    protected $primaryKey = 'manfaat_id'; // 
    public function findByTelaah($telaah_id) {
        return $this->findAllBy('telaah_id', $telaah_id);
    }
}