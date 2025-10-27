<?php
// config/database.php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'sigap_pnj');

define('JWT_SECRET', getenv('JWT_SECRET') ?: 'default_secret');