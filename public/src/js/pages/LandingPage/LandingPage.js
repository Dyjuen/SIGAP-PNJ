import { createFooter } from "./Footer.js";
import { createNavbar } from "./Navbar.js";
import { ShaderBackground } from "./ShaderBackground.js";

export function renderLandingPage(userRole) {
  const featuresStyle = `
  /* AOS Base Styles */
  [data-aos] {
    opacity: 0;
    transition-property: transform, opacity;
  }

  [data-aos].aos-animate {
    opacity: 1;
  }

  /* Fade Animations */
  [data-aos="fade-up"] {
    transform: translateY(60px);
  }

  [data-aos="fade-up"].aos-animate {
    transform: translateY(0);
  }

  [data-aos="fade-down"] {
    transform: translateY(-60px);
  }

  [data-aos="fade-down"].aos-animate {
    transform: translateY(0);
  }

  [data-aos="fade-left"] {
    transform: translateX(80px);
  }

  [data-aos="fade-left"].aos-animate {
    transform: translateX(0);
  }

  [data-aos="fade-right"] {
    transform: translateX(-80px);
  }

  [data-aos="fade-right"].aos-animate {
    transform: translateX(0);
  }

  /* Zoom Animations */
  [data-aos="zoom-in"] {
    transform: scale(0.8);
  }

  [data-aos="zoom-in"].aos-animate {
    transform: scale(1);
  }

  [data-aos="zoom-out"] {
    transform: scale(1.2);
  }

  [data-aos="zoom-out"].aos-animate {
    transform: scale(1);
  }

  /* Flip Animations */
  [data-aos="flip-left"] {
    transform: perspective(2500px) rotateY(-100deg);
  }

  [data-aos="flip-left"].aos-animate {
    transform: perspective(2500px) rotateY(0);
  }

  [data-aos="flip-right"] {
    transform: perspective(2500px) rotateY(100deg);
  }

  [data-aos="flip-right"].aos-animate {
    transform: perspective(2500px) rotateY(0);
  }

  /* Slide Animations */
  [data-aos="slide-up"] {
    transform: translateY(100%);
  }

  [data-aos="slide-up"].aos-animate {
    transform: translateY(0);
  }

  /* Scroll Reveal Animation */
  .feature-card {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.5s ease, border-color 0.3s ease;
  }

  .feature-card.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .feature-header {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }

  .feature-header.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  /* Floating animation for icons on hover */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .feature-card:hover img {
    animation: float 2s ease-in-out infinite;
  }

  /* Pulse ring effect on hover */
  .feature-card::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(51, 200, 218, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    pointer-events: none;
    z-index: 0;
  }

  .feature-card:hover::before {
    width: 300px;
    height: 300px;
  }

  /* Hero CTA Button Animation - Same as Navbar */
  .hero-cta-btn {
    position: relative;
    overflow: hidden;
  }
  
  .hero-cta-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  
  .hero-cta-btn:hover::before {
    left: 100%;
  }
  
  .hero-cta-btn:hover .hero-cta-icon {
    animation: nudge 0.4s ease;
  }

  @keyframes nudge {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
  }
  `;

  const mainContent = `
    <div>
      <!-- Navbar -->
      ${createNavbar()}

<!-- HERO SECTION -->
<section id="landingHero" class="relative pt-32 pb-20 px-4 overflow-hidden bg-white">
  <!-- Background Image -->
  <div class="absolute top-0 left-0 w-full h-[95vh] rounded-b-[80px]" style="overflow: hidden;">
    <img 
      id="hero-bg-img" src="assets/img/backgrounds/bg-100.png" 
      alt="Hero Background" 
      class="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      style="will-change: transform;"
    />
    <!-- Gradient fade yang lebih smooth -->
    <div class="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-white via-white/98 via-40% to-transparent pointer-events-none"></div>
  </div>

  <div class="container mx-auto relative z-10">
    <!-- Hero Text -->
    <div class="text-center max-w-4xl mx-auto mb-16">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight" data-aos="fade-down" data-aos-duration="1000">
        <span class="text-[#33C8DA]">Sistem Informasi Gerbang Administrasi Pengajuan KAK & LPJ</span> 
      </h1>
      <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        SIGAP PNJ memudahkan seluruh proses administrasi kegiatan<br class="hidden md:block">
        di kampus secara cepat, transparan, dan efisien.
      </p>
      <a href="/login" class="hero-cta-btn inline-flex items-center bg-[#33C8DA] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#2BA9B8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
        <svg class="hero-cta-icon w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
          <path d="M21 12h-13l3 -3" />
          <path d="M11 15l-3 -3" />
        </svg>
        <span class="whitespace-nowrap">Masuk Ke Aplikasi</span>
      </a>
    </div>

    <!-- Dashboard Preview -->
    <div class="relative max-w-5xl mx-auto" id="heroDashboard" style="perspective: 1000px;" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600">
      <div id="heroAnimationImg" class="relative hero-dashboard-img rounded-2xl shadow-2xl border border-gray-100 overflow-hidden bg-white" 
        style="transform-style: preserve-3d; transition: transform 0.15s ease-out; transform-origin: center center;">  
        
        <img 
          id="dashboard-bg"
          src="assets/img/previews/dashboard-preview.png" 
          alt="SIGAP Dashboard Background" 
          class="w-full h-auto rounded-2xl"
          style="transition: transform 0.1s ease-out;"
        >
        
        <img 
          id="dashboard-elements"
          src="assets/img/previews/dashboard-elements.png" 
          alt="SIGAP Dashboard Elements" 
          class="absolute top-0 left-0 w-full h-auto pointer-events-none"
          style="transition: transform 0.1s ease-out;"
        >
      </div>
    </div>
  </div>
</section>

<!-- GRADIENT BLEND SECTION - Smooth transition dari Hero ke Features -->
<div class="h-32 bg-gradient-to-b from-white via-gray-50/50 to-white relative">
  <!-- Optional: subtle curved shape -->
  <svg class="absolute top-0 left-0 w-full h-16 text-white" viewBox="0 0 1440 60" fill="currentColor" preserveAspectRatio="none">
    <path d="M0,0 C480,60 960,60 1440,0 L1440,0 L0,0 Z"/>
  </svg>
</div>

<!-- FEATURES SECTION -->
<section id="landingFeatures" class="section-py pt-8 pb-20 px-4 bg-white relative">
  <div class="container mx-auto">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4" data-aos="fade-down" data-aos-duration="800">Fitur Utama</span>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
        <span class="text-[#33C8DA]">Semua Proses,</span> Satu Sistem.
      </h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        SIGAP membantu setiap peran dari pengusul hingga pimpinan, bekerja lebih cepat dan transparan.
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div class="feature-card group text-center p-6 rounded-2xl border border-gray-100 hover:bg-cyan-50/50 hover:border-cyan-200 transition-all duration-300" data-aos="flip-left" data-aos-duration="1000" data-aos-delay="100">
        <div class="w-20 h-20 mx-auto flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
          <img src="assets/svg/features/pengajuan-digital.svg" alt="Pengajuan Digital Icon" class="w-12 h-12">
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#33C8DA] transition-colors duration-300">Pengajuan Digital</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          Buat dan kirim usulan KAK & LPJ langsung melalui sistem tanpa dokumen fisik.
        </p>
      </div>

      <div class="feature-card group text-center p-6 rounded-2xl border border-gray-100 hover:bg-cyan-50/50 hover:border-cyan-200 transition-all duration-300" data-aos="flip-left" data-aos-duration="1000" data-aos-delay="200">
        <div class="w-20 h-20 mx-auto flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
          <img src="assets/svg/features/revisi-terstruktur.svg" alt="Revisi Terstruktur Icon" class="w-12 h-12">
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#33C8DA] transition-colors duration-300">Revisi Terstruktur</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          Setiap revisi tercatat dengan komentar jelas dari verifikator atau pimpinan.
        </p>
      </div>

      <div class="feature-card group text-center p-6 rounded-2xl border border-gray-100 hover:bg-cyan-50/50 hover:border-cyan-200 transition-all duration-300" data-aos="flip-left" data-aos-duration="1000" data-aos-delay="300">
        <div class="w-20 h-20 mx-auto flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
          <img src="assets/svg/features/pelacakan-real-time.svg" alt="Pelacakan Real-Time Icon" class="w-12 h-12">
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#33C8DA] transition-colors duration-300">Pelacakan Real-Time</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          Lihat status usulan kapan saja: dari validasi hingga persetujuan akhir.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
      <div class="feature-card group text-center p-6 rounded-2xl border border-gray-100 hover:bg-cyan-50/50 hover:border-cyan-200 transition-all duration-300" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="400">
        <div class="w-20 h-20 mx-auto flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
          <img src="assets/svg/features/dokumen-otomatis.svg" alt="Dokumen Otomatis Icon" class="w-12 h-12">
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#33C8DA] transition-colors duration-300">Dokumen Otomatis</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          SIGAP menghasilkan file KAK, dan surat teguran resmi dalam format PDF.
        </p>
      </div>

      <div class="feature-card group text-center p-6 rounded-2xl border border-gray-100 hover:bg-cyan-50/50 hover:border-cyan-200 transition-all duration-300" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="500">
        <div class="w-20 h-20 mx-auto flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl group-hover:scale-105 transition-transform duration-300">
          <img src="assets/svg/features/notifikasi-instan.svg" alt="Notifikasi Instan Icon" class="w-12 h-12">
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#33C8DA] transition-colors duration-300">Notifikasi Instan</h3>
        <p class="text-gray-600 leading-relaxed text-sm">
          Terima pemberitahuan otomatis setiap ada pembaruan atau permintaan revisi.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Roles Section - UNIFIED CYAN VERSION -->
<section id="landingRoles" class="section-py py-20 px-4 relative overflow-hidden">
  <!-- Gradient blend dari Features (putih) -->
  <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-[6] pointer-events-none"></div>
  
  <!-- Shader Background Canvas -->
  <canvas id="rolesShaderBg" class="absolute top-0 left-0 w-full h-full opacity-100 pointer-events-none"></canvas>
  
  <!-- Gradient blend ke FAQ (putih) -->
  <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-[6] pointer-events-none"></div>
  
  <div class="container mx-auto relative z-10">
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4" data-aos="fade-down" data-aos-duration="800">ROLES</span>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
        Siapa yang Menggunakan <span class="text-[#33C8DA]">SIGAP?</span>
      </h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        Siap digunakan dengan peran berbeda untuk stakeholder yang terlibat dalam proses pengajuan dan persetujuan.
      </p>
    </div>

    <!-- Row 1: 3 cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-6">
      
      <!-- Role 1: Pengusul -->
      <div class="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-300 hover:-translate-y-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="100">
        <div class="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
          <svg class="w-8 h-8 text-[#33C8DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-[#33C8DA] transition-colors duration-300">Pengusul</h3>
        <p class="text-gray-600 leading-relaxed text-center text-sm">
          Mengusulkan KAK & LPJ langsung melalui sistem digital, siap menyediakan seluruh data dengan mudah dan cepat.
        </p>
      </div>

      <!-- Role 2: Verifikator -->
      <div class="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-300 hover:-translate-y-1" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
        <div class="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
          <svg class="w-8 h-8 text-[#33C8DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-[#33C8DA] transition-colors duration-300">Verifikator</h3>
        <p class="text-gray-600 leading-relaxed text-center text-sm">
          Melakukan verifikasi dokumen terhadap suatu usulan yang di review, dari verifikasi persyaratan hingga data.
        </p>
      </div>

      <!-- Role 3: WD2 & PPK -->
      <div class="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-300 hover:-translate-y-1" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
        <div class="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
          <svg class="w-8 h-8 text-[#33C8DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-[#33C8DA] transition-colors duration-300">WD2 & PPK</h3>
        <p class="text-gray-600 leading-relaxed text-center text-sm">
          Memberikan persetujuan atau pengajuan akhir terhadap usulan kegiatan sebelum disetujui.
        </p>
      </div>
    </div>

    <!-- Row 2: 2 cards centered -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      
      <!-- Role 4: Bendahara -->
      <div class="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-300 hover:-translate-y-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400">
        <div class="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
          <svg class="w-8 h-8 text-[#33C8DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-[#33C8DA] transition-colors duration-300">Bendahara</h3>
        <p class="text-gray-600 leading-relaxed text-center text-sm">
          Melakukan pencairan dana dan memvalidasi transaksi keuangan dari setiap laporan LPJ.
        </p>
      </div>

      <!-- Role 5: Rektorat -->
      <div class="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-cyan-300 hover:-translate-y-1" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">
        <div class="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-transform duration-300">
          <svg class="w-8 h-8 text-[#33C8DA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-[#33C8DA] transition-colors duration-300">Rektorat</h3>
        <p class="text-gray-600 leading-relaxed text-center text-sm">
          Memantau dan mengawasi seluruh aktivitas sistem sebagai observer untuk transparansi dan akuntabilitas.
        </p>
      </div>
    </div>
  </div>
</section>

      <!-- FAQ Section -->
      <section id="landingFAQ" class="section-py py-20 px-4 bg-white">
        <div class="container mx-auto">
          <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4" data-aos="fade-down" data-aos-duration="800">FAQ</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              Frequently asked <span class="text-[#33C8DA]">questions</span>
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              Punya Pertanyaan? Kami siap bantu.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <!-- Left Side: Image -->
            <div class="order-2 lg:order-1" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
              <img src="assets/img/front-pages/landing-page/faq-boy-with-logos.png" alt="FAQ Illustration" class="w-full max-w-md mx-auto">
            </div>

            <!-- Right Side: FAQ Items -->
            <div class="order-1 lg:order-2 space-y-4">
              <!-- FAQ 1 -->
              <div class="faq-item bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-cyan-200 transition-all" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="100">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Siapa yang bisa menggunakan SIGAP?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-cyan-50/30 border-t border-cyan-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] text-justify">
                      SIGAP dapat digunakan oleh seluruh civitas akademika Politeknik Negeri Jakarta yang terlibat dalam proses pengajuan dan persetujuan kegiatan kampus. Ini mencakup empat peran utama: <strong>Pengusul</strong> (dosen dan staff yang mengajukan kegiatan), <strong>Verifikator</strong> (yang melakukan review dan verifikasi dokumen), <strong>WD2 & PPK</strong> (yang memberikan persetujuan akhir), dan <strong>Bendahara</strong> (yang mengelola pencairan dana).
                    </p>
                  </div>
                </div>
              </div>

              <!-- FAQ 2 -->
              <div class="faq-item bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-cyan-200 transition-all" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Apakah data saya aman?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-cyan-50/30 border-t border-cyan-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] text-justify">
                      Keamanan data adalah prioritas utama kami. SIGAP menggunakan <strong>enkripsi tingkat enterprise</strong> dan sistem keamanan berlapis untuk melindungi semua informasi. Kami juga menerapkan <strong>audit trail</strong> lengkap untuk setiap aktivitas.
                    </p>
                  </div>
                </div>
              </div>

              <!-- FAQ 3 -->
              <div class="faq-item bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-cyan-200 transition-all" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Apa saja fitur utama yang ditawarkan?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-cyan-50/30 border-t border-cyan-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px] mb-3">
                      SIGAP menyediakan: Pengajuan Digital KAK & LPJ, Sistem Revisi Terstruktur, Pelacakan Real-Time, Dokumen Otomatis, Notifikasi Instan, dan Dashboard Monitoring.
                    </p>
                  </div>
                </div>
              </div>

              <!-- FAQ 4 -->
              <div class="faq-item bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-cyan-200 transition-all" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
                <button class="faq-button w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onclick="toggleFAQ(this)">
                  <span class="font-semibold text-gray-900 text-[15px] lg:text-base">Bagaimana jika ada revisi?</span>
                  <svg class="faq-icon w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                  <div class="px-6 py-5 bg-cyan-50/30 border-t border-cyan-100">
                    <p class="text-gray-700 leading-relaxed text-[14px] lg:text-[15px]">
                      Sistem revisi di SIGAP sangat terstruktur: Notifikasi Otomatis, Catatan Jelas, Riwayat Lengkap, Panduan Perbaikan, Resubmit Mudah, dan Tracking Progress real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="landingContact" class="section-py py-20 px-4 relative overflow-hidden">
        <!-- Background gradient blend ke footer -->
        <div class="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-[#2BA9B8]/5 pointer-events-none"></div>
        
        <div class="container mx-auto relative z-10">
          <div class="text-center mb-16">
            <span class="inline-block px-4 py-2 bg-cyan-100 text-[#33C8DA] rounded-full text-sm font-semibold mb-4" data-aos="fade-down" data-aos-duration="800">CONTACT</span>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
              Hubungi <span class="text-[#33C8DA]">Tim SIGAP</span>
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
              Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <!-- Left Side: Contact Image -->
            <div class="relative" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
              <div class="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-[#33C8DA]/20">
                <img src="assets/img/front-pages/landing-page/contact-customer-service.png" alt="Customer Service" class="w-full rounded-xl mb-6">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div class="bg-white rounded-2xl p-8 shadow-xl border border-gray-100" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Kirim sebuah pesan</h3>
              <p class="text-gray-600 mb-6">Ada pertanyaan? Hubungi kami melalui formulir di bawah ini.</p>

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

    <!-- Footer -->
    <div id="footer"></div>
  `;

  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = mainContent;
  } else {
    console.error("Root element #root not found.");
    return;
  }

  // Inject styles
  const styleTag = document.createElement('style');
  styleTag.innerHTML = featuresStyle;
  document.head.appendChild(styleTag);

  createFooter();

  // Initialize AOS
  function initAOS() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-aos-delay') || 0;
          const duration = entry.target.getAttribute('data-aos-duration') || 1000;
          
          entry.target.style.transitionDuration = `${duration}ms`;
          entry.target.style.transitionDelay = `${delay}ms`;
          
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, 10);
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  initAOS();

  let shaderBg = null;
  setTimeout(() => {
    const rolesCanvas = document.getElementById('rolesShaderBg');
    if (rolesCanvas) {
      shaderBg = new ShaderBackground('rolesShaderBg');
    }
  }, 100);

  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  window.toggleFAQ = function(button) {
    const faqItem = button.closest('.faq-item');
    const content = faqItem.querySelector('.faq-content');
    const icon = faqItem.querySelector('.faq-icon');
    const isActive = faqItem.classList.contains('faq-active');

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
      
      const contentDiv = itemContent.querySelector('div');
      if (contentDiv) {
        contentDiv.classList.remove('bg-cyan-50/50', 'border-cyan-100');
        contentDiv.classList.add('bg-gray-50', 'border-gray-100');
      }
    });

    if (!isActive) {
      faqItem.classList.add('faq-active', 'border-[#33C8DA]', 'border-2');
      faqItem.classList.remove('border-gray-200');
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.style.transform = 'rotate(90deg)';
      icon.classList.remove('text-gray-400');
      icon.classList.add('text-[#33C8DA]');
      button.classList.add('bg-cyan-50');
      
      const contentDiv = content.querySelector('div');
      if (contentDiv) {
        contentDiv.classList.remove('bg-gray-50', 'border-gray-100');
        contentDiv.classList.add('bg-cyan-50/50', 'border-cyan-100');
      }
    }
  };

  // 3D Multi-Layer Dashboard Animation - FULLY FIXED
  const heroDashboard = document.getElementById('heroDashboard');
  const dashboardContainer = document.getElementById('heroAnimationImg');
  const dashboardBg = document.getElementById('dashboard-bg');
  const dashboardElements = document.getElementById('dashboard-elements');

  if (heroDashboard && dashboardContainer && dashboardBg && dashboardElements) {
    
    // PENTING: Perspective harus di PARENT container, bukan di element yang di-transform
    heroDashboard.style.perspective = '1000px';
    heroDashboard.style.perspectiveOrigin = 'center center';
    
    // Reset style dari inline HTML
    dashboardContainer.style.perspective = 'none';
    dashboardContainer.style.transformStyle = 'preserve-3d';
    dashboardContainer.style.transformOrigin = 'center center';
    dashboardContainer.style.transition = 'transform 0.1s ease-out';
    
    // Style untuk layer images
    dashboardBg.style.transition = 'transform 0.1s ease-out';
    dashboardElements.style.transition = 'transform 0.1s ease-out';
    
    // Gunakan PARENT container untuk detect mouse, bukan card itu sendiri
    heroDashboard.addEventListener('mousemove', (e) => {
      const rect = heroDashboard.getBoundingClientRect();
      
      // Posisi mouse relatif ke container (0 sampai 1)
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = (e.clientY - rect.top) / rect.height;
      
      // Convert ke range -1 sampai 1 (center = 0)
      const normalizedX = (mouseX - 0.5) * 2;
      const normalizedY = (mouseY - 0.5) * 2;
      
      // Rotation settings
      const maxRotation = 10;
      
      // Calculate rotation
      const rotateY = normalizedX * maxRotation;
      const rotateX = -normalizedY * maxRotation;
      
      // Apply transform ke card
      dashboardContainer.style.transform = `
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale3d(1.02, 1.02, 1.02)
      `;
      
      // Parallax effect untuk depth
      const parallax = 8;
      dashboardBg.style.transform = `translateX(${normalizedX * parallax}px) translateY(${normalizedY * parallax}px)`;
      dashboardElements.style.transform = `translateX(${-normalizedX * parallax * 1.5}px) translateY(${-normalizedY * parallax * 1.5}px)`;
    });

    heroDashboard.addEventListener('mouseleave', () => {
      dashboardContainer.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      dashboardBg.style.transform = 'translateX(0) translateY(0)';
      dashboardElements.style.transform = 'translateX(0) translateY(0)';
    });
  }

  // Scroll Reveal for Features Section
  function initFeaturesAnimation() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe header
    const header = document.querySelector('.feature-header');
    if (header) observer.observe(header);

    // Observe cards
    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });
  }

  initFeaturesAnimation();

  return () => {
    if (shaderBg) {
      shaderBg.destroy();
    }
  };
}