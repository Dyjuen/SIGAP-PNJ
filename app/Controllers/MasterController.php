<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Iku;
use App\Models\TipeKegiatan;
use App\Models\Satuan;

class MasterController extends Controller
{
    public function getIku()
    {
        $ikuModel = new Iku();
        $data = $ikuModel->findAll();
        $this->sendResponse(200, [
            'success' => true,
            'data' => $data
        ]);
    }

    public function getTipeKegiatan()
    {
        $tipeKegiatanModel = new TipeKegiatan();
        $data = $tipeKegiatanModel->findAll();
        $this->sendResponse(200, [
            'success' => true,
            'data' => $data
        ]);
    }

    public function getSatuan()
    {
        $satuanModel = new Satuan();
        $data = $satuanModel->findAll();
        $this->sendResponse(200, [
            'success' => true,
            'data' => $data
        ]);
    }
}
