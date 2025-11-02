<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahIkuTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('t_telaah_iku', ['id' => false, 'primary_key' => ['telaah_id', 'iku_id']]);
        $table->addColumn('telaah_id', 'integer')
              ->addColumn('iku_id', 'integer')
              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('iku_id', 'm_iku', 'iku_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}
