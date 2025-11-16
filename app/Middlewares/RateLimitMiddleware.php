<?php

namespace App\Middlewares;

use App\Core\Middleware;
use App\Core\Response;

class RateLimitMiddleware implements Middleware
{
    private $maxAttempts;
    private $decayMinutes;
    private $prefix;

    /**
     * Constructor
     * 
     * @param int $maxAttempts Maximum attempts allowed
     * @param int $decayMinutes Time window in minutes
     * @param string $prefix Cache key prefix
     */
    public function __construct(int $maxAttempts = 60, int $decayMinutes = 1, string $prefix = 'rate_limit')
    {
        $this->maxAttempts = $maxAttempts;
        $this->decayMinutes = $decayMinutes;
        $this->prefix = $prefix;
    }

    /**
     * Handle rate limiting
     */
    public function handle(): void
    {
        $key = $this->getRateLimitKey();
        $attempts = $this->getAttempts($key);
        $maxAttempts = $this->maxAttempts;

        // Check if rate limit exceeded
        if ($attempts >= $maxAttempts) {
            $retryAfter = $this->getRetryAfter($key);
            
            header('X-RateLimit-Limit: ' . $maxAttempts);
            header('X-RateLimit-Remaining: 0');
            header('X-RateLimit-Reset: ' . ($this->now() + $retryAfter));
            header('Retry-After: ' . $retryAfter);
            
            Response::error(
                'Terlalu banyak request. Silakan coba lagi setelah ' . $retryAfter . ' detik.',
                429
            );
        }

        // Increment attempts
        $this->incrementAttempts($key);

        // Set rate limit headers
        $remaining = max(0, $maxAttempts - ($attempts + 1));
        header('X-RateLimit-Limit: ' . $maxAttempts);
        header('X-RateLimit-Remaining: ' . $remaining);
        header('X-RateLimit-Reset: ' . ($this->now() + ($this->decayMinutes * 60)));
    }

    /**
     * Get rate limit key based on IP and endpoint
     * 
     * @return string
     */
    private function getRateLimitKey(): string
    {
        return $this->prefix . ':global';
    }

    /**
     * Get client IP address
     * 
     * @return string
     */
    private function getClientIp(): string
    {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            return $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
        } else {
            return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        }
    }

    /**
     * Get current attempts for key
     * 
     * @param string $key Cache key
     * @return int
     */
    private function getAttempts(string $key): int
    {
        $cacheFile = $this->getCacheFilePath($key);
        
        if (!file_exists($cacheFile)) {
            return 0;
        }

        $data = json_decode(file_get_contents($cacheFile), true);
        
        if (!$data || $data['expires_at'] < $this->now()) {
            @unlink($cacheFile);
            return 0;
        }

        return (int) $data['attempts'];
    }

    /**
     * Increment attempts for key
     * 
     * @param string $key Cache key
     */
    private function incrementAttempts(string $key): void
    {
        $cacheFile = $this->getCacheFilePath($key);
        $attempts = $this->getAttempts($key) + 1;
        $expiresAt = $this->now() + ($this->decayMinutes * 60);

        $data = [
            'attempts' => $attempts,
            'expires_at' => $expiresAt
        ];

        // Create cache directory if not exists
        $cacheDir = dirname($cacheFile);
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0777, true);
        }

        file_put_contents($cacheFile, json_encode($data));
    }

    /**
     * Get retry after seconds
     * 
     * @param string $key Cache key
     * @return int
     */
    private function getRetryAfter(string $key): int
    {
        $cacheFile = $this->getCacheFilePath($key);
        
        if (!file_exists($cacheFile)) {
            return $this->decayMinutes * 60;
        }

        $data = json_decode(file_get_contents($cacheFile), true);
        
        if (!$data) {
            return $this->decayMinutes * 60;
        }

        return max(0, $data['expires_at'] - $this->now());
    }

    /**
     * Get cache file path
     * 
     * @param string $key Cache key
     * @return string
     */
    private function getCacheFilePath(string $key): string
    {
        $cacheDir = __DIR__ . '/../../cache/rate_limit';
        return $cacheDir . '/' . $key . '.json';
    }

    /**
     * Get current timestamp
     * 
     * @return int
     */
    private function now(): int
    {
        return time();
    }

    /**
     * Clear expired rate limit cache files
     */
    public static function clearExpiredCache(): void
    {
        $cacheDir = __DIR__ . '/../../cache/rate_limit';
        
        if (!is_dir($cacheDir)) {
            return;
        }

        $files = glob($cacheDir . '/*.json');
        $now = time();

        foreach ($files as $file) {
            $data = json_decode(file_get_contents($file), true);
            
            if ($data && $data['expires_at'] < $now) {
                @unlink($file);
            }
        }
    }
}