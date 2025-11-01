<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTKegiatanIndikatorTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_kegiatan_indikator', ['id' => false, 'primary_key' => ['indikator_id']]);
        
        $table->addColumn('indikator_id', 'integer', ['identity' => true])
              ->addColumn('kegiatan_id', 'integer')
              ->addColumn('deskripsi_indikator', 'text')
              ->addColumn('catatan_verifikator', 'text', ['null' => true])
              ->addForeignKey('kegiatan_id', 't_kegiatan', 'kegiatan_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}