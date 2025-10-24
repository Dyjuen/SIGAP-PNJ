<?php

namespace App\Core;

use Firebase\JWT\JWT as FirebaseJWT;
use Firebase\JWT\Key;
use Exception;

class JWT
{
    private static $secret;
    private static $algorithm = 'HS256';
    private static $expiry = 86400; // 24 jam 

//  Initialize JWT configuration

    private static function init()
    {
        if (self::$secret === null) {
            $config = require __DIR__ . '/../../config/jwt.php';
            self::$secret = $config['secret'];
            self::$algorithm = $config['algorithm'];
            self::$expiry = $config['expiry'];
        }
    }


// Generate JWT token

    public static function encode(array $payload): string
    {
        self::init();

        $issuedAt = time();
        $expire = $issuedAt + self::$expiry;

        $token = [
            'iat' => $issuedAt,         // Issued at
            'exp' => $expire,            // Expire
            'data' => $payload           // User data
        ];

        return FirebaseJWT::encode($token, self::$secret, self::$algorithm);
    }


    // Decode JWT token

    public static function decode(string $token): ?object
    {
        self::init();

        try {
            $decoded = FirebaseJWT::decode($token, new Key(self::$secret, self::$algorithm));
            return $decoded->data;
        } catch (Exception $e) {
            return null;
        }
    }

    // Validate JWT token
    public static function validate(string $token): bool
    {
        return self::decode($token) !== null;
    }

    //  Extract token from Authorization header
    public static function extractFromHeader(?string $authHeader): ?string
    {
        if (!$authHeader) {
            return null;
        }

        // Format: "Bearer <token>"
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return $matches[1];
        }

        return null;
    }

    // Get remaining time before token expires

    public static function getTimeToExpire(string $token): ?int
    {
        self::init();

        try {
            $decoded = FirebaseJWT::decode($token, new Key(self::$secret, self::$algorithm));
            $now = time();
            $exp = $decoded->exp;
            
            return max(0, $exp - $now);
        } catch (Exception $e) {
            return null;
        }
    }
}