<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTKegiatanTargetTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_kegiatan_target', ['id' => false, 'primary_key' => ['target_id']]);
        
        $table->addColumn('target_id', 'integer', ['identity' => true])
              ->addColumn('kegiatan_id', 'integer')
              ->addColumn('deskripsi_target', 'text')
              ->addColumn('catatan_verifikator', 'text', ['null' => true])
              ->addForeignKey('kegiatan_id', 't_kegiatan', 'kegiatan_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}