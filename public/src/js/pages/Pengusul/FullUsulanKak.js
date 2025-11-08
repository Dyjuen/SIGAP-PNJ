// frontend/src/pages/Pengusul/FullUsulanKak.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderFullUsulanKakPage(userRole) {
  const pageContent = `
    <style>
      .layout-wrapper { background-image: url('/assets/img/backgrounds/BG.png') !important; background-size: cover !important; }
      .content-wrapper { background: transparent !important; }
      html { scroll-behavior: smooth; }
    </style>

    <div class="usulan-kak-page">
      <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h3 class="text-2xl font-bold mb-2" style="color: #00BCD4;">Formulir Usulan KAK</h3>
        <p class="text-gray-600">Pastikan semua data sudah sesuai sebelum mengirimkan ke validator</p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        
        <!-- Gambaran Umum -->
        <div class="mb-12">
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

        <!-- Penerima Manfaat -->
        <div class="mb-12">
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

        <!-- Strategi Pencapaian -->
        <div class="mb-12">
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

        <!-- Indikator Kinerja -->
        <div class="mb-12">
          <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja</h4>
          <div class="mb-8">
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja</label>
            <div id="indikatorKinerjaContainer">
              <div class="mb-4 p-4">
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
            </div>
            <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addIndikatorKinerja()">Tambah</button>
          </div>
        </div>

        <!-- Kurun Waktu Pelaksanaan -->
        <div class="mb-12">
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

        <!-- Indikator Kinerja Utama dan Renstra -->
        <div class="mb-12">
          <h4 class="mb-6 font-bold text-xl" style="color: #00BCD4;">Indikator Kinerja Utama dan Renstra</h4>
          <div class="mb-8" id="ikuRenstraContainer">
            <div class="grid grid-cols-[1fr_1fr_auto] gap-4 items-end mb-4 iku-item">
              <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Indikator Kinerja Utama</label>
                <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                  <option value="">Input</option>
                </select>
              </div>
              <div>
                <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nilai (%)</label>
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

        <!-- Rincian Anggaran Biaya -->
        <div class="mb-12">
          <h4 class="mb-8 font-bold text-xl" style="color: #00BCD4;">Rincian Anggaran Biaya</h4>
          
          <!-- Belanja Barang Section -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Barang</h5>
            <div id="belanjaBarangContainer" class="p-6 rounded-lg border-2">
              <div class="belanja-barang-item mb-6">
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
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
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
            <button type="button" class="border-0 mt-6 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addBelanjaBarang()">Tambah Item Barang</button>
          </div>

          <!-- Belanja Jasa Section -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Jasa</h5>
            <div id="belanjaJasaContainer" class="p-6 rounded-lg border-2">
              <div class="belanja-jasa-item mb-6">
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
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
                    <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 44px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
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
            <button type="button" class="border-0 mt-6 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addBelanjaJasa()">Tambah Item Jasa</button>
          </div>

          <!-- Belanja Perjalanan Section -->
          <div class="mb-10">
            <h5 class="mb-6 font-bold text-lg" style="color: #374151;">Belanja Perjalanan</h5>
            <div id="belanjaPerjalananContainer" class="p-6 rounded-lg border-2">
              <div class="belanja-perjalanan-item mb-6">
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
                    <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2</label>
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
            <button type="button" class="border-0 mt-6 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 inline-block hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';" onclick="addBelanjaPerjalanan()">Tambah Item Perjalanan</button>
          </div>

        </div>

        <div class="flex justify-between pt-8 border-t-2">
          <button class="px-8 py-3 rounded-lg bg-gray-100 text-cyan-500" onclick="window.history.back()">← Back</button>
          <button class="px-8 py-3 rounded-lg bg-cyan-500 text-white" >✓ Submit</button>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // --- JavaScript Logic ---

  // Dynamic Field Functions (Global scope)
  window.removeField = function (btn) {
    const item = btn.closest(".mb-4, .dynamic-field-item, .p-4.border");
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
    newItem.className = "p-4";
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
        <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Nilai (%)</label>
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

  // RAB Functions
  window.incrementValue = function (btn, amount) {
    const input = btn.closest(".relative").querySelector("input[type=number]");
    input.value = parseInt(input.value) + amount;
  };

  window.decrementValue = function (btn, amount) {
    const input = btn.closest(".relative").querySelector("input[type=number]");
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
      input.value = currentValue - amount;
    }
  };

  window.removeBelanjaItem = function (btn, containerId) {
    const item = btn.closest(".mb-8");
    const container = document.getElementById(containerId);
    if (container.children.length > 1) {
      item.remove();
    } else {
      alert("Minimal harus ada 1 item belanja!");
    }
  };

  window.addBelanjaBarang = function () {
    const container = document.getElementById("belanjaBarangContainer");
    const template = container.querySelector(".belanja-barang-item");
    const newItem = template.cloneNode(true);
    newItem
      .querySelectorAll("input")
      .forEach((input) => (input.value = input.type === "number" ? "1" : ""));
    container.appendChild(newItem);
  };

  window.addBelanjaJasa = function () {
    const container = document.getElementById("belanjaJasaContainer");
    const template = container.querySelector(".belanja-jasa-item");
    const newItem = template.cloneNode(true);
    newItem
      .querySelectorAll("input")
      .forEach((input) => (input.value = input.type === "number" ? "1" : ""));
    container.appendChild(newItem);
  };

  window.addBelanjaPerjalanan = function () {
    const container = document.getElementById("belanjaPerjalananContainer");
    const template = container.querySelector(".belanja-perjalanan-item");
    const newItem = template.cloneNode(true);
    newItem
      .querySelectorAll("input")
      .forEach((input) => (input.value = input.type === "number" ? "1" : ""));
    container.appendChild(newItem);
  };

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}
