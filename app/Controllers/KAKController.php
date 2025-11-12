<?php

namespace App\Controllers;

use App\Core\Response;
use App\Core\PDF;
use App\Models\Telaah; // Ganti dari Kegiatan ke Telaah
use App\Middlewares\AuthMiddleware;

class KAKController
{
    private $telaahModel; // Ganti nama variabel

    public function __construct()
    {
        $this->telaahModel = new Telaah(); // Ganti ke model Telaah
    }

    /**
     * Generate and download KAK PDF
     * 
     * GET /api/kak/{telaah_id}
     */
    public function download()
    {
        // Get telaah_id from URL
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)$/', $uri, $matches);
        $telaahId = $matches[1] ?? null;

        if (!$telaahId) {
            Response::error('Telaah ID tidak valid.', 400);
        }

        // Get KAK data from Telaah model
        $kakData = $this->telaahModel->getDataForKAK($telaahId);

        if (!$kakData) {
            Response::notFound('Data Telaah untuk KAK tidak ditemukan.');
        }

        // Generate HTML from template
        $html = $this->generateKAKHTML($kakData);

        // Generate filename
        $filename = $this->generateFilename($kakData);

        // Generate and download PDF
        PDF::download($html, $filename);
    }

    /**
     * Preview KAK in HTML format (before download)
     * 
     * GET /api/kak/{telaah_id}/preview
     */
    public function preview()
    {
        // Get telaah_id from URL
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)\/preview$/', $uri, $matches);
        $telaahId = $matches[1] ?? null;

        if (!$telaahId) {
            Response::error('Telaah ID tidak valid.', 400);
        }

        // Get KAK data from Telaah model
        $kakData = $this->telaahModel->getDataForKAK($telaahId);

        if (!$kakData) {
            Response::notFound('Data Telaah untuk KAK tidak ditemukan.');
        }

        // Generate HTML from template
        $html = $this->generateKAKHTML($kakData);

        // Output HTML directly
        header('Content-Type: text/html; charset=utf-8');
        echo $html;
        exit;
    }

    /**
     * Generate filename for PDF
     */
    private function generateFilename($kakData)
    {
        // Clean nama kegiatan for filename
        $namaKegiatan = preg_replace('/[^a-zA-Z0-9\s]/', '', $kakData['nama_kegiatan']);
        $namaKegiatan = substr($namaKegiatan, 0, 50); // Max 50 chars
        $namaKegiatan = str_replace(' ', '-', $namaKegiatan);
        
        $date = date('Ymd');
        
        return "KAK-{$namaKegiatan}-{$date}.pdf";
    }

    /**
     * Generate HTML content for PDF
     */
    private function generateKAKHTML($kakData)
    {
        // Template `kak-template.php` mengharapkan variabel bernama `$kegiatan`.
        // Kita assign data KAK ke variabel tersebut di sini untuk kompatibilitas.
        $kegiatan = $kakData;

        // Start output buffering
        ob_start();
        
        // Include template
        include __DIR__ . '/../Views/pdf/kak-template.php';
        
        // Get buffer content
        $html = ob_get_clean();
        
        return $html;
    }

    /**
     * Get KAK data as JSON (for frontend to build their own template)
     * 
     * GET /api/kak/{telaah_id}/data
     */
    public function getData()
    {
        // Get telaah_id from URL
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)\/data$/', $uri, $matches);
        $telaahId = $matches[1] ?? null;

        if (!$telaahId) {
            Response::error('Telaah ID tidak valid.', 400);
        }

        // Get KAK data from Telaah model
        $kakData = $this->telaahModel->getDataForKAK($telaahId);

        if (!$kakData) {
            Response::notFound('Data Telaah untuk KAK tidak ditemukan.');
        }

        // Return as JSON
        Response::success($kakData, 'Data KAK berhasil diambil.');
    }
}