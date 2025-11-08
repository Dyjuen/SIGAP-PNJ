# Dokumentasi Sistem Timer LPJ

## 📋 Overview

Sistem timer LPJ (Laporan Pertanggungjawaban) yang otomatis menghitung deadline 14 hari setelah Bendahara approve pencairan dana, dengan reminder H-7, H-3, dan H-1.

---

## 🎯 Alur Kerja

```
1. Pengusul submit kegiatan
2. Kegiatan di-approve oleh PPK → Wadir → Bendahara-Cair
3. ✅ Saat Bendahara-Cair approve → Timer 14 hari dimulai
4. Sistem kirim reminder:
   - H-7: "Anda punya 7 hari lagi"
   - H-3: "Anda punya 3 hari lagi"
   - H-1: "Anda punya 1 hari lagi"
5. Pengusul upload lampiran LPJ
6. Pengusul submit LPJ (final)
7. ❌ Jika lewat 14 hari belum submit → Notifikasi overdue
```

---

## 🗂️ File Structure

```
database/migrations/
  └── YYYYMMDD_update_lpj_timer_system.php

app/Models/
  └── KegiatanLampiran.php

app/Services/
  └── LpjTimerService.php

app/Controllers/
  └── LpjController.php

scripts/
  └── check-lpj-reminders.php

routes/
  └── api.php (tambah LPJ routes)
```

---

## 📦 Instalasi

### 1. Jalankan Migration

```bash
php vendor/bin/phinx migrate
```

Migration akan:
- Rename `t_telaah_lampiran` → `t_kegiatan_lampiran`
- Tambah kolom timer di `t_kegiatan`:
  - `bendahara_cair_approved_at`
  - `lpj_deadline`
  - `lpj_submitted_at`
  - `lpj_reminder_h7_sent`
  - `lpj_reminder_h3_sent`
  - `lpj_reminder_h1_sent`
  - `lpj_overdue_notified`

### 2. Setup Cron Job (Production)

Edit crontab:
```bash
crontab -e
```

Tambahkan (jalankan setiap hari jam 8 pagi):
```
0 8 * * * /usr/bin/php /path/to/project/scripts/check-lpj-reminders.php
```

### 3. Testing (Development)

Tanpa cron, panggil manual via API:
```bash
POST /api/lpj/check-reminders
Authorization: Bearer {token}
```

---

## 🔌 API Endpoints

### 1. Get Status LPJ

```http
GET /api/lpj/status/{kegiatan_id}
Authorization: Bearer {token}
```

**Response Success:**
```json
{
  "success": true,
  "data": {
    "kegiatan": {
      "kegiatan_id": 1,
      "nama_kegiatan": "Workshop"
    },
    "lpj_status": {
      "status": "active",
      "message": "Sisa waktu: 10 hari",
      "deadline": "2025-11-21 08:00:00",
      "days_left": 10
    },
    "lampiran": [],
    "total_lampiran": 0
  }
}
```

**Kemungkinan Status:**
- `not_started`: Timer belum dimulai
- `active`: Timer berjalan, belum submit
- `submitted`: Sudah submit LPJ
- `overdue`: Terlambat submit

---

### 2. Upload Lampiran LPJ

```http
POST /api/lpj/upload/{kegiatan_id}
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body:
- file: [file PDF/DOC/XLS/JPG/PNG]
```

**Response Success:**
```json
{
  "success": true,
  "message": "Lampiran berhasil diupload",
  "data": {
    "nama_file": "bon-makan.pdf",
    "path_file": "storage/uploads/lampiran/abc123.pdf",
    "tipe_file": "application/pdf",
    "ukuran_file": 245678
  }
}
```

**Validasi:**
- Max size: 5MB
- Allowed types: pdf, jpg, jpeg, png, doc, docx, xls, xlsx
- User harus pengusul kegiatan
- Tidak bisa upload jika sudah submit

---

### 3. Submit LPJ (Final)

```http
POST /api/lpj/submit/{kegiatan_id}
Authorization: Bearer {token}
```

**Response Success:**
```json
{
  "success": true,
  "message": "LPJ berhasil disubmit",
  "data": {
    "kegiatan_id": 1,
    "submitted_at": "2025-11-15 14:30:00"
  }
}
```

**Validasi:**
- Harus sudah upload minimal 1 lampiran
- User harus pengusul kegiatan
- Tidak bisa submit 2x

---

### 4. Delete Lampiran

```http
DELETE /api/lpj/lampiran/{lampiran_id}
Authorization: Bearer {token}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Lampiran berhasil dihapus"
}
```

---

### 5. Manual Check Reminders (Admin Only)

```http
POST /api/lpj/check-reminders
Authorization: Bearer {token}
```

