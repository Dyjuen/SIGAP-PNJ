<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTKakAnggaranTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_kak_anggaran', ['id' => false, 'primary_key' => ['anggaran_id']]);
        
        $table->addColumn('anggaran_id', 'integer', ['identity' => true])
              ->addColumn('kak_id', 'integer')
              ->addColumn('uraian', 'string', ['limit' => 255])
              ->addColumn('volume1', 'decimal', ['precision' => 10, 'scale' => 2, 'null' => true])
              ->addColumn('satuan1_id', 'integer', ['null' => true])
              ->addColumn('volume2', 'decimal', ['precision' => 10, 'scale' => 2, 'null' => true])
              ->addColumn('satuan2_id', 'integer', ['null' => true])
              ->addColumn('volume3', 'decimal', ['precision' => 10, 'scale' => 2, 'null' => true])
              ->addColumn('satuan3_id', 'integer', ['null' => true])
              ->addColumn('satuan_total_id', 'integer', ['null' => true])
              ->addColumn('harga_satuan', 'decimal', ['precision' => 15, 'scale' => 2, 'null' => true])
              ->addColumn('jumlah_diusulkan', 'decimal', ['precision' => 15, 'scale' => 2, 'null' => true])
              ->addColumn('catatan_verifikator', 'text', ['null' => true])

              ->addForeignKey('kak_id', 't_kak', 'kak_id', ['delete' => 'CASCADE', 'update' => 'CASCADE'])
              ->addForeignKey('satuan1_id', 'm_satuan', 'satuan_id', ['delete' => 'SET_NULL', 'update' => 'CASCADE'])
              ->addForeignKey('satuan2_id', 'm_satuan', 'satuan_id', ['delete' => 'SET_NULL', 'update' => 'CASCADE'])
              ->addForeignKey('satuan3_id', 'm_satuan', 'satuan_id', ['delete' => 'SET_NULL', 'update' => 'CASCADE'])
              ->addForeignKey('satuan_total_id', 'm_satuan', 'satuan_id', ['delete' => 'SET_NULL', 'update' => 'CASCADE'])
              ->create();
    }
}
