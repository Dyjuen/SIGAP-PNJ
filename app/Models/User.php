<?php

namespace App\Models;

use App\Core\Database;

class User
{
    private $db;

    public function __construct()
    {
        // Menggunakan instance Database Singleton dari Core
        $this->db = Database::getInstance();
    }

    /**
     * Find user by ID
     */
    public function findById($userId)
    {
        $this->db->query("
            SELECT 
                user_id, 
                username, 
                nama_lengkap, 
                email, 
                created_at
            FROM m_users 
            WHERE user_id = :user_id
        ");
        $this->db->bind(':user_id', $userId);
        return $this->db->single();
    }

    /**
     * Find user by username (dengan roles)
     */
    public function findByUsername($username)
    {
        $this->db->query("
            SELECT 
                u.user_id, 
                u.username, 
                u.password_hash, 
                u.nama_lengkap, 
                u.email,
                u.created_at,
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
     * Find user by email
     */
    public function findByEmail($email)
    {
        $this->db->query("
            SELECT 
                u.user_id, 
                u.username, 
                u.password_hash, 
                u.nama_lengkap, 
                u.email,
                u.created_at,
                GROUP_CONCAT(r.nama_role) as roles
            FROM 
                m_users u
            LEFT JOIN 
                m_user_roles ur ON u.user_id = ur.user_id
            LEFT JOIN 
                m_roles r ON ur.role_id = r.role_id
            WHERE 
                u.email = :email
            GROUP BY
                u.user_id
        ");
        $this->db->bind(':email', $email);
        return $this->db->single();
    }

    /**
     * Get user with roles (untuk response API)
     */
    public function getUserWithRoles($userId)
    {
        $this->db->query("
            SELECT 
                u.user_id, 
                u.username, 
                u.nama_lengkap, 
                u.email,
                u.created_at,
                GROUP_CONCAT(r.nama_role) as roles
            FROM 
                m_users u
            LEFT JOIN 
                m_user_roles ur ON u.user_id = ur.user_id
            LEFT JOIN 
                m_roles r ON ur.role_id = r.role_id

            WHERE 
                u.user_id = :user_id
            GROUP BY
                u.user_id
        ");
        $this->db->bind(':user_id', $userId);
        $user = $this->db->single();
        
        // Convert roles dari string ke array
        if ($user && $user['roles']) {
            $user['roles'] = explode(',', $user['roles']);
        } else if ($user) {
            $user['roles'] = [];
        }
        
        return $user;
    }

    /**
     * Verify password
     */
    public function verifyPassword($password, $hash)
    {
        return password_verify($password, $hash);
    }

    /**
     * Create new user dengan hashed password
     */
    public function createUser($data)
    {
        // Hash password
        $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);
        
        $this->db->query("
            INSERT INTO m_users 
            (username, password_hash, nama_lengkap, email, created_at) 
            VALUES 
            (:username, :password_hash, :nama_lengkap, :email, NOW())
        ");
        
        $this->db->bind(':username', $data['username']);
        $this->db->bind(':password_hash', $hashedPassword);
        $this->db->bind(':nama_lengkap', $data['nama_lengkap']);
        $this->db->bind(':email', $data['email']);
        
        $this->db->execute();
        
        return $this->db->lastInsertId();
    }

    /**
     * Update user profile (tanpa password)
     */
    public function updateProfile($userId, $data)
    {
        $this->db->query("
            UPDATE m_users 
            SET 
                nama_lengkap = :nama_lengkap,
                email = :email
            WHERE user_id = :user_id
        ");
        
        $this->db->bind(':nama_lengkap', $data['nama_lengkap']);
        $this->db->bind(':email', $data['email']);
        $this->db->bind(':user_id', $userId);
        
        return $this->db->execute();
    }

    /**
     * Update password user
     */
    public function updatePassword($userId, $newPassword)
    {
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        
        $this->db->query("
            UPDATE m_users 
            SET password_hash = :password_hash 
            WHERE user_id = :user_id
        ");
        
        $this->db->bind(':password_hash', $hashedPassword);
        $this->db->bind(':user_id', $userId);
        
        return $this->db->execute();
    }

    /**
     * Check if username exists (untuk validasi)
     */
    public function usernameExists($username, $excludeUserId = null)
    {
        if ($excludeUserId) {
            $this->db->query("
                SELECT COUNT(*) as total 
                FROM m_users 
                WHERE username = :username AND user_id != :user_id
            ");
            $this->db->bind(':username', $username);
            $this->db->bind(':user_id', $excludeUserId);
        } else {
            $this->db->query("
                SELECT COUNT(*) as total 
                FROM m_users 
                WHERE username = :username
            ");
            $this->db->bind(':username', $username);
        }
        
        $result = $this->db->single();
        return $result['total'] > 0;
    }

    /**
     * Check if email exists (untuk validasi)
     */
    public function emailExists($email, $excludeUserId = null)
    {
        if ($excludeUserId) {
            $this->db->query("
                SELECT COUNT(*) as total 
                FROM m_users 
                WHERE email = :email AND user_id != :user_id
            ");
            $this->db->bind(':email', $email);
            $this->db->bind(':user_id', $excludeUserId);
        } else {
            $this->db->query("
                SELECT COUNT(*) as total 
                FROM m_users 
                WHERE email = :email
            ");
            $this->db->bind(':email', $email);
        }
        
        $result = $this->db->single();
        return $result['total'] > 0;
    }

    /**
     * Get all users with their roles
     */
    public function getAllUsersWithRoles($excludeUserId = null)
    {
        $sql = "
            SELECT 
                u.user_id,
                u.username,
                u.nama_lengkap,
                u.email,
                u.created_at,
                GROUP_CONCAT(r.nama_role) as roles
            FROM 
                m_users u
            LEFT JOIN 
                m_user_roles ur ON u.user_id = ur.user_id
            LEFT JOIN 
                m_roles r ON ur.role_id = r.role_id
        ";

        if ($excludeUserId) {
            $sql .= " WHERE u.user_id != :exclude_user_id";
        }

        $sql .= "
            GROUP BY
                u.user_id
            ORDER BY
                u.created_at DESC
        ";
        
        $this->db->query($sql);

        if ($excludeUserId) {
            $this->db->bind(':exclude_user_id', $excludeUserId);
        }
        
        $users = $this->db->resultSet();
        
        // Convert roles dari string ke array untuk setiap user
        foreach ($users as &$user) {
            $user['roles'] = $user['roles'] ? explode(',', $user['roles']) : [];
        }
        
        return $users;
    }

    /**
     * Delete user
     */
    public function deleteUser($userId)
    {
        $this->db->query("DELETE FROM m_users WHERE user_id = :user_id");
        $this->db->bind(':user_id', $userId);
        return $this->db->execute();
    }

    /**
     * Update user roles
     */
    public function updateUserRoles($userId, $roleIds)
    {
        // Start transaction
        $this->db->beginTransaction();

        try {
            // Delete existing roles
            $this->db->query("DELETE FROM m_user_roles WHERE user_id = :user_id");
            $this->db->bind(':user_id', $userId);
            $this->db->execute();

            // Add new roles
            foreach ($roleIds as $roleId) {
                // Ensure the role_id is an integer
                $roleId = (int) $roleId;
                $this->db->query("INSERT INTO m_user_roles (user_id, role_id) VALUES (:user_id, :role_id)");
                $this->db->bind(':user_id', $userId);
                $this->db->bind(':role_id', $roleId);
                $this->db->execute();
            }

            // Commit transaction
            $this->db->commit();
            return true;
        } catch (\Exception $e) {
            // Rollback transaction
            $this->db->rollBack();
            return false;
        }
    }
}