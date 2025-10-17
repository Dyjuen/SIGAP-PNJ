<?php

class HomeController extends Controller {
    /**
     * Menampilkan halaman utama (dashboard).
     */
    public function index() {
        // Menyiapkan data yang akan dikirim ke view
        $data['judul'] = 'Dashboard';

        $this->view('home', $data);
    }

}