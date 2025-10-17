<?php
// app/helpers.php
if (!function_exists('baseUrl')) {
    /**
     * Menghasilkan URL absolut ke sebuah aset.
     * Disesuaikan untuk lingkungan XAMPP standar.
     */
    function baseUrl($path = '') {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'];

        // Kita hanya mengambil path ke direktori tempat index.php berada (yaitu, folder public)
        $script_path = str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);

        $base_url = rtrim($protocol . $host . $script_path, '/');

        return $base_url . '/' . ltrim($path, '/');
    }
}