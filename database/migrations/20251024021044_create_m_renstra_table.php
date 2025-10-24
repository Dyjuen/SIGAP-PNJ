<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateMRenstraTable extends AbstractMigration
{
    public function change()
    {
        $table = $this->table('m_renstra', ['id' => false, 'primary_key' => ['renstra_id']]);
        
        $table->addColumn('renstra_id', 'integer', ['identity' => true])
              ->addColumn('nama_renstra', 'string', ['limit' => 100])
              ->addColumn('tahun_mulai', 'integer', ['limit' => 4])
              ->addColumn('tahun_selesai', 'integer', ['limit' => 4])
              ->addColumn('deskripsi', 'text', ['null' => true])
              ->addColumn('file_dokumen_path', 'string', ['limit' => 255, 'null' => true])
              ->create();
    }
}
