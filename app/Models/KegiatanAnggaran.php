<?php

namespace App\Models;

use App\Core\Database;

class KegiatanAnggaran
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Get all anggaran for a kegiatan
     */
    public function getByKegiatanId($kegiatanId)
    {
        $this->db->query("
            SELECT 
                ka.*,
                s.nama_satuan
            FROM t_kegiatan_anggaran ka
            LEFT JOIN m_satuan s ON ka.satuan_id = s.satuan_id
            WHERE ka.kegiatan_id = :kegiatan_id
            ORDER BY ka.anggaran_id
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->resultSet();
    }

    /**
     * Find anggaran by ID
     */
    public function findById($anggaranId)
    {
        $this->db->query("
            SELECT 
                ka.*,
                s.nama_satuan
            FROM t_kegiatan_anggaran ka
            LEFT JOIN m_satuan s ON ka.satuan_id = s.satuan_id
            WHERE ka.anggaran_id = :anggaran_id
        ");
        $this->db->bind(':anggaran_id', $anggaranId);
        return $this->db->single();
    }

    /**
     * Create anggaran item
     */
    public function create($data)
    {
        $this->db->query("
            INSERT INTO t_kegiatan_anggaran (
                kegiatan_id,
                uraian,
                volume,
                satuan_id,
                harga_satuan,
                jumlah_diusulkan,
                catatan
            ) VALUES (
                :kegiatan_id,
                :uraian,
                :volume,
                :satuan_id,
                :harga_satuan,
                :jumlah_diusulkan,
                :catatan
            )
        ");

        $this->db->bind(':kegiatan_id', $data['kegiatan_id']);
        $this->db->bind(':uraian', $data['uraian']);
        $this->db->bind(':volume', $data['volume']);
        $this->db->bind(':satuan_id', $data['satuan_id']);
        $this->db->bind(':harga_satuan', $data['harga_satuan']);
        $this->db->bind(':jumlah_diusulkan', $data['jumlah_diusulkan']);
        $this->db->bind(':catatan', $data['catatan'] ?? null);

        $this->db->execute();
        return $this->db->lastInsertId();
    }

    /**
     * Update anggaran item
     */
    public function update($anggaranId, $data)
    {
        $this->db->query("
            UPDATE t_kegiatan_anggaran SET
                uraian = :uraian,
                volume = :volume,
                satuan_id = :satuan_id,
                harga_satuan = :harga_satuan,
                jumlah_diusulkan = :jumlah_diusulkan,
                catatan = :catatan
            WHERE anggaran_id = :anggaran_id
        ");

        $this->db->bind(':uraian', $data['uraian']);
        $this->db->bind(':volume', $data['volume']);
        $this->db->bind(':satuan_id', $data['satuan_id']);
        $this->db->bind(':harga_satuan', $data['harga_satuan']);
        $this->db->bind(':jumlah_diusulkan', $data['jumlah_diusulkan']);
        $this->db->bind(':catatan', $data['catatan'] ?? null);
        $this->db->bind(':anggaran_id', $anggaranId);

        return $this->db->execute();
    }

    /**
     * Delete anggaran item
     */
    public function delete($anggaranId)
    {
        $this->db->query("DELETE FROM t_kegiatan_anggaran WHERE anggaran_id = :anggaran_id");
        $this->db->bind(':anggaran_id', $anggaranId);
        return $this->db->execute();
    }

    /**
     * Delete all anggaran for a kegiatan
     */
    public function deleteByKegiatanId($kegiatanId)
    {
        $this->db->query("DELETE FROM t_kegiatan_anggaran WHERE kegiatan_id = :kegiatan_id");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->execute();
    }

    /**
     * Calculate total anggaran for kegiatan
     */
    public function calculateTotal($kegiatanId)
    {
        $this->db->query("
            SELECT 
                SUM(jumlah_diusulkan) as total_diusulkan,
                SUM(jumlah_disetujui) as total_disetujui
            FROM t_kegiatan_anggaran
            WHERE kegiatan_id = :kegiatan_id
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->single();
    }
}