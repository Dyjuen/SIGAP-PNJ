<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTKegiatanAnggaranTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_kegiatan_anggaran', ['id' => false, 'primary_key' => ['anggaran_id']]);
        
        $table->addColumn('anggaran_id', 'integer', ['identity' => true])
              ->addColumn('kegiatan_id', 'integer')
              ->addColumn('uraian', 'string', ['limit' => 255])
              ->addColumn('volume', 'integer')
              ->addColumn('satuan_id', 'integer')
              ->addColumn('harga_satuan', 'decimal', ['precision' => 15, 'scale' => 2])
              ->addColumn('jumlah_diusulkan', 'decimal', ['precision' => 15, 'scale' => 2])
              ->addColumn('jumlah_disetujui', 'decimal', ['precision' => 15, 'scale' => 2, 'null' => true])
              ->addColumn('catatan', 'string', ['limit' => 255, 'null' => true])
              ->addForeignKey('kegiatan_id', 't_kegiatan', 'kegiatan_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('satuan_id', 'm_satuan', 'satuan_id', [
                  'delete' => 'RESTRICT',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}
