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
        $this->execute('TRUNCATE TABLE t_kegiatan_approval');
        $this->execute('TRUNCATE TABLE t_kegiatan');
        $this->execute('TRUNCATE TABLE t_telaah_approval');
        $this->execute('TRUNCATE TABLE t_telaah_iku');
        $this->execute('TRUNCATE TABLE t_telaah_lampiran');
        $this->execute('TRUNCATE TABLE t_telaah_anggaran');
        $this->execute('TRUNCATE TABLE t_telaah_manfaat');
        $this->execute('TRUNCATE TABLE t_telaah_tahapan');
        $this->execute('TRUNCATE TABLE t_telaah_indikator');
        $this->execute('TRUNCATE TABLE t_telaah_target');
        $this->execute('TRUNCATE TABLE t_telaah_log_status');
        $this->execute('TRUNCATE TABLE t_telaah');
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // ============================================ 
        // 2. SEED A COMPLETE PROPOSAL (TELAHAH)
        // ============================================ 
        $telaahTable = $this->table('t_telaah');
        $telaahTable->insert([
            [
                'telaah_id' => 1,
                'nama_kegiatan' => 'Workshop Implementasi AI dalam Kurikulum Vokasi',
                'deskripsi_kegiatan' => 'Sebuah workshop untuk dosen guna merancang dan mengimplementasikan materi kecerdasan buatan (AI) ke dalam mata kuliah yang sudah ada di Politeknik Negeri Jakarta.',
                'sasaran_utama' => 'Dosen PNJ',
                'metode_pelaksanaan' => 'Ceramah, Diskusi Kelompok, dan Sesi Praktik Langsung',
                'total_anggaran_diusulkan' => 7500000,
                'pengusul_user_id' => 3, // User Pengusul
                'unit_kerja_id' => 5, // Prodi TI
                'status_id' => 3, // Disetujui
                'mata_anggaran_id' => 1, // Diisi oleh verifikator
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ])->saveData();

        // ============================================ 
        // 3. SEED PROPOSAL DETAILS
        // ============================================ 

        // 3a. Telaah IKU
        $this->table('t_telaah_iku')->insert([
            ['telaah_id' => 1, 'iku_id' => 4], // Praktisi Mengajar
            ['telaah_id' => 1, 'iku_id' => 7], // Kelas Kolaboratif
        ])->saveData();

        // 3b. Telaah Anggaran
        $this->table('t_telaah_anggaran')->insert([
            [
                'anggaran_id' => 1,
                'telaah_id' => 1,
                'uraian' => 'Honorarium Narasumber Industri',
                'volume' => 1,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 5000000,
                'jumlah_diusulkan' => 5000000,
            ],
            [
                'anggaran_id' => 2,
                'telaah_id' => 1,
                'uraian' => 'Konsumsi Peserta (50 orang)',
                'volume' => 50,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 50000,
                'jumlah_diusulkan' => 2500000,
            ]
        ])->saveData();
        
        // 3c. Telaah Lampiran (for a specific budget item)
        $this->table('t_telaah_lampiran')->insert([
            [
                'lampiran_id' => 1,
                'anggaran_id' => 1, // Lampiran untuk Honorarium Narasumber
                'nama_file_asli' => 'quotation_speaker_ai.pdf',
                'path_file_disimpan' => '/uploads/lampiran/quotation_speaker_ai_mock.pdf',
                'tipe_file' => 'application/pdf',
                'uploader_user_id' => 3
            ]
        ])->saveData();

        // 3d. Telaah Approval (Tugas untuk Verifikator)
        $this->table('t_telaah_approval')->insert([
            [
                'telaah_id' => 1,
                'approver_user_id' => 2, // User Verifikator
                'status' => 'Disetujui',
                'catatan' => 'Proposal sudah baik, anggaran disetujui. Silakan dilanjutkan ke tahap pelaksanaan.'
            ]
        ])->saveData();

        // ============================================ 
        // 4. SEED THE IMPLEMENTATION (KEGIATAN)
        // ============================================ 
        $kegiatanTable = $this->table('t_kegiatan');
        $kegiatanTable->insert([
            [
                'kegiatan_id' => 1,
                'telaah_id' => 1,
                // Contoh: Penanggung jawab adalah Unit Kerja
                'penanggung_jawab_unit_id' => 1, // Jurusan TIK
                'penanggung_jawab_manual' => null,
                // Contoh: Pelaksana adalah nama manual
                'pelaksana_unit_id' => null,
                'pelaksana_manual' => 'Panitia Workshop AI PNJ',
                'tanggal_mulai_final' => '2025-12-01',
                'tgl_batas_lpj' => '2025-12-20',
            ]
        ])->saveData();

        // ============================================ 
        // 5. SEED IMPLEMENTATION APPROVAL FLOW
        // ============================================ 
        $this->table('t_kegiatan_approval')->insert([
            // Level 1: PPK (sudah disetujui)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => 4, // User PPK
                'approval_level' => 'PPK',
                'status' => 'Disetujui',
                'catatan' => 'Rekomendasi diberikan untuk melanjutkan.'
            ],
            // Level 2: Wadir (sudah disetujui)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => 5, // User WD2
                'approval_level' => 'Wadir',
                'status' => 'Disetujui',
                'catatan' => 'Disetujui untuk pencairan dana.'
            ],
            // Level 3: Bendahara Pencairan (status Aktif, tugas sekarang)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => null,
                'approval_level' => 'Bendahara-Cair',
                'status' => 'Aktif',
                'catatan' => null
            ],
            // Level 4: Bendahara LPJ (masih menunggu)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => null,
                'approval_level' => 'Bendahara-LPJ',
                'status' => 'Menunggu',
                'catatan' => null
            ]
        ])->saveData();

        echo "✅ Kegiatan seeder (new architecture) completed successfully!\n";
    }
}
