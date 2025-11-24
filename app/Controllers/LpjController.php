<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Response;
use App\Core\FileUpload;
use App\Models\Kegiatan;
use App\Models\KAKAnggaran;
use App\Models\KegiatanLampiran;
use App\Middlewares\AuthMiddleware;

class LpjController extends Controller
{
    private $kegiatanModel;
    private $kakAnggaranModel;
    private $kegiatanLampiranModel;
    protected $user;

    public function __construct()
    {
        parent::__construct();
        $this->kegiatanModel = new Kegiatan();
        $this->kakAnggaranModel = new KAKAnggaran();
        $this->kegiatanLampiranModel = new KegiatanLampiran();
    }

    /**
     * Submit LPJ for a given kegiatan.
     * Handles multipart/form-data with realization data and proof files.
     * POST /api/kegiatan/{kegiatan_id}/lpj
     */
    public function submit($kegiatanId)
    {
        $db = $this->kegiatanModel->getDb();
        $uploader = new FileUpload(
            '/storage/uploads/documents/', // path
            ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'xls', 'xlsx'], // allowed extensions
            10485760 // 10 MB max size
        );
        $uploadedFiles = [];

        try {
            $kegiatanId = (int) $kegiatanId;

            // 1. Authorization & Validation
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            if (!$kegiatan) {
                return Response::notFound('Kegiatan tidak ditemukan.');
            }
            if ($kegiatan['pengusul_user_id'] != $this->user['user_id']) {
                return Response::forbidden('Anda bukan pengusul kegiatan ini.');
            }
            if ($kegiatan['lpj_submitted_at'] !== null) {
                return Response::error('LPJ untuk kegiatan ini sudah pernah disubmit.', 400);
            }

            $realisasiData = $_POST['realisasi'] ?? [];
            $files = $_FILES['bukti'] ?? [];

            if (empty($realisasiData)) {
                return Response::error('Data realisasi tidak boleh kosong.', 422);
            }

            $db->beginTransaction();

            // 2. Process each budget item's realization
            foreach ($realisasiData as $anggaranId => $data) {
                // Sanitize and prepare data for update
                $updateData = [
                    'realisasi_volume1' => $data['volume1'] ?? null,
                    'realisasi_satuan1_id' => $data['satuan1_id'] ?? null,
                    'realisasi_volume2' => $data['volume2'] ?? null,
                    'realisasi_satuan2_id' => $data['satuan2_id'] ?? null,
                    'realisasi_volume3' => $data['volume3'] ?? null,
                    'realisasi_satuan3_id' => $data['satuan3_id'] ?? null,
                    'realisasi_harga_satuan' => $data['harga_satuan'] ?? null,
                    'realisasi_jumlah' => $data['jumlah'] ?? null,
                ];

                // Update the t_kak_anggaran table
                $this->kakAnggaranModel->update($anggaranId, $updateData);

                // Handle file upload if exists for this item
                if (isset($files['name'][$anggaranId]) && $files['error'][$anggaranId] === UPLOAD_ERR_OK) {
                    $fileToUpload = [
                        'name' => $files['name'][$anggaranId],
                        'type' => $files['type'][$anggaranId],
                        'tmp_name' => $files['tmp_name'][$anggaranId],
                        'error' => $files['error'][$anggaranId],
                        'size' => $files['size'][$anggaranId],
                    ];
                    
                    $uploadResult = $uploader->upload($fileToUpload);
                    if (!$uploadResult['success']) {
                        throw new \Exception("Gagal mengupload file bukti untuk item anggaran ID {$anggaranId}: " . $uploadResult['message']);
                    }
                    $uploadedFiles[] = $uploadResult['file_path'];

                    // Create a record in t_kegiatan_lampiran
                    $this->kegiatanLampiranModel->create([
                        'anggaran_id' => $anggaranId,
                        'nama_file_asli' => $uploadResult['original_name'],
                        'path_file_disimpan' => $uploadResult['file_path'],
                        'uploader_user_id' => $this->user['user_id'],
                        'catatan' => 'Bukti LPJ untuk item anggaran.',
                    ]);
                }
            }

            // 3. Update Kegiatan status
            $this->kegiatanModel->update($kegiatanId, ['lpj_submitted_at' => date('Y-m-d H:i:s')]);
            
            // Activate 'Bendahara-LPJ' approval status
            $this->kegiatanModel->activateLpjApproval($kegiatanId);

            $db->commit();

            return Response::success(null, 'LPJ berhasil disubmit dan menunggu review dari Bendahara LPJ.');

        } catch (\Exception $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            // Clean up uploaded files on failure
            foreach ($uploadedFiles as $path) {
                $uploader->delete($path);
            }
            return Response::error('Gagal submit LPJ: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Send an LPJ back for revision.
     * POST /api/kegiatan/{kegiatan_id}/lpj/revise
     */
    public function revise($kegiatanId)
    {
        $db = $this->kegiatanModel->getDb();
        
        try {
            // Authorization: Only Bendahara can revise an LPJ
            if (!in_array('Bendahara', $this->user['roles'])) {
                return Response::forbidden('Hanya Bendahara yang dapat merevisi LPJ.');
            }

            $kegiatanId = (int) $kegiatanId;
            $data = json_decode(file_get_contents('php://input'), true);
            $catatan = $data['catatan'] ?? null;

            if (empty($catatan)) {
                return Response::error('Catatan revisi tidak boleh kosong.', 422);
            }

            $db->beginTransaction();

            // Find the Bendahara-LPJ approval record
            $approvalModel = new \App\Models\KegiatanApproval();
            $lpjApproval = $approvalModel->findOneBy([
                'kegiatan_id' => $kegiatanId,
                'approval_level' => 'Bendahara-LPJ'
            ]);

            if (!$lpjApproval) {
                return Response::notFound('Alur persetujuan LPJ untuk kegiatan ini tidak ditemukan.');
            }

            // Update the approval status to 'Revisi'
            $approvalModel->update($lpjApproval['approval_kegiatan_id'], [
                'status' => 'Revisi',
                'catatan' => $catatan,
                'approver_user_id' => $this->user['user_id']
            ]);

            // Optional: Update the main kegiatan status if there's a specific "Revisi LPJ" status
            // For now, we'll rely on the approval status.

            // Notify the Pengusul
            $kegiatan = $this->kegiatanModel->findById($kegiatanId);
            $notifikasiModel = new \App\Models\Notifikasi();
            $notifikasiModel->create([
                'penerima_user_id' => $kegiatan['pengusul_user_id'],
                'pesan' => "LPJ untuk kegiatan \"{$kegiatan['nama_kegiatan']}\" perlu direvisi. Catatan: {$catatan}",
                'link_tujuan' => "/pengusul/kegiatan/lpj/new?kegiatan_id=" . $kegiatanId,
            ]);

            $db->commit();

            return Response::success(null, 'LPJ telah dikembalikan untuk revisi.');

        } catch (\Exception $e) {
            if ($db->inTransaction()) {
                $db->rollBack();
            }
            return Response::error('Gagal merevisi LPJ: ' . $e->getMessage(), 500);
        }
    }
}
