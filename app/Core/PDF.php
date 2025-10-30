<?php

namespace App\Core;

use TCPDF;

class PDF extends TCPDF
{
    /**
     * Generate PDF from HTML
     * 
     * @param string $html HTML content
     * @param string $filename Output filename
     * @param string $orientation Page orientation (P=Portrait, L=Landscape)
     * @param string $paperSize Paper size (A4, Letter, etc)
     * @return TCPDF instance
     */
    public static function generate($html, $filename = 'document.pdf', $orientation = 'P', $paperSize = 'A4')
    {
        // Create new PDF document
        $pdf = new self($orientation, 'mm', $paperSize, true, 'UTF-8', false);

        // Set document information
        $pdf->SetCreator('SIGAP-PNJ');
        $pdf->SetAuthor('Politeknik Negeri Jakarta');
        $pdf->SetTitle($filename);

        // Remove default header/footer
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // Set margins
        $pdf->SetMargins(15, 15, 15);
        $pdf->SetAutoPageBreak(TRUE, 15);

        // Set font
        $pdf->SetFont('helvetica', '', 10);

        // Add a page
        $pdf->AddPage();

        // Write HTML content
        $pdf->writeHTML($html, true, false, true, false, '');

        return $pdf;
    }

    /**
     * Generate and output PDF to browser (download)
     */
    public static function download($html, $filename = 'document.pdf', $orientation = 'P', $paperSize = 'A4')
    {
        $pdf = self::generate($html, $filename, $orientation, $paperSize);
        
        // Output PDF for download
        $pdf->Output($filename, 'D'); // D = force download
        exit;
    }

    /**
     * Generate and display PDF inline in browser
     */
    public static function preview($html, $filename = 'document.pdf', $orientation = 'P', $paperSize = 'A4')
    {
        $pdf = self::generate($html, $filename, $orientation, $paperSize);
        
        // Output PDF inline
        $pdf->Output($filename, 'I'); // I = inline display
        exit;
    }

    /**
     * Generate and save PDF to file
     */
    public static function save($html, $filepath, $orientation = 'P', $paperSize = 'A4')
    {
        $filename = basename($filepath);
        $pdf = self::generate($html, $filename, $orientation, $paperSize);
        
        // Output PDF to file
        $pdf->Output($filepath, 'F'); // F = save to file
        
        return $filepath;
    }

    /**
     * Generate and return PDF as string
     */
    public static function getString($html, $filename = 'document.pdf', $orientation = 'P', $paperSize = 'A4')
    {
        $pdf = self::generate($html, $filename, $orientation, $paperSize);
        
        // Output PDF as string
        return $pdf->Output('', 'S'); // S = return as string
    }
}