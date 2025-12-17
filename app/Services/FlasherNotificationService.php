<?php

namespace App\Services;

use App\Models\Notifikasi;
use App\Models\User; // Assuming User model is needed for some context
use App\Services\KegiatanTimerService;
use App\Core\Database;

class FlasherNotificationService
{
    private $notifikasiModel;
    private $kegiatanTimerService;
    private $userModel;
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
        $this->notifikasiModel = new Notifikasi();
        $this->kegiatanTimerService = new KegiatanTimerService();
        $this->userModel = new User();
    }

    /**
     * Generates and retrieves flasher notifications for the logged-in user upon dashboard load.
     * This method will:
     * 1. Get all overdue approvals.
     * 2. For each overdue approval, attempt to create a flasher notification for the relevant user
     *    (if not already created recently).
     * 3. Fetch all unread flasher notifications for the current user.
     * 4. Mark these fetched notifications as read.
     * 5. Return the messages of these notifications.
     * 
     * @param int $userId The ID of the currently logged-in user.
     * @return array An array of notification messages to be displayed as flashers.
     */
    public function getLoginFlasherNotifications(int $userId): array
    {
        $flasherMessages = [];
        $userRoles = $this->kegiatanTimerService->getUserRoles($userId); // Get user's roles

        // 1. Get all overdue approvals from the database
        $overdueApprovals = $this->kegiatanTimerService->getOverdueApprovals();

        // 2. For each overdue approval, attempt to create a flasher notification for this user
        foreach ($overdueApprovals as $approval) {
            // Check if the current user has the role required to approve this overdue item
            $requiredApprovalLevel = ($approval['approval_level'] === 'Wadir2') ? 'Wadir' : $approval['approval_level'];
            if (in_array($requiredApprovalLevel, $userRoles)) {
                // Attempt to create the notification. createOverdueFlasherNotification handles duplicates.
                $this->kegiatanTimerService->createOverdueFlasherNotification($userId, $approval, null);
            }
        }

        // 3. Fetch all UNREAD flasher notifications for the current user
        // Flasher notifications are identified by link_tujuan IS NULL
        $unreadFlasherNotifications = $this->notifikasiModel->getByUser($userId, true, true); // true for unreadOnly, true for flasherOnly

        foreach ($unreadFlasherNotifications as $notification) {
            $flasherMessages[] = $notification['pesan'];
            // 4. Mark these fetched notifications as read (so they don't reappear as flashers)
            $this->notifikasiModel->markAsRead($notification['notifikasi_id']);
        }

        return $flasherMessages;
    }
}
