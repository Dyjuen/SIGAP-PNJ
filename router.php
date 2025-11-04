<?php
// router.php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Handle captcha image request
if ($path === '/api/captcha') {
    ob_clean(); 
    flush();
    require_once __DIR__ . '/frontend/src/auth/Captcha.php';
    return true;
}

// 1. Handle static files from frontend/public
$publicPath = __DIR__ . '/frontend/public' . $path;
if (file_exists($publicPath) && !is_dir($publicPath)) {
    // Determine content type
    $ext = pathinfo($publicPath, PATHINFO_EXTENSION);
    $mimeTypes = [
        'css' => 'text/css',
        'js'  => 'application/javascript',
        'jpg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
    ];
    header('Content-Type: ' . ($mimeTypes[$ext] ?? mime_content_type($publicPath)));
    readfile($publicPath);
    return true; // Stop processing
}


// 2. Handle JS source files from frontend/src for module loading
$srcPath = __DIR__ . '/frontend' . $path;
if (preg_match('/^\/src\/.*\.js$/', $path) && file_exists($srcPath)) {
    header('Content-Type: application/javascript');
    readfile($srcPath);
    return true;
}

// 3. Handle API calls
if (preg_match('/^\/api\//', $path)) {
    $_GET['url'] = ltrim($path, '/');
    require_once 'public/index.php';
    return true;
}

// 4. For any other route, serve the frontend's index.html
require_once __DIR__ . '/frontend/public/index.html';