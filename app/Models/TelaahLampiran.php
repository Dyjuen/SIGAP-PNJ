<?php
namespace App\Models;
use App\Core\Model;

class TelaahLampiran extends Model {
    protected $table = 't_telaah_lampiran';

    /**
     * Cari semua lampiran berdasarkan ID telaah.
     */
    public function findByTelaah($telaah_id) {
        return $this->query("SELECT * FROM {$this->table} WHERE t_telaah_id = ?", [$telaah_id]);
    }
}