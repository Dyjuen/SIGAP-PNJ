<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Database;
use App\Core\Response;
use PDO;

class LogController extends Controller
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    public function getSystemLogs()
    {
        try {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
            $offset = ($page - 1) * $limit;
            
            $search = isset($_GET['search']) ? $_GET['search'] : '';
            $role = isset($_GET['role']) ? $_GET['role'] : '';
            $userId = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;
            $startDate = isset($_GET['start_date']) ? $_GET['start_date'] : '';
            $endDate = isset($_GET['end_date']) ? $_GET['end_date'] : '';

            // Build the base query parts
            $whereClauses = [];
            $params = [];

            // 1. Logs from t_kak_log_status
            $query1 = "
                SELECT 
                    'KAK_STATUS' as log_type,
                    kls.timestamp as created_at,
                    kls.actor_user_id as user_id,
                    u.nama_lengkap as user_name,
                    r.nama_role as user_role,
                    kak.nama_kegiatan as context_title,
                    CONCAT('Mengubah status KAK \"', kak.nama_kegiatan, '\" dari \"', IFNULL(sl.nama_status, '-'), ' \" menjadi \"', sb.nama_status, '\"') as description,
                    kls.catatan
                FROM t_kak_log_status kls
                JOIN m_users u ON kls.actor_user_id = u.user_id
                LEFT JOIN m_roles r ON u.role_id = r.role_id
                JOIN t_kak kak ON kls.kak_id = kak.kak_id
                LEFT JOIN m_kegiatan_status sl ON kls.status_id_lama = sl.status_id
                JOIN m_kegiatan_status sb ON kls.status_id_baru = sb.status_id
            ";

            // 2. Logs from t_kegiatan_log_status
            $query2 = "
                SELECT 
                    'KEGIATAN_STATUS' as log_type,
                    kls.timestamp as created_at,
                    kls.actor_user_id as user_id,
                    u.nama_lengkap as user_name,
                    r.nama_role as user_role,
                    kak.nama_kegiatan as context_title,
                    CONCAT('Mengubah status Kegiatan \"', kak.nama_kegiatan, '\" dari \"', IFNULL(sl.nama_status, '-'), ' \" menjadi \"', sb.nama_status, '\"') as description,
                    kls.catatan
                FROM t_kegiatan_log_status kls
                JOIN m_users u ON kls.actor_user_id = u.user_id
                LEFT JOIN m_roles r ON u.role_id = r.role_id
                JOIN t_kegiatan k ON kls.kegiatan_id = k.kegiatan_id
                JOIN t_kak kak ON k.kak_id = kak.kak_id
                LEFT JOIN m_kegiatan_status sl ON kls.status_id_lama = sl.status_id
                JOIN m_kegiatan_status sb ON kls.status_id_baru = sb.status_id
            ";

            // 3. Logs from t_kak_approval
            $query3 = "
                SELECT 
                    'KAK_APPROVAL' as log_type,
                    ka.created_at,
                    ka.approver_user_id as user_id,
                    u.nama_lengkap as user_name,
                    r.nama_role as user_role,
                    kak.nama_kegiatan as context_title,
                    CONCAT('Memberikan status approval \"', ka.status, '\" pada KAK \"', kak.nama_kegiatan, '\"') as description,
                    ka.catatan
                FROM t_kak_approval ka
                JOIN m_users u ON ka.approver_user_id = u.user_id
                LEFT JOIN m_roles r ON u.role_id = r.role_id
                JOIN t_kak kak ON ka.kak_id = kak.kak_id
            ";

            // 4. Logs from t_kegiatan_approval
            // Note: approver_user_id can be null in t_kegiatan_approval, we handle that
            $query4 = "
                SELECT 
                    'KEGIATAN_APPROVAL' as log_type,
                    ka.created_at,
                    ka.approver_user_id as user_id,
                    IFNULL(u.nama_lengkap, 'System') as user_name,
                    IFNULL(r.nama_role, 'System') as user_role,
                    kak.nama_kegiatan as context_title,
                    CONCAT('Memberikan status approval \"', ka.status, '\" pada Kegiatan \"', kak.nama_kegiatan, '\" (Level: ', ka.approval_level, ')') as description,
                    ka.catatan
                FROM t_kegiatan_approval ka
                LEFT JOIN m_users u ON ka.approver_user_id = u.user_id
                LEFT JOIN m_roles r ON u.role_id = r.role_id
                JOIN t_kegiatan k ON ka.kegiatan_id = k.kegiatan_id
                JOIN t_kak kak ON k.kak_id = kak.kak_id
            ";

            // Combine queries
            $sql = "SELECT * FROM (
                ($query1) UNION ALL ($query2) UNION ALL ($query3) UNION ALL ($query4)
            ) as combined_logs WHERE 1=1";

            // Add filters
            if (!empty($search)) {
                $sql .= " AND (user_name LIKE :search OR description LIKE :search OR context_title LIKE :search)";
                $params[':search'] = '%' . $search . '%';
            }

            if (!empty($role)) {
                $sql .= " AND user_role = :role";
                $params[':role'] = $role;
            }

            if (!empty($userId)) {
                $sql .= " AND user_id = :user_id";
                $params[':user_id'] = $userId;
            }

            if (!empty($startDate)) {
                $sql .= " AND DATE(created_at) >= :start_date";
                $params[':start_date'] = $startDate;
            }

            if (!empty($endDate)) {
                $sql .= " AND DATE(created_at) <= :end_date";
                $params[':end_date'] = $endDate;
            }

            // Count total for pagination
            $countSql = "SELECT COUNT(*) as total FROM ($sql) as count_table";
            
            $stmtCount = $this->db->getConnection()->prepare($countSql);
            foreach ($params as $key => $value) {
                $stmtCount->bindValue($key, $value);
            }
            $stmtCount->execute();
            $total = $stmtCount->fetch(PDO::FETCH_ASSOC)['total'];

            // Final query with ordering and limits
            $sql .= " ORDER BY created_at DESC LIMIT :limit OFFSET :offset";
            
            $stmt = $this->db->getConnection()->prepare($sql);
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }
            $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            
            $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

            Response::json([
                'success' => true,
                'data' => $logs,
                'pagination' => [
                    'total' => $total,
                    'page' => $page,
                    'limit' => $limit,
                    'total_pages' => ceil($total / $limit)
                ]
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            Response::json([
                'success' => false,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
    }
}
