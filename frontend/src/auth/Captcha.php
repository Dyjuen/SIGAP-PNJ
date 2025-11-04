<?php
session_start();

// Check if GD library is available
if (!extension_loaded('gd') || !function_exists('imagecreatetruecolor')) {
    // GD library is not available, create an error image
    $width = 173;
    $height = 50;
    $image = imagecreatetruecolor($width, $height);
    $bgColor = imagecolorallocate($image, 255, 255, 255); // White background
    $textColor = imagecolorallocate($image, 211, 47, 47);   // Red text
    
    imagefill($image, 0, 0, $bgColor);
    
    // Write the error message
    $text1 = "GD Library is";
    $text2 = "not installed.";
    
    // Calculate position for centering
    $font = 3; // Built-in font size
    $text1Width = imagefontwidth($font) * strlen($text1);
    $text2Width = imagefontwidth($font) * strlen($text2);
    $x1 = ($width - $text1Width) / 2;
    $x2 = ($width - $text2Width) / 2;
    
    imagestring($image, $font, $x1, 10, $text1, $textColor);
    imagestring($image, $font, $x2, 25, $text2, $textColor);
    
    header('Content-Type: image/jpeg');
    imagejpeg($image);
    imagedestroy($image);
    exit;
}


function acakCaptcha() {
    $alphabet = "abcdefghijklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

    // untuk menyatakan $pass sebagai array
    $pass = array();

    // masukkan -2 dalam string length
    $panjangAlpha = strlen($alphabet) - 2;
    for ($i = 0; $i < 5; $i++) {
        $n = rand(0, $panjangAlpha);
        $pass[] = $alphabet[$n];
    }

    // ubah array menjadi string
    return implode($pass);
}

// untuk mengacak captcha
$code = acakCaptcha();
$_SESSION["code"] = $code;

// lebar dan tinggi captcha
$wh = imagecreatetruecolor(173, 50);

// background color biru
$bgc = imagecolorallocate($wh, 22, 86, 165);

// text color abu-abu
$fc = imagecolorallocate($wh, 223, 230, 233);

// isi background
imagefill($wh, 0, 0, $bgc);

// tampilkan text captcha
// ( $image , $fontsize , $x , $y , $string , $fontcolor )
imagestring($wh, 5, 50, 15, $code, $fc);

// buat gambar
header('Content-Type: image/jpeg');
imagejpeg($wh);
imagedestroy($wh);
?>
