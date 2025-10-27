<?php
// File: app/Core/ApiMiddleware.php
// Ini adalah "Penjaga Keamanan" untuk rute API

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;

// Kita perlu Controller untuk mengakses jsonError
require_once ROOT . '/app/Core/Controller.php';

class ApiMiddleware extends Controller {

    /**
     * Memeriksa header otorisasi dan memvalidasi token JWT.
     * Akan mengembalikan data user jika valid, atau 'die' dengan error JSON jika tidak.
     */
    public function checkAuth() {
        $headers = getallheaders();
        
        // Cek apakah header 'Authorization' ada (case-insensitive)
        $authHeader = null;
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        } elseif (isset($headers['authorization'])) {
            $authHeader = $headers['authorization'];
        }

        if (!$authHeader) {
            $this->jsonError(401, 'Unauthorized: Token tidak ditemukan.');
        }

        // Pisahkan "Bearer" dan token-nya
        $parts = explode(' ', $authHeader);

        if (count($parts) !== 2 || strtolower($parts[0]) !== 'bearer') {
            $this->jsonError(401, 'Unauthorized: Format token salah. Harap gunakan format "Bearer {token}".');
        }

        $token = $parts[1];

        try {
            // Coba decode token menggunakan Kunci Rahasia kita
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            
            // Token valid, kembalikan data user (dari payload 'data')
            return $decoded->data;

        } catch (ExpiredException $e) {
            // Error jika token kedaluwarsa
            $this->jsonError(401, 'Unauthorized: Token telah kedaluwarsa.');
        } catch (SignatureInvalidException $e) {
            // Error jika token dipalsukan (signature salah)
            $this->jsonError(401, 'Unauthorized: Token tidak valid (signature).');
        } catch (BeforeValidException $e) {
            // Error jika token dipakai sebelum waktunya (nbf)
             $this->jsonError(401, 'Unauthorized: Token belum aktif.');
        } catch (Exception $e) {
            // Tangkap error umum lainnya
            $this->jsonError(401, 'Unauthorized: Token tidak valid.', ['detail' => $e->getMessage()]);
        }
    }
}