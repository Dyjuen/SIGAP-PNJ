<?php
if(!session_id()) session_start();

define('ROOT', dirname(__DIR__));

require_once ROOT . '/vendor/autoload.php';
require_once ROOT . '/app/Core/App.php';
require_once ROOT . '/app/Core/Controller.php';
require_once ROOT . '/app/Core/Database.php';
require_once ROOT . '/config/database.php';
require_once ROOT . '/app/helpers.php'; 

$app = new App();