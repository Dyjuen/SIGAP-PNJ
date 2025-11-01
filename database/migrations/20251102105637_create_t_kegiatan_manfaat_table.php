<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTKegiatanManfaatTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_kegiatan_manfaat', ['id' => false, 'primary_key' => ['manfaat_id']]);
        
        $table->addColumn('manfaat_id', 'integer', ['identity' => true])
              ->addColumn('kegiatan_id', 'integer')
              ->addColumn('deskripsi_manfaat', 'text')
              ->addColumn('catatan_verifikator', 'text', ['null' => true])
              ->addForeignKey('kegiatan_id', 't_kegiatan', 'kegiatan_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}