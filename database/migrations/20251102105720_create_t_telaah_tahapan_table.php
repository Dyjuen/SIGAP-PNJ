<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahTahapanTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('t_telaah_tahapan', ['id' => false, 'primary_key' => ['tahapan_id']]);
        
        $table->addColumn('tahapan_id', 'integer', ['identity' => true])
              ->addColumn('telaah_id', 'integer')
              ->addColumn('nama_tahapan', 'string', ['limit' => 255])
              ->addColumn('urutan', 'integer')
              ->addColumn('catatan_verifikator', 'text', ['null' => true])
              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}