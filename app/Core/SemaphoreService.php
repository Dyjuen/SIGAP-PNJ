<?php

namespace App\Core;

/**
 * SemaphoreService provides a simple, non-blocking semaphore implementation
 * using APCu for high-performance concurrency limiting.
 */
class SemaphoreService
{
    /**
     * @var string A unique prefix for all semaphore keys to avoid collisions.
     */
    private const KEY_PREFIX = 'semaphore_lock_';

    /**
     * @var int Time-to-live for semaphore keys in seconds.
     * This prevents stale locks from persisting forever if a release fails.
     */
    private const SEMAPHORE_TTL = 60; // 1 minute

    /**
     * Attempts to acquire a lock for a given key.
     *
     * This method is non-blocking. It atomically increments a counter. If the
     * resulting count is within the max limit, the lock is considered acquired.
     * If not, it immediately decrements the counter and returns false.
     *
     * @param string $key      A unique identifier for the resource to be locked (e.g., 'login_process').
     * @param int    $maxLocks The maximum number of concurrent locks allowed.
     * @return bool True if the lock was acquired, false otherwise.
     */
    public function acquire(string $key, int $maxLocks): bool
    {
        if ($maxLocks <= 0) {
            return false;
        }

        $fullKey = self::KEY_PREFIX . $key;

        // Atomically increment the counter.
        // apcu_inc returns the new value. If the key doesn't exist, it's created with a value of 1.
        $currentLocks = apcu_inc($fullKey, 1, $success, self::SEMAPHORE_TTL);

        // If the counter exceeds the maximum allowed locks, we fail to acquire the lock.
        if ($currentLocks > $maxLocks) {
            // We must decrement the counter back, as we failed to get the lock.
            $this->release($key);
            return false;
        }

        // Lock successfully acquired.
        return true;
    }

    /**
     * Releases a lock for a given key.
     *
     * This method atomically decrements the counter.
     *
     * @param string $key The unique identifier for the resource that was locked.
     */
    public function release(string $key): void
    {
        $fullKey = self::KEY_PREFIX . $key;
        
        // Atomically decrement the counter.
        // We ensure the counter does not go below zero.
        $currentValue = apcu_dec($fullKey);
        if ($currentValue < 0) {
            apcu_store($fullKey, 0, self::SEMAPHORE_TTL);
        }
    }
}
