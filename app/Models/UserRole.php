<?php

namespace App\Models;

use App\Core\Database;

class UserRole
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Get all roles for a user
     */
    public function getRolesByUserId($userId)
    {
        $this->db->query("
            SELECT r.*
            FROM m_roles r
            INNER JOIN m_user_roles ur ON r.role_id = ur.role_id
            WHERE ur.user_id = :user_id
        ");
        $this->db->bind(':user_id', $userId);
        return $this->db->resultSet();
    }

    /**
     * Get role names for a user (as array)
     */
    public function getRoleNamesByUserId($userId)
    {
        $roles = $this->getRolesByUserId($userId);
        return array_column($roles, 'nama_role');
    }

    /**
     * Assign a role to user
     */
    public function assignRole($userId, $roleId)
    {
        // Check if already exists
        if ($this->hasRole($userId, $roleId)) {
            return false;
        }
        
        $this->db->query("
            INSERT INTO m_user_roles (user_id, role_id) 
            VALUES (:user_id, :role_id)
        ");
        
        $this->db->bind(':user_id', $userId);
        $this->db->bind(':role_id', $roleId);
        
        return $this->db->execute();
    }

    /**
     * Assign multiple roles to user
     */
    public function assignRoles($userId, $roleIds)
    {
        // Remove existing roles first
        $this->removeAllRoles($userId);
        
        // Assign new roles
        foreach ($roleIds as $roleId) {
            $this->assignRole($userId, $roleId);
        }
        
        return true;
    }

    /**
     * Remove a role from user
     */
    public function removeRole($userId, $roleId)
    {
        $this->db->query("
            DELETE FROM m_user_roles 
            WHERE user_id = :user_id AND role_id = :role_id
        ");
        
        $this->db->bind(':user_id', $userId);
        $this->db->bind(':role_id', $roleId);
        
        return $this->db->execute();
    }

    /**
     * Remove all roles from user
     */
    public function removeAllRoles($userId)
    {
        $this->db->query("DELETE FROM m_user_roles WHERE user_id = :user_id");
        $this->db->bind(':user_id', $userId);
        return $this->db->execute();
    }

    /**
     * Check if user has a specific role
     */
    public function hasRole($userId, $roleId)
    {
        $this->db->query("
            SELECT COUNT(*) as total 
            FROM m_user_roles 
            WHERE user_id = :user_id AND role_id = :role_id
        ");
        
        $this->db->bind(':user_id', $userId);
        $this->db->bind(':role_id', $roleId);
        
        $result = $this->db->single();
        return $result['total'] > 0;
    }

    /**
     * Check if user has a specific role by name
     */
    public function hasRoleName($userId, $roleName)
    {
        $this->db->query("
            SELECT COUNT(*) as total
            FROM m_user_roles ur
            INNER JOIN m_roles r ON ur.role_id = r.role_id
            WHERE ur.user_id = :user_id AND r.nama_role = :nama_role
        ");
        
        $this->db->bind(':user_id', $userId);
        $this->db->bind(':nama_role', $roleName);
        
        $result = $this->db->single();
        return $result['total'] > 0;
    }

    /**
     * Check if user has any of the specified roles
     */
    public function hasAnyRole($userId, $roleNames)
    {
        if (empty($roleNames)) {
            return false;
        }
        
        $placeholders = implode(',', array_fill(0, count($roleNames), '?'));
        
        $this->db->query("
            SELECT COUNT(*) as total
            FROM m_user_roles ur
            INNER JOIN m_roles r ON ur.role_id = r.role_id
            WHERE ur.user_id = ? AND r.nama_role IN ($placeholders)
        ");
        
        // Bind user_id first
        $this->db->bind(1, $userId);
        
        // Then bind role names
        foreach ($roleNames as $index => $roleName) {
            $this->db->bind($index + 2, $roleName);
        }
        
        $result = $this->db->single();
        return $result['total'] > 0;
    }

    /**
     * Get all users with a specific role
     */
    public function getUsersByRole($roleId)
    {
        $this->db->query("
            SELECT u.*
            FROM m_users u
            INNER JOIN m_user_roles ur ON u.user_id = ur.user_id
            WHERE ur.role_id = :role_id
        ");
        
        $this->db->bind(':role_id', $roleId);
        return $this->db->resultSet();
    }
}