<?php
use Phinx\Migration\AbstractMigration;

class CreateUsersTable extends AbstractMigration
{
    /**
     * Metode 'up' dijalankan saat Anda 'migrate'.
     */
    public function up()
    {
        // Dapatkan objek tabel 'users'
        $table = $this->table('users');

        // Tentukan kolom-kolomnya
        $table->addColumn('username', 'string', ['limit' => 255])
              ->addColumn('password', 'string', ['limit' => 255])
              ->addColumn('nama_lengkap', 'string', ['limit' => 255, 'null' => true])
              ->addColumn('role', 'enum', ['values' => ['admin', 'user'], 'default' => 'user'])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addIndex(['username'], ['unique' => true]) // Buat username unik
              ->create(); // Jalankan perintah CREATE TABLE

        // Masukkan data admin awal
        $passwordHash = password_hash('password123', PASSWORD_DEFAULT);
        $this->execute("
            INSERT INTO users (username, password, nama_lengkap, role) VALUES 
            ('admin', '$passwordHash', 'Admin SIGAP', 'admin')
        ");
    }

    /**
     * Metode 'down' dijalankan saat Anda 'rollback'.
     */
    public function down()
    {
        // Perintah untuk menghapus tabel
        $this->table('users')->drop()->save();
    }
}