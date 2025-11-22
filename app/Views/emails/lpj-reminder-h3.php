<?php
ob_start();
?>

<p class="greeting">Halo <strong><?= htmlspecialchars($pengusul_nama ?? 'User', ENT_QUOTES, 'UTF-8') ?></strong>,</p>

<p class="content">
    Ini adalah pengingat bahwa Laporan Pertanggungjawaban (LPJ) untuk kegiatan:
    <br><strong>"<?= htmlspecialchars($nama_kegiatan ?? '[Nama Kegiatan]', ENT_QUOTES, 'UTF-8') ?>"</strong>
    <br>harus diserahkan dalam 3 hari.
</p>

<div class="button-container">
    <a href="<?= htmlspecialchars($actionLink ?? '#', ENT_QUOTES, 'UTF-8') ?>" class="button">Lihat Detail Kegiatan</a>
</div>

<hr class="divider">

<p style="font-size: 12px; color: #888; text-align: center;">
    ID Kegiatan Anda adalah #<?= htmlspecialchars($kegiatan_id ?? '0', ENT_QUOTES, 'UTF-8') ?>.
</p>

<?php
$emailContent = ob_get_clean();
require __DIR__ . '/_base.php';
?>
