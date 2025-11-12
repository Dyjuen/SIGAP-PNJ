# Alur Lengkap Proses dari Telaah hingga LPJ Selesai

Dokumen ini menjelaskan alur kerja lengkap sistem SIGAP-PNJ, mulai dari pengajuan usulan (Telaah) hingga Laporan Pertanggungjawaban (LPJ) disetujui dan kegiatan dinyatakan selesai. Alur ini dijelaskan berdasarkan fungsi-fungsi yang ada di dalam Controller.

---

## Tahap 1: Pengajuan dan Persetujuan Telaah

Fase ini dikelola oleh `TelaahController` dan melibatkan **Pengusul** serta **Verifikator**.

### 1.1. Pengusul Membuat Draft Telaah
- **Controller & Fungsi**: `TelaahController@store`
- **Aktor**: Pengusul
- **Tujuan**: Membuat usulan kegiatan baru dalam bentuk draft.
- **Alur Logika**:
    1. Menerima data lengkap usulan dalam format JSON.
    2. Menyimpan data header ke tabel `t_telaah` dengan `status_id = 1` (Draft).
    3. Menyimpan data detail (manfaat, tahapan, indikator, IKU, anggaran) ke tabel-tabel terkait.
    4. Seluruh proses dibungkus dalam *database transaction* untuk memastikan integritas data.
- **Input**: Body JSON berisi struktur data `kak`, `target_iku`, `rab`, dll.
- **Output**: Draft telaah berhasil dibuat dengan `telaah_id` baru.

### 1.2. Pengusul Mengajukan Telaah untuk Verifikasi
- **Controller & Fungsi**: `TelaahController@submitForVerification`
- **Aktor**: Pengusul
- **Tujuan**: Mengirimkan draft telaah kepada Verifikator untuk ditinjau.
- **Alur Logika**:
    1. Memvalidasi bahwa yang melakukan aksi adalah pengusul asli.
    2. Memastikan status telaah adalah `Draft` (1) atau `Revisi` (5).
    3. Mengubah `status_id` telaah menjadi `2` (Dalam Review).
    4. Mencatat perubahan status ke dalam tabel `t_telaah_log_status`.
- **Input**: `telaah_id` dari URL.
- **Output**: Status telaah berubah menjadi "Dalam Review".

### 1.3. Verifikator Melakukan Review
Verifikator memiliki tiga opsi: meminta revisi, menolak, atau menyetujui.

#### a. Meminta Revisi
- **Controller & Fungsi**: `TelaahController@requestRevision`
- **Aktor**: Verifikator
- **Tujuan**: Mengembalikan telaah kepada Pengusul untuk diperbaiki.
- **Alur Logika**:
    1. Memastikan status telaah adalah `Dalam Review` (2).
    2. Menerima catatan-catatan revisi dari body JSON.
    3. Menyimpan catatan revisi ke kolom-kolom `catatan_*` di tabel `t_telaah` dan tabel terkait.
    4. Mengubah `status_id` menjadi `5` (Revisi).
    5. Mencatat log perubahan status.
- **Input**: `telaah_id` dari URL dan body JSON berisi catatan revisi.
- **Output**: Status telaah berubah menjadi "Revisi" dan Pengusul mendapat notifikasi.

#### b. Menolak Telaah
- **Controller & Fungsi**: `TelaahController@reject`
- **Aktor**: Verifikator
- **Tujuan**: Menolak usulan telaah secara permanen.
- **Alur Logika**:
    1. Memastikan status telaah adalah `Dalam Review` (2).
    2. Mengubah `status_id` menjadi `4` (Ditolak).
    3. Mencatat log dan alasan penolakan.
- **Input**: `telaah_id` dari URL dan body JSON berisi `catatan` penolakan.
- **Output**: Alur kerja untuk telaah ini berhenti.

#### c. Menyetujui Telaah
- **Controller & Fungsi**: `TelaahController@approve`
- **Aktor**: Verifikator
- **Tujuan**: Menyetujui usulan telaah untuk dilanjutkan menjadi kegiatan.
- **Alur Logika**:
    1. Memastikan status telaah adalah `Dalam Review` (2).
    2. Mengubah `status_id` menjadi `3` (Disetujui Verifikator).
    3. Membersihkan semua catatan revisi sebelumnya.
    4. Mencatat log persetujuan.
- **Input**: `telaah_id` dari URL.
- **Output**: Telaah siap untuk dijadikan kegiatan.

---

## Tahap 2: Pembuatan dan Persetujuan Kegiatan

Fase ini dimulai setelah telaah disetujui. Dikelola oleh `KegiatanController` dan melibatkan **Pengusul**, **PPK**, **Wadir**, dan **Bendahara**.

### 2.1. Pengusul Membuat Kegiatan dari Telaah
- **Controller & Fungsi**: `KegiatanController@create`
- **Aktor**: Pengusul
- **Tujuan**: Mengonversi telaah yang sudah disetujui menjadi kegiatan formal dan memulai alur persetujuan pencairan dana.
- **Alur Logika**:
    1. Memvalidasi bahwa `telaah_id` yang diberikan memiliki status `Disetujui Verifikator` (3).
    2. Menerima upload file `surat_pengantar`.
    3. Membuat entri baru di tabel `t_kegiatan`.
    4. **Membuat alur persetujuan (approval flow)** di tabel `t_kegiatan_approval` untuk level: `PPK`, `Wadir`, `Bendahara-Cair`, `Bendahara-LPJ`.
    5. Menetapkan status `Aktif` untuk level pertama (`PPK`) dan `Menunggu` untuk level berikutnya.
    6. Mengubah status `t_telaah` menjadi `6` (Proses Pencairan).
