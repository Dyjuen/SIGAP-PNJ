<?php
require_once __DIR__ . '/vendor/autoload.php';

use App\Services\Mailer;

$mailer = new Mailer();

// Test email
$html = $mailer->renderTemplate('kak-submitted', [
    'nama_kegiatan' => 'Kegiatan Test',
    'pengusul_nama' => 'Dr. Budi Santoso',
    'kak_id' => 123,
    'link_detail' => 'http://localhost/app/kak/verify/123',
    'actionLink' => 'http://localhost/app/kak/verify/123',
]);

$result = $mailer->send(
    'duia.putra12@gmail.com',
    'Test Email - SIGAP PNJ',
    $html
);

if ($result) {
    echo "✅ Email berhasil dikirim!";
} else {
    echo "❌ Email gagal dikirim!";
}
?>