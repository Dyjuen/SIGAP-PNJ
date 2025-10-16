<?php
// app/Core/Controller.php

class Controller {
    /**
     * Memuat file view dan mengirimkan data ke dalamnya.
     * @param string $view Nama file view di dalam folder app/Views.
     * @param array $data Data yang akan diekstrak untuk digunakan di view.
     */
    public function view($view, $data = []) {
        // Ekstrak data agar bisa diakses sebagai variabel di view
        extract($data);

        // Cek apakah file view ada
        if (file_exists('../app/Views/' . $view . '.php')) {
            require_once '../app/Views/' . $view . '.php';
        } else {
            // Tampilkan error jika view tidak ditemukan
            die('View tidak ditemukan: ' . $view);
        }
    }

    /**
     * Memuat file model.
     * @param string $model Nama file model di dalam folder app/Models.
     * @return object Instance dari model yang dimuat.
     */
    public function model($model) {
        require_once '../app/Models/' . $model . '.php';
        return new $model();
    }
}
