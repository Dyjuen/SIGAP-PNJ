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
                u.nama_lengkap as uploader_nama
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
                u.nama_lengkap as uploader_nama
            FROM t_kegiatan_lampiran kl
            LEFT JOIN m_users u ON kl.uploader_user_id = u.user_id
            WHERE kl.lampiran_id = :lampiran_id
        ");
        $this->db->bind(':lampiran_id', $lampiranId);
        return $this->db->single();
    }

    /**
     * Create lampiran
     */
    public function create($data)
    {
        $this->db->query("
            INSERT INTO t_kegiatan_lampiran (
                kegiatan_id,
                nama_file_asli,
                path_file_disimpan,
                tipe_file,
                uploader_user_id,
                created_at
            ) VALUES (
                :kegiatan_id,
                :nama_file_asli,
                :path_file_disimpan,
                :tipe_file,
                :uploader_user_id,
                NOW()
            )
        ");

        $this->db->bind(':kegiatan_id', $data['kegiatan_id']);
        $this->db->bind(':nama_file_asli', $data['nama_file_asli']);
        $this->db->bind(':path_file_disimpan', $data['path_file_disimpan']);
        $this->db->bind(':tipe_file', $data['tipe_file']);
        $this->db->bind(':uploader_user_id', $data['uploader_user_id']);

        $this->db->execute();
        return $this->db->lastInsertId();
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
}