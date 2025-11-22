<?php
// File: app/Views/emails/password-reset.php

ob_start();
?>

<p class="greeting">Halo <strong><?= htmlspecialchars($nama_user ?? 'User', ENT_QUOTES, 'UTF-8') ?></strong>,</p>

<p class="content">
    Password Anda untuk akun SIGAP PNJ telah berhasil direset atas permintaan Anda (atau oleh admin).
    Berikut adalah password sementara Anda yang baru:
</p>

<div class="info-box" style="text-align: center;">
    <p style="font-size: 18px; margin-bottom: 5px; color: #333;">Password Baru Anda:</p>
    <p style="font-size: 24px; font-weight: bold; color: #1e3c72; letter-spacing: 2px; margin: 0; padding: 10px; background-color: #f0f4f8; border-radius: 5px;">
        <?= htmlspecialchars($new_password ?? 'Tidak ada', ENT_QUOTES, 'UTF-8') ?>
    </p>
</div>

<p class="content">
    Segera login ke akun Anda menggunakan password baru ini. Untuk keamanan, kami sangat merekomendasikan Anda untuk <strong>segera mengganti password</strong> ini melalui menu pengaturan akun setelah berhasil login.
</p>

<div class="button-container">
    <a href="<?= htmlspecialchars($login_link ?? '#', ENT_QUOTES, 'UTF-8') ?>" class="button">Login ke SIGAP Sekarang</a>
</div>

<hr class="divider">

<p style="font-size: 12px; color: #888; text-align: center;">
    Jika Anda tidak merasa meminta reset password, mohon abaikan email ini atau hubungi admin jika Anda merasa ada aktivitas yang mencurigakan di akun Anda.
</p>

<?php
$emailContent = ob_get_clean();
require __DIR__ . '/_base.php';
?>
