<?php
/** config/jwt.php */

/**
 * JWT Configuration
 * 
 * Konfigurasi untuk JSON Web Token authentication
 */

return [
    /**
     * Secret key untuk encrypt/decrypt JWT token
     * 
     * PENTING: Ganti dengan secret key yang kuat di production!
     * Generate dengan: base64_encode(random_bytes(32))
     * Atau simpan di .env file untuk keamanan lebih baik
     */
    'secret' => getenv('JWT_SECRET') ?: '9V/iF}*xu:VZ#&edSYa3$)/',

    /**
     * Algorithm yang digunakan untuk JWT
     * 
     * Pilihan: HS256, HS384, HS512, RS256, RS384, RS512
     */
    'algorithm' => 'HS256',

    /**
     * Token expiry time (dalam detik)
     * 
     * Default: 86400 detik = 24 jam
     * 
     * Contoh nilai:
     * - 3600 = 1 jam
     * - 86400 = 24 jam (1 hari)
     * - 604800 = 7 hari
     * - 2592000 = 30 hari
     */
    'expiry' => 86400, // 24 jam

    /**
     * Refresh token expiry time (dalam detik)
     * 
     * Default: 604800 detik = 7 hari
     * 
     * Digunakan jika implementasi refresh token diperlukan
     */
    'refresh_expiry' => 604800, // 7 hari
];