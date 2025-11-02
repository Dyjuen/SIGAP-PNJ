<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateTTelaahApprovalTable extends AbstractMigration
{
    public function change(): void
    {
        $table = $this->table('t_telaah_approval', ['id' => false, 'primary_key' => ['approval_telaah_id']]);
        $table->addColumn('approval_telaah_id', 'integer', ['identity' => true])
              ->addColumn('telaah_id', 'integer')
              ->addColumn('approver_user_id', 'integer', ['null' => true])
              ->addColumn('status', 'enum', [
                  'values' => ['Menunggu', 'Revisi', 'Ditolak', 'Disetujui'],
                  'default' => 'Menunggu'
              ])
              ->addColumn('catatan', 'text', ['null' => true])
              ->addColumn('created_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP'])
              ->addColumn('updated_at', 'timestamp', ['default' => 'CURRENT_TIMESTAMP', 'update' => 'CURRENT_TIMESTAMP'])
              ->addForeignKey('telaah_id', 't_telaah', 'telaah_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('approver_user_id', 'm_users', 'user_id', [
                  'delete' => 'SET_NULL',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}
