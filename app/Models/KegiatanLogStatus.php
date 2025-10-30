<?php

namespace App\Models;

use App\Core\Database;

class KegiatanLogStatus
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Get all logs for a kegiatan
     */
    public function getByKegiatanId($kegiatanId)
    {
        $this->db->query("
            SELECT 
                kls.*,
                ks.nama_status,
                u.nama_lengkap as user_nama,
                u.email as user_email
            FROM t_kegiatan_log_status kls
            LEFT JOIN m_kegiatan_status ks ON kls.status_id = ks.status_id
            LEFT JOIN m_users u ON kls.user_id = u.user_id
            WHERE kls.kegiatan_id = :kegiatan_id
            ORDER BY kls.created_at DESC
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->resultSet();
    }

    /**
     * Find log by ID
     */
    public function findById($logId)
    {
        $this->db->query("
            SELECT 
                kls.*,
                ks.nama_status,
                u.nama_lengkap as user_nama
            FROM t_kegiatan_log_status kls
            LEFT JOIN m_kegiatan_status ks ON kls.status_id = ks.status_id
            LEFT JOIN m_users u ON kls.user_id = u.user_id
            WHERE kls.log_id = :log_id
        ");
        $this->db->bind(':log_id', $logId);
        return $this->db->single();
    }

    /**
     * Create log entry
     */
    public function create($data)
    {
        $this->db->query("
            INSERT INTO t_kegiatan_log_status (
                kegiatan_id,
                status_id,
                user_id,
                keterangan,
                created_at
            ) VALUES (
                :kegiatan_id,
                :status_id,
                :user_id,
                :keterangan,
                NOW()
            )
        ");

        $this->db->bind(':kegiatan_id', $data['kegiatan_id']);
        $this->db->bind(':status_id', $data['status_id']);
        $this->db->bind(':user_id', $data['user_id']);
        $this->db->bind(':keterangan', $data['keterangan'] ?? null);

        $this->db->execute();
        return $this->db->lastInsertId();
    }

    /**
     * Get latest log for a kegiatan
     */
    public function getLatestByKegiatanId($kegiatanId)
    {
        $this->db->query("
            SELECT 
                kls.*,
                ks.nama_status,
                u.nama_lengkap as user_nama
            FROM t_kegiatan_log_status kls
            LEFT JOIN m_kegiatan_status ks ON kls.status_id = ks.status_id
            LEFT JOIN m_users u ON kls.user_id = u.user_id
            WHERE kls.kegiatan_id = :kegiatan_id
            ORDER BY kls.created_at DESC
            LIMIT 1
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->single();
    }

    /**
     * Get logs by status
     */
    public function getByStatus($kegiatanId, $statusId)
    {
        $this->db->query("
            SELECT 
                kls.*,
                u.nama_lengkap as user_nama
            FROM t_kegiatan_log_status kls
            LEFT JOIN m_users u ON kls.user_id = u.user_id
            WHERE kls.kegiatan_id = :kegiatan_id 
            AND kls.status_id = :status_id
            ORDER BY kls.created_at DESC
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        $this->db->bind(':status_id', $statusId);
        return $this->db->resultSet();
    }

    /**
     * Count logs for a kegiatan
     */
    public function countByKegiatanId($kegiatanId)
    {
        $this->db->query("
            SELECT COUNT(*) as total 
            FROM t_kegiatan_log_status 
            WHERE kegiatan_id = :kegiatan_id
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        $result = $this->db->single();
        return (int) $result['total'];
    }

    /**
     * Delete all logs for a kegiatan
     */
    public function deleteByKegiatanId($kegiatanId)
    {
        $this->db->query("DELETE FROM t_kegiatan_log_status WHERE kegiatan_id = :kegiatan_id");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->execute();
    }

    /**
     * Get status timeline with duration
     */
    public function getTimeline($kegiatanId)
    {
        $this->db->query("
            SELECT 
                kls.*,
                ks.nama_status,
                u.nama_lengkap as user_nama,
                TIMESTAMPDIFF(HOUR, kls.created_at, 
                    COALESCE(
                        (SELECT created_at FROM t_kegiatan_log_status 
                         WHERE kegiatan_id = kls.kegiatan_id 
                         AND created_at > kls.created_at 
                         ORDER BY created_at ASC LIMIT 1),
                        NOW()
                    )
                ) as duration_hours
            FROM t_kegiatan_log_status kls
            LEFT JOIN m_kegiatan_status ks ON kls.status_id = ks.status_id
            LEFT JOIN m_users u ON kls.user_id = u.user_id
            WHERE kls.kegiatan_id = :kegiatan_id
            ORDER BY kls.created_at ASC
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        return $this->db->resultSet();
    }
}