- **Input**: `multipart/form-data` berisi `telaah_id` dan file `surat_pengantar`.
- **Output**: Kegiatan baru terbuat dan alur persetujuan dimulai.

### 2.2. Proses Persetujuan Bertingkat (PPK & Wadir)
- **Controller & Fungsi**: `KegiatanController@approve`
- **Aktor**: PPK, Wadir (sesuai giliran)
- **Tujuan**: Memberikan persetujuan pada kegiatan.
- **Alur Logika**:
    1. Fungsi ini menangani semua level persetujuan.
    2. Sistem mengecek level persetujuan yang sedang `Aktif`.
    3. Aktor yang berwenang (misal, PPK) memberikan persetujuan.
    4. Status approval level saat ini diubah menjadi `Disetujui`.
    5. Status approval level berikutnya diubah menjadi `Aktif`.
    6. Proses ini berulang dari PPK ke Wadir, hingga sampai ke Bendahara.
- **Input**: `kegiatan_id` dari URL dan body JSON berisi `{ "status": "Disetujui", "catatan": "..." }`.
- **Output**: Alur persetujuan berlanjut ke level berikutnya.

---

## Tahap 3: Pencairan Dana dan Timer LPJ

Fase ini dikelola oleh `KegiatanController` dan `PencairanController`, dengan **Bendahara** sebagai aktor utama.

### 3.1. Bendahara Mencatat Pencairan Dana
- **Controller & Fungsi**: `KegiatanController@cairkanDana`
- **Aktor**: Bendahara
- **Tujuan**: Mencatat bahwa sejumlah dana telah dicairkan untuk sebuah kegiatan. Ini adalah prasyarat sebelum Bendahara dapat menyetujui.
- **Alur Logika**:
    1. Memastikan aktor adalah Bendahara atau Admin.
    2. Memastikan alur persetujuan kegiatan berada di tahap `Bendahara-Cair`.
    3. Menerima `nominal` pencairan dari body JSON.
    4. Menambahkan nominal tersebut ke kolom `dana_dicairkan` di tabel `t_kegiatan`.
- **Input**: `kegiatan_id` dari URL dan body JSON `{ "nominal": 5000000 }`.
- **Output**: Total `dana_dicairkan` pada kegiatan diperbarui.

### 3.2. Bendahara Menyetujui Pencairan (Approval Bendahara-Cair)
- **Controller & Fungsi**: `KegiatanController@approve`
- **Aktor**: Bendahara
- **Tujuan**: Memberikan persetujuan akhir untuk pencairan dana dan secara resmi memulai periode pertanggungjawaban (LPJ).
- **Alur Logika**:
    1. Fungsi yang sama dengan persetujuan PPK/Wadir, namun dengan logika tambahan saat `approval_level` adalah `Bendahara-Cair`.
    2. Memvalidasi bahwa `dana_dicairkan` sudah lebih dari 0.
    3. Mengubah status `t_kegiatan` menjadi `7` (Uang Muka Dicairkan).
    4. **Memanggil `LpjTimerService->startLpjTimer()` untuk memulai timer LPJ (misal: 14 hari).**
    5. Mengaktifkan level persetujuan berikutnya, yaitu `Bendahara-LPJ`.
    6. Mengirim notifikasi ke Pengusul bahwa dana cair dan timer LPJ dimulai.
- **Input**: `kegiatan_id` dari URL dan body JSON `{ "status": "Disetujui" }`.
- **Output**: Status kegiatan berubah, timer LPJ aktif, dan alur menunggu persetujuan LPJ.

---

## Tahap 4: Pengumpulan dan Persetujuan LPJ

Fase terakhir yang melibatkan **Pengusul** dan **Bendahara**.

### 4.1. Pengusul Mengunggah Lampiran LPJ
- **Controller & Fungsi**: `LampiranController@upload`
- **Aktor**: Pengusul
- **Tujuan**: Mengunggah file-file pertanggungjawaban (kuitansi, dokumentasi, dll.) sebelum batas waktu timer habis.
- **Alur Logika**:
    1. Pengusul mengunggah file melalui endpoint ini.
    2. Sistem akan menautkan file tersebut ke `kegiatan_id` yang sesuai.
    3. Proses ini dapat dilakukan berulang kali hingga semua dokumen LPJ terkumpul.
- **Input**: `multipart/form-data` berisi `file` dan `keterangan`.
- **Output**: File LPJ tersimpan di sistem.

### 4.2. Bendahara Menyetujui LPJ (Approval Bendahara-LPJ)
- **Controller & Fungsi**: `KegiatanController@approve`
- **Aktor**: Bendahara
- **Tujuan**: Memverifikasi dokumen LPJ dan menyelesaikan kegiatan.
- **Alur Logika**:
    1. Fungsi yang sama dengan persetujuan sebelumnya, kini berjalan untuk level `Bendahara-LPJ`.
    2. Bendahara memeriksa kelengkapan dan kebenaran lampiran LPJ yang diunggah Pengusul.
    3. Jika semua sesuai, Bendahara memberikan persetujuan.
    4. Karena ini adalah level persetujuan terakhir, sistem akan:
        a. Mengubah status `t_kegiatan` menjadi `9` (Selesai).
        b. Mengirim notifikasi ke Pengusul bahwa kegiatan telah selesai.
- **Input**: `kegiatan_id` dari URL dan body JSON `{ "status": "Disetujui" }`.
- **Output**: **KEGIATAN SELESAI**. Seluruh alur kerja untuk kegiatan ini berakhir.
