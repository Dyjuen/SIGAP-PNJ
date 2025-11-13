<?php

use Phinx\Migration\AbstractMigration;

class CreateMTipeKegiatanTable extends AbstractMigration
{
    public function change()
    {
        $this->table('m_tipe_kegiatan', ['id' => false, 'primary_key' => ['tipe_kegiatan_id']])
            ->addColumn('tipe_kegiatan_id', 'integer', ['identity' => true])
            ->addColumn('nama_tipe', 'string', ['limit' => 100])
            ->addColumn('deskripsi', 'text', ['null' => true])
            ->addIndex(['nama_tipe'], ['unique' => true])
            ->create();
    }
}

