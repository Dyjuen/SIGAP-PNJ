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
        $this->execute('TRUNCATE TABLE m_user_roles');
        $this->execute('TRUNCATE TABLE m_users');
        $this->execute('TRUNCATE TABLE m_iku');
        $this->execute('TRUNCATE TABLE m_mata_anggaran');
        $this->execute('TRUNCATE TABLE m_satuan');
        $this->execute('TRUNCATE TABLE m_kegiatan_status');
        $this->execute('TRUNCATE TABLE m_roles');
        
        // Re-enable foreign key checks
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // ============================================
        // 1. ROLES
        // ============================================
        $roles = [
            ['role_id' => 1, 'nama_role' => 'Admin', 'deskripsi' => 'Administrator sistem'],
            ['role_id' => 2, 'nama_role' => 'Verifikator', 'deskripsi' => 'Verifikator usulan kegiatan'],
            ['role_id' => 3, 'nama_role' => 'Pengusul', 'deskripsi' => 'Pengusul kegiatan (dosen/staf)'],
            ['role_id' => 4, 'nama_role' => 'PPK', 'deskripsi' => 'Pejabat Pembuat Komitmen'],
            ['role_id' => 5, 'nama_role' => 'Wadir', 'deskripsi' => 'Wakil Direktur Bidang terkait'],
            ['role_id' => 6, 'nama_role' => 'Bendahara', 'deskripsi' => 'Bendahara pengelola keuangan']
        ];
        $this->table('m_roles')->insert($roles)->saveData();

        // ============================================
        // 2. KEGIATAN STATUS
        // ============================================
        $status = [
            ['status_id' => 1, 'nama_status' => 'Draft', 'urutan' => 1],
            ['status_id' => 2, 'nama_status' => 'Review Verifikator', 'urutan' => 2],
            ['status_id' => 3, 'nama_status' => 'Disetujui Verifikator', 'urutan' => 3],
            ['status_id' => 4, 'nama_status' => 'Ditolak', 'urutan' => 99],
            ['status_id' => 5, 'nama_status' => 'Revisi', 'urutan' => 98],
            ['status_id' => 6, 'nama_status' => 'Proses Pencairan', 'urutan' => 4],
            ['status_id' => 7, 'nama_status' => 'Kegiatan Berlangsung', 'urutan' => 5],
            ['status_id' => 8, 'nama_status' => 'Proses LPJ', 'urutan' => 6],
            ['status_id' => 9, 'nama_status' => 'Selesai', 'urutan' => 7]
        ];
        $this->table('m_kegiatan_status')->insert($status)->saveData();

        // ============================================
        // 3. SATUAN
        // ============================================
        $satuan = [
            ['nama_satuan' => 'OJ'], ['nama_satuan' => 'Orang'], ['nama_satuan' => 'Unit'],
            ['nama_satuan' => 'Paket'], ['nama_satuan' => 'Lembar'], ['nama_satuan' => 'Hari'],
            ['nama_satuan' => 'Bulan'], ['nama_satuan' => 'Set'], ['nama_satuan' => 'Pcs'],
            ['nama_satuan' => 'Kg'], ['nama_satuan' => 'Rim']
        ];
        $this->table('m_satuan')->insert($satuan)->saveData();

        // ============================================
        // 4. MATA ANGGARAN
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
        // 5. IKU (8 IKU FIXED)
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
        // 6. USERS
        // ============================================
        $users = [
            [
                'user_id' => 1, 'username' => 'admin', 'password_hash' => password_hash('admin123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Administrator', 'email' => 'admin@pnj.ac.id'
            ],
            [
                'user_id' => 2, 'username' => 'verifikator', 'password_hash' => password_hash('verif123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Verifikator Keuangan', 'email' => 'verifikator@pnj.ac.id'
            ],
            [
                'user_id' => 3, 'username' => 'pengusul', 'password_hash' => password_hash('pengusul123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Dr. Budi Santoso', 'email' => 'pengusul@pnj.ac.id'
            ],
            [
                'user_id' => 4, 'username' => 'ppk', 'password_hash' => password_hash('ppk123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Siti Aminah, S.E.', 'email' => 'ppk@pnj.ac.id'
            ],
            [
                'user_id' => 5, 'username' => 'wadir2', 'password_hash' => password_hash('wadir2123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Prof. Dr. Ir. Widodo', 'email' => 'wadir2@pnj.ac.id'
            ],
            [
                'user_id' => 6, 'username' => 'bendahara', 'password_hash' => password_hash('bendahara123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Rina Wijayanti, S.Ak', 'email' => 'bendahara@pnj.ac.id'
            ]
        ];
        $this->table('m_users')->insert($users)->saveData();

        // ============================================
        // 7. USER ROLES
        // ============================================
        $userRoles = [
            ['user_id' => 1, 'role_id' => 1], // admin -> Admin
            ['user_id' => 2, 'role_id' => 2], // verifikator -> Verifikator
            ['user_id' => 3, 'role_id' => 3], // pengusul -> Pengusul
            ['user_id' => 4, 'role_id' => 4], // ppk -> PPK
            ['user_id' => 5, 'role_id' => 5], // wadir2 -> Wadir
            ['user_id' => 6, 'role_id' => 6]  // bendahara -> Bendahara
        ];
        $this->table('m_user_roles')->insert($userRoles)->saveData();

        echo "✅ Master data seeded successfully!\n";
        echo "   - Roles, Status, Satuan, Mata Anggaran, IKU, Users, User Roles\n";
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
