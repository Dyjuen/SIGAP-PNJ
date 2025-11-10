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
        $telaahData = [
            'telaah_id' => 1,
            'nama_kegiatan' => 'Workshop Implementasi AI dalam Kurikulum Vokasi',
            'deskripsi_kegiatan' => 'Sebuah workshop untuk dosen guna merancang dan mengimplementasikan materi kecerdasan buatan (AI) ke dalam mata kuliah yang sudah ada di Politeknik Negeri Jakarta.',
            'metode_pelaksanaan' => 'Ceramah, Diskusi Kelompok, dan Sesi Praktik Langsung',
            'kurun_waktu_pelaksanaan' => '3 Hari',
            'tanggal_mulai' => '2025-12-01',
            'tanggal_selesai' => '2025-12-03',
            'lokasi' => 'Gedung Direktorat PNJ, Ruang Rapat Lt. 3',
            'pengusul_user_id' => 3, // Pengusul User (Dr. Budi Santoso)
            'mata_anggaran_id' => 1, // APBN-2025 (diasumsikan diisi oleh verifikator)
            'status_id' => 3, // Disetujui Verifikator
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        $this->table('t_telaah')->insert($telaahData)->saveData();

        // ============================================ 
        // 3. SEED PROPOSAL DETAILS (CHILD TABLES)
        // ============================================ 

        // 3a. Telaah IKU
        $this->table('t_telaah_iku')->insert([
            ['telaah_id' => 1, 'iku_id' => 4, 'persentase_target' => 100], // Praktisi Mengajar
            ['telaah_id' => 1, 'iku_id' => 7, 'persentase_target' => 100], // Kelas Kolaboratif
        ])->saveData();

        // 3b. Telaah Anggaran
        $this->table('t_telaah_anggaran')->insert([
            [
                'anggaran_id' => 1, 'telaah_id' => 1, 'uraian' => 'Honorarium Narasumber Industri (Ahli AI)',
                'volume1' => 1, 'satuan_id' => 4, 'harga_satuan' => 5000000, // Paket
                'jumlah_diusulkan' => 5000000,
            ],
            [
                'anggaran_id' => 2, 'telaah_id' => 1, 'uraian' => 'Konsumsi Peserta (50 orang x 1 hari)',
                'volume1' => 50, 'satuan_id' => 2, 'harga_satuan' => 50000, // Orang
                'jumlah_diusulkan' => 2500000,
            ]
        ])->saveData();
        
        // 3c. Telaah Lampiran (e.g., a quote for a budget item)
        $this->table('t_telaah_lampiran')->insert([
            [
                'lampiran_id' => 1, 'anggaran_id' => 1, // Lampiran untuk Honorarium Narasumber
                'nama_file_asli' => 'quotation_speaker_ai.pdf',
                'path_file_disimpan' => '/uploads/lampiran/mock_quotation_speaker_ai.pdf',
                'tipe_file' => 'application/pdf', 'uploader_user_id' => 3
            ]
        ])->saveData();

        // 3d. Manfaat, Tahapan, Indikator, Target
        $this->table('t_telaah_manfaat')->insert([
            ['telaah_id' => 1, 'manfaat' => 'Meningkatkan kompetensi dosen dalam bidang AI.', 'sasaran_utama' => 'Dosen PNJ']
        ])->saveData();
        $this->table('t_telaah_tahapan')->insert([
            ['telaah_id' => 1, 'nama_tahapan' => 'Persiapan dan Koordinasi', 'urutan' => 1],
            ['telaah_id' => 1, 'nama_tahapan' => 'Pelaksanaan Workshop', 'urutan' => 2],
            ['telaah_id' => 1, 'nama_tahapan' => 'Evaluasi dan Pelaporan', 'urutan' => 3]
        ])->saveData();
        $this->table('t_telaah_indikator')->insert([
            ['telaah_id' => 1, 'deskripsi_indikator' => 'Jumlah RPS yang diperbarui dengan materi AI.']
        ])->saveData();
        $this->table('t_telaah_target')->insert([
            ['telaah_id' => 1, 'deskripsi_target' => 'Minimal 10 RPS diperbarui.', 'bulan_indikator' => 'Desember', 'persentase_target' => 100]
        ])->saveData();

        // 3e. Telaah Approval History
        $this->table('t_telaah_approval')->insert([
            [
                'telaah_id' => 1, 'approver_user_id' => 2, // Verifikator Keuangan
                'status' => 'Disetujui',
                'catatan' => 'Proposal sudah baik dan anggaran rasional. Disetujui untuk dilanjutkan.'
            ]
        ])->saveData();

        // ============================================ 
        // 4. SEED THE IMPLEMENTATION (KEGIATAN)
        // ============================================ 
        $this->table('t_kegiatan')->insert([
            [
                'kegiatan_id' => 1, 'telaah_id' => 1,
                'penanggung_jawab_manual' => 'Jurusan Teknik Informatika dan Komputer',
                'pelaksana_manual' => 'Panitia Workshop AI PNJ 2025',
                'tanggal_mulai_final' => '2025-12-01',
                'tgl_batas_lpj' => '2026-01-15',
            ]
        ])->saveData();

        // ============================================ 
        // 5. SEED IMPLEMENTATION APPROVAL FLOW
        // ============================================ 
        $this->table('t_kegiatan_approval')->insert([
            // Level 1: PPK (sudah disetujui)
            [
                'kegiatan_id' => 1, 'approver_user_id' => 4, // PPK User
                'approval_level' => 'PPK', 'status' => 'Disetujui',
                'catatan' => 'Rekomendasi diberikan untuk melanjutkan ke Wadir.'
            ],
            // Level 2: Wadir (sudah disetujui)
            [
                'kegiatan_id' => 1, 'approver_user_id' => 5, // Wadir 2 User
                'approval_level' => 'Wadir', 'status' => 'Disetujui',
                'catatan' => 'Disetujui untuk pencairan dana oleh Bendahara.'
            ],
            // Level 3: Bendahara Pencairan (status Aktif, ini adalah tugas saat ini)
            [
                'kegiatan_id' => 1, 'approver_user_id' => null,
                'approval_level' => 'Bendahara-Cair', 'status' => 'Aktif',
                'catatan' => null
            ],
            // Level 4: Bendahara LPJ (masih menunggu kegiatan selesai)
            [
                'kegiatan_id' => 1, 'approver_user_id' => null,
                'approval_level' => 'Bendahara-LPJ', 'status' => 'Menunggu',
                'catatan' => null
            ]
        ])->saveData();

        echo "✅ Kegiatan seeder (new architecture) completed successfully!\n";
    }
}
