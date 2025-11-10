<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahAnggaranTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_telaah_anggaran', ['id' => false, 'primary_key' => ['anggaran_id']]);
        
        $table->addColumn('anggaran_id', 'integer', ['identity' => true])
              ->addColumn('telaah_id', 'integer')
              ->addColumn('uraian', 'string', ['limit' => 255])

              // ✅ volume1 wajib, volume2 opsional
              ->addColumn('volume1', 'decimal', ['precision' => 10, 'scale' => 2])
              ->addColumn('volume2', 'decimal', ['precision' => 10, 'scale' => 2, 'null' => true])

              ->addColumn('satuan_id', 'integer', ['null' => true])
              ->addColumn('harga_satuan', 'decimal', ['precision' => 15, 'scale' => 2])

              // ✅ Jumlah otomatis dihitung dari volume1 * (volume2 jika ada) * harga_satuan
              ->addColumn('jumlah_diusulkan', 'decimal', [
                  'precision' => 15,
                  'scale' => 2,
                  'null' => true
              ])

              ->addColumn('catatan_verifikator', 'text', ['null' => true])

              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('satuan_id', 'm_satuan', 'satuan_id', [
                  'delete' => 'SET NULL',
                  'update' => 'CASCADE'
              ])

              ->create();
    }
}
