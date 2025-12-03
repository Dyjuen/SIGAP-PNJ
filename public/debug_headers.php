<?php
// public/debug_headers.php

header('Content-Type: application/json');

$data = [
    'headers_from_getallheaders' => function_exists('getallheaders') ? getallheaders() : 'getallheaders() not available',
    'server_authorization_vars' => [
        'HTTP_AUTHORIZATION' => $_SERVER['HTTP_AUTHORIZATION'] ?? 'NOT SET',
        'REDIRECT_HTTP_AUTHORIZATION' => $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? 'NOT SET',
        'Authorization' => $_SERVER['Authorization'] ?? 'NOT SET',
        'REMOTE_USER' => $_SERVER['REMOTE_USER'] ?? 'NOT SET',
        'PHP_AUTH_USER' => $_SERVER['PHP_AUTH_USER'] ?? 'NOT SET',
    ],
    'all_server_vars' => $_SERVER
];

echo json_encode($data, JSON_PRETTY_PRINT);
