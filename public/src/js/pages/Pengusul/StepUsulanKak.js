// frontend/src/pages/Pengusul/UsulanKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderUsulanKakPage(path, userRole) {
  const pathSegments = path.split("/").filter((segment) => segment);
  const kakId =
    pathSegments.length > 2 &&
    pathSegments[1] === "usulan" &&
    /^\d+$/.test(pathSegments[2]) // Check if the ID is a number
      ? pathSegments[2]
      : null;
  const isEditMode = kakId !== null;

  let isInitialized = false; // DEBUG: Initialization Guard

  const pageContent = `
    <!-- Add required CSS for daterangepicker in the head section -->
    <link rel="stylesheet" href="../../assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css" />
    
    <style>
      /* Border Drawing Animation - SUPER SMOOTH VERSION with POP-UP */
      .border-hover-draw {
        position: relative;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* Subtle pop-up effect saat hover */
      .border-hover-draw:hover {
        transform: translateY(-4px) scale(1.01);
      }

      .border-hover-draw::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 12px;
        padding: 2px;
        background: linear-gradient(135deg, #00BCD4, #00E5FF, #00BCD4);
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        
        /* Default state: hidden di tengah bawah */
        clip-path: polygon(
          50% 100%, 50% 100%,
          50% 100%, 50% 100%,
          50% 100%, 50% 100%,
          50% 100%, 50% 100%
        );
        
        /* Smooth reverse animation by default */
        animation: borderDrawReverse 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
      }

      /* Forward animation saat hover - SUPER SMOOTH */
      .border-hover-draw:hover::before {
        animation: borderDrawForward 0.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
      }

      /* ====== FORWARD ANIMATION (Mouse IN) ====== */
      /* Bawah → Kiri/Kanan → Atas */
      @keyframes borderDrawForward {
        0% {
          /* Start: titik tengah bawah */
          clip-path: polygon(
            50% 100%, 50% 100%,
            50% 100%, 50% 100%,
            50% 100%, 50% 100%,
            50% 100%, 50% 100%
          );
        }
        
        30% {
          /* Garis bawah expand smooth ke kiri-kanan */
          clip-path: polygon(
            0% 100%, 0% 100%,
            0% 100%, 50% 100%,
            50% 100%, 100% 100%,
            100% 100%, 100% 100%
          );
        }
        
        70% {
          /* Border kiri & kanan naik bersamaan ke atas (SMOOTH!) */
          clip-path: polygon(
            0% 100%, 0% 0%,
            0% 0%, 50% 0%,
            50% 0%, 100% 0%,
            100% 0%, 100% 100%
          );
        }
        
        100% {
          /* Complete: border penuh dengan slight overshoot */
          clip-path: polygon(
            0% 100%, 0% 0%,
            0% 0%, 50% 0%,
            50% 0%, 100% 0%,
            100% 0%, 100% 100%
          );
        }
      }

      /* ====== REVERSE ANIMATION (Mouse OUT) ====== */
      /* Atas → Kiri/Kanan → Bawah */
      @keyframes borderDrawReverse {
        0% {
          /* Start: border penuh */
          clip-path: polygon(
            0% 100%, 0% 0%,
            0% 0%, 50% 0%,
            50% 0%, 100% 0%,
            100% 0%, 100% 100%
          );
        }
        
        30% {
          /* Garis atas & border kiri-kanan turun smooth */
          clip-path: polygon(
            0% 100%, 0% 100%,
            0% 100%, 50% 100%,
            50% 100%, 100% 100%,
            100% 100%, 100% 100%
          );
        }
        
        70% {
          /* Garis bawah mulai menyusut ke tengah */
          clip-path: polygon(
            25% 100%, 25% 100%,
            25% 100%, 50% 100%,
            50% 100%, 75% 100%,
            75% 100%, 75% 100%
          );
        }
        
        100% {
          /* End: hilang di tengah bawah */
          clip-path: polygon(
            50% 100%, 50% 100%,
            50% 100%, 50% 100%,
            50% 100%, 50% 100%,
            50% 100%, 50% 100%
          );
        }
      }

      /* Bonus: Input subtle lift + shadow + glow saat hover */
      .border-hover-draw:hover input,
      .border-hover-draw:hover textarea,
      .border-hover-draw:hover select {
        border-color: rgba(0, 188, 212, 0.4) !important;
        box-shadow: 
          0 8px 24px rgba(0, 188, 212, 0.12),
          0 0 0 1px rgba(0, 188, 212, 0.1);
        transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* ====== MAIN STEP CONTENT - Border Drawing + Pop-Up ====== */
      .main-step-content {
        display: none;
        position: relative;
      }

      .main-step-content.active {
        display: block;
        animation: 
          fadeIn 0.6s ease-out,
          popUpEntry 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* Wrapper untuk border animation */
      .main-step-content.active > .bg-white {
        position: relative;
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* Border drawing effect (made smoother to match .border-hover-draw) */
      .main-step-content.active > .bg-white::before {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 16px;
        padding: 2px;
        background: linear-gradient(135deg, #00BCD4, #00E5FF, #00BCD4);
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box, 
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: -1;
        opacity: 0;

        /* Default hidden (center-bottom) */
        clip-path: polygon(
          50% 100%, 50% 100%,
          50% 100%, 50% 100%,
          50% 100%, 50% 100%,
          50% 100%, 50% 100%
        );

        /* Smoother animation + slightly longer so it feels natural on page load */
        animation: 
          mainStepBorderDraw 1.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) 0.15s forwards,
          borderFadeIn 0.35s ease-out 0.15s forwards;
      }

      /* Pop-up subtle saat hover */
      .main-step-content.active > .bg-white:hover {
        transform: translateY(-6px) scale(1.005);
      }

      .main-step-content.active > .bg-white:hover::before {
        opacity: 1;
      }

      /* Animasi pop-up entry */
      @keyframes popUpEntry {
        0% {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* Border drawing untuk main step */
      @keyframes mainStepBorderDraw {
        /* 0%: hidden center-bottom */
        0% {
          clip-path: polygon(
            50% 100%, 50% 100%,
            50% 100%, 50% 100%,
            50% 100%, 50% 100%,
            50% 100%, 50% 100%
          );
        }

        /* 20%: bottom expands smoothly left-right */
        20% {
          clip-path: polygon(
            0% 100%, 0% 100%,
            0% 100%, 50% 100%,
            50% 100%, 100% 100%,
            100% 100%, 100% 100%
          );
        }

        /* 45%: sides start rising (soft corner formation) */
        45% {
          clip-path: polygon(
            0% 100%, 0% 65%,
            0% 65%, 50% 65%,
            50% 65%, 100% 65%,
            100% 65%, 100% 100%
          );
        }

        /* 75%: sides rise higher (near final) */
        75% {
          clip-path: polygon(
            0% 100%, 0% 30%,
            0% 30%, 50% 30%,
            50% 30%, 100% 30%,
            100% 30%, 100% 100%
          );
        }

        /* 100%: complete border */
        100% {
          clip-path: polygon(
            0% 100%, 0% 0%,
            0% 0%, 50% 0%,
            50% 0%, 100% 0%,
            100% 0%, 100% 100%
          );
        }
      }

      /* Border fade in */
      @keyframes borderFadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 0.8;
        }
      }

      /* Hover enhancement untuk main step */
      .main-step-content.active > .bg-white:hover::before {
        opacity: 1 !important;
        animation: none; /* Stop animation saat hover */
        clip-path: polygon(
          0% 100%, 0% 0%,
          0% 0%, 50% 0%,
          50% 0%, 100% 0%,
          100% 0%, 100% 100%
        );
      }

      /* FadeIn animation for step content */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* ====== ADDITIONAL ANIMATIONS ====== */
      /* Icon animations */
      .ti {
        transition: all 0.3s ease;
        display: inline-block;
      }

      button:hover .ti {
        transform: scale(1.2) rotate(10deg);
      }

      /* Progress step hover animations */
      .progress-step-item {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .progress-step-item:hover {
        transform: translateY(-3px);
      }

      .progress-step-circle {
        transition: all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .progress-step-item:hover .progress-step-circle {
        box-shadow: 0 8px 20px rgba(0, 188, 212, 0.6);
        transform: rotate(360deg);
      }

      /* Menu button animations */
      .menu-button {
        transition: all 0.4s ease-in-out;
        position: relative;
        overflow: hidden;
      }

      .menu-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.3), transparent);
        transition: left 0.6s ease;
      }

      .menu-button:hover::before {
        left: 100%;
      }

      .menu-button:hover {
        transform: translateY(-3px);
      }

      /* Menu button icon rotation (like stepper circle) */
      .menu-button .w-8 {
        transition: all 0.8s cubic-bezier(0.050, 0.600, 0.165, 1.025);
      }

      .menu-button:hover .w-8 {
        transform: rotate(360deg);
      }

      /* PENTING: MATIKAN transform untuk icon di dalam menu button */
      .menu-button .w-8 .ti {
        transition: none !important;
        transform: none !important;
      }

      .menu-button:hover .w-8 .ti {
        transform: none !important;
      }

      /* Menu button text color transition */
      .menu-button .font-semibold {
        transition: color 0.3s ease;
      }

      .menu-button:hover .font-semibold {
        color: #00ACC1;
      }

      /* Shimmer effect for loading states */
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite;
      }

      /* Button ripple effect */
      button {
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      button::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s ease, height 0.6s ease;
      }

      button:active::after {
        width: 300px;
        height: 300px;
      }

      button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0, 188, 212, 0.3);
      }

      button:active {
        transform: translateY(-1px);
      }

      /* Step content fade in */
      .step-content {
        display: none;
      }

      .step-content.active {
        display: block;
        animation: fadeIn 0.5s ease-out;
      }

      /* Card animations */
      .bg-white.rounded-xl.shadow-lg {
        transition: all 0.7s ease;
      }

      .bg-white.rounded-xl.shadow-lg:hover {
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        transform: translateY(-5px);
      }

      /* Input/textarea transitions */
      input, textarea, select {
        transition: all 0.3s ease;
      }

      /* Backdrop blur hover effect */
      .backdrop-blur-md {
        transition: all 0.7s ease;
      }

      .backdrop-blur-md:hover {
        backdrop-filter: blur(20px) !important;
        background: rgba(255, 255, 255, 0.95) !important;
      }

      /* Smooth scroll */
      html {
        scroll-behavior: smooth;
      }
    </style>
    
    <div class="kerangka-acuan-kerja-page">
      <!-- Progress Steps -->
      <div class="flex justify-center gap-24 mb-8 backdrop-blur-md p-6 rounded-xl shadow-lg" style="background: rgba(255, 255, 255, 0.8);">

        <!-- Step 1 -->
        <div class="progress-step-item flex items-center justify-center gap-3 px-4 cursor-pointer" data-main-step="1">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
               style="background: #00BCD4; color: #FFFFFF; box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);">
            1
          </div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #00BCD4;">Kerangka Acuan Kerja</div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="progress-step-item flex items-center justify-center gap-3 px-4 cursor-pointer" data-main-step="2">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
               style="background: #E5E7EB; color: #6B7280;">
            2
          </div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #6B7280;">Indikator Kinerja Utama</div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="progress-step-item flex items-center justify-center gap-3 px-4 cursor-pointer" data-main-step="3">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
               style="background: #E5E7EB; color: #6B7280;">
            3
          </div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #6B7280;">Rencana Anggaran Biaya</div>
          </div>
        </div>

      </div>

      <!-- Main Step 1: Kerangka Acuan Kerja -->
      <div class="main-step-content active" id="main-step-1">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex gap-8">
            <!-- Sidebar Menu -->
            <div class="flex flex-col gap-4 w-96">
              <button class="menu-button border-2 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3 active" data-menu="gambaran-umum" style="border-color: #00BCD4; background: rgba(0, 188, 212, 0.1);">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style=\"font-size: 5px\" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-file-text">&#xff43;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Gambaran Umum</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="penerima-manfaat">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style=\"font-size: 5px\" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-users">&#xf7cd;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Penerima Manfaat</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="strategi-pencapaian">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style=\"font-size: 5px\" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-target">&#xeb35;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Strategi Pencapaian</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="indikator-kinerja">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style=\"font-size: 5px\" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-chart-bar">&#xea59;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Indikator Kinerja</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="kurun-waktu">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style=\"font-size: 5px\" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-calendar">&#xea53;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Kurun Waktu Pelaksanaan</div>
              </button>
            </div>

            <!-- Main Form Area -->
            <div class="flex-1 min-h-[500px]">
              <div class="border border-gray-200 rounded-xl p-6 border-hover-draw">
                <!-- Step 1: Gambaran Umum -->
                <div class="step-content active" id="gambaran-umum">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Gambaran Umum</h4>
                  
                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nama Kegiatan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input" id="namaKegiatan">
                  </div>

                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Gambaran Umum Kegiatan</label>
                    <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 min-h-[200px] resize-y" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input" id="gambaranUmum"></textarea>
                  </div>
                </div>

                <!-- Step 2: Penerima Manfaat -->
                <div class="step-content" id="penerima-manfaat">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Penerima Manfaat</h4>
                  
                  <div id="penerimaManfaatContainer">
                    <!-- Dynamic rows will be inserted here -->
                  </div>
                  <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onclick="addPenerimaManfaat()">Tambah Penerima Manfaat</button>
                </div>

                <!-- Step 3: Strategi Pencapaian -->
                <div class="step-content" id="strategi-pencapaian">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Strategi Pencapaian</h4>
                  
                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Metode Pelaksanaan</label>
                    <textarea class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 min-h-[200px] resize-y" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input" id="metodePelaksanaan"></textarea>
                  </div>

                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tahapan Pelaksanaan</label>
                    <div id="tahapanPelaksanaanContainer">
                      <!-- Dynamic rows will be inserted here -->
                    </div>
                    <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onclick="addTahapanPelaksanaan()">Tambah</button>
                  </div>
                </div>

                <!-- Step 4: Indikator Kinerja -->
                <div class="step-content" id="indikator-kinerja">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja</h4>
                  
                  <div class="mb-8">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja</label>
                    <div id="indikatorKinerjaContainer">
                      <!-- Dynamic rows will be inserted here -->
                    </div>
                    <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onclick="addIndikatorKinerja()">Tambah</button>
                  </div>
                </div>

                <!-- Step 5: Kurun Waktu Pelaksanaan -->
                <div class="step-content" id="kurun-waktu">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Kurun Waktu Pelaksanaan</h4>
                  
                  <div class="mb-6">
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Period Pelaksanaan</label>
                    <input type="text" id="kurunWaktu" class="form-control w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Select date range" />
                    <small class="text-gray-500 mt-1 block">Pilih tanggal mulai dan tanggal selesai</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" onmouseover="this.style.background='rgba(0, 188, 212, 0.2)';" onmouseout="this.style.background='rgba(0, 188, 212, 0.1)';" id="btnBack">
              <span>←</span> Back
            </button>
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" id="btnNext">
              Next <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Step 2: IKU & Renstra -->
      <div class="main-step-content" id="main-step-2">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h4 class="mb-8 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja Utama</h4>
          
          <div class="mb-8" id="ikuRenstraContainer">
            <!-- Dynamic IKU rows will be inserted here -->
          </div>
          
          <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onclick="addIkuField()">Tambah</button>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" onmouseover="this.style.background='rgba(0, 188, 212, 0.2)';" onmouseout="this.style.background='rgba(0, 188, 212, 0.1)';" id="btnBackIku">
              <span>←</span> Back
            </button>
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" id="btnNextIku">
              Next <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Step 3: Rincian Anggaran Biaya -->
      <div class="main-step-content" id="main-step-3">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h4 class="mb-8 font-bold text-xl" style="color: #00BCD4;">Rencana Anggaran Biaya</h4>
          
          <div id="rab-container">
            <!-- Dynamic RAB sections will be injected here -->
          </div>
          
          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" onmouseover="this.style.background='rgba(0, 188, 212, 0.2)';" onmouseout="this.style.background='rgba(0, 188, 212, 0.1)';" id="btnBackRab">
              <span>←</span> Back
            </button>
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" id="btnSubmitRab">
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>
  `;

  // Render the main layout
  renderDashboardLayout(pageContent, userRole);

  const animationStyle = document.createElement("style");
  animationStyle.textContent = `
    /* Dynamic field animations */
    .dynamic-field-item {
        transition: all 0.4s ease-in-out;
        overflow: hidden;
    }

    .dynamic-field-item.new-item-animation {
        animation: slide-in 0.4s ease-out;
    }
    
    @keyframes slide-in {
        from {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
        }
        to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px; /* Adjust based on content */
        }
    }

    .dynamic-field-item.removing {
      animation: slide-out 0.4s ease-out forwards;
    }

    @keyframes slide-out {
        from {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px; /* Adjust based on content */
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
            margin-top: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            border: none;
        }
    }

    .remove-button {
      display: none; /* Hide by default */
      opacity: 0;
      transform: scale(0.5);
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    .remove-button.visible {
      display: flex;
      opacity: 1;
      transform: scale(1);
    }
  `;
  document.head.appendChild(animationStyle);

  // Add custom CSS for daterangepicker colors and animations
  const style = document.createElement("style");
  style.textContent = `
    /* Daterangepicker theme overrides */
    .daterangepicker { border-color: #00BCD4 !important; }
    .daterangepicker .calendar-table { border-color: #E5F8FB !important; }
    .daterangepicker td.active, .daterangepicker td.active:hover { background-color: #00BCD4 !important; border-color: #00BCD4 !important; color: #FFFFFF !important; }
    .daterangepicker td.in-range { background-color: #E5F8FB !important; color: #374151 !important; }
    .daterangepicker td.available:hover { background-color: #E5F8FB !important; color: #374151 !important; }
    .daterangepicker .ranges li.active { background-color: #00BCD4 !important; color: #FFFFFF !important; }
    .daterangepicker .ranges li:hover { background-color: #E5F8FB !important; color: #374151 !important; }
    .daterangepicker td.start-date, .daterangepicker td.end-date { background-color: #00BCD4 !important; border-color: #00BCD4 !important; color: #FFFFFF !important; }
    .daterangepicker .drp-buttons .btn-primary { background-color: #00BCD4 !important; border-color: #00BCD4 !important; color: #FFFFFF !important; }
    .daterangepicker .drp-buttons .btn-primary:hover { background-color: #0097A7 !important; border-color: #0097A7 !important; }
    .daterangepicker th.month { color: #00BCD4 !important; }
    .daterangepicker td.off, .daterangepicker td.off.in-range, .daterangepicker td.off.start-date, .daterangepicker td.off.end-date { background-color: #F9FAFB !important; color: #9CA3AF !important; }
    .daterangepicker select.monthselect, .daterangepicker select.yearselect { border-color: #E5E7EB !important; }
    .daterangepicker select.monthselect:focus, .daterangepicker select.yearselect:focus { border-color: #00BCD4 !important; outline: none !important; box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1) !important; }
    .daterangepicker .calendar-table .next span, .daterangepicker .calendar-table .prev span { border-color: #00BCD4 !important; }
    .daterangepicker .calendar-table .next:hover, .daterangepicker .calendar-table .prev:hover { background-color: #E5F8FB !important; }
    .daterangepicker td.today { background-color: #E5F8FB !important; color: #374151 !important; }
    .daterangepicker td.today.active { background-color: #00BCD4 !important; color: #FFFFFF !important; }

    /* Dynamic field animations */
    .dynamic-field-item {
        transition: all 0.4s ease-in-out;
        overflow: hidden;
    }

    .dynamic-field-item.new-item-animation {
        animation: slide-in 0.4s ease-out;
    }
    
    @keyframes slide-in {
        from {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
        }
        to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px; /* Adjust based on content */
        }
    }

    .dynamic-field-item.removing {
      animation: slide-out 0.4s ease-out forwards;
    }

    @keyframes slide-out {
        from {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px; /* Adjust based on content */
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
            max-height: 0;
            margin-top: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            border: none;
        }
    }

    .remove-button {
      display: none; /* Hide by default */
      opacity: 0;
      transform: scale(0.5);
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    .remove-button.visible {
      display: flex;
      opacity: 1;
      transform: scale(1);
    }
  `;
  document.head.appendChild(style);

  // Load required libraries dynamically
  const loadDateRangePicker = () => {
    // Load moment.js
    const momentScript = document.createElement("script");
    momentScript.src = "../../assets/vendor/libs/moment/moment.js";
    momentScript.onload = () => {
      // Load daterangepicker after moment is loaded
      const daterangeScript = document.createElement("script");
      daterangeScript.src =
        "../../assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.js";
      daterangeScript.onload = initializeDateRangePickers;
      document.head.appendChild(daterangeScript);
    };
    document.head.appendChild(momentScript);
  };

  // Initialize Bootstrap DateRangePickers
  function initializeDateRangePickers() {
    if (typeof $ !== "undefined" && $.fn.daterangepicker) {
      // Kurun Waktu - Date Range Picker (Start and End Date in one input)
      $("#kurunWaktu").daterangepicker({
        showDropdowns: true,
        minYear: 2020,
        maxYear: parseInt(moment().format("YYYY"), 10) + 5,
        minDate: moment(), // Set minimum date to today
        locale: {
          format: "DD/MM/YYYY",
          separator: " - ",
          applyLabel: "Apply",
          cancelLabel: "Cancel",
          fromLabel: "From",
          toLabel: "To",
          customRangeLabel: "Custom",
          weekLabel: "W",
          daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          firstDay: 1,
        },
        startDate: moment(),
        endDate: moment().add(7, "days"),
        opens: "right",
      });

      // Optional: Handle date change event
      $("#kurunWaktu").on("apply.daterangepicker", function (ev, picker) {
        console.log("Start Date: " + picker.startDate.format("DD/MM/YYYY"));
        console.log("End Date: " + picker.endDate.format("DD/MM/YYYY"));
      });
    }
  }

  // --- JavaScript Logic ---

  let mainStep = 1; // Main progress step (1, 2, or 3)
  let currentStep = 1; // Sub-step within Kerangka Acuan Kerja
  const totalSteps = 5;
  const menuItems = [
    "gambaran-umum",
    "penerima-manfaat",
    "strategi-pencapaian",
    "indikator-kinerja",
    "kurun-waktu",
  ];

  // ==============================================
  // DYNAMIC FIELD LOGIC
  // ==============================================

  function updateRemoveButtonVisibility(container) {
    if (!container) return;
    const items = container.querySelectorAll(".dynamic-field-item");
    const show = items.length > 1;
    items.forEach(item => {
      const removeBtn = item.querySelector(".remove-button");
      if (removeBtn) {
        if (show) {
          removeBtn.classList.add("visible");
        } else {
          removeBtn.classList.remove("visible");
        }
      }
    });
  }

  window.removeField = function (btn) {
    const item = btn.closest(".dynamic-field-item");
    if (!item) return;

    const container = item.parentElement;
    if (container.querySelectorAll(".dynamic-field-item:not(.removing)").length > 1) {
      item.classList.add("removing");
      item.addEventListener("animationend", () => {
        item.remove();
        updateRemoveButtonVisibility(container);
      }, { once: true });
    } else {
      showError("Minimal harus ada 1 field!");
    }
  };

  // ==============================================
  // VALIDATION FUNCTIONS
  // ==============================================

  if (typeof showSuccess !== "function") {
    window.showSuccess = function (message) {
      alert("Success: " + message);
    };
  }
  if (typeof showError !== "function") {
    window.showError = function (message) {
      console.error("Detailed Error Object:", message); // <-- Add this line for debugging
      alert("Error: " + message);
    };
  }

  function validateKAKStep(step) {
    let isValid = true;
    // Clear previous errors for the current step
    document
      .querySelectorAll(`#main-step-1 .step-content.active .validation-error`)
      .forEach((el) => el.remove());
    document
      .querySelectorAll(`#main-step-1 .step-content.active .is-invalid`)
      .forEach((el) => {
        el.classList.remove("is-invalid");
        el.style.borderColor = "#E5E7EB";
      });

    const addError = (el, message) => {
      isValid = false;
      el.classList.add("is-invalid");
      el.style.borderColor = "#EF4444";
      const errorEl = document.createElement("p");
      errorEl.className = "validation-error text-red-500 text-sm mt-1";
      errorEl.textContent = message;
      el.parentElement.appendChild(errorEl);
    };

    if (step === 1) {
      // Gambaran Umum
      const namaKegiatan = document.getElementById("namaKegiatan");
      if (!namaKegiatan.value)
        addError(namaKegiatan, "Nama Kegiatan wajib diisi.");

      const gambaranUmum = document.getElementById("gambaranUmum");
      if (!gambaranUmum.value)
        addError(gambaranUmum, "Gambaran Umum Kegiatan wajib diisi.");
    } else if (step === 2) {
      // Penerima Manfaat
      const penerimaRows = document.querySelectorAll(
        "#penerimaManfaatContainer .penerima-manfaat-item"
      );
      penerimaRows.forEach((row) => {
        const sasaranInput = row.querySelector(".sasaran-utama-input");
        const manfaatInput = row.querySelector(".manfaat-input");
        if (!sasaranInput.value)
          addError(sasaranInput, "Sasaran Utama wajib diisi.");
        if (!manfaatInput.value) addError(manfaatInput, "Manfaat wajib diisi.");
      });
      if (penerimaRows.length === 0) {
        showError("Harap tambahkan setidaknya satu Penerima Manfaat.");
        isValid = false;
      }
    } else if (step === 3) {
      // Strategi Pencapaian
      const metodePelaksanaan = document.getElementById("metodePelaksanaan");
      if (!metodePelaksanaan.value)
        addError(metodePelaksanaan, "Metode Pelaksanaan wajib diisi.");

      const tahapanInputs = document.querySelectorAll(
        "#tahapanPelaksanaanContainer input"
      );
      tahapanInputs.forEach((input) => {
        if (!input.value) addError(input, "Tahapan Pelaksanaan wajib diisi.");
      });
      if (tahapanInputs.length === 0) {
        showError("Harap tambahkan setidaknya satu Tahapan Pelaksanaan.");
        isValid = false;
      }
    } else if (step === 4) {
      // Indikator Kinerja
      const indikatorRows = document.querySelectorAll(
        "#indikatorKinerjaContainer > div"
      );
      indikatorRows.forEach((row) => {
        const inputs = row.querySelectorAll("input, select");
        const bulan = inputs[0];
        const deskripsi = inputs[1];
        const persentase = inputs[2];
        if (!bulan.value) addError(bulan, "Bulan wajib diisi.");
        if (!deskripsi.value)
          addError(deskripsi, "Indikator Keberhasilan wajib diisi.");
        if (!persentase.value) {
          addError(persentase, "Target wajib diisi.");
        }
      });
      if (indikatorRows.length === 0) {
        showError("Harap tambahkan setidaknya satu Indikator Kinerja.");
        isValid = false;
      }
    } else if (step === 5) {
        // Kurun Waktu
        const kurunWaktu = document.getElementById("kurunWaktu");
        if (!kurunWaktu.value) {
            addError(kurunWaktu, "Kurun Waktu Pelaksanaan wajib diisi.");
        } else {
            const startDate = $("#kurunWaktu").data('daterangepicker').startDate;
            if (startDate.isBefore(moment(), 'day')) {
                addError(kurunWaktu, "Tanggal mulai tidak boleh lebih awal dari hari ini.");
            }
        }
    }

    if (!isValid) {
      showError("Silakan perbaiki kesalahan pada form sebelum melanjutkan.");
    }

    return isValid;
  }

  function validateIkuStep() {
    let isValid = true;
    document
      .querySelectorAll("#main-step-2 .validation-error")
      .forEach((el) => el.remove());
    document
      .querySelectorAll("#main-step-2 .is-invalid")
      .forEach((el) => {
          el.classList.remove("is-invalid");
          el.style.borderColor = "#E5E7EB";
      });

    const addError = (el, message) => {
      isValid = false;
      el.classList.add("is-invalid");
      el.style.borderColor = "#EF4444";
      const errorEl = document.createElement("p");
      errorEl.className = "validation-error text-red-500 text-sm mt-1";
      errorEl.textContent = message;
      // Check if the element is the numeric input for IKU
      if (el.type === 'number' && el.parentElement.classList.contains('flex')) {
        // Place error message after the parent of the flex container
        el.parentElement.parentElement.appendChild(errorEl);
      } else {
        // Default behavior for other elements like select
        el.parentElement.appendChild(errorEl);
      }
    };

    const ikuRows = document.querySelectorAll("#ikuRenstraContainer .iku-item");
    if (ikuRows.length > 0) {
      ikuRows.forEach((row) => {
        const select = row.querySelector("select");
        const input = row.querySelector("input[type='number']");
        if (!select.value) addError(select, "IKU wajib dipilih.");
        if (!input.value) {
          addError(input, "Nilai wajib diisi.");
        } else if (parseFloat(input.value) <= 0) {
          addError(input, "Nilai harus lebih dari 0.");
        }
      });
    }

    if (!isValid) {
      showError("Silakan perbaiki kesalahan pada form sebelum melanjutkan.");
    }

    return isValid;
  }

  function validateRabStep() {
    let isValid = true;
    document
      .querySelectorAll("#main-step-3 .validation-error")
      .forEach((el) => el.remove());
    document.querySelectorAll("#main-step-3 .is-invalid").forEach((el) => {
      el.classList.remove("is-invalid");
      el.style.borderColor = "#E5E7EB";
    });

    const addError = (el, message) => {
      isValid = false;
      el.classList.add("is-invalid");
      el.style.borderColor = "#EF4444";
      const errorEl = document.createElement("p");
      errorEl.className = "validation-error text-red-500 text-sm mt-1";
      errorEl.textContent = message;
      el.parentElement.appendChild(errorEl);
    };

    const rabItems = document.querySelectorAll("#rab-container .rab-item");
    let hasAtLeastOneItem = false;
    rabItems.forEach((item) => {
        const inputs = item.querySelectorAll("input, select");
        const uraian = inputs[0];
        const qty1 = inputs[1];
        const satuan1 = inputs[2];
        const harga = inputs[7];

        // An item is considered filled if it has a description
        if (uraian.value) {
            hasAtLeastOneItem = true;
            if (!qty1.value || parseInt(qty1.value) <= 0) addError(qty1, "Qty harus > 0.");
            if (!satuan1.value) addError(satuan1, "Satuan wajib dipilih.");
            if (!harga.value || parseFloat(harga.value) <= 0) addError(harga, "Harga harus > 0.");
        }
    });

    if (!hasAtLeastOneItem) {
        showError("Harap tambahkan setidaknya satu item anggaran.");
        isValid = false;
    }


    if (!isValid) {
      showError("Silakan perbaiki kesalahan pada isian Rencana Anggaran Biaya.");
    }

    return isValid;
  }

  function validateAllSteps() {
    const kakValid = [1, 2, 3, 4, 5].every((step) => validateKAKStep(step));
    const ikuValid = validateIkuStep();
    const rabValid = validateRabStep();

    if (!kakValid) {
      mainStep = 1;
      // Find first invalid step and go to it
      for (let i = 1; i <= 5; i++) {
        if (!validateKAKStep(i)) {
          currentStep = i;
          break;
        }
      }
      updateMainStepDisplay();
      updateStepDisplay();
      showError("Terdapat kesalahan pada isian Kerangka Acuan Kerja.");
      return false;
    }
    if (!ikuValid) {
      mainStep = 2;
      updateMainStepDisplay();
      showError("Terdapat kesalahan pada isian IKU.");
      return false;
    }
    if (!rabValid) {
      mainStep = 3;
      updateMainStepDisplay();
      showError("Terdapat kesalahan pada isian Rencana Anggaran Biaya.");
      return false;
    }

    return true;
  }

  // Update Main Progress Step Display
  function updateMainStepDisplay() {
    const iconsForSteps = {
      1: { class: "ti ti-file-text", entity: "&#xef40;" }, // KAK
      2: { class: "ti ti-chart-bar", entity: "&#xea59;" }, // IKU & RENSTRA
      3: { class: "ti ti-currency-dollar", entity: "&#xeb84;" }, // RAB
    };

    const progressSteps = document.querySelectorAll(".progress-step-item");
    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      const circle = step.querySelector(".progress-step-circle");
      const text = step.querySelector(".progress-step-text");
      const subtext = step.querySelector(".progress-step-subtext");

      if (stepNum < mainStep) {
        // Completed step
        circle.style.background = "#10B981";
        circle.style.color = "#FFFFFF";
        circle.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.4)";
        circle.innerHTML = '<i class="ti ti-check">&#xea5e;</i>';
        text.style.color = "#10B981";
        if (subtext) subtext.style.color = "#10B981";
      } else if (stepNum === mainStep) {
        // Active step
        circle.style.background = "#00BCD4";
        circle.style.color = "#FFFFFF";
        circle.style.boxShadow = "0 4px 12px rgba(0, 188, 212, 0.4)";
        circle.innerHTML = `${stepNum}`;
        text.style.color = "#00BCD4";
        if (subtext) subtext.style.color = "#00BCD4";
      } else {
        // Upcoming step
        circle.style.background = "#E5E7EB";
        circle.style.color = "#6B7280";
        circle.style.boxShadow = "none";
        circle.innerHTML = `${stepNum}`;
        text.style.color = "#6B7280";
        if (subtext) subtext.style.color = "#9CA3AF";
      }
    });

    // Show/hide main step content
    document
      .querySelectorAll(".main-step-content")
      .forEach((content, index) => {
        if (index + 1 === mainStep) {
          content.classList.add("active");
        } else {
          content.classList.remove("active");
        }
      });
  }

  // Initialize
  async function init() {
    if (isInitialized) {
        return;
    }
    isInitialized = true;

    loadDateRangePicker();
    updateMainStepDisplay();
    updateStepDisplay();
    attachEventListeners();
    
    // Clear dynamic containers initially to prevent duplicates on re-render
    if(document.getElementById("penerimaManfaatContainer")) document.getElementById("penerimaManfaatContainer").innerHTML = '';
    if(document.getElementById("tahapanPelaksanaanContainer")) document.getElementById("tahapanPelaksanaanContainer").innerHTML = '';
    if(document.getElementById("indikatorKinerjaContainer")) document.getElementById("indikatorKinerjaContainer").innerHTML = '';
    if(document.getElementById("ikuRenstraContainer")) document.getElementById("ikuRenstraContainer").innerHTML = '';

    // Await all master data population before proceeding
    await Promise.all([
        populateIkuDropdowns(),
        populateSatuanDropdowns(),
        populateRabSections()
    ]);
    
    if (isEditMode && kakId) {
      await fetchAndPopulateKakData(kakId);
    } else {
      // Add default rows for create mode
      addPenerimaManfaat();
      addTahapanPelaksanaan();
      addIndikatorKinerja();
      addIkuField();
    }
  }

  // ==============================================
  // API FUNCTIONS
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(`/api${endpoint}`, config);
      const data = await response.json();
      if (!response.ok) {
        // Create a custom error object to include detailed errors
        const error = new Error(
          data.message || `API request failed with status ${response.status}`
        );
        error.details = data.errors || null; // Attach detailed errors
        throw error;
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  async function submitKak(data) {
    return await apiRequest("/kak", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  function deriveKurunWaktuPelaksanaan(startDate, endDate) {
    if (!startDate || !endDate) return "";
    const start = moment(startDate, "YYYY-MM-DD");
    const end = moment(endDate, "YYYY-MM-DD");
    const diffDays = end.diff(start, "days") + 1;

    if (diffDays <= 0) return "";

    if (diffDays < 30) {
      return `${diffDays} hari`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return `${months} bulan ${remainingDays > 0 ? `${remainingDays} hari` : ""}`.trim();
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} tahun ${remainingMonths > 0 ? `${remainingMonths} bulan` : ""}`.trim();
    }
  }

  // Populate IKU dropdowns from API
  async function populateIkuDropdowns() {
    try {
      const response = await apiRequest("/master/iku");
      const ikuData = response.data;

      const ikuSelects = document.querySelectorAll(
        "#ikuRenstraContainer select"
      );
      ikuSelects.forEach((select) => {
        const currentValue = select.value;
        const isPlaceholder =
          select.options.length > 0 && select.options[0].value === "";
        while (select.options.length > (isPlaceholder ? 1 : 0)) {
          select.remove(isPlaceholder ? 1 : 0);
        }

        ikuData.forEach((iku) => {
          const option = document.createElement("option");
          option.value = iku.iku_id;
          option.textContent = iku.nama_iku;
          select.appendChild(option);
        });
        select.value = currentValue;
      });
    } catch (error) {
      console.error("Error populating IKU dropdowns:", error);
      showError("Gagal memuat data IKU. Silakan coba lagi.");
    }
  }

  // Populate Satuan dropdowns from API
  async function populateSatuanDropdowns() {
    try {
        const response = await apiRequest("/master/satuan");
        const satuanData = response.data;
        
        const newSelects = document.querySelectorAll(".satuan-select:not(.populated)");

        newSelects.forEach(select => {
            const currentValue = select.value;
            // Clear existing options except placeholder
            const placeholder = select.querySelector('option[value=""]');
            select.innerHTML = '';
            if (placeholder) {
                select.appendChild(placeholder);
            }

            satuanData.forEach(satuan => {
                const option = document.createElement("option");
                option.value = satuan.satuan_id;
                option.textContent = satuan.nama_satuan;
                select.appendChild(option);
            });
            select.value = currentValue;
            select.classList.add('populated');
        });
    } catch (error) {
        console.error("Error populating Satuan dropdowns:", error);
        showError("Gagal memuat data Satuan. Silakan coba lagi.");
    }
  }

  async function populateRabSections() {
      try {
          const response = await apiRequest("/master/kategori-belanja");
          const kategoriData = response.data;
          const rabContainer = document.getElementById('rab-container');
          rabContainer.innerHTML = ''; // Clear existing

          kategoriData.forEach(kategori => {
              const section = document.createElement('div');
              section.className = 'mb-10';
              section.dataset.kategoriId = kategori.kategori_belanja_id;
              
              section.innerHTML = `
                  <h5 class="mb-6 font-bold text-lg" style="color: #374151;">${kategori.nama}</h5>
                  <div id="rab-items-container-${kategori.kategori_belanja_id}">
                      <!-- New RAB items will be inserted here -->
                  </div>
                  <button type="button" class="ml-6 border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4'," onclick="addRabItem(${kategori.kategori_belanja_id})">
                      Tambah Item
                  </button>
              `;
              rabContainer.appendChild(section);
              // Add at least one item per category only in create mode
              if (!isEditMode) {
                addRabItem(kategori.kategori_belanja_id);
              }
          });

      } catch (error) {
          console.error("Error populating RAB sections:", error);
          showError("Gagal memuat kategori belanja. Silakan coba lagi.");
      }
  }


  function collectFormData() {
    // Helper function to get values from a container of inputs (array of strings)
    const getDynamicListValues = (containerId) => {
      const container = document.getElementById(containerId);
      if (!container) return [];
      return Array.from(container.querySelectorAll('input[type="text"]'))
        .map((input) => input.value)
        .filter(Boolean);
    };

    // Helper function to get values from complex dynamic rows for t_kak_target
    const getTargetData = () => {
      const container = document.getElementById("indikatorKinerjaContainer");
      if (!container) return [];
      const rows = container.querySelectorAll(".indikator-kinerja-item");
      return Array.from(rows)
        .map((row) => {
          const inputs = row.querySelectorAll("input, select");
          return {
            bulan_indikator: inputs[0]?.value || "",
            deskripsi_target: inputs[1]?.value || "",
            persentase_target: parseFloat(inputs[2]?.value) || 100, // default 100
          };
        })
        .filter((item) => item.bulan_indikator || item.deskripsi_target);
    };

    const getIkuRenstraData = () => {
      const container = document.getElementById("ikuRenstraContainer");
      if (!container) return [];
      return Array.from(container.querySelectorAll(".iku-item"))
        .map((row) => {
          const inputs = row.querySelectorAll("input, select");
          return {
            iku_id: parseInt(inputs[0].value) || 0,
            persentase_target: parseFloat(inputs[1].value) || 0,
          };
        })
        .filter((item) => item.iku_id && item.persentase_target > 0);
    };

    const getAnggaranItems = () => {
        const rabItems = [];
        const rabSections = document.querySelectorAll('#rab-container > div[data-kategori-id]');
        
        rabSections.forEach(section => {
            const kategoriId = parseInt(section.dataset.kategoriId);
            const items = section.querySelectorAll('.rab-item');
            
            items.forEach(item => {
                const inputs = item.querySelectorAll("input, select");
                const uraian = inputs[0].value;
                const volume1 = parseInt(inputs[1].value) || 0;
                const harga_satuan = parseFloat(inputs[7].value.replace(/[^0-9]/g, '')) || 0;

                if (uraian && volume1 > 0 && harga_satuan > 0) {
                    rabItems.push({
                        kategori_belanja_id: kategoriId,
                        uraian: uraian,
                        volume1: volume1,
                        satuan1_id: inputs[2].value ? parseInt(inputs[2].value) : null,
                        volume2: parseInt(inputs[3].value) || null,
                        satuan2_id: inputs[4].value ? parseInt(inputs[4].value) : null,
                        volume3: parseInt(inputs[5].value) || null,
                        satuan3_id: inputs[6].value ? parseInt(inputs[6].value) : null,
                        harga_satuan: harga_satuan,
                    });
                }
            });
        });
        return rabItems;
    };

    // Get date range from daterangepicker
    let tanggalMulai = null;
    let tanggalSelesai = null;
    if (typeof $ !== "undefined" && $("#kurunWaktu").data("daterangepicker")) {
      tanggalMulai = $("#kurunWaktu")
        .data("daterangepicker")
        .startDate.format("YYYY-MM-DD");
      tanggalSelesai = $("#kurunWaktu")
        .data("daterangepicker")
        .endDate.format("YYYY-MM-DD");
    }

    const indikatorKinerjaData = getTargetData();

    const formData = {
      kak: {
        nama_kegiatan: document.getElementById("namaKegiatan")?.value || "",
        deskripsi_kegiatan:
          document.getElementById("gambaranUmum")?.value || "",
        metode_pelaksanaan:
          document.getElementById("metodePelaksanaan")?.value || "",
        kurun_waktu_pelaksanaan:
          deriveKurunWaktuPelaksanaan(tanggalMulai, tanggalSelesai) || "",
        tanggal_mulai: tanggalMulai || "",
        tanggal_selesai: tanggalSelesai || "",
        lokasi: "PNJ Depok",

        penerima_manfaat: Array.from(
          document.querySelectorAll(
            "#penerimaManfaatContainer .penerima-manfaat-item"
          )
        )
          .map((row) => ({
            sasaran_utama: row.querySelector(".sasaran-utama-input").value,
            manfaat: row.querySelector(".manfaat-input").value,
          }))
          .filter((item) => item.sasaran_utama || item.manfaat),

        tahapan_pelaksanaan: getDynamicListValues(
          "tahapanPelaksanaanContainer"
        ).map((nama, index) => ({
          nama_tahapan: nama,
          urutan: index + 1,
        })),

        indikator_kinerja: indikatorKinerjaData.map((item) => ({
          bulan_indikator: item.bulan_indikator,
          deskripsi_target: item.deskripsi_target,
          persentase_target: item.persentase_target,
        })),
      },

      target_iku: getIkuRenstraData(),
      rab: getAnggaranItems(),
    };

    console.log("Collected Form Data:", formData);
    return formData;
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // Progress step items - allow clicking to navigate
    document.querySelectorAll(".progress-step-item").forEach((step) => {
      step.addEventListener("click", function () {
        const targetStep = parseInt(this.getAttribute("data-main-step"));
        
        if (targetStep < mainStep) {
            mainStep = targetStep;
            if (mainStep === 1) {
                currentStep = 1; 
            }
            updateMainStepDisplay();
            updateStepDisplay();
        } else if (targetStep === mainStep) {
            // Do nothing if clicking the current step
        } else { // targetStep > mainStep
            // Validate current step before proceeding
            if (mainStep === 1 && [1,2,3,4,5].every(validateKAKStep)) {
                mainStep = targetStep;
            } else if (mainStep === 2 && validateIkuStep()) {
                mainStep = targetStep;
            }
            updateMainStepDisplay();
            updateStepDisplay();
        }
      });
    });

    // Menu buttons for Step 1 (KAK)
    document.querySelectorAll(".menu-button").forEach((btn) => {
      btn.addEventListener("click", function () {
        const menuTarget = this.getAttribute("data-menu");
        const menuIndex = menuItems.indexOf(menuTarget);
        if (menuIndex !== -1) {
          if (validateKAKStep(currentStep)) {
            currentStep = menuIndex + 1;
            updateStepDisplay();
          }
        }
      });
    });

    // Back button for Step 1
    const btnBack = document.getElementById("btnBack");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        if (currentStep > 1) {
          currentStep--;
          updateStepDisplay();
        }
      });
    }

    // Next button for Step 1
    const btnNext = document.getElementById("btnNext");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (validateKAKStep(currentStep)) {
          if (currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
          } else {
            // Move to main step 2
            mainStep = 2;
            updateMainStepDisplay();
          }
        }
      });
    }

    // Back button for Step 2 (IKU)
    const btnBackIku = document.getElementById("btnBackIku");
    if (btnBackIku) {
      btnBackIku.addEventListener("click", () => {
        mainStep = 1;
        currentStep = totalSteps; // Go to last sub-step of KAK
        updateMainStepDisplay();
        updateStepDisplay();
      });
    }

    // Next button for Step 2 (IKU)
    if (btnNextIku) {
      btnNextIku.addEventListener("click", () => {
        if (validateIkuStep()) {
          mainStep = 3;
          updateMainStepDisplay();
        }
      });
    }

    // Back button for Step 3 (RAB)
    const btnBackRab = document.getElementById("btnBackRab");
    if (btnBackRab) {
      btnBackRab.addEventListener("click", () => {
        mainStep = 2;
        updateMainStepDisplay();
      });
    }
  }

  // Update Step Display for Step 1 sub-steps
  function updateStepDisplay() {
    if (mainStep !== 1) return;

    // Update menu buttons
    document.querySelectorAll(".menu-button").forEach((btn, index) => {
      if (index + 1 === currentStep) {
        btn.classList.add("active");
        btn.style.borderColor = "#00BCD4";
        btn.style.background = "rgba(0, 188, 212, 0.1)";
      } else {
        btn.classList.remove("active");
        btn.style.borderColor = "#E5E7EB";
        btn.style.background = "";
      }
    });

    // Update content
    document.querySelectorAll(".step-content").forEach((content, index) => {
      if (index + 1 === currentStep) {
        content.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });

    // Update navigation buttons
    const btnBack = document.getElementById("btnBack");
    const btnNext = document.getElementById("btnNext");

    if (btnBack) {
      btnBack.style.visibility = currentStep === 1 ? "hidden" : "visible";
    }

    if (btnNext) {
      if (currentStep === totalSteps) {
        btnNext.innerHTML = "Next <span>→</span>";
      } else {
        btnNext.innerHTML = "Next <span>→</span>";
      }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Dynamic Field Functions (Global scope)

  window.addPenerimaManfaat = function (itemData = null) {
    const container = document.getElementById("penerimaManfaatContainer");
    const newItem = document.createElement("div");
    newItem.className = "penerima-manfaat-item dynamic-field-item new-item-animation flex gap-4 items-start mb-4";
    const sasaran = itemData ? itemData.sasaran_utama : '';
    const manfaat = itemData ? itemData.manfaat : '';
    newItem.innerHTML = `
      <div class="flex-1">
        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Sasaran Utama</label>
        <input type="text" class="sasaran-utama-input w-full px-4 py-3 border-2 rounded-lg text-sm" placeholder="Input Sasaran" value="${sasaran}">
      </div>
      <div class="flex-1">
        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Manfaat</label>
        <input type="text" class="manfaat-input w-full px-4 py-3 border-2 rounded-lg text-sm" placeholder="Input Manfaat" value="${manfaat}">
      </div>
      <button type="button" class="remove-button border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0 self-end" style="background: #EF4444; color: #FFFFFF;" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
    updateRemoveButtonVisibility(container);
    newItem.addEventListener('animationend', () => {
        newItem.classList.remove('new-item-animation');
    });
  };

  window.addTahapanPelaksanaan = function (value = '') {
    const container = document.getElementById("tahapanPelaksanaanContainer");
    const newItem = document.createElement("div");
    newItem.className = "tahapan-item dynamic-field-item new-item-animation flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input" value="${value}">
      <button type="button" class="remove-button border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
    updateRemoveButtonVisibility(container);
    newItem.addEventListener('animationend', () => {
        newItem.classList.remove('new-item-animation');
    });
  };
  
  window.addIndikatorKinerja = function (itemData = null) {
    const container = document.getElementById("indikatorKinerjaContainer");
    const newItem = document.createElement("div");
    newItem.className = "indikator-kinerja-item dynamic-field-item new-item-animation flex items-end gap-4 mb-6";
    const bulan = itemData ? itemData.bulan_indikator : '';
    const indikator = itemData ? itemData.deskripsi_target : '';
    const target = itemData ? itemData.persentase_target : '';
    newItem.innerHTML = `
      <div class='w-full'>
        <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
        <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;">
          <option value="">Pilih Bulan</option>
          <option value="Januari" ${bulan === 'Januari' ? 'selected' : ''}>Januari</option> <option value="Februari" ${bulan === 'Februari' ? 'selected' : ''}>Februari</option> <option value="Maret" ${bulan === 'Maret' ? 'selected' : ''}>Maret</option>
          <option value="April" ${bulan === 'April' ? 'selected' : ''}>April</option> <option value="Mei" ${bulan === 'Mei' ? 'selected' : ''}>Mei</option> <option value="Juni" ${bulan === 'Juni' ? 'selected' : ''}>Juni</option>
          <option value="Juli" ${bulan === 'Juli' ? 'selected' : ''}>Juli</option> <option value="Agustus" ${bulan === 'Agustus' ? 'selected' : ''}>Agustus</option> <option value="September" ${bulan === 'September' ? 'selected' : ''}>September</option>
          <option value="Oktober" ${bulan === 'Oktober' ? 'selected' : ''}>Oktober</option> <option value="November" ${bulan === 'November' ? 'selected' : ''}>November</option> <option value="Desember" ${bulan === 'Desember' ? 'selected' : ''}>Desember</option>
        </select>
      </div>
      <div class='w-full'>
        <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
        <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" placeholder="Input" value="${indikator}">
      </div>
      <div class='w-full'>
        <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
        <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" placeholder="Input" value="${target}">
      </div>
      <button type="button" class="remove-button border-0 w-10 h-10 rounded-full cursor-pointer flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
    updateRemoveButtonVisibility(container);
    newItem.addEventListener('animationend', () => {
        newItem.classList.remove('new-item-animation');
    });
  };

  window.addIkuField = function (itemData = null) {
    const container = document.getElementById("ikuRenstraContainer");
    const newItem = document.createElement("div");
    newItem.className = "iku-item dynamic-field-item new-item-animation row-item mb-4"; // Added row-item and margin
    const ikuId = itemData ? itemData.iku_id : '';
    const persentase = itemData ? itemData.persentase_target : '';
    newItem.innerHTML = `
      <div class="grid grid-cols-[1fr_1fr_auto] gap-4 items-end">
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;">
            <option value="">Pilih IKU</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nilai (%)
          </label>
          <div class="flex gap-2 items-center">
            <input type="number" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm" placeholder="0" min="0" max="100" value="${persentase}">
            <div class="px-3 py-3 text-sm font-semibold" style="color: #374151;">%</div>
          </div>
        </div>
        <button type="button" class="remove-button border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onclick="removeField(this)">
          <span class="text-xl font-bold">−</span>
        </button>
      </div>
    `;
    container.appendChild(newItem);
    
    updateRemoveButtonVisibility(container);
     newItem.addEventListener('animationend', () => {
        newItem.classList.remove('new-item-animation');
    });
    // Set selected IKU after the element is created and dropdowns are populated
    populateIkuDropdowns().then(() => {
        if (ikuId) {
            newItem.querySelector('select').value = ikuId;
        }
    });
  };

  window.addRabItem = function(kategoriId, itemData = null) {
    const container = document.getElementById(`rab-items-container-${kategoriId}`);
    if (!container) {
        return;
    }

    const newItem = document.createElement('div');
    newItem.className = 'rab-item dynamic-field-item new-item-animation mb-8 p-6 rounded-lg';
    
    const uraian = itemData ? itemData.uraian : '';
    const vol1 = itemData ? itemData.volume1 : '0';
    const sat1 = itemData ? itemData.satuan1_id : '';
    const vol2 = itemData ? itemData.volume2 : '0';
    const sat2 = itemData ? itemData.satuan2_id : '';
    const vol3 = itemData ? itemData.volume3 : '0';
    const sat3 = itemData ? itemData.satuan3_id : '';
    const harga = itemData ? itemData.harga_satuan : '';
    const inputStyle = `style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';"`;

    newItem.innerHTML = `
        <div class="grid grid-cols-[2.5fr_0.8fr_1.2fr_0.8fr_1.2fr_0.8fr_1.2fr_2.5fr_auto] gap-4 items-end">
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" placeholder="Input Uraian" value="${uraian}" ${inputStyle}>
            </div>
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                <input type="number" min="0" value="${vol1}" class="w-full px-4 py-3 border-2 rounded-lg text-sm" ${inputStyle}>
            </div>
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                <select class="w-full px-4 py-3 border-2 rounded-lg text-sm satuan-select" ${inputStyle}>
                    <option value="">Pilih Satuan</option>
                </select>
            </div>
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                <input type="number" min="0" value="${vol2}" class="w-full px-4 py-3 border-2 rounded-lg text-sm" ${inputStyle}>
            </div>
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
                <select class="w-full px-4 py-3 border-2 rounded-lg text-sm satuan-select" ${inputStyle}>
                    <option value="">Pilih Satuan</option>
                </select>
            </div>
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 3</label>
                <input type="number" min="0" value="${vol3}" class="w-full px-4 py-3 border-2 rounded-lg text-sm" ${inputStyle}>
            </div>
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 3</label>
                <select class="w-full px-4 py-3 border-2 rounded-lg text-sm satuan-select" ${inputStyle}>
                    <option value="">Pilih Satuan</option>
                </select>
            </div>
            <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" placeholder="Input Harga" value="${harga}" ${inputStyle}>
            </div>
            <div class="flex items-end pb-3">
                <button type="button" class="remove-button border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center" style="background: #EF4444; color: #FFFFFF;" onclick="removeField(this)">
                    <span class="text-xl font-bold">−</span>
                </button>
            </div>
        </div>
    `;
    container.appendChild(newItem);

    // Populate dropdowns for the new item
    populateSatuanDropdowns().then(() => {
        const selects = newItem.querySelectorAll('.satuan-select');
        if (sat1) selects[0].value = sat1;
        if (sat2) selects[1].value = sat2;
        if (sat3) selects[2].value = sat3;
    });

    updateRemoveButtonVisibility(container);
    newItem.addEventListener('animationend', () => {
        newItem.classList.remove('new-item-animation');
    });
  }

  // Increment/Decrement value functions
  window.incrementValue = function (btn, step) {
    const input = btn
      .closest(".relative")
      .querySelector('input[type="number"]');
    const currentValue = parseInt(input.value) || 0;
    input.value = currentValue + step;
  };

  window.decrementValue = function (btn, step) {
    const input = btn
      .closest(".relative")
      .querySelector('input[type="number"]');
    const currentValue = parseInt(input.value) || 0;
    const minValue = parseInt(input.min) || 0;
    if (currentValue > minValue) {
      input.value = currentValue - step;
    }
  };

  async function fetchAndPopulateKakData(id) {
    try {
      const response = await apiRequest(`/kak/${id}/data`);
      const kakData = response.data;

      // Populate Step 1: Gambaran Umum
      if (kakData.nama_kegiatan) {
        document.getElementById("namaKegiatan").value = kakData.nama_kegiatan;
      }
      if (kakData.deskripsi_kegiatan) {
        document.getElementById("gambaranUmum").value =
          kakData.deskripsi_kegiatan;
      }

      // Populate Step 2: Penerima Manfaat
      if (kakData.manfaat && kakData.manfaat.length > 0) {
        const penerimaManfaatContainer = document.getElementById(
          "penerimaManfaatContainer"
        );
        penerimaManfaatContainer.innerHTML = "";
        kakData.manfaat.forEach((item) => {
          addPenerimaManfaat(item);
        });
      }

      // Populate Step 3: Strategi Pencapaian
      if (kakData.metode_pelaksanaan) {
        document.getElementById("metodePelaksanaan").value =
          kakData.metode_pelaksanaan;
      }

      if (kakData.tahapan && kakData.tahapan.length > 0) {
        const tahapanContainer = document.getElementById(
          "tahapanPelaksanaanContainer"
        );
        tahapanContainer.innerHTML = "";
        kakData.tahapan.forEach((item) => {
          if (item.nama_tahapan) {
            addTahapanPelaksanaan(item.nama_tahapan);
          }
        });
      }

      // Populate Step 4: Indikator Kinerja (using target data)
      if (kakData.target && kakData.target.length > 0) {
        const indikatorContainer = document.getElementById(
          "indikatorKinerjaContainer"
        );
        indikatorContainer.innerHTML = "";
        kakData.target.forEach((item) => {
          addIndikatorKinerja(item);
        });
      }

      // Populate Step 5: Kurun Waktu
      if (kakData.tanggal_mulai && kakData.tanggal_selesai) {
        if (typeof $ !== "undefined" && $.fn.daterangepicker) {
          $("#kurunWaktu")
            .data("daterangepicker")
            .setStartDate(moment(kakData.tanggal_mulai));
          $("#kurunWaktu")
            .data("daterangepicker")
            .setEndDate(moment(kakData.tanggal_selesai));
        }
      }

      // Populate Main Step 2: IKU & Renstra
      if (kakData.iku && kakData.iku.length > 0) {
        const ikuContainer = document.getElementById("ikuRenstraContainer");
        ikuContainer.innerHTML = "";
        kakData.iku.forEach((item) => {
          addIkuField(item);
        });
      }

      // Populate Main Step 3: RAB
      if (kakData.anggaran && kakData.anggaran.length > 0) {
        // Clear any default rows added in create mode
        const rabContainer = document.getElementById('rab-container');
        rabContainer.querySelectorAll('.rab-item').forEach(item => item.remove());

        kakData.anggaran.forEach((item) => {
          addRabItem(item.kategori_belanja_id, item);
        });
      }
    } catch (error) {
      console.error("Error fetching KAK data:", error);
      showError(`Gagal memuat data: ${error.message}`);
    }
  }

  // ==============================================
  // Update submit function for edit mode
  // ==============================================
  async function submitKakUpdate(data, kakId) {
    return await apiRequest(`/kak/${kakId}/update`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // Update the submit button handler
  const btnSubmitRab = document.getElementById("btnSubmitRab");
  if (btnSubmitRab) {
    btnSubmitRab.addEventListener("click", async () => {
      if (!validateAllSteps()) {
        return;
      }

      btnSubmitRab.disabled = true;
      btnSubmitRab.innerHTML =
        'Submitting... <span class="spinner-border spinner-border-sm"></span>';

      try {
        const formData = collectFormData();
        console.log("Submitting data:", formData);

        let result;
        if (isEditMode && kakId) {
          // Update existing KAK
          result = await submitKakUpdate(formData, kakId);
          showSuccess("Usulan KAK berhasil diperbarui!");
        } else {
          // Create new KAK
          result = await submitKak(formData);
          showSuccess("Usulan KAK berhasil disimpan!");
        }

        // Redirect after a short delay to allow user to see the message
        setTimeout(() => {
          window.location.pathname = "/pengusul/usulan";
        }, 1500);
      } catch (error) {
        let errorMessage = `Error: ${error.message}`;
        if (error.details) {
          errorMessage += "\n\nRincian Validasi:";
          const formatErrors = (errors, indent = 0) => {
            let detailMessage = "";
            const prefix = "  ".repeat(indent);
            for (const field in errors) {
              const value = errors[field];
              if (Array.isArray(value)) {
                // Array of error messages
                detailMessage += `${prefix}- ${field}: ${value.join(", ")}\n`;
              } else if (typeof value === "object" && value !== null) {
                // Nested object - recurse
                detailMessage += `${prefix}- ${field}:\n`;
                detailMessage += formatErrors(value, indent + 1);
              } else if (typeof value === "string") {
                // Single string message
                detailMessage += `${prefix}- ${field}: ${value}\n`;
              } else {
                // Fallback: convert to string
                detailMessage += `${prefix}- ${field}: ${JSON.stringify(
                  value
                )}\n`;
              }
            }
            return detailMessage;
          };
          errorMessage += "\n" + formatErrors(error.details);
        }
        showError(errorMessage);
        btnSubmitRab.disabled = false;
        btnSubmitRab.innerHTML = "Submit";
      }
    });
  }

  // Initialize
  init();

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}