<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Response;
use App\Models\Iku;
use App\Models\TipeKegiatan;
use App\Models\Satuan;
use App\Models\KategoriBelanja;

class MasterController extends Controller
{
    public function getIku()
    {
        $ikuModel = new Iku();
        $data = $ikuModel->findAll();
        Response::success($data, 'Data IKU berhasil diambil.');
    }

    public function getTipeKegiatan()
    {
        $tipeKegiatanModel = new TipeKegiatan();
        $data = $tipeKegiatanModel->findAll();
        Response::success($data, 'Data Tipe Kegiatan berhasil diambil.');
    }

    public function getSatuan()
    {
        $satuanModel = new Satuan();
        $data = $satuanModel->findAll();
        Response::success($data, 'Data Satuan berhasil diambil.');
    }

    public function getKategoriBelanja()
    {
        $kategoriBelanjaModel = new KategoriBelanja();
        $data = $kategoriBelanjaModel->findAll();
        Response::success($data, 'Data Kategori Belanja berhasil diambil.');
    }
}
