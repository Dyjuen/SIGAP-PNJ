<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class UserSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     */
    public function run(): void
    {
// --- 1. KOSONGKAN TABEL (agar tidak duplikat) ---
        // Hapus dalam urutan terbalik dari foreign key
        $this->execute('SET FOREIGN_KEY_CHECKS = 0');
        $this->table('m_user_roles')->truncate();
        $this->table('m_users')->truncate();
        $this->table('m_roles')->truncate();
        $this->execute('SET FOREIGN_KEY_CHECKS = 1');

        // --- 2. BUAT DATA ROLES ---
        $rolesTable = $this->table('m_roles');
        $rolesTable->insert([
            'role_id'   => 1,
            'nama_role' => 'admin',
            'deskripsi' => 'Administrator Sistem'
        ], [
            'role_id'   => 2,
            'nama_role' => 'user_biasa',
            'deskripsi' => 'Pengguna standar'
        ])->saveData();
        
        // --- 3. BUAT DATA USER ADMIN ---
        $usersTable = $this->table('m_users');
        $usersTable->insert([
            'user_id'       => 1,
            'username'      => 'admin',
            'password_hash' => password_hash('password123', PASSWORD_DEFAULT), // PENTING!
            'nama_lengkap'  => 'Admin Utama',
            'email'         => 'admin@sigap.pnj.ac.id',
            'unit_kerja_id' => null // Set null atau ke ID unit kerja yang valid
        ])->saveData();

        // --- 4. HUBUNGKAN USER KE ROLE ---
        $userRolesTable = $this->table('m_user_roles');
        $userRolesTable->insert([
            'user_id' => 1, // user_id dari admin
            'role_id' => 1  // role_id dari admin
        ])->saveData();

        echo "Seeder: User Admin berhasil dibuat (admin / password123)\n";
    }
}
