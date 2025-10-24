<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateMUserRolesTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('m_user_roles', ['id' => false, 'primary_key' => ['user_role_id']]);
        
        $table->addColumn('user_role_id', 'integer', ['identity' => true])
              ->addColumn('user_id', 'integer')
              ->addColumn('role_id', 'integer')
              ->addIndex(['user_id', 'role_id'], ['unique' => true])
              ->addForeignKey('user_id', 'm_users', 'user_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->addForeignKey('role_id', 'm_roles', 'role_id', [
                  'delete' => 'CASCADE',
                  'update' => 'CASCADE'
              ])
              ->create();
    }
}
