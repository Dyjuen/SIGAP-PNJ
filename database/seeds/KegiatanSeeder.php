<?php

use Phinx\Seed\AbstractSeed;

class KegiatanSeeder extends AbstractSeed
{
    public function run(): void
    {
        // Clear existing data
        $this->execute('SET FOREIGN_KEY_CHECKS = 0');
        $this->execute('TRUNCATE TABLE t_kegiatan_anggaran');
        $this->execute('TRUNCATE TABLE t_kegiatan_lampiran');
        $this->execute('TRUNCATE TABLE t_kegiatan_log_status');
        $this->execute('TRUNCATE TABLE t_kegiatan');
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // Insert sample kegiatan
        $kegiatan = [
            [
                'kegiatan_id' => 1,
                'nama_kegiatan' => 'Workshop Pengembangan Web dengan PHP dan MySQL',
                'deskripsi_kegiatan' => 'Workshop ini bertujuan untuk meningkatkan kemampuan dosen dan mahasiswa dalam pengembangan aplikasi web menggunakan PHP dan MySQL. Materi meliputi: dasar-dasar PHP, koneksi database, CRUD operations, dan implementasi REST API. Workshop akan dilaksanakan selama 3 hari dengan metode praktik langsung.',
                'iku_id' => 1,
                'tanggal_mulai' => '2025-11-10',
                'tanggal_selesai' => '2025-11-12',
                'lokasi' => 'Laboratorium Komputer Gedung C Lantai 3',
                'total_anggaran_diusulkan' => 15000000,
                'total_anggaran_disetujui' => 14500000,
                'pengusul_user_id' => 1,
                'unit_kerja_id' => 1,
                'mata_anggaran_id' => 1,
                'status_id' => 3, // Disetujui
                'catatan_revisi_terakhir' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 2,
                'nama_kegiatan' => 'Seminar Nasional Teknologi Informasi dan Komunikasi',
                'deskripsi_kegiatan' => 'Seminar nasional dengan tema "Transformasi Digital dalam Pendidikan Tinggi Vokasi" menghadirkan pembicara dari industri dan akademisi. Kegiatan ini bertujuan untuk berbagi pengetahuan dan pengalaman terkait implementasi teknologi digital dalam proses pembelajaran. Target peserta adalah dosen, mahasiswa, dan praktisi IT.',
                'iku_id' => 2,
                'tanggal_mulai' => '2025-11-20',
                'tanggal_selesai' => '2025-11-20',
                'lokasi' => 'Auditorium Politeknik Negeri Jakarta',
                'total_anggaran_diusulkan' => 25000000,
                'total_anggaran_disetujui' => null,
                'pengusul_user_id' => 1,
                'unit_kerja_id' => 1,
                'mata_anggaran_id' => 1,
                'status_id' => 2, // Dalam Review
                'catatan_revisi_terakhir' => 'Perlu ditambahkan detail rundown acara',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 3,
                'nama_kegiatan' => 'Pelatihan Sertifikasi Jaringan Komputer CCNA',
                'deskripsi_kegiatan' => 'Program pelatihan intensif untuk mempersiapkan mahasiswa dalam menghadapi ujian sertifikasi CCNA (Cisco Certified Network Associate). Materi meliputi: dasar-dasar jaringan, routing dan switching, network security, dan troubleshooting. Pelatihan dilaksanakan selama 2 minggu dengan praktek menggunakan simulator dan perangkat real.',
                'iku_id' => 1,
                'tanggal_mulai' => '2025-12-01',
                'tanggal_selesai' => '2025-12-14',
                'lokasi' => 'Laboratorium Jaringan Komputer Gedung D',
                'total_anggaran_diusulkan' => 30000000,
                'total_anggaran_disetujui' => null,
                'pengusul_user_id' => 1,
                'unit_kerja_id' => 1,
                'mata_anggaran_id' => 1,
                'status_id' => 1, // Draft
                'catatan_revisi_terakhir' => null,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->table('t_kegiatan')->insert($kegiatan)->save();

        // Insert anggaran for Kegiatan 1 (Workshop PHP)
        $anggaran1 = [
            [
                'kegiatan_id' => 1,
                'uraian' => 'Honorarium Narasumber (3 orang x 3 hari)',
                'volume' => 9,
                'satuan_id' => 1, // OJ (Orang Jam)
                'harga_satuan' => 500000,
                'jumlah_diusulkan' => 4500000,
                'jumlah_disetujui' => 4500000,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Konsumsi Peserta (50 orang x 3 hari)',
                'volume' => 150,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 50000,
                'jumlah_diusulkan' => 7500000,
                'jumlah_disetujui' => 7000000,
                'catatan' => 'Disesuaikan dengan budget'
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Sewa Laptop (20 unit x 3 hari)',
                'volume' => 60,
                'satuan_id' => 3, // Unit
                'harga_satuan' => 30000,
                'jumlah_diusulkan' => 1800000,
                'jumlah_disetujui' => 1800000,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Modul Pelatihan (50 eksemplar)',
                'volume' => 50,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 20000,
                'jumlah_diusulkan' => 1000000,
                'jumlah_disetujui' => 1000000,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 1,
                'uraian' => 'Sertifikat Peserta',
                'volume' => 50,
                'satuan_id' => 5, // Lembar
                'harga_satuan' => 4000,
                'jumlah_diusulkan' => 200000,
                'jumlah_disetujui' => 200000,
                'catatan' => null
            ]
        ];

        // Insert anggaran for Kegiatan 2 (Seminar Nasional)
        $anggaran2 = [
            [
                'kegiatan_id' => 2,
                'uraian' => 'Honorarium Keynote Speaker',
                'volume' => 2,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 3000000,
                'jumlah_diusulkan' => 6000000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Konsumsi Peserta (200 orang)',
                'volume' => 200,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 60000,
                'jumlah_diusulkan' => 12000000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Sewa Sound System dan Proyektor',
                'volume' => 1,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 3000000,
                'jumlah_diusulkan' => 3000000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Materi Seminar (Tas, Buku, Pulpen)',
                'volume' => 200,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 15000,
                'jumlah_diusulkan' => 3000000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 2,
                'uraian' => 'Dekorasi dan Spanduk',
                'volume' => 1,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 1000000,
                'jumlah_diusulkan' => 1000000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ]
        ];

        // Insert anggaran for Kegiatan 3 (Pelatihan CCNA)
        $anggaran3 = [
            [
                'kegiatan_id' => 3,
                'uraian' => 'Honorarium Instruktur Bersertifikat CCNA (10 hari)',
                'volume' => 10,
                'satuan_id' => 6, // Hari
                'harga_satuan' => 1500000,
                'jumlah_diusulkan' => 15000000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Konsumsi Peserta (30 orang x 10 hari)',
                'volume' => 300,
                'satuan_id' => 2, // Orang
                'harga_satuan' => 35000,
                'jumlah_diusulkan' => 10500000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Sewa Router dan Switch untuk Praktik',
                'volume' => 10,
                'satuan_id' => 6, // Hari
                'harga_satuan' => 200000,
                'jumlah_diusulkan' => 2000000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Modul Pelatihan CCNA',
                'volume' => 30,
                'satuan_id' => 4, // Paket
                'harga_satuan' => 50000,
                'jumlah_diusulkan' => 1500000,
                'jumlah_disetujui' => null,
                'catatan' => null
            ],
            [
                'kegiatan_id' => 3,
                'uraian' => 'Voucher Ujian Sertifikasi CCNA',
                'volume' => 30,
                'satuan_id' => 5, // Lembar
                'harga_satuan' => 3000000,
                'jumlah_diusulkan' => 1000000,
                'jumlah_disetujui' => null,
                'catatan' => 'Subsidi sebagian, peserta ikut menanggung'
            ]
        ];

        $this->table('t_kegiatan_anggaran')->insert($anggaran1)->save();
        $this->table('t_kegiatan_anggaran')->insert($anggaran2)->save();
        $this->table('t_kegiatan_anggaran')->insert($anggaran3)->save();

        // Insert lampiran (optional, jika ada)
        $lampiran = [
            [
                'kegiatan_id' => 1,
                'nama_file_asli' => 'Proposal_Workshop_PHP.pdf',
                'path_file_disimpan' => '/uploads/documents/proposal_workshop_php_20251030.pdf',
                'tipe_file' => 'pdf',
                'uploader_user_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 1,
                'nama_file_asli' => 'Rundown_Acara.docx',
                'path_file_disimpan' => '/uploads/documents/rundown_workshop_20251030.docx',
                'tipe_file' => 'docx',
                'uploader_user_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'kegiatan_id' => 2,
                'nama_file_asli' => 'Proposal_Seminar_Nasional.pdf',
                'path_file_disimpan' => '/uploads/documents/proposal_seminar_20251030.pdf',
                'tipe_file' => 'pdf',
                'uploader_user_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ]
        ];

        $this->table('t_kegiatan_lampiran')->insert($lampiran)->save();

        echo "✅ Seeder completed: 3 kegiatan, 14 anggaran items, 3 lampiran\n";
    }
}