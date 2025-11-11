<?php

namespace App\Controllers;

use App\Core\Database;
use PDOException;

class TelaahController
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
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

    /* ============================================================
    | 1. INDEX - Menampilkan semua data telaah
    ============================================================ */
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
                        ) FROM t_telaah_anggaran a WHERE a.telaah_id = t.telaah_id
                    ),0) AS total_diusulkan
                FROM t_telaah t
                LEFT JOIN m_users u ON u.user_id = t.pengusul_user_id
                LEFT JOIN m_kegiatan_status s ON s.status_id = t.status_id
                ORDER BY t.telaah_id DESC
            ";

            $this->db->query($sql);
            $rows = $this->db->resultSet();

            return $this->responseSuccess($rows);
        } catch (PDOException $e) {
            return $this->responseError($e->getMessage());
        }
    }

    /* ============================================================
    | 2. SHOW DETAIL - Menampilkan detail telaah beserta anak-anaknya
    ============================================================ */
    public function show($id)
    {
        try {
            // Ambil data header telaah
            $this->db->query("SELECT * FROM t_telaah WHERE telaah_id = :id");
            $this->db->bind(':id', $id);
            $telaah = $this->db->single();

            if (!$telaah) {
                return $this->responseError("Data tidak ditemukan", 404);
            }

            // Definisi query untuk tabel anak
            $childTables = [
                'manfaat'   => "SELECT * FROM t_telaah_manfaat WHERE telaah_id=:id",
                'tahapan'   => "SELECT * FROM t_telaah_tahapan WHERE telaah_id=:id ORDER BY urutan ASC",
                'target'    => "SELECT * FROM t_telaah_target WHERE telaah_id=:id",
                'iku'       => "SELECT * FROM t_telaah_iku WHERE telaah_id=:id",
                'anggaran'  => "SELECT * FROM t_telaah_anggaran WHERE telaah_id=:id",
            ];

            $data = [
                "telaah" => $telaah
            ];

            // Loop untuk mengambil semua data anak
            foreach ($childTables as $key => $sql) {
                $this->db->query($sql);
                $this->db->bind(':id', $id);
                $data[$key] = $this->db->resultSet();
            }

            // Ambil log status
            $this->db->query("
                SELECT l.*, 
                s1.nama_status AS status_lama,
                s2.nama_status AS status_baru
                FROM t_telaah_log_status l
                LEFT JOIN m_kegiatan_status s1 ON s1.status_id = l.status_id_lama
                LEFT JOIN m_kegiatan_status s2 ON s2.status_id = l.status_id_baru
                WHERE l.telaah_id = :id
                ORDER BY l.timestamp ASC
            ");
            $this->db->bind(':id', $id);
            $data['log_status'] = $this->db->resultSet();

            // Ambil data approval
            $this->db->query("
                SELECT a.*, u.nama_lengkap AS approver_nama
                FROM t_telaah_approval a
                LEFT JOIN m_users u ON u.user_id = a.approver_user_id
                WHERE a.telaah_id = :id
            ");
            $this->db->bind(':id', $id);
            $data['approval'] = $this->db->resultSet();

            return $this->responseSuccess($data);
        } catch (PDOException $e) {
            return $this->responseError($e->getMessage());
        }
    }

    /* ============================================================
    | 3. STORE (DRAFT) - Menyimpan data telaah baru
    ============================================================ */
    public function store()
    {
        try {
            // Cek autentikasi user
            $auth = auth_user();
            if (!$auth) return $this->responseError("Unauthorized", 401);

            $pengusul = $auth['user_id'];

            // Ambil input JSON
            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input || !isset($input['kak'])) {
                return $this->responseError("Format JSON tidak valid", 400);
            }

            $k = $input['kak'];

            $this->db->beginTransaction();

            /* INSERT HEADER TELAAH */
            $sql = "
                INSERT INTO t_telaah 
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

            /* INSERT MANFAAT */
            if (!empty($k['penerima_manfaat'])) {
                foreach ($k['penerima_manfaat'] as $m) {
                    $this->db->query("
                        INSERT INTO t_telaah_manfaat
                        (telaah_id, manfaat, sasaran_utama)
                        VALUES (:id, :m, :sas)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':m', $m['manfaat']);
                    $this->db->bind(':sas', $m['sasaran_utama']);
                    $this->db->execute();
                }
            }

            /* INSERT TAHAPAN */
            if (!empty($k['tahapan_pelaksanaan'])) {
                foreach ($k['tahapan_pelaksanaan'] as $t) {
                    $this->db->query("
                        INSERT INTO t_telaah_tahapan
                        (telaah_id, nama_tahapan, urutan)
                        VALUES (:id, :nama, :urut)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':nama', $t['nama_tahapan']);
                    $this->db->bind(':urut', $t['urutan']);
                    $this->db->execute();
                }
            }

            /* INSERT INDIKATOR */
            if (!empty($k['indikator_kinerja'])) {
                foreach ($k['indikator_kinerja'] as $i) {
                    $this->db->query("
                        INSERT INTO t_telaah_indikator
                        (telaah_id, deskripsi_indikator)
                        VALUES (:id, :d)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':d', $i['deskripsi_indikator']);
                    $this->db->execute();
                }
            }

            /* INSERT IKU */
            if (!empty($input['target_iku'])) {
                foreach ($input['target_iku'] as $iku) {
                    $this->db->query("
                        INSERT INTO t_telaah_iku
                        (telaah_id, iku_id, persentase_target)
                        VALUES (:id, :iku, :p)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':iku', $iku['iku_id']);
                    $this->db->bind(':p', $iku['persentase_target']);
                    $this->db->execute();
                }
            }

            /* INSERT TARGET */
            if (!empty($input['target'])) {
                foreach ($input['target'] as $t) {
                    $this->db->query("
                        INSERT INTO t_telaah_target
                        (telaah_id, deskripsi_target, bulan_indikator, persentase_target)
                        VALUES (:id, :desk, :bulan, :p)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':desk', $t['deskripsi_target']);
                    $this->db->bind(':bulan', $t['bulan_indikator']);
                    $this->db->bind(':p', $t['persentase_target']);
                    $this->db->execute();
                }
            }

            /* INSERT ANGGARAN - FIXED */
            if (!empty($input['rab'])) {
                foreach ($input['rab'] as $r) {
                    // Hitung volume dengan default 1 jika kosong
                    $v1 = !empty($r['volume1']) ? $r['volume1'] : 1;
                    $v2 = !empty($r['volume2']) ? $r['volume2'] : 1;
                    $jumlah = $v1 * $v2 * $r['harga_satuan'];

                    $this->db->query("
                        INSERT INTO t_telaah_anggaran
                        (telaah_id, uraian, volume1, volume2, satuan_id, harga_satuan, jumlah_diusulkan, catatan_verifikator)
                        VALUES (:id, :u, :v1, :v2, :sat, :h, :j, NULL)
                    ");
                    $this->db->bind(':id', $id);
                    $this->db->bind(':u', $r['uraian']);
                    $this->db->bind(':v1', $v1);
                    $this->db->bind(':v2', $v2);
                    $this->db->bind(':sat', $r['satuan_id']);
                    $this->db->bind(':h', $r['harga_satuan']);
                    $this->db->bind(':j', $jumlah); // ✅ INI YANG DIPERBAIKI!
                    $this->db->execute();
                }
            }

            $this->db->commit();

            return $this->responseSuccess([
                "message" => "Draft berhasil dibuat",
                "telaah_id" => $id
            ]);
        } catch (PDOException $e) {
            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }
            return $this->responseError($e->getMessage());
        }
    }

    /* ============================================================
    | 4. SUBMIT FOR APPROVAL (STATUS 1/5 -> 2)
    ============================================================ */
    public function submitForVerification($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            // Cek data telaah
            $db->query("SELECT * FROM t_telaah WHERE telaah_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);

            // Validasi: hanya pengusul yang boleh submit
            if ($data['pengusul_user_id'] != $user['user_id'])
                return $this->responseError("Tidak boleh submit milik orang lain", 403);

            // Validasi: hanya status Draft (1) atau Revisi (5) yang boleh submit
            if (!in_array($data['status_id'], [1, 5]))
                return $this->responseError("Tidak dapat submit pada status ini", 400);

            $db->beginTransaction();

            // Update status menjadi "Dalam Review" (2)
            $db->query("
                UPDATE t_telaah SET status_id = 2,
                catatan_nama_kegiatan = NULL,
                catatan_deskripsi_kegiatan = NULL,
                catatan_sasaran_utama = NULL,
                catatan_metode_pelaksanaan = NULL,
                catatan_lokasi = NULL,
                updated_at = NOW()
                WHERE telaah_id = :id
            ");
            $db->bind(':id', $id);
            $db->execute();

            // Catat log perubahan status
            $db->query("
                INSERT INTO t_telaah_log_status
                (telaah_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, :lama, 2, :user, :ct, NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':lama', $data['status_id']);
            $db->bind(':user', $user['user_id']);
            $db->bind(':ct', "Pengusul submit");
            $db->execute();

            // Catat approval
            $db->query("
                INSERT INTO t_telaah_approval
                (telaah_id, approver_user_id, status, created_at)
                VALUES (:id, NULL, 'SUBMITTED', NOW())
            ");
            $db->bind(':id', $id);
            $db->execute();

            $db->commit();
            return $this->responseSuccess("Telaah berhasil disubmit.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }

    /* ============================================================
    | 5. REQUEST REVISION (STATUS 2 -> 5)
    ============================================================ */
    public function requestRevision($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            // Cek data telaah
            $db->query("SELECT * FROM t_telaah WHERE telaah_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);

            // Validasi: hanya bisa revisi pada status "Dalam Review" (2)
            if ($data['status_id'] != 2)
                return $this->responseError("Hanya bisa revisi pada status 'Dalam Review'", 400);

            // Ambil input catatan
            $input = json_decode(file_get_contents("php://input"), true);
            if (!$input) return $this->responseError("Input tidak valid", 400);

            $db->beginTransaction();

            /* UPDATE CATATAN HEADER */
            if (!empty($input['catatan_telaah'])) {
                foreach ($input['catatan_telaah'] as $field => $note) {
                    $col = "catatan_" . $field;
                    $db->query("UPDATE t_telaah SET $col = :n WHERE telaah_id=:id");
                    $db->bind(':n', $note);
                    $db->bind(':id', $id);
                    $db->execute();
                }
            }

            /* UPDATE CATATAN ANAK */
            if (!empty($input['anak'])) {
                foreach ($input['anak'] as $table => $rows) {
                    $pk = [
                        't_telaah_manfaat' => 'manfaat_id',
                        't_telaah_tahapan' => 'tahapan_id',
                        't_telaah_target'  => 'target_id',
                        't_telaah_anggaran' => 'anggaran_id',
                        't_telaah_iku'     => 'iku_id'
                    ][$table] ?? null;

                    if (!$pk) continue;

                    foreach ($rows as $r) {
                        $db->query("
                            UPDATE $table SET catatan_verifikator = :c 
                            WHERE $pk = :pk AND telaah_id = :id
                        ");
                        $db->bind(':c', $r['catatan_verifikator']);
                        $db->bind(':pk', $r['id']);
                        $db->bind(':id', $id);
                        $db->execute();
                    }
                }
            }

            /* UPDATE STATUS KE REVISI (5) */
            $db->query("UPDATE t_telaah SET status_id = 5 WHERE telaah_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            /* CATAT LOG STATUS */
            $db->query("
                INSERT INTO t_telaah_log_status 
                (telaah_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 2, 5, :usr, 'Diminta revisi', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            /* CATAT APPROVAL */
            $db->query("
                INSERT INTO t_telaah_approval
                (telaah_id, approver_user_id, status, catatan, created_at)
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

    /* ============================================================
    | 6. RESUBMIT (STATUS 5 -> 2)
    ============================================================ */
    public function resubmitAfterRevision($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            // Cek data telaah
            $db->query("SELECT * FROM t_telaah WHERE telaah_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);
            
            // Validasi: hanya pengusul yang boleh resubmit
            if ($data['pengusul_user_id'] != $user['user_id'])
                return $this->responseError("Tidak boleh mengedit milik orang lain", 403);
            
            // Validasi: hanya status Revisi (5) yang boleh resubmit
            if ($data['status_id'] != 5)
                return $this->responseError("Tidak dalam status revisi", 400);

            $input = json_decode(file_get_contents('php://input'), true);
            if (!$input) return $this->responseError("Input tidak valid", 400);

            $db->beginTransaction();

            /* UPDATE HEADER TELAAH */
            if (!empty($input['telaah'])) {
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

                foreach ($input['telaah'] as $f => $v) {
                    if (!in_array($f, $allowed)) continue;

                    $colNote = "catatan_" . $f;

                    $db->query("
                        UPDATE t_telaah 
                        SET $f = :v, $colNote = NULL 
                        WHERE telaah_id = :id
                    ");
                    $db->bind(':v', $v);
                    $db->bind(':id', $id);
                    $db->execute();
                }
            }

            /* UPDATE TABEL ANAK */
            if (!empty($input['anak'])) {

                $pkMap = [
                    't_telaah_manfaat' => 'manfaat_id',
                    't_telaah_tahapan' => 'tahapan_id',
                    't_telaah_target'  => 'target_id',
                    't_telaah_anggaran' => 'anggaran_id',
                    't_telaah_iku'     => 'iku_id'
                ];

                foreach ($input['anak'] as $table => $rows) {
                    if (!isset($pkMap[$table])) continue;

                    $pk = $pkMap[$table];

                    foreach ($rows as $r) {

                        $idChild = $r['id'];
                        unset($r['id']);

                        // Clear catatan verifikator
                        $r['catatan_verifikator'] = null;

                        // Build dynamic SET clause
                        $setParts = [];
                        foreach ($r as $k => $v) {
                            $setParts[] = "$k = :$k";
                        }
                        $sqlSet = implode(", ", $setParts);

                        $db->query("
                            UPDATE $table
                            SET $sqlSet
                            WHERE $pk = :pk AND telaah_id = :tid
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

            /* UPDATE STATUS -> DALAM REVIEW (2) */
            $db->query("UPDATE t_telaah SET status_id = 2 WHERE telaah_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            /* CATAT LOG STATUS */
            $db->query("
                INSERT INTO t_telaah_log_status
                (telaah_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 5, 2, :usr, 'Resubmit revisi', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            /* CATAT APPROVAL */
            $db->query("
                INSERT INTO t_telaah_approval
                (telaah_id, approver_user_id, status, created_at)
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

    /* ============================================================
    | 7. APPROVE (STATUS 2 -> 3)
    ============================================================ */
    public function approve($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            // Cek data telaah
            $db->query("SELECT * FROM t_telaah WHERE telaah_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);
            
            // Validasi: hanya status "Dalam Review" (2) yang bisa diapprove
            if ($data['status_id'] != 2)
                return $this->responseError("Tidak dalam status review", 400);
            
            // Validasi: pengusul tidak boleh approve telaahnya sendiri
            if ($data['pengusul_user_id'] == $user['user_id'])
                return $this->responseError("Pengusul tidak dapat approve", 403);

            $db->beginTransaction();

            /* UPDATE STATUS -> DISETUJUI (3) */
            $db->query("UPDATE t_telaah SET status_id = 3 WHERE telaah_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            /* CATAT LOG STATUS */
            $db->query("
                INSERT INTO t_telaah_log_status
                (telaah_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 2, 3, :usr, 'Disetujui', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            /* CATAT APPROVAL */
            $db->query("
                INSERT INTO t_telaah_approval
                (telaah_id, approver_user_id, status, created_at)
                VALUES (:id, :usr, 'APPROVED', NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->execute();

            /* CLEAR SEMUA CATATAN HEADER */
            $fields = [
                'catatan_nama_kegiatan',
                'catatan_deskripsi_kegiatan',
                'catatan_sasaran_utama',
                'catatan_metode_pelaksanaan',
                'catatan_lokasi'
            ];

            foreach ($fields as $f) {
                $db->query("UPDATE t_telaah SET $f=NULL WHERE telaah_id=:id");
                $db->bind(':id', $id);
                $db->execute();
            }

            /* CLEAR CATATAN VERIFIKATOR DI TABEL ANAK */
            $childTables = [
                't_telaah_manfaat',
                't_telaah_tahapan',
                't_telaah_target',
                't_telaah_anggaran',
                't_telaah_iku'
            ];

            foreach ($childTables as $tbl) {
                $db->query("UPDATE $tbl SET catatan_verifikator=NULL WHERE telaah_id=:id");
                $db->bind(':id', $id);
                $db->execute();
            }

            $db->commit();

            return $this->responseSuccess("Telaah berhasil disetujui.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }

    /* ============================================================
    | 8. REJECT (STATUS 2 -> 4)
    ============================================================ */
    public function reject($id)
    {
        try {
            $user = auth_user();
            if (!$user) return $this->responseError("Unauthorized", 401);

            $db = $this->db;

            // Cek data telaah
            $db->query("SELECT * FROM t_telaah WHERE telaah_id = :id");
            $db->bind(':id', $id);
            $data = $db->single();

            if (!$data) return $this->responseError("Data tidak ditemukan", 404);
            
            // Validasi: hanya status "Dalam Review" (2) yang bisa direject
            if ($data['status_id'] != 2)
                return $this->responseError("Tidak dalam status review", 400);
            
            // Validasi: pengusul tidak boleh reject telaahnya sendiri
            if ($data['pengusul_user_id'] == $user['user_id'])
                return $this->responseError("Pengusul tidak dapat menolak", 403);

            $input = json_decode(file_get_contents('php://input'), true);
            $catatan = $input['catatan'] ?? null;

            $db->beginTransaction();

            /* UPDATE STATUS -> DITOLAK (4) */
            $db->query("UPDATE t_telaah SET status_id=4 WHERE telaah_id=:id");
            $db->bind(':id', $id);
            $db->execute();

            /* CATAT LOG STATUS */
            $db->query("
                INSERT INTO t_telaah_log_status
                (telaah_id, status_id_lama, status_id_baru, actor_user_id, catatan, timestamp)
                VALUES (:id, 2, 4, :usr, :ct, NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->bind(':ct', $catatan);
            $db->execute();

            /* CATAT APPROVAL */
            $db->query("
                INSERT INTO t_telaah_approval
                (telaah_id, approver_user_id, status, catatan, created_at)
                VALUES (:id, :usr, 'REJECTED', :ct, NOW())
            ");
            $db->bind(':id', $id);
            $db->bind(':usr', $user['user_id']);
            $db->bind(':ct', $catatan);
            $db->execute();

            /* UPDATE CATATAN KOLOM HEADER */
            if (!empty($input['catatan_telaah'])) {
                foreach ($input['catatan_telaah'] as $kol => $val) {
                    $col = "catatan_{$kol}";
                    $db->query("UPDATE t_telaah SET $col = :v WHERE telaah_id=:id");
                    $db->bind(':v', $val);
                    $db->bind(':id', $id);
                    $db->execute();
                }
            }

            /* UPDATE CATATAN VERIFIKATOR TABEL ANAK */
            if (!empty($input['anak'])) {
                $pkMap = [
                    't_telaah_manfaat' => 'manfaat_id',
                    't_telaah_tahapan' => 'tahapan_id',
                    't_telaah_target'  => 'target_id',
                    't_telaah_anggaran' => 'anggaran_id',
                    't_telaah_iku'     => 'iku_id'
                ];

                foreach ($input['anak'] as $table => $rows) {
                    if (!isset($pkMap[$table])) continue;

                    $pk = $pkMap[$table];

                    foreach ($rows as $r) {
                        // Pastikan ID ada
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

            return $this->responseSuccess("Telaah berhasil ditolak.");
        } catch (\Exception $e) {
            $this->db->rollBack();
            return $this->responseError($e->getMessage());
        }
    }
}