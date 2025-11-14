<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class KegiatanSeeder extends AbstractSeed
{
    public function run(): void
    {
        // ============================================ 
        // 1. CLEAR EXISTING TRANSACTIONAL DATA
        // ============================================ 
        $this->execute('SET FOREIGN_KEY_CHECKS = 0');
        
        // Truncate tables in reverse order of dependency
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
        
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // ============================================ 
        // 2. SCENARIO 1: KAK in "Review Verifikator"
        // ============================================ 
        $kak1_data = [
            'tipe_kegiatan_id' => 1, // Akademik
            'nama_kegiatan' => 'Seminar Nasional Blockchain untuk Pendidikan',
            'deskripsi_kegiatan' => 'Seminar untuk memperkenalkan potensi teknologi blockchain dalam meningkatkan transparansi dan keamanan data di sektor pendidikan.',
            'metode_pelaksanaan' => 'Hybrid (Online via Zoom & Offline di Aula PNJ)',
            'kurun_waktu_pelaksanaan' => '1 Hari',
            'tanggal_mulai' => '2025-11-20',
            'tanggal_selesai' => '2025-11-20',
            'lokasi' => 'Aula Gedung Direktorat PNJ',
            'pengusul_user_id' => 3, // Pengusul
            'mata_anggaran_id' => 2, // PNBP
            'status_id' => 2, // Review Verifikator
        ];
        $this->table('t_kak')->insert($kak1_data)->saveData();

        // Anggaran for KAK 1
        $this->table('t_kak_anggaran')->insert([
            [ 'kak_id' => 1, 'uraian' => 'Sewa Platform Zoom', 'volume1' => 1, 'satuan1_id' => 4, 'harga_satuan' => 1500000, 'jumlah_diusulkan' => 1500000 ],
            [ 'kak_id' => 1, 'uraian' => 'Konsumsi Peserta Offline', 'volume1' => 100, 'satuan1_id' => 2, 'harga_satuan' => 35000, 'jumlah_diusulkan' => 3500000 ],
        ])->saveData();
        
        // IKU for KAK 1
        $this->table('t_kak_iku')->insert([
            ['kak_id' => 1, 'iku_id' => 6, 'persentase_target' => 100],
            ['kak_id' => 1, 'iku_id' => 7, 'persentase_target' => 100]
        ])->saveData();

        // Log status for KAK 1
        $this->table('t_kak_log_status')->insert([
            [ 'kak_id' => 1, 'status_id_lama' => 1, 'status_id_baru' => 2, 'actor_user_id' => 3, 'catatan' => 'Mengajukan usulan KAK.' ]
        ])->saveData();
        
        // Manfaat for KAK 1
        $this->table('t_kak_manfaat')->insert([
            [ 'kak_id' => 1, 'manfaat' => 'Meningkatkan pemahaman sivitas akademika tentang teknologi baru.', 'sasaran_utama' => 'Dosen dan Mahasiswa PNJ' ]
        ])->saveData();

        // ============================================ 
        // 3. SCENARIO 2: KAK Approved -> Becomes Kegiatan
        // ============================================ 
        $kak2_data = [
            'tipe_kegiatan_id' => 4, // Kerja Sama
            'nama_kegiatan' => 'Workshop Implementasi AI dalam Kurikulum Vokasi',
            'deskripsi_kegiatan' => 'Sebuah workshop untuk dosen guna merancang dan mengimplementasikan materi kecerdasan buatan (AI) ke dalam mata kuliah yang sudah ada di PNJ, bekerja sama dengan praktisi industri.',
            'metode_pelaksanaan' => 'Ceramah, Diskusi Kelompok, dan Sesi Praktik Langsung',
            'kurun_waktu_pelaksanaan' => '3 Hari',
            'tanggal_mulai' => '2025-12-01',
            'tanggal_selesai' => '2025-12-03',
            'lokasi' => 'Gedung Direktorat PNJ, Ruang Rapat Lt. 3',
            'pengusul_user_id' => 3, 
            'mata_anggaran_id' => 1, // APBN
            'status_id' => 6, // Status: Proses Pencairan (KAK approved)
        ];
        $this->table('t_kak')->insert($kak2_data)->saveData();

        // Anggaran for KAK 2
        $this->table('t_kak_anggaran')->insert([
            [ 'kak_id' => 2, 'uraian' => 'Honorarium Narasumber Industri', 'volume1' => 2, 'satuan1_id' => 2, 'harga_satuan' => 2500000, 'jumlah_diusulkan' => 5000000 ],
            [ 'kak_id' => 2, 'uraian' => 'Paket Materi Workshop', 'volume1' => 50, 'satuan1_id' => 4, 'harga_satuan' => 150000, 'jumlah_diusulkan' => 7500000 ],
        ])->saveData();

        // IKU for KAK 2
        $this->table('t_kak_iku')->insert([
            ['kak_id' => 2, 'iku_id' => 4, 'persentase_target' => 100],
        ])->saveData();
        
        // Log status for KAK 2
        $this->table('t_kak_log_status')->insert([
            [ 'kak_id' => 2, 'status_id_lama' => 1, 'status_id_baru' => 2, 'actor_user_id' => 3, 'catatan' => 'Mengajukan usulan KAK.' ],
            [ 'kak_id' => 2, 'status_id_lama' => 2, 'status_id_baru' => 3, 'actor_user_id' => 2, 'catatan' => 'KAK disetujui oleh Verifikator.' ],
            [ 'kak_id' => 2, 'status_id_lama' => 3, 'status_id_baru' => 6, 'actor_user_id' => 4, 'catatan' => 'Usulan kegiatan disetujui PPK, masuk tahap pencairan.' ],
        ])->saveData();
        
        // Approval history for KAK 2
        $this->table('t_kak_approval')->insert([
            [ 'kak_id' => 2, 'approver_user_id' => 2, 'status' => 'Disetujui', 'catatan' => 'Silakan dilanjutkan ke proses kegiatan.' ]
        ])->saveData();

        // --- Corresponding Kegiatan record ---
        $kegiatan1_data = [
            'kak_id' => 2,
            'surat_pengantar_path' => 'uploads/mock/surat_pengantar_AI_workshop.pdf',
            'penanggung_jawab_manual' => 'Jurusan Teknik Informatika dan Komputer',
            'pelaksana_manual' => 'Panitia Workshop AI PNJ 2025',
            'tanggal_mulai_final' => '2025-12-01',
            'tgl_batas_lpj' => '2026-01-15',
        ];
        $this->table('t_kegiatan')->insert($kegiatan1_data)->saveData();
        
        // Lampiran for Kegiatan 1 (linked to anggaran_id 4)
        $this->table('t_kegiatan_lampiran')->insert([
            [ 'anggaran_id' => 4, 'nama_file_asli' => 'invoice_materi_workshop.pdf', 'path_file_disimpan' => 'uploads/mock/invoice_materi_workshop.pdf', 'uploader_user_id' => 3, 'catatan' => 'Invoice dari percetakan.' ]
        ])->saveData();

        // Approval flow for Kegiatan 1
        $this->table('t_kegiatan_approval')->insert([
            [ 'kegiatan_id' => 1, 'approver_user_id' => 4, 'status' => 'Disetujui', 'catatan' => 'OK, laksanakan.'], // PPK
            [ 'kegiatan_id' => 1, 'approver_user_id' => 5, 'status' => 'Aktif'], // Wadir
            [ 'kegiatan_id' => 1, 'approver_user_id' => 6, 'status' => 'Menunggu'], // Bendahara
        ])->saveData();


        echo "✅ Kegiatan seeder (with 2 scenarios) completed successfully!\n";
        echo "   - Scenario 1: KAK ID 1 (Seminar Blockchain) is waiting for Verifikator review.\n";
        echo "   - Scenario 2: KAK ID 2 (Workshop AI) is approved and created Kegiatan ID 1, now waiting for Wadir approval.\n";
    }
}
