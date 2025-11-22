<?php
$emailContent = <<<HTML
<div class="greeting">
    Halo <strong>{$pengusul_nama}</strong>,
</div>

<div class="content">
    Mohon maaf, KAK Anda telah ditolak oleh verifikator. Silakan baca catatan berikut:
</div>

<div class="alert-box alert-danger">
    <strong>❌ Alasan Penolakan:</strong><br>
    {$catatan}
</div>

<div class="info-box">
    <strong>ID KAK:</strong> #{$kak_id}<br>
    <strong>Kegiatan:</strong> {$nama_kegiatan}
</div>

<div class="content">
    Anda bisa membuat KAK baru atau menghubungi tim verifikator untuk mendiskusikan keputusan ini.
</div>

<div class="content">
    Terima kasih atas pemahaman Anda.
</div>
HTML;

$subject = "❌ KAK Ditolak";
require __DIR__ . '/_base.php';
?>