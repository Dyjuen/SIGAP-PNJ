<?php
// app/Core/App.php

/**
 * Ini adalah router utama aplikasi.
 * Tugasnya mem-parsing URL dan memuat Controller yang sesuai.
 */
class App {
    
    protected $controller;
    protected $method;
    protected $params = [];

    public function __construct() {
        
        require_once ROOT . '/app/Core/Controller.php';
        $this->controller = new \Controller();

        $url = $this->parseURL();

        // Cek apakah ini rute API
        if (isset($url[0]) && $url[0] == 'api') {
            unset($url[0]); // Hapus 'api' dari URL

            // Cek Controller API
            if (isset($url[1])) {
                $apiControllerName = ucwords($url[1]) . 'Controller';
                $apiControllerFile = ROOT . '/app/Controllers/Api/' . $apiControllerName . '.php';

                if (file_exists($apiControllerFile)) {
                    require_once $apiControllerFile;
                    
                    $this->controller = new $apiControllerName;
                    unset($url[1]); // Hapus nama controller dari URL
                } else {
                    $this->controller->jsonError(404, 'API controller not found');
                    return; // Hentikan eksekusi
                }
            } else {
                $this->controller->jsonError(400, 'API controller not specified');
                return;
            }

            // Cek Method API
            if (isset($url[2])) {
                if (method_exists($this->controller, $url[2])) {
                    $this->method = $url[2];
                    unset($url[2]);
                } else {
                    // Panggilan ini juga aman
                    $this->controller->jsonError(404, 'API method not found');
                    return;
                }
            } else {
                // Jika API dipanggil tanpa method (misal: /api/auth), kirim error
                $this->controller->jsonError(400, 'API method not specified');
                return;
            }

            // Sisa URL adalah parameter
            $this->params = $url ? array_values($url) : [];

        } else {
            // Jika bukan rute API, kirim error
            // (Karena kita sepakat ini adalah murni API backend)
            $this->controller->jsonError(404, 'Endpoint not found. Use the /api/ prefix.');
            return;
        }

        // Panggil method di controller dengan parameter
        try {
            call_user_func_array([$this->controller, $this->method], $this->params);
        } catch (Exception $e) {
            $this->controller->jsonError(500, 'Internal Server Error: ' . $e->getMessage());
        }
    }

    /**
     * Mem-parsing URL dari parameter 'url'
     * /public/index.php?url=api/auth/login
     * akan menjadi ['api', 'auth', 'login']
     */
    public function parseURL() {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            return $url;
        }
        return [];
    }
}