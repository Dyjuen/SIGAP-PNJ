<!-- Ini adalah template base yang akan digunakan semua email -->
<!-- Simpan di: app/Views/emails/_base.php -->

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $subject ?? 'SIGAP PNJ'; ?></title>
    <style>
        * { margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .email-header img {
            max-height: 50px;
            margin-bottom: 10px;
        }
        .email-header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }
        .email-body {
            padding: 30px 20px;
        }
        .greeting {
            font-size: 16px;
            margin-bottom: 20px;
            color: #333;
        }
        .greeting strong {
            color: #1e3c72;
        }
        .content {
            font-size: 14px;
            line-height: 1.8;
            color: #555;
            margin: 20px 0;
        }
        .alert-box {
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            border-left: 4px solid;
        }
        .alert-info {
            background-color: #e3f2fd;
            border-color: #2196F3;
            color: #0d47a1;
        }
        .alert-warning {
            background-color: #fff3e0;
            border-color: #ff9800;
            color: #e65100;
        }
        .alert-danger {
            background-color: #ffebee;
            border-color: #f44336;
            color: #b71c1c;
        }
        .alert-success {
            background-color: #e8f5e9;
            border-color: #4caf50;
            color: #1b5e20;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #2a5298;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 600;
            margin: 20px 0;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #1e3c72;
        }
        .button-container {
            text-align: center;
        }
        .info-box {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            font-size: 14px;
        }
        .info-box strong {
            color: #1e3c72;
            display: block;
            margin-bottom: 5px;
        }
        .divider {
            border: none;
            border-top: 1px solid #ddd;
            margin: 20px 0;
        }
        .email-footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
            border-top: 1px solid #ddd;
        }
        .footer-link {
            color: #2a5298;
            text-decoration: none;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
        .highlight {
            color: #2a5298;
            font-weight: 600;
        }
        .table-data {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 14px;
        }
        .table-data td {
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .table-data td:first-child {
            font-weight: 600;
            color: #1e3c72;
            width: 40%;
        }
        @media (max-width: 600px) {
            .email-container { border-radius: 0; }
            .email-body { padding: 20px 15px; }
            .button { padding: 10px 20px; font-size: 14px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="../../../public/assets/img/logo/logo_pnj.png" alt="Logo PNJ" style="max-height: 50px;">
            <h1>SIGAP PNJ</h1>
        </div>
        <div class="email-body">
            <?php echo $emailContent; ?>
        </div>
        <div class="email-footer">
            <p>Sistem Informasi Gratifikasi Administrasi Publik - Politeknik Negeri Jakarta</p>
            <p>
                <a href="https://pnj.ac.id" class="footer-link">pnj.ac.id</a> | 
                <a href="mailto:sigap@pnj.ac.id" class="footer-link">sigap@pnj.ac.id</a>
            </p>
            <p style="margin-top: 15px; color: #aaa;">© 2025 PNJ. Semua hak dilindungi.</p>
        </div>
    </div>
</body>
</html>