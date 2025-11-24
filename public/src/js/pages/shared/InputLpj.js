// frontend/src/pages/shared/InputLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderInputLpjPage(path, userRole) {
  const isPengusul = userRole.toLowerCase() === "pengusul";
  const isBendahara = userRole.toLowerCase() === "bendahara";

  // Bendahara sees read-only inputs. Pengusul can edit if status is 'Perlu Revisi' or new.
  const pageContent = `
    <style>
      /* Comment styles from RevisiKak.js */
      .comment-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 32px;
        height: 32px;
        background: #E0F7FA;
        color: #00BCD4;
        border: 2px solid #B2EBF2;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
      }
      .comment-icon:hover {
        background: #00BCD4;
        color: white;
        transform: translateY(-50%) scale(1.1);
      }
      .comment-icon.has-comment {
        background: #FEE2E2;
        color: #EF4444;
        border-color: #FCA5A5;
        animation: pulse-comment 2s infinite;
      }
      .comment-icon.has-comment:hover {
        background: #EF4444;
        color: white;
      }
      @keyframes pulse-comment {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
      }
      .row-with-comment {
        position: relative;
        padding: 1.5rem;
        border: 2px solid #E5E7EB;
        border-radius: 12px;
        margin-bottom: 2rem;
        transition: all 0.3s ease;
        background: white;
      }
      .row-with-comment:hover {
        border-color: #00BCD4;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.15);
      }
      .row-with-comment.has-row-comment {
        background: #FEF2F2;
        border-color: #FCA5A5;
      }
      .row-comment-icon {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        width: 36px;
        height: 36px;
        background: #E0F7FA;
        color: #00BCD4;
        border: 2px solid #B2EBF2;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
      }
      .row-comment-icon:hover {
        background: #00BCD4;
        color: white;
        transform: scale(1.1);
      }
      .row-comment-icon.has-comment {
        background: #FEE2E2;
        color: #EF4444;
        border-color: #FCA5A5;
        animation: pulse-comment 2s infinite;
      }
      .modal-content { border-radius: 16px; border: none; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
      .modal-header { border-bottom: 2px solid #F3F4F6; padding: 1.5rem; }
      .modal-body { padding: 2rem; }
      .form-control { border: 2px solid #E5E7EB; border-radius: 12px; padding: 1rem; font-size: 0.95rem; transition: all 0.3s ease; }
      .form-control:focus { border-color: #00BCD4; box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1); outline: none; }
      .info-box { padding: 1rem; border-radius: 8px; background: #EFF6FF; border-left: 4px solid #3B82F6; margin-top: 1rem; }
      .info-box-text { font-size: 0.875rem; color: #1E40AF; }
    </style>

    <div class="input-lpj-page">
      <!-- Header -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-3 px-6 py-4 rounded-full" style="background: rgba(0, 188, 212, 0.1);">
          <div id="pageIcon" class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style="background: #00BCD4;">
            <i class="ti ti-file-pencil"></i>
          </div>
          <span id="pageTitle" class="font-semibold text-base" style="color: #00BCD4;">
            Input Laporan Pertanggungjawaban
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div id="rabSectionsContainer">
          <div class="text-center p-8">Loading...</div>
        </div>

        <!-- Action Buttons -->
        <div id="actionButtonsContainer" class="flex justify-between mt-8">
          <!-- Buttons will be rendered by JS -->
        </div>
      </div>
    </div>

    <!-- Row Comment Modal -->
    <div class="modal fade" id="rowCommentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Catatan Revisi untuk <span id="rowCommentLabel" style="color: #00BCD4; font-weight: 700;"></span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="block font-semibold mb-2 text-sm" style="color: #374151;">Detail RAB</label>
              <div class="p-3 rounded-lg" style="background: #F3F4F6; color: #374151;" id="currentRowValue"></div>
            </div>
            
            <div id="rowCommentInputContainer" style="${
              isPengusul ? "display: none;" : ""
            }">
              <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan Revisi</label>
              <textarea id="rowCommentInput" class="form-control" rows="5" placeholder="Tuliskan catatan revisi untuk item ini..."></textarea>
            </div>
            
            <div id="rowCommentDisplayContainer" style="${
              isBendahara ? "display: none;" : ""
            }">
              <label class="block font-semibold mb-3 text-sm" style="color: #374151;">Catatan dari Bendahara</label>
              <div class="p-3 rounded-lg" style="background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A;" id="rowCommentDisplayText"></div>
            </div>
            
            <div class="info-box mt-4">
              <div class="info-box-text">
                <i class="ti ti-info-circle"></i> 
                ${
                  isBendahara
                    ? "Berikan masukan yang jelas dan konstruktif untuk membantu pengusul."
                    : "Perhatikan catatan dari bendahara untuk memperbaiki LPJ Anda."
                }
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Tutup</button>
            ${
              isBendahara
                ? `<button type="button" class="btn btn-primary" onclick="window.saveRowComment()">Simpan Catatan</button>`
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // --- STATE MANAGEMENT ---
  const state = {
    kegiatan: null,
    satuan: [],
    lpjData: null, // To hold existing LPJ data if in revision mode
    isLoading: true,
    status: "new", // 'new', 'revisi', 'view'
  };

  let rowComments = {}; // { anggaran_id: "comment text" }
  let currentCommentTarget = null;
    let rowCommentModalInstance = null;
  
    const formatCurrency = (amount) => {
      if (amount === null || amount === undefined) return "Rp 0";
      const number = Number(amount);
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(number);
    };
    
    // --- API FUNCTIONS ---
  async function apiRequest(endpoint, options = {}) {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    if (!token) {
      Swal.fire({ icon: 'error', title: 'Otentikasi Gagal', text: "Silakan login kembali." });
      window.location.hash = "#/login";
      return;
    }
    const headers = { ...options.headers, Authorization: `Bearer ${token}` };
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    const config = { ...options, headers };
    try {
      const response = await fetch(`/api${endpoint}`, config);
      const data = await response.json();
      if (data.success === false)
        throw new Error(data.message || "API request failed");
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      Swal.fire({ icon: 'error', title: 'API Error', text: error.message });
      throw error;
    }
  }

  async function fetchLpjDetail(id) {
    try {
      // This endpoint should return KAK data, and if available, existing LPJ data + comments
      const response = await apiRequest(`/kegiatan/${id}/detail`);
      state.kegiatan = response.data.kegiatan;
      state.lpjData = response.data.lpj; // This can be null
      state.status = response.data.lpj.status || "new";

      // Populate comments
      if (state.lpjData && state.lpjData.realisasi) {
        state.lpjData.realisasi.forEach((item) => {
          if (item.catatan_bendahara) {
            rowComments[item.anggaran_id] = item.catatan_bendahara;
          }
        });
      }
    } catch (error) {
      document.getElementById(
        "rabSectionsContainer"
      ).innerHTML = `<div class="text-center text-red-500 p-8">Gagal memuat detail LPJ. ${error.message}</div>`;
    }
  }

  async function fetchSatuan() {
    try {
      const response = await apiRequest("/master/satuan");
      state.satuan = response.data;
    } catch (error) {
      console.error("Gagal memuat data satuan.");
    }
  }

  // --- RENDER FUNCTIONS ---
  function renderRABSections() {
    const container = document.getElementById("rabSectionsContainer");
    if (!container || !state.lpjData || !state.lpjData.anggaran_items || state.lpjData.anggaran_items.length === 0) {
      container.innerHTML = `<div class="text-center text-red-500 p-8">Tidak ada item anggaran untuk ditampilkan.</div>`;
      return;
    }

    // Group items by category
    const groupedItems = state.lpjData.anggaran_items.reduce((acc, item) => {
      const category = item.nama_kategori || 'Lain-lain';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});

    container.innerHTML = ""; // Clear loader

    // Render items for each category
    for (const category in groupedItems) {
      const categoryTitle = document.createElement('h4');
      categoryTitle.className = 'text-xl font-semibold mb-4 mt-6 text-gray-700';
      categoryTitle.textContent = category;
      container.appendChild(categoryTitle);

      groupedItems[category].forEach((item, index) => {
        const section = document.createElement("div");
        // Add comment-related classes
        const comment = rowComments[item.anggaran_id];
        section.className = `row-with-comment ${
          comment ? "has-row-comment" : ""
        }`;
        section.dataset.rowType = "t_kegiatan_anggaran_realisasi";
        section.dataset.pkValue = item.anggaran_id;

        section.innerHTML = getSectionHTML(item, index);
        container.appendChild(section);
        updateCommentButton(
          `.row-with-comment[data-pk-value="${item.anggaran_id}"] .row-comment-icon`,
          comment
        );
      });
    }

    // Currency formatting is now handled directly in getSectionHTML
  }

  function getSatuanOptions(selectedValue) {
    const defaultOption = `<option value="" ${selectedValue == null || selectedValue === '' ? "selected" : ""}></option>`;
    return defaultOption + state.satuan
      .map(
        (s) =>
          `<option value="${s.satuan_id}" ${
            s.satuan_id == selectedValue ? "selected" : ""
          }>${s.nama_satuan}</option>`
      )
      .join("");
  }

  function getSectionHTML(item, index) {
    const realisasiItem =
      state.lpjData?.realisasi?.find(
        (r) => r.anggaran_id === item.anggaran_id
      ) || {};
    const rabHargaFormatted = formatCurrency(item.harga_satuan);
    const realisasiHargaFormatted = formatCurrency(realisasiItem.harga_satuan);

    const normalInputStyle = "border-color: #E5E7EB; background: white;";
    const disabledInputStyle = "border-color: #C0C0C0 !important; background: #E9E9E9 !important; cursor: not-allowed;";
    const inputAttr = isBendahara ? "readonly disabled" : "";
    const currentInputStyle = isBendahara ? disabledInputStyle : normalInputStyle;

    return `
      ${
        isBendahara
          ? `<button class="row-comment-icon" onclick="window.openRowCommentModal(this)" data-label="Item Anggaran #${
              index + 1
            }"><i class="ti ti-message-circle-2"></i></button>`
          : ""
      }
      ${
        isPengusul && rowComments[item.anggaran_id]
          ? `<button class="row-comment-icon" onclick="window.openRowCommentModal(this)" data-label="Item Anggaran #${
              index + 1
            }"><i class="ti ti-message-circle-2"></i></button>`
          : ""
      }

      <!-- RAB Section (Disabled) -->
      <div class="mb-6">
        <h5 class="mb-4 font-bold text-lg" style="color: #374151;">Rencana Anggaran Biaya (KAK)</h5>
        <div class="grid grid-cols-12 gap-4 items-end mb-4">
          <div class="col-span-3"><label class="block font-semibold mb-2 text-sm">Uraian</label><input type="text" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}" value="${
            item.uraian || ""
          }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Qty 1</label><input type="number" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}" value="${
            item.volume1 || ""
          }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Satuan 1</label><select disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}">${getSatuanOptions(
            item.satuan1_id
          )}</select></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Qty 2</label><input type="number" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}" value="${
            item.volume2 || ""
          }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Satuan 2</label><select disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}">${getSatuanOptions(
            item.satuan2_id
          )}</select></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Qty 3</label><input type="number" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}" value="${
            item.volume3 || ""
          }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Satuan 3</label><select disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}">${getSatuanOptions(
            item.satuan3_id
          )}</select></div>
          <div class="col-span-2"><label class="block font-semibold mb-2 text-sm">Harga Satuan</label><input type="text" disabled class="w-full px-4 py-3 border-2 rounded-lg text-sm cursor-not-allowed" style="${disabledInputStyle}" value="${rabHargaFormatted}"></div>
        </div>
      </div>

      <!-- Realisasi Section -->
      <div>
        <h5 class="mb-4 font-bold text-lg" style="color: #00BCD4;">Realisasi Pertanggungjawaban (LPJ)</h5>
        <div class="grid grid-cols-12 gap-4 items-end mb-4 realisasi-grid">
          <div class="col-span-3"><label class="block font-semibold mb-2 text-sm">Uraian</label><input type="text" ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}" value="${
      realisasiItem.uraian || item.uraian || ""
    }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Qty 1</label><input type="number" min="0" ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}" value="${
      realisasiItem.volume1 || item.volume1 || ""
    }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Satuan 1</label><select ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}">${getSatuanOptions(
      realisasiItem.satuan1_id || item.satuan1_id
    )}</select></div>
          
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Qty 2</label><input type="number" min="0" ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}" value="${
      realisasiItem.volume2 || item.volume2 || ""
    }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Satuan 2</label><select ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}">${getSatuanOptions(
      realisasiItem.satuan2_id || item.satuan2_id
    )}</select></div>
          
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Qty 3</label><input type="number" min="0" ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}" value="${
      realisasiItem.volume3 || item.volume3 || ""
    }"></div>
          <div class="col-span-1"><label class="block font-semibold mb-2 text-sm">Satuan 3</label><select ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}">${getSatuanOptions(
      realisasiItem.satuan3_id || item.satuan3_id
    )}</select></div>

          <div class="col-span-2"><label class="block font-semibold mb-2 text-sm">Harga Satuan</label><input type="text" ${inputAttr} class="w-full px-4 py-3 border-2 rounded-lg text-sm" style="${currentInputStyle}" value="${formatCurrency(item.realisasi_harga_satuan || item.harga_satuan || "")}"></div>
          
          ${
            isPengusul
              ? `
          <div class="col-span-1 flex items-end">
            <label class="cursor-pointer">
              <input type="file" multiple class="hidden" onchange="window.handleFileUpload(this)" data-anggaran-id="${item.anggaran_id}">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 border-0" style="background: #00BCD4; color: #FFFFFF;">
                <i class="ti ti-upload text-xl"></i>
              </div>
            </label>
          </div>`
              : ""
          }
        </div>
        <div class="uploaded-files-container mt-4 grid grid-cols-2 gap-4">
            ${(realisasiItem.bukti || [])
              .map(
                (file) => `
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <a href="/uploads/lpj/${
                      file.nama_file
                    }" target="_blank" class="text-sm truncate flex-1 text-blue-500 hover:underline">📎 ${
                  file.nama_file_asli
                }</a>
                    ${
                      isPengusul
                        ? `<button type="button" class="ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all bg-red-500 text-white" onclick="this.parentElement.remove()">×</button>`
                        : ""
                    }
                </div>
            `
              )
              .join("")}
        </div>
      </div>
    `;
  }

  function renderActionButtons() {
    const container = document.getElementById("actionButtonsContainer");
    let buttons = "";
    const backButton = `<button id="backButton" class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4;"><span>←</span> Kembali</button>`;

    if (isPengusul) {
      if (state.status === "new" || state.status === "revisi") {
        buttons = `
          ${backButton}
          <button id="submitLpjButton" class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2 hover:-translate-y-0.5" style="background: #00BCD4; color: #FFFFFF;">
            ${
              state.status === "revisi" ? "Submit Revisi LPJ" : "Submit LPJ"
            } <span>✓</span>
          </button>
        `;
      } else {
        buttons = backButton;
      }
    }

    if (isBendahara) {
      buttons = `
        ${backButton}
        <div class="flex gap-4">
          <button id="submitReviewButton" class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: #F59E0B; color: #FFFFFF;">Kirim Revisi</button>
          <button id="approveLpjButton" class="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 border-0 flex items-center gap-2" style="background: #10B981; color: #FFFFFF;">Setujui LPJ</button>
        </div>
      `;
    }
    container.innerHTML = buttons;
    attachActionListeners();
  }

  // --- DATA COLLECTION & SUBMISSION ---
  async function submitLpj(kegiatanId) {
    const button = document.getElementById("submitLpjButton");
    button.disabled = true;
    button.innerHTML = "Submitting...";
    try {
      const formData = collectLpjData();
      await apiRequest(`/lpj/${kegiatanId}/submit`, {
        method: "POST",
        body: formData,
      });
      Swal.fire({ icon: 'success', title: 'Sukses', text: 'LPJ berhasil disubmit.'});
      window.location.hash = "#/pengusul/kegiatan/lpj";
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: `Gagal submit LPJ: ${error.message}`});
    } finally {
      button.disabled = false;
      button.innerHTML = `${
        state.status === "revisi" ? "Submit Revisi LPJ" : "Submit LPJ"
      } <span>✓</span>`;
    }
  }

  async function submitReview(kegiatanId) {
    const button = document.getElementById("submitReviewButton");
    button.disabled = true;
    button.innerHTML = "Submitting...";
    try {
      const payload = { comments: rowComments };
      await apiRequest(`/lpj/${kegiatanId}/review`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      Swal.fire({ icon: 'success', title: 'Sukses', text: 'Revisi berhasil dikirim.'});
      window.location.hash = "#/bendahara/lpj";
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: `Gagal mengirim revisi: ${error.message}`});
    } finally {
      button.disabled = false;
      button.innerHTML = "Kirim Revisi";
    }
  }

  async function approveLpj(kegiatanId) {
    // Confirmation dialog
    const result = await Swal.fire({
      title: "Anda yakin?",
      text: "Anda akan menyetujui LPJ ini. Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, setujui!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      const button = document.getElementById("approveLpjButton");
      button.disabled = true;
      button.innerHTML = "Menyetujui...";
      try {
        await apiRequest(`/lpj/${kegiatanId}/approve`, { method: "POST" });
                    Swal.fire({ icon: 'success', title: 'Sukses', text: 'LPJ berhasil disetujui.'});        window.location.hash = "#/bendahara/lpj";
      } catch (error) {
                    Swal.fire({ icon: 'error', title: 'Gagal', text: `Gagal menyetujui LPJ: ${error.message}`});        button.disabled = false;
        button.innerHTML = "Setujui LPJ";
      }
    }
  }

  function collectLpjData() {
    const formData = new FormData();
    const rabSections = document.querySelectorAll(".row-with-comment");

    rabSections.forEach((section) => {
      const anggaranId = section.dataset.pkValue;
      const realisasiGrid = section.querySelector(".realisasi-grid");

      const uraian = realisasiGrid.querySelector('input[type="text"]').value;
      const numberInputs = realisasiGrid.querySelectorAll('input[type="number"]');
      const selectInputs = realisasiGrid.querySelectorAll('select');

      const volume1 = numberInputs[0] ? numberInputs[0].value : '';
      const satuan1_id = selectInputs[0] ? selectInputs[0].value : '';
      const volume2 = numberInputs[1] ? numberInputs[1].value : '';
      const satuan2_id = selectInputs[1] ? selectInputs[1].value : '';
      const volume3 = numberInputs[2] ? numberInputs[2].value : '';
      const satuan3_id = selectInputs[2] ? selectInputs[2].value : '';

      const harga_satuan_input = realisasiGrid.querySelector(
        ".harga-satuan-input"
      );
      const harga_satuan =
        harga_satuan_input.dataset.realValue ||
        harga_satuan_input.value.replace(/[^0-9]/g, "");

      formData.append(`realisasi[${anggaranId}][uraian]`, uraian);
      formData.append(`realisasi[${anggaranId}][volume1]`, volume1);
      formData.append(`realisasi[${anggaranId}][satuan1_id]`, satuan1_id);
      formData.append(`realisasi[${anggaranId}][volume2]`, volume2);
      formData.append(`realisasi[${anggaranId}][satuan2_id]`, satuan2_id);
      formData.append(`realisasi[${anggaranId}][volume3]`, volume3);
      formData.append(`realisasi[${anggaranId}][satuan3_id]`, satuan3_id);
      formData.append(`realisasi[${anggaranId}][harga_satuan]`, harga_satuan);

      const fileInput = section.querySelector('input[type="file"]');
      if (fileInput && fileInput.files.length > 0) {
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append(`bukti[${anggaranId}][]`, fileInput.files[i]);
        }
      }
    });

    return formData;
  }

  // --- COMMENTING LOGIC ---
  window.openRowCommentModal = function (btn) {
    const rowElement = btn.closest(".row-with-comment");
    const pkValue = rowElement.dataset.pkValue;
    currentCommentTarget = { type: "row", pk: pkValue };

    const rowLabel = btn.dataset.label;
    const commentText = rowComments[pkValue] || "";

    document.getElementById("rowCommentLabel").textContent = rowLabel;

    const rabUraian = rowElement.querySelector(
      '.mb-6 input[type="text"]'
    ).value;
    const rabHarga = rowElement.querySelector(
      '.mb-6 input[disabled][value^="Rp"]'
    ).value;
    document.getElementById(
      "currentRowValue"
    ).innerHTML = `<strong>${rabUraian}</strong> <br> <small>RAB: ${rabHarga}</small>`;

    if (isBendahara) {
      document.getElementById("rowCommentInputContainer").style.display =
        "block";
      document.getElementById("rowCommentDisplayContainer").style.display =
        "none";
      document.getElementById("rowCommentInput").value = commentText;
    } else {
      // Pengusul
      document.getElementById("rowCommentInputContainer").style.display =
        "none";
      document.getElementById("rowCommentDisplayContainer").style.display =
        "block";
      document.getElementById("rowCommentDisplayText").textContent =
        commentText || "(Tidak ada catatan)";
    }

    if (!rowCommentModalInstance) {
      rowCommentModalInstance = new bootstrap.Modal(
        document.getElementById("rowCommentModal")
      );
    }
    rowCommentModalInstance.show();
  };

  window.saveRowComment = function () {
    const comment = document.getElementById("rowCommentInput").value.trim();
    const { pk } = currentCommentTarget;
    if (comment) {
      rowComments[pk] = comment;
    } else {
      delete rowComments[pk];
    }
    updateCommentButton(
      `.row-with-comment[data-pk-value="${pk}"] .row-comment-icon`,
      comment
    );
    rowCommentModalInstance.hide();
  };

  function updateCommentButton(selector, comment) {
    const btn = document.querySelector(selector);
    if (btn) {
      btn.classList.toggle("has-comment", !!comment);
    }
  }

  // --- EVENT HANDLERS & INITIALIZATION ---
  window.handleFileUpload = function (input) {
    const files = Array.from(input.files);
    const container = input.closest(".realisasi-grid").nextElementSibling;
    files.forEach((file) => {
      const fileItem = document.createElement("div");
      fileItem.className =
        "flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200";
      fileItem.innerHTML = `<span class="text-sm truncate flex-1" style="color: #374151;">📎 ${file.name}</span><button type="button" class="ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all bg-red-500 text-white" onclick="this.parentElement.remove()">×</button>`;
      container.appendChild(fileItem);
    });
    input.value = "";
  };

  function attachActionListeners() {
    const kegiatanId = new URLSearchParams(window.location.search).get(
      "kegiatan_id"
    );
    const backButton = document.getElementById("backButton");
    if (backButton)
      backButton.addEventListener("click", () => window.history.back());

    if (isPengusul) {
      const submitLpjButton = document.getElementById("submitLpjButton");
      if (submitLpjButton)
        submitLpjButton.addEventListener("click", () => submitLpj(kegiatanId));
    }
    if (isBendahara) {
      const submitReviewButton = document.getElementById("submitReviewButton");
      const approveLpjButton = document.getElementById("approveLpjButton");
      if (submitReviewButton)
        submitReviewButton.addEventListener("click", () =>
          submitReview(kegiatanId)
        );
      if (approveLpjButton)
        approveLpjButton.addEventListener("click", () =>
          approveLpj(kegiatanId)
        );
    }
  }

  async function initializeApp() {
    const params = new URLSearchParams(window.location.search);
    const kegiatanId = params.get("kegiatan_id");

    if (!kegiatanId) {
      document.getElementById(
        "rabSectionsContainer"
      ).innerHTML = `<div class="text-center text-red-500 p-8">Kegiatan ID tidak ditemukan di URL.</div>`;
      return;
    }

    await Promise.all([fetchSatuan(), fetchLpjDetail(kegiatanId)]);

    state.isLoading = false;
    document.getElementById(
      "pageTitle"
    ).textContent = `LPJ: ${state.kegiatan.nama_kegiatan}`;
    if (isBendahara) {
      document.getElementById("pageIcon").innerHTML =
        '<i class="ti ti-eye"></i>';
    }

    renderRABSections();
    renderActionButtons();
  }

  initializeApp();
}
