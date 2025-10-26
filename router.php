<?php
// router.php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// 1. Handle static files from frontend/public
$publicPath = __DIR__ . '/frontend/public' . $path;
if (file_exists($publicPath) && !is_dir($publicPath)) {
    return false; // Serve the requested file as-is.
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
