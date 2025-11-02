<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahManfaatTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_telaah_manfaat', ['id' => false, 'primary_key' => ['manfaat_id']]);
        
        $table->addColumn('manfaat_id', 'integer', ['identity' => true])
              ->addColumn('telaah_id', 'integer')
              ->addColumn('deskripsi_manfaat', 'text')
              ->addColumn('catatan_verifikator', 'text', ['null' => true])
              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}