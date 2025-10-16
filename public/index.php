<?php
// public/index.php

// Mulai session jika dibutuhkan
session_start();

// Muat file bootstrap atau inisialisasi utama
// File ini akan bertanggung jawab untuk memuat semua file yang diperlukan
require_once '../app/Core/App.php';
require_once '../app/Core/Controller.php';
require_once '../app/Core/Database.php';
require_once '../config/database.php';

// Inisialisasi aplikasi
$app = new App();