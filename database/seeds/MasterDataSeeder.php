<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class MasterDataSeeder extends AbstractSeed
{
    public function run(): void
    {
        // ============================================ 
        // 1. CLEAR ALL DATA
        // ============================================ 
        $this->execute('SET FOREIGN_KEY_CHECKS = 0');
        $this->execute('TRUNCATE TABLE t_kegiatan_approval');
        $this->execute('TRUNCATE TABLE t_kegiatan_lampiran');
        $this->execute('TRUNCATE TABLE t_kegiatan');
        $this->execute('TRUNCATE TABLE t_kak_approval');
        $this->execute('TRUNCATE TABLE t_kak_log_status');
        $this->execute('TRUNCATE TABLE t_kak_iku');
        $this->execute('TRUNCATE TABLE t_kak_manfaat');
        $this->execute('TRUNCATE TABLE t_kak_tahapan');
        $this->execute('TRUNCATE TABLE t_kak_indikator');
        $this->execute('TRUNCATE TABLE t_kak_target');
        $this->execute('TRUNCATE TABLE t_kak_anggaran');
        $this->execute('TRUNCATE TABLE t_kak');
        $this->execute('TRUNCATE TABLE m_media_panduan');
        $this->execute('TRUNCATE TABLE m_panduan');
        $this->execute('TRUNCATE TABLE m_users');
        $this->execute('TRUNCATE TABLE m_iku');
        $this->execute('TRUNCATE TABLE m_mata_anggaran');
        $this->execute('TRUNCATE TABLE m_satuan');
        $this->execute('TRUNCATE TABLE m_tipe_kegiatan');
        $this->execute('TRUNCATE TABLE m_kegiatan_status');
        $this->execute('TRUNCATE TABLE m_roles');
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // ============================================ 
        // 2. SEED MASTER DATA
        // ============================================ 
        // Roles
        $this->table('m_roles')->insert([['nama_role' => 'Admin'],['nama_role' => 'Verifikator'],['nama_role' => 'Pengusul'],['nama_role' => 'PPK'],['nama_role' => 'Wadir'],['nama_role' => 'Bendahara']])->saveData();
        // Tipe Kegiatan
        $this->table('m_tipe_kegiatan')->insert([['nama_tipe' => 'Bidang 1 - Akademik'],['nama_tipe' => 'Bidang 2 - Umum & Keuangan'],['nama_tipe' => 'Bidang 3 - Kemahasiswaan'],['nama_tipe' => 'Bidang 4 - Kerja Sama']])->saveData();
        // Kegiatan Status
        $this->table('m_kegiatan_status')->insert([['nama_status' => 'Draft'],['nama_status' => 'Review Verifikator'],['nama_status' => 'Disetujui Verifikator'],['nama_status' => 'Ditolak'],['nama_status' => 'Revisi'],['nama_status' => 'Proses Pencairan'],['nama_status' => 'Uang Muka Dicairkan'],['nama_status' => 'Kegiatan Berlangsung'],['nama_status' => 'Proses LPJ'],['nama_status' => 'Selesai']])->saveData();
        // Users
        $this->table('m_users')->insert([['username' => 'admin', 'password_hash' => password_hash('admin123', PASSWORD_BCRYPT),'nama_lengkap' => 'Administrator', 'email' => 'admin@pnj.ac.id', 'role_id' => 1],['username' => 'verifikator', 'password_hash' => password_hash('verif123', PASSWORD_BCRYPT),'nama_lengkap' => 'Verifikator Keuangan', 'email' => 'verifikator@pnj.ac.id', 'role_id' => 2],['username' => 'pengusul', 'password_hash' => password_hash('pengusul123', PASSWORD_BCRYPT),'nama_lengkap' => 'Dr. Budi Santoso', 'email' => 'pengusul@pnj.ac.id', 'role_id' => 3],['username' => 'ppk', 'password_hash' => password_hash('ppk123', PASSWORD_BCRYPT),'nama_lengkap' => 'Siti Aminah, S.E.', 'email' => 'ppk@pnj.ac.id', 'role_id' => 4],['username' => 'wadir2', 'password_hash' => password_hash('wadir2123', PASSWORD_BCRYPT),'nama_lengkap' => 'Prof. Dr. Ir. Widodo', 'email' => 'wadir2@pnj.ac.id', 'role_id' => 5],['username' => 'bendahara', 'password_hash' => password_hash('bendahara123', PASSWORD_BCRYPT),'nama_lengkap' => 'Rina Wijayanti, S.Ak', 'email' => 'bendahara@pnj.ac.id', 'role_id' => 6]])->saveData();

        // ============================================ 
        // 3. SEED PANDUAN, MEDIA, KEGIATAN
        // ============================================ 
        // Panduan Seeder Logic
        $this->table('m_panduan')->insert([['judul_panduan' => 'Ringkasan Alur Sistem SIGAP PNJ', 'isi_panduan' => 'Alur lengkap dari pengajuan hingga selesai.', 'target_role_id' => 1],['judul_panduan' => 'Mengunggah Kerangka Acuan Kerja (KAK)', 'isi_panduan' => 'Langkah-langkah untuk pengusul.', 'target_role_id' => 3],['judul_panduan' => 'Verifikasi Kerangka Acuan Kerja (KAK)', 'isi_panduan' => 'Langkah-langkah untuk verifikator.', 'target_role_id' => 2],['judul_panduan' => 'Menyetujui Kegiatan (untuk PPK)', 'isi_panduan' => 'Langkah-langkah untuk PPK.', 'target_role_id' => 4],['judul_panduan' => 'Menyetujui Kegiatan (untuk Wadir)', 'isi_panduan' => 'Langkah-langkah untuk Wadir.', 'target_role_id' => 5]])->saveData();
        
        // MediaPanduan Seeder Logic
        $this->table('m_media_panduan')->insert([['tipe' => 'template', 'judul' => 'Template Kerangka Acuan Kerja (KAK)', 'path_or_url' => '/path/to/template-kak.docx'],['tipe' => 'template', 'judul' => 'Template Laporan Pertanggungjawaban (LPJ)', 'path_or_url' => '/path/to/template-lpj.xlsx'],['tipe' => 'video', 'judul' => 'Video Tutorial: Cara Mengajukan Kegiatan Baru', 'path_or_url' => 'https://www.youtube.com/watch?v=example1']])->saveData();

        // KegiatanSeeder Logic
        $this->table('t_kak')->insert([['tipe_kegiatan_id' => 1, 'nama_kegiatan' => 'Pelatihan Internal Desain Grafis', 'pengusul_user_id' => 3, 'status_id' => 1, 'tanggal_mulai' => '2025-12-10', 'tanggal_selesai' => '2025-12-11'],['tipe_kegiatan_id' => 2, 'nama_kegiatan' => 'Pengadaan Server Baru untuk Lab', 'pengusul_user_id' => 3, 'status_id' => 2, 'tanggal_mulai' => '2025-11-25', 'tanggal_selesai' => '2025-11-30'],['tipe_kegiatan_id' => 3, 'nama_kegiatan' => 'Lomba Debat Mahasiswa Nasional', 'pengusul_user_id' => 3, 'status_id' => 5, 'tanggal_mulai' => '2026-01-15', 'tanggal_selesai' => '2026-01-17'],['tipe_kegiatan_id' => 4, 'nama_kegiatan' => 'Kerjasama Industri dengan PT. ABC', 'pengusul_user_id' => 3, 'status_id' => 10, 'tanggal_mulai' => '2025-10-01', 'tanggal_selesai' => '2025-10-31'],['tipe_kegiatan_id' => 1, 'nama_kegiatan' => 'Seminar Akademik Big Data', 'pengusul_user_id' => 3, 'status_id' => 6, 'tanggal_mulai' => '2025-11-05', 'tanggal_selesai' => '2025-11-05'],['tipe_kegiatan_id' => 2, 'nama_kegiatan' => 'Renovasi Ruang Kelas Gedung Z', 'pengusul_user_id' => 3, 'status_id' => 6, 'tanggal_mulai' => '2025-09-10', 'tanggal_selesai' => '2025-09-30']])->save();
        $this->table('t_kegiatan')->insert([['kak_id' => 4, 'tgl_batas_lpj' => '2025-11-15', 'lpj_submitted_at' => '2025-11-10'],['kak_id' => 5, 'tgl_batas_lpj' => '2025-12-20', 'lpj_submitted_at' => null],['kak_id' => 6, 'tgl_batas_lpj' => '2025-10-15', 'lpj_submitted_at' => null]])->save();

        echo "✅ All data seeded successfully in correct order!\n";
    }
}