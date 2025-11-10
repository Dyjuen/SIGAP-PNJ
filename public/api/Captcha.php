<?php
// public/api/captcha.php

session_start();

// Generate random captcha text
$captcha_text = substr(md5(rand()), 0, 6);
$_SESSION['captcha'] = $captcha_text;

// Create image
$width = 150;
$height = 50;
$image = imagecreatetruecolor($width, $height);

// Colors
$bg_color = imagecolorallocate($image, 255, 255, 255);
$text_color = imagecolorallocate($image, 0, 0, 0);
$line_color = imagecolorallocate($image, 200, 200, 200);

// Fill background
imagefilledrectangle($image, 0, 0, $width, $height, $bg_color);

// Add noise lines
for ($i = 0; $i < 5; $i++) {
    imageline($image, rand(0, $width), rand(0, $height), 
              rand(0, $width), rand(0, $height), $line_color);
}

// Add captcha text
$font_size = 20;
$angle = rand(-10, 10);
$x = ($width - strlen($captcha_text) * 15) / 2;
$y = ($height + $font_size) / 2;

imagestring($image, 5, $x, $y - 10, $captcha_text, $text_color);

// Output image
header('Content-Type: image/png');
imagepng($image);
imagedestroy($image);