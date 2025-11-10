<?php

namespace App\Controllers;

use App\Core\Response;
use App\Core\PDF;
use App\Models\Kegiatan;
use App\Middlewares\AuthMiddleware;

class KAKController
{
    private $kegiatanModel;

    public function __construct()
    {
        $this->kegiatanModel = new Kegiatan();
    }

    /**
     * Generate and download KAK PDF
     * 
     * GET /api/kak/{kegiatan_id}
     */
    public function download()
    {
        // Get kegiatan_id from URL
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)$/', $uri, $matches);
        $kegiatanId = $matches[1] ?? null;

        if (!$kegiatanId) {
            Response::error('Kegiatan ID tidak valid.', 400);
        }

        // Get kegiatan data with anggaran
        $kegiatan = $this->kegiatanModel->getKegiatanForPDF($kegiatanId);

        if (!$kegiatan) {
            Response::notFound('Kegiatan tidak ditemukan.');
        }

        // Generate HTML from template
        $html = $this->generateKAKHTML($kegiatan);

        // Generate filename
        $filename = $this->generateFilename($kegiatan);

        // Generate and download PDF
        PDF::download($html, $filename);
    }

    /**
     * Preview KAK in HTML format (before download)
     * 
     * GET /api/kak/{kegiatan_id}/preview
     */
    public function preview()
    {
        // Get kegiatan_id from URL
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)\/preview$/', $uri, $matches);
        $kegiatanId = $matches[1] ?? null;

        if (!$kegiatanId) {
            Response::error('Kegiatan ID tidak valid.', 400);
        }

        // Get kegiatan data with anggaran
        $kegiatan = $this->kegiatanModel->getKegiatanForPDF($kegiatanId);

        if (!$kegiatan) {
            Response::notFound('Kegiatan tidak ditemukan.');
        }

        // Generate HTML from template
        $html = $this->generateKAKHTML($kegiatan);

        // Output HTML directly
        header('Content-Type: text/html; charset=utf-8');
        echo $html;
        exit;
    }

    /**
     * Generate filename for PDF
     */
    private function generateFilename($kegiatan)
    {
        // Clean nama kegiatan for filename
        $namaKegiatan = preg_replace('/[^a-zA-Z0-9\s]/', '', $kegiatan['nama_kegiatan']);
        $namaKegiatan = substr($namaKegiatan, 0, 50); // Max 50 chars
        $namaKegiatan = str_replace(' ', '-', $namaKegiatan);
        
        $date = date('Ymd');
        
        return "KAK-{$namaKegiatan}-{$date}.pdf";
    }

    /**
     * Generate HTML content for PDF
     */
    private function generateKAKHTML($kegiatan)
    {
        // Start output buffering
        ob_start();
        
        // Include template
        include __DIR__ . '/../../Views/pdf/kak-template.php';
        
        // Get buffer content
        $html = ob_get_clean();
        
        return $html;
    }

    /**
     * Get KAK data as JSON (for frontend to build their own template)
     * 
     * GET /api/kak/{kegiatan_id}/data
     */
    public function getData()
    {
        // Get kegiatan_id from URL
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)\/data$/', $uri, $matches);
        $kegiatanId = $matches[1] ?? null;

        if (!$kegiatanId) {
            Response::error('Kegiatan ID tidak valid.', 400);
        }

        // Get kegiatan data with anggaran
        $kegiatan = $this->kegiatanModel->getKegiatanForPDF($kegiatanId);

        if (!$kegiatan) {
            Response::notFound('Kegiatan tidak ditemukan.');
        }

        // Return as JSON
        Response::success($kegiatan, 'Data KAK berhasil diambil.');
    }
}