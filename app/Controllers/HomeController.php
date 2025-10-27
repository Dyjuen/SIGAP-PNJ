<?php

namespace App\Controllers;

use App\Core\Controller; 

class HomeController extends Controller
{
    /**
     * Menampilkan halaman utama (dashboard).
     */
    public function index()
    {
        $data['judul'] = 'Dashboard';
        $this->view('home', $data);
    }
}
