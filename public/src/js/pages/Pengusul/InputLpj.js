// frontend/src/pages/Pengusul/InputLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderInputLpjPage(path, userRole) {
  const pageContent = `
    <div class="input-lpj-page">
      <!-- Header -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-3 px-6 py-4 rounded-full" style="background: rgba(0, 188, 212, 0.1);">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style="background: #00BCD4;">
            1
          </div>
          <span id="pageTitle" class="font-semibold text-base" style="color: #00BCD4;">
            Rincian Anggaran Biaya
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <!-- RAB Sections Container -->
        <div id="rabSectionsContainer">
          <!-- Sections will be populated by JavaScript -->
          <div class="text-center p-8">Loading...</div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button id="backButton" class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" onmouseover="this.style.background='rgba(0, 188, 212, 0.2)';" onmouseout="this.style.background='rgba(0, 188, 212, 0.1)';">
            <span>←</span> Back
          </button>
          <button id="submitButton" class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';">
            Submit LPJ <span>✓</span>
          </button>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // --- STATE MANAGEMENT ---
  const state = {
    kegiatan: null,
    satuan: [],
    isLoading: true,
  };

  // --- API FUNCTIONS ---
  async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    const config = { ...options, headers };
    try {
      const response = await fetch(`/api${endpoint}`, config);
      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      showError(error.message);
      throw error;
    }
  }

  async function fetchKegiatanDetail(id) {
    try {
      const response = await apiRequest(`/kegiatan/${id}/detail`);
      state.kegiatan = response.data;
    } catch (error) {
      document.getElementById('rabSectionsContainer').innerHTML = `<div class="text-center text-danger p-8">Gagal memuat detail kegiatan.</div>`;
    }
  }

  async function fetchSatuan() {
    try {
      const response = await apiRequest('/master/satuan');
      state.satuan = response.data;
    } catch (error) {
      console.error("Gagal memuat data satuan.");
    }
  }

  // --- RENDER FUNCTIONS ---
  function renderRABSections() {
    const container = document.getElementById("rabSectionsContainer");
    if (!container || !state.kegiatan || !state.kegiatan.anggaran_items) {
        container.innerHTML = `<div class="text-center text-danger p-8">Tidak ada item anggaran untuk ditampilkan.</div>`;
        return;
    }
    
    container.innerHTML = ""; // Clear loader

    state.kegiatan.anggaran_items.forEach(item => {
      const section = document.createElement('div');
      section.className = 'border-2 border-gray-200 rounded-xl p-6 mb-8 rab-section-item';
      section.innerHTML = getSectionHTML(item);
      container.appendChild(section);
    });
  }

  function getSatuanOptions(selectedValue) {
    let options = '<option value="">Input</option>';
    options += state.satuan.map(s => 
      `<option value="${s.satuan_id}" ${s.satuan_id == selectedValue ? 'selected' : ''}>${s.nama_satuan}</option>`
    ).join('');
    return options;
  }

  function getSectionHTML(item) {
    const satuanOptions = getSatuanOptions(); // For Realisasi dropdowns
    const formatHarga = item.harga_satuan ? new Intl.NumberFormat('id-ID').format(item.harga_satuan) : '';
    
    return `
      <!-- RAB Section (Disabled) -->
      <div class="mb-6">
        <h5 class="mb-4 font-bold text-lg" style="color: #374151;">RAB</h5>
        <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end mb-4">
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
            <input type="text" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;" value="${item.uraian || ''}">
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
            <input type="number" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;" value="${item.volume1 || ''}">
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
            <select disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;">${getSatuanOptions(item.satuan1_id)}</select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
            <input type="number" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;" value="${item.volume2 || ''}">
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Opsional)</label>
            <select disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;">${getSatuanOptions(item.satuan2_id)}</select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
            <input type="text" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;" value="Rp ${formatHarga}">
          </div>
          <div class="flex items-end"></div>
        </div>
      </div>

      <!-- Realisasi Section (Enabled) -->
      <div class="mb-6">
        <h5 class="mb-4 font-bold text-lg" style="color: #374151;">Realisasi</h5>
        <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end mb-4">
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
            <input type="text" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;" value="${item.uraian || ''}">
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
            <input type="number" min="1" value="${item.volume1 || '1'}" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
            <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">${getSatuanOptions(item.satuan1_id)}</select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
            <input type="number" min="1" value="${item.volume2 || '1'}" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Opsional)</label>
            <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">${getSatuanOptions(item.satuan2_id)}</select>
          </div>
          <div>
            <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
            <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input harga" value="Rp ${formatHarga}">
          </div>
          <div class="flex items-end">
            <label class="cursor-pointer">
              <input type="file" multiple class="hidden" onchange="window.handleFileUpload(this)">
              <div class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 border-0" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
            </label>
          </div>
        </div>
        <div class="uploaded-files-container mt-4"></div>
      </div>
    `;
  }

  async function submitLpj(kegiatanId) {
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = true;
    submitButton.innerHTML = 'Submitting...';

    try {
      const formData = collectLpjData();
      await apiRequest(`/kegiatan/${kegiatanId}/lpj`, {
        method: 'POST',
        body: formData,
      });

      showSuccess('LPJ berhasil disubmit.');
      window.location.hash = '#/pengusul/pengajuan-lpj';
    } catch (error) {
      showError(error.message);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = 'Submit LPJ <span>✓</span>';
    }
  }

  function collectLpjData() {
    const formData = new FormData();
    const rabSections = document.querySelectorAll('.rab-section-item');

    rabSections.forEach((section, index) => {
      const inputs = section.querySelectorAll('input, select');
      const realisasiGrid = section.querySelector('.grid.grid-cols-\[2fr_1fr_2fr_1fr_1fr_2fr_auto\]');
      const fileInput = realisasiGrid.querySelector('input[type="file"]');

      formData.append(`items[${index}][anggaran_id]`, state.kegiatan.anggaran_items[index].anggaran_id);
      formData.append(`items[${index}][uraian]`, realisasiGrid.querySelector('input[type="text"]').value);
      formData.append(`items[${index}][volume1]`, realisasiGrid.querySelectorAll('input[type="number"]')[0].value);
      formData.append(`items[${index}][satuan1_id]`, realisasiGrid.querySelectorAll('select')[0].value);
      formData.append(`items[${index}][volume2]`, realisasiGrid.querySelectorAll('input[type="number"]')[1].value);
      formData.append(`items[${index}][satuan2_id]`, realisasiGrid.querySelectorAll('select')[1].value);
      formData.append(`items[${index}][harga_satuan]`, realisasiGrid.querySelector('input[placeholder="Input harga"]').value.replace(/[^0-9]/g, ''));

      if (fileInput.files.length > 0) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append(`items[${index}][files][]`, fileInput.files[i]);
        }
      }
    });

    return formData;
  }

  // --- EVENT HANDLERS & INITIALIZATION ---
  window.handleFileUpload = function (input) {
    const files = Array.from(input.files);
    const container = input.closest(".grid").nextElementSibling;
    files.forEach(file => {
      const fileItem = document.createElement("div");
      fileItem.className = "flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 mb-2";
      fileItem.innerHTML = `<span class="text-sm truncate flex-1" style="color: #374151;">📎 ${file.name}</span><button type="button" class="ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all" style="background: #EF4444; color: #FFFFFF;" onclick="this.parentElement.remove()">×</button>`;
      container.appendChild(fileItem);
    });
    input.value = "";
  };

  async function initializeApp() {
    const params = new URLSearchParams(window.location.search);
    const kegiatanId = params.get('kegiatan_id');

    if (!kegiatanId) {
      document.getElementById('rabSectionsContainer').innerHTML = `<div class="text-center text-danger p-8">Kegiatan ID tidak ditemukan di URL.</div>`;
      return;
    }

    await Promise.all([
        fetchSatuan(),
        fetchKegiatanDetail(kegiatanId)
    ]);
    
    state.isLoading = false;
    document.getElementById('pageTitle').textContent = `Rincian Anggaran Biaya - ${state.kegiatan.nama_kegiatan}`;
    renderRABSections();
    
    document.getElementById('backButton').addEventListener('click', () => window.history.back());
    document.getElementById('submitButton').addEventListener('click', () => {
        submitLpj(kegiatanId);
    });
  }

  initializeApp();
  if (window.Helpers) window.Helpers.init();
}
