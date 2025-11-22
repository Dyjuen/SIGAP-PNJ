<?php
ob_start();
?>

<p class="greeting">Halo Tim Bendahara,</p>

<p class="content">
    Laporan Pertanggungjawaban (LPJ) baru telah diserahkan oleh <strong><?= htmlspecialchars($pengusul_nama ?? 'User', ENT_QUOTES, 'UTF-8') ?></strong> untuk kegiatan:
    <br><strong>"<?= htmlspecialchars($nama_kegiatan ?? '[Nama Kegiatan]', ENT_QUOTES, 'UTF-8') ?>"</strong>
</p>
<p class="content">
    Mohon untuk direview.
</p>

<div class="button-container">
    <a href="<?= htmlspecialchars($actionLink ?? '#', ENT_QUOTES, 'UTF-8') ?>" class="button">Review LPJ</a>
</div>

<hr class="divider">

<p style="font-size: 12px; color: #888; text-align: center;">
    ID Kegiatan Anda adalah #<?= htmlspecialchars($kegiatan_id ?? '0', ENT_QUOTES, 'UTF-8') ?>.
</p>

<?php
$emailContent = ob_get_clean();
require __DIR__ . '/_base.php';
?>
