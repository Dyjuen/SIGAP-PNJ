<?php

namespace App\Middlewares;

use App\Core\Middleware;
use App\Core\Response;
use App\Models\UserRole;

class RoleMiddleware implements Middleware
{
    private $allowedRoles;

    /**
     * Constructor
     * 
     * @param array $allowedRoles Array of role names yang diizinkan
     */
    public function __construct(array $allowedRoles = [])
    {
        $this->allowedRoles = $allowedRoles;
    }

    /**
     * Handle role authorization check
     */
    public function handle(): void
    {
        // Get authenticated user
        $authUser = AuthMiddleware::getAuthUser();

        if (!$authUser) {
            Response::unauthorized('User tidak terautentikasi.');
        }

        // If no specific roles required, just check if authenticated
        if (empty($this->allowedRoles)) {
            return;
        }

        // Get user roles from database (fresh data)
        $userRoleModel = new UserRole();
        $userRoles = $userRoleModel->getRoleNamesByUserId($authUser['user_id']);

        // Check if user has any of the allowed roles
        $hasRole = false;
        foreach ($this->allowedRoles as $allowedRole) {
            if (in_array($allowedRole, $userRoles)) {
                $hasRole = true;
                break;
            }
        }

        if (!$hasRole) {
            $allowedRolesStr = implode(', ', $this->allowedRoles);
            Response::forbidden(
                "Akses ditolak. Endpoint ini hanya dapat diakses oleh: {$allowedRolesStr}."
            );
        }

        // Update auth user with fresh roles
        $GLOBALS['auth_user']['roles'] = $userRoles;
    }

    /**
     * Check if authenticated user has specific role
     * 
     * @param string $roleName Role name to check
     * @return bool
     */
    public static function hasRole(string $roleName): bool
    {
        $authUser = AuthMiddleware::getAuthUser();
        
        if (!$authUser) {
            return false;
        }

        return in_array($roleName, $authUser['roles'] ?? []);
    }

    /**
     * Check if authenticated user has any of the specified roles
     * 
     * @param array $roleNames Array of role names
     * @return bool
     */
    public static function hasAnyRole(array $roleNames): bool
    {
        $authUser = AuthMiddleware::getAuthUser();
        
        if (!$authUser) {
            return false;
        }

        foreach ($roleNames as $roleName) {
            if (in_array($roleName, $authUser['roles'] ?? [])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if authenticated user has all of the specified roles
     * 
     * @param array $roleNames Array of role names
     * @return bool
     */
    public static function hasAllRoles(array $roleNames): bool
    {
        $authUser = AuthMiddleware::getAuthUser();
        
        if (!$authUser) {
            return false;
        }

        foreach ($roleNames as $roleName) {
            if (!in_array($roleName, $authUser['roles'] ?? [])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Require specific role (throw exception if not authorized)
     * 
     * @param string $roleName Role name required
     */
    public static function requireRole(string $roleName): void
    {
        if (!self::hasRole($roleName)) {
            Response::forbidden("Akses ditolak. Endpoint ini hanya dapat diakses oleh: {$roleName}.");
        }
    }

    /**
     * Require any of the specified roles
     * 
     * @param array $roleNames Array of role names
     */
    public static function requireAnyRole(array $roleNames): void
    {
        if (!self::hasAnyRole($roleNames)) {
            $rolesStr = implode(', ', $roleNames);
            Response::forbidden("Akses ditolak. Endpoint ini hanya dapat diakses oleh: {$rolesStr}.");
        }
    }
}