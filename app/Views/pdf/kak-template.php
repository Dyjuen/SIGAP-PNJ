<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kerangka Acuan Kerja (KAK)</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #003d7a;
            padding-bottom: 15px;
        }
        .header h1 {
            margin: 0;
            color: #003d7a;
            font-size: 18pt;
            font-weight: bold;
        }
        .header h2 {
            margin: 5px 0 0 0;
            color: #666;
            font-size: 14pt;
            font-weight: normal;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            background-color: #003d7a;
            color: white;
            padding: 8px 12px;
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .info-row {
            margin-bottom: 8px;
        }
        .label {
            display: inline-block;
            width: 180px;
            font-weight: bold;
            color: #003d7a;
        }
        .value {
            display: inline;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table th {
            background-color: #003d7a;
            color: white;
            padding: 10px;
            text-align: left;
            font-size: 10pt;
            font-weight: bold;
        }
        table td {
            padding: 8px;
            border: 1px solid #ddd;
            font-size: 10pt;
        }
        table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
        .total-row {
            background-color: #e8f4f8 !important;
            font-weight: bold;
        }
        .footer {
            margin-top: 40px;
            text-align: right;
        }
        .signature {
            margin-top: 60px;
        }
        .signature-line {
            border-top: 1px solid #333;
            width: 200px;
            margin-top: 80px;
            display: inline-block;
        }
        hr {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <h1>KERANGKA ACUAN KERJA (KAK)</h1>
        <h2>POLITEKNIK NEGERI JAKARTA</h2>
    </div>

    <!-- Informasi Dasar -->
    <div class="section">
        <div class="section-title">I. INFORMASI KEGIATAN</div>
        
        <div class="info-row">
            <span class="label">Nama Kegiatan</span>
            <span class="value">: <?= htmlspecialchars($kegiatan['nama_kegiatan']) ?></span>
        </div>
        
        <div class="info-row">
            <span class="label">Pengusul</span>
            <span class="value">: <?= htmlspecialchars($kegiatan['pengusul_nama']) ?></span>
        </div>
        
        <div class="info-row">
            <span class="label">Tanggal Pelaksanaan</span>
            <span class="value">: <?= date('d F Y', strtotime($kegiatan['tanggal_mulai'])) ?> s/d <?= date('d F Y', strtotime($kegiatan['tanggal_selesai'])) ?></span>
        </div>
        
        <div class="info-row">
            <span class="label">Lokasi</span>
            <span class="value">: <?= htmlspecialchars($kegiatan['lokasi']) ?></span>
        </div>
        
        <div class="info-row">
            <span class="label">Sumber Dana</span>
            <span class="value">: <?= htmlspecialchars($kegiatan['nama_sumber_dana']) ?> (<?= htmlspecialchars($kegiatan['kode_anggaran']) ?>)</span>
        </div>
        
        <?php if ($kegiatan['kode_iku']): ?>
        <div class="info-row">
            <span class="label">Terkait IKU</span>
            <span class="value">: <?= htmlspecialchars($kegiatan['kode_iku']) ?> - <?= htmlspecialchars($kegiatan['nama_iku']) ?></span>
        </div>
        <?php endif; ?>
        
        <div class="info-row">
            <span class="label">Status</span>
            <span class="value">: <?= htmlspecialchars($kegiatan['nama_status']) ?></span>
        </div>
    </div>

    <!-- Deskripsi Kegiatan -->
    <div class="section">
        <div class="section-title">II. DESKRIPSI KEGIATAN</div>
        <p style="text-align: justify;">
            <?= nl2br(htmlspecialchars($kegiatan['deskripsi_kegiatan'])) ?>
        </p>
    </div>

    <!-- Rincian Anggaran -->
    <div class="section">
        <div class="section-title">III. RINCIAN ANGGARAN</div>
        
        <?php if (!empty($kegiatan['anggaran_items'])): ?>
        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 35%;">Uraian</th>
                    <th style="width: 10%;" class="text-center">Volume</th>
                    <th style="width: 10%;" class="text-center">Satuan</th>
                    <th style="width: 18%;" class="text-right">Harga Satuan (Rp)</th>
                    <th style="width: 22%;" class="text-right">Jumlah (Rp)</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                $totalDiusulkan = 0;
                foreach ($kegiatan['anggaran_items'] as $item): 
                    $totalDiusulkan += $item['jumlah_diusulkan'];
                ?>
                <tr>
                    <td class="text-center"><?= $no++ ?></td>
                    <td><?= htmlspecialchars($item['uraian']) ?></td>
                    <td class="text-center"><?= number_format($item['volume'], 0, ',', '.') ?></td>
                    <td class="text-center"><?= htmlspecialchars($item['nama_satuan']) ?></td>
                    <td class="text-right"><?= number_format($item['harga_satuan'], 0, ',', '.') ?></td>
                    <td class="text-right"><?= number_format($item['jumlah_diusulkan'], 0, ',', '.') ?></td>
                </tr>
                <?php endforeach; ?>
                
                <tr class="total-row">
                    <td colspan="5" class="text-right"><strong>TOTAL ANGGARAN DIUSULKAN</strong></td>
                    <td class="text-right"><strong>Rp <?= number_format($totalDiusulkan, 0, ',', '.') ?></strong></td>
                </tr>
                
                <?php if ($kegiatan['total_anggaran_disetujui']): ?>
                <tr class="total-row">
                    <td colspan="5" class="text-right"><strong>TOTAL ANGGARAN DISETUJUI</strong></td>
                    <td class="text-right"><strong>Rp <?= number_format($kegiatan['total_anggaran_disetujui'], 0, ',', '.') ?></strong></td>
                </tr>
                <?php endif; ?>
            </tbody>
        </table>
        <?php else: ?>
        <p style="font-style: italic; color: #999;">Belum ada rincian anggaran.</p>
        <?php endif; ?>
    </div>

    <!-- Lampiran -->
    <?php if (!empty($kegiatan['lampiran'])): ?>
    <div class="section">
        <div class="section-title">IV. LAMPIRAN DOKUMEN</div>
        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 50%;">Nama File</th>
                    <th style="width: 15%;">Tipe File</th>
                    <th style="width: 30%;">Tanggal Upload</th>
                </tr>
            </thead>
            <tbody>
                <?php 
                $no = 1;
                foreach ($kegiatan['lampiran'] as $lampiran): 
                ?>
                <tr>
                    <td class="text-center"><?= $no++ ?></td>
                    <td><?= htmlspecialchars($lampiran['nama_file_asli']) ?></td>
                    <td class="text-center"><?= strtoupper(htmlspecialchars($lampiran['tipe_file'])) ?></td>
                    <td><?= date('d F Y H:i', strtotime($lampiran['created_at'])) ?></td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php endif; ?>

    <!-- Footer/Tanda Tangan -->
    <div class="footer">
        <p>Depok, <?= date('d F Y') ?></p>
        <p>Pengusul,</p>
        <div class="signature">
            <div class="signature-line"></div>
            <p><strong><?= htmlspecialchars($kegiatan['pengusul_nama']) ?></strong></p>
        </div>
    </div>

    <!-- Document Info -->
    <hr>
    <p style="font-size: 8pt; color: #999; text-align: center;">
        Dokumen ini digenerate oleh Sistem SIGAP-PNJ pada <?= date('d F Y H:i:s') ?>
    </p>
</body>
</html>