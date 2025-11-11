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
        // 2. SEED A COMPLETE PROPOSAL (TELAAH)
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
            'pengusul_user_id' => 3, 
            'mata_anggaran_id' => 1, 
            'status_id' => 6, // ✅ Status: Proses Pencairan (sudah disetujui verifikator)
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ];
        $this->table('t_telaah')->insert($telaahData)->saveData();

        // Details - IKU
        $this->table('t_telaah_iku')->insert([
            ['telaah_id' => 1, 'iku_id' => 4, 'persentase_target' => 100],
            ['telaah_id' => 1, 'iku_id' => 7, 'persentase_target' => 100]
        ])->saveData();

        // Details - Anggaran
        $this->table('t_telaah_anggaran')->insert([
            [
                'anggaran_id' => 1, 
                'telaah_id' => 1, 
                'uraian' => 'Honorarium Narasumber Industri', 
                'volume1' => 1, 
                'volume2' => null,
                'satuan_id' => 4, 
                'harga_satuan' => 5000000, 
                'jumlah_diusulkan' => 5000000
            ],
            [
                'anggaran_id' => 2, 
                'telaah_id' => 1, 
                'uraian' => 'Konsumsi Peserta', 
                'volume1' => 50,
                'volume2' => null, 
                'satuan_id' => 2, 
                'harga_satuan' => 50000, 
                'jumlah_diusulkan' => 2500000
            ]
        ])->saveData();

        // Telaah Approval History (sudah disetujui verifikator)
        $this->table('t_telaah_approval')->insert([
            [
                'telaah_id' => 1, 
                'approver_user_id' => 2, // Verifikator
                'status' => 'APPROVED', 
                'catatan' => 'Disetujui untuk dilanjutkan ke tahap pencairan.',
                'created_at' => date('Y-m-d H:i:s')
            ]
        ])->saveData();

        // ============================================ 
        // 4. SEED THE IMPLEMENTATION (KEGIATAN)
        // ============================================ 
        $this->table('t_kegiatan')->insert([
            [
                'kegiatan_id' => 1, 
                'telaah_id' => 1,
                'surat_pengantar_path' => '/storage/uploads/documents/surat_pengantar_mock.pdf',
                'penanggung_jawab_manual' => 'Jurusan Teknik Informatika dan Komputer',
                'pelaksana_manual' => 'Panitia Workshop AI PNJ 2025',
                'tanggal_mulai_final' => '2025-12-01',
                'tgl_batas_lpj' => '2026-01-15',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ])->saveData();

        // ============================================ 
        // 5. SEED IMPLEMENTATION APPROVAL FLOW
        // ✅ FIX: Sekarang menggunakan NULL untuk approver_user_id
        //         karena belum ada yang approve
        // ============================================ 
        $this->table('t_kegiatan_approval')->insert([
            // Level 1: PPK (status Aktif, menunggu approval)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => null, // ✅ FIX: NULL karena belum di-approve
                'approval_level' => 'PPK',
                'status' => 'Aktif',
                'catatan' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            // Level 2: Wadir (masih menunggu)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => null, // ✅ FIX: NULL karena belum sampai tahap ini
                'approval_level' => 'Wadir',
                'status' => 'Menunggu',
                'catatan' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            // Level 3: Bendahara Pencairan (masih menunggu)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => null, // ✅ FIX: NULL karena belum sampai tahap ini
                'approval_level' => 'Bendahara-Cair',
                'status' => 'Menunggu',
                'catatan' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            // Level 4: Bendahara LPJ (masih menunggu)
            [
                'kegiatan_id' => 1,
                'approver_user_id' => null, // ✅ FIX: NULL karena belum sampai tahap ini
                'approval_level' => 'Bendahara-LPJ',
                'status' => 'Menunggu',
                'catatan' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ])->saveData();

        echo "✅ Kegiatan seeder (with full flow) completed successfully!\n";
        echo "ℹ️  Kegiatan ID 1 siap untuk di-approve oleh PPK (user_id: 4)\n";
    }
}