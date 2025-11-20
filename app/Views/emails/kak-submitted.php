<?php
$emailContent = <<<HTML
<div class="greeting">
    Halo <strong>Verifikator</strong>,
</div>

<div class="content">
    Ada KAK baru yang telah disubmit dan membutuhkan verifikasi:
</div>

<div class="alert-box alert-info">
    <strong>📌 Informasi KAK</strong><br>
    Nama Kegiatan: <span class="highlight">{$nama_kegiatan}</span><br>
    Diajukan oleh: {$pengusul_nama}<br>
    ID KAK: <span class="highlight">#{$kak_id}</span>
</div>

<div class="content">
    Silakan review KAK ini dan memberikan feedback atau persetujuan melalui tombol di bawah:
</div>

<div class="button-container">
    <a href="{$actionLink}" class="button">🔍 Review KAK</a>
</div>

<div class="content">
    Terima kasih atas perhatian Anda.
</div>
HTML;

$subject = "🔔 KAK Baru Membutuhkan Verifikasi";
include '_base.php';
?>
