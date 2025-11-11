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
      .main-step-content {
        display: none;
      }
      .main-step-content.active {
        display: block;
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
      <div class="flex justify-center gap-24 mb-8 backdrop-blur-md p-6 rounded-xl shadow-lg" style="background: rgba(255, 255, 255, 0.8);">

        <!-- Step 1 -->
        <div class="progress-step-item flex items-center justify-center gap-3 px-4 cursor-pointer" data-main-step="1">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300"
               style="background: #00BCD4; color: #FFFFFF; box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4);">
            1
          </div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #00BCD4;">Kerangka Acuan Kerja</div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="progress-step-item flex items-center justify-center gap-3 px-4 cursor-pointer" data-main-step="2">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300"
               style="background: #E5E7EB; color: #6B7280;">
            2
          </div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #6B7280;">Indikator Kinerja Utama</div>
            <div class="progress-step-subtext text-xs" style="color: #9CA3AF;">& RENSTRA</div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="progress-step-item flex items-center justify-center gap-3 px-4 cursor-pointer" data-main-step="3">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300"
               style="background: #E5E7EB; color: #6B7280;">
            3
          </div>
          <div class="text-left">
            <div class="progress-step-text text-sm font-semibold" style="color: #6B7280;">Rincian Anggaran Biaya</div>
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
                <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Gambaran Umum</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="penerima-manfaat">
                <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Penerima Manfaat</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="strategi-pencapaian">
                <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Strategi Pencapaian</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="indikator-kinerja">
                <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Indikator Kinerja</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="kurun-waktu">
                <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Kurun Waktu Pelaksanaan</div>
              </button>
            </div>

            <!-- Main Form Area -->
            <div class="flex-1 min-h-[500px]">
              <div class="border border-gray-200 rounded-xl p-6">
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
                      <div class="flex items-end gap-4 mb-6">
                        <div class='w-full'>
                          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                        </div>
                        <div class='w-full'>
                          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                        </div>
                        <div class='w-full'>
                          <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
                          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                        </div>
                        <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
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

      <!-- Main Step 2: Indikator Kinerja Utama & Renstra -->
      <div class="main-step-content" id="main-step-2">
        <div class="bg-white rounded-xl shadow-lg p-8">
          <div class="flex gap-8">
            <!-- Sidebar Menu -->
            <div class="flex flex-col gap-4 w-96">
              <button class="menu-button-iku border-2 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3 active" data-menu-iku="indikator-kinerja-renstra" style="border-color: #00BCD4; background: rgba(0, 188, 212, 0.1);">
                <div class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;">O</div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Indikator Kinerja Utama<br/>& Renstra</div>
              </button>
            </div>

            <!-- Main Form Area -->
            <div class="flex-1 min-h-[500px]">
              <div class="border border-gray-200 rounded-xl p-6">
                <!-- Indikator Kinerja Utama & Renstra -->
                <div class="step-content-iku active" id="indikator-kinerja-renstra">
                  <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja Utama & Renstra</h4>
                  
                  <div class="mb-8" id="ikuRenstraContainer">
                    <div class="grid grid-cols-[1fr_1fr_auto] gap-4 items-end mb-4 iku-item">
                      <div>
                        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
                        <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                          <option value="">Input</option>
                        </select>
                      </div>
                      <div>
                        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
                        <div class="flex gap-2 items-center">
                          <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                          <div class="px-3 py-3 text-sm font-semibold" style="color: #374151;">%</div>
                        </div>
                      </div>
                      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeIkuField(this)">
                        <span class="text-xl font-bold">−</span>
                      </button>
                    </div>
                  </div>
                  
                  <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addIkuField()">Tambah</button>
                </div>
              </div>
            </div>
          </div>
          
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
          <h4 class="mb-8 font-bold text-xl" style="color: #00BCD4;">Rincian Anggaran Biaya</h4>
          
          <!-- Belanja Barang Section -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Barang</h5>
            <div id="belanjaBarangContainer">
              <div class="belanja-barang-item mb-8 p-6 rounded-lg">
                <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end">
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                    <div class="relative">
                      <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementValue(this, 1)">▲</button>
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementValue(this, 1)">▼</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
                      <option value="unit">Unit</option>
                      <option value="pcs">Pcs</option>
                      <option value="box">Box</option>
                      <option value="set">Set</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                    <div class="relative">
                      <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementValue(this, 1)">▲</button>
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementValue(this, 1)">▼</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Optional)</label>
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
                      <option value="hari">Hari</option>
                      <option value="bulan">Bulan</option>
                      <option value="tahun">Tahun</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div class="flex items-end pb-3">
                    <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeBelanjaItem(this, 'belanjaBarangContainer')">
                      <span class="text-xl font-bold">−</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addBelanjaBarang()">Tambah Item Barang</button>
          </div>

          <!-- Belanja Jasa Section -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Jasa</h5>
            <div id="belanjaJasaContainer">
              <div class="belanja-jasa-item mb-8 p-6 rounded-lg">
                <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end">
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                    <div class="relative">
                      <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementValue(this, 1)">▲</button>
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementValue(this, 1)">▼</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
                      <option value="orang">Orang</option>
                      <option value="jam">Jam</option>
                      <option value="hari">Hari</option>
                      <option value="bulan">Bulan</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                    <div class="relative">
                      <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementValue(this, 1)">▲</button>
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementValue(this, 1)">▼</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Optional)</label>
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
                      <option value="hari">Hari</option>
                      <option value="bulan">Bulan</option>
                      <option value="tahun">Tahun</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div class="flex items-end pb-3">
                    <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeBelanjaItem(this, 'belanjaJasaContainer')">
                      <span class="text-xl font-bold">−</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addBelanjaJasa()">Tambah Item Barang</button>
          </div>

          <!-- Belanja Perjalanan Section -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Perjalanan</h5>
            <div id="belanjaPerjalananContainer">
              <div class="belanja-perjalanan-item mb-8 p-6 rounded-lg">
                <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end">
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                    <div class="relative">
                      <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementValue(this, 1)">▲</button>
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementValue(this, 1)">▼</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
                      <option value="orang">Orang</option>
                      <option value="perjalanan">Perjalanan</option>
                      <option value="kali">Kali</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                    <div class="relative">
                      <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementValue(this, 1)">▲</button>
                        <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementValue(this, 1)">▼</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Optional)</label>
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
                      <option value="hari">Hari</option>
                      <option value="bulan">Bulan</option>
                      <option value="tahun">Tahun</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div class="flex items-end pb-3">
                    <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeBelanjaItem(this, 'belanjaPerjalananContainer')">
                      <span class="text-xl font-bold">−</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addBelanjaPerjalanan()">Tambah Item Barang</button>
          </div>
          
          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" onmouseover="this.style.background='rgba(0, 188, 212, 0.2)';" onmouseout="this.style.background='rgba(0, 188, 212, 0.1)';" id="btnBackRab">
              <span>←</span> Back
            </button>
            <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" id="btnSubmitRab">
              Submit
            </button>
          </div>
        </div>
      </div>

    </div>
  `;

  // Render the main layout
  renderDashboardLayout(pageContent, userRole);

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

  // Initialize
  function init() {
    updateMainStepDisplay();
    updateStepDisplay();
    attachEventListeners();
  }

  // Update Main Progress Step Display
  function updateMainStepDisplay() {
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
        circle.innerHTML = "✓";
        text.style.color = "#10B981";
        if (subtext) subtext.style.color = "#10B981";
      } else if (stepNum === mainStep) {
        // Active step
        circle.style.background = "#00BCD4";
        circle.style.color = "#FFFFFF";
        circle.style.boxShadow = "0 4px 12px rgba(0, 188, 212, 0.4)";
        circle.innerHTML = stepNum;
        text.style.color = "#00BCD4";
        if (subtext) subtext.style.color = "#00BCD4";
      } else {
        // Upcoming step
        circle.style.background = "#E5E7EB";
        circle.style.color = "#6B7280";
        circle.style.boxShadow = "none";
        circle.innerHTML = stepNum;
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

  // Attach Event Listeners
  function attachEventListeners() {
    // Progress step items - allow clicking to navigate
    document.querySelectorAll(".progress-step-item").forEach((step) => {
      step.addEventListener("click", function () {
        const targetStep = parseInt(this.getAttribute("data-main-step"));
        // Only allow navigation to completed or current step
        if (targetStep <= mainStep) {
          mainStep = targetStep;
          if (mainStep === 1) {
            currentStep = 1; // Reset to first sub-step when going back to step 1
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
          currentStep = menuIndex + 1;
          updateStepDisplay();
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
        if (currentStep < totalSteps) {
          currentStep++;
          updateStepDisplay();
        } else {
          // Move to main step 2
          mainStep = 2;
          updateMainStepDisplay();
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
    const btnNextIku = document.getElementById("btnNextIku");
    if (btnNextIku) {
      btnNextIku.addEventListener("click", () => {
        mainStep = 3;
        updateMainStepDisplay();
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

    // Submit button for Step 3 (RAB)
    const btnSubmitRab = document.getElementById("btnSubmitRab");
    if (btnSubmitRab) {
      btnSubmitRab.addEventListener("click", () => {
        window.location.href = "/pengusul/form-kak";
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
                      <div class="flex items-end gap-4 mb-6">
                  <div class='w-full'>
                    <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div class='w-full'>
                    <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <div class='w-full'>
                    <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
                    <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                  </div>
                  <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
                    <span class="text-xl font-bold">−</span>
                  </button>
                </div>

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

  // IKU Field Functions
  window.removeIkuField = function (btn) {
    const item = btn.closest(".iku-item");
    const container = document.getElementById("ikuRenstraContainer");
    if (container.querySelectorAll(".iku-item").length > 1) {
      item.remove();
    } else {
      alert("Minimal harus ada 1 field!");
    }
  };

  window.addIkuField = function () {
    const container = document.getElementById("ikuRenstraContainer");
    const newItem = document.createElement("div");
    newItem.className =
      "grid grid-cols-[1fr_1fr_auto] gap-4 items-end mb-4 iku-item";
    newItem.innerHTML = `
      <div>
        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
        <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
          <option value="">Input</option>
        </select>
      </div>
      <div>
        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
        <div class="flex gap-2 items-center">
          <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
          <div class="px-3 py-3 text-sm font-semibold" style="color: #374151;">%</div>
        </div>
      </div>
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeIkuField(this)">
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
