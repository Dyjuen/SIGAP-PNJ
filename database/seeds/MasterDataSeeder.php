<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class MasterDataSeeder extends AbstractSeed
{
    public function run(): void
    {
        // Disable foreign key checks to avoid issues with truncation order
        $this->execute('SET FOREIGN_KEY_CHECKS = 0');

        // Truncate tables in reverse order of dependency
        $this->execute('TRUNCATE TABLE m_users');
        $this->execute('TRUNCATE TABLE m_iku');
        $this->execute('TRUNCATE TABLE m_mata_anggaran');
        $this->execute('TRUNCATE TABLE m_satuan');
        $this->execute('TRUNCATE TABLE m_tipe_kegiatan');
        $this->execute('TRUNCATE TABLE m_kegiatan_status');
        $this->execute('TRUNCATE TABLE m_roles');
        
        // Re-enable foreign key checks
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // ============================================
        // 1. ROLES
        // ============================================
        $roles = [
            ['nama_role' => 'Admin'],
            ['nama_role' => 'Verifikator'],
            ['nama_role' => 'Pengusul'],
            ['nama_role' => 'PPK'],
            ['nama_role' => 'Wadir'],
            ['nama_role' => 'Bendahara']
        ];
        $this->table('m_roles')->insert($roles)->saveData();

        // ============================================
        // 2. TIPE KEGIATAN
        // ============================================
        $tipeKegiatan = [
            ['nama_tipe' => 'Bidang 1 - Akademik'],
            ['nama_tipe' => 'Bidang 2 - Umum & Keuangan'],
            ['nama_tipe' => 'Bidang 3 - Kemahasiswaan'],
            ['nama_tipe' => 'Bidang 4 - Kerja Sama'],
        ];
        $this->table('m_tipe_kegiatan')->insert($tipeKegiatan)->saveData();

        // ============================================
        // 3. KEGIATAN STATUS
        // ============================================
        $status = [
            ['nama_status' => 'Draft'],
            ['nama_status' => 'Review Verifikator'],
            ['nama_status' => 'Disetujui Verifikator'],
            ['nama_status' => 'Ditolak'],
            ['nama_status' => 'Revisi'],
            ['nama_status' => 'Proses Pencairan'],
            ['nama_status' => 'Uang Muka Dicairkan'],
            ['nama_status' => 'Kegiatan Berlangsung'],
            ['nama_status' => 'Proses LPJ'],
            ['nama_status' => 'Selesai']
        ];
        $this->table('m_kegiatan_status')->insert($status)->saveData();

        // ============================================
        // 4. SATUAN
        // ============================================
        $satuan = [
            ['nama_satuan' => 'OJ'], ['nama_satuan' => 'Orang'], ['nama_satuan' => 'Unit'],
            ['nama_satuan' => 'Paket'], ['nama_satuan' => 'Lembar'], ['nama_satuan' => 'Hari'],
            ['nama_satuan' => 'Bulan'], ['nama_satuan' => 'Set'], ['nama_satuan' => 'Pcs'],
            ['nama_satuan' => 'Kg'], ['nama_satuan' => 'Rim']
        ];
        $this->table('m_satuan')->insert($satuan)->saveData();

        // ============================================
        // 5. MATA ANGGARAN
        // ============================================
        $mataAnggaran = [
            [
                'kode_anggaran' => 'APBN-2025',
                'nama_sumber_dana' => 'APBN (Anggaran Pendapatan dan Belanja Negara)',
                'tahun_anggaran' => 2025,
                'total_pagu' => 5000000000.00
            ],
            [
                'kode_anggaran' => 'PNBP-2025',
                'nama_sumber_dana' => 'PNBP (Penerimaan Negara Bukan Pajak)',
                'tahun_anggaran' => 2025,
                'total_pagu' => 2000000000.00
            ],
            [
                'kode_anggaran' => 'HIBAH-2025',
                'nama_sumber_dana' => 'Dana Hibah',
                'tahun_anggaran' => 2025,
                'total_pagu' => 500000000.00
            ]
        ];
        $this->table('m_mata_anggaran')->insert($mataAnggaran)->saveData();

        // ============================================
        // 6. IKU (8 IKU FIXED)
        // ============================================
        $iku = [
            ['kode_iku' => 'IKU-1', 'nama_iku' => 'Lulusan Mendapat Pekerjaan yang Layak'],
            ['kode_iku' => 'IKU-2', 'nama_iku' => 'Mahasiswa Mendapat Pengalaman di Luar Kampus'],
            ['kode_iku' => 'IKU-3', 'nama_iku' => 'Dosen Berkegiatan di Luar Kampus'],
            ['kode_iku' => 'IKU-4', 'nama_iku' => 'Praktisi Mengajar di Dalam Kampus'],
            ['kode_iku' => 'IKU-5', 'nama_iku' => 'Hasil Kerja Dosen Digunakan oleh Masyarakat'],
            ['kode_iku' => 'IKU-6', 'nama_iku' => 'Program Studi Bekerjasama dengan Mitra Kelas Dunia'],
            ['kode_iku' => 'IKU-7', 'nama_iku' => 'Kelas yang Kolaboratif dan Partisipatif'],
            ['kode_iku' => 'IKU-8', 'nama_iku' => 'Program Studi Berstandar Internasional']
        ];
        $this->table('m_iku')->insert($iku)->saveData();

        // ============================================
        // 7. USERS
        // ============================================
        $users = [
            [
                'username' => 'admin', 'password_hash' => password_hash('admin123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Administrator', 'email' => 'admin@pnj.ac.id', 'role_id' => 1
            ],
            [
                'username' => 'verifikator', 'password_hash' => password_hash('verif123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Verifikator Keuangan', 'email' => 'verifikator@pnj.ac.id', 'role_id' => 2
            ],
            [
                'username' => 'pengusul', 'password_hash' => password_hash('pengusul123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Dr. Budi Santoso', 'email' => 'pengusul@pnj.ac.id', 'role_id' => 3
            ],
            [
                'username' => 'ppk', 'password_hash' => password_hash('ppk123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Siti Aminah, S.E.', 'email' => 'ppk@pnj.ac.id', 'role_id' => 4
            ],
            [
                'username' => 'wadir2', 'password_hash' => password_hash('wadir2123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Prof. Dr. Ir. Widodo', 'email' => 'wadir2@pnj.ac.id', 'role_id' => 5
            ],
            [
                'username' => 'bendahara', 'password_hash' => password_hash('bendahara123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Rina Wijayanti, S.Ak', 'email' => 'bendahara@pnj.ac.id', 'role_id' => 6
            ]
        ];

        // ============================================
        // KATEGORI BELANJA
        // ============================================
        $kategoriBelanja = [
            [
                'kode' => 'BRG',
                'nama' => 'Belanja Barang',
                'keterangan' => 'Belanja untuk pengadaan barang habis pakai, ATK, konsumsi, dll',
                'urutan' => 1,
                'is_active' => true
            ],
            [
                'kode' => 'JSA',
                'nama' => 'Belanja Jasa',
                'keterangan' => 'Belanja untuk pembayaran jasa seperti honor narasumber, tenaga pendukung, dll',
                'urutan' => 2,
                'is_active' => true
            ],
            [
                'kode' => 'PJL',
                'nama' => 'Belanja Perjalanan',
                'keterangan' => 'Belanja untuk transport, akomodasi, dan biaya perjalanan dinas',
                'urutan' => 3,
                'is_active' => true
            ]
        ];
        $this->table('m_kategori_belanja')->insert($kategoriBelanja)->saveData();
        $this->table('m_users')->insert($users)->saveData();

        echo "✅ Master data seeded successfully!\n";
        echo "   - Roles, Tipe Kegiatan, Status, Satuan, Mata Anggaran, IKU, Users\n";
        echo "\n";
        echo "🔑 Login Credentials:\n";
        echo "   Admin:       username: admin       password: admin123\n";
        echo "   Verifikator: username: verifikator password: verif123\n";
        echo "   Pengusul:    username: pengusul    password: pengusul123\n";
        echo "   PPK:         username: ppk         password: ppk123\n";
        echo "   Wadir 2:     username: wadir2      password: wadir2123\n";
        echo "   Bendahara:   username: bendahara   password: bendahara123\n";
    }
}
