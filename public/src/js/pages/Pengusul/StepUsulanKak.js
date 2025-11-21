// frontend/src/pages/Pengusul/UsulanKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderUsulanKakPage(path, userRole) {
  const pathSegments = path.split("/").filter((segment) => segment);
  const kakId =
    pathSegments.length > 2 && pathSegments[1] === "usulan-kak"
      ? pathSegments[2]
      : null;
  const isEditMode = kakId !== null;

  const pageContent = `
    <!-- Add required CSS for daterangepicker in the head section -->
    <link rel="stylesheet" href="../../assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css" />
    
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
            <div class="progress-step-subtext text-xs" style="color: #9CA3AF;">& RENSTRA</div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="progress-step-item flex items-center justify-center gap-3 px-4 cursor-pointer" data-main-step="3">
          <div class="progress-step-circle w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
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
                <div class="w-8 h-8 rounded-full flex items-center justify-center style="font-size: 5px" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-file-text">&#xff43;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Gambaran Umum</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="penerima-manfaat">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style="font-size: 5px" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-users">&#xf7cd;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Penerima Manfaat</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="strategi-pencapaian">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style="font-size: 5px" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-target">&#xeb35;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Strategi Pencapaian</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="indikator-kinerja">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style="font-size: 5px" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-chart-bar">&#xea59;</i></div>
                <div class="font-semibold text-base" style="color: #00BCD4;">Indikator Kinerja</div>
              </button>
              <button class="menu-button border-2 border-gray-200 rounded-xl p-4 text-left cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-3" data-menu="kurun-waktu">
                <div class="w-8 h-8 rounded-full flex items-center justify-center style="font-size: 5px" font-bold text-sm" style="background: #00BCD4; color: #FFFFFF;"><i class="ti ti-calendar">&#xea53;</i></div>
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
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
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
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
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
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
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
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
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
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
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
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                      <option value="">Input</option>
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

  // Add custom CSS for daterangepicker colors
  const style = document.createElement("style");
  style.textContent = `
    /* Override Bootstrap Daterangepicker colors to match cyan theme */
    .daterangepicker {
      border-color: #00BCD4 !important;
    }
    
    .daterangepicker .calendar-table {
      border-color: #E5F8FB !important;
    }
    
    .daterangepicker td.active, 
    .daterangepicker td.active:hover {
      background-color: #00BCD4 !important;
      border-color: #00BCD4 !important;
      color: #FFFFFF !important;
    }
    
    .daterangepicker td.in-range {
      background-color: #E5F8FB !important;
      color: #374151 !important;
    }
    
    .daterangepicker td.available:hover {
      background-color: #E5F8FB !important;
      color: #374151 !important;
    }
    
    .daterangepicker .ranges li.active {
      background-color: #00BCD4 !important;
      color: #FFFFFF !important;
    }
    
    .daterangepicker .ranges li:hover {
      background-color: #E5F8FB !important;
      color: #374151 !important;
    }
    
    .daterangepicker td.start-date {
      background-color: #00BCD4 !important;
      border-color: #00BCD4 !important;
      color: #FFFFFF !important;
    }
    
    .daterangepicker td.end-date {
      background-color: #00BCD4 !important;
      border-color: #00BCD4 !important;
      color: #FFFFFF !important;
    }
    
    .daterangepicker .drp-buttons .btn-primary {
      background-color: #00BCD4 !important;
      border-color: #00BCD4 !important;
      color: #FFFFFF !important;
    }
    
    .daterangepicker .drp-buttons .btn-primary:hover {
      background-color: #0097A7 !important;
      border-color: #0097A7 !important;
    }
    
    .daterangepicker th.month {
      color: #00BCD4 !important;
    }
    
    .daterangepicker td.off, 
    .daterangepicker td.off.in-range, 
    .daterangepicker td.off.start-date, 
    .daterangepicker td.off.end-date {
      background-color: #F9FAFB !important;
      color: #9CA3AF !important;
    }
    
    .daterangepicker select.monthselect, 
    .daterangepicker select.yearselect {
      border-color: #E5E7EB !important;
    }
    
    .daterangepicker select.monthselect:focus, 
    .daterangepicker select.yearselect:focus {
      border-color: #00BCD4 !important;
      outline: none !important;
      box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1) !important;
    }
    
    .daterangepicker .calendar-table .next span,
    .daterangepicker .calendar-table .prev span {
      border-color: #00BCD4 !important;
    }
    
    .daterangepicker .calendar-table .next:hover,
    .daterangepicker .calendar-table .prev:hover {
      background-color: #E5F8FB !important;
    }
    
    .daterangepicker td.today {
      background-color: #E5F8FB !important;
      color: #374151 !important;
    }
    
    .daterangepicker td.today.active {
      background-color: #00BCD4 !important;
      color: #FFFFFF !important;
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
        startDate: moment("2025-03-11", "YYYY-MM-DD"),
        endDate: moment("2025-03-11", "YYYY-MM-DD").add(7, "days"),
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
  // VALIDATION FUNCTIONS
  // ==============================================

  if (typeof showSuccess !== 'function') {
    window.showSuccess = function(message) {
        alert('Success: ' + message);
    }
  }
  if (typeof showError !== 'function') {
      window.showError = function(message) {
          alert('Error: ' + message);
      }
  }

  function validateKAKStep(step) {
    let isValid = true;
    // Clear previous errors for the current step
    document.querySelectorAll(`#main-step-1 .step-content.active .validation-error`).forEach(el => el.remove());
    document.querySelectorAll(`#main-step-1 .step-content.active .is-invalid`).forEach(el => {
        el.classList.remove('is-invalid');
        el.style.borderColor = '#E5E7EB';
    });
  
    const addError = (el, message) => {
        isValid = false;
        el.classList.add('is-invalid');
        el.style.borderColor = '#EF4444';
        const errorEl = document.createElement('p');
        errorEl.className = 'validation-error text-red-500 text-sm mt-1';
        errorEl.textContent = message;
        el.parentElement.appendChild(errorEl);
    };
  
    if (step === 1) { // Gambaran Umum
        const namaKegiatan = document.getElementById('namaKegiatan');
        if (!namaKegiatan.value) addError(namaKegiatan, 'Nama Kegiatan wajib diisi.');
  
        const gambaranUmum = document.getElementById('gambaranUmum');
        if (!gambaranUmum.value) addError(gambaranUmum, 'Gambaran Umum Kegiatan wajib diisi.');
  

  
    } else if (step === 2) { // Penerima Manfaat
        const sasaranInputs = document.querySelectorAll('#sasaranUtamaContainer input');
        sasaranInputs.forEach(input => {
            if (!input.value) addError(input, 'Sasaran Utama wajib diisi.');
        });
        const manfaatInputs = document.querySelectorAll('#manfaatContainer input');
        manfaatInputs.forEach(input => {
            if (!input.value) addError(input, 'Manfaat wajib diisi.');
        });
        if (sasaranInputs.length === 0) {
            showError('Harap tambahkan setidaknya satu Sasaran Utama.');
            isValid = false;
        }
    } else if (step === 3) { // Strategi Pencapaian
        const metodePelaksanaan = document.getElementById('metodePelaksanaan');
        if (!metodePelaksanaan.value) addError(metodePelaksanaan, 'Metode Pelaksanaan wajib diisi.');
  
        const tahapanInputs = document.querySelectorAll('#tahapanPelaksanaanContainer input');
        tahapanInputs.forEach(input => {
            if (!input.value) addError(input, 'Tahapan Pelaksanaan wajib diisi.');
        });
        if (tahapanInputs.length === 0) {
            showError('Harap tambahkan setidaknya satu Tahapan Pelaksanaan.');
            isValid = false;
        }
    } else if (step === 4) { // Indikator Kinerja
        const indikatorRows = document.querySelectorAll('#indikatorKinerjaContainer > div');
        indikatorRows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const bulan = inputs[0];
            const deskripsi = inputs[1];
            const persentase = inputs[2];
            if (!bulan.value) addError(bulan, 'Bulan wajib diisi.');
            if (!deskripsi.value) addError(deskripsi, 'Indikator Keberhasilan wajib diisi.');
            if (!persentase.value) {
                addError(persentase, 'Target wajib diisi.');
            }
        });
        if (indikatorRows.length === 0) {
            showError('Harap tambahkan setidaknya satu Indikator Kinerja.');
            isValid = false;
        }
    } else if (step === 5) { // Kurun Waktu
        const kurunWaktu = document.getElementById('kurunWaktu');
        if (!kurunWaktu.value) addError(kurunWaktu, 'Kurun Waktu Pelaksanaan wajib diisi.');
    }
  
    if (!isValid) {
        showError('Silakan perbaiki kesalahan pada form sebelum melanjutkan.');
    }
  
    return isValid;
  }

  function validateIkuStep() {
      let isValid = true;
      document.querySelectorAll('#main-step-2 .validation-error').forEach(el => el.remove());
      document.querySelectorAll('#main-step-2 .is-invalid').forEach(el => {
          el.classList.remove('is-invalid');
          el.style.borderColor = '#E5E7EB';
      });

      const addError = (el, message) => {
          isValid = false;
          el.classList.add('is-invalid');
          el.style.borderColor = '#EF4444';
          const errorEl = document.createElement('p');
          errorEl.className = 'validation-error text-red-500 text-sm mt-1';
          errorEl.textContent = message;
          el.parentElement.appendChild(errorEl);
      };

      const ikuRows = document.querySelectorAll('#ikuRenstraContainer .iku-item');
      if (ikuRows.length > 0) {
        ikuRows.forEach(row => {
            const select = row.querySelector('select');
            const input = row.querySelector('input');
            if (!select.value) addError(select, 'IKU wajib dipilih.');
            if (!input.value) {
                addError(input, 'Target wajib diisi.');
            }
        });
      }
      
      if (!isValid) {
          showError('Silakan perbaiki kesalahan pada form sebelum melanjutkan.');
      }

      return isValid;
  }

  function validateRabStep() {
    let isValid = true;
    document.querySelectorAll('#main-step-3 .validation-error').forEach(el => el.remove());
    document.querySelectorAll('#main-step-3 .is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
        el.style.borderColor = '#E5E7EB';
    });

    const addError = (el, message) => {
        isValid = false;
        el.classList.add('is-invalid');
        el.style.borderColor = '#EF4444';
        const errorEl = document.createElement('p');
        errorEl.className = 'validation-error text-red-500 text-sm mt-1';
        errorEl.textContent = message;
        el.parentElement.appendChild(errorEl);
    };

    const validateSection = (containerId) => {
        const items = document.querySelectorAll(`#${containerId} .grid`);
        items.forEach(item => {
            const inputs = item.querySelectorAll('input, select');
            const uraian = inputs[0];
            const qty1 = inputs[1];
            const satuan1 = inputs[2];
            const harga = inputs[5];

            // Only validate if any field in the row is filled
            if (uraian.value || qty1.value !== '1' || satuan1.value || inputs[3].value !== '1' || inputs[4].value || harga.value) {
              if (!uraian.value) addError(uraian, 'Uraian wajib diisi.');
              if (!qty1.value) addError(qty1, 'Qty 1 wajib diisi.');
              if (!satuan1.value) addError(satuan1, 'Satuan 1 wajib dipilih.');
              if (!harga.value) addError(harga, 'Harga Satuan wajib diisi.');
            }
        });
    };

    validateSection('belanjaBarangContainer');
    validateSection('belanjaJasaContainer');
    validateSection('belanjaPerjalananContainer');
    
    if (!isValid) {
        showError('Silakan perbaiki kesalahan pada form sebelum melanjutkan.');
    }

    return isValid;
  }
  
  function validateAllSteps() {
      const kakValid = [1, 2, 3, 4, 5].every(step => validateKAKStep(step));
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
          showError('Terdapat kesalahan pada isian Kerangka Acuan Kerja.');
          return false;
      }
      if (!ikuValid) {
          mainStep = 2;
          updateMainStepDisplay();
          showError('Terdapat kesalahan pada isian IKU & Renstra.');
          return false;
      }
      if (!rabValid) {
          mainStep = 3;
          updateMainStepDisplay();
          showError('Terdapat kesalahan pada isian Rincian Anggaran Biaya.');
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
        circle.innerHTML = `<i class="${iconsForSteps[stepNum].class}">${iconsForSteps[stepNum].entity}</i>`;
        text.style.color = "#00BCD4";
        if (subtext) subtext.style.color = "#00BCD4";
      } else {
        // Upcoming step
        circle.style.background = "#E5E7EB";
        circle.style.color = "#6B7280";
        circle.style.boxShadow = "none";
        circle.innerHTML = `<i class="${iconsForSteps[stepNum].class}">${iconsForSteps[stepNum].entity}</i>`;
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
  function init() {
    loadDateRangePicker();
    updateMainStepDisplay();
    updateStepDisplay();
    attachEventListeners();
    populateIkuDropdowns(); // Populate IKU dropdowns on init
    populateSatuanDropdowns(); // Populate Satuan dropdowns on init
  }

  // ==============================================  // API FUNCTIONS
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
        // Check for successful HTTP status code
        throw new Error(
          data.message || `API request failed with status ${response.status}`
        );
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
      return `${months} bulan ${
        remainingDays > 0 ? `${remainingDays} hari` : ""
      }`.trim();
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} tahun ${
        remainingMonths > 0 ? `${remainingMonths} bulan` : ""
      }`.trim();
    }
  }

  // Helper to combine separate sasaran and manfaat lists into one for backend
  function combineSasaranManfaat(sasaranArray, manfaatArray) {
    const combined = [];
    const maxLength = Math.max(sasaranArray.length, manfaatArray.length);
    for (let i = 0; i < maxLength; i++) {
      combined.push({
        sasaran_utama: sasaranArray[i] || "",
        manfaat: manfaatArray[i] || "",
      });
    }
    return combined;
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

      const satuanSelects = document.querySelectorAll(".satuan-select");
      satuanSelects.forEach((select) => {
        const isPlaceholder =
          select.options.length > 0 && select.options[0].value === "";
        while (select.options.length > (isPlaceholder ? 1 : 0)) {
          select.remove(isPlaceholder ? 1 : 0);
        }

        satuanData.forEach((satuan) => {
          const option = document.createElement("option");
          option.value = satuan.satuan_id;
          option.textContent = satuan.nama_satuan;
          select.appendChild(option);
        });
      });
    } catch (error) {
      console.error("Error populating Satuan dropdowns:", error);
      showError("Gagal memuat data Satuan. Silakan coba lagi.");
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
      const rows = container.querySelectorAll(".flex.items-end.gap-4");
      return Array.from(rows)
        .map((row) => ({
          bulan_indikator: row.children[0].querySelector("input").value,
          deskripsi_target: row.children[1].querySelector("input").value,
          persentase_target:
            parseFloat(row.children[2].querySelector("input").value) || 0,
        }))
        .filter(
          (item) =>
            item.bulan_indikator ||
            item.deskripsi_target ||
            item.persentase_target
        );
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
        .filter((item) => item.iku_id || item.persentase_target);
    };

    const getAnggaranItems = (containerId) => {
      const container = document.getElementById(containerId);
      if (!container) return [];
      return Array.from(container.querySelectorAll(".grid"))
        .map((row) => {
          const inputs = row.querySelectorAll("input, select");
          return {
            uraian: inputs[0].value,
            volume1: parseInt(inputs[1].value) || 1,
            satuan1_id: parseInt(inputs[2].value) || null, // Directly get satuan_id from select value
            volume2: parseInt(inputs[3].value) || 1,
            satuan2_id: parseInt(inputs[4].value) || null, // Directly get satuan_id from select value
            harga_satuan: parseFloat(inputs[5].value) || 0,
          };
        })
        .filter((item) => item.uraian || item.harga_satuan);
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

    const sasaranUtamaList = getDynamicListValues("sasaranUtamaContainer");
    const manfaatList = getDynamicListValues("manfaatContainer");
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

        // Assembled penerima_manfaat
        penerima_manfaat: combineSasaranManfaat(sasaranUtamaList, manfaatList),

        // Transformed tahapan_pelaksanaan
        tahapan_pelaksanaan: getDynamicListValues(
          "tahapanPelaksanaanContainer"
        ).map((nama, index) => ({
          nama_tahapan: nama,
          urutan: index + 1,
        })),

        // FIX: Include indikator_kinerja data here instead of empty array
        indikator_kinerja: indikatorKinerjaData.map((item) => ({
          bulan_indikator: item.bulan_indikator,
          deskripsi_target: item.deskripsi_target,
          persentase_target: item.persentase_target,
        })),
      },

      // These are top-level arrays for target_iku and rab
      target_iku: getIkuRenstraData().map((item) => ({
        iku_id: item.iku_id,
        persentase_target: item.persentase_target,
      })),

      rab: [
        ...getAnggaranItems("belanjaBarangContainer"),
        ...getAnggaranItems("belanjaJasaContainer"),
        ...getAnggaranItems("belanjaPerjalananContainer"),
      ],
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
    const btnNextIku = document.getElementById("btnNextIku");
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
  window.removeField = function (btn) {
    const item = btn.closest(".mb-4, .dynamic-field-item");
    const container = item.parentElement;
    if (container.children.length > 1) {
      item.remove();
    } else {
      showError("Minimal harus ada 1 field!");
    }
  };

  window.addSasaranUtama = function () {
    const container = document.getElementById("sasaranUtamaContainer");

    // Save current values
    const currentValues = Array.from(container.querySelectorAll("input")).map(input => input.value);

    const newItem = document.createElement("div");
    newItem.className = "flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);

    // Restore old values
    const inputs = container.querySelectorAll("input");
    currentValues.forEach((value, index) => {
        if (inputs[index]) {
            inputs[index].value = value;
        }
    });
  };

  window.addManfaat = function () {
    const container = document.getElementById("manfaatContainer");

    // Save current values
    const currentValues = Array.from(container.querySelectorAll("input")).map(input => input.value);

    const newItem = document.createElement("div");
    newItem.className = "flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);

    // Restore old values
    const inputs = container.querySelectorAll("input");
    currentValues.forEach((value, index) => {
        if (inputs[index]) {
            inputs[index].value = value;
        }
    });
  };

  window.addTahapanPelaksanaan = function () {
    const container = document.getElementById("tahapanPelaksanaanContainer");
    
    // Save current values
    const currentValues = Array.from(container.querySelectorAll("input")).map(input => input.value);

    const newItem = document.createElement("div");
    newItem.className = "flex gap-4 items-start mb-4";
    newItem.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    container.appendChild(newItem);

    // Restore old values
    const inputs = container.querySelectorAll("input");
    currentValues.forEach((value, index) => {
        if (inputs[index]) {
            inputs[index].value = value;
        }
    });
  };

  window.addIndikatorKinerja = function () {
    const container = document.getElementById("indikatorKinerjaContainer");

    // Save current values
    const currentValues = [];
    container.querySelectorAll(".flex.items-end.gap-4.mb-6").forEach(item => {
        const inputs = item.querySelectorAll("input[type='text']");
        currentValues.push({
            bulan: inputs[0].value,
            indikator: inputs[1].value,
            target: inputs[2].value
        });
    });

    const newItem = document.createElement("div");
    newItem.className = "flex items-end gap-4 mb-6";
    newItem.innerHTML = `
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
    `;
    container.appendChild(newItem);

    // Restore old values
    const items = container.querySelectorAll(".flex.items-end.gap-4.mb-6");
    currentValues.forEach((value, index) => {
        if (items[index]) {
            const inputs = items[index].querySelectorAll("input[type='text']");
            inputs[0].value = value.bulan;
            inputs[1].value = value.indikator;
            inputs[2].value = value.target;
        }
    });
  };

  window.addIkuField = function () {
    const container = document.getElementById("ikuRenstraContainer");

    // Save current values
    const currentValues = [];
    container.querySelectorAll(".iku-item").forEach(item => {
        const select = item.querySelector("select");
        const input = item.querySelector("input[type='text']");
        currentValues.push({
            iku_id: select.value,
            persentase_target: input.value
        });
    });

    // Add new empty field
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
    
    // Repopulate and restore values
    populateIkuDropdowns().then(() => {
        container.querySelectorAll(".iku-item").forEach((item, index) => {
            if (currentValues[index]) {
                const select = item.querySelector("select");
                const input = item.querySelector("input[type='text']");
                select.value = currentValues[index].iku_id;
                input.value = currentValues[index].persentase_target;
            }
        });
    });
  };
  // Increment/Decrement value functions
  window.incrementValue = function (btn, step) {
    const input = btn
      .closest(".relative")
      .querySelector('input[type="number"]');
    const currentValue = parseInt(input.value) || 1;
    input.value = currentValue + step;
  };

  window.decrementValue = function (btn, step) {
    const input = btn
      .closest(".relative")
      .querySelector('input[type="number"]');
    const currentValue = parseInt(input.value) || 1;
    const minValue = parseInt(input.min) || 1;
    if (currentValue > minValue) {
      input.value = currentValue - step;
    }
  };

  // Belanja item functions
  window.removeBelanjaItem = function (btn, containerId) {
    const item = btn.closest(
      ".belanja-barang-item, .belanja-jasa-item, .belanja-perjalanan-item"
    );
    const container = document.getElementById(containerId);
    if (container.children.length > 1) {
      item.remove();
    } else {
      showError("Minimal harus ada 1 item!");
    }
  };

  window.addBelanjaBarang = function () {
    const container = document.getElementById("belanjaBarangContainer");

    // Save current values
    const currentValues = [];
    container.querySelectorAll(".belanja-barang-item").forEach(item => {
        const inputs = item.querySelectorAll("input, select");
        currentValues.push({
            uraian: inputs[0].value,
            qty1: inputs[1].value,
            satuan1: inputs[2].value,
            qty2: inputs[3].value,
            satuan2: inputs[4].value,
            harga: inputs[5].value
        });
    });

    const newItem = document.createElement("div");
    newItem.className = "belanja-barang-item mb-8 p-6 rounded-lg";
    // Construct innerHTML dynamically for select elements
    newItem.innerHTML = `
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
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
            <option value="">Input</option>
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
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
            <option value="">Input</option>
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
    `;
    container.appendChild(newItem);
    
    // Repopulate and restore values
    populateSatuanDropdowns().then(() => {
        const items = container.querySelectorAll(".belanja-barang-item");
        currentValues.forEach((value, index) => {
            if (items[index]) {
                const inputs = items[index].querySelectorAll("input, select");
                inputs[0].value = value.uraian;
                inputs[1].value = value.qty1;
                inputs[2].value = value.satuan1;
                inputs[3].value = value.qty2;
                inputs[4].value = value.satuan2;
                inputs[5].value = value.harga;
            }
        });
    });
  };

  window.addBelanjaJasa = function () {
    const container = document.getElementById("belanjaJasaContainer");
    const newItem = document.createElement("div");
    newItem.className = "belanja-jasa-item mb-8 p-6 rounded-lg";
    newItem.innerHTML = `
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
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
            <option value="">Input</option>
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
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
            <option value="">Input</option>
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
    `;
    container.appendChild(newItem);
    populateSatuanDropdowns(); // Populate dropdowns for new item
  };

  window.addBelanjaPerjalanan = function () {
    const container = document.getElementById("belanjaPerjalananContainer");
    const newItem = document.createElement("div");
    newItem.className = "belanja-perjalanan-item mb-8 p-6 rounded-lg";
    newItem.innerHTML = `
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
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
            <option value="">Input</option>
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
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4 satuan-select" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
            <option value="">Input</option>
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
    `;
    container.appendChild(newItem);
    populateSatuanDropdowns(); // Populate dropdowns for new item
  };

  async function fetchAndPopulateKakData(id) {
    try {
      const response = await apiRequest(`/kak/${id}/data`);
      const kakData = response.data;

      console.log("Fetched KAK Data:", kakData);

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
        const sasaranContainer = document.getElementById(
          "sasaranUtamaContainer"
        );
        const manfaatContainer = document.getElementById("manfaatContainer");

        // Clear existing fields
        sasaranContainer.innerHTML = "";
        manfaatContainer.innerHTML = "";

        kakData.manfaat.forEach((item, index) => {
          // Add sasaran utama field
          if (item.sasaran_utama) {
            const sasaranDiv = createDynamicField(
              item.sasaran_utama,
              "removeField"
            );
            sasaranContainer.appendChild(sasaranDiv);
          }

          // Add manfaat field
          if (item.manfaat) {
            const manfaatDiv = createDynamicField(item.manfaat, "removeField");
            manfaatContainer.appendChild(manfaatDiv);
          }
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
            const tahapanDiv = createDynamicField(
              item.nama_tahapan,
              "removeField"
            );
            tahapanContainer.appendChild(tahapanDiv);
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
          const indikatorDiv = createIndikatorKinerjaField(
            item.bulan_indikator || "",
            item.deskripsi_target || "",
            item.persentase_target || ""
          );
          indikatorContainer.appendChild(indikatorDiv);
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
          const ikuDiv = createIkuField(
            item.iku_id || "",
            item.persentase_target || ""
          );
          ikuContainer.appendChild(ikuDiv);
        });

        // Populate IKU dropdowns after creating fields
        populateIkuDropdowns();
      }

      // Populate Main Step 3: RAB
      if (kakData.anggaran && kakData.anggaran.length > 0) {
        // Clear existing containers
        document.getElementById("belanjaBarangContainer").innerHTML = "";
        document.getElementById("belanjaJasaContainer").innerHTML = "";
        document.getElementById("belanjaPerjalananContainer").innerHTML = "";

        // You might need logic to categorize anggaran into Barang/Jasa/Perjalanan
        // For now, assuming all goes to belanjaBarangContainer
        kakData.anggaran.forEach((item) => {
          const anggaranDiv = createAnggaranField(
            item.uraian || "",
            item.volume1 || 1,
            item.satuan1_id || "",
            item.volume2 || 1,
            item.satuan2_id || "",
            item.harga_satuan || 0
          );
          document
            .getElementById("belanjaBarangContainer")
            .appendChild(anggaranDiv);
        });

        // Populate satuan dropdowns
        populateSatuanDropdowns();
      }

      showSuccess("Data berhasil dimuat untuk diedit");
    } catch (error) {
      console.error("Error fetching KAK data:", error);
      showError(`Gagal memuat data: ${error.message}`);
    }
  }

  function createDynamicField(value, removeFunction) {
    const div = document.createElement("div");
    div.className = "flex gap-4 items-start mb-4";
    div.innerHTML = `
      <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" 
        style="border-color: #E5E7EB; background: #FFFFFF;" 
        onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" 
        onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" 
        placeholder="Input" value="${value}">
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" 
        style="background: #EF4444; color: #FFFFFF;" 
        onmouseover="this.style.background='#DC2626';" 
        onmouseout="this.style.background='#EF4444';" 
        onclick="${removeFunction}(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    return div;
  }

  function createIndikatorKinerjaField(bulan, indikator, target) {
    const div = document.createElement("div");
    div.className = "flex items-end gap-4 mb-6";
    div.innerHTML = `
      <div class='w-full'>
        <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Bulan</label>
        <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" 
          style="border-color: #E5E7EB; background: #FFFFFF;" 
          onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" 
          onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" 
          placeholder="Input" value="${bulan}">
      </div>
      <div class='w-full'>
        <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Indikator Keberhasilan</label>
        <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" 
          style="border-color: #E5E7EB; background: #FFFFFF;" 
          onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" 
          onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" 
          placeholder="Input" value="${indikator}">
      </div>
      <div class='w-full'>
        <label class="block font-semibold mb-2 text-xs" style="color: #374151;">Target</label>
        <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" 
          style="border-color: #E5E7EB; background: #FFFFFF;" 
          onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" 
          onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" 
          placeholder="Input" value="${target}">
      </div>
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110" 
        style="background: #EF4444; color: #FFFFFF;" 
        onmouseover="this.style.background='#DC2626';" 
        onmouseout="this.style.background='#EF4444';" 
        onclick="removeField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;
    return div;
  }

  function createIkuField(ikuId, persentase) {
    const div = document.createElement("div");
    div.className =
      "grid grid-cols-[1fr_1fr_auto] gap-4 items-end mb-4 iku-item";
    div.innerHTML = `
      <div>
        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
        <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" 
          style="border-color: #E5E7EB; background: #FFFFFF;" 
          onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" 
          onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
          <option value="">Input</option>
        </select>
      </div>
      <div>
        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Persentase Target</label>
        <div class="flex gap-2 items-center">
          <input type="text" class="flex-1 px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" 
            style="border-color: #E5E7EB; background: #FFFFFF;" 
            onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" 
            onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" 
            placeholder="Input" value="${persentase}">
          <div class="px-3 py-3 text-sm font-semibold" style="color: #374151;">%</div>
        </div>
      </div>
      <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 flex-shrink-0" 
        style="background: #EF4444; color: #FFFFFF;" 
        onmouseover="this.style.background='#DC2626';" 
        onmouseout="this.style.background='#EF4444';" 
        onclick="removeIkuField(this)">
        <span class="text-xl font-bold">−</span>
      </button>
    `;

    // Set selected IKU after the element is created
    setTimeout(() => {
      const select = div.querySelector("select");
      if (select && ikuId) {
        select.value = ikuId;
      }
    }, 100);

    return div;
  }

  function createAnggaranField(uraian, vol1, sat1, vol2, sat2, harga) {
    const div = document.createElement("div");
    div.className = "belanja-barang-item mb-8 p-6 rounded-lg";
    div.innerHTML = `
      <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end">
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" value="${uraian}">
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
          <div class="relative">
            <input type="number" min="1" value="${vol1}" class="w-full px-4 py-3 border-2 rounded-lg text-sm">
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
              <button type="button" onclick="incrementValue(this, 1)">▲</button>
              <button type="button" onclick="decrementValue(this, 1)">▼</button>
            </div>
          </div>
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm satuan-select">
            <option value="">Input</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
          <div class="relative">
            <input type="number" min="1" value="${vol2}" class="w-full px-4 py-3 border-2 rounded-lg text-sm">
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
              <button type="button" onclick="incrementValue(this, 1)">▲</button>
              <button type="button" onclick="decrementValue(this, 1)">▼</button>
            </div>
          </div>
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Optional)</label>
          <select class="w-full px-4 py-3 border-2 rounded-lg text-sm satuan-select">
            <option value="">Input</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
          <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm" value="${harga}">
        </div>
        <div class="flex items-end pb-3">
          <button type="button" onclick="removeBelanjaItem(this, 'belanjaBarangContainer')">−</button>
        </div>
      </div>
    `;

    // Set selected satuan after creation
    setTimeout(() => {
      const selects = div.querySelectorAll("select");
      if (selects[0] && sat1) selects[0].value = sat1;
      if (selects[1] && sat2) selects[1].value = sat2;
    }, 100);

    return div;
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

  // Modify the init function to load data if in edit mode
  function init() {
    loadDateRangePicker();
    updateMainStepDisplay();
    updateStepDisplay();
    attachEventListeners();
    populateIkuDropdowns();
    populateSatuanDropdowns();

    // Load existing data if in edit mode
    if (isEditMode && kakId) {
      // Wait for daterangepicker to initialize first
      setTimeout(() => {
        fetchAndPopulateKakData(kakId);
      }, 500);
    }
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
          showSuccess("Usulan KAK berhasil diajukan!");
        }

        // Redirect after a short delay to allow user to see the message
        setTimeout(() => {
            window.location.pathname = "/pengusul/monitoring-usulan";
        }, 1500);
      } catch (error) {
        showError(`Error: ${error.message}`);
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
