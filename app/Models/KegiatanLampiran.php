<?php

namespace App\Models;

use App\Core\Database;

class KegiatanLampiran
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Get all lampiran for a kegiatan
     */
    public function getByKegiatanId($kegiatanId)
    {
        $this->db->query("
            SELECT 
                kl.*,
                u.nama_lengkap as uploader_nama,
                u.email as uploader_email
            FROM t_kegiatan_lampiran kl
            LEFT JOIN m_users u ON kl.uploader_user_id = u.user_id
            WHERE kl.kegiatan_id = :kegiatan_id
            ORDER BY kl.created_at DESC
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->resultSet();
    }

    /**
     * Find lampiran by ID
     */
    public function findById($lampiranId)
    {
        $this->db->query("
            SELECT 
                kl.*,
                u.nama_lengkap as uploader_nama,
                u.email as uploader_email
            FROM t_kegiatan_lampiran kl
            LEFT JOIN m_users u ON kl.uploader_user_id = u.user_id
            WHERE kl.lampiran_id = :lampiran_id
        ");
        $this->db->bind(':lampiran_id', $lampiranId);
        return $this->db->single();
    }

    /**
     * Create lampiran record
     */
    public function create($data)
    {
        $this->db->query("
            INSERT INTO t_kegiatan_lampiran (
                kegiatan_id,
                nama_file,
                file_path,
                file_size,
                mime_type,
                keterangan,
                uploader_user_id,
                created_at
            ) VALUES (
                :kegiatan_id,
                :nama_file,
                :file_path,
                :file_size,
                :mime_type,
                :keterangan,
                :uploader_user_id,
                NOW()
            )
        ");

        $this->db->bind(':kegiatan_id', $data['kegiatan_id']);
        $this->db->bind(':nama_file', $data['nama_file']);
        $this->db->bind(':file_path', $data['file_path']);
        $this->db->bind(':file_size', $data['file_size']);
        $this->db->bind(':mime_type', $data['mime_type']);
        $this->db->bind(':keterangan', $data['keterangan'] ?? null);
        $this->db->bind(':uploader_user_id', $data['uploader_user_id']);

        $this->db->execute();
        return $this->db->lastInsertId();
    }

    /**
     * Update lampiran keterangan
     */
    public function updateKeterangan($lampiranId, $keterangan)
    {
        $this->db->query("
            UPDATE t_kegiatan_lampiran 
            SET keterangan = :keterangan
            WHERE lampiran_id = :lampiran_id
        ");
        $this->db->bind(':keterangan', $keterangan);
        $this->db->bind(':lampiran_id', $lampiranId);
        return $this->db->execute();
    }

    /**
     * Delete lampiran
     */
    public function delete($lampiranId)
    {
        $this->db->query("DELETE FROM t_kegiatan_lampiran WHERE lampiran_id = :lampiran_id");
        $this->db->bind(':lampiran_id', $lampiranId);
        return $this->db->execute();
    }

    /**
     * Delete all lampiran for a kegiatan
     */
    public function deleteByKegiatanId($kegiatanId)
    {
        $this->db->query("DELETE FROM t_kegiatan_lampiran WHERE kegiatan_id = :kegiatan_id");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->execute();
    }

    /**
     * Count lampiran for a kegiatan
     */
    public function countByKegiatanId($kegiatanId)
    {
        $this->db->query("
            SELECT COUNT(*) as total 
            FROM t_kegiatan_lampiran 
            WHERE kegiatan_id = :kegiatan_id
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        $result = $this->db->single();
        return (int) $result['total'];
    }

    /**
     * Check if lampiran exists
     */
    public function exists($lampiranId)
    {
        $this->db->query("
            SELECT COUNT(*) as total 
            FROM t_kegiatan_lampiran 
            WHERE lampiran_id = :lampiran_id
        ");
        $this->db->bind(':lampiran_id', $lampiranId);
        $result = $this->db->single();
        return $result['total'] > 0;
    }

    /**
     * Get total file size for a kegiatan
     */
    public function getTotalFileSize($kegiatanId)
    {
        $this->db->query("
            SELECT SUM(file_size) as total_size
            FROM t_kegiatan_lampiran 
            WHERE kegiatan_id = :kegiatan_id
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        $result = $this->db->single();
        return (int) ($result['total_size'] ?? 0);
    }
}