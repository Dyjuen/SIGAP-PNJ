<?php
$emailContent = <<<HTML
<div class="greeting">
    Halo <strong>{$pengusul_nama}</strong>,
</div>

<div class="content">
    KAK Anda membutuhkan revisi sebelum dapat disetujui. Silakan pelajari catatan verifikator di bawah ini:
</div>

<div class="alert-box alert-warning">
    <strong>⚠️ Catatan untuk Revisi:</strong><br>
    {$catatan}
</div>

<div class="content">
    Silakan edit KAK Anda sesuai dengan catatan di atas dan submit kembali untuk review:
</div>

<div class="button-container">
    <a href="{$actionLink}" class="button">✏️ Edit & Resubmit</a>
</div>

<div class="content">
    Setelah Anda melakukan perubahan, KAK akan di-review kembali oleh verifikator.
</div>
HTML;

$subject = "⚠️ KAK Perlu Revisi";
require __DIR__ . '/_base.php';
?>
