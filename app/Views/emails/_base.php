<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $subject ?? 'SIGAP PNJ'; ?></title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            font-family: Arial, sans-serif;
        }
        .container {
            width: 100%;
            padding: 40px 0;
        }
        .card {
            width: 90%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        .icon-bubble {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #ffffff;
            text-align: center;
            line-height: 52px;
            position: absolute;
            top: -30px;
            left: 20px;
        }
        .icon-bubble span {
            font-size: 30px;
            font-weight: normal;
        }
        .content {
            padding: 60px 40px 40px 40px;
        }
        .title {
            font-size: 28px;
            font-weight: bold;
            margin: 0 0 20px 0;
        }
        .body-text {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
            margin: 0 0 30px 0;
        }
        .button-container {
            text-align: center;
            margin-bottom: 30px;
        }
        .button {
            color: #ffffff;
            padding: 14px 40px;
            border-radius: 12px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
        }
        .footer-text {
            font-size: 14px;
            color: #333333;
            margin: 0 0 8px 0;
        }
        .footer-text strong {
            font-weight: bold;
            color: #000000;
        }
        .bottom-section {
            text-align: center;
            padding-top: 40px;
        }
        .logo {
            width: 60px;
            margin: 0 auto 20px auto;
        }
        .phone-number {
            font-size: 14px;
            color: #000000;
            font-weight: normal;
            margin: 0 0 10px 0;
        }
        .address {
            font-size: 12px;
            color: #888888;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="icon-bubble" style="border: 4px solid <?php echo $emailData['status_color'] ?? '#1ABDD4'; ?>;">
                <span style="color: <?php echo $emailData['status_color'] ?? '#1ABDD4'; ?>;"><?php echo $emailData['icon_text'] ?? '!'; ?></span>
            </div>
            <div class="content">
                <?php if (isset($emailData['title'])): ?>
                    <h1 class="title" style="color: <?php echo $emailData['status_color'] ?? '#1ABDD4'; ?>;"><?php echo $emailData['title']; ?></h1>
                <?php endif; ?>
                
                <?php if (isset($emailData['body'])): ?>
                    <p class="body-text"><?php echo $emailData['body']; ?></p>
                <?php endif; ?>

                <?php if (isset($emailData['button_text']) && isset($emailData['button_link'])): ?>
                    <div class="button-container">
                        <a href="<?php echo $emailData['button_link']; ?>" class="button" style="background-color: <?php echo $emailData['status_color'] ?? '#1ABDD4'; ?>;"><?php echo $emailData['button_text']; ?></a>
                    </div>
                <?php endif; ?>

                <?php if (isset($emailData['footer_line1'])): ?>
                    <p class="footer-text"><?php echo $emailData['footer_line1']; ?></p>
                <?php endif; ?>
                
                <?php if (isset($emailData['footer_line2'])): ?>
                    <p class="footer-text"><?php echo $emailData['footer_line2']; ?></p>
                <?php endif; ?>
            </div>
        </div>
        <div class="bottom-section">
            <img src="http://localhost/assets/img/logo.svg" alt="Logo" class="logo">
            <p class="phone-number">+123 456 789</p>
            <p class="address">Lorem ipsum dolor sit<br>amet, consectetur adipiscing elit,</p>
        </div>
    </div>
</body>
</html>