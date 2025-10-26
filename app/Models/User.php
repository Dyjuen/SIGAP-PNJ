<?php
// File: app/Models/User.php
// Model ini bertugas mengambil data dari tabel m_users

class User {
    private $db;

    public function __construct() {
        // Menggunakan instance Database Singleton dari Core
        $this->db = Database::getInstance();
    }

    /**
     * Cari user berdasarkan username dan join dengan role mereka.
     * Sesuai dengan skema sigap_pnj.sql (m_users, m_user_roles, m_roles)
     */
    public function findByUsername($username) {
        $this->db->query("
            SELECT 
                u.user_id, 
                u.username, 
                u.password_hash, 
                u.nama_lengkap, 
                u.email,
                u.unit_kerja_id,
                GROUP_CONCAT(r.nama_role) as roles
            FROM 
                m_users u
            LEFT JOIN 
                m_user_roles ur ON u.user_id = ur.user_id
            LEFT JOIN 
                m_roles r ON ur.role_id = r.role_id
            WHERE 
                u.username = :username
            GROUP BY
                u.user_id
        ");
        $this->db->bind(':username', $username);
        return $this->db->single();
    }

    /**
     * Verifikasi password
     */
    public function verifyPassword($password, $hash) {
        // Memverifikasi password yang dikirim user dengan hash di database
        return password_verify($password, $hash);
    }

    /**
     * (Contoh) Ambil data user berdasarkan ID
     */
    public function findById($id) {
        $this->db->query("SELECT user_id, username, nama_lengkap, email FROM m_users WHERE user_id = :id");
        $this->db->bind(':id', $id);
        return $this->db->single();
    }
}
