<?php
namespace App\Models;
use App\Core\Model;

class Telaah extends Model {
    protected $table = 't_telaah';
    protected $primaryKey = 'telaah_id'; // Sesuai sigap_pnj (3).sql

    /**
     * Fungsi kustom untuk mengambil data berdasarkan user_id
     */
    public function findByUser($user_id) {
        // query() adalah method dari Core/Model.php
        $sql = "SELECT * FROM {$this->table} WHERE user_id = ? ORDER BY created_at DESC";
        return $this->query($sql, [$user_id])->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    /**
     * Fungsi kustom untuk mengambil data berdasarkan status_id
     */
    public function findByStatus($status_id) {
        $sql = "SELECT * FROM {$this->table} WHERE status_id = ? ORDER BY created_at DESC";
        return $this->query($sql, [$status_id])->fetchAll(\PDO::FETCH_ASSOC);
    }
}