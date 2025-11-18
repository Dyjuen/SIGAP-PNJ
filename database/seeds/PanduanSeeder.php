<?php

use Phinx\Seed\AbstractSeed;

class PanduanSeeder extends AbstractSeed
{
    public function run(): void
    {
        // Clear existing data before re-seeding
        $this->execute('TRUNCATE TABLE m_panduan');
        // Define role IDs from MasterDataSeeder for easy reference
        $admin_role_id = 1;
        $verifikator_role_id = 2;
        $pengusul_role_id = 3;
        $ppk_role_id = 4;
        $wadir_role_id = 5;
        $bendahara_role_id = 6;

        $data = [
            // Panduan Ringkasan Alur Website (Untuk Admin - Melihat keseluruhan proses)
            [
                'judul_panduan' => 'Ringkasan Alur Sistem SIGAP PNJ',
                'isi_panduan' => '
                    <h4>Selamat Datang di Sistem Informasi Pengajuan Anggaran dan Pelaporan (SIGAP) PNJ!</h4>
                    <p>Sistem ini dirancang untuk mempermudah proses pengajuan KAK, kegiatan, pencairan dana, hingga pelaporan pertanggungjawaban di lingkungan Politeknik Negeri Jakarta.</p>
                    <h5>Alur Umum:</h5>
                    <ol>
                        <li>**Pengajuan KAK:** Pengusul membuat dan mengajukan KAK.</li>
                        <li>**Verifikasi KAK:** Verifikator meninjau dan memverifikasi KAK.</li>
                        <li>**Persetujuan Kegiatan:** Pimpinan (PPK/Wadir) menyetujui kegiatan berdasarkan KAK yang sudah diverifikasi.</li>
                        <li>**Pencairan Dana:** Proses pengajuan pencairan dana oleh Pengusul setelah kegiatan disetujui, dan diproses oleh Bendahara.</li>
                        <li>**Pelaksanaan & Pelaporan:** Kegiatan dilaksanakan, Pengusul mengunggah lampiran dan laporan pertanggungjawaban (LPJ).</li>
                        <li>**Monitoring & Penyelesaian:** Semua pihak dapat memantau progres hingga kegiatan selesai dan LPJ disetujui.</li>
                    </ol>
                    <p>Untuk detail setiap langkah, silakan lihat panduan spesifik yang tersedia.</p>
                ',
                'target_role_id' => $admin_role_id // Khusus Admin untuk melihat overview
            ],
            // Panduan Mengunggah Kerangka Acuan Kerja (KAK) - Untuk Pengusul
            [
                'judul_panduan' => 'Mengunggah Kerangka Acuan Kerja (KAK)',
                'isi_panduan' => '
                    <h4>Langkah-langkah mengunggah KAK (untuk Pengusul):</h4>
                    <ol>
                        <li>Masuk ke menu "KAK" melalui sidebar.</li>
                        <li>Klik tombol "Buat KAK Baru" atau ikon tambah.</li>
                        <li>Isi semua informasi yang diperlukan pada formulir, seperti judul kegiatan, latar belakang, tujuan, dan rincian lainnya.</li>
                        <li>Lengkapi bagian anggaran dengan menambahkan mata anggaran dan rincian biaya yang relevan.</li>
                        <li>Setelah semua data terisi, klik tombol "Simpan" atau "Ajukan" untuk mengirim KAK.</li>
                        <li>KAK Anda akan masuk ke dalam daftar dengan status "Menunggu Verifikasi".</li>
                    </ol>
                ',
                'target_role_id' => $pengusul_role_id
            ],
            // Panduan Verifikasi Kerangka Acuan Kerja (KAK) - Untuk Verifikator
            [
                'judul_panduan' => 'Verifikasi Kerangka Acuan Kerja (KAK)',
                'isi_panduan' => '
                    <h4>Langkah-langkah memverifikasi KAK (untuk Verifikator):</h4>
                    <ol>
                        <li>Masuk ke menu "Approval KAK" melalui sidebar.</li>
                        <li>Anda akan melihat daftar KAK yang memerlukan persetujuan dengan status "Menunggu Verifikasi".</li>
                        <li>Pilih salah satu KAK untuk ditinjau, lalu klik tombol "Detail" atau ikon mata.</li>
                        <li>Periksa seluruh kelengkapan dan kesesuaian data KAK.</li>
                        <li>Jika KAK disetujui, klik tombol "Setujui". Status KAK akan berubah menjadi "Disetujui".</li>
                        <li>Jika KAK perlu perbaikan, klik tombol "Tolak" dan berikan catatan revisi yang jelas agar dapat diperbaiki oleh pengusul.</li>
                    </ol>
                ',
                'target_role_id' => $verifikator_role_id
            ],
            // Panduan Menyetujui Kegiatan - Untuk PPK
            [
                'judul_panduan' => 'Menyetujui Kegiatan (untuk PPK)',
                'isi_panduan' => '
                    <h4>Langkah-langkah menyetujui Kegiatan (untuk PPK):</h4>
                    <ol>
                        <li>Setelah KAK diverifikasi oleh Verifikator, kegiatan akan muncul di menu "Approval Kegiatan".</li>
                        <li>Masuk ke menu tersebut untuk melihat daftar kegiatan yang siap untuk disetujui.</li>
                        <li>Pilih salah satu kegiatan dan lakukan peninjauan akhir.</li>
                        <li>Klik tombol "Setujui" untuk mengesahkan kegiatan tersebut.</li>
                        <li>Setelah disetujui, pengusul dapat melanjutkan ke tahap pencairan dana.</li>
                    </ol>
                ',
                'target_role_id' => $ppk_role_id
            ],
            // Panduan Menyetujui Kegiatan - Untuk Wadir
            [
                'judul_panduan' => 'Menyetujui Kegiatan (untuk Wadir)',
                'isi_panduan' => '
                    <h4>Langkah-langkah menyetujui Kegiatan (untuk Wadir):</h4>
                    <ol>
                        <li>Setelah KAK diverifikasi oleh Verifikator, kegiatan akan muncul di menu "Approval Kegiatan".</li>
                        <li>Masuk ke menu tersebut untuk melihat daftar kegiatan yang siap untuk disetujui.</li>
                        <li>Pilih salah satu kegiatan dan lakukan peninjauan akhir.</li>
                        <li>Klik tombol "Setujui" untuk mengesahkan kegiatan tersebut.</li>
                        <li>Setelah disetujui, pengusul dapat melanjutkan ke tahap pencairan dana.</li>
                    </ol>
                ',
                'target_role_id' => $wadir_role_id
            ],
            // Panduan Mencairkan Dana Kegiatan - Untuk Bendahara
            [
                'judul_panduan' => 'Mencairkan Dana Kegiatan',
                'isi_panduan' => '
                    <h4>Langkah-langkah mencairkan dana (untuk Bendahara):</h4>
                    <ol>
                        <li>Pengusul akan mengajukan pencairan dana. Permintaan ini akan muncul di dashboard atau menu "Pencairan".</li>
                        <li>Tinjau detail pengajuan pencairan dana, termasuk dokumen pendukung.</li>
                        <li>Verifikasi kelengkapan dan keabsahan dokumen.</li>
                        <li>Jika sesuai, proses pencairan dana dan perbarui status kegiatan.</li>
                        <li>Sistem akan mengirim notifikasi kepada Pengusul setelah dana dicairkan.</li>
                    </ol>
                ',
                'target_role_id' => $bendahara_role_id
            ],
            // Panduan Memantau Berkas Lampiran dan LPJ - Untuk Pengusul
            [
                'judul_panduan' => 'Memantau Berkas Lampiran dan LPJ (Pengusul)',
                'isi_panduan' => '
                    <h4>Langkah-langkah memantau progres kegiatan dan Laporan Pertanggungjawaban (LPJ) (untuk Pengusul):</h4>
                    <ol>
                        <li>Masuk ke menu "Kegiatan Saya".</li>
                        <li>Pilih kegiatan yang sedang berjalan untuk melihat detailnya.</li>
                        <li>Di halaman detail kegiatan, Anda dapat melihat status terkini, termasuk progres unggah lampiran dan LPJ.</li>
                        <li>Unggah lampiran bukti kegiatan (seperti foto, daftar hadir) dan dokumen LPJ sebelum batas waktu yang ditentukan.</li>
                        <li>Pastikan semua kewajiban laporan terpenuhi agar kegiatan dapat dinyatakan "Selesai".</li>
                    </ol>
                ',
                'target_role_id' => $pengusul_role_id
            ],
            // Panduan Memantau Berkas Lampiran dan LPJ - Untuk Verifikator
            [
                'judul_panduan' => 'Memantau Berkas Lampiran dan LPJ (Verifikator)',
                'isi_panduan' => '
                    <h4>Langkah-langkah memantau dan memverifikasi berkas lampiran serta LPJ (untuk Verifikator):</h4>
                    <ol>
                        <li>Masuk ke menu "Monitoring Kegiatan".</li>
                        <li>Pilih kegiatan yang lampiran atau LPJ-nya perlu ditinjau.</li>
                        <li>Periksa kelengkapan dan kesesuaian berkas yang diunggah oleh Pengusul.</li>
                        <li>Berikan persetujuan atau minta revisi jika ada kekurangan.</li>
                        <li>Pastikan semua berkas valid sebelum kegiatan dinyatakan "Selesai".</li>
                    </ol>
                ',
                'target_role_id' => $verifikator_role_id
            ]
        ];

        $this->table('m_panduan')->insert($data)->saveData();
    }
}