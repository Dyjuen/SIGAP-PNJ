<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateMUnitKerjaTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('m_unit_kerja', ['id' => false, 'primary_key' => ['unit_kerja_id']]);
        
        $table->addColumn('unit_kerja_id', 'integer', ['identity' => true])
              ->addColumn('nama_unit_kerja', 'string', ['limit' => 100])
              ->addColumn('kode_unit', 'string', ['limit' => 20])
              ->addColumn('parent_unit_id', 'integer', ['null' => true])
              ->addIndex(['kode_unit'], ['unique' => true])
              ->addForeignKey('parent_unit_id', 'm_unit_kerja', 'unit_kerja_id', [
                  'delete' => 'SET_NULL',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}
