<?php

namespace App\Models;

use App\Core\Model;

class Notifikasi extends Model
{
    protected $table = 't_notifikasi';
    protected $primaryKey = 'notifikasi_id';

    /**
     * Create notifikasi baru
     */
    public function create(array $data): bool
    {
        $sql = "INSERT INTO {$this->table} 
                (penerima_user_id, pesan, link_tujuan, is_read, created_at) 
                VALUES 
                (:penerima_user_id, :pesan, :link_tujuan, :is_read, NOW())";

        return $this->db->query($sql, [
            'penerima_user_id' => $data['penerima_user_id'],
            'pesan' => $data['pesan'],
            'link_tujuan' => $data['link_tujuan'] ?? null,
            'is_read' => $data['is_read'] ?? false
        ])->rowCount() > 0;
    }

    /**
     * Get notifikasi untuk user tertentu
     */
    public function getByUser(int $userId, bool $unreadOnly = false): array
    {
        $sql = "SELECT * FROM {$this->table} 
                WHERE penerima_user_id = :user_id";
        
        if ($unreadOnly) {
            $sql .= " AND is_read = 0";
        }
        
        $sql .= " ORDER BY created_at DESC LIMIT 50";

        return $this->db->query($sql, ['user_id' => $userId])->fetchAll();
    }

    /**
     * Mark notifikasi sebagai dibaca
     */
    public function markAsRead(int $notifikasiId): bool
    {
        $sql = "UPDATE {$this->table} 
                SET is_read = 1 
                WHERE notifikasi_id = :id";

        return $this->db->query($sql, ['id' => $notifikasiId])->rowCount() > 0;
    }

    /**
     * Mark semua notifikasi user sebagai dibaca
     */
    public function markAllAsRead(int $userId): bool
    {
        $sql = "UPDATE {$this->table} 
                SET is_read = 1 
                WHERE penerima_user_id = :user_id AND is_read = 0";

        return $this->db->query($sql, ['user_id' => $userId])->rowCount() > 0;
    }

    /**
     * Get jumlah notifikasi belum dibaca
     */
    public function getUnreadCount(int $userId): int
    {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} 
                WHERE penerima_user_id = :user_id AND is_read = 0";

        $result = $this->db->query($sql, ['user_id' => $userId])->fetch();

        return (int)($result['total'] ?? 0);
    }

    /**
     * Delete notifikasi
     */
    public function deleteNotifikasi(int $notifikasiId): bool
    {
        return $this->delete($notifikasiId);
    }

    /**
     * Delete notifikasi lama (lebih dari 30 hari)
     */
    public function deleteOldNotifications(): int
    {
        $sql = "DELETE FROM {$this->table} 
                WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)";

        return $this->db->query($sql)->rowCount();
    }
}