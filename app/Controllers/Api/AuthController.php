<?php
// File: app/Controllers/Api/AuthController.php

use Firebase\JWT\JWT;

class AuthController extends Controller {

    /**
     * Endpoint untuk login user
     * URL: POST /api/auth/login
     * Body: { "username": "...", "password": "..." }
     */
    
    // PERBAIKAN: Fungsi login tidak menerima argumen dari URL
    public function login() {
        
        // Ambil data JSON mentah dari 'body' request
        $data = json_decode(file_get_contents('php://input'), true);

        // 1. Validasi input
        // Kita cek array $data, bukan $requestData
        if (!isset($data['username']) || !isset($data['password'])) {
            $this->jsonError(400, 'Bad Request: Username dan password harus diisi.');
        }

        $username = $data['username'];
        $password = $data['password'];

        // 2. Cari user di database
        $userModel = $this->model('User');
        $user = $userModel->findByUsername($username);

        if (!$user) {
            $this->jsonError(401, 'Unauthorized: Username tidak ditemukan.');
        }
        
        // 3. Verifikasi password
        // (Pastikan password di database Anda di-hash menggunakan password_hash())
        // (Nama kolom di skema Anda adalah password_hash, ini sudah benar)
        if (!$userModel->verifyPassword($password, $user['password_hash'])) {
            $this->jsonError(401, 'Unauthorized: Password salah.');
        }

        // 4. Jika sukses, buat Token (JWT)
        $iat = time(); // issued at (waktu token dibuat)
        $exp = $iat + (60 * 60 * 8); // expired at (token berlaku 8 jam)
        
        $payload = [
            'iss' => 'SIGAP-PNJ', // issuer (siapa yang membuat token)
            'aud' => 'SIGAP-PNJ-Frontend', // audience (untuk siapa token ini)
            'iat' => $iat,
            'nbf' => $iat, // not before (token berlaku mulai kapan)
            'exp' => $exp,
            'data' => [ // Data user yang ingin kita simpan di token
                'user_id' => (int)$user['user_id'],
                'username' => $user['username'],
                'nama_lengkap' => $user['nama_lengkap'],
                'unit_kerja_id' => (int)$user['unit_kerja_id'],
                'roles' => $user['roles'] ? explode(',', $user['roles']) : [] // Ubah string 'admin,user' menjadi array
            ]
        ];

        // Buat token menggunakan library JWT
        $token = JWT::encode($payload, JWT_SECRET, 'HS256');

        // 5. Kirim token ke user
        $this->jsonResponse(200, [
            'status' => 'success',
            'token' => $token
        ]);
    }
}

