<?php

namespace App\Core;

interface Middleware
{
    /**
     * Handle middleware logic
     * 
     * @return void
     */
    public function handle(): void;
}