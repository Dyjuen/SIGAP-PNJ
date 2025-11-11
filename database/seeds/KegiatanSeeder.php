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
            'mata_anggaran_id' => 1, // APBN-2025
            'status_id' => 6, // DIUBAH: Status menjadi 'Proses Pencairan' karena kegiatan sudah dibuat
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        $this->table('t_telaah')->insert($telaahData)->saveData();

        // Details (anggaran, iku, etc.)
        $this->table('t_telaah_iku')->insert([['telaah_id' => 1, 'iku_id' => 4, 'persentase_target' => 100],['telaah_id' => 1, 'iku_id' => 7, 'persentase_target' => 100]])->saveData();
        $this->table('t_telaah_anggaran')->insert([['anggaran_id' => 1, 'telaah_id' => 1, 'uraian' => 'Honorarium Narasumber Industri', 'volume1' => 1, 'satuan_id' => 4, 'harga_satuan' => 5000000, 'jumlah_diusulkan' => 5000000],['anggaran_id' => 2, 'telaah_id' => 1, 'uraian' => 'Konsumsi Peserta', 'volume1' => 50, 'satuan_id' => 2, 'harga_satuan' => 50000, 'jumlah_diusulkan' => 2500000]])->saveData();
        $this->table('t_telaah_approval')->insert([['telaah_id' => 1, 'approver_user_id' => 2, 'status' => 'Disetujui', 'catatan' => 'Disetujui untuk dilanjutkan.']])->saveData();

        // ============================================ 
        // 4. SEED THE IMPLEMENTATION (KEGIATAN) - DIKEMBALIKAN
        // ============================================ 
        $this->table('t_kegiatan')->insert([
            [
                'kegiatan_id' => 1, 
                'telaah_id' => 1,
                'surat_pengantar_path' => '/storage/uploads/documents/surat_pengantar_mock.pdf', // Path palsu
                'penanggung_jawab_manual' => 'Jurusan Teknik Informatika dan Komputer',
                'pelaksana_manual' => 'Panitia Workshop AI PNJ 2025',
                'tanggal_mulai_final' => '2025-12-01',
                'tgl_batas_lpj' => '2026-01-15',
            ]
        ])->saveData();

        // ============================================ 
        // 5. SEED IMPLEMENTATION APPROVAL FLOW - DIKEMBALIKAN
        // ============================================ 
        $this->table('t_kegiatan_approval')->insert([
            // Level 1: PPK (status Aktif, tugas sekarang)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => 4,
                'approval_level' => 'PPK',
                'status' => 'Aktif',
                'catatan' => null
            ],
            // Level 2: Wadir (masih menunggu)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => 5,
                'approval_level' => 'Wadir',
                'status' => 'Menunggu',
                'catatan' => null
            ],
            // Level 3: Bendahara Pencairan (masih menunggu)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => 6,
                'approval_level' => 'Bendahara-Cair',
                'status' => 'Menunggu',
                'catatan' => null
            ],
            // Level 4: Bendahara LPJ (masih menunggu)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => 6,
                'approval_level' => 'Bendahara-LPJ',
                'status' => 'Menunggu',
                'catatan' => null
            ]
        ])->saveData();

        echo "✅ Kegiatan seeder (with full flow) completed successfully!\n";
    }
}
