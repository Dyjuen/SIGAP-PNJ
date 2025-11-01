<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class KegiatanSeeder extends AbstractSeed
{
    public function run(): void
    {
        // Clear existing data
        $this->execute('SET FOREIGN_KEY_CHECKS = 0');
        $this->execute('TRUNCATE TABLE t_kegiatan_target');
        $this->execute('TRUNCATE TABLE t_kegiatan_indikator');
        $this->execute('TRUNCATE TABLE t_kegiatan_tahapan');
        $this->execute('TRUNCATE TABLE t_kegiatan_manfaat');
        $this->execute('TRUNCATE TABLE t_kegiatan_anggaran');
        $this->execute('TRUNCATE TABLE t_kegiatan_lampiran');
        $this->execute('TRUNCATE TABLE t_kegiatan_log_status');
        $this->execute('TRUNCATE TABLE t_kegiatan');
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // ============================================
        // INSERT SAMPLE KEGIATAN
        // ============================================
        $kegiatan = [
            [
                'kegiatan_id' => 1,
                'nama_kegiatan' => 'Workshop Pengembangan Web dengan PHP dan MySQL',
                'deskripsi_kegiatan' => 'Workshop ini bertujuan untuk meningkatkan kemampuan dosen dan mahasiswa dalam pengembangan aplikasi web menggunakan PHP dan MySQL. Materi meliputi: dasar-dasar PHP, koneksi database, CRUD operations, dan implementasi REST API. Workshop akan dilaksanakan selama 3 hari dengan metode praktik langsung.',
                'sasaran_utama' => 'Mahasiswa Teknik Informatika',
                'metode_pelaksanaan' => 'Workshop dilaksanakan dengan metode praktik langsung menggunakan studi kasus pengembangan sistem informasi. Setiap peserta akan membuat project sendiri dengan bimbingan instruktur.',
                'iku_id' => 2,
                'bulan_indikator_kinerja' => 'November',
                'tanggal_mulai' => '2025-11-10',
                'tanggal_selesai' => '2025-11-12',
                'lokasi' => 'Laboratorium Komputer Gedung C Lantai 3',
                'total_anggaran_diusulkan' => 15000000,
                'total_anggaran_disetujui' => 14500000,
                'pengusul_user_id' => 3,
                'unit_kerja_id' => 1,
                'mata_anggaran_id' => 1,
                'status_id' => 3, // Disetujui
                'catatan_umum' => 'Kegiatan sudah disetujui dengan penyesuaian anggaran konsumsi.',
                'catatan_revisi_terakhir' => null,
                'catatan_nama_kegiatan' => null,
                'catatan_deskripsi_kegiatan' => null,
                'catatan_sasaran_utama' => null,
                'catatan_metode_pelaksanaan' => null,
                'catatan_iku' => null,
                'catatan_bulan_indikator' => null,
                'catatan_tanggal_mulai' => null,
                'catatan_tanggal_selesai' => null,
                'catatan_lokasi' => null,
                'catatan_total_anggaran' => 'Anggaran konsumsi dikurangi dari usulan awal.',
                'catatan_unit_kerja' => null,
                'catatan_mata_anggaran' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 2,
                'nama_kegiatan' => 'Seminar Nasional Teknologi Informasi dan Komunikasi',
                'deskripsi_kegiatan' => 'Seminar nasional dengan tema "Transformasi Digital dalam Pendidikan Tinggi Vokasi" menghadirkan pembicara dari industri dan akademisi. Kegiatan ini bertujuan untuk berbagi pengetahuan dan pengalaman terkait implementasi teknologi digital dalam proses pembelajaran. Target peserta adalah dosen, mahasiswa, dan praktisi IT.',
                'sasaran_utama' => 'Dosen, Mahasiswa, dan Praktisi IT',
                'metode_pelaksanaan' => 'Seminar dilaksanakan secara hybrid (offline dan online) dengan 2 keynote speaker dan 4 sesi presentasi paper. Peserta dapat berinteraksi melalui sesi tanya jawab.',
                'iku_id' => 4,
                'bulan_indikator_kinerja' => 'November',
                'tanggal_mulai' => '2025-11-20',
                'tanggal_selesai' => '2025-11-20',
                'lokasi' => 'Auditorium Politeknik Negeri Jakarta',
                'total_anggaran_diusulkan' => 25000000,
                'total_anggaran_disetujui' => null,
                'pengusul_user_id' => 3,
                'unit_kerja_id' => 1,
                'mata_anggaran_id' => 1,
                'status_id' => 2, // Dalam Review
                'catatan_umum' => null,
                'catatan_revisi_terakhir' => 'Perlu ditambahkan detail rundown acara dan daftar speaker yang sudah confirmed.',
                'catatan_nama_kegiatan' => null,
                'catatan_deskripsi_kegiatan' => 'Tambahkan informasi tentang jumlah paper yang akan dipresentasikan.',
                'catatan_sasaran_utama' => null,
                'catatan_metode_pelaksanaan' => null,
                'catatan_iku' => null,
                'catatan_bulan_indikator' => null,
                'catatan_tanggal_mulai' => null,
                'catatan_tanggal_selesai' => null,
                'catatan_lokasi' => null,
                'catatan_total_anggaran' => null,
                'catatan_unit_kerja' => null,
                'catatan_mata_anggaran' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 3,
                'nama_kegiatan' => 'Pelatihan Sertifikasi Jaringan Komputer CCNA',
                'deskripsi_kegiatan' => 'Program pelatihan intensif untuk mempersiapkan mahasiswa dalam menghadapi ujian sertifikasi CCNA (Cisco Certified Network Associate). Materi meliputi: dasar-dasar jaringan, routing dan switching, network security, dan troubleshooting. Pelatihan dilaksanakan selama 2 minggu dengan praktek menggunakan simulator dan perangkat real.',
                'sasaran_utama' => 'Mahasiswa Teknik Komputer dan Jaringan',
                'metode_pelaksanaan' => 'Pelatihan intensif dengan rasio teori:praktek 30:70. Menggunakan perangkat Cisco asli dan simulator Packet Tracer. Setiap peserta mendapat voucher ujian sertifikasi.',
                'iku_id' => 1,
                'bulan_indikator_kinerja' => 'Desember',
                'tanggal_mulai' => '2025-12-01',
                'tanggal_selesai' => '2025-12-14',
                'lokasi' => 'Laboratorium Jaringan Komputer Gedung D',
                'total_anggaran_diusulkan' => 30000000,
                'total_anggaran_disetujui' => null,
                'pengusul_user_id' => 3,
                'unit_kerja_id' => 1,
                'mata_anggaran_id' => 1,
                'status_id' => 1, // Draft
                'catatan_umum' => null,
                'catatan_revisi_terakhir' => null,
                'catatan_nama_kegiatan' => null,
                'catatan_deskripsi_kegiatan' => null,
                'catatan_sasaran_utama' => null,
                'catatan_metode_pelaksanaan' => null,
                'catatan_iku' => null,
                'catatan_bulan_indikator' => null,
                'catatan_tanggal_mulai' => null,
                'catatan_tanggal_selesai' => null,
                'catatan_lokasi' => null,
                'catatan_total_anggaran' => null,
                'catatan_unit_kerja' => null,
                'catatan_mata_anggaran' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->table('t_kegiatan')->insert($kegiatan)->save();

        // ============================================
        // INSERT MANFAAT
        // ============================================
        $manfaat = [
            // Kegiatan 1
            ['kegiatan_id' => 1, 'deskripsi_manfaat' => 'Meningkatkan kemampuan programming mahasiswa dalam pengembangan web', 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'deskripsi_manfaat' => 'Mempersiapkan mahasiswa untuk magang dan bekerja di industri IT', 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'deskripsi_manfaat' => 'Menghasilkan portfolio project untuk CV mahasiswa', 'catatan_verifikator' => null],
            // Kegiatan 2
            ['kegiatan_id' => 2, 'deskripsi_manfaat' => 'Meningkatkan wawasan tentang tren teknologi terkini', 'catatan_verifikator' => 'Sudah sesuai dengan tujuan kegiatan'],
            ['kegiatan_id' => 2, 'deskripsi_manfaat' => 'Membangun networking dengan praktisi industri', 'catatan_verifikator' => null],
            ['kegiatan_id' => 2, 'deskripsi_manfaat' => 'Publikasi hasil penelitian dosen dan mahasiswa', 'catatan_verifikator' => null],
            // Kegiatan 3
            ['kegiatan_id' => 3, 'deskripsi_manfaat' => 'Mahasiswa mendapat sertifikasi internasional CCNA', 'catatan_verifikator' => null],
            ['kegiatan_id' => 3, 'deskripsi_manfaat' => 'Meningkatkan daya saing lulusan di pasar kerja', 'catatan_verifikator' => null]
        ];
        $this->table('t_kegiatan_manfaat')->insert($manfaat)->save();

        // ============================================
        // INSERT TAHAPAN
        // ============================================
        $tahapan = [
            // Kegiatan 1
            ['kegiatan_id' => 1, 'nama_tahapan' => 'Persiapan dan koordinasi dengan instruktur', 'urutan' => 1, 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'nama_tahapan' => 'Pelaksanaan workshop hari ke-1 (Dasar PHP)', 'urutan' => 2, 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'nama_tahapan' => 'Pelaksanaan workshop hari ke-2 (Database & CRUD)', 'urutan' => 3, 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'nama_tahapan' => 'Pelaksanaan workshop hari ke-3 (REST API & Project)', 'urutan' => 4, 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'nama_tahapan' => 'Evaluasi dan pemberian sertifikat', 'urutan' => 5, 'catatan_verifikator' => null],
            // Kegiatan 2
            ['kegiatan_id' => 2, 'nama_tahapan' => 'Rapat persiapan dan koordinasi panitia', 'urutan' => 1, 'catatan_verifikator' => null],
            ['kegiatan_id' => 2, 'nama_tahapan' => 'Konfirmasi speaker dan rundown acara', 'urutan' => 2, 'catatan_verifikator' => 'Pastikan speaker sudah confirmed semua'],
            ['kegiatan_id' => 2, 'nama_tahapan' => 'Promosi dan registrasi peserta', 'urutan' => 3, 'catatan_verifikator' => null],
            ['kegiatan_id' => 2, 'nama_tahapan' => 'Pelaksanaan seminar', 'urutan' => 4, 'catatan_verifikator' => null],
            ['kegiatan_id' => 2, 'nama_tahapan' => 'Evaluasi dan pelaporan', 'urutan' => 5, 'catatan_verifikator' => null],
            // Kegiatan 3
            ['kegiatan_id' => 3, 'nama_tahapan' => 'Seleksi dan pendaftaran peserta', 'urutan' => 1, 'catatan_verifikator' => null],
            ['kegiatan_id' => 3, 'nama_tahapan' => 'Pre-test dan pembagian kelas', 'urutan' => 2, 'catatan_verifikator' => null],
            ['kegiatan_id' => 3, 'nama_tahapan' => 'Pelatihan minggu pertama (Fundamental)', 'urutan' => 3, 'catatan_verifikator' => null],
            ['kegiatan_id' => 3, 'nama_tahapan' => 'Pelatihan minggu kedua (Advanced)', 'urutan' => 4, 'catatan_verifikator' => null],
            ['kegiatan_id' => 3, 'nama_tahapan' => 'Ujian simulasi dan pendampingan ujian sertifikasi', 'urutan' => 5, 'catatan_verifikator' => null]
        ];
        $this->table('t_kegiatan_tahapan')->insert($tahapan)->save();

        // ============================================
        // INSERT INDIKATOR KEBERHASILAN
        // ============================================
        $indikator = [
            // Kegiatan 1
            ['kegiatan_id' => 1, 'deskripsi_indikator' => 'Minimal 80% peserta menyelesaikan project akhir', 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'deskripsi_indikator' => 'Rata-rata nilai evaluasi peserta minimal 75', 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'deskripsi_indikator' => 'Tingkat kepuasan peserta minimal 4.0 dari skala 5.0', 'catatan_verifikator' => null],
            // Kegiatan 2
            ['kegiatan_id' => 2, 'deskripsi_indikator' => 'Jumlah peserta minimal 150 orang', 'catatan_verifikator' => null],
            ['kegiatan_id' => 2, 'deskripsi_indikator' => 'Minimal 10 paper dipresentasikan', 'catatan_verifikator' => 'Sesuaikan dengan jumlah paper yang masuk'],
            ['kegiatan_id' => 2, 'deskripsi_indikator' => 'Tingkat kepuasan peserta minimal 4.2 dari skala 5.0', 'catatan_verifikator' => null],
            // Kegiatan 3
            ['kegiatan_id' => 3, 'deskripsi_indikator' => 'Minimal 80% peserta mengikuti ujian sertifikasi CCNA', 'catatan_verifikator' => null],
            ['kegiatan_id' => 3, 'deskripsi_indikator' => 'Minimal 60% peserta lulus ujian sertifikasi', 'catatan_verifikator' => null]
        ];
        $this->table('t_kegiatan_indikator')->insert($indikator)->save();

        // ============================================
        // INSERT TARGET
        // ============================================
        $target = [
            // Kegiatan 1
            ['kegiatan_id' => 1, 'deskripsi_target' => '50 peserta mahasiswa', 'catatan_verifikator' => null],
            ['kegiatan_id' => 1, 'deskripsi_target' => '45 project aplikasi web selesai dibuat', 'catatan_verifikator' => null],
            // Kegiatan 2
            ['kegiatan_id' => 2, 'deskripsi_target' => '200 peserta (100 offline, 100 online)', 'catatan_verifikator' => null],
            ['kegiatan_id' => 2, 'deskripsi_target' => '15 paper yang dipresentasikan', 'catatan_verifikator' => null],
            ['kegiatan_id' => 2, 'deskripsi_target' => 'Publikasi prosiding seminar ber-ISBN', 'catatan_verifikator' => null],
            // Kegiatan 3
            ['kegiatan_id' => 3, 'deskripsi_target' => '30 peserta mahasiswa semester 5-7', 'catatan_verifikator' => null],
            ['kegiatan_id' => 3, 'deskripsi_target' => 'Minimal 20 mahasiswa lulus sertifikasi CCNA', 'catatan_verifikator' => null]
        ];
        $this->table('t_kegiatan_target')->insert($target)->save();

        // ============================================
        // INSERT ANGGARAN (from previous seeder)
        // ============================================
        
        // Anggaran Kegiatan 1 (Workshop PHP)
        $anggaran1 = [
            [
                'kegiatan_id' => 1,
                'uraian' => 'Honorarium Narasumber (3 orang x 3 hari)',
                'volume' => 9,
                'satuan_id' => 1, // OJ
                'harga_satuan' => 500000,
                'jumlah_diusulkan' => 4500000,
                'jumlah_disetujui' => 4500000,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Konsumsi Peserta (50 orang x 3 hari)',
                'volume' => 150,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 50000,
                'jumlah_diusulkan' => 7500000,
                'jumlah_disetujui' => 7000000,
                'catatan' => 'Disesuaikan dengan budget',
                'catatan_verifikator' => 'Harga per orang dikurangi menjadi Rp 46.666'
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Sewa Laptop (20 unit x 3 hari)',
                'volume' => 60,
                'satuan_id' => 3, // Unit
                'harga_satuan' => 30000,
                'jumlah_diusulkan' => 1800000,
                'jumlah_disetujui' => 1800000,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Modul Pelatihan (50 eksemplar)',
                'volume' => 50,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 20000,
                'jumlah_diusulkan' => 1000000,
                'jumlah_disetujui' => 1000000,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Sertifikat Peserta',
                'volume' => 50,
                'satuan_id' => 5, // Lembar
                'harga_satuan' => 4000,
                'jumlah_diusulkan' => 200000,
                'jumlah_disetujui' => 200000,
                'catatan' => null,
                'catatan_verifikator' => null
            ]
        ];

        // Anggaran Kegiatan 2 (Seminar Nasional)
        $anggaran2 = [
            [
                'kegiatan_id' => 2,
                'uraian' => 'Honorarium Keynote Speaker',
                'volume' => 2,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 3000000,
                'jumlah_diusulkan' => 6000000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => 'Perlu dilampirkan CV dan konfirmasi kesediaan speaker'
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Konsumsi Peserta (200 orang)',
                'volume' => 200,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 60000,
                'jumlah_diusulkan' => 12000000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Sewa Sound System dan Proyektor',
                'volume' => 1,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 3000000,
                'jumlah_diusulkan' => 3000000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Materi Seminar (Tas, Buku, Pulpen)',
                'volume' => 200,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 15000,
                'jumlah_diusulkan' => 3000000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Dekorasi dan Spanduk',
                'volume' => 1,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 1000000,
                'jumlah_diusulkan' => 1000000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ]
        ];

        // Anggaran Kegiatan 3 (Pelatihan CCNA)
        $anggaran3 = [
            [
                'kegiatan_id' => 3,
                'uraian' => 'Honorarium Instruktur Bersertifikat CCNA (10 hari)',
                'volume' => 10,
                'satuan_id' => 6, // Hari
                'harga_satuan' => 1500000,
                'jumlah_diusulkan' => 15000000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Konsumsi Peserta (30 orang x 10 hari)',
                'volume' => 300,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 35000,
                'jumlah_diusulkan' => 10500000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Sewa Router dan Switch untuk Praktik',
                'volume' => 10,
                'satuan_id' => 6, // Hari
                'harga_satuan' => 200000,
                'jumlah_diusulkan' => 2000000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Modul Pelatihan CCNA',
                'volume' => 30,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 50000,
                'jumlah_diusulkan' => 1500000,
                'jumlah_disetujui' => null,
                'catatan' => null,
                'catatan_verifikator' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Voucher Ujian Sertifikasi CCNA',
                'volume' => 30,
                'satuan_id' => 5, // Lembar
                'harga_satuan' => 3000000,
                'jumlah_diusulkan' => 1000000,
                'jumlah_disetujui' => null,
                'catatan' => 'Subsidi sebagian, peserta ikut menanggung',
                'catatan_verifikator' => null
            ]
        ];

        $this->table('t_kegiatan_anggaran')->insert($anggaran1)->save();
        $this->table('t_kegiatan_anggaran')->insert($anggaran2)->save();
        $this->table('t_kegiatan_anggaran')->insert($anggaran3)->save();

        // ============================================
        // INSERT LAMPIRAN
        // ============================================
        $lampiran = [
            [
                'kegiatan_id' => 1,
                'nama_file_asli' => 'Proposal_Workshop_PHP.pdf',
                'path_file_disimpan' => '/uploads/documents/proposal_workshop_php_20251101.pdf',
                'tipe_file' => 'pdf',
                'uploader_user_id' => 3,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 1,
                'nama_file_asli' => 'Rundown_Acara.docx',
                'path_file_disimpan' => '/uploads/documents/rundown_workshop_20251101.docx',
                'tipe_file' => 'docx',
                'uploader_user_id' => 3,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 2,
                'nama_file_asli' => 'Proposal_Seminar_Nasional.pdf',
                'path_file_disimpan' => '/uploads/documents/proposal_seminar_20251101.pdf',
                'tipe_file' => 'pdf',
                'uploader_user_id' => 3,
                'created_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->table('t_kegiatan_lampiran')->insert($lampiran)->save();

        echo "✅ Kegiatan seeder completed!\n";
        echo "   - 3 kegiatan\n";
        echo "   - 8 manfaat\n";
        echo "   - 15 tahapan pelaksanaan\n";
        echo "   - 8 indikator keberhasilan\n";
        echo "   - 7 target\n";
        echo "   - 15 item anggaran\n";
        echo "   - 3 lampiran\n";
    }
}