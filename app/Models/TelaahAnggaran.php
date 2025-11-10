<?php
namespace App\Models;
use App\Core\Model;

class TelaahAnggaran extends Model {
    protected $table = 't_telaah_anggaran';
    protected $primaryKey = 'anggaran_id'; // Sesuai sigap_pnj (3).sql 

    /**
     * Fungsi kustom untuk mengambil data berdasarkan telaah_id
     * Kita gunakan method 'findAllBy' dari Core/Model.php 
     */
    public function findByTelaah($telaah_id) {
        return $this->findAllBy('telaah_id', $telaah_id);
    }
}