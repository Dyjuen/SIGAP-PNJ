// frontend/src/pages/Pengusul/UsulanKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderUsulanKakPage(path, userRole) {
  const pageContent = `
    <!-- Add required CSS for daterangepicker in the head section -->
    <link rel="stylesheet" href="../../assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.css" />
    
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

  // Add custom CSS for daterangepicker colors
  const style = document.createElement('style');
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
    const momentScript = document.createElement('script');
    momentScript.src = '../../assets/vendor/libs/moment/moment.js';
    momentScript.onload = () => {
      // Load daterangepicker after moment is loaded
      const daterangeScript = document.createElement('script');
      daterangeScript.src = '../../assets/vendor/libs/bootstrap-daterangepicker/bootstrap-daterangepicker.js';
      daterangeScript.onload = initializeDateRangePickers;
      document.head.appendChild(daterangeScript);
    };
    document.head.appendChild(momentScript);
  };

  // Initialize Bootstrap DateRangePickers
  function initializeDateRangePickers() {
    if (typeof $ !== 'undefined' && $.fn.daterangepicker) {
      // Kurun Waktu - Date Range Picker (Start and End Date in one input)
      $('#kurunWaktu').daterangepicker({
        showDropdowns: true,
        minYear: 2020,
        maxYear: parseInt(moment().format('YYYY'), 10) + 5,
        locale: {
          format: 'DD/MM/YYYY',
          separator: ' - ',
          applyLabel: 'Apply',
          cancelLabel: 'Cancel',
          fromLabel: 'From',
          toLabel: 'To',
          customRangeLabel: 'Custom',
          weekLabel: 'W',
          daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          firstDay: 1
        },
        startDate: moment('2025-03-11', 'YYYY-MM-DD'),
        endDate: moment('2025-03-11', 'YYYY-MM-DD').add(7, 'days'),
        opens: 'right'
      });

      // Optional: Handle date change event
      $('#kurunWaktu').on('apply.daterangepicker', function(ev, picker) {
        console.log('Start Date: ' + picker.startDate.format('DD/MM/YYYY'));
        console.log('End Date: ' + picker.endDate.format('DD/MM/YYYY'));
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

        // Initialize
        function init() {
          loadDateRangePicker();
          updateMainStepDisplay();
          updateStepDisplay();
          attachEventListeners();
          populateIkuDropdowns(); // Populate IKU dropdowns on init
        }
  
        // ==============================================  // API FUNCTIONS
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async function submitTelaah(data) {
    return await apiRequest('/telaah', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  function deriveKurunWaktuPelaksanaan(startDate, endDate) {
    if (!startDate || !endDate) return "";
    const start = moment(startDate, 'YYYY-MM-DD');
    const end = moment(endDate, 'YYYY-MM-DD');
    const diffDays = end.diff(start, 'days') + 1; // +1 to include both start and end day

    if (diffDays <= 0) return "";

    if (diffDays < 30) {
      return `${diffDays} hari`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      return `${months} bulan ${remainingDays > 0 ? `${remainingDays} hari` : ''}`.trim();
    } else {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      return `${years} tahun ${remainingMonths > 0 ? `${remainingMonths} bulan` : ''}`.trim();
    }
  }

  // Helper to combine separate sasaran and manfaat lists into one for backend
  function combineSasaranManfaat(sasaranArray, manfaatArray) {
    const combined = [];
    const maxLength = Math.max(sasaranArray.length, manfaatArray.length);
    for (let i = 0; i < maxLength; i++) {
      combined.push({
        sasaran_utama: sasaranArray[i] || '',
        manfaat: manfaatArray[i] || ''
      });
    }
    return combined;
  }

  // Placeholder for mapping satuan string to ID. Needs API call for m_satuan
  function mapSatuanToId(satuanString) {
    // For now, return a default ID. This needs proper lookup from m_satuan master data
    const satuanMap = {
      'Unit': 1, 'pcs': 2, 'box': 3, 'set': 4, // Example IDs
      'orang': 5, 'jam': 6, 'hari': 7, 'bulan': 8, 'tahun': 9, // Example IDs
      'perjalanan': 10, 'kali': 11
    };
    return satuanMap[satuanString.toLowerCase()] || 1; // Default to ID 1
  }

  // Populate IKU dropdowns with dummy data (1-8)
  function populateIkuDropdowns() {
    const ikuSelects = document.querySelectorAll('#ikuRenstraContainer select');
    ikuSelects.forEach(select => {
      // Clear existing options except the first one (if it's a placeholder)
      // Check if the first option is a placeholder and keep it if so
      const isPlaceholder = select.options.length > 0 && select.options[0].value === "";
      while (select.options.length > (isPlaceholder ? 1 : 0)) { 
        select.remove(isPlaceholder ? 1 : 0);
      }
      for (let i = 1; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `IKU #${i}`;
        select.appendChild(option);
      }
    });
  }

  function collectFormData() {
    // Helper function to get values from a container of inputs (array of strings)
    const getDynamicListValues = (containerId) => {
      const container = document.getElementById(containerId);
      if (!container) return [];
      return Array.from(container.querySelectorAll('input[type="text"]')).map(input => input.value).filter(Boolean);
    };

    // Helper function to get values from complex dynamic rows for t_telaah_target
    const getTargetData = () => { // Renamed from getIndikatorKinerja
      const container = document.getElementById('indikatorKinerjaContainer');
      if (!container) return [];
      const rows = container.querySelectorAll('.flex.items-end.gap-4');
      return Array.from(rows).map(row => ({
        bulan_indikator: row.children[0].querySelector('input').value, // Frontend "Bulan"
        deskripsi_target: row.children[1].querySelector('input').value, // Frontend "Indikator Keberhasilan"
        persentase_target: parseFloat(row.children[2].querySelector('input').value) || 0 // Frontend "Target"
      })).filter(item => item.bulan_indikator || item.deskripsi_target || item.persentase_target);
    };

    const getIkuRenstraData = () => { // Renamed from getIkuRenstra
        const container = document.getElementById('ikuRenstraContainer');
        if (!container) return [];
        return Array.from(container.querySelectorAll('.iku-item')).map(row => {
            const inputs = row.querySelectorAll('input, select');
            return {
                iku_id: parseInt(inputs[0].value) || 0, // Assuming value is iku_id
                persentase_target: parseFloat(inputs[1].value) || 0,
            }
        }).filter(item => item.iku_id || item.persentase_target);
    }

    const getAnggaranItems = (containerId) => { // Renamed from getAnggaran
        const container = document.getElementById(containerId);
        if (!container) return [];
        return Array.from(container.querySelectorAll('.grid')).map(row => {
            const inputs = row.querySelectorAll('input, select');
            return {
                uraian: inputs[0].value,
                volume1: parseInt(inputs[1].value) || 1,
                satuan1_str: inputs[2].value, // Storing string for now, needs mapping to ID
                volume2: parseInt(inputs[3].value) || 1,
                satuan2_str: inputs[4].value, // Storing string for now, needs mapping to ID
                harga_satuan: parseFloat(inputs[5].value) || 0,
            }
        }).filter(item => item.uraian || item.harga_satuan);
    }
    
    // Get date range from daterangepicker
    let tanggalMulai = null;
    let tanggalSelesai = null;
    if (typeof $ !== 'undefined' && $('#kurunWaktu').data('daterangepicker')) {
        tanggalMulai = $('#kurunWaktu').data('daterangepicker').startDate.format('YYYY-MM-DD');
        tanggalSelesai = $('#kurunWaktu').data('daterangepicker').endDate.format('YYYY-MM-DD');
    }

    const sasaranUtamaList = getDynamicListValues('sasaranUtamaContainer');
    const manfaatList = getDynamicListValues('manfaatContainer');
    
    const formData = {
      kak: { // This is the main KAK object
        nama_kegiatan: document.getElementById('namaKegiatan')?.value || '',
        deskripsi_kegiatan: document.getElementById('gambaranUmum')?.value || '', // Map gambaran_umum to deskripsi_kegiatan
        metode_pelaksanaan: document.getElementById('metodePelaksanaan')?.value || '',
        kurun_waktu_pelaksanaan: deriveKurunWaktuPelaksanaan(tanggalMulai, tanggalSelesai) || '', 
        tanggal_mulai: tanggalMulai || '',
        tanggal_selesai: tanggalSelesai || '',
        lokasi: 'PNJ Depok', // Placeholder: Missing input in frontend form, or get from user profile
        
        // Assembled penerima_manfaat to match backend array of objects
        penerima_manfaat: combineSasaranManfaat(sasaranUtamaList, manfaatList),
        
        // Transformed tahapan_pelaksanaan to match backend array of objects
        tahapan_pelaksanaan: getDynamicListValues('tahapanPelaksanaanContainer').map((nama, index) => ({
            nama_tahapan: nama,
            urutan: index + 1
        })),

        // Indikator Kinerja is now empty for kak header, as step 1.4 maps to top-level 'target'
        indikator_kinerja: [], 
      },
      // These are top-level arrays for $input['target_iku'] and $input['target'] and $input['rab']
      target_iku: getIkuRenstraData().map(item => ({ 
          iku_id: item.iku_id, 
          persentase_target: item.persentase_target
      })),
      target: getTargetData().map(item => ({ 
          deskripsi_target: item.deskripsi_target,
          bulan_indikator: item.bulan_indikator,
          persentase_target: item.persentase_target
      })),
      rab: [ // Flattened anggaran
        ...getAnggaranItems('belanjaBarangContainer').map(item => ({
            uraian: item.uraian,
            volume1: item.volume1,
            volume2: item.volume2,
            satuan_id: mapSatuanToId(item.satuan1_str), // Using helper map string to ID
            harga_satuan: item.harga_satuan,
            jumlah_diusulkan: item.volume1 * item.volume2 * item.harga_satuan // Calculate total
        })),
        ...getAnggaranItems('belanjaJasaContainer').map(item => ({
            uraian: item.uraian,
            volume1: item.volume1,
            volume2: item.volume2,
            satuan_id: mapSatuanToId(item.satuan1_str), // Using helper map string to ID
            harga_satuan: item.harga_satuan,
            jumlah_diusulkan: item.volume1 * item.volume2 * item.harga_satuan // Calculate total
        })),
        ...getAnggaranItems('belanjaPerjalananContainer').map(item => ({
            uraian: item.uraian,
            volume1: item.volume1,
            volume2: item.volume2,
            satuan_id: mapSatuanToId(item.satuan1_str), // Using helper map string to ID
            harga_satuan: item.harga_satuan,
            jumlah_diusulkan: item.volume1 * item.volume2 * item.harga_satuan // Calculate total
        })),
      ]
    };

    console.log("Collected Form Data:", formData);
    return formData;
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // ... (existing event listeners for navigation)

    // Submit button for Step 3 (RAB)
    const btnSubmitRab = document.getElementById("btnSubmitRab");
    if (btnSubmitRab) {
      btnSubmitRab.addEventListener("click", async () => {
        // Show loading state
        btnSubmitRab.disabled = true;
        btnSubmitRab.innerHTML = 'Submitting... <span class="spinner-border spinner-border-sm"></span>';

        try {
          const formData = collectFormData();
          console.log("Submitting data:", formData);

          const result = await submitTelaah(formData);

          if (result.status) {
            alert("Usulan KAK berhasil diajukan!");
            // Redirect to monitoring page
            window.location.hash = "#/pengusul/monitoring-usulan";
          } else {
            throw new Error(result.message || "Terjadi kesalahan saat pengajuan.");
          }

        } catch (error) {
          alert(`Error: ${error.message}`);
          // Re-enable button on error
          btnSubmitRab.disabled = false;
          btnSubmitRab.innerHTML = 'Submit';
        }
      });
    }
     
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
          populateIkuDropdowns(); // Populate dropdowns for new item
        };
  // Increment/Decrement value functions
  window.incrementValue = function(btn, step) {
    const input = btn.closest('.relative').querySelector('input[type="number"]');
    const currentValue = parseInt(input.value) || 1;
    input.value = currentValue + step;
  };

  window.decrementValue = function(btn, step) {
    const input = btn.closest('.relative').querySelector('input[type="number"]');
    const currentValue = parseInt(input.value) || 1;
    const minValue = parseInt(input.min) || 1;
    if (currentValue > minValue) {
      input.value = currentValue - step;
    }
  };

  // Belanja item functions
  window.removeBelanjaItem = function(btn, containerId) {
    const item = btn.closest('.belanja-barang-item, .belanja-jasa-item, .belanja-perjalanan-item');
    const container = document.getElementById(containerId);
    if (container.children.length > 1) {
      item.remove();
    } else {
      alert("Minimal harus ada 1 item!");
    }
  };

  window.addBelanjaBarang = function() {
    const container = document.getElementById("belanjaBarangContainer");
    const newItem = document.createElement("div");
    newItem.className = "belanja-barang-item mb-8 p-6 rounded-lg";
    newItem.innerHTML = container.querySelector('.belanja-barang-item').innerHTML;
    container.appendChild(newItem);
  };

  window.addBelanjaJasa = function() {
    const container = document.getElementById("belanjaJasaContainer");
    const newItem = document.createElement("div");
    newItem.className = "belanja-jasa-item mb-8 p-6 rounded-lg";
    newItem.innerHTML = container.querySelector('.belanja-jasa-item').innerHTML;
    container.appendChild(newItem);
  };

  window.addBelanjaPerjalanan = function() {
    const container = document.getElementById("belanjaPerjalananContainer");
    const newItem = document.createElement("div");
    newItem.className = "belanja-perjalanan-item mb-8 p-6 rounded-lg";
    newItem.innerHTML = container.querySelector('.belanja-perjalanan-item').innerHTML;
    container.appendChild(newItem);
  };

  // Initialize
  init();

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}