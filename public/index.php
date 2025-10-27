<?php

/**
 * Application Entry Point
 * 
 * Handles all incoming HTTP requests and routes them to appropriate controllers
 */

// Start session if not already started
if (!session_id()) {
    session_start();
}

// Define root directory constant
define('ROOT', dirname(__DIR__));

// Load Composer autoloader
require_once ROOT . '/vendor/autoload.php';

// Load core classes
require_once ROOT . '/app/Core/App.php';
require_once ROOT . '/app/Core/Controller.php';
require_once ROOT . '/app/Core/Database.php';
require_once ROOT . '/app/Core/Response.php';
require_once ROOT . '/app/Core/JWT.php';
require_once ROOT . '/app/Core/Middleware.php';

// Load database configuration
require_once ROOT . '/config/database.php';

// Load helper functions
require_once ROOT . '/app/helpers.php';

// Enable error reporting for development (disable in production)
if (getenv('APP_ENV') === 'development' || !getenv('APP_ENV')) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
} else {
    error_reporting(0);
    ini_set('display_errors', '0');
}

// Set timezone
date_default_timezone_set('Asia/Jakarta');

// Set JSON response headers
header('Content-Type: application/json; charset=utf-8');

// Enable CORS for development (configure properly in production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400'); // 24 hours

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Global error handler
set_exception_handler(function($exception) {
    // Log error (you can customize this to log to file)
    error_log($exception->getMessage());
    error_log($exception->getTraceAsString());
    
    // Return JSON error response
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => getenv('APP_ENV') === 'development' 
            ? $exception->getMessage() 
            : 'Terjadi kesalahan pada server',
        'code' => 500,
        'trace' => getenv('APP_ENV') === 'development' 
            ? $exception->getTraceAsString() 
            : null
    ]);
    exit;
});

// Global error handler for PHP errors
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    // Convert error to exception
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
});

/**
 * Simple Router Implementation
 */
class Router
{
    private $routes = [];
    private $fallbackHandler = null;

    /**
     * Register GET route
     */
    public function get($path, $handler, $middlewares = [])
    {
        $this->addRoute('GET', $path, $handler, $middlewares);
    }

    /**
     * Register POST route
     */
    public function post($path, $handler, $middlewares = [])
    {
        $this->addRoute('POST', $path, $handler, $middlewares);
    }

    /**
     * Register PUT route
     */
    public function put($path, $handler, $middlewares = [])
    {
        $this->addRoute('PUT', $path, $handler, $middlewares);
    }

    /**
     * Register DELETE route
     */
    public function delete($path, $handler, $middlewares = [])
    {
        $this->addRoute('DELETE', $path, $handler, $middlewares);
    }

    /**
     * Add route to routes array
     */
    private function addRoute($method, $path, $handler, $middlewares)
    {
        // Normalize path (add /api prefix if not exists)
        if (strpos($path, '/api') !== 0) {
            $path = '/api' . $path;
        }

        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'handler' => $handler,
            'middlewares' => $middlewares
        ];
    }

    /**
     * Register fallback handler (404)
     */
    public function fallback($handler)
    {
        $this->fallbackHandler = $handler;
    }

    /**
     * Match and execute route
     */
    public function dispatch()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestUri = $_SERVER['REQUEST_URI'];
        
        // Remove query string
        $requestUri = strtok($requestUri, '?');
        
        // Remove trailing slash (except for root)
        if ($requestUri !== '/' && substr($requestUri, -1) === '/') {
            $requestUri = rtrim($requestUri, '/');
        }

        // Find matching route
        foreach ($this->routes as $route) {
            if ($route['method'] !== $requestMethod) {
                continue;
            }

            // Convert route path to regex pattern
            $pattern = $this->convertToRegex($route['path']);
            
            if (preg_match($pattern, $requestUri, $matches)) {
                // Remove full match from matches array
                array_shift($matches);
                
                // Execute middlewares
                foreach ($route['middlewares'] as $middleware) {
                    $middleware->handle();
                }
                
                // Execute handler
                $this->executeHandler($route['handler'], $matches);
                return;
            }
        }

        // No route matched, execute fallback
        if ($this->fallbackHandler) {
            call_user_func($this->fallbackHandler);
        } else {
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => 'Route not found',
                'code' => 404
            ]);
        }
        exit;
    }

    /**
     * Convert route path to regex pattern
     */
    private function convertToRegex($path)
    {
        // Replace :param with named capture group
        $pattern = preg_replace('/:([\w]+)/', '(?P<$1>[\w-]+)', $path);
        
        // Escape forward slashes
        $pattern = str_replace('/', '\/', $pattern);
        
        // Add start and end anchors
        return '/^' . $pattern . '$/';
    }

    /**
     * Execute route handler
     */
    private function executeHandler($handler, $params = [])
    {
        if (is_callable($handler)) {
            // Handler is a closure
            call_user_func_array($handler, $params);
        } elseif (is_string($handler)) {
            // Handler is "Controller@method" format
            list($controller, $method) = explode('@', $handler);
            
            // Build full controller class name
            $controllerClass = "App\\Controllers\\{$controller}";
            
            if (!class_exists($controllerClass)) {
                throw new Exception("Controller {$controllerClass} not found");
            }
            
            $controllerInstance = new $controllerClass();
            
            if (!method_exists($controllerInstance, $method)) {
                throw new Exception("Method {$method} not found in {$controllerClass}");
            }
            
            // Call controller method with params
            call_user_func_array([$controllerInstance, $method], $params);
        } else {
            throw new Exception("Invalid route handler");
        }
    }
}

// Create router instance
$router = new Router();

// Load API routes
require_once ROOT . '/routes/api.php';

// Dispatch request
$router->dispatch();