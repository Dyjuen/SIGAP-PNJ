<?php

namespace App\Core;

class Router
{
    private $routes = [];
    private $fallbackHandler = null;

    public function get($path, $handler, $middlewares = [])
    {
        $this->addRoute('GET', $path, $handler, $middlewares);
    }

    public function post($path, $handler, $middlewares = [])
    {
        $this->addRoute('POST', $path, $handler, $middlewares);
    }

    public function put($path, $handler, $middlewares = [])
    {
        $this->addRoute('PUT', $path, $handler, $middlewares);
    }

    public function delete($path, $handler, $middlewares = [])
    {
        $this->addRoute('DELETE', $path, $handler, $middlewares);
    }

    private function addRoute($method, $path, $handler, $middlewares)
    {
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

    public function fallback($handler)
    {
        $this->fallbackHandler = $handler;
    }

    public function dispatch()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $scriptPath = dirname($_SERVER['SCRIPT_NAME']);

        if ($scriptPath !== '/' && strpos($requestUri, $scriptPath) === 0) {
            $requestUri = substr($requestUri, strlen($scriptPath));
        }
        
        if (empty($requestUri) || $requestUri[0] !== '/') {
            $requestUri = '/' . $requestUri;
        }

        if ($requestUri !== '/' && substr($requestUri, -1) === '/') {
            $requestUri = rtrim($requestUri, '/');
        }

        foreach ($this->routes as $route) {
            if ($route['method'] !== $requestMethod) {
                continue;
            }

            $pattern = $this->convertToRegex($route['path']);
            
            if (preg_match($pattern, $requestUri, $matches)) {
                array_shift($matches);
                
                foreach ($route['middlewares'] as $middleware) {
                    $middleware->handle();
                }
                
                $this->executeHandler($route['handler'], $matches);
                return;
            }
        }

        if ($this->fallbackHandler) {
            call_user_func($this->fallbackHandler);
        } else {
            http_response_code(404);
            echo json_encode([
                'status' => 'error',
                'message' => 'Endpoint tidak ditemukan',
                'code' => 404,
                'hint' => 'Gunakan GET /api/health untuk melihat daftar endpoint yang tersedia'
            ]);
        }
        exit;
    }

    private function convertToRegex($path)
    {
        $pattern = preg_replace('/:([\w]+)/', '(?P<$1>[\w-]+)', $path);
        $pattern = str_replace('/', '\/', $pattern);
        return '/^' . $pattern . '$/';
    }

    private function executeHandler($handler, $params = [])
{
    if (is_callable($handler)) {
        call_user_func_array($handler, $params);
    } elseif (is_string($handler)) {
        list($controller, $method) = explode('@', $handler);
        
        // ✅ Perbaikan di sini
        $controllerClass = 'App\\Controllers\\' . $controller;
        
        if (!class_exists($controllerClass)) {
            throw new \Exception("Controller {$controllerClass} not found");
        }
        
        $controllerInstance = new $controllerClass();
        
        if (!method_exists($controllerInstance, $method)) {
            throw new \Exception("Method {$method} not found in {$controllerClass}");
        }
        
        call_user_func_array([$controllerInstance, $method], $params);
    } else {
        throw new \Exception("Invalid route handler");
    }
}

}