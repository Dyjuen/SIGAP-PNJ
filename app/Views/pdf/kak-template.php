<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kerangka Acuan Kerja (KAK)</title>
    <!-- TEMPLATE VERSION: 2025-12-03-11:15 - CENTERED PAPER EFFECT FOR PREVIEW -->
<style>
    @page {
        margin: 2cm 2.5cm; /* Standard margin untuk dokumen formal */
    }
    
    /* Preview Mode: Paper Effect */
    html {
        background: #525659; /* Dark background for contrast */
    }
    
    body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 12pt; /* Standard size untuk dokumen formal */
        line-height: 1.6; /* Compact but readable */
        color: #000;
        background: #fff; /* White paper background */
        max-width: 21cm; /* A4 width */
        margin: 1.5cm auto; /* Balanced margin untuk preview */
        padding: 2cm 2.5cm; /* Standard document padding */
        box-sizing: border-box;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Paper shadow effect */
        min-height: 29.7cm; /* A4 height */
    }
    
    /* TCPDF OVERRIDE - Force inline style compliance */
    @media print {
        body {
            margin: 0 !important;
            padding: 2cm 2.5cm !important;
            box-shadow: none !important;
        }
    }
    
    /* Cover Page Styles - BALANCED SPACING */
    .cover-page {
        text-align: center;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        page-break-after: always;
        padding: 60px 40px; /* Balanced padding */
    }
    .cover-logo {
        width: 350px;
        height: auto;
        margin: 0 auto 40px; /* Logo ke title - proper space */
    }
    .cover-title {
        font-size: 20pt; /* Slightly larger for impact */
        font-weight: bold;
        text-transform: uppercase;
        margin: 0 0 8px 0; /* Minimal to subtitle */
        letter-spacing: 1.5px;
        line-height: 1.3;
    }
    .cover-subtitle {
        font-size: 18pt;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0 0 50px 0; /* Good space before activity */
        letter-spacing: 1px;
        line-height: 1.3;
    }
    .cover-activity-section {
        margin: 0 0 35px 0; /* Breathing space */
        line-height: 1.5;
    }
    .cover-activity-label {
        font-size: 14pt;
        font-weight: bold;
        margin-bottom: 12px; /* Readable space to name */
    }
    .cover-activity-name {
        font-size: 14pt;
        font-weight: normal;
        margin: 0 60px;
        line-height: 1.6;
    }
    .cover-unit-section {
        margin: 0 0 50px 0; /* Space before footer */
    }
    .cover-unit-label {
        font-size: 14pt;
        font-weight: bold;
        margin-bottom: 12px;
    }
    .cover-unit-name {
        font-size: 15pt;
        font-weight: bold;
        margin: 0;
        line-height: 1.4;
    }
    .cover-footer {
        margin-top: 60px; /* Balanced separation */
    }
    .cover-footer p {
        font-size: 13pt;
        font-weight: normal;
        margin: 8px 0; /* Comfortable line spacing */
        line-height: 1.5;
    }
    .cover-footer .year {
        font-size: 15pt;
        font-weight: bold;
        margin-top: 15px;
    }
    
    /* Document Title */
    .doc-title {
        text-align: center;
        margin: 30px 0 40px 0; /* Professional top/bottom space */
    }
    .doc-title h1 {
        font-size: 18pt;
        font-weight: bold;
        text-decoration: underline;
        margin: 0;
        line-height: 1.4;
    }
    
    /* Section Spacing - ANTAR BAB (TETAP BESAR) */
    .section {
        margin-bottom: 30px; /* Breathable section spacing - JARAK ANTAR BAB */
        padding: 0;
    }
    .section.no-break {
        page-break-inside: avoid; /* Only for short sections */
    }
    .section-title {
        font-size: 13pt;
        font-weight: bold;
        margin-bottom: 15px; /* Clear title-to-content gap */
        color: #000;
        page-break-after: avoid; /* Title tidak boleh terpisah dari content */
        line-height: 1.4;
    }
    
    /* Info Grid/Table */
    .info-grid {
        margin-bottom: 8px; /* Compact */
    }
    .info-row {
        margin-bottom: 6px; /* Compact */
    }
    .info-table {
        width: 100%;
        border: none;
        margin: 10px 0 20px 0; /* Space around table */
    }
    .info-table td {
        border: none;
        padding: 6px 0; /* Vertical breathing room */
        vertical-align: top;
        font-size: 11pt;
        line-height: 1.6;
    }
    .info-table .label {
        width: 220px; /* Slightly wider */
        font-weight: normal;
    }
    .info-table .separator {
        width: 25px;
        text-align: center;
    }
    .info-table .value {
        font-weight: normal;
    }
    .label {
        width: 220px;
        font-weight: normal;
        vertical-align: top;
    }
    .separator {
        width: 25px;
        vertical-align: top;
    }
    .value {
        vertical-align: top;
    }
    
    /* Content Text - ISI DALAM BAB (SUPER COMPACT) */
    .content-text {
        text-align: justify;
        margin: 5px 0; /* Super compact paragraph spacing */
        line-height: 1.5; /* Tighter */
    }
    .text-right {
        text-align: right;
    }
    .text-center {
        text-align: center;
    }
    .text-justify {
        text-align: justify;
    }
    .total-row {
        background-color: #f0f0f0 !important;
        font-weight: bold;
    }
    
    /* Lists - ISI DALAM BAB (SUPER COMPACT) */
    ul, ol {
        margin: 5px 0 8px 0; /* Super compact list spacing */
        padding-left: 30px;
    }
    li {
        margin-bottom: 2px; /* Minimal item spacing - SANGAT RAPAT */
        text-align: justify;
        line-height: 1.4;
    }
    
    /* Signature Section */
    .signature-section {
        margin-top: 80px;
        text-align: right;
    }
    .signature-box {
        display: inline-block;
        text-align: center;
        min-width: 250px;
    }
    .signature-line {
        border-top: 1px solid #000;
        margin-top: 100px; /* Space for actual signature */
        margin-bottom: 8px;
    }
    
    /* Document Footer */
    .doc-footer {
        font-size: 9pt;
        color: #666;
        text-align: center;
        border-top: 1px solid #ccc;
        padding-top: 15px;
        margin-top: 60px;
        line-height: 1.6;
    }
    
    /* Additional Improvements - ISI DALAM BAB (SUPER COMPACT) */
    
    /* FORCE TIMES NEW ROMAN ON ALL ELEMENTS */
    * {
        font-family: 'Times New Roman', Times, serif !important;
    }
    
    /* Super compact spacing for subsections */
    div[style*="margin-bottom: 20px"] {
        margin-bottom: 12px !important; /* Subsection spacing - SUPER COMPACT */
    }
    
    div[style*="margin-bottom: 8px"] {
        margin-bottom: 5px !important; /* Lebih rapat */
    }
    
    div[style*="margin-bottom: 10px"] {
        margin-bottom: 3px !important; /* Minimal spacing */
    }
    
    div[style*="margin-top: 10px"] {
        margin-top: 5px !important; /* Minimal top spacing */
    }
    
    div[style*="margin-top: 8px"] {
        margin-top: 5px !important; /* Consistent top spacing */
    }
    
    div[style*="margin-left: 30px"] {
        margin-left: 30px !important;
    }
    
    /* Signature page spacing */
    .signature-section[style*="page-break-before: always"] {
        padding-top: 120px;
    }
    
    .signature-section table {
        margin-top: 60px;
    }
    
    .signature-section td {
        padding: 0 30px;
    }
    
    /* Location text spacing */
    .signature-section > div:first-child {
        margin-bottom: 60px;
        margin-left: 40px;
    }
    
    /* Better spacing for manfaat items - SUPER COMPACT */
    .section div[style*="margin-bottom: 8px"] span {
        line-height: 1.4;
    }
    
    /* Tahapan list spacing - SUPER COMPACT */
    .section ol {
        margin-top: 5px;
    }
    
    /* Subsection headers - SUPER COMPACT */
    .section strong {
        display: block;
        margin-bottom: 5px;
    }
