<?php

namespace App\Models;

use App\Core\Database;

class UnitKerja
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Find unit kerja by ID
     */
    public function findById($unitKerjaId)
    {
        $this->db->query("SELECT * FROM m_unit_kerja WHERE unit_kerja_id = :unit_kerja_id");
        $this->db->bind(':unit_kerja_id', $unitKerjaId);
        return $this->db->single();
    }

    /**
     * Find unit kerja by kode
     */
    public function findByKode($kodeUnit)
    {
        $this->db->query("SELECT * FROM m_unit_kerja WHERE kode_unit = :kode_unit");
        $this->db->bind(':kode_unit', $kodeUnit);
        return $this->db->single();
    }

    /**
     * Get all unit kerja
     */
    public function getAll()
    {
        $this->db->query("SELECT * FROM m_unit_kerja ORDER BY nama_unit_kerja");
        return $this->db->resultSet();
    }

    /**
     * Get unit kerja with parent info
     */
    public function getWithParent($unitKerjaId)
    {
        $this->db->query("
            SELECT 
                u.*,
                p.nama_unit_kerja as parent_nama,
                p.kode_unit as parent_kode
            FROM m_unit_kerja u
            LEFT JOIN m_unit_kerja p ON u.parent_unit_id = p.unit_kerja_id
            WHERE u.unit_kerja_id = :unit_kerja_id
        ");
        
        $this->db->bind(':unit_kerja_id', $unitKerjaId);
        return $this->db->single();
    }

    /**
     * Get all unit kerja with hierarchical structure
     */
    public function getAllWithHierarchy()
    {
        $this->db->query("
            SELECT 
                u.*,
                p.nama_unit_kerja as parent_nama
            FROM m_unit_kerja u
            LEFT JOIN m_unit_kerja p ON u.parent_unit_id = p.unit_kerja_id
            ORDER BY u.parent_unit_id, u.nama_unit_kerja
        ");
        
        return $this->db->resultSet();
    }

    /**
     * Get children of a unit kerja
     */
    public function getChildren($unitKerjaId)
    {
        $this->db->query("
            SELECT * FROM m_unit_kerja 
            WHERE parent_unit_id = :parent_unit_id
            ORDER BY nama_unit_kerja
        ");
        
        $this->db->bind(':parent_unit_id', $unitKerjaId);
        return $this->db->resultSet();
    }

    /**
     * Check if unit kerja exists
     */
    public function unitKerjaExists($unitKerjaId)
    {
        $this->db->query("
            SELECT COUNT(*) as total 
            FROM m_unit_kerja 
            WHERE unit_kerja_id = :unit_kerja_id
        ");
        
        $this->db->bind(':unit_kerja_id', $unitKerjaId);
        $result = $this->db->single();
        return $result['total'] > 0;
    }
}