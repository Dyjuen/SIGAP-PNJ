<?php

namespace App\Models;

use App\Core\Database;

class Kegiatan
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Find kegiatan by ID
     */
    public function findById($kegiatanId)
    {
        $this->db->query("
            SELECT 
                k.*,
                uk.nama_unit_kerja,
                uk.kode_unit,
                ma.kode_anggaran,
                ma.nama_sumber_dana,
                ks.nama_status,
                u.nama_lengkap as pengusul_nama,
                u.email as pengusul_email,
                iku.kode_iku,
                iku.nama_iku
            FROM t_kegiatan k
            LEFT JOIN m_unit_kerja uk ON k.unit_kerja_id = uk.unit_kerja_id
            LEFT JOIN m_mata_anggaran ma ON k.mata_anggaran_id = ma.mata_anggaran_id
            LEFT JOIN m_kegiatan_status ks ON k.status_id = ks.status_id
            LEFT JOIN m_users u ON k.pengusul_user_id = u.user_id
            LEFT JOIN m_iku iku ON k.iku_id = iku.iku_id
            WHERE k.kegiatan_id = :kegiatan_id
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->single();
    }

    /**
     * Get kegiatan lengkap dengan anggaran (untuk PDF)
     */
    public function getKegiatanForPDF($kegiatanId)
    {
        // Get kegiatan data
        $kegiatan = $this->findById($kegiatanId);
        
        if (!$kegiatan) {
            return null;
        }

        // Get anggaran items
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
        $kegiatan['anggaran_items'] = $this->db->resultSet();

        // Get lampiran
        $this->db->query("
            SELECT 
                kl.*,
                u.nama_lengkap as uploader_nama
            FROM t_kegiatan_lampiran kl
            LEFT JOIN m_users u ON kl.uploader_user_id = u.user_id
            WHERE kl.kegiatan_id = :kegiatan_id
            ORDER BY kl.created_at
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        $kegiatan['lampiran'] = $this->db->resultSet();

        return $kegiatan;
    }

    /**
     * Get all kegiatan
     */
    public function getAll()
    {
        $this->db->query("
            SELECT 
                k.*,
                uk.nama_unit_kerja,
                ks.nama_status,
                u.nama_lengkap as pengusul_nama
            FROM t_kegiatan k
            LEFT JOIN m_unit_kerja uk ON k.unit_kerja_id = uk.unit_kerja_id
            LEFT JOIN m_kegiatan_status ks ON k.status_id = ks.status_id
            LEFT JOIN m_users u ON k.pengusul_user_id = u.user_id
            ORDER BY k.created_at DESC
        ");
        return $this->db->resultSet();
    }

    /**
     * Get kegiatan by user ID
     */
    public function getByUserId($userId)
    {
        $this->db->query("
            SELECT 
                k.*,
                uk.nama_unit_kerja,
                ks.nama_status
            FROM t_kegiatan k
            LEFT JOIN m_unit_kerja uk ON k.unit_kerja_id = uk.unit_kerja_id
            LEFT JOIN m_kegiatan_status ks ON k.status_id = ks.status_id
            WHERE k.pengusul_user_id = :user_id
            ORDER BY k.created_at DESC
        ");
        $this->db->bind(':user_id', $userId);
        return $this->db->resultSet();
    }

    /**
     * Create kegiatan
     */
    public function create($data)
    {
        $this->db->query("
            INSERT INTO t_kegiatan (
                nama_kegiatan, 
                deskripsi_kegiatan, 
                iku_id,
                tanggal_mulai, 
                tanggal_selesai, 
                lokasi,
                total_anggaran_diusulkan,
                pengusul_user_id,
                unit_kerja_id,
                mata_anggaran_id,
                status_id,
                created_at
            ) VALUES (
                :nama_kegiatan,
                :deskripsi_kegiatan,
                :iku_id,
                :tanggal_mulai,
                :tanggal_selesai,
                :lokasi,
                :total_anggaran_diusulkan,
                :pengusul_user_id,
                :unit_kerja_id,
                :mata_anggaran_id,
                :status_id,
                NOW()
            )
        ");

        $this->db->bind(':nama_kegiatan', $data['nama_kegiatan']);
        $this->db->bind(':deskripsi_kegiatan', $data['deskripsi_kegiatan']);
        $this->db->bind(':iku_id', $data['iku_id'] ?? null);
        $this->db->bind(':tanggal_mulai', $data['tanggal_mulai']);
        $this->db->bind(':tanggal_selesai', $data['tanggal_selesai']);
        $this->db->bind(':lokasi', $data['lokasi']);
        $this->db->bind(':total_anggaran_diusulkan', $data['total_anggaran_diusulkan']);
        $this->db->bind(':pengusul_user_id', $data['pengusul_user_id']);
        $this->db->bind(':unit_kerja_id', $data['unit_kerja_id']);
        $this->db->bind(':mata_anggaran_id', $data['mata_anggaran_id']);
        $this->db->bind(':status_id', $data['status_id']);

        $this->db->execute();
        return $this->db->lastInsertId();
    }

    /**
     * Update kegiatan
     */
    public function update($kegiatanId, $data)
    {
        $this->db->query("
            UPDATE t_kegiatan SET
                nama_kegiatan = :nama_kegiatan,
                deskripsi_kegiatan = :deskripsi_kegiatan,
                iku_id = :iku_id,
                tanggal_mulai = :tanggal_mulai,
                tanggal_selesai = :tanggal_selesai,
                lokasi = :lokasi,
                total_anggaran_diusulkan = :total_anggaran_diusulkan,
                updated_at = NOW()
            WHERE kegiatan_id = :kegiatan_id
        ");

        $this->db->bind(':nama_kegiatan', $data['nama_kegiatan']);
        $this->db->bind(':deskripsi_kegiatan', $data['deskripsi_kegiatan']);
        $this->db->bind(':iku_id', $data['iku_id'] ?? null);
        $this->db->bind(':tanggal_mulai', $data['tanggal_mulai']);
        $this->db->bind(':tanggal_selesai', $data['tanggal_selesai']);
        $this->db->bind(':lokasi', $data['lokasi']);
        $this->db->bind(':total_anggaran_diusulkan', $data['total_anggaran_diusulkan']);
        $this->db->bind(':kegiatan_id', $kegiatanId);

        return $this->db->execute();
    }

    /**
     * Delete kegiatan
     */
    public function delete($kegiatanId)
    {
        $this->db->query("DELETE FROM t_kegiatan WHERE kegiatan_id = :kegiatan_id");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->execute();
    }

    /**
     * Update status kegiatan
     */
    public function updateStatus($kegiatanId, $statusId)
    {
        $this->db->query("
            UPDATE t_kegiatan 
            SET status_id = :status_id, updated_at = NOW()
            WHERE kegiatan_id = :kegiatan_id
        ");
        $this->db->bind(':status_id', $statusId);
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->execute();
    }

    /**
     * Check if kegiatan exists
     */
    public function exists($kegiatanId)
    {
        $this->db->query("SELECT COUNT(*) as total FROM t_kegiatan WHERE kegiatan_id = :kegiatan_id");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        $result = $this->db->single();
        return $result['total'] > 0;
    }
}