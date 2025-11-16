<?php

namespace App\Controllers;

use App\Core\Response;
use App\Middlewares\AuthMiddleware;
use App\Models\Kegiatan;

class DashboardController
{
    private $userData;

    public function __construct()
    {
        // Get authenticated user data for role-based access
        $this->userData = AuthMiddleware::getAuthUser();
    }

    /**
     * GET /dashboard/summary
     * Mengambil data rekap jumlah kegiatan.
     * Menggunakan kembali logika dari KegiatanController/KegiatanModel.
     */
    public function getSummary()
    {
        try {
            $kegiatanModel = new Kegiatan();
            
            // Pengusul hanya melihat statistik kegiatannya sendiri
            $userId = null;
            if (isset($this->userData['roles']) && in_array('Pengusul', $this->userData['roles']) && !in_array('Admin', $this->userData['roles'])) {
                $userId = $this->userData['user_id'];
            }

            // Memanggil metode statistik yang sudah ada di model
            $stats = $kegiatanModel->getStatistics($userId);

            // Mapping hasil ke format yang diminta
            $summary = [
                'draft' => $stats['total_draft'] ?? 0,
                'diajukan' => $stats['total_review_verifikator'] ?? 0,
                'revisi' => $stats['total_revisi'] ?? 0,
            ];

            Response::success($summary, 'Data summary berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil data summary: ' . $e->getMessage(), 500);
        }
    }

    // Metode lain untuk dashboard (getKegiatan, getLpj, dll.) akan ditambahkan di sini.

    /**
     * GET /dashboard/lpj
     * Mengambil data monitoring LPJ dengan filter dan search.
     */
    public function getLpj()
    {
        try {
            $kegiatanModel = new Kegiatan();

            $filters = [
                'search' => $_GET['search'] ?? null,
                'unit_pengusul' => $_GET['unit_pengusul'] ?? null,
                'page' => isset($_GET['page']) ? (int)$_GET['page'] : 1,
                'per_page' => isset($_GET['per_page']) ? (int)$_GET['per_page'] : 10
            ];
            
            // Pengusul hanya bisa lihat LPJ kegiatan sendiri
            if (isset($this->userData['roles']) && in_array('Pengusul', $this->userData['roles']) && !in_array('Admin', $this->userData['roles'])) {
                $filters['unit_pengusul'] = $this->userData['user_id'];
            }

            $result = $kegiatanModel->getLpjWithFilters($filters);

            Response::success($result, 'Data monitoring LPJ berhasil diambil.');

        } catch (\Exception $e) {
            Response::error('Gagal mengambil data LPJ: ' . $e->getMessage(), 500);
        }
    }

    /**
     * GET /dashboard/template
     * Mengambil daftar template dokumen.
     */
    public function getTemplates()
    {
        try {
            $mediaModel = new \App\Models\MediaPanduan();
            $templates = $mediaModel->getByType('template');
            Response::success($templates, 'Data template berhasil diambil.');
        } catch (\Exception $e) {
            Response::error('Gagal mengambil data template: ' . $e->getMessage(), 500);
        }
    }

    /**
     * GET /dashboard/video
     * Mengambil daftar video panduan.
     */
    public function getVideos()
    {
        try {
            $mediaModel = new \App\Models\MediaPanduan();
            $videos = $mediaModel->getByType('video');
            Response::success($videos, 'Data video panduan berhasil diambil.');
        } catch (\Exception $e) {
            Response::error('Gagal mengambil data video: ' . $e->getMessage(), 500);
        }
    }
}
