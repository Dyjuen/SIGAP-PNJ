<?php
$emailContent = <<<HTML
<div class="greeting">
    Halo <strong>{$pengusul_nama}</strong>,
</div>

<div class="content">
    Selamat! KAK Anda telah disetujui oleh verifikator. Anda sekarang bisa melanjutkan ke tahap pembuatan kegiatan.
</div>

<div class="alert-box alert-success">
    <strong>✅ KAK Disetujui</strong><br>
    Kegiatan: <span class="highlight">{$nama_kegiatan}</span><br>
    ID KAK: <span class="highlight">#{$kak_id}</span><br>
    Status: Siap untuk membuat kegiatan
</div>

<div class="content">
    Langkah selanjutnya adalah membuat kegiatan berdasarkan KAK ini. Klik tombol di bawah untuk melanjutkan:
</div>

<div class="button-container">
    <a href="{$actionLink}" class="button">📋 Buat Kegiatan</a>
</div>

<div class="content">
    Jika ada pertanyaan, silakan hubungi tim verifikator.
</div>
HTML;

$subject = "✅ KAK Disetujui - Lanjutkan ke Kegiatan";
include '_base.php';
?>