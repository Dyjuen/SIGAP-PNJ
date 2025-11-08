<?php

/**
 * Script untuk cron job check LPJ reminders
 * Simpan di: scripts/check-lpj-reminders.php
 * 
 * Jalankan setiap hari jam 8 pagi:
 * Cron syntax: 0 8 * * * /usr/bin/php /path/to/project/scripts/check-lpj-reminders.php
 * 
 * Untuk development (tanpa cron):
 * Bisa panggil manual via API: POST /api/lpj/check-reminders
 * Atau jalankan: php scripts/check-lpj-reminders.php
 */

// Load autoloader dan bootstrap
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../app/helpers.php';

use App\Services\LpjTimerService;

// Set timezone
date_default_timezone_set('Asia/Jakarta');

// Log start
$logFile = __DIR__ . '/../storage/logs/lpj-cron-' . date('Y-m-d') . '.log';
$startTime = date('Y-m-d H:i:s');

function logMessage($message, $logFile) {
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[{$timestamp}] {$message}\n", FILE_APPEND);
}

logMessage("=== LPJ Reminder Check Started ===", $logFile);

try {
    // Initialize service
    $lpjService = new LpjTimerService();
    
    // Check and send reminders
    $results = $lpjService->checkAndSendReminders();
    
    // Log results
    logMessage("Results:", $logFile);
    logMessage("  - H-7 reminders sent: {$results['h7_sent']}", $logFile);
    logMessage("  - H-3 reminders sent: {$results['h3_sent']}", $logFile);
    logMessage("  - H-1 reminders sent: {$results['h1_sent']}", $logFile);
    logMessage("  - Overdue notifications sent: {$results['overdue_sent']}", $logFile);
    
    $totalSent = array_sum($results);
    logMessage("Total notifications sent: {$totalSent}", $logFile);
    logMessage("Status: SUCCESS", $logFile);
    
    // Exit dengan status success
    exit(0);
    
} catch (\Exception $e) {
    // Log error
    logMessage("ERROR: " . $e->getMessage(), $logFile);
    logMessage("Stack trace: " . $e->getTraceAsString(), $logFile);
    logMessage("Status: FAILED", $logFile);
    
    // Exit dengan status error
    exit(1);
} finally {
    $endTime = date('Y-m-d H:i:s');
    logMessage("=== LPJ Reminder Check Ended ===\n", $logFile);
}