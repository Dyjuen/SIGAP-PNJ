// frontend/src/pages/Pengusul/RealisasiAnggaran.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderInputLpjPage(userRole) {
  const pageContent = `
    <div class="realisasi-anggaran-page">
      <!-- Header -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-3 px-6 py-4 rounded-full" style="background: rgba(0, 188, 212, 0.1);">
          <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style="background: #00BCD4;">
            1
          </div>
          <span class="font-semibold text-base" style="color: #00BCD4;">
            Rincian Anggaran Biaya
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <!-- RAB Sections Container -->
        <div id="rabSectionsContainer">
          <!-- Initial Section -->
          <div class="border-2 border-gray-200 rounded-xl p-6 mb-8 rab-section-item">
            
            <!-- RAB Section (Disabled) -->
            <div class="mb-6">
              <h5 class="mb-4 font-bold text-lg" style="color: #374151;">RAB</h5>
              
              <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end mb-4">
                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                  <input type="text" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;" placeholder="Input">
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                  <div class="relative">
                    <input type="number" disabled value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;">
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                      <button type="button" class="text-gray-400 leading-none cursor-not-allowed">▲</button>
                      <button type="button" class="text-gray-400 leading-none cursor-not-allowed">▼</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                  <select disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;">
                    <option value="">Input</option>
                  </select>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                  <div class="relative">
                    <input type="number" disabled value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;">
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                      <button type="button" class="text-gray-400 leading-none cursor-not-allowed">▲</button>
                      <button type="button" class="text-gray-400 leading-none cursor-not-allowed">▼</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Opsional)</label>
                  <select disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;">
                    <option value="">Input</option>
                  </select>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                  <input type="text" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="border-color: #E5E7EB; background: #F9FAFB;" placeholder="Input">
                </div>

                <div class="flex items-end pb-3">
                  <button type="button" class="border-0 w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeRabSection(this)">
                    <span class="text-xl font-bold">−</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Realisasi Section (Enabled) -->
            <div class="mb-6">
              <h5 class="mb-4 font-bold text-lg" style="color: #374151;">Realisasi</h5>
              
              <div class="grid grid-cols-[2fr_1fr_2fr_1fr_1fr_2fr_auto] gap-4 items-end mb-4">
                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Uraian</label>
                  <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 1</label>
                  <div class="relative">
                    <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                      <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementQty(this)">▲</button>
                      <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementQty(this)">▼</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 1</label>
                  <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                    <option value="">Input</option>
                  </select>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Qty 2</label>
                  <div class="relative">
                    <input type="number" min="1" value="1" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                    <div class="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                      <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="incrementQty(this)">▲</button>
                      <button type="button" class="text-gray-400 hover:text-cyan-500 leading-none" onclick="decrementQty(this)">▼</button>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Satuan 2 (Opsional)</label>
                  <select class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';">
                    <option value="">Input</option>
                  </select>
                </div>

                <div>
                  <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Harga Satuan</label>
                  <input type="text" class="w-full px-4 py-3 border-2 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-4" style="border-color: #E5E7EB; background: #FFFFFF;" onfocus="this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';" onblur="this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';" placeholder="Input">
                </div>

                <div class="flex items-end pb-3">
                  <label class="cursor-pointer">
                    <input type="file" multiple class="hidden" onchange="handleFileUpload(this)">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 border-0" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span class="ml-1 text-xs font-semibold">Upload</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Uploaded Files Container -->
              <div class="uploaded-files-container mt-4"></div>
            </div>

            <!-- Komentar Button -->
            <div>
              <button type="button" class="border-0 px-6 py-3 rounded-lg cursor-pointer font-semibold transition-all duration-300 w-full" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';">
                Komentar
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;" onmouseover="this.style.background='rgba(0, 188, 212, 0.2)';" onmouseout="this.style.background='rgba(0, 188, 212, 0.1)';">
            <span>←</span> Back
          </button>
          <button class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;" onmouseover="this.style.background='#0097A7';" onmouseout="this.style.background='#00BCD4';">
            Accept <span>✓</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // Render the main layout
  renderDashboardLayout(pageContent, userRole);

  // --- JavaScript Logic ---

  // Increment Quantity
  window.incrementQty = function (btn) {
    const input = btn.parentElement.parentElement.querySelector(
      'input[type="number"]'
    );
    input.value = parseInt(input.value) + 1;
  };

  // Decrement Quantity
  window.decrementQty = function (btn) {
    const input = btn.parentElement.parentElement.querySelector(
      'input[type="number"]'
    );
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
    }
  };

  // Handle File Upload
  window.handleFileUpload = function (input) {
    const files = Array.from(input.files);
    const container = input
      .closest(".rab-section-item")
      .querySelector(".uploaded-files-container");

    files.forEach((file) => {
      const fileItem = document.createElement("div");
      fileItem.className =
        "flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200 mb-2";
      fileItem.innerHTML = `
        <span class="text-sm truncate flex-1" style="color: #374151;">
          📎 ${file.name}
        </span>
        <button type="button" class="ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300" style="background: #EF4444; color: #FFFFFF;" onmouseover="this.style.background='#DC2626';" onmouseout="this.style.background='#EF4444';" onclick="removeFile(this)">
          <span class="text-xs">×</span>
        </button>
      `;
      container.appendChild(fileItem);
    });

    // Reset input
    input.value = "";
  };

  // Remove File
  window.removeFile = function (btn) {
    btn.closest(".flex").remove();
  };

  // Remove RAB Section
  window.removeRabSection = function (btn) {
    const container = document.getElementById("rabSectionsContainer");
    const sections = container.querySelectorAll(".rab-section-item");

    if (sections.length > 1) {
      btn.closest(".rab-section-item").remove();
    } else {
      alert("Minimal harus ada 1 field!");
    }
  };

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}
