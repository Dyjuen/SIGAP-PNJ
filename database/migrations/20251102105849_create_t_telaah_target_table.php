<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahTargetTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('t_telaah_target', ['id' => false, 'primary_key' => ['target_id']]);
        
        $table->addColumn('target_id', 'integer', ['identity' => true])
              ->addColumn('telaah_id', 'integer')
              ->addColumn('deskripsi_target', 'text')
              ->addColumn('bulan_indikator', 'string', ['limit' => 20, 'null' => true])
              ->addColumn('persentase_target', 'decimal', ['precision' => 5, 'scale' => 2, 'null' => true])
              ->addColumn('catatan_verifikator', 'text', ['null' => true])
              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}
