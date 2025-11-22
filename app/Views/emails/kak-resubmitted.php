<?php
$emailContent = <<<HTML
<div class="greeting">
    Halo <strong>Verifikator</strong>,
</div>

<div class="content">
    KAK yang sebelumnya diminta revisi telah diperbaiki dan di-resubmit. Silakan review kembali:
</div>

<div class="alert-box alert-info">
    <strong>🔄 KAK Resubmitted</strong><br>
    Kegiatan: <span class="highlight">{$nama_kegiatan}</span><br>
    Diajukan oleh: {$pengusul_nama}<br>
    ID KAK: <span class="highlight">#{$kak_id}</span>
</div>

<div class="content">
    Terima kasih telah menunggu. Kami siap membantu jika ada pertanyaan tambahan.
</div>

<div class="button-container">
    <a href="{$actionLink}" class="button">🔍 Review Revisi</a>
</div>
HTML;

$subject = "🔄 KAK Sudah Direvisi - Perlu Review Ulang";
require __DIR__ . '/_base.php';
?>