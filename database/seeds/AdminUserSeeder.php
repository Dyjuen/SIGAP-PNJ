<?php

use Phinx\Seed\AbstractSeed;

class AdminUserSeeder extends AbstractSeed
{
    public function run(): void
    {
        $this->createRolesIfNotExist();
        $this->createUnitKerjaIfNotExist();
        $this->createAdminUser();

        echo "✓ Admin user seeded successfully!\n";
        echo "  Username: admin\n";
        echo "  Password: admin123\n";
        echo "  Role: Admin\n\n";
    }

    private function createRolesIfNotExist(): void
    {
        $roles = $this->table('m_roles');
        $existingRoles = $this->fetchAll('SELECT nama_role FROM m_roles');
        $existingRoleNames = array_column($existingRoles, 'nama_role');

        $rolesToCreate = [
            ['nama_role' => 'Admin', 'deskripsi' => 'Administrator dengan akses penuh'],
            ['nama_role' => 'Reviewer', 'deskripsi' => 'Reviewer yang dapat mereview kegiatan'],
            ['nama_role' => 'User', 'deskripsi' => 'User biasa yang dapat mengajukan kegiatan']
        ];

        $newRoles = [];
        foreach ($rolesToCreate as $role) {
            if (!in_array($role['nama_role'], $existingRoleNames)) {
                $newRoles[] = $role;
            }
        }

        if (!empty($newRoles)) {
            $roles->insert($newRoles)->save();
            echo "✓ Roles created: " . implode(', ', array_column($newRoles, 'nama_role')) . "\n";
        } else {
            echo "✓ Roles already exist\n";
        }
    }

    private function createUnitKerjaIfNotExist(): void
    {
        $unitKerja = $this->table('m_unit_kerja');
        $existing = $this->fetchAll('SELECT * FROM m_unit_kerja LIMIT 1');

        if (empty($existing)) {
            $unitKerja->insert([
                'nama_unit_kerja' => 'Unit Kerja Default',
                'kode_unit' => 'UK-001',
                'parent_unit_id' => null
            ])->save();
            echo "✓ Default unit kerja created\n";
        } else {
            echo "✓ Unit kerja already exists\n";
        }
    }

    private function createAdminUser(): void
    {
        // FIX 1 — tidak pakai parameter kedua
        $existingAdmin = $this->fetchRow('SELECT * FROM m_users WHERE username = "admin"');

        if ($existingAdmin) {
            echo "⚠ Admin user already exists, skipping...\n";
            return;
        }

        $unitKerja = $this->fetchRow('SELECT unit_kerja_id FROM m_unit_kerja LIMIT 1');
        $unitKerjaId = $unitKerja['unit_kerja_id'];

        $passwordHash = password_hash('admin123', PASSWORD_BCRYPT);

        $users = $this->table('m_users');
        $users->insert([
            'username' => 'admin',
            'password_hash' => $passwordHash,
            'nama_lengkap' => 'Administrator',
            'email' => 'admin@example.com',
            'unit_kerja_id' => $unitKerjaId,
            'created_at' => date('Y-m-d H:i:s')
        ])->save();

        // FIX 2 — juga hapus parameter kedua
        $adminUser = $this->fetchRow('SELECT user_id FROM m_users WHERE username = "admin"');
        $adminUserId = $adminUser['user_id'];

        // FIX 3 — hapus parameter kedua di sini juga
        $adminRole = $this->fetchRow('SELECT role_id FROM m_roles WHERE nama_role = "Admin"');
        $adminRoleId = $adminRole['role_id'];

        $userRoles = $this->table('m_user_roles');
        $userRoles->insert([
            'user_id' => $adminUserId,
            'role_id' => $adminRoleId
        ])->save();
    }
}
