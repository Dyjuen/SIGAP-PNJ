// LandingPage.js

import { createFooter } from "./Footer.js";
import { createNavbar } from "./Navbar.js";

export function renderLandingPage(userRole) {
  const mainContent = `
    <div>
      <!-- Navbar -->
      ${createNavbar()}

      <!-- Hero Section -->
      <section id="landingHero" class="relative pt-32 pb-20 px-4 overflow-hidden" style="perspective: 1px;">
                <div class="absolute top-0 left-0 w-full h-[90vh] object-cover opacity-85 rounded-b-[80px]" style="overflow: hidden; transform-style: preserve-3d;">
          <img 
            id="hero-bg-img" src="assets/img/backgrounds/bg-100.png" 
            alt="Hero Background" 
            class="absolute top-0 left-0 w-full h-[82vh] object-cover opacity-40"
            style="transform: translateZ(-1px) scale(1.3); will-change: transform;"
          />
        </div>

        <div class="container mx-auto relative z-10">
          <div class="text-center max-w-4xl mx-auto mb-16">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span class="text-[#33C8DA]"> Sistem Terpadu untuk Pengajuan dan Persetujuan KAK & LPJ</span> 
            </h1>
            <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              SIGAP PNJ memudahkan seluruh proses administrasi kegiatan<br class="hidden md:block">
              di kampus secara cepat, transparan, dan efisien.
            </p>
            <a href="/login" class="inline-flex items-center bg-[#33C8DA] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#2BA9B8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Masuk Ke Aplikasi
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
          </div>

          <!-- Dashboard Preview with Arrow Indicator -->
          <div class="relative bg=[white] max-w-5xl mx-auto" id="heroDashboard">
            
            <div id="heroAnimationImg" class="relative hero-dashboard-img rounded-2xl shadow-2xl border border-gray-100" style="perspective: 1200px;">
              <img 
                id="dashboard-bg"
                src="assets/img/previews/dashboard-preview.png" 
                alt="SIGAP Dashboard Background" 
                class="w-full h-auto rounded-2xl transition-all duration-300 ease-out"
              >
              <img 
                id="dashboard-elements"
                src="assets/img/previews/dashboard-elements.png" 
                alt="SIGAP Dashboard Elements" 
                class="absolute top-0 left-0 w-full h-auto transition-all duration-300 ease-out"
              >
            </div>
          </div>
      </section>

      <!-- Process Features Section -->
      <section id="landingFeatures" class="section-py py-20 px-4 bg-white">
        <div class="container mx-auto">
          <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4">Fitur Utama</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              <span class="text-[#33C8DA]">Semua Proses,</span> Satu Sistem.
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              SIGAP membantu setiap peran dari pengusul hingga pimpinan, bekerja lebih cepat dan transparan.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div class="text-center p-4">
              <div class="w-16 h-16 mx-auto flex items-center justify-center mb-6">
                <img src="assets/svg/features/pengajuan-digital.svg" alt="Pengajuan Digital Icon" class="w-28 h-28">
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Pengajuan Digital</h3>
              <p class="text-gray-600 leading-relaxed px-4 text-sm">
                Buat dan kirim usulan KAK & LPJ langsung melalui sistem tanpa dokumen fisik.
              </p>
            </div>

            <div class="text-center p-4">
              <div class="w-16 h-16 mx-auto flex items-center justify-center mb-6">
                <img src="assets/svg/features/revisi-terstruktur.svg" alt="Revisi Terstruktur Icon" class="w-28 h-28">
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Revisi Terstruktur</h3>
              <p class="text-gray-600 leading-relaxed px-4 text-sm">
                Setiap revisi tercatat dengan komentar jelas dari verifikator atau pimpinan.
              </p>
            </div>

            <div class="text-center p-4">
              <div class="w-16 h-16 mx-auto flex items-center justify-center mb-6">
                <img src="assets/svg/features/pelacakan-real-time.svg" alt="Pelacakan Real-Time Icon" class="w-28 h-28">
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Pelacakan Real-Time</h3>
              <p class="text-gray-600 leading-relaxed px-4 text-sm">
                Lihat status usulan kapan saja: dari validasi hingga persetujuan akhir.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-0 md:mt-8">
            <div class="text-center p-4">
              <div class="w-16 h-16 mx-auto flex items-center justify-center mb-6">
                <img src="assets/svg/features/dokumen-otomatis.svg" alt="Dokumen Otomatis Icon" class="w-28 h-28">
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Dokumen Otomatis</h3>
              <p class="text-gray-600 leading-relaxed px-4 text-sm">
                SIGAP menghasilkan file KAK, dan surat teguran resmi dalam format PDF.
              </p>
            </div>

            <div class="text-center p-4">
              <div class="w-16 h-16 mx-auto flex items-center justify-center mb-6">
                 <img src="assets/svg/features/notifikasi-instan.svg" alt="Notifikasi Instan Icon" class="w-28 h-28">
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Notifikasi Instan</h3>
              <p class="text-gray-600 leading-relaxed px-4 text-sm">
                Terima pemberitahuan otomatis setiap ada pembaruan atau permintaan revisi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Roles Section -->
      <section id="landingRoles" class="section-py py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto">
          <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4">TOP ROLES</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Siapa yang Menggunakan SIGAP?
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Siap digunakan dengan peran berbeda untuk stakeholder yang terlibat dalam proses pengajuan dan persetujuan.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <!-- Role 1: Pengusul -->
            <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-200 hover:-translate-y-2">
              <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Pengusul</h3>
              <p class="text-gray-600 leading-relaxed text-center text-sm">
                Mengusulkan KAK & LPJ langsung melalui sistem digital, siap menyediakan seluruh data dengan mudah dan cepat.
              </p>
            </div>

            <!-- Role 2: Verifikator -->
            <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-green-200 hover:-translate-y-2">
              <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Verifikator</h3>
              <p class="text-gray-600 leading-relaxed text-center text-sm">
                Melakukan verifikasi dokumen terhadap suatu usulan yang di review, dari verifikasi persyaratan hingga data.
              </p>
            </div>

            <!-- Role 3: WD2 & PPK -->
            <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-cyan-200 hover:-translate-y-2">
              <div class="w-16 h-16 bg-cyan-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">WD2 & PPK</h3>
              <p class="text-gray-600 leading-relaxed text-center text-sm">
                Memberikan persetujuan atau pengajuan akhir terkadap usulan kegiatan sebelum disetujui.
              </p>
            </div>

            <!-- Role 4: Bendahara -->
            <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:-translate-y-2">
              <div class="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 text-center">Bendahara</h3>
              <p class="text-gray-600 leading-relaxed text-center text-sm">
                Melakukan pencairan dana dan memvalidasi transaksi keuangan dari setiap laporan LPJ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section id="landingFAQ" class="section-py py-20 px-4 bg-white">
        <div class="container mx-auto">
          <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Frequently asked <span class="text-[#33C8DA]">questions</span>
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Punya Pertanyaan? Kami siap bantu.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <!-- Left Side: Image -->
            <div class="order-2 lg:order-1">
              <img src="assets/img/front-pages/landing-page/faq-boy-with-logos.png" alt="FAQ Illustration" class="w-full max-w-md mx-auto">
            </div>

            <!-- Right Side: FAQ Items -->
            <div class="order-1 lg:order-2 space-y-4">
              <!-- FAQ 1 -->
              <div class="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Siapa yang bisa menggunakan SIGAP?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] text-justify">
                      SIGAP dapat digunakan oleh seluruh civitas akademika Politeknik Negeri Jakarta yang terlibat dalam proses pengajuan dan persetujuan kegiatan kampus. Ini mencakup empat peran utama: <strong>Pengusul</strong> (dosen dan staff yang mengajukan kegiatan), <strong>Verifikator</strong> (yang melakukan review dan verifikasi dokumen), <strong>WD2 & PPK</strong> (yang memberikan persetujuan akhir), dan <strong>Bendahara</strong> (yang mengelola pencairan dana). Setiap peran memiliki akses dan fitur yang disesuaikan dengan tanggung jawabnya.
                    </p>
                  </div>
                </div>
              </div>

              <!-- FAQ 2 -->
              <div class="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Apakah data saya aman?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] text-justify">
                      Keamanan data adalah prioritas utama kami. SIGAP menggunakan <strong>enkripsi tingkat enterprise</strong> dan sistem keamanan berlapis untuk melindungi semua informasi dan dokumen yang Anda unggah. Data disimpan di server yang aman dengan backup rutin, dilindungi oleh firewall, dan hanya dapat diakses oleh pihak yang berwenang sesuai dengan peran masing-masing. Kami juga menerapkan <strong>audit trail</strong> lengkap untuk setiap aktivitas, memastikan transparansi dan akuntabilitas penuh. Sistem kami mematuhi standar keamanan data nasional dan best practices internasional.
                    </p>
                  </div>
                </div>
              </div>

              <!-- FAQ 3 -->
              <div class="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Apa saja fitur utama yang ditawarkan?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] mb-3">
                      SIGAP menyediakan berbagai fitur lengkap untuk memudahkan proses administrasi kegiatan kampus:
                    </p>
                    <ul class="space-y-2 text-gray-700 text-[14px] lg:text-[15px] ">
                      <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-[#33C8DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span><strong>Pengajuan Digital KAK & LPJ</strong> - Buat dan kirim pengajuan secara online tanpa perlu dokumen fisik</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-[#33C8DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span><strong>Sistem Revisi Terstruktur</strong> - Kelola revisi dengan jelas dan mudah dilacak</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-[#33C8DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span><strong>Pelacakan Real-Time</strong> - Pantau status usulan Anda kapan saja</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-[#33C8DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span><strong>Dokumen Otomatis</strong> - Sistem menghasilkan dokumen dengan format standar</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-[#33C8DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span><strong>Notifikasi Instan</strong> - Dapatkan pemberitahuan untuk setiap pembaruan</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <svg class="w-5 h-5 text-[#33C8DA] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span><strong>Dashboard Monitoring</strong> - Visualisasi data dan statistik kegiatan secara komprehensif</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- FAQ 4 -->
              <div class="faq-item bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Bagaimana jika ada revisi?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-gray-50 border-t border-gray-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] mb-3">
                      Sistem revisi di SIGAP dirancang sangat terstruktur dan user-friendly:
                    </p>
                    <ol class="space-y-2 text-gray-700 text-[14px] lg:text-[15px] ml-5 list-decimal">
                      <li><strong>Notifikasi Otomatis</strong> - Anda langsung menerima pemberitahuan saat ada permintaan revisi</li>
                      <li><strong>Catatan Jelas</strong> - Detail revisi yang diminta tertera dengan jelas beserta alasannya</li>
                      <li><strong>Riwayat Lengkap</strong> - Lihat semua histori revisi dari awal hingga akhir</li>
                      <li><strong>Panduan Perbaikan</strong> - Template dan panduan membantu Anda melakukan revisi dengan benar</li>
                      <li><strong>Resubmit Mudah</strong> - Kirim ulang dokumen yang sudah diperbaiki dengan satu klik</li>
                      <li><strong>Tracking Progress</strong> - Pantau status revisi Anda secara real-time</li>
                    </ol>
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] mt-3">
                      Semua proses revisi tercatat dengan baik untuk memastikan transparansi dan akuntabilitas maksimal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="landingContact" class="section-py py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div class="container mx-auto">
          <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4">CONTACT</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Hubungi <span class="text-[#33C8DA]">Tim SIGAP</span>
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda dengan cepat dan responsif.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <!-- Left Side: Contact Image -->
            <div class="relative">
              <div class="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-[#33C8DA]/20">
                <img src="assets/img/front-pages/landing-page/contact-customer-service.png" alt="Customer Service" class="w-full rounded-xl mb-6">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Email -->
                  <div class="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-[#33C8DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500 mb-1">Email</p>
                      <a href="mailto:Sigap@pnj.ac.id" class="text-sm font-semibold text-gray-900 hover:text-[#33C8DA]">Sigap@pnj.ac.id</a>
                    </div>
                  </div>

                  <!-- Phone -->
                  <div class="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-xs text-gray-500 mb-1">Phone</p>
                      <a href="tel:+6234088963" class="text-sm font-semibold text-gray-900 hover:text-[#33C8DA]">+6234 088 963</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Side: Contact Form -->
            <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Kirim sebuah pesan</h3>
              <p class="text-gray-600 mb-6">
                Ada pertanyaan atau ingin diskusi tentang SIGAP? Hubungi kami melalui formulir di bawah ini, tim kami siap membantu Anda dan memberikan solusi terbaik.
              </p>

              <form class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                    <input type="text" id="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent outline-none transition-all" placeholder="John Doe">
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent outline-none transition-all" placeholder="john@example.com">
                  </div>
                </div>
                <div>
                  <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                  <input type="tel" id="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent outline-none transition-all" placeholder="+62 812 3456 7890">
                </div>
                <div>
                  <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">Pesan</label>
                  <textarea id="message" rows="5" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#33C8DA] focus:border-transparent outline-none transition-all resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>
                <button type="submit" class="w-full bg-[#33C8DA] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#2BA9B8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer from Footer.js will be added here -->
    <div id="footer"></div>
  `;

  // Clear and add main content to root element
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = mainContent;
  } else {
    console.error("Root element #root not found.");
  }

  // Import and run createFooter from Footer.js
  createFooter();

  // Toggle mobile menu logic
  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // FAQ toggle functionality
  window.toggleFAQ = function(button) {
    const faqItem = button.closest('.faq-item');
    const content = faqItem.querySelector('.faq-content');
    const icon = faqItem.querySelector('.faq-icon');
    const isActive = faqItem.classList.contains('faq-active');

    // Close all FAQs first
    document.querySelectorAll('.faq-item').forEach(item => {
      const itemContent = item.querySelector('.faq-content');
      const itemIcon = item.querySelector('.faq-icon');
      const itemButton = item.querySelector('.faq-button');
      
      item.classList.remove('faq-active', 'border-[#33C8DA]', 'border-2');
      item.classList.add('border-gray-200');
      itemContent.style.maxHeight = '0';
      itemIcon.style.transform = 'rotate(0deg)';
      itemIcon.classList.remove('text-[#33C8DA]');
      itemIcon.classList.add('text-gray-400');
      itemButton.classList.remove('bg-cyan-50');
      
      // Remove cyan background from content
      const contentDiv = itemContent.querySelector('div');
      if (contentDiv) {
        contentDiv.classList.remove('bg-cyan-50/50', 'border-cyan-100');
        contentDiv.classList.add('bg-gray-50', 'border-gray-100');
      }
    });

    // Toggle current FAQ if it wasn't active
    if (!isActive) {
      faqItem.classList.add('faq-active', 'border-[#33C8DA]', 'border-2');
      faqItem.classList.remove('border-gray-200');
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.style.transform = 'rotate(90deg)';
      icon.classList.remove('text-gray-400');
      icon.classList.add('text-[#33C8DA]');
      button.classList.add('bg-cyan-50');
      
      // Add cyan background to content
      const contentDiv = content.querySelector('div');
      if (contentDiv) {
        contentDiv.classList.remove('bg-gray-50', 'border-gray-100');
        contentDiv.classList.add('bg-cyan-50/50', 'border-cyan-100');
      }
    }
  };

  // 3D Multi-Layer Dashboard Animation
  const dashboardContainer = document.getElementById('heroAnimationImg');
  const dashboardBg = document.getElementById('dashboard-bg');
  const dashboardElements = document.getElementById('dashboard-elements');

  if (dashboardContainer && dashboardBg && dashboardElements) {
    dashboardContainer.addEventListener('mousemove', (e) => {
      const rect = dashboardContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // INCREASED from 5 to 8 for more rotation
      const rotateX = ((y - centerY) / centerY) * 6; 
      const rotateY = ((x - centerX) / centerX) * 6;
      
      // Apply transforms
      // Layer 1 (BG) rotates and moves slightly
      dashboardBg.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

      // Layer 2 (Elements) rotates and moves *more*
      // INCREASED from 1.5 to 2.5 for more depth
      const elementTranslateX = rotateY * 1; 
      const elementTranslateY = -rotateX * 1;
      dashboardElements.style.transform = `translateX(${elementTranslateX}px) translateY(${elementTranslateY}px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    dashboardContainer.addEventListener('mouseleave', () => {
      // Reset both images
      dashboardBg.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      dashboardElements.style.transform = 'translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }
}