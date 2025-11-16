<?php
namespace App\Models;
use App\Core\Model;

class KAKAnggaran extends Model {
    protected $table = 't_kak_anggaran';
    protected $primaryKey = 'anggaran_id';

    /**
     * Fungsi kustom untuk mengambil data berdasarkan kak_id
     * Kita gunakan method 'findAllBy' dari Core/Model.php 
     */
    public function findByKak($kak_id) {
        return $this->findAllBy('kak_id', $kak_id);
    }
}