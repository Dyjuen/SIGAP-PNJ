// frontend/src/pages/Pengusul/UsulanKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderUsulanKakPage(userRole) {
  const pageContent = `
    <style>
      /* Only essential custom CSS that can't be done with Tailwind */
      .layout-wrapper {
        background-image: url('/assets/img/backgrounds/BG.png') !important;
        background-size: cover !important;
        background-position: center !important;
      }
      .content-wrapper {
        background: transparent !important;
      }
      .layout-navbar, .content-footer, .layout-menu {
        background: #FFFFFF !important;
      }
      .app-brand-text {
        color: #00BCD4 !important;
        font-size: 20px !important;
        font-weight: 700 !important;
      }
      .menu-inner .menu-item.active > .menu-link {
        background: #00BCD4 !important;
        color: #ffffff !important;
        border-radius: 8px;
        margin: 0 0.5rem;
        backdrop-filter: blur(5px);
      }
      .container-xxl {
        max-width: 96% !important;
      }
      .step-content {
        display: none;
      }
      .step-content.active {
        display: block;
      }
    </style>

    <div class="kerangka-acuan-kerja-page">
      <!-- Progress Steps -->
      <div class="flex justify-between mb-8 backdrop-blur-md p-6 rounded-xl shadow-lg" style="background: rgba(255, 255, 255, 0.8);">
        <div class="step-item flex-1 text-center relative px-4 active" data-step="1">
          <div class="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg shadow-lg transition-all duration-300" style="background: #00BCD4; color: #FFFFFF; box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);">1</div>
          <div class="text-sm font-semibold" style="color: #00BCD4;">Kerangka Acuan Kerja</div>
        </div>
        <div class="step-item flex-1 text-center relative px-4" data-step="2">
          <div class="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg transition-all duration-300" style="background: #E5E7EB; color: #6B7280;">2</div>
          <div class="text-sm font-semibold" style="color: #6B7280;">Indikator Kinerja Utama</div>
          <div class="text-xs mt-0.5" style="color: #9CA3AF;">& RENSTRA</div>
        </div>
        <div class="step-item flex-1 text-center relative px-4" data-step="3">
          <div class="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg transition-all duration-300" style="background: #E5E7EB; color: #6B7280;">3</div>
          <div class="text-sm font-semibold" style="color: #6B7280;">Rincian Anggaran Biaya</div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="flex gap-8">
        <!-- Sidebar Menu -->
        <div class="flex flex-col gap-4 w-96">
          <button class="menu-button backdrop-blur-md border-2 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3 active" data-menu="gambaran-umum" style="background: rgba(255, 255, 255, 0.8); border-color: #00BCD4; background: rgba(0, 188, 212, 0.1);">
            <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
            <div class="font-semibold text-base" style="color: #00BCD4;">Gambaran Umum</div>
          </button>
          <button class="menu-button backdrop-blur-md border-2 border-transparent rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="penerima-manfaat" style="background: rgba(255, 255, 255, 0.8);">
            <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
            <div class="font-semibold text-base" style="color: #00BCD4;">Penerima Manfaat</div>
          </button>
          <button class="menu-button backdrop-blur-md border-2 border-transparent rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="strategi-pencapaian" style="background: rgba(255, 255, 255, 0.8);">
            <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
            <div class="font-semibold text-base" style="color: #00BCD4;">Strategi Pencapaian</div>
          </button>
          <button class="menu-button backdrop-blur-md border-2 border-transparent rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="indikator-kinerja" style="background: rgba(255, 255, 255, 0.8);">
            <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
            <div class="font-semibold text-base" style="color: #00BCD4;">Indikator Kinerja</div>
          </button>
          <button class="menu-button backdrop-blur-md border-2 border-transparent rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="kurun-waktu" style="background: rgba(255, 255, 255, 0.8);">
            <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
            <div class="font-semibold text-base" style="color: #00BCD4;">Kurun Waktu Pelaksanaan</div>
          </button>
        </div>

        <!-- Main Form Area -->
        <div class="flex-1 backdrop-blur-md rounded-xl p-8 shadow-lg min-h-[500px]" style="background: rgba(255, 255, 255, 0.8);">
          <!-- Step 1: Gambaran Umum -->
          <div class="step-content active" id="gambaran-umum">
            <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Gambaran Umum</h4>
            
            <div class="mb-6">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Pengusul Kegiatan</label>
              <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input" id="pengusul">
            </div>

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
            
            <div class="mb-8">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Sasaran Utama</label>
              <div id="sasaranUtamaContainer">
                <div class="flex gap-4 items-start mb-4">
                  <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
                    <span class="text-xl font-bold">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addSasaranUtama()">Tambah</button>
            </div>

            <div class="mb-8">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Manfaat</label>
              <div id="manfaatContainer">
                <div class="flex gap-4 items-start mb-4">
                  <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
                    <span class="text-xl font-bold">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addManfaat()">Tambah</button>
            </div>
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
                <div class="flex gap-4 items-start mb-4">
                  <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
                    <span class="text-xl font-bold">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addTahapanPelaksanaan()">Tambah</button>
            </div>
          </div>

          <!-- Step 4: Indikator Kinerja -->
          <div class="step-content" id="indikator-kinerja">
            <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja</h4>
            
            <div class="mb-8">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja</label>
              <div id="indikatorKinerjaContainer">
                <div class="mb-4">
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                    </div>
                    <div>
                      <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                    </div>
                    <div>
                      <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
                      <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                    </div>
                  </div>
                  <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
                    <span class="text-xl font-bold">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addIndikatorKinerja()">Tambah</button>
            </div>

            <div class="mb-8">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tahapan Pelaksanaan</label>
              <div id="tahapanPelaksanaanKinerjaContainer">
                <div class="flex gap-4 items-start mb-4">
                  <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
                    <span class="text-xl font-bold">−</span>
                  </button>
                </div>
              </div>
              <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addTahapanPelaksanaanKinerja()">Tambah</button>
            </div>
          </div>

          <!-- Step 5: Kurun Waktu Pelaksanaan -->
          <div class="step-content" id="kurun-waktu">
            <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Kurun Waktu Pelaksanaan</h4>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="mb-6">
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tanggal Mulai</label>
                <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" id="tanggalMulai" value="2025-03-11">
              </div>

              <div class="mb-6">
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Tanggal Selesai</label>
                <input type="date" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" id="tanggalSelesai">
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
    </div>
  `;

  // Render the main layout
  renderDashboardLayout(pageContent, userRole);

  // --- JavaScript Logic ---

  let currentStep = 1;
  const totalSteps = 5;
  const menuItems = [
    "gambaran-umum",
    "penerima-manfaat",
    "strategi-pencapaian",
    "indikator-kinerja",
    "kurun-waktu",
  ];

  // Initialize
  function init() {
    updateStepDisplay();
    attachEventListeners();
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // Menu buttons
    document.querySelectorAll(".menu-button").forEach((btn) => {
      btn.addEventListener("click", function () {
        const menuTarget = this.getAttribute("data-menu");
        const menuIndex = menuItems.indexOf(menuTarget);
        if (menuIndex !== -1) {
          currentStep = menuIndex + 1;
          updateStepDisplay();
        }
      });
    });

    // Back button
    const btnBack = document.getElementById("btnBack");
    if (btnBack) {
      btnBack.addEventListener("click", () => {
        if (currentStep > 1) {
          currentStep--;
          updateStepDisplay();
        }
      });
    }

    // Next button
    const btnNext = document.getElementById("btnNext");
    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (currentStep < totalSteps) {
          currentStep++;
          updateStepDisplay();
        } else {
          // Submit form or go to next major step
          alert(
            "Form Step 1 selesai! Lanjut ke Indikator Kinerja Utama & RENSTRA"
          );
        }
      });
    }
  }

  // Update Step Display
  function updateStepDisplay() {
    // Update menu buttons
    document.querySelectorAll(".menu-button").forEach((btn, index) => {
      if (index + 1 === currentStep) {
        btn.classList.add("active");
        btn.style.borderColor = "#00BCD4";
        btn.style.background = "rgba(0, 188, 212, 0.1)";
      } else {
        btn.classList.remove("active");
        btn.style.borderColor = "transparent";
        btn.style.background = "rgba(255, 255, 255, 0.8)";
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

    if (btnNext && btnNext.querySelector("span:last-child")) {
      if (currentStep === totalSteps) {
        btnNext.innerHTML = "Submit";
      } else {
        btnNext.innerHTML = "Next <span>→</span>";
      }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Dynamic Field Functions (Global scope)
  window.removeField = function (btn) {
    const item = btn.closest(".mb-4, .dynamic-field-item");
    const container = item.parentElement;
    if (container.children.length > 1) {
      item.remove();
    } else {
      alert("Minimal harus ada 1 field!");
    }
  };

  window.addSasaranUtama = function () {
    const container = document.getElementById("sasaranUtamaContainer");
    const newItem = document.createElement("div");
    newItem.className = "flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addManfaat = function () {
    const container = document.getElementById("manfaatContainer");
    const newItem = document.createElement("div");
    newItem.className = "flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addTahapanPelaksanaan = function () {
    const container = document.getElementById("tahapanPelaksanaanContainer");
    const newItem = document.createElement("div");
    newItem.className = "flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addIndikatorKinerja = function () {
    const container = document.getElementById("indikatorKinerjaContainer");
    const newItem = document.createElement("div");
    newItem.className = "mb-4";
    newItem.innerHTML = `
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
        </div>
      </div>
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  window.addTahapanPelaksanaanKinerja = function () {
    const container = document.getElementById(
      "tahapanPelaksanaanKinerjaContainer"
    );
    const newItem = document.createElement("div");
    newItem.className = "flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);
  };

  // Initialize
  init();

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}
