<?php
// app/Core/Controller.php

class Controller
{
    /**
     * Memuat file view dan mengirimkan data ke dalamnya.
     * @param string $view Nama file view di dalam folder app/Views.
     * @param array $data Data yang akan diekstrak untuk digunakan di view.
     */
    public function view($view, $data = [])
    {
        // Ubah array data menjadi variabel individual (misal: $data['judul'] menjadi $judul)
        extract($data);

        // Buat path absolut ke file view konten (misal: .../SIGAP-PNJ/app/Views/home.php)
        $contentView = ROOT . '/app/Views/' . $view . '.php';

        // Periksa apakah file view konten benar-benar ada
        if (file_exists($contentView)) {
            // Jika ada, muat file layout utama yang akan memanggil $contentView
            require_once ROOT . '/app/Views/layouts/app.php';
        } else {
            // Jika tidak ada, hentikan eksekusi dan tampilkan pesan error
            die('View tidak ditemukan di: ' . $contentView);
        }
    }

    /**
     * Memuat file model.
     * @param string $model Nama file model di dalam folder app/Models.
     * @return object Instance dari model yang dimuat.
     */
    public function model($model)
    {
        require_once ROOT . '/app/Models/' . $model . '.php';
        return new $model();
    }
}