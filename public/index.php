<?php
// public/index.php
if(!session_id()) session_start();

// Definisikan konstanta ROOT yang menunjuk ke folder utama proyek
define('ROOT', dirname(__DIR__));

// Muat semua file inti menggunakan path absolut dari ROOT
require_once ROOT . '/app/Core/App.php';
require_once ROOT . '/app/Core/Controller.php';
require_once ROOT . '/app/Core/Database.php';
require_once ROOT . '/config/database.php';
require_once ROOT . '/app/helpers.php'; 

// Inisialisasi aplikasi
$app = new App();