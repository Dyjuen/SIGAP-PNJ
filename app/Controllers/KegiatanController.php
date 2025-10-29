<?php
// File: app/Controllers/KegiatanController.php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\ApiMiddleware;

class KegiatanController extends Controller {

    private $userData; // Properti untuk menyimpan data user yang login

    /**
     * Constructor ini akan berjalan SEBELUM method lain.
     * Kita akan memvalidasi token di sini.
     */
    public function __construct() {
        // 1. Panggil Middleware untuk melindungi SEMUA method di controller ini
        $middleware = new ApiMiddleware();
        
        // 2. checkAuth() akan memvalidasi token. 
        //    Jika token salah, ia akan 'die' (mengirim error 401).
        //    Jika token benar, ia akan mengembalikan data user.
        $this->userData = $middleware->checkAuth();
    }

    /**
     * Contoh endpoint yang terlindungi
     * URL: GET /api/kegiatan/all
     * Headers: Authorization: Bearer {token}
     */
    // PERBAIKAN: Method 'all' tidak lagi mengharapkan argumen
    public function all() {
        
        // Jika kode sampai di sini, berarti token sudah valid
        // dan $this->userData berisi data dari token.
        $userData = $this->userData;

        // (Untuk method GET, $requestData biasanya tidak ada atau dari query URL)
        
        // Anda bisa mengambil data dari database, misalnya:
        // $kegiatanModel = $this->model('Kegiatan');
        
        // Contoh: filter data berdasarkan user yang sedang login
        // $daftarKegiatan = $kegiatanModel->getKegiatanByUserId($userData->user_id);
        
        $this->jsonResponse(200, [
            'status' => 'success',
            'message' => 'Data kegiatan berhasil diambil',
            'user_yang_login' => $userData,
            'contoh_data_kegiatan' => [
                ['id' => 1, 'nama' => 'Kegiatan A'],
                ['id' => 2, 'nama' => 'Kegiatan B']
            ]
        ]);
    }

    /**
     * Contoh lain:
     * URL: POST /api/kegiatan/create
     * Headers: Authorization: Bearer {token}
     * Body: { "nama_kegiatan": "..." }
     */
    // PERBAIKAN: Method 'create' tidak lagi mengharapkan argumen
    public function create() {
        
        // 1. Ambil data user yang sudah divalidasi dari constructor
        $userData = $this->userData;

        // 2. Ambil data 'body' JSON secara manual
        $requestData = json_decode(file_get_contents('php://input'));
        
        if (!isset($requestData->nama_kegiatan)) {
             $this->jsonError(400, 'Bad Request: nama_kegiatan harus diisi.');
        }

        // 3. Simpan data ke database
        // $kegiatanModel = $this->model('Kegiatan');
        // $newId = $kegiatanModel->createBaru(
        //     $requestData->nama_kegiatan,
        //     $userData->user_id // Simpan siapa yang membuat
        // );

        $this->jsonResponse(201, [ // 201 Created
            'status' => 'success',
            'message' => 'Kegiatan baru berhasil dibuat (contoh)',
            'id_baru' => 123, // $newId
            'data_input' => $requestData,
            'dibuat_oleh' => $userData->username
        ]);
    }
}

