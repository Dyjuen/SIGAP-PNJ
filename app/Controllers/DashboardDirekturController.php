<?php

namespace App\Controllers;

use App\Core\Response;
use App\Core\Database;
use App\Middlewares\AuthMiddleware;

class DashboardDirekturController
{
    private $db;
    private $userData;

    public function __construct()
    {
        $this->db = Database::getInstance();

        // Get authenticated user
        try {
            $this->userData = AuthMiddleware::getAuthUser();
        } catch (\Exception $e) {
            $this->userData = null;
        }
    }

    /**
     * Get complete dashboard data
     * GET /api/dashboard/direktur
     */
    public function index()
    {
        try {
            if (!$this->userData) {
                Response::unauthorized('User tidak terautentikasi.');
                return;
            }

            // Get time range from query params (default: 6 months)
            $period = $_GET['period'] ?? '6months';
            $startDate = $this->getStartDate($period);

            $data = [
                'overview' => $this->getOverview($startDate),
                'by_jurusan' => $this->getByJurusan($startDate),
                'trends' => $this->getTrends($startDate),
                'recent_activities' => $this->getRecentActivities(10),
                'videos' => $this->getVideos(),
                'period' => $period,
                'start_date' => $startDate,
                'end_date' => date('Y-m-d')
            ];

            Response::success($data, 'Data dashboard direktur berhasil diambil.');
        } catch (\Exception $e) {
            Response::error('Gagal mengambil data dashboard: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get tutorial videos
     */
    private function getVideos()
    {
        $panduanModel = new \App\Models\Panduan();
        $role_id = $this->userData['role_id'] ?? null;
        $userRoles = $this->userData['roles'] ?? [];

        if (in_array('Admin', $userRoles)) {
             $panduan = $panduanModel->findAll();
        } else {
             $panduan = $panduanModel->findByRole($role_id);
        }

        $videos = [];
        foreach ($panduan as $item) {
            $isVideo = false;
            if (empty($item['tipe_media']) || is_null($item['tipe_media'])) {
                if (!empty($item['path_media'])) {
                    if (filter_var($item['path_media'], FILTER_VALIDATE_URL) || 
                        strpos($item['path_media'], 'youtube.com') !== false || 
                        strpos($item['path_media'], 'youtu.be') !== false) {
                        $isVideo = true;
                    }
                }
            } elseif ($item['tipe_media'] === 'video') {
                $isVideo = true;
            }

            if ($isVideo) {
                $videos[] = [
                    'title' => $item['judul_panduan'],
                    'url' => $item['path_media'],
                    'thumbnail' => null
                ];
            }
        }
        return $videos;
    }

    /**
     * Get overview statistics
     */
    private function getOverview($startDate)
    {
        // Total KAK yang diajukan (exclude status_id = 4/Ditolak)
        $this->db->query("
            SELECT COUNT(*) as total
            FROM t_kak
            WHERE status_id != 4
            AND created_at >= :start_date
        ");
        $this->db->bind(':start_date', $startDate);
        $totalKak = $this->db->single()['total'];

        // Kegiatan selesai (LPJ approved)
        $this->db->query("
            SELECT COUNT(DISTINCT k.kegiatan_id) as total
            FROM t_kegiatan k
            JOIN t_kak t ON k.kak_id = t.kak_id
            WHERE EXISTS (
                SELECT 1 FROM t_kegiatan_approval
                WHERE kegiatan_id = k.kegiatan_id
                AND approval_level = 'Bendahara-Setor'
                AND status = 'Disetujui'
            )
            AND t.created_at >= :start_date
        ");
        $this->db->bind(':start_date', $startDate);
        $kegiatanSelesai = $this->db->single()['total'];

        // Kegiatan berlangsung (NOT LPJ approved yet)
        $this->db->query("
            SELECT COUNT(DISTINCT k.kegiatan_id) as total
            FROM t_kegiatan k
            JOIN t_kak t ON k.kak_id = t.kak_id
            WHERE NOT EXISTS (
                SELECT 1 FROM t_kegiatan_approval
                WHERE kegiatan_id = k.kegiatan_id
                AND approval_level = 'Bendahara-Setor'
                AND status = 'Disetujui'
            )
            AND t.created_at >= :start_date
        ");
        $this->db->bind(':start_date', $startDate);
        $kegiatanBerlangsung = $this->db->single()['total'];

        // Total Dana Diminta
        $this->db->query("
            SELECT COALESCE(SUM(jumlah_diusulkan), 0) as total
            FROM t_kak_anggaran tka
            JOIN t_kak t ON tka.kak_id = t.kak_id
            WHERE t.status_id != 4
            AND t.created_at >= :start_date
        ");
        $this->db->bind(':start_date', $startDate);
        $danaDiminta = $this->db->single()['total'];

        // Total Dana Terserap (calculated)
        $danaTerserap = $this->getTotalDanaTerserap($startDate);

        // Calculate percentage
        $persentaseSerapan = $danaDiminta > 0
            ? round(($danaTerserap / $danaDiminta) * 100, 2)
            : 0;

        // Growth comparison (vs previous period)
        $growth = $this->calculateGrowth($startDate);

        return [
            'total_kak' => (int) $totalKak,
            'kegiatan_selesai' => (int) $kegiatanSelesai,
            'kegiatan_berlangsung' => (int) $kegiatanBerlangsung,
            'total_kegiatan' => (int) ($kegiatanSelesai + $kegiatanBerlangsung),
            'dana_diminta' => (float) $danaDiminta,
            'dana_terserap' => (float) $danaTerserap,
            'persentase_serapan' => (float) $persentaseSerapan,
            'growth_vs_previous' => $growth
        ];
    }

    /**
     * Get data by jurusan
     */
    private function getByJurusan($startDate)
    {
        // Get all users with their jurusan
        $this->db->query("
            SELECT user_id, nama_lengkap, email
            FROM m_users
        ");
        $users = $this->db->resultSet();

        // Map users to jurusan
        $jurusanUsers = [];
        foreach ($users as $user) {
            $jurusan = $this->parseJurusan($user['nama_lengkap']);
            if (!isset($jurusanUsers[$jurusan])) {
                $jurusanUsers[$jurusan] = [];
            }
            $jurusanUsers[$jurusan][] = $user['user_id'];
        }

        $result = [];

        foreach ($jurusanUsers as $namaJurusan => $userIds) {
            if (empty($userIds)) continue;

            $userIdsString = implode(',', $userIds);

            // KAK diajukan
            $this->db->query("
                SELECT COUNT(*) as total
                FROM t_kak
                WHERE pengusul_user_id IN ({$userIdsString})
                AND status_id != 4
                AND created_at >= :start_date
            ");
            $this->db->bind(':start_date', $startDate);
            $kakDiajukan = $this->db->single()['total'];

            // Kegiatan selesai
            $this->db->query("
                SELECT COUNT(DISTINCT k.kegiatan_id) as total
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                WHERE t.pengusul_user_id IN ({$userIdsString})
                AND EXISTS (
                    SELECT 1 FROM t_kegiatan_approval
                    WHERE kegiatan_id = k.kegiatan_id
                    AND approval_level = 'Bendahara-Setor'
                    AND status = 'Disetujui'
                )
                AND t.created_at >= :start_date
            ");
            $this->db->bind(':start_date', $startDate);
            $kegiatanSelesai = $this->db->single()['total'];

            // Kegiatan berlangsung
            $this->db->query("
                SELECT COUNT(DISTINCT k.kegiatan_id) as total
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                WHERE t.pengusul_user_id IN ({$userIdsString})
                AND NOT EXISTS (
                    SELECT 1 FROM t_kegiatan_approval
                    WHERE kegiatan_id = k.kegiatan_id
                    AND approval_level = 'Bendahara-Setor'
                    AND status = 'Disetujui'
                )
                AND t.created_at >= :start_date
            ");
            $this->db->bind(':start_date', $startDate);
            $kegiatanBerlangsung = $this->db->single()['total'];

            // Dana diminta
            $this->db->query("
                SELECT COALESCE(SUM(tka.jumlah_diusulkan), 0) as total
                FROM t_kak_anggaran tka
                JOIN t_kak t ON tka.kak_id = t.kak_id
                WHERE t.pengusul_user_id IN ({$userIdsString})
                AND t.status_id != 4
                AND t.created_at >= :start_date
            ");
            $this->db->bind(':start_date', $startDate);
            $danaDiminta = $this->db->single()['total'];

            // Dana terserap
            $danaTerserap = $this->getDanaTereserapByUserIds($userIds, $startDate);

            $persentaseSerapan = $danaDiminta > 0
                ? round(($danaTerserap / $danaDiminta) * 100, 2)
                : 0;

            $result[] = [
                'nama_jurusan' => $namaJurusan,
                'kak_diajukan' => (int) $kakDiajukan,
                'kegiatan_selesai' => (int) $kegiatanSelesai,
                'kegiatan_berlangsung' => (int) $kegiatanBerlangsung,
                'dana_diminta' => (float) $danaDiminta,
                'dana_terserap' => (float) $danaTerserap,
                'persentase_serapan' => (float) $persentaseSerapan
            ];
        }

        // Sort by dana_diminta descending
        usort($result, function ($a, $b) {
            return $b['dana_diminta'] - $a['dana_diminta'];
        });

        return $result;
    }

    /**
     * Get historical trends (monthly breakdown)
     */
    private function getTrends($startDate)
    {
        $trends = [];
        $curr = new \DateTime($startDate);
        $end = new \DateTime();

        while ($curr <= $end) {
            // 1. DEFINISIKAN VARIABEL WAKTU ($s dan $e)
            $s = $curr->format('Y-m-01'); // Awal bulan
            $e = $curr->format('Y-m-t');  // Akhir bulan
            $label = $curr->format('M Y');

            // 2. QUERY TOTAL KEGIATAN
            $this->db->query("
                SELECT COUNT(*) as total
                FROM t_kegiatan k
                JOIN t_kak t ON k.kak_id = t.kak_id
                WHERE t.created_at BETWEEN :s AND :e
            ");
            $this->db->bind(':s', $s);
            $this->db->bind(':e', $e);
            $cnt = $this->db->single()['total'];

            // 3. QUERY DANA RENCANA (Pagu)
            $this->db->query("
                SELECT COALESCE(SUM(jumlah_diusulkan), 0) as total
                FROM t_kak_anggaran tka
                JOIN t_kak t ON tka.kak_id = t.kak_id
                WHERE t.created_at BETWEEN :s AND :e
                AND t.status_id != 4
            ");
            $this->db->bind(':s', $s);
            $this->db->bind(':e', $e);
            $danaRencana = $this->db->single()['total'];

            // 4. QUERY DANA REALISASI (Pencairan)
            $this->db->query("
                SELECT COALESCE(SUM(jumlah_dicairkan), 0) as total
                FROM t_pencairan_dana
                WHERE created_at BETWEEN :s AND :e
            ");
            $this->db->bind(':s', $s);
            $this->db->bind(':e', $e);
            $danaRealisasi = $this->db->single()['total'];

            $trends[] = [
                'periode' => $label,
                'total_kegiatan' => (int) $cnt,
                'dana_diminta' => (float) $danaRencana,
                'dana_terserap' => (float) $danaRealisasi
            ];

            $curr->modify('+1 month');
        }

        return $trends;
    }

    /**
     * Get recent activities
     */
    private function getRecentActivities($limit = 10)
    {
        // PERUBAHAN: Tambahkan WHERE ka.status != 'Menunggu'
        // Agar langkah masa depan tidak muncul di riwayat
        $this->db->query("
            SELECT 
                t.nama_kegiatan,
                u.nama_lengkap as pengusul_nama,
                ka.approval_level,
                ka.status,
                ka.updated_at as created_at  -- Gunakan updated_at agar urut berdasarkan aktivitas terakhir
            FROM t_kegiatan_approval ka
            JOIN t_kegiatan k ON ka.kegiatan_id = k.kegiatan_id
            JOIN t_kak t ON k.kak_id = t.kak_id
            JOIN m_users u ON t.pengusul_user_id = u.user_id
            WHERE ka.status IN ('Aktif', 'Disetujui', 'Ditolak', 'Revisi') 
            ORDER BY ka.updated_at DESC
            LIMIT :limit
        ");

        $this->db->bind(':limit', $limit);
        $activities = $this->db->resultSet();

        foreach ($activities as &$act) {
            $act['jurusan'] = $this->parseJurusan($act['pengusul_nama']);
            $act['time_ago'] = $this->timeAgo($act['created_at']);
            $act['deskripsi_status'] = $this->formatActivityMessage($act['approval_level'], $act['status']);
        }
        return $activities;
    }

    /**
     * Helper: Parse jurusan from nama lengkap
     */
    private function parseJurusan($namaLengkap)
    {
        $patterns = [
            'Teknik Informatika Komputer' => '/Teknik Informatika Komputer|Informatika Komputer|jurusantik@/i',
            'Teknik Sipil' => '/Teknik Sipil|jurusansipil@/i',
            'Teknik Mesin' => '/Teknik Mesin|jurusanmesin@/i',
            'Teknik Grafika dan Penerbitan' => '/Grafika dan Penerbitan|Grafika|Penerbitan|jurusantgp@/i',
            'Akuntansi' => '/Admin Jurusan Akuntansi|jurusanak@/i',
            'Administrasi Niaga' => '/Administrasi Niaga|Admin Niaga|jurusanniaga@/i',
            'Teknik Elektro' => '/Teknik Elektro|jurusante@/i',
        ];

        foreach ($patterns as $jurusan => $pattern) {
            if (preg_match($pattern, $namaLengkap)) {
                return $jurusan;
            }
        }

        return 'Unit Lain';
    }

    /**
     * Helper: Get total dana terserap across all kegiatan
     */
    private function getTotalDanaTerserap($startDate)
    {
        // Get all kegiatan IDs in period
        $this->db->query("
            SELECT k.kegiatan_id, k.kak_id
            FROM t_kegiatan k
            JOIN t_kak t ON k.kak_id = t.kak_id
            WHERE t.created_at >= :start_date
        ");
        $this->db->bind(':start_date', $startDate);
        $kegiatanList = $this->db->resultSet();

        $totalTerserap = 0;

        foreach ($kegiatanList as $kegiatan) {
            $totalTerserap += $this->getDanaTerserap($kegiatan['kegiatan_id'], $kegiatan['kak_id']);
        }

        return $totalTerserap;
    }

    /**
     * Helper: Get dana terserap by user IDs (for per-jurusan calculation)
     */
    private function getDanaTereserapByUserIds($userIds, $startDate)
    {
        if (empty($userIds)) return 0;

        $userIdsString = implode(',', $userIds);

        $this->db->query("
            SELECT k.kegiatan_id, k.kak_id
            FROM t_kegiatan k
            JOIN t_kak t ON k.kak_id = t.kak_id
            WHERE t.pengusul_user_id IN ({$userIdsString})
            AND t.created_at >= :start_date
        ");
        $this->db->bind(':start_date', $startDate);
        $kegiatanList = $this->db->resultSet();

        $totalTerserap = 0;

        foreach ($kegiatanList as $kegiatan) {
            $totalTerserap += $this->getDanaTerserap($kegiatan['kegiatan_id'], $kegiatan['kak_id']);
        }

        return $totalTerserap;
    }

    /**
     * Helper: Get dana terserap for single kegiatan
     */
    private function getDanaTerserap($kegiatanId, $kakId)
    {
        // Check if LPJ Done (Bendahara-Setor Disetujui)
        $this->db->query("
            SELECT 1 as done
            FROM t_kegiatan_approval
            WHERE kegiatan_id = :kegiatan_id
            AND approval_level = 'Bendahara-Setor'
            AND status = 'Disetujui'
        ");
        $this->db->bind(':kegiatan_id', $kegiatanId);
        $lpjDone = $this->db->single();

        if ($lpjDone) {
            // Sum dari realisasi (manual calculation)
            $this->db->query("
                SELECT COALESCE(SUM(
                    COALESCE(realisasi_volume1, 1) *
                    COALESCE(realisasi_volume2, 1) *
                    COALESCE(realisasi_volume3, 1) *
                    COALESCE(realisasi_harga_satuan, 0)
                ), 0) as total
                FROM t_kak_anggaran
                WHERE kak_id = :kak_id
            ");
            $this->db->bind(':kak_id', $kakId);
            return $this->db->single()['total'];
        } else {
            // Sum dari pencairan dana
            $this->db->query("
                SELECT COALESCE(SUM(jumlah_dicairkan), 0) as total
                FROM t_pencairan_dana
                WHERE kegiatan_id = :kegiatan_id
            ");
            $this->db->bind(':kegiatan_id', $kegiatanId);
            return $this->db->single()['total'];
        }
    }

    /**
     * Helper: Calculate growth percentage vs previous period
     */
    private function calculateGrowth($startDate)
    {
        $currentStart = new \DateTime($startDate);
        $currentEnd = new \DateTime();

        $diff = $currentStart->diff($currentEnd);
        $daysDiff = $diff->days;

        $previousStart = clone $currentStart;
        $previousStart->modify("-{$daysDiff} days");
        $previousEnd = clone $currentStart;
        $previousEnd->modify("-1 day");

        // Current period count
        $this->db->query("
            SELECT COUNT(*) as total
            FROM t_kegiatan k
            JOIN t_kak t ON k.kak_id = t.kak_id
            WHERE t.created_at >= :start_date
        ");
        $this->db->bind(':start_date', $startDate);
        $currentCount = $this->db->single()['total'];

        // Previous period count
        $this->db->query("
            SELECT COUNT(*) as total
            FROM t_kegiatan k
            JOIN t_kak t ON k.kak_id = t.kak_id
            WHERE t.created_at BETWEEN :start AND :end
        ");
        $this->db->bind(':start', $previousStart->format('Y-m-d'));
        $this->db->bind(':end', $previousEnd->format('Y-m-d'));
        $previousCount = $this->db->single()['total'];

        if ($previousCount == 0) {
            return $currentCount > 0 ? 100 : 0;
        }

        $growth = (($currentCount - $previousCount) / $previousCount) * 100;
        return round($growth, 2);
    }

    /**
     * Helper: Get start date based on period
     */
    private function getStartDate($period)
    {
        $date = new \DateTime();

        switch ($period) {
            case '3months':
                $date->modify('-3 months');
                break;
            case '6months':
                $date->modify('-6 months');
                break;
            case '1year':
                $date->modify('-1 year');
                break;
            case 'year':
                $date = new \DateTime(date('Y-01-01'));
                break;
            case 'all':
                $date = new \DateTime('2020-01-01');
                break;
            default:
                $date->modify('-6 months');
        }

        return $date->format('Y-m-d');
    }

    /**
     * Helper: Time ago formatter
     */
    private function timeAgo($datetime)
    {
        $now = new \DateTime();
        $ago = new \DateTime($datetime);
        $diff = $now->diff($ago);

        if ($diff->days > 30) {
            return $ago->format('d M Y');
        } elseif ($diff->days > 0) {
            return $diff->days . ' hari lalu';
        } elseif ($diff->h > 0) {
            return $diff->h . ' jam lalu';
        } elseif ($diff->i > 0) {
            return $diff->i . ' menit lalu';
        } else {
            return 'Baru saja';
        }
    }

    // --- HELPERS BARU UNTUK STATUS DESKRIPTIF ---

    private function formatActivityMessage($level, $status)
    {
        $levelName = $this->normalizeLevelName($level);

        // 1. Status AKTIF = Berkas sedang di meja ini (Menunggu diproses)
        if ($status === 'Aktif') {
            switch ($level) {
                case 'Bendahara-Cair':
                    return "Dalam Proses Pencairan Dana";
                case 'Bendahara-LPJ':
                    return "Menunggu Pelaporan & Verifikasi LPJ"; // Input User + Cek Bendahara
                case 'Bendahara-Setor':
                    return "Menunggu Penyerahan Dokumen Fisik"; // Setor Hardcopy
                default:
                    return "Menunggu Persetujuan " . $levelName;
            }
        }

        // 2. Status DISETUJUI = Sudah lewat
        if ($status === 'Disetujui') {
            switch ($level) {
                case 'PPK':
                    return "Telah Diverifikasi PPK";
                case 'Wadir2':
                    return "Telah Disetujui Wadir 2";
                case 'Bendahara-Cair':
                    return "Dana Tersalurkan Sepenuhnya";
                case 'Bendahara-LPJ':
                    return "LPJ Digital Terverifikasi"; // Tahap 1 LPJ beres
                case 'Bendahara-Setor':
                    return "Kegiatan Tuntas (Administrasi Lengkap)"; // Final
                default:
                    return "Disetujui oleh " . $levelName;
            }
        }

        // 3. Status Masalah
        if ($status === 'Ditolak') return "Ditolak oleh " . $levelName;
        if ($status === 'Revisi') return "Permintaan Revisi dari " . $levelName;

        return "$status - $levelName";
    }

    private function normalizeLevelName($level)
    {
        if ($level === 'Wadir2') return 'Wadir 2';
        if (strpos($level, 'Bendahara') !== false) return 'Bendahara';
        return $level;
    }
}
