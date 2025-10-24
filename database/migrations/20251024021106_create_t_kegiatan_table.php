<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTKegiatanTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_kegiatan', ['id' => false, 'primary_key' => ['kegiatan_id']]);
        
        $table->addColumn('kegiatan_id', 'integer', ['identity' => true])
              ->addColumn('nama_kegiatan', 'string', ['limit' => 200])
              ->addColumn('deskripsi_kegiatan', 'text')
              ->addColumn('iku_id', 'integer', ['null' => true])
              ->addColumn('tanggal_mulai', 'date')
              ->addColumn('tanggal_selesai', 'date')
              ->addColumn('lokasi', 'string', ['limit' => 200])
              ->addColumn('total_anggaran_diusulkan', 'decimal', ['precision' => 15, 'scale' => 2])
              ->addColumn('total_anggaran_disetujui', 'decimal', ['precision' => 15, 'scale' => 2, 'null' => true])
              ->addColumn('pengusul_user_id', 'integer')
              ->addColumn('unit_kerja_id', 'integer')
              ->addColumn('mata_anggaran_id', 'integer')
              ->addColumn('status_id', 'integer')
              ->addColumn('catatan_revisi_terakhir', 'text', ['null' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
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
