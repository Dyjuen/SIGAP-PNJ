<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateMIkuTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('m_iku', ['id' => false, 'primary_key' => ['iku_id']]);
        
        $table->addColumn('iku_id', 'integer', ['identity' => true])
              ->addColumn('renstra_id', 'integer')
              ->addColumn('kode_iku', 'string', ['limit' => 50])
              ->addColumn('nama_iku', 'text')
              ->addColumn('deskripsi_target', 'text', ['null' => true])
              ->addIndex(['kode_iku'], ['unique' => true])
              ->addForeignKey('renstra_id', 'm_renstra', 'renstra_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}