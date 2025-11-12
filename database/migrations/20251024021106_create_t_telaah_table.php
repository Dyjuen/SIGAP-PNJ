<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_telaah', ['id' => false, 'primary_key' => ['telaah_id']]);
        
        // Kolom Data Utama
        $table->addColumn('telaah_id', 'integer', ['identity' => true])
              ->addColumn('nama_kegiatan', 'string', ['limit' => 200])
              ->addColumn('deskripsi_kegiatan', 'text') // (Input dari 'gambaran_umum' JSON)
              ->addColumn('metode_pelaksanaan', 'text', ['null' => true])

              // ============================================
              // TAMBAHAN YANG HILANG (PENTING UNTUK KAK)
              // ============================================
              ->addColumn('kurun_waktu_pelaksanaan', 'string', ['limit' => 255, 'null' => true]) // (Input teks: "3 Bulan", "Semester Ganjil")
              ->addColumn('tanggal_mulai', 'date', ['null' => true]) // (Input kalender)
              ->addColumn('tanggal_selesai', 'date', ['null' => true]) // (Input kalender)
              // ============================================

              ->addColumn('lokasi', 'string', ['limit' => 200])
              ->addColumn('pengusul_user_id', 'integer')
              ->addColumn('mata_anggaran_id', 'integer', ['null' => true]) // (Sudah benar 'mata_anggaran_id')
              ->addColumn('status_id', 'integer')
              
              // Kolom Catatan (Sudah lengkap, tidak perlu diubah)
              ->addColumn('catatan_nama_kegiatan', 'text', ['null' => true])
              ->addColumn('catatan_deskripsi_kegiatan', 'text', ['null' => true])
              ->addColumn('catatan_sasaran_utama', 'text', ['null' => true])
              ->addColumn('catatan_metode_pelaksanaan', 'text', ['null' => true])
              ->addColumn('catatan_lokasi', 'text', ['null' => true])
              
              // Timestamps (Sudah benar)
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              
              // Foreign Keys (Sudah benar)
              ->addForeignKey('pengusul_user_id', 'm_users', 'user_id', ['delete' => 'RESTRICT', 'update' => 'CASCADE'])
              ->addForeignKey('mata_anggaran_id', 'm_mata_anggaran', 'mata_anggaran_id', ['delete' => 'RESTRICT', 'update' => 'CASCADE'])
              ->addForeignKey('status_id', 'm_kegiatan_status', 'status_id', ['delete' => 'RESTRICT', 'update' => 'CASCADE'])
              ->create();
    }
}