**Response Success:**
```json
{
  "success": true,
  "message": "Reminder check completed",
  "data": {
    "h7_sent": 2,
    "h3_sent": 1,
    "h1_sent": 0,
    "overdue_sent": 1
  }
}
```

---

## 🔔 Notifikasi

Sistem otomatis kirim notifikasi ke tabel `t_notifikasi`:

### 1. Saat Timer Dimulai
```
"Pencairan dana untuk kegiatan "{nama}" telah disetujui. 
Anda memiliki 14 hari untuk submit LPJ."
```

### 2. Reminder H-7
```
"Reminder: Anda memiliki 7 hari untuk submit LPJ 
untuk kegiatan "{nama}""
```

### 3. Reminder H-3
```
"Reminder: Anda memiliki 3 hari untuk submit LPJ 
untuk kegiatan "{nama}""
```

### 4. Reminder H-1
```
"Reminder: Anda memiliki 1 hari untuk submit LPJ 
untuk kegiatan "{nama}""
```

### 5. Overdue
```
"PERINGATAN: Anda terlambat {X} hari submit LPJ 
untuk kegiatan "{nama}""
```

---

## 🧪 Testing Scenario

### Test 1: Happy Path
```
1. Login sebagai Bendahara
2. Approve kegiatan dengan level 'Bendahara-Cair'
3. Login sebagai Pengusul
4. GET /api/lpj/status/{id} → status: "active"
5. POST /api/lpj/upload/{id} → upload file
6. POST /api/lpj/submit/{id} → submit LPJ
7. GET /api/lpj/status/{id} → status: "submitted"
```

### Test 2: Timer & Reminders
```
1. Manually update `bendahara_cair_approved_at` ke 8 hari lalu
2. POST /api/lpj/check-reminders
3. Check notifikasi → harus ada reminder H-7
```

### Test 3: Overdue
```
1. Update `bendahara_cair_approved_at` ke 15 hari lalu
2. POST /api/lpj/check-reminders
3. Check notifikasi → harus ada peringatan overdue
4. GET /api/lpj/status/{id} → status: "overdue"
```

---

## 🐛 Troubleshooting

### Timer tidak dimulai saat approval
**Solusi:** Check integration di `KegiatanController::approveKegiatan()`. Pastikan:
```php
if ($approvalLevel === 'Bendahara-Cair' && $status === 'Disetujui') {
    $lpjService->startLpjTimer($kegiatanId);
}
```

### Reminder tidak terkirim
**Solusi:**
1. Check cron job berjalan: `grep CRON /var/log/syslog`
2. Check log file: `storage/logs/lpj-cron-{date}.log`
3. Test manual: `php scripts/check-lpj-reminders.php`

### Upload file gagal
**Solusi:**
1. Check folder permission: `chmod 755 storage/uploads/lampiran/`
2. Check max upload size di `php.ini`:
   ```ini
   upload_max_filesize = 10M
   post_max_size = 10M
   ```

---

## 📊 Database Schema Changes

### Tabel: t_kegiatan (Kolom Baru)
```sql
ALTER TABLE t_kegiatan ADD COLUMN (
  bendahara_cair_approved_at TIMESTAMP NULL,
  lpj_deadline TIMESTAMP NULL,
  lpj_submitted_at TIMESTAMP NULL,
  lpj_reminder_h7_sent BOOLEAN DEFAULT 0,
  lpj_reminder_h3_sent BOOLEAN DEFAULT 0,
  lpj_reminder_h1_sent BOOLEAN DEFAULT 0,
  lpj_overdue_notified BOOLEAN DEFAULT 0
);
```

### Tabel: t_telaah_lampiran → t_kegiatan_lampiran
```sql
RENAME TABLE t_telaah_lampiran TO t_kegiatan_lampiran;
ALTER TABLE t_kegiatan_lampiran 
  CHANGE id_telaah kegiatan_id INT;
```

---

## 🚀 Production Checklist

- [ ] Migration berhasil dijalankan
- [ ] Cron job sudah di-setup
- [ ] Folder `storage/uploads/lampiran/` exist dengan permission 755
- [ ] Folder `storage/logs/` exist dengan permission 755
- [ ] Test upload file berhasil
- [ ] Test approval trigger timer
- [ ] Test notifikasi terkirim
- [ ] API endpoints sudah di-route
- [ ] Authentication & authorization berfungsi

---

## 📝 Notes

- Timer dimulai tepat saat Bendahara-Cair approve (bukan dari tanggal_selesai)
- Deadline = 14 hari kalender (bukan hari kerja)
- Reminder dikirim sekali saja per milestone (H-7, H-3, H-1)
- Pengusul tetap bisa upload LPJ walaupun overdue
- File lampiran tidak ada limit jumlah, hanya size per file (5MB)

---

## 🤝 Support

Jika ada pertanyaan atau bug, silakan hubungi tim developer.