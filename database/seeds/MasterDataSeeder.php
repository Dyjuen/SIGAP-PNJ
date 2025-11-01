<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class MasterDataSeeder extends AbstractSeed
{
    public function run(): void
    {
        // ============================================
        // 1. ROLES
        // ============================================
        $roles = [
            ['role_id' => 1, 'nama_role' => 'Admin', 'deskripsi' => 'Administrator sistem'],
            ['role_id' => 2, 'nama_role' => 'Verifikator', 'deskripsi' => 'Verifikator kegiatan'],
            ['role_id' => 3, 'nama_role' => 'Pengusul', 'deskripsi' => 'Pengusul kegiatan'],
            ['role_id' => 4, 'nama_role' => 'PPK', 'deskripsi' => 'Pejabat Pembuat Komitmen'],
            ['role_id' => 5, 'nama_role' => 'WD2', 'deskripsi' => 'Wakil Direktur 2'],
            ['role_id' => 6, 'nama_role' => 'Bendahara', 'deskripsi' => 'Bendahara pengelola keuangan']
        ];
        $this->table('m_roles')->insert($roles)->save();

        // ============================================
        // 2. KEGIATAN STATUS
        // ============================================
        $status = [
            ['status_id' => 1, 'nama_status' => 'Draft', 'urutan' => 1],
            ['status_id' => 2, 'nama_status' => 'Dalam Review', 'urutan' => 2],
            ['status_id' => 3, 'nama_status' => 'Disetujui', 'urutan' => 3],
            ['status_id' => 4, 'nama_status' => 'Ditolak', 'urutan' => 4],
            ['status_id' => 5, 'nama_status' => 'Revisi', 'urutan' => 5],
            ['status_id' => 6, 'nama_status' => 'Selesai', 'urutan' => 6]
        ];
        $this->table('m_kegiatan_status')->insert($status)->save();

        // ============================================
        // 3. SATUAN
        // ============================================
        $satuan = [
            ['satuan_id' => 1, 'nama_satuan' => 'OJ'],
            ['satuan_id' => 2, 'nama_satuan' => 'Orang'],
            ['satuan_id' => 3, 'nama_satuan' => 'Unit'],
            ['satuan_id' => 4, 'nama_satuan' => 'Paket'],
            ['satuan_id' => 5, 'nama_satuan' => 'Lembar'],
            ['satuan_id' => 6, 'nama_satuan' => 'Hari'],
            ['satuan_id' => 7, 'nama_satuan' => 'Bulan'],
            ['satuan_id' => 8, 'nama_satuan' => 'Set'],
            ['satuan_id' => 9, 'nama_satuan' => 'Pcs'],
            ['satuan_id' => 10, 'nama_satuan' => 'Kg']
        ];
        $this->table('m_satuan')->insert($satuan)->save();

        // ============================================
        // 4. UNIT KERJA
        // ============================================
        $unitKerja = [
            [
                'unit_kerja_id' => 1,
                'nama_unit_kerja' => 'Jurusan Teknik Informatika dan Komputer',
                'kode_unit' => 'TIK',
                'parent_unit_id' => null
            ],
            [
                'unit_kerja_id' => 2,
                'nama_unit_kerja' => 'Jurusan Teknik Elektro',
                'kode_unit' => 'TE',
                'parent_unit_id' => null
            ],
            [
                'unit_kerja_id' => 3,
                'nama_unit_kerja' => 'Jurusan Teknik Mesin',
                'kode_unit' => 'TM',
                'parent_unit_id' => null
            ],
            [
                'unit_kerja_id' => 4,
                'nama_unit_kerja' => 'Jurusan Teknik Sipil',
                'kode_unit' => 'TS',
                'parent_unit_id' => null
            ],
            [
                'unit_kerja_id' => 5,
                'nama_unit_kerja' => 'Program Studi Teknik Informatika',
                'kode_unit' => 'TI',
                'parent_unit_id' => 1
            ],
            [
                'unit_kerja_id' => 6,
                'nama_unit_kerja' => 'Program Studi Teknik Komputer',
                'kode_unit' => 'TK',
                'parent_unit_id' => 1
            ]
        ];
        $this->table('m_unit_kerja')->insert($unitKerja)->save();

        // ============================================
        // 5. MATA ANGGARAN
        // ============================================
        $mataAnggaran = [
            [
                'mata_anggaran_id' => 1,
                'kode_anggaran' => 'APBN-2025',
                'nama_sumber_dana' => 'APBN (Anggaran Pendapatan dan Belanja Negara)',
                'tahun_anggaran' => 2025,
                'total_pagu' => 5000000000.00
            ],
            [
                'mata_anggaran_id' => 2,
                'kode_anggaran' => 'PNBP-2025',
                'nama_sumber_dana' => 'PNBP (Penerimaan Negara Bukan Pajak)',
                'tahun_anggaran' => 2025,
                'total_pagu' => 2000000000.00
            ],
            [
                'mata_anggaran_id' => 3,
                'kode_anggaran' => 'HIBAH-2025',
                'nama_sumber_dana' => 'Dana Hibah',
                'tahun_anggaran' => 2025,
                'total_pagu' => 500000000.00
            ]
        ];
        $this->table('m_mata_anggaran')->insert($mataAnggaran)->save();

        // ============================================
        // 6. IKU (8 IKU FIXED - NO RENSTRA)
        // ============================================
        $iku = [
            [
                'iku_id' => 1,
                'kode_iku' => 'IKU-1',
                'nama_iku' => 'Lulusan Mendapat Pekerjaan yang Layak',
                'deskripsi' => 'Persentase lulusan yang mendapat pekerjaan layak dalam waktu tertentu setelah lulus'
            ],
            [
                'iku_id' => 2,
                'kode_iku' => 'IKU-2',
                'nama_iku' => 'Mahasiswa Mendapat Pengalaman di Luar Kampus',
                'deskripsi' => 'Persentase mahasiswa yang mengikuti kegiatan pembelajaran di luar kampus'
            ],
            [
                'iku_id' => 3,
                'kode_iku' => 'IKU-3',
                'nama_iku' => 'Dosen Berkegiatan di Luar Kampus',
                'deskripsi' => 'Persentase dosen yang melakukan kegiatan di luar kampus'
            ],
            [
                'iku_id' => 4,
                'kode_iku' => 'IKU-4',
                'nama_iku' => 'Praktisi Mengajar di Dalam Kampus',
                'deskripsi' => 'Persentase mata kuliah yang diajar oleh praktisi dari industri'
            ],
            [
                'iku_id' => 5,
                'kode_iku' => 'IKU-5',
                'nama_iku' => 'Hasil Kerja Dosen Digunakan oleh Masyarakat',
                'deskripsi' => 'Jumlah hasil penelitian/pengabdian dosen yang dimanfaatkan masyarakat'
            ],
            [
                'iku_id' => 6,
                'kode_iku' => 'IKU-6',
                'nama_iku' => 'Program Studi Bekerjasama dengan Mitra Kelas Dunia',
                'deskripsi' => 'Jumlah program studi yang memiliki kerjasama dengan institusi bereputasi internasional'
            ],
            [
                'iku_id' => 7,
                'kode_iku' => 'IKU-7',
                'nama_iku' => 'Kelas yang Kolaboratif dan Partisipatif',
                'deskripsi' => 'Persentase mata kuliah yang menerapkan metode pembelajaran kolaboratif'
            ],
            [
                'iku_id' => 8,
                'kode_iku' => 'IKU-8',
                'nama_iku' => 'Program Studi Berstandar Internasional',
                'deskripsi' => 'Jumlah program studi yang memiliki akreditasi/sertifikasi internasional'
            ]
        ];
        $this->table('m_iku')->insert($iku)->save();

        // ============================================
        // 7. USERS
        // ============================================
        $users = [
            [
                'user_id' => 1,
                'username' => 'admin',
                'password_hash' => password_hash('admin123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Administrator',
                'email' => 'admin@pnj.ac.id',
                'unit_kerja_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'user_id' => 2,
                'username' => 'verifikator',
                'password_hash' => password_hash('verif123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Verifikator User',
                'email' => 'verifikator@pnj.ac.id',
                'unit_kerja_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'user_id' => 3,
                'username' => 'pengusul',
                'password_hash' => password_hash('pengusul123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Pengusul User',
                'email' => 'pengusul@pnj.ac.id',
                'unit_kerja_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'user_id' => 4,
                'username' => 'ppk',
                'password_hash' => password_hash('ppk123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'PPK User',
                'email' => 'ppk@pnj.ac.id',
                'unit_kerja_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'user_id' => 5,
                'username' => 'wd2',
                'password_hash' => password_hash('wd2123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'WD2 User',
                'email' => 'wd2@pnj.ac.id',
                'unit_kerja_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ],
            [
                'user_id' => 6,
                'username' => 'bendahara',
                'password_hash' => password_hash('bendahara123', PASSWORD_BCRYPT),
                'nama_lengkap' => 'Bendahara User',
                'email' => 'bendahara@pnj.ac.id',
                'unit_kerja_id' => 1,
                'created_at' => date('Y-m-d H:i:s')
            ]
        ];
        $this->table('m_users')->insert($users)->save();

        // ============================================
        // 8. USER ROLES
        // ============================================
        $userRoles = [
            ['user_id' => 1, 'role_id' => 1], // admin -> Admin
            ['user_id' => 1, 'role_id' => 2], // admin -> Verifikator
            ['user_id' => 1, 'role_id' => 3], // admin -> Pengusul
            ['user_id' => 1, 'role_id' => 4], // admin -> PPK
            ['user_id' => 1, 'role_id' => 5], // admin -> WD2
            ['user_id' => 1, 'role_id' => 6], // admin -> Bendahara (all roles)
            ['user_id' => 2, 'role_id' => 2], // verifikator -> Verifikator
            ['user_id' => 3, 'role_id' => 3], // pengusul -> Pengusul
            ['user_id' => 4, 'role_id' => 4], // ppk -> PPK
            ['user_id' => 5, 'role_id' => 5], // wd2 -> WD2
            ['user_id' => 6, 'role_id' => 6]  // bendahara -> Bendahara
        ];
        $this->table('m_user_roles')->insert($userRoles)->save();

        echo "✅ Master data seeded successfully!\n";
        echo "   - 6 Roles (Admin, Verifikator, Pengusul, PPK, WD2, Bendahara)\n";
        echo "   - 6 Status Kegiatan\n";
        echo "   - 10 Satuan\n";
        echo "   - 6 Unit Kerja\n";
        echo "   - 3 Mata Anggaran\n";
        echo "   - 8 IKU (Fixed)\n";
        echo "   - 6 Users\n";
        echo "\n";
        echo "🔑 Login Credentials:\n";
        echo "   Admin:       username: admin       password: admin123\n";
        echo "   Verifikator: username: verifikator password: verif123\n";
        echo "   Pengusul:    username: pengusul    password: pengusul123\n";
        echo "   PPK:         username: ppk         password: ppk123\n";
        echo "   WD2:         username: wd2         password: wd2123\n";
        echo "   Bendahara:   username: bendahara   password: bendahara123\n";
    }
}