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
                // 1. Ambil data utama dari t_kak dan join ke tabel master
                $sql = "
                    SELECT
                        t.kak_id,
                        t.nama_kegiatan,
                        t.deskripsi_kegiatan,
                        t.tanggal_mulai,
                        t.tanggal_selesai,
                        t.lokasi,
                                        u.nama_lengkap AS pengusul_nama,
                                        ks.nama_status,
                                        ma.nama_sumber_dana,
                                        ma.kode_anggaran,
                                        iku.kode_iku,
                                        iku.nama_iku                    FROM t_kak t
                    LEFT JOIN m_users u ON t.pengusul_user_id = u.user_id
                    LEFT JOIN m_kegiatan_status ks ON t.status_id = ks.status_id
                    LEFT JOIN m_mata_anggaran ma ON t.mata_anggaran_id = ma.mata_anggaran_id
                    LEFT JOIN (
                        SELECT kak_id, MIN(iku_id) as iku_id
                        FROM t_kak_iku
                        GROUP BY kak_id
                    ) ti ON t.kak_id = ti.kak_id
                    LEFT JOIN m_iku iku ON ti.iku_id = iku.iku_id
                    WHERE t.kak_id = ?
                ";
                
                $kak = $this->query($sql, [$kakId])->fetch(\PDO::FETCH_ASSOC);
        
                if (!$kak) {
                    return false;
                }
        
                // 2. Ambil rincian anggaran dari t_kak_anggaran
                                $sqlAnggaran = "
                                    SELECT
                                        ta.uraian,
                                        ta.volume1 AS volume,
                                        ta.harga_satuan,
                                        ta.jumlah_diusulkan,
                                        s.nama_satuan
                                    FROM t_kak_anggaran ta
                                    LEFT JOIN m_satuan s ON ta.satuan1_id = s.satuan_id
                                    WHERE ta.kak_id = ?
                                    ORDER BY ta.anggaran_id ASC
                                ";
                                $anggaranItems = $this->query($sqlAnggaran, [$kakId])->fetchAll(\PDO::FETCH_ASSOC);
                                $kak['anggaran_items'] = $anggaranItems;
                        
                                // 3. Hitung total anggaran dari item
                                $totalDiusulkan = 0;
                                foreach ($anggaranItems as $item) {
                                    $totalDiusulkan += $item['jumlah_diusulkan'];
                                }
                                $kak['total_anggaran_diusulkan'] = $totalDiusulkan;
                                $kak['total_anggaran_disetujui'] = null; // Kolom ini tidak ada lagi
                        
                        
                                        // 4. Ambil lampiran dari t_kegiatan_lampiran melalui t_kak_anggaran
                        
                        
                                        $sqlLampiran = "
                        
                        
                                            SELECT DISTINCT
                        
                        
                                                kl.nama_file_asli,
                        
                        
                                                kl.tipe_file,
                        
                        
                                                kl.created_at,
                        
                        
                                                kl.lampiran_id
                        
                        
                                            FROM t_kegiatan_lampiran kl
                        
                        
                                            INNER JOIN t_kak_anggaran ta ON kl.anggaran_id = ta.anggaran_id
                        
                        
                                            WHERE ta.kak_id = ?
                        
                        
                                            ORDER BY kl.lampiran_id ASC
                        
                        
                                        ";
                        
                        
                                        $lampiran = $this->query($sqlLampiran, [$kakId])->fetchAll(\PDO::FETCH_ASSOC);
                        
                        
                                        $kak['lampiran'] = $lampiran;
                        
                        
                                
                        
                        
                                        // 5. Kembalikan data gabungan
                        
                        
                                        return $kak;
                        
                        
                                    }    }
    