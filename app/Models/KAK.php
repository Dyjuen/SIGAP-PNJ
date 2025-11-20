<?php
namespace App\Models;
use App\Core\Model;

class KAK extends Model {
    protected $table = 't_kak';
    protected $primaryKey = 'kak_id';

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
    
        /**
         * Mengambil semua data yang diperlukan untuk membuat PDF KAK dari kak_id.
         * Data ini diformat agar kompatibel dengan kak-template.php.
         */
            public function getDataForKAK($kakId) {
                // 1. Ambil data utama dari t_kak
                $sql = "SELECT t.*, u.nama_lengkap AS pengusul_nama, ks.nama_status
                        FROM t_kak t
                        LEFT JOIN m_users u ON t.pengusul_user_id = u.user_id
                        LEFT JOIN m_kegiatan_status ks ON t.status_id = ks.status_id
                        WHERE t.kak_id = ?";
                
                $kak = $this->query($sql, [$kakId])->fetch(\PDO::FETCH_ASSOC);
        
                if (!$kak) {
                    return false;
                }
        
                // 2. Ambil data dari tabel anak
                $childTables = [
                    'manfaat'   => "SELECT * FROM t_kak_manfaat WHERE kak_id = ?",
                    'tahapan'   => "SELECT * FROM t_kak_tahapan WHERE kak_id = ? ORDER BY urutan ASC",
                    'indikator' => "SELECT * FROM t_kak_indikator WHERE kak_id = ?",
                    'target'    => "SELECT * FROM t_kak_target WHERE kak_id = ?",
                    'iku'       => "SELECT tki.*, mi.kode_iku, mi.nama_iku 
                                    FROM t_kak_iku tki 
                                    LEFT JOIN m_iku mi ON tki.iku_id = mi.iku_id 
                                    WHERE tki.kak_id = ?",
                    'anggaran'  => "SELECT 
                                        tka.*, 
                                        s1.nama_satuan AS nama_satuan1,
                                        s2.nama_satuan AS nama_satuan2,
                                        s3.nama_satuan AS nama_satuan3
                                    FROM t_kak_anggaran tka
                                    LEFT JOIN m_satuan s1 ON tka.satuan1_id = s1.satuan_id
                                    LEFT JOIN m_satuan s2 ON tka.satuan2_id = s2.satuan_id
                                    LEFT JOIN m_satuan s3 ON tka.satuan3_id = s3.satuan_id
                                    WHERE tka.kak_id = ?",
                ];
        
                foreach ($childTables as $key => $childSql) {
                    $kak[$key] = $this->query($childSql, [$kakId])->fetchAll(\PDO::FETCH_ASSOC);
                }
                
                // Kembalikan data gabungan
                return $kak;
            }    }
    