<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahIndikatorTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_telaah_indikator', ['id' => false, 'primary_key' => ['indikator_id']]);
        
        $table->addColumn('indikator_id', 'integer', ['identity' => true])
              ->addColumn('telaah_id', 'integer')
              ->addColumn('deskripsi_indikator', 'text')
              ->addColumn('catatan_verifikator', 'text', ['null' => true])
              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}