<?php
// File: phinx.php (Simpan di root proyek Anda, C:\xampp\htdocs\SIGAP-PNJ\phinx.php)

// Muat konfigurasi database kita yang sudah ada
require_once 'config/database.php';

return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/database/migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/database/seeds'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog', // Ini adalah nama tabel pelacak migrasi
        'default_environment' => 'development',
        
        'development' => [
            'adapter' => 'mysql',
            'host' => defined('DB_HOST') ? DB_HOST : 'localhost',
            'name' => defined('DB_NAME') ? DB_NAME : 'sigap_pnj',
            'user' => defined('DB_USER') ? DB_USER : 'root',
            'pass' => defined('DB_PASS') ? DB_PASS : 'rafifdwiarka180706.',
            'port' => 3306, // Ganti jika port MySQL Anda berbeda
            'charset' => 'utf8mb4',
        ]
        
        // Anda bisa tambahkan konfigurasi untuk server production nanti
        // 'production' => [
        //     'adapter' => 'mysql',
        //     'host' => 'HOST_SERVER_ANDA',
        //     'name' => 'NAMA_DB_PRODUKSI',
        //     'user' => 'USER_DB_PRODUKSI',
        //     'pass' => 'PASSWORD_DB_PRODUKSI',
        //     'port' => 3306,
        //     'charset' => 'utf8mb4',
        // ]
    ],
    'version_order' => 'creation'
];