</style>
</head>
<body>
    <!-- COVER PAGE -->
    <div class="cover-page">
        <!-- Logo PNJ -->
        <?php 
        // Debug: Test different path methods
        $logoPath1 = dirname(dirname(dirname(__DIR__))) . '/public/assets/img/logo/logo_pnj.png';
        $logoPath2 = $_SERVER['DOCUMENT_ROOT'] . '/assets/img/logo/logo_pnj.png';
        $logoPath3 = __DIR__ . '/../../../public/assets/img/logo/logo_pnj.png';
        
        // Try to find the logo
        $finalLogoPath = '';
        if (file_exists($logoPath1)) {
            $finalLogoPath = $logoPath1;
        } elseif (file_exists($logoPath2)) {
            $finalLogoPath = $logoPath2;
        } elseif (file_exists($logoPath3)) {
            $finalLogoPath = $logoPath3;
        }
        
        if ($finalLogoPath && file_exists($finalLogoPath)) {
            // Use base64 encoding - most reliable for TCPDF
            $imageData = base64_encode(file_get_contents($finalLogoPath));
            $imageSrc = 'data:image/png;base64,' . $imageData;
        } else {
            // Show debug info (will be visible in PDF for debugging)
            echo '<!-- DEBUG: Logo not found -->';
            echo '<!-- Path 1: ' . $logoPath1 . ' (exists: ' . (file_exists($logoPath1) ? 'YES' : 'NO') . ') -->';
            echo '<!-- Path 2: ' . $logoPath2 . ' (exists: ' . (file_exists($logoPath2) ? 'YES' : 'NO') . ') -->';
            echo '<!-- Path 3: ' . $logoPath3 . ' (exists: ' . (file_exists($logoPath3) ? 'YES' : 'NO') . ') -->';
            echo '<!-- __DIR__: ' . __DIR__ . ' -->';
            echo '<!-- DOCUMENT_ROOT: ' . ($_SERVER['DOCUMENT_ROOT'] ?? 'NOT SET') . ' -->';
            
            // Fallback - use text
            $imageSrc = '';
        }
        
        if ($imageSrc) {
            echo '<img src="' . $imageSrc . '" alt="Logo PNJ" class="cover-logo" />';
        } else {
            echo '<div style="text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 40px; color: #0066b3;">POLITEKNIK NEGERI JAKARTA</div>';
        }
        ?>
        
        <!-- Judul Dokumen -->
        <div class="cover-title" style="font-family: 'Times New Roman', Times, serif; font-size: 20pt; font-weight: bold; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 1.5px; line-height: 1.3;">KERANGKA ACUAN KERJA</div>
        <div class="cover-subtitle" style="font-family: 'Times New Roman', Times, serif; font-size: 18pt; font-weight: bold; text-transform: uppercase; margin: 0 0 50px 0; letter-spacing: 1px; line-height: 1.3;">TAHUN ANGGARAN <?= date('Y', strtotime($kegiatan['tanggal_mulai'])) ?></div>
        
        <!-- Kegiatan -->
        <div class="cover-activity-section" style="margin: 0 0 35px 0; line-height: 1.5;">
            <div class="cover-activity-label" style="font-family: 'Times New Roman', Times, serif; font-size: 14pt; font-weight: bold; margin-bottom: 12px;">Kegiatan :</div>
            <div class="cover-activity-name" style="font-family: 'Times New Roman', Times, serif; font-size: 14pt; font-weight: normal; margin: 0 60px; line-height: 1.6;">
                <?= htmlspecialchars($kegiatan['nama_kegiatan']) ?>
            </div>
        </div>
        
        <!-- Unit Kerja -->
        <div class="cover-unit-section" style="margin: 0 0 50px 0;">
            <div class="cover-unit-label" style="font-family: 'Times New Roman', Times, serif; font-size: 14pt; font-weight: bold; margin-bottom: 12px;">Unit Kerja:</div>
            <div class="cover-unit-name" style="font-family: 'Times New Roman', Times, serif; font-size: 15pt; font-weight: bold; margin: 0; line-height: 1.4;"><?= htmlspecialchars($kegiatan['pengusul_nama']) ?></div>
        </div>
        
        <!-- Footer -->
        <div class="cover-footer" style="margin-top: 60px;">
            <p style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: normal; margin: 8px 0; line-height: 1.5;">Politeknik Negeri Jakarta</p>
            <p class="year" style="font-family: 'Times New Roman', Times, serif; font-size: 15pt; font-weight: bold; margin-top: 15px;">Tahun <?= date('Y', strtotime($kegiatan['tanggal_mulai'])) ?></p>
        </div>
    </div>

    <!-- ISI DOKUMEN MULAI DARI HALAMAN 2 (LEMBAR PENGESAHAN REMOVED) -->

    <!-- I. INFORMASI UMUM KEGIATAN -->
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">I. INFORMASI UMUM KEGIATAN</div>
        
        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; border: none; margin: 10px 0 20px 0;">
            <tr>
                <td style="width: 220px; font-weight: normal; vertical-align: top; border: none; padding: 6px 0; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">Nama Kegiatan</td>
                <td style="width: 25px; vertical-align: top; border: none; padding: 6px 0; text-align: center; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">:</td>
                <td style="vertical-align: top; border: none; padding: 6px 0; font-weight: normal; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($kegiatan['nama_kegiatan']) ?></td>
            </tr>
            
            <tr>
                <td style="width: 220px; font-weight: normal; vertical-align: top; border: none; padding: 6px 0; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">Tipe Kegiatan</td>
                <td style="width: 25px; vertical-align: top; border: none; padding: 6px 0; text-align: center; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">:</td>
                <td style="vertical-align: top; border: none; padding: 6px 0; font-weight: normal; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($kegiatan['nama_tipe_kegiatan'] ?? '-') ?></td>
            </tr>
            
            <tr>
                <td style="width: 220px; font-weight: normal; vertical-align: top; border: none; padding: 6px 0; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">Pengusul</td>
                <td style="width: 25px; vertical-align: top; border: none; padding: 6px 0; text-align: center; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">:</td>
                <td style="vertical-align: top; border: none; padding: 6px 0; font-weight: normal; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($kegiatan['pengusul_nama']) ?></td>
            </tr>
            
            <tr>
                <td style="width: 220px; font-weight: normal; vertical-align: top; border: none; padding: 6px 0; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">Tanggal Pelaksanaan</td>
                <td style="width: 25px; vertical-align: top; border: none; padding: 6px 0; text-align: center; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">:</td>
                <td style="vertical-align: top; border: none; padding: 6px 0; font-weight: normal; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;"><?= date('d F Y', strtotime($kegiatan['tanggal_mulai'])) ?> s/d <?= date('d F Y', strtotime($kegiatan['tanggal_selesai'])) ?></td>
            </tr>
            
            <tr>
                <td style="width: 220px; font-weight: normal; vertical-align: top; border: none; padding: 6px 0; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">Lokasi</td>
                <td style="width: 25px; vertical-align: top; border: none; padding: 6px 0; text-align: center; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">:</td>
                <td style="vertical-align: top; border: none; padding: 6px 0; font-weight: normal; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($kegiatan['lokasi'] ?? '-') ?></td>
            </tr>
            
            <tr>
                <td style="width: 220px; font-weight: normal; vertical-align: top; border: none; padding: 6px 0; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">Sumber Dana</td>
                <td style="width: 25px; vertical-align: top; border: none; padding: 6px 0; text-align: center; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;">:</td>
                <td style="vertical-align: top; border: none; padding: 6px 0; font-weight: normal; font-size: 11pt; line-height: 1.6; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($kegiatan['nama_sumber_dana'] ?? '-') ?> (<?= htmlspecialchars($kegiatan['kode_anggaran'] ?? '-') ?>)</td>
            </tr>
        </table>
    </div>

    <!-- II. GAMBARAN UMUM KEGIATAN -->
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">II. GAMBARAN UMUM KEGIATAN</div>
        <div style="text-align: justify; margin: 5px 0; line-height: 1.5; font-family: 'Times New Roman', Times, serif; font-size: 12pt;">
            <?= nl2br(htmlspecialchars($kegiatan['gambaran_umum'] ?? $kegiatan['deskripsi_kegiatan'] ?? 'Tidak ada deskripsi')) ?>
        </div>
    </div>

    <!-- III. PENERIMA MANFAAT -->
    <?php if (!empty($kegiatan['sasaran_utama']) || !empty($kegiatan['manfaat'])): ?>
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">III. PENERIMA MANFAAT</div>
        
        <?php if (!empty($kegiatan['sasaran_utama'])): ?>
        <div style="margin-bottom: 12px;">
            <div style="margin-bottom: 5px;">
                <strong style="font-family: 'Times New Roman', Times, serif; font-size: 12pt;">1. Sasaran Utama</strong>
            </div>
            <div style="margin-left: 30px; text-align: justify; margin-top: 3px; font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5;">
                <?= nl2br(htmlspecialchars($kegiatan['sasaran_utama'])) ?>
            </div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($kegiatan['manfaat'])): ?>
        <div>
            <div style="margin-bottom: 5px;">
                <strong style="font-family: 'Times New Roman', Times, serif; font-size: 12pt;">2. Manfaat Kegiatan</strong>
            </div>
            <div style="margin-left: 30px; text-align: justify; margin-top: 3px; font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5;">
                Manfaat yang didapatkan setelah mengikuti kegiatan ini, yaitu:
            </div>
            <div style="margin-left: 30px; margin-top: 5px;">
                <?php 
                $alphabet = range('a', 'z');
                foreach ($kegiatan['manfaat'] as $index => $manfaatItem): 
                ?>
                <div style="margin-bottom: 2px; text-align: justify; line-height: 1.3; font-family: 'Times New Roman', Times, serif; font-size: 12pt;">
                    <span style="display: inline-block; width: 18px; font-family: 'Times New Roman', Times, serif; font-size: 12pt; vertical-align: top;"><?= $alphabet[$index] ?>.</span><span style="display: inline-block; width: calc(100% - 22px); vertical-align: top; font-family: 'Times New Roman', Times, serif; font-size: 12pt;"><?= htmlspecialchars($manfaatItem['manfaat']) ?></span>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>

    <!-- IV. STRATEGI PENCAPAIAN -->
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">IV. STRATEGI PENCAPAIAN</div>
        
        <?php if (!empty($kegiatan['metode_pelaksanaan'])): ?>
        <div style="margin-bottom: 12px;">
            <strong style="display: block; margin-bottom: 5px; font-family: 'Times New Roman', Times, serif; font-size: 12pt;">Metode Pelaksanaan:</strong>
            <div style="margin-top: 3px; font-family: 'Times New Roman', Times, serif; font-size: 12pt; text-align: justify; line-height: 1.5;">
                <?= nl2br(htmlspecialchars($kegiatan['metode_pelaksanaan'])) ?>
            </div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($kegiatan['tahapan'])): ?>
        <div>
            <strong style="display: block; margin-bottom: 5px; font-family: 'Times New Roman', Times, serif; font-size: 12pt;">Tahapan Pelaksanaan:</strong>
            <ol style="margin-top: 3px; margin-bottom: 5px; padding-left: 30px; font-family: 'Times New Roman', Times, serif; font-size: 12pt;">
                <?php foreach ($kegiatan['tahapan'] as $tahapan): ?>
                <li style="margin-bottom: 2px; line-height: 1.4; font-family: 'Times New Roman', Times, serif; font-size: 12pt; text-align: justify;"><?= htmlspecialchars($tahapan['nama_tahapan']) ?></li>
                <?php endforeach; ?>
            </ol>
        </div>
        <?php endif; ?>
    </div>

    <!-- V. INDIKATOR KINERJA / TARGET KEBERHASILAN -->
    <?php if (!empty($kegiatan['target'])): ?>
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">V. INDIKATOR KINERJA / TARGET KEBERHASILAN</div>
        <table cellpadding="3" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse; margin: 0;">
            <thead>
                <tr>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.4; font-family: 'Times New Roman', Times, serif;">No</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.4; font-family: 'Times New Roman', Times, serif;">Bulan</th>
                    <th style="width: 62%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.4; font-family: 'Times New Roman', Times, serif;">Indikator Keberhasilan</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.4; font-family: 'Times New Roman', Times, serif;">Target (%)</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                foreach ($kegiatan['target'] as $target): 
                ?>
                <tr>
                    <td style="width: 8%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.4; font-family: 'Times New Roman', Times, serif;"><?= $no++ ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.4; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($target['bulan_indikator']) ?></td>
                    <td style="width: 62%; border: 1px solid #000; padding: 5px; line-height: 1.4; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($target['deskripsi_target']) ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.4; font-family: 'Times New Roman', Times, serif;"><?= number_format($target['persentase_target'], 0) ?>%</td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <!-- VI. RINCIAN ANGGARAN BIAYA (RAB) -->
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">VI. RINCIAN ANGGARAN BIAYA (RAB)</div>
        
        <?php if (!empty($kegiatan['anggaran'])): ?>
        <table cellpadding="3" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse; margin: 0;">
            <colgroup>
                <col style="width: 4%;">
                <col style="width: 20%;">
                <col style="width: 7%;">
                <col style="width: 8%;">
                <col style="width: 7%;">
                <col style="width: 8%;">
                <col style="width: 7%;">
                <col style="width: 9%;">
                <col style="width: 15%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th style="width: 4%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">No</th>
                    <th style="width: 20%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Uraian</th>
                    <th style="width: 7%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Vol 1</th>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Sat 1</th>
                    <th style="width: 7%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Vol 2</th>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Sat 2</th>
                    <th style="width: 7%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Vol 3</th>
                    <th style="width: 9%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Sat 3</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Harga Satuan (Rp)</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 9pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Jumlah (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                $totalDiusulkan = 0;
                $currentKategori = '';
                $subtotalKategori = 0;
                $itemCount = count($kegiatan['anggaran']);
                $currentIndex = 0;
                
                foreach ($kegiatan['anggaran'] as $item): 
                    $currentIndex++;
                    
                    // Detect kategori change - print subtotal for previous kategori
                    if (isset($item['nama_kategori']) && $item['nama_kategori'] != $currentKategori) {
                        // Print subtotal for previous kategori (if not first item)
                        if ($currentKategori !== '' && $subtotalKategori > 0) {
                            ?>
                            <tr style="background-color: #f5f5f5;">
                                <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 8px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                                    Subtotal <?= htmlspecialchars($currentKategori) ?>
                                </td>
                                <td style="text-align: right; border: 1px solid #000; padding: 8px; font-weight: bold; font-family: 'Times New Roman', Times, serif;">
                                    Rp <?= number_format($subtotalKategori, 0, ',', '.') ?>
                                </td>
                            </tr>
                            <?php
                            $subtotalKategori = 0; // Reset subtotal
                        }
                        
                        // Set new kategori
                        $currentKategori = $item['nama_kategori'];
                        ?>
                        <tr style="background-color: #e0e0e0;">
                            <td colspan="10" style="font-weight: bold; padding: 8px; border: 1px solid #000; font-family: 'Times New Roman', Times, serif;">
                                <?= htmlspecialchars($currentKategori) ?>
                            </td>
                        </tr>
                        <?php
                    }
                    
                    // Calculate volume total
                    $volume = $item['volume1'];
                    if ($item['volume2']) $volume *= $item['volume2'];
                    if ($item['volume3']) $volume *= $item['volume3'];
                    
                    $jumlah = $volume * $item['harga_satuan'];
                    $totalDiusulkan += $jumlah;
                    $subtotalKategori += $jumlah;
                ?>
                <tr>
                    <td style="text-align: center; width: 4%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= $no++ ?></td>
                    <td style="width: 20%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($item['uraian']) ?></td>
                    <td style="text-align: center; width: 7%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= number_format($item['volume1'], 0, ',', '.') ?></td>
                    <td style="text-align: center; width: 8%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($item['nama_satuan1'] ?? '-') ?></td>
                    <td style="text-align: center; width: 7%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= $item['volume2'] ? number_format($item['volume2'], 0, ',', '.') : '-' ?></td>
                    <td style="text-align: center; width: 8%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($item['nama_satuan2'] ?? '-') ?></td>
                    <td style="text-align: center; width: 7%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= $item['volume3'] ? number_format($item['volume3'], 0, ',', '.') : '-' ?></td>
                    <td style="text-align: center; width: 9%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($item['nama_satuan3'] ?? '-') ?></td>
                    <td style="text-align: right; width: 15%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= number_format($item['harga_satuan'], 0, ',', '.') ?></td>
                    <td style="text-align: right; width: 15%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= number_format($jumlah, 0, ',', '.') ?></td>
                </tr>
                <?php 
                    // Print subtotal for last kategori after last item
                    if ($currentIndex === $itemCount && $subtotalKategori > 0) {
                        ?>
                        <tr style="background-color: #f5f5f5;">
                            <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 6px; font-weight: bold; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">
                                Subtotal <?= htmlspecialchars($currentKategori) ?>
                            </td>
                            <td style="text-align: right; border: 1px solid #000; padding: 6px; font-weight: bold; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">
                                Rp <?= number_format($subtotalKategori, 0, ',', '.') ?>
                            </td>
                        </tr>
                        <?php
                    }
                ?>
                <?php endforeach; ?>
                
                <tr style="background-color: #f0f0f0;">
                    <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 8px; font-family: 'Times New Roman', Times, serif;"><strong style="font-family: 'Times New Roman', Times, serif;">TOTAL ANGGARAN DIUSULKAN</strong></td>
                    <td style="text-align: right; border: 1px solid #000; padding: 8px; font-family: 'Times New Roman', Times, serif;"><strong style="font-family: 'Times New Roman', Times, serif;">Rp <?= number_format($totalDiusulkan, 0, ',', '.') ?></strong></td>
                </tr>
                
                <?php if (isset($kegiatan['total_anggaran_disetujui']) && $kegiatan['total_anggaran_disetujui']): ?>
                <tr style="background-color: #f0f0f0;">
                    <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 8px; font-family: 'Times New Roman', Times, serif;"><strong style="font-family: 'Times New Roman', Times, serif;">TOTAL ANGGARAN DISETUJUI</strong></td>
                    <td style="text-align: right; border: 1px solid #000; padding: 8px; font-family: 'Times New Roman', Times, serif;"><strong style="font-family: 'Times New Roman', Times, serif;">Rp <?= number_format($kegiatan['total_anggaran_disetujui'], 0, ',', '.') ?></strong></td>
                </tr>
                <?php endif; ?>
            </tbody>
        </table>
        <?php else: ?>
        <p style="font-style: italic; color: #666; font-family: 'Times New Roman', Times, serif;">Belum ada rincian anggaran biaya.</p>
        <?php endif; ?>
    </div>

    <!-- VII. INDIKATOR KINERJA UTAMA (IKU) -->
    <?php if (!empty($kegiatan['iku'])): ?>
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">VII. KETERKAITAN DENGAN INDIKATOR KINERJA UTAMA (IKU)</div>
        <table cellpadding="3" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse; margin: 0;">
            <thead>
                <tr>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">No</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Kode IKU</th>
                    <th style="width: 62%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Nama IKU</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Target</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                foreach ($kegiatan['iku'] as $iku): 
                ?>
                <tr>
                    <td style="width: 8%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= $no++ ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($iku['kode_iku']) ?></td>
                    <td style="width: 62%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($iku['nama_iku']) ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= number_format($iku['target'], 0, ',', '.') ?> <?= htmlspecialchars($iku['nama_satuan'] ?? '') ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <!-- VIII. LAMPIRAN DOKUMEN -->
    <?php if (!empty($kegiatan['lampiran'])): ?>
    <div style="margin-bottom: 30px; padding: 0;">
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-bottom: 15px; color: #000; line-height: 1.4;">VIII. LAMPIRAN DOKUMEN PENDUKUNG</div>
        <table cellpadding="3" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse; margin: 0;">
            <thead>
                <tr>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">No</th>
                    <th style="width: 52%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Nama File</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Tipe File</th>
                    <th style="width: 25%; background-color: #e8e8e8; border: 1px solid #000; padding: 4px; text-align: center; font-size: 10pt; line-height: 1.3; font-family: 'Times New Roman', Times, serif;">Tanggal Upload</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                foreach ($kegiatan['lampiran'] as $lampiran): 
                ?>
                <tr>
                    <td style="width: 8%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= $no++ ?></td>
                    <td style="width: 52%; border: 1px solid #000; padding: 5px; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($lampiran['nama_file_asli']) ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= strtoupper(htmlspecialchars($lampiran['tipe_file'])) ?></td>
                    <td style="width: 25%; border: 1px solid #000; padding: 5px; text-align: center; line-height: 1.3; font-family: 'Times New Roman', Times, serif;"><?= date('d F Y H:i', strtotime($lampiran['created_at'])) ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <!-- PENGESAHAN - HALAMAN TERPISAH -->
    <div style="page-break-before: always; padding-top: 100px; margin-top: 80px; text-align: right;">
        <div style="text-align: left; margin-bottom: 40px; margin-left: 40px;">
            <p style="margin: 0; font-size: 12pt; font-family: 'Times New Roman', Times, serif;">Depok, <?= date('d F Y') ?></p>
        </div>
        
        <table style="width: 100%; border: none; margin-top: 50px;">
            <tr>
                <td style="width: 50%; border: none; vertical-align: top; text-align: center; padding-right: 20px;">
                    <strong style="font-size: 12pt; font-family: 'Times New Roman', Times, serif;">Mengetahui,</strong><br>
                    <strong style="font-size: 12pt; font-family: 'Times New Roman', Times, serif;">Kepala Bagian</strong><br>
                    <div style="height: 100px;"></div>
                    <div style="border-bottom: 1px solid #000; width: 250px; display: inline-block;"></div>
                    <br><br>
                    <strong style="font-size: 11pt; font-family: 'Times New Roman', Times, serif;">(...........................)</strong>
                </td>
                <td style="width: 50%; border: none; vertical-align: top; text-align: center; padding-left: 20px;">
                    <strong style="font-size: 12pt; font-family: 'Times New Roman', Times, serif;">Pengusul Kegiatan,</strong><br><br>
                    <div style="height: 100px;"></div>
                    <div style="border-bottom: 1px solid #000; width: 250px; display: inline-block;"></div>
                    <br><br>
                    <strong style="font-size: 11pt; font-family: 'Times New Roman', Times, serif;"><?= htmlspecialchars($kegiatan['pengusul_nama']) ?></strong>
                </td>
            </tr>
        </table>
    </div>

    <!-- Document Footer Info -->
    <div style="font-size: 9pt; color: #666; text-align: center; border-top: 1px solid #ccc; padding-top: 15px; margin-top: 60px; line-height: 1.6;">
        <p style="font-family: 'Times New Roman', Times, serif;">Dokumen ini digenerate oleh Sistem Informasi SIGAP PNJ pada <?= date('d F Y H:i:s') ?></p>
        <p style="font-family: 'Times New Roman', Times, serif;">Dokumen ini sah dan dapat dipertanggungjawabkan.</p>
    </div>
</body>
</html>