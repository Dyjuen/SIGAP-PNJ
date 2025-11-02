<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateNewTKegiatanTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('t_kegiatan', ['id' => false, 'primary_key' => ['kegiatan_id']]);
        $table->addColumn('kegiatan_id', 'integer', ['identity' => true])
              ->addColumn('telaah_id', 'integer')
              
              // Penanggung Jawab (Fleksibel)
              ->addColumn('penanggung_jawab_unit_id', 'integer', ['null' => true])
              ->addColumn('penanggung_jawab_manual', 'string', ['limit' => 255, 'null' => true])

              // Pelaksana (Fleksibel)
              ->addColumn('pelaksana_unit_id', 'integer', ['null' => true])
              ->addColumn('pelaksana_manual', 'string', ['limit' => 255, 'null' => true])

              ->addColumn('tanggal_mulai_final', 'date')
              ->addColumn('surat_pengantar_path', 'string', ['limit' => 255, 'null' => true])
              ->addColumn('rekomendasi_ppk', 'text', ['null' => true])
              ->addColumn('rekomendasi_wadir', 'text', ['null' => true])
              ->addColumn('dana_dicairkan', 'decimal', ['precision' => 15, 'scale' => 2, 'null' => true])
              ->addColumn('tgl_batas_lpj', 'date', ['null' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              
              // Foreign Keys
              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('penanggung_jawab_unit_id', 'm_unit_kerja', 'unit_kerja_id', [
                  'delete' => 'SET NULL',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('pelaksana_unit_id', 'm_unit_kerja', 'unit_kerja_id', [
                  'delete' => 'SET NULL',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}
