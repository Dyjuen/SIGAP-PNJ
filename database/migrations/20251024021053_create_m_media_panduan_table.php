<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateMMediaPanduanTable extends AbstractMigration
{
    public function change(): void
    {
        // Check if table exists to make migration more robust
        if ($this->hasTable('m_media_panduan')) {
            return;
        }

        $table = $this->table('m_media_panduan', ['id' => false, 'primary_key' => ['media_id']]);
        $table->addColumn('media_id', 'integer', ['identity' => true])
              ->addColumn('tipe', 'enum', ['values' => ['template', 'video'], 'default' => 'template'])
              ->addColumn('judul', 'string', ['limit' => 255])
              ->addColumn('path_or_url', 'string', ['limit' => 255])
              ->addTimestamps()
              ->create();
    }
}
