<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kerangka Acuan Kerja (KAK)</title>
    <!-- TEMPLATE VERSION: 2025-12-03-11:15 - CENTERED PAPER EFFECT FOR PREVIEW -->
    <style>
        @page {
            margin: 2cm 3cm;
        }
        
        /* Preview Mode: Paper Effect */
        html {
            background: #525659; /* Dark background for contrast */
        }
        
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.8;
            color: #000;
            background: #fff; /* White paper background */
            max-width: 21cm; /* A4 width */
            margin: 2cm auto; /* Centered with top/bottom margin */
            padding: 2cm 3cm; /* Inner padding for content */
            box-sizing: border-box;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Paper shadow effect */
            min-height: 29.7cm; /* A4 height */
        }
        
        /* Cover Page Styles - ULTRA COMPACT */
        .cover-page {
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            page-break-after: always;
            padding: 40px 20px; /* Reduced padding for paper effect */
        }
        .cover-logo {
            width: 350px;
            height: auto;
            margin: 0 auto 10px; /* Logo ke title SANGAT DEKAT */
        }
        .cover-title {
            font-size: 18pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 0; /* NO MARGIN - super rapat */
            letter-spacing: 1px;
            line-height: 1.2;
        }
        .cover-subtitle {
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 3px 0 0 0; /* Hanya 3px dari title */
            letter-spacing: 0.5px;
            line-height: 1.2;
        }
        .cover-activity-section {
            margin: 15px 0 0 0; /* Margin atas saja, bawah 0 */
            line-height: 1.3;
        }
        .cover-activity-label {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 2px; /* Label ke nama DEKAT */
        }
        .cover-activity-name {
            font-size: 13pt;
            font-weight: normal;
            margin: 0 60px;
            line-height: 1.2;
        }
        .cover-unit-section {
            margin: 5px 0 0 0; /* Sangat dekat dari activity */
        }
        .cover-unit-label {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 2px;
        }
        .cover-unit-name {
            font-size: 14pt;
            font-weight: bold;
            margin: 0;
            line-height: 1.2;
        }
        .cover-footer {
            margin-top: 30px; /* Footer lebih dekat */
        }
        .cover-footer p {
            font-size: 13pt;
            font-weight: normal;
            margin: 2px 0; /* Antar line footer SANGAT DEKAT */
            line-height: 1.2;
        }
        .cover-footer .year {
            font-size: 14pt;
            font-weight: bold;
            margin-top: 8px; /* Tahun sedikit lebih jauh */
        }
        .doc-title {
            text-align: center;
            margin: 30px 0;
        }
        .doc-title h1 {
            font-size: 18pt;
            font-weight: bold;
            text-decoration: underline;
            margin: 0;
        }
        .section {
            margin-bottom: 8px;
            page-break-inside: avoid;
            padding: 0; /* Removed extra padding - body already has padding */
        }
        .section-title {
            font-size: 13pt;
            font-weight: bold;
            margin-bottom: 8px;
            color: #000;
        }
        .info-grid {
            margin-bottom: 10px;
        }
        .info-row {
            margin-bottom: 8px;
        }
        .info-table {
            width: 100%;
            border: none;
            margin: 10px 0;
        }
        .info-table td {
            border: none;
            padding: 5px 0;
            vertical-align: top;
            font-size: 11pt;
        }
        .info-table .label {
            width: 200px;
            font-weight: normal;
        }
        .info-table .separator {
            width: 20px;
            text-align: center;
        }
        .info-table .value {
            font-weight: normal;
        }
        .label {
            width: 200px;
            font-weight: normal;
            vertical-align: top;
        }
        .separator {
            width: 20px;
            vertical-align: top;
        }
        .value {
            vertical-align: top;
        }
        .content-text {
            text-align: justify;
            margin: 10px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        table th {
            background-color: #e8e8e8;
            color: #000;
            padding: 10px;
            text-align: center;
            font-size: 11pt;
            font-weight: bold;
            border: 1px solid #000;
        }
        table td {
            padding: 8px;
            border: 1px solid #000;
            font-size: 11pt;
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
        ul, ol {
            margin: 10px 0;
            padding-left: 30px;
        }
        li {
            margin-bottom: 8px;
            text-align: justify;
        }
        .signature-section {
            margin-top: 50px;
            text-align: right;
        }
        .signature-box {
            display: inline-block;
            text-align: center;
            min-width: 250px;
        }
        .signature-line {
            border-top: 1px solid #000;
            margin-top: 80px;
            margin-bottom: 5px;
        }
        .page-break {
            page-break-before: always;
        }
        .doc-footer {
            font-size: 9pt;
            color: #666;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            margin-top: 40px;
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
        <div class="cover-title">KERANGKA ACUAN KERJA</div>
        <div class="cover-subtitle">TAHUN ANGGARAN <?= date('Y', strtotime($kegiatan['tanggal_mulai'])) ?></div>
        
        <!-- Kegiatan -->
        <div class="cover-activity-section">
            <div class="cover-activity-label">Kegiatan :</div>
            <div class="cover-activity-name">
                <?= htmlspecialchars($kegiatan['nama_kegiatan']) ?>
            </div>
        </div>
        
        <!-- Unit Kerja -->
        <div class="cover-unit-section">
            <div class="cover-unit-label">Unit Kerja:</div>
            <div class="cover-unit-name"><?= htmlspecialchars($kegiatan['pengusul_nama']) ?></div>
        </div>
        
        <!-- Footer -->
        <div class="cover-footer">
            <p>Politeknik Negeri Jakarta</p>
            <p class="year">Tahun <?= date('Y', strtotime($kegiatan['tanggal_mulai'])) ?></p>
        </div>
    </div>

    <!-- ISI DOKUMEN MULAI DARI HALAMAN 2 (LEMBAR PENGESAHAN REMOVED) -->

    <!-- I. INFORMASI UMUM KEGIATAN -->
    <div class="section">
        <div class="section-title">I. INFORMASI UMUM KEGIATAN</div>
        
        <table class="info-table" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td class="label">Nama Kegiatan</td>
                <td class="separator">:</td>
                <td class="value"><?= htmlspecialchars($kegiatan['nama_kegiatan']) ?></td>
            </tr>
            
            <tr>
                <td class="label">Tipe Kegiatan</td>
                <td class="separator">:</td>
                <td class="value"><?= htmlspecialchars($kegiatan['nama_tipe_kegiatan'] ?? '-') ?></td>
            </tr>
            
            <tr>
                <td class="label">Pengusul</td>
                <td class="separator">:</td>
                <td class="value"><?= htmlspecialchars($kegiatan['pengusul_nama']) ?></td>
            </tr>
            
            <tr>
                <td class="label">Tanggal Pelaksanaan</td>
                <td class="separator">:</td>
                <td class="value"><?= date('d F Y', strtotime($kegiatan['tanggal_mulai'])) ?> s/d <?= date('d F Y', strtotime($kegiatan['tanggal_selesai'])) ?></td>
            </tr>
            
            <tr>
                <td class="label">Lokasi</td>
                <td class="separator">:</td>
                <td class="value"><?= htmlspecialchars($kegiatan['lokasi'] ?? '-') ?></td>
            </tr>
            
            <tr>
                <td class="label">Sumber Dana</td>
                <td class="separator">:</td>
                <td class="value"><?= htmlspecialchars($kegiatan['nama_sumber_dana'] ?? '-') ?> (<?= htmlspecialchars($kegiatan['kode_anggaran'] ?? '-') ?>)</td>
            </tr>
        </table>
    </div>

    <!-- II. GAMBARAN UMUM KEGIATAN -->
    <div class="section">
        <div class="section-title">II. GAMBARAN UMUM KEGIATAN</div>
        <div class="content-text">
            <?= nl2br(htmlspecialchars($kegiatan['gambaran_umum'] ?? $kegiatan['deskripsi_kegiatan'] ?? 'Tidak ada deskripsi')) ?>
        </div>
    </div>

    <!-- III. PENERIMA MANFAAT -->
    <?php if (!empty($kegiatan['sasaran_utama']) || !empty($kegiatan['manfaat'])): ?>
    <div class="section">
        <div class="section-title">III. PENERIMA MANFAAT</div>
        
        <?php if (!empty($kegiatan['sasaran_utama'])): ?>
        <div style="margin-bottom: 15px;">
            <strong>Penerima Manfaat (Sasaran Utama):</strong>
            <div class="content-text" style="margin-top: 5px;">
                <?= nl2br(htmlspecialchars($kegiatan['sasaran_utama'])) ?>
            </div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($kegiatan['manfaat'])): ?>
        <div>
            <strong>Manfaat yang Diperoleh:</strong>
            <ol style="margin-top: 10px;">
                <?php foreach ($kegiatan['manfaat'] as $manfaatItem): ?>
                <li><?= htmlspecialchars($manfaatItem['manfaat']) ?></li>
                <?php endforeach; ?>
            </ol>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>

    <!-- IV. STRATEGI PENCAPAIAN -->
    <div class="section">
        <div class="section-title">IV. STRATEGI PENCAPAIAN</div>
        
        <?php if (!empty($kegiatan['metode_pelaksanaan'])): ?>
        <div style="margin-bottom: 20px;">
            <strong>Metode Pelaksanaan:</strong>
            <div class="content-text" style="margin-top: 10px;">
                <?= nl2br(htmlspecialchars($kegiatan['metode_pelaksanaan'])) ?>
            </div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($kegiatan['tahapan'])): ?>
        <div>
            <strong>Tahapan Pelaksanaan:</strong>
            <ol style="margin-top: 10px;">
                <?php foreach ($kegiatan['tahapan'] as $tahapan): ?>
                <li><?= htmlspecialchars($tahapan['nama_tahapan']) ?></li>
                <?php endforeach; ?>
            </ol>
        </div>
        <?php endif; ?>
    </div>

    <!-- V. INDIKATOR KINERJA / TARGET KEBERHASILAN -->
    <?php if (!empty($kegiatan['target'])): ?>
    <div class="section">
        <div class="section-title">V. INDIKATOR KINERJA / TARGET KEBERHASILAN</div>
        <table cellpadding="4" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">No</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Bulan</th>
                    <th style="width: 62%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Indikator Keberhasilan</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Target (%)</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                foreach ($kegiatan['target'] as $target): 
                ?>
                <tr>
                    <td style="width: 8%; border: 1px solid #000; padding: 8px; text-align: center;"><?= $no++ ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 8px; text-align: center;"><?= htmlspecialchars($target['bulan_indikator']) ?></td>
                    <td style="width: 62%; border: 1px solid #000; padding: 8px;"><?= htmlspecialchars($target['deskripsi_target']) ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 8px; text-align: center;"><?= number_format($target['persentase_target'], 0) ?>%</td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <!-- VI. RINCIAN ANGGARAN BIAYA (RAB) -->
    <div class="section page-break">
        <div class="section-title">VI. RINCIAN ANGGARAN BIAYA (RAB)</div>
        
        <?php if (!empty($kegiatan['anggaran'])): ?>
        <table cellpadding="4" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse;">
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
                    <th style="width: 4%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">No</th>
                    <th style="width: 20%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Uraian</th>
                    <th style="width: 7%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Vol 1</th>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Sat 1</th>
                    <th style="width: 7%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Vol 2</th>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Sat 2</th>
                    <th style="width: 7%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Vol 3</th>
                    <th style="width: 9%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Sat 3</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Harga Satuan (Rp)</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 9pt;">Jumlah (Rp)</th>
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
                                <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 8px; font-weight: bold;">
                                    Subtotal <?= htmlspecialchars($currentKategori) ?>
                                </td>
                                <td style="text-align: right; border: 1px solid #000; padding: 8px; font-weight: bold;">
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
                            <td colspan="10" style="font-weight: bold; padding: 8px; border: 1px solid #000;">
                                <?= strtoupper(htmlspecialchars($currentKategori)) ?>
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
                    <td style="text-align: center; width: 4%; border: 1px solid #000; padding: 8px;"><?= $no++ ?></td>
                    <td style="width: 20%; border: 1px solid #000; padding: 8px;"><?= htmlspecialchars($item['uraian']) ?></td>
                    <td style="text-align: center; width: 7%; border: 1px solid #000; padding: 8px;"><?= number_format($item['volume1'], 0, ',', '.') ?></td>
                    <td style="text-align: center; width: 8%; border: 1px solid #000; padding: 8px;"><?= htmlspecialchars($item['nama_satuan1'] ?? '-') ?></td>
                    <td style="text-align: center; width: 7%; border: 1px solid #000; padding: 8px;"><?= $item['volume2'] ? number_format($item['volume2'], 0, ',', '.') : '-' ?></td>
                    <td style="text-align: center; width: 8%; border: 1px solid #000; padding: 8px;"><?= htmlspecialchars($item['nama_satuan2'] ?? '-') ?></td>
                    <td style="text-align: center; width: 7%; border: 1px solid #000; padding: 8px;"><?= $item['volume3'] ? number_format($item['volume3'], 0, ',', '.') : '-' ?></td>
                    <td style="text-align: center; width: 9%; border: 1px solid #000; padding: 8px;"><?= htmlspecialchars($item['nama_satuan3'] ?? '-') ?></td>
                    <td style="text-align: right; width: 15%; border: 1px solid #000; padding: 8px;"><?= number_format($item['harga_satuan'], 0, ',', '.') ?></td>
                    <td style="text-align: right; width: 15%; border: 1px solid #000; padding: 8px;"><?= number_format($jumlah, 0, ',', '.') ?></td>
                </tr>
                <?php 
                    // Print subtotal for last kategori after last item
                    if ($currentIndex === $itemCount && $subtotalKategori > 0) {
                        ?>
                        <tr style="background-color: #f5f5f5;">
                            <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 8px; font-weight: bold;">
                                Subtotal <?= htmlspecialchars($currentKategori) ?>
                            </td>
                            <td style="text-align: right; border: 1px solid #000; padding: 8px; font-weight: bold;">
                                Rp <?= number_format($subtotalKategori, 0, ',', '.') ?>
                            </td>
                        </tr>
                        <?php
                    }
                ?>
                <?php endforeach; ?>
                
                <tr style="background-color: #f0f0f0;">
                    <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 8px;"><strong>TOTAL ANGGARAN DIUSULKAN</strong></td>
                    <td style="text-align: right; border: 1px solid #000; padding: 8px;"><strong>Rp <?= number_format($totalDiusulkan, 0, ',', '.') ?></strong></td>
                </tr>
                
                <?php if (isset($kegiatan['total_anggaran_disetujui']) && $kegiatan['total_anggaran_disetujui']): ?>
                <tr style="background-color: #f0f0f0;">
                    <td colspan="9" style="text-align: right; border: 1px solid #000; padding: 8px;"><strong>TOTAL ANGGARAN DISETUJUI</strong></td>
                    <td style="text-align: right; border: 1px solid #000; padding: 8px;"><strong>Rp <?= number_format($kegiatan['total_anggaran_disetujui'], 0, ',', '.') ?></strong></td>
                </tr>
                <?php endif; ?>
            </tbody>
        </table>
        <?php else: ?>
        <p style="font-style: italic; color: #666;">Belum ada rincian anggaran biaya.</p>
        <?php endif; ?>
    </div>

    <!-- VII. INDIKATOR KINERJA UTAMA (IKU) -->
    <?php if (!empty($kegiatan['iku'])): ?>
    <div class="section">
        <div class="section-title">VII. KETERKAITAN DENGAN INDIKATOR KINERJA UTAMA (IKU)</div>
        <table cellpadding="4" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">No</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Kode IKU</th>
                    <th style="width: 62%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Nama IKU</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Target Kontribusi (%)</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                foreach ($kegiatan['iku'] as $iku): 
                ?>
                <tr>
                    <td style="width: 8%; border: 1px solid #000; padding: 8px; text-align: center;"><?= $no++ ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 8px; text-align: center;"><?= htmlspecialchars($iku['kode_iku']) ?></td>
                    <td style="width: 62%; border: 1px solid #000; padding: 8px;"><?= htmlspecialchars($iku['nama_iku']) ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 8px; text-align: center;"><?= number_format($iku['persentase_target'], 0) ?>%</td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <!-- VIII. LAMPIRAN DOKUMEN -->
    <?php if (!empty($kegiatan['lampiran'])): ?>
    <div class="section">
        <div class="section-title">VIII. LAMPIRAN DOKUMEN PENDUKUNG</div>
        <table cellpadding="4" cellspacing="0" border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="width: 8%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">No</th>
                    <th style="width: 52%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Nama File</th>
                    <th style="width: 15%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Tipe File</th>
                    <th style="width: 25%; background-color: #e8e8e8; border: 1px solid #000; padding: 5px; text-align: center; font-size: 10pt;">Tanggal Upload</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                foreach ($kegiatan['lampiran'] as $lampiran): 
                ?>
                <tr>
                    <td style="width: 8%; border: 1px solid #000; padding: 8px; text-align: center;"><?= $no++ ?></td>
                    <td style="width: 52%; border: 1px solid #000; padding: 8px;"><?= htmlspecialchars($lampiran['nama_file_asli']) ?></td>
                    <td style="width: 15%; border: 1px solid #000; padding: 8px; text-align: center;"><?= strtoupper(htmlspecialchars($lampiran['tipe_file'])) ?></td>
                    <td style="width: 25%; border: 1px solid #000; padding: 8px; text-align: center;"><?= date('d F Y H:i', strtotime($lampiran['created_at'])) ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <!-- PENGESAHAN - HALAMAN TERPISAH -->
    <div class="signature-section" style="page-break-before: always; padding-top: 100px;">
        <div style="text-align: left; margin-bottom: 40px; margin-left: 40px;">
            <p style="margin: 0; font-size: 12pt;">Depok, <?= date('d F Y') ?></p>
        </div>
        
        <table style="width: 100%; border: none; margin-top: 50px;">
            <tr>
                <td style="width: 50%; border: none; vertical-align: top; text-align: center; padding-right: 20px;">
                    <strong style="font-size: 12pt;">Mengetahui,</strong><br>
                    <strong style="font-size: 12pt;">Kepala Bagian</strong><br>
                    <div style="height: 100px;"></div>
                    <div style="border-bottom: 1px solid #000; width: 250px; display: inline-block;"></div>
                    <br><br>
                    <strong style="font-size: 11pt;">(...........................)</strong>
                </td>
                <td style="width: 50%; border: none; vertical-align: top; text-align: center; padding-left: 20px;">
                    <strong style="font-size: 12pt;">Pengusul Kegiatan,</strong><br><br>
                    <div style="height: 100px;"></div>
                    <div style="border-bottom: 1px solid #000; width: 250px; display: inline-block;"></div>
                    <br><br>
                    <strong style="font-size: 11pt;"><?= htmlspecialchars($kegiatan['pengusul_nama']) ?></strong>
                </td>
            </tr>
        </table>
    </div>

    <!-- Document Footer Info -->
    <div class="doc-footer">
        <p>Dokumen ini digenerate oleh Sistem Informasi SIGAP PNJ pada <?= date('d F Y H:i:s') ?></p>
        <p>Dokumen ini sah dan dapat dipertanggungjawabkan.</p>
    </div>
</body>
</html>