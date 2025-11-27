<?php
$emailData = [
    'title' => 'Dana Telah Dicairkan',
    'status_color' => '#28a745',
    'icon_text' => '✓',
    'body' => "Halo <strong>{$pengusul_nama}</strong>,<br><br>Kabar baik! Dana untuk kegiatan \"<strong>{$nama_kegiatan}</strong>\" telah berhasil dicairkan sebesar <strong>{$jumlah_dicair}</strong>.<br><br>Anda memiliki waktu <strong>14 hari</strong> dari sekarang untuk menyerahkan Laporan Pertanggungjawaban (LPJ). Batas akhir pengumpulan LPJ adalah <strong>{$batas_lpj}</strong>.",
    'button_text' => 'Lihat Detail Kegiatan',
    'button_link' => $actionLink
];

$subject = "Dana Kegiatan Telah Dicairkan";

require __DIR__ . '/_base.php';
?>
