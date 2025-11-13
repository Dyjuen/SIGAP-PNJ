<?php

namespace App\Controllers;

use App\Core\Database;
use App\Core\Response;
use App\Core\PDF;
use App\Models\KAK;
use App\Models\KAKAnggaran;
use App\Models\KAKApproval;
use App\Models\KAKIku;
use App\Models\KAKIndikator;
use App\Models\KAKLogStatus;
use App\Models\KAKManfaat;
use App\Models\KAKTahapan;
use App\Models\KAKTarget;
use PDOException;

class KAKController
{
    private $db;
    private $kakModel;

    public function __construct()
    {
        $this->db = Database::getInstance();
        $this->kakModel = new KAK();
    }

    private function responseSuccess($data, $code = 200)
    {
        http_response_code($code);
        echo json_encode([
            "status" => "success",
            "data" => $data
        ]);
        exit;
    }

    private function responseError($message, $code = 500)
    {
        http_response_code($code);
        echo json_encode([
            "status" => "error",
            "message" => $message
        ]);
        exit;
    }
    
    public function download()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)$/', $uri, $matches);
        $kakId = $matches[1] ?? null;

        if (!$kakId) {
            Response::error('KAK ID tidak valid.', 400);
        }

        $kakData = $this->kakModel->getDataForKAK($kakId);

        if (!$kakData) {
            Response::notFound('Data KAK tidak ditemukan.');
        }

        $html = $this->generateKAKHTML($kakData);
        $filename = $this->generateFilename($kakData);
        PDF::download($html, $filename);
    }

    public function preview()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)\/preview$/', $uri, $matches);
        $kakId = $matches[1] ?? null;

        if (!$kakId) {
            Response::error('KAK ID tidak valid.', 400);
        }

        $kakData = $this->kakModel->getDataForKAK($kakId);

        if (!$kakData) {
            Response::notFound('Data KAK tidak ditemukan.');
        }

        $html = $this->generateKAKHTML($kakData);
        header('Content-Type: text/html; charset=utf-8');
        echo $html;
        exit;
    }

    private function generateFilename($kakData)
    {
        $namaKegiatan = preg_replace('/[^a-zA-Z0-9\s]/', '', $kakData['nama_kegiatan']);
        $namaKegiatan = substr($namaKegiatan, 0, 50);
        $namaKegiatan = str_replace(' ', '-', $namaKegiatan);
        $date = date('Ymd');
        return "KAK-{$namaKegiatan}-{$date}.pdf";
    }

    private function generateKAKHTML($kakData)
    {
        $kegiatan = $kakData;
        ob_start();
        include __DIR__ . '/../Views/pdf/kak-template.php';
        $html = ob_get_clean();
        return $html;
    }

    public function getData()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        preg_match('/\/kak\/(\d+)\/data$/', $uri, $matches);
        $kakId = $matches[1] ?? null;

        if (!$kakId) {
            Response::error('KAK ID tidak valid.', 400);
        }

        $kakData = $this->kakModel->getDataForKAK($kakId);

        if (!$kakData) {
            Response::notFound('Data KAK tidak ditemukan.');
        }

        Response::success($kakData, 'Data KAK berhasil diambil.');
    }

    public function index()
    {
        try {
            $sql = "
                SELECT 
                    t.*, 
                    u.nama_lengkap AS pengusul_nama,
                    s.nama_status,
                    COALESCE((
                        SELECT SUM(
                            (CASE WHEN COALESCE(a.volume1,0)=0 THEN 1 ELSE a.volume1 END)
                            *
                            (CASE WHEN COALESCE(a.volume2,0)=0 THEN 1 ELSE a.volume2 END)
                            * harga_satuan
                        ) FROM t_kak_anggaran a WHERE a.kak_id = t.kak_id
                    ),0) AS total_diusulkan
                FROM t_kak t
                LEFT JOIN m_users u ON u.user_id = t.pengusul_user_id
                LEFT JOIN m_kegiatan_status s ON s.status_id = t.status_id
                ORDER BY t.kak_id DESC
            ";

            $this->db->query($sql);
            $rows = $this->db->resultSet();

            return $this->responseSuccess($rows);
        } catch (PDOException $e) {
            return $this->responseError($e->getMessage());
        }
    }

    public function show($id)
    {
        try {
            $this->db->query("SELECT * FROM t_kak WHERE kak_id = :id");
            $this->db->bind(':id', $id);
            $kak = $this->db->single();

            if (!$kak) {
                return $this->responseError("Data tidak ditemukan", 404);
            }

            $childTables = [
                'manfaat'   => "SELECT * FROM t_kak_manfaat WHERE kak_id=:id",
                'tahapan'   => "SELECT * FROM t_kak_tahapan WHERE kak_id=:id ORDER BY urutan ASC",
                'target'    => "SELECT * FROM t_kak_target WHERE kak_id=:id",
                'iku'       => "SELECT * FROM t_kak_iku WHERE kak_id=:id",
                'anggaran'  => "SELECT * FROM t_kak_anggaran WHERE kak_id=:id",
            ];

            $data = [
                "kak" => $kak
            ];

            foreach ($childTables as $key => $sql) {
                $this->db->query($sql);
                $this->db->bind(':id', $id);
                $data[$key] = $this->db->resultSet();
            }

            $totalDiajukan = 0;
            if (!empty($data['anggaran'])) {
                foreach ($data['anggaran'] as $item) {
                    $totalDiajukan += floatval($item['jumlah_diusulkan'] ?? 0);
                }
            }

            $data['kak']['total_diajukan'] = $totalDiajukan;

            $this->db->query("
                SELECT l.*, 
                s1.nama_status AS status_lama,
                s2.nama_status AS status_baru
                FROM t_kak_log_status l
                LEFT JOIN m_kegiatan_status s1 ON s1.status_id = l.status_id_lama
                LEFT JOIN m_kegiatan_status s2 ON s2.status_id = l.status_id_baru
                WHERE l.kak_id = :id
                ORDER BY l.timestamp ASC
            ");
            $this->db->bind(':id', $id);
            $data['log_status'] = $this->db->resultSet();

            $this->db->query("
                SELECT a.*, u.nama_lengkap AS approver_nama
                FROM t_kak_approval a
                LEFT JOIN m_users u ON u.user_id = a.approver_user_id
                WHERE a.kak_id = :id
            ");
            $this->db->bind(':id', $id);
            $data['approval'] = $this->db->resultSet();

            return $this->responseSuccess($data);
        } catch (PDOException $e) {
            return $this->responseError($e->getMessage());
        }
    }

    public function store()
    {
        try {
            $auth = auth_user();
            if (!$auth) return $this->responseError("Unauthorized", 401);
            $pengusul = $auth['user_id'];

            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input || !isset($input['kak'])) {
                return $this->responseError("Format JSON tidak valid", 400);
            }

            $k = $input['kak'];

            $this->db->beginTransaction();

            $sql = "
                INSERT INTO t_kak 
                (nama_kegiatan, deskripsi_kegiatan, metode_pelaksanaan, kurun_waktu_pelaksanaan,
                 tanggal_mulai, tanggal_selesai, lokasi, pengusul_user_id, status_id)
                VALUES 
                (:nama, :desk, :metode, :kurun, :mulai, :selesai, :lokasi, :user, 1)
            ";

            $this->db->query($sql);
            $this->db->bind(':nama', $k['nama_kegiatan']);
            $this->db->bind(':desk', $k['deskripsi_kegiatan']);
            $this->db->bind(':metode', $k['metode_pelaksanaan']);
            $this->db->bind(':kurun', $k['kurun_waktu_pelaksanaan']);
            $this->db->bind(':mulai', $k['tanggal_mulai']);
            $this->db->bind(':selesai', $k['tanggal_selesai']);
            $this->db->bind(':lokasi', $k['lokasi']);
            $this->db->bind(':user', $pengusul);
            $this->db->execute();

            $id = $this->db->lastInsertId();

            if (!empty($k['penerima_manfaat'])) {
                foreach ($k['penerima_manfaat'] as $m) {
                    $this->db->query("
                        INSERT INTO t_kak_manfaat
                        (kak_id, manfaat, sasaran_utama)
                        VALUES (:id, :m, :sas)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':m', $m['manfaat']);
                    $this->db->bind(':sas', $m['sasaran_utama']);
                    $this->db->execute();
                }
            }

            if (!empty($k['tahapan_pelaksanaan'])) {
                foreach ($k['tahapan_pelaksanaan'] as $t) {
                    $this->db->query("
                        INSERT INTO t_kak_tahapan
                        (kak_id, nama_tahapan, urutan)
                        VALUES (:id, :nama, :urut)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':nama', $t['nama_tahapan']);
                    $this->db->bind(':urut', $t['urutan']);
                    $this->db->execute();
                }
            }

            if (!empty($k['indikator_kinerja'])) {
                foreach ($k['indikator_kinerja'] as $i) {
                    $this->db->query("
                        INSERT INTO t_kak_indikator
                        (kak_id, deskripsi_indikator)
                        VALUES (:id, :d)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':d', $i['deskripsi_indikator']);
                    $this->db->execute();
                }
            }

            if (!empty($input['target_iku'])) {
                foreach ($input['target_iku'] as $iku) {
                    $this->db->query("
                        INSERT INTO t_kak_iku
                        (kak_id, iku_id, persentase_target)
                        VALUES (:id, :iku, :p)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':iku', $iku['iku_id']);
                    $this->db->bind(':p', $iku['persentase_target']);
                    $this->db->execute();
                }
            }

            if (!empty($input['target'])) {
                foreach ($input['target'] as $t) {
                    $this->db->query("
                        INSERT INTO t_kak_target
                        (kak_id, deskripsi_target, bulan_indikator, persentase_target)
                        VALUES (:id, :desk, :bulan, :p)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':desk', $t['deskripsi_target']);
                    $this->db->bind(':bulan', $t['bulan_indikator']);
                    $this->db->bind(':p', $t['persentase_target']);
                    $this->db->execute();
                }
            }

            if (!empty($input['rab'])) {
                foreach ($input['rab'] as $r) {
                    $v1 = !empty($r['volume1']) ? $r['volume1'] : 1;
                    $v2 = !empty($r['volume2']) ? $r['volume2'] : 1;
                    $jumlah = $v1 * $v2 * $r['harga_satuan'];

                    $this->db->query("
                        INSERT INTO t_kak_anggaran
                        (kak_id, uraian, volume1, volume2, satuan_id, harga_satuan, jumlah_diusulkan, catatan_verifikator)
                        VALUES (:id, :u, :v1, :v2, :sat, :h, :j, NULL)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':u', $r['uraian']);
                    $this->db->bind(':v1', $v1);
                    $this->db->bind(':v2', $v2);
                    $this->db->bind(':sat', $r['satuan_id']);
                    $this->db->bind(':h', $r['harga_satuan']);
                    $this->db->bind(':j', $jumlah);
                    $this->db->execute();
                }
            }

            $this->db->commit();

            return $this->responseSuccess([
                "message" => "Draft berhasil dibuat",
                "kak_id" => $id
            ]);
        } catch (PDOException $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            return $this->responseError($e->getMessage());
        }
    }

    public function submitForVerification($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            $db->query("SELECT * FROM t_kak WHERE kak_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);

            if ($data['pengusul_user_id'] != $user['user_id'])
                return $this->responseError("Tidak boleh submit milik orang lain", 403);

            if (!in_array($data['status_id'], [1, 5]))
                return $this->responseError("Tidak dapat submit pada status ini", 400);

            $db->beginTransaction();

            $db->query("
                UPDATE t_kak SET status_id = 2,
                catatan_nama_kegiatan = NULL,
                catatan_deskripsi_kegiatan = NULL,
                catatan_sasaran_utama = NULL,
                catatan_metode_pelaksanaan = NULL,
                catatan_lokasi = NULL,
                updated_at = NOW()
                WHERE kak_id = :id
            ");
            $db->bind(':id', $id);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_log_status
                (kak_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, :lama, 2, :user, :ct, NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':lama', $data['status_id']);
            $db->bind(':user', $user['user_id']);
            $db->bind(':ct', "Pengusul submit");
            $db->execute();

            $db->query("
                INSERT INTO t_kak_approval
                (kak_id, approver_user_id, status, created_at)
                VALUES (:id, NULL, 'SUBMITTED', NOW())
            ");
            $db->bind(':id', $id);
            $db->execute();

            $db->commit();
            return $this->responseSuccess("KAK berhasil disubmit.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }

    public function requestRevision($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            $db->query("SELECT * FROM t_kak WHERE kak_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);

            if ($data['status_id'] != 2)
                return $this->responseError("Hanya bisa revisi pada status 'Dalam Review'", 400);

            $input = json_decode(file_get_contents("php://input"), true);
            if (!$input) return $this->responseError("Input tidak valid", 400);

            $db->beginTransaction();

            if (!empty($input['catatan_kak'])) {
                foreach ($input['catatan_kak'] as $field => $note) {
                    $col = "catatan_" . $field;
                    $db->query("UPDATE t_kak SET $col = :n WHERE kak_id=:id");
                    $db->bind(':n', $note);
                    $db->bind(':id', $id);
                    $db->execute();
                }
            }

            if (!empty($input['anak'])) {
                foreach ($input['anak'] as $table => $rows) {
                    $pk = [
                        't_kak_manfaat' => 'manfaat_id',
                        't_kak_tahapan' => 'tahapan_id',
                        't_kak_target'  => 'target_id',
                        't_kak_anggaran' => 'anggaran_id',
                        't_kak_iku'     => 'iku_id'
                    ][$table] ?? null;

                    if (!$pk) continue;

                    foreach ($rows as $r) {
                        $db->query("
                            UPDATE $table SET catatan_verifikator = :c 
                            WHERE $pk = :pk AND kak_id = :id
                        ");
                        $db->bind(':c', $r['catatan_verifikator']);
                        $db->bind(':pk', $r['id']);
                        $db->bind(':id', $id);
                        $db->execute();
                    }
                }
            }

            $db->query("UPDATE t_kak SET status_id = 5 WHERE kak_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_log_status 
                (kak_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 2, 5, :usr, 'Diminta revisi', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_approval
                (kak_id, approver_user_id, status, catatan, created_at)
                VALUES (:id, :usr, 'REVISED', NULL, NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            $db->commit();

            return $this->responseSuccess("Revisi berhasil diberikan.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }

    public function resubmitAfterRevision($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            $db->query("SELECT * FROM t_kak WHERE kak_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);

            if ($data['pengusul_user_id'] != $user['user_id'])
                return $this->responseError("Tidak boleh mengedit milik orang lain", 403);

            if ($data['status_id'] != 5)
                return $this->responseError("Tidak dalam status revisi", 400);

            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input) return $this->responseError("Input tidak valid", 400);

            $db->beginTransaction();

            if (!empty($input['kak'])) {
                $allowed = [
                    'nama_kegiatan',
                    'deskripsi_kegiatan',
                    'sasaran_utama',
                    'metode_pelaksanaan',
                    'kurun_waktu_pelaksanaan',
                    'tanggal_mulai',
                    'tanggal_selesai',
                    'lokasi'
                ];

                foreach ($input['kak'] as $f => $v) {
                    if (!in_array($f, $allowed)) continue;

                    $colNote = "catatan_" . $f;

                    $db->query("
                        UPDATE t_kak 
                        SET $f = :v, $colNote = NULL 
                        WHERE kak_id = :id
                    ");
                    $db->bind(':v', $v);
                    $db->bind(':id', $id);
                    $db->execute();
                }
            }

            if (!empty($input['anak'])) {

                $pkMap = [
                    't_kak_manfaat' => 'manfaat_id',
                    't_kak_tahapan' => 'tahapan_id',
                    't_kak_target'  => 'target_id',
                    't_kak_anggaran' => 'anggaran_id',
                    't_kak_iku'     => 'iku_id'
                ];

                foreach ($input['anak'] as $table => $rows) {
                    if (!isset($pkMap[$table])) continue;

                    $pk = $pkMap[$table];

                    foreach ($rows as $r) {

                        $idChild = $r['id'];
                        unset($r['id']);

                        $r['catatan_verifikator'] = null;

                        $setParts = [];
                        foreach ($r as $k => $v) {
                            $setParts[] = "$k = :$k";
                        }
                        $sqlSet = implode(", ", $setParts);

                        $db->query("
                            UPDATE $table
                            SET $sqlSet
                            WHERE $pk = :pk AND kak_id = :tid
                        ");

                        $params = array_merge($r, [
                            'pk'  => $idChild,
                            'tid' => $id,
                        ]);

                        foreach ($params as $key => $val) {
                            $db->bind(':' . $key, $val);
                        }

                        $db->execute();
                    }
                }
            }

            $db->query("UPDATE t_kak SET status_id = 2 WHERE kak_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_log_status
                (kak_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 5, 2, :usr, 'Resubmit revisi', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_approval
                (kak_id, approver_user_id, status, created_at)
                VALUES (:id, :usr, 'RESUBMITTED', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            $db->commit();

            return $this->responseSuccess("Berhasil resubmit revisi.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }

    public function approve($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            $db->query("SELECT * FROM t_kak WHERE kak_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);

            if ($data['status_id'] != 2)
                return $this->responseError("Tidak dalam status review", 400);

            if ($data['pengusul_user_id'] == $user['user_id'])
                return $this->responseError("Pengusul tidak dapat approve", 403);

            $db->beginTransaction();

            $db->query("UPDATE t_kak SET status_id = 3 WHERE kak_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_log_status
                (kak_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 2, 3, :usr, 'Disetujui', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_approval
                (kak_id, approver_user_id, status, created_at)
                VALUES (:id, :usr, 'APPROVED', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            $fields = [
                'catatan_nama_kegiatan',
                'catatan_deskripsi_kegiatan',
                'catatan_sasaran_utama',
                'catatan_metode_pelaksanaan',
                'catatan_lokasi'
            ];

            foreach ($fields as $f) {
                $db->query("UPDATE t_kak SET $f=NULL WHERE kak_id=:id");
                $db->bind(':id', $id);
                $db->execute();
            }

            $childTables = [
                't_kak_manfaat',
                't_kak_tahapan',
                't_kak_target',
                't_kak_anggaran',
                't_kak_iku'
            ];

            foreach ($childTables as $tbl) {
                $db->query("UPDATE $tbl SET catatan_verifikator=NULL WHERE kak_id=:id");
                $db->bind(':id', $id);
                $db->execute();
            }

            $db->commit();

            return $this->responseSuccess("KAK berhasil disetujui.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }

    public function reject($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            $db->query("SELECT * FROM t_kak WHERE kak_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);

            if ($data['status_id'] != 2)
                return $this->responseError("Tidak dalam status review", 400);

            if ($data['pengusul_user_id'] == $user['user_id'])
                return $this->responseError("Pengusul tidak dapat menolak", 403);

            $input = json_decode(file_get_contents('php://input'), true);
            $catatan = $input['catatan'] ?? null;

            $db->beginTransaction();

            $db->query("UPDATE t_kak SET status_id=4 WHERE kak_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_log_status
                (kak_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 2, 4, :usr, :ct, NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->bind(':ct', $catatan);
            $db->execute();

            $db->query("
                INSERT INTO t_kak_approval
                (kak_id, approver_user_id, status, catatan, created_at)
                VALUES (:id, :usr, 'REJECTED', :ct, NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->bind(':ct', $catatan);
            $db->execute();

            if (!empty($input['catatan_kak'])) {
                foreach ($input['catatan_kak'] as $kol => $val) {
                    $col = "catatan_{$kol}";
                    $db->query("UPDATE t_kak SET $col = :v WHERE kak_id=:id");
                    $db->bind(':v', $val);
                    $db->bind(':id', $id);
                    $db->execute();
                }
            }

            if (!empty($input['anak'])) {
                $pkMap = [
                    't_kak_manfaat' => 'manfaat_id',
                    't_kak_tahapan' => 'tahapan_id',
                    't_kak_target'  => 'target_id',
                    't_kak_anggaran' => 'anggaran_id',
                    't_kak_iku'     => 'iku_id'
                ];

                foreach ($input['anak'] as $table => $rows) {
                    if (!isset($pkMap[$table])) continue;

                    $pk = $pkMap[$table];

                    foreach ($rows as $r) {
                        if (empty($r['id'])) continue;

                        $db->query("
                            UPDATE $table 
                            SET catatan_verifikator = :ct
                            WHERE $pk = :cid
                        ");
                        $db->bind(':ct', $r['catatan_verifikator'] ?? null);
                        $db->bind(':cid', $r['id']);
                        $db->execute();
                    }
                }
            }

            $db->commit();

            return $this->responseSuccess("KAK berhasil ditolak.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }
}