<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTKegiatanTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_kegiatan', ['id' => false, 'primary_key' => ['kegiatan_id']]);
        
        // Kolom Data Utama
        $table->addColumn('kegiatan_id', 'integer', ['identity' => true])
              ->addColumn('nama_kegiatan', 'string', ['limit' => 200])
              ->addColumn('deskripsi_kegiatan', 'text')
              ->addColumn('sasaran_utama', 'string', ['limit' => 200, 'null' => true])
              ->addColumn('metode_pelaksanaan', 'text', ['null' => true])
              ->addColumn('iku_id', 'integer', ['null' => true])
              ->addColumn('bulan_indikator_kinerja', 'enum', [
                  'values' => ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                               'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                  'null' => true
              ])
              ->addColumn('tanggal_mulai', 'date')
              ->addColumn('tanggal_selesai', 'date')
              ->addColumn('lokasi', 'string', ['limit' => 200])
              ->addColumn('total_anggaran_diusulkan', 'decimal', ['precision' => 15, 'scale' => 2])
              ->addColumn('total_anggaran_disetujui', 'decimal', ['precision' => 15, 'scale' => 2, 'null' => true])
              ->addColumn('pengusul_user_id', 'integer')
              ->addColumn('unit_kerja_id', 'integer')
              ->addColumn('mata_anggaran_id', 'integer')
              ->addColumn('status_id', 'integer')
              
              // Kolom Catatan
              ->addColumn('catatan_umum', 'text', ['null' => true])
              ->addColumn('catatan_revisi_terakhir', 'text', ['null' => true])
              
              // Kolom Catatan Verifikator Per-Field
              ->addColumn('catatan_nama_kegiatan', 'text', ['null' => true])
              ->addColumn('catatan_deskripsi_kegiatan', 'text', ['null' => true])
              ->addColumn('catatan_sasaran_utama', 'text', ['null' => true])
              ->addColumn('catatan_metode_pelaksanaan', 'text', ['null' => true])
              ->addColumn('catatan_iku', 'text', ['null' => true])
              ->addColumn('catatan_bulan_indikator', 'text', ['null' => true])
              ->addColumn('catatan_tanggal_mulai', 'text', ['null' => true])
              ->addColumn('catatan_tanggal_selesai', 'text', ['null' => true])
              ->addColumn('catatan_lokasi', 'text', ['null' => true])
              ->addColumn('catatan_total_anggaran', 'text', ['null' => true])
              ->addColumn('catatan_unit_kerja', 'text', ['null' => true])
              ->addColumn('catatan_mata_anggaran', 'text', ['null' => true])
              
              // Timestamps
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              
              // Foreign Keys
              ->addForeignKey('iku_id', 'm_iku', 'iku_id', [
                  'delete' => 'SET_NULL',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('pengusul_user_id', 'm_users', 'user_id', [
                  'delete' => 'RESTRICT',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('unit_kerja_id', 'm_unit_kerja', 'unit_kerja_id', [
                  'delete' => 'RESTRICT',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('mata_anggaran_id', 'm_mata_anggaran', 'mata_anggaran_id', [
                  'delete' => 'RESTRICT',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('status_id', 'm_kegiatan_status', 'status_id', [
                  'delete' => 'RESTRICT',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}