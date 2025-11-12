# Alur Lengkap Proses SIGAP-PNJ (Berdasarkan Alur Pengguna)

Dokumen ini menjelaskan alur kerja utama sistem SIGAP-PNJ dari perspektif pengguna, mulai dari interaksi di antarmuka hingga pemanggilan fungsi di **Controller** dan **Model**.

---

## Bagian 1: Proses KAK (Kerangka Acuan Kerja)

### 1.1. Melihat Daftar Usulan KAK
- **Aktor**: Pengusul
- **Deskripsi**: Pengusul membuka menu KAK untuk melihat semua usulan yang pernah dibuat.
- **Interaksi**:
    - **Controller**: `TelaahController@index`
    - **Model**: `Telaah::getAllWithFilters()` (Nama diabstraksikan dari query SQL di controller)

### 1.2. Membuat Draf Usulan KAK Baru
- **Aktor**: Pengusul
- **Deskripsi**: Pengusul menekan tombol "Buat Baru", mengisi formulir, lalu menyimpan sebagai draf.
- **Interaksi**:
    - **Controller**: `TelaahController@store`
    - **Model**: `Telaah::create()`, `TelaahManfaat::create()`, `TelaahAnggaran::create()`, dan model-model terkait lainnya.

### 1.3. Mengajukan Draf untuk Verifikasi
- **Aktor**: Pengusul
- **Deskripsi**: Dari daftar usulan, Pengusul memilih draf dan menekan tombol "Ajukan".
- **Interaksi**:
    - **Controller**: `TelaahController@submitForVerification`
    - **Model**: `Telaah::find()`, `Telaah::update()`, `TelaahLogStatus::create()`

### 1.4. Verifikator Mereview Usulan
- **Aktor**: Verifikator
- **Deskripsi**: Verifikator membuka menu KAK, memilih usulan berstatus "Dalam Review" untuk melihat detailnya.
- **Interaksi**:
    - **Controller**: `TelaahController@show`
    - **Model**: `Telaah::find()`, `TelaahManfaat::findByTelaahId()`, dan model-model terkait lainnya.

### 1.5. Verifikator Menyetujui Usulan
- **Aktor**: Verifikator
- **Deskripsi**: Dari halaman detail, Verifikator menekan tombol "Setujui".
- **Interaksi**:
    - **Controller**: `TelaahController@approve`
    - **Model**: `Telaah::find()`, `Telaah::update()`, `TelaahLogStatus::create()`, `TelaahApproval::create()`

### 1.6. Melihat/Mengunduh Dokumen KAK
- **Aktor**: Semua peran yang berkepentingan
- **Deskripsi**: Pengguna menekan tombol "Preview" atau "Download" pada halaman detail KAK.
- **Interaksi**:
    - **Controller**: `KAKController@download`, `KAKController@preview`
    - **Model**: `Telaah::getDataForKAK()`

---

## Bagian 2: Proses Kegiatan & Persetujuan Pimpinan

### 2.1. Membuat Kegiatan dari KAK yang Disetujui
- **Aktor**: Pengusul
- **Deskripsi**: Pengusul memilih KAK yang sudah disetujui, lalu membuat "Kegiatan" baru dengan mengunggah surat pengantar.
- **Interaksi**:
    - **Controller**: `KegiatanController@create`
    - **Model**: `Telaah::find()`, `Kegiatan::findBy()`, `Kegiatan::create()`, `Kegiatan::updateApproval()`, `Telaah::update()`
    - **Helper**: `FileUpload::upload()`

### 2.2. Pimpinan Mereview Kegiatan
- **Aktor**: Pimpinan (WD2/PPK)
- **Deskripsi**: Pimpinan membuka daftar kegiatan yang menunggu persetujuannya, lalu memilih satu untuk dilihat detailnya.
- **Interaksi**:
    - **Controller**: `KegiatanController@index` (untuk daftar), `KegiatanController@show` (untuk detail)
    - **Model**: `Kegiatan::getAllWithFilters()`, `Kegiatan::getKegiatanForPDF()`

### 2.3. Pimpinan Menyetujui Kegiatan
- **Aktor**: Pimpinan (WD2/PPK)
- **Deskripsi**: Dari halaman detail, Pimpinan menekan "Setujui". Alur otomatis berlanjut ke level persetujuan berikutnya.
- **Interaksi**:
    - **Controller**: `KegiatanController@approve`
    - **Model**: `Kegiatan::findById()`, `Kegiatan::findCurrentApproval()`, `Kegiatan::updateApprovalStatus()`, `KegiatanLogStatus::create()`, `Kegiatan::findNextApproval()`

---

## Bagian 3: Proses Pencairan & LPJ

### 3.1. Bendahara Mencatat Pencairan Dana
- **Aktor**: Bendahara
- **Deskripsi**: Bendahara membuka detail kegiatan yang siap dicairkan, lalu mencatat nominal dana yang diberikan.
- **Interaksi**:
    - **Controller**: `KegiatanController@cairkanDana`
    - **Model**: `Kegiatan::findById()`, `Kegiatan::findCurrentApproval()`, `Kegiatan::update()`

### 3.2. Bendahara Menyetujui Pencairan & Memulai Timer LPJ
- **Aktor**: Bendahara
- **Deskripsi**: Setelah mencatat dana, Bendahara memberikan persetujuan pada level "Bendahara-Cair", yang secara otomatis memulai timer LPJ.
- **Interaksi**:
    - **Controller**: `KegiatanController@approve` (pada level `Bendahara-Cair`)
    - **Model**: `Kegiatan::updateStatus()`, `Notifikasi::create()`
    - **Service**: `LpjTimerService::startLpjTimer()`

### 3.3. Pengusul Mengajukan LPJ
- **Aktor**: Pengusul
- **Deskripsi**: Pengusul membuka detail kegiatan yang dananya sudah cair, lalu mengunggah file-file LPJ.
- **Interaksi**:
    - **Controller**: `LampiranController@upload`
    - **Model**: `Kegiatan::findById()`, `KegiatanLampiran::create()`
    - **Helper**: `FileUpload::upload()`

### 3.4. Bendahara Mengecek & Menyetujui LPJ
- **Aktor**: Bendahara
- **Deskripsi**: Bendahara mereview LPJ yang diajukan dan memberikan persetujuan akhir pada level "Bendahara-LPJ", yang menyelesaikan siklus kegiatan.
- **Interaksi**:
    - **Controller**: `KegiatanController@approve` (pada level `Bendahara-LPJ`)
    - **Model**: `Kegiatan::updateStatus()` (menjadi "Selesai"), `Notifikasi::create()`