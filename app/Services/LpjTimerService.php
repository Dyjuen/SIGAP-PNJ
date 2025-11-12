<?php

namespace App\Services;

use App\Core\Database;
use App\Models\Kegiatan;
use App\Models\Notifikasi;
use DateTime;

class LpjTimerService
{
    private $db;
    private $kegiatanModel;
    private $notifikasiModel;
    
    // Durasi deadline LPJ (14 hari)
    const LPJ_DEADLINE_DAYS = 14;
    
    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->kegiatanModel = new Kegiatan();
        $this->notifikasiModel = new Notifikasi();
    }

    /**
     * Start timer LPJ setelah bendahara approve pencairan
     * Dipanggil saat approval level 'Bendahara-Cair' disetujui
     */
    public function startLpjTimer(int $kegiatanId): bool
    {
        $now = new DateTime();
        $deadline = clone $now;
        $deadline->modify('+' . self::LPJ_DEADLINE_DAYS . ' days');

        $sql = "UPDATE t_kegiatan 
                SET tgl_batas_lpj = :deadline
                WHERE kegiatan_id = :kegiatan_id";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'deadline' => $deadline->format('Y-m-d H:i:s'),
            'kegiatan_id' => $kegiatanId
        ]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Mark LPJ sebagai submitted
     */
    public function markLpjSubmitted(int $kegiatanId): bool
    {
        $sql = "UPDATE t_kegiatan 
                SET lpj_submitted_at = :submitted_at
                WHERE kegiatan_id = :kegiatan_id";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            'submitted_at' => date('Y-m-d H:i:s'),
            'kegiatan_id' => $kegiatanId
        ]);
        return $stmt->rowCount() > 0;
    }

    /**
     * Check dan kirim reminder untuk semua kegiatan yang perlu diingatkan
     * Function ini dipanggil secara periodik (cron job atau manual trigger)
     */
    public function checkAndSendReminders(): array
    {
        $results = [
            'h7_sent' => 0,
            'h3_sent' => 0,
            'h1_sent' => 0,
            'overdue_sent' => 0
        ];

        // Get kegiatan yang perlu reminder
        $kegiatan = $this->getKegiatanNeedingReminders();

        foreach ($kegiatan as $k) {
            $daysLeft = $this->getDaysUntilDeadline($k['tgl_batas_lpj']);
            
            // H-7
            if ($daysLeft <= 7 && $daysLeft > 6 && !$k['lpj_reminder_h7_sent']) {
                $this->sendReminder($k, 7);
                $this->markReminderSent($k['kegiatan_id'], 'h7');
                $results['h7_sent']++;
            }
            
            // H-3
            if ($daysLeft <= 3 && $daysLeft > 2 && !$k['lpj_reminder_h3_sent']) {
                $this->sendReminder($k, 3);
                $this->markReminderSent($k['kegiatan_id'], 'h3');
                $results['h3_sent']++;
            }
            
            // H-1
            if ($daysLeft <= 1 && $daysLeft > 0 && !$k['lpj_reminder_h1_sent']) {
                $this->sendReminder($k, 1);
                $this->markReminderSent($k['kegiatan_id'], 'h1');
                $results['h1_sent']++;
            }
            
            // Overdue
            if ($daysLeft < 0 && !$k['lpj_overdue_notified']) {
                $this->sendOverdueNotification($k);
                $this->markOverdueNotified($k['kegiatan_id']);
                $results['overdue_sent']++;
            }
        }

        return $results;
    }

    /**
     * Get kegiatan yang perlu diingatkan
     */
    private function getKegiatanNeedingReminders(): array
    {
        $sql = "SELECT k.kegiatan_id, k.nama_kegiatan, k.tgl_batas_lpj,
                       k.lpj_reminder_h7_sent, k.lpj_reminder_h3_sent,
                       k.lpj_reminder_h1_sent, k.lpj_overdue_notified,
                       k.pengusul_user_id
                FROM t_kegiatan k
                WHERE k.bendahara_cair_approved_at IS NOT NULL
                  AND k.lpj_submitted_at IS NULL
                  AND k.tgl_batas_lpj IS NOT NULL";

        return $this->db->query($sql)->fetchAll();
    }

    /**
     * Hitung hari tersisa sampai deadline
     */
    private function getDaysUntilDeadline(string $deadline): int
    {
        $now = new DateTime();
        $deadlineDate = new DateTime($deadline);
        $diff = $now->diff($deadlineDate);
        
        return $diff->invert ? -$diff->days : $diff->days;
    }

    /**
     * Kirim reminder notification
     */
    private function sendReminder(array $kegiatan, int $daysLeft): void
    {
        $pesan = "Reminder: Anda memiliki {$daysLeft} hari untuk submit LPJ untuk kegiatan \"{$kegiatan['nama_kegiatan']}\"";
        
        $this->notifikasiModel->create([
            'penerima_user_id' => $kegiatan['pengusul_user_id'],
            'pesan' => $pesan,
            'link_tujuan' => '/pengusul/kegiatan/' . $kegiatan['kegiatan_id'] . '/lpj',
            'is_read' => false
        ]);
    }

    /**
     * Kirim notifikasi overdue
     */
    private function sendOverdueNotification(array $kegiatan): void
    {
        $daysOverdue = abs($this->getDaysUntilDeadline($kegiatan['tgl_batas_lpj']));
        $pesan = "PERINGATAN: Anda terlambat {$daysOverdue} hari submit LPJ untuk kegiatan \"{$kegiatan['nama_kegiatan']}\"";
        
        $this->notifikasiModel->create([
            'penerima_user_id' => $kegiatan['pengusul_user_id'],
            'pesan' => $pesan,
            'link_tujuan' => '/pengusul/kegiatan/' . $kegiatan['kegiatan_id'] . '/lpj',
            'is_read' => false
        ]);
    }

    /**
     * Mark reminder sebagai sudah dikirim
     */
    private function markReminderSent(int $kegiatanId, string $type): void
    {
        $column = "lpj_reminder_{$type}_sent";
        $sql = "UPDATE t_kegiatan SET {$column} = 1 WHERE kegiatan_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $kegiatanId]);
    }

    /**
     * Mark overdue notification sudah dikirim
     */
    private function markOverdueNotified(int $kegiatanId): void
    {
        $sql = "UPDATE t_kegiatan SET lpj_overdue_notified = 1 WHERE kegiatan_id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $kegiatanId]);
    }

    /**
     * Get status LPJ untuk kegiatan tertentu
     */
    public function getLpjStatus(int $kegiatanId): array
    {
        $sql = "SELECT bendahara_cair_approved_at, tgl_batas_lpj, 
                       lpj_submitted_at
                FROM t_kegiatan 
                WHERE kegiatan_id = :id";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $kegiatanId]);
        $result = $stmt->fetch();
        
        if (!$result || !$result['tgl_batas_lpj']) {
            return [
                'status' => 'not_started',
                'message' => 'Timer LPJ belum dimulai'
            ];
        }

        if ($result['lpj_submitted_at']) {
            return [
                'status' => 'submitted',
                'message' => 'LPJ sudah disubmit',
                'submitted_at' => $result['lpj_submitted_at']
            ];
        }

        $daysLeft = $this->getDaysUntilDeadline($result['tgl_batas_lpj']);
        
        if ($daysLeft < 0) {
            return [
                'status' => 'overdue',
                'message' => 'Terlambat ' . abs($daysLeft) . ' hari',
                'deadline' => $result['tgl_batas_lpj'],
                'days_overdue' => abs($daysLeft)
            ];
        }

        return [
            'status' => 'active',
            'message' => "Sisa waktu: {$daysLeft} hari",
            'deadline' => $result['tgl_batas_lpj'],
            'days_left' => $daysLeft
        ];
    }
}