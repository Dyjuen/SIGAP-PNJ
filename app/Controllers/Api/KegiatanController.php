<?php
// File: app/Controllers/Api/KegiatanController.php

class KegiatanController extends Controller {

    /**
     * Contoh endpoint yang terlindungi
     * URL: GET /api/kegiatan/all
     * Headers: Authorization: Bearer {token}
     *
     * @param object|null $requestData Data JSON dari body (akan null untuk GET)
     * @param object $userData Data user dari token (disediakan oleh middleware)
     */
    public function all($requestData, $userData) {
        
        // Jika kode sampai di sini, berarti token sudah valid
        // dan $userData berisi data dari token (user_id, username, roles, dll.)

        // Anda bisa mengambil data dari database, misalnya:
        // $kegiatanModel = $this->model('Kegiatan');
        
        // Contoh: filter data berdasarkan user yang sedang login
        // $daftarKegiatan = $kegiatanModel->getKegiatanByUserId($userData->user_id);
        
        $this->jsonSuccess('Data kegiatan berhasil diambil (ini hanya contoh)', [
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
     *
     * @param object $requestData Data JSON dari body
     * @param object $userData Data user dari token
     */
    public function create($requestData, $userData) {
        
        if (!isset($requestData->nama_kegiatan)) {
             $this->jsonError(400, 'Bad Request: nama_kegiatan harus diisi.');
        }

        // Simpan data ke database
        // $kegiatanModel = $this->model('Kegiatan');
        // $newId = $kegiatanModel->createBaru(
        //     $requestData->nama_kegiatan,
        //     $userData->user_id // Simpan siapa yang membuat
        // );

        $this->jsonSuccess('Kegiatan baru berhasil dibuat (contoh)', [
            'id_baru' => 123, // $newId
            'data_input' => $requestData,
            'dibuat_oleh' => $userData->username
        ]);
    }
}
