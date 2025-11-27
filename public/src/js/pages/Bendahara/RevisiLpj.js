// public/src/js/pages/bendahara/RevisiLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderRevisiLpjPage(path, userRole) {
  console.log("Rendering Revisi LPJ page for userRole:", userRole);
  const isBendahara = userRole.toLowerCase() === "bendahara";
  const isPengusul = userRole.toLowerCase() === "pengusul";

  // ==============================================
  // HELPER FUNCTIONS (Defined Locally)
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    const headers = { ...options.headers };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
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
      Swal.fire({ icon: "error", title: "API Error", text: error.message });
      throw error;
    }
  }

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "Rp 0";
    // Convert to string to ensure replace works
    let cleanAmount = String(amount);
    // Remove all characters except digits and a single decimal point
    // This handles values like "15000000.00" or "15000000"
    cleanAmount = cleanAmount.replace(/[^0-9.]/g, "");

    // Convert to float
    const number = parseFloat(cleanAmount);
    if (isNaN(number)) return "Rp 0"; // Handle cases where parsing fails

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const state = {
    satuan: [],
    anggaran: [],
    lampiran: [],
    kegiatan_lpj_status: null, // New state for LPJ status
  };

  const pageContent = `
    <style>
      /* Lampiran comment button */
      .lampiran-comment-btn {
        width: 36px;
        height: 36px;
        background: #E0F7FA;
        color: #00BCD4;
        border: 2px solid #B2EBF2;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        flex-shrink: 0;
        font-size: 0.9rem;
      }
      
      .lampiran-comment-btn:hover {
        background: #00BCD4;
        color: white;
        transform: scale(1.1);
      }
      
      .lampiran-comment-btn.has-comment {
        background: #FEE2E2;
        color: #EF4444;
        border-color: #FCA5A5;
        animation: pulse-comment 2s infinite;
      }
      
      .lampiran-comment-btn.has-comment:hover {
        background: #EF4444;
        color: white;
      }
      
      @keyframes pulse-comment {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
      }
      
      /* Lampiran item container */
      .lampiran-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
      }
      
      .lampiran-item:hover {
        background: #F3F4F6;
      }
      
      .lampiran-item.has-comment {
        border-color: #FCA5A5;
        background-color: #FEF2F2;
      }
      .lampiran-item.has-comment:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
        border-color: #F87171; /* A slightly darker red for the border */
        background-color: #FEE2E2; /* A light red for the background */
      }
      
      .lampiran-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
      }

      /* Enhanced File Upload Styling */

      /* Add File Button */
      .btn-add-lampiran {
        background: linear-gradient(135deg, #00BCD4, #0097A7);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      .btn-add-lampiran:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
        color: white;
      }

      /* Uploaded File Item */
      .lampiran-item {
        border: 1px solid #E5E7EB;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        background-color: #FFFFFF;
        transition: all 0.3s ease;
      }
      .lampiran-item:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        border-color: #D1D5DB; /* A slightly darker grey for the border */
        background-color: #F9FAFB; /* A very light grey for the background */
      }

      /* Make sure content is above the pseudo-element */
      .lampiran-content, .lampiran-item > .flex {
        position: relative;
      }
      .lampiran-item.has-comment {
        border-left: 4px solid #FCA5A5;
        background: #FEF2F2;
      }

      /* Pending File Item */
      .pending-lampiran {
        background-color: #EFF6FF;
        border-color: #BFDBFE;
      }

      /* Delete/Cancel Buttons */
      .btn-delete-lampiran, .btn-cancel-upload {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: #EF4444; /* Solid Red background */
        color: white; /* White icon */
        border: none; /* No border needed */
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .btn-delete-lampiran:hover, .btn-cancel-upload:hover {
        background: linear-gradient(135deg, #F87171, #DC2626); /* Lighter to darker red gradient on hover */
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
      }


      .modal-content {
        border-radius: 16px;
        border: none;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      }
      
      .modal-header {
        border-bottom: 2px solid #F3F4F6;
        padding: 1.5rem;
        background: linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%);
        border-radius: 16px 16px 0 0;
      }
      
      .modal-title {
        color: #374151;
        font-weight: 700;
        font-size: 1.25rem;
      }
      
      .modal-body {
        padding: 2rem;
      }
      
      .form-control {
        border: 2px solid #E5E7EB;
        border-radius: 12px;
        padding: 1rem;
        font-size: 0.95rem;
        transition: all 0.3s ease;
      }
      
      .form-control:focus {
        border-color: #00BCD4;
        box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1);
        outline: none;
      }

      /* Comment Detail Modal Styling - SAME AS REVISIKAK */
      #lampiranCommentModal .modal-dialog {
        max-width: 750px;
      }

      #lampiranCommentModal .modal-content {
        border: none;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }

      #lampiranCommentModal .modal-header {
        background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        border: none;
        padding: 1.75rem 2rem;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 1rem;
        flex-wrap: nowrap;
      }

      #lampiranCommentModal .modal-title {
        color: white;
        font-size: 1.5rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 0 !important;
        flex: 1;
        white-space: nowrap;
      }

      #lampiranCommentModal .modal-title i {
        font-size: 2rem;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
      }

      /* Custom close button - PERFECT VERSION */
      #lampiranCommentModal .btn-close {
        background: rgba(255, 255, 255, 0.15);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 12px;
        width: 44px;
        height: 44px;
        min-width: 44px;
        min-height: 44px;
        opacity: 1;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        margin: -4px 0 0 0;
        cursor: pointer;
        flex-shrink: 0;
      }

      #lampiranCommentModal .btn-close:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        transform: rotate(90deg) scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      /* X marks using pseudo-elements - PERFECT CROSS */
      #lampiranCommentModal .btn-close::before,
      #lampiranCommentModal .btn-close::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 2.5px;
        background: white;
        border-radius: 2px;
        transition: all 0.3s ease;
      }

      #lampiranCommentModal .btn-close::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      #lampiranCommentModal .btn-close::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      #lampiranCommentModal .btn-close:hover::before,
      #lampiranCommentModal .btn-close:hover::after {
        background: white;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
      }

      /* Remove default Bootstrap close button styles */
      #lampiranCommentModal .btn-close:focus {
        box-shadow: none;
        outline: none;
      }

      #lampiranCommentModal .modal-body {
        padding: 2rem;
        max-height: 60vh;
        overflow-y: auto;
        background: linear-gradient(to bottom, #FAFAFA 0%, #F5F5F5 100%);
      }

      /* Completely hide scrollbar */
      #lampiranCommentModal .modal-body::-webkit-scrollbar {
        display: none;
      }

      #lampiranCommentModal .modal-body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .action-buttons {
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        margin-top: 2rem;
        box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .comment-count {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #00897B 0%, #004D40 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        font-weight: 700;
        font-size: 1rem;
        box-shadow: 0 8px 20px rgba(0, 137, 123, 0.4);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .comment-count i {
        font-size: 1.5rem;
      }
      
      .form-control-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        border-radius: 0.5rem;
      }

      .info-box {
        padding: 1rem;
        border-radius: 8px;
        background: #EFF6FF;
        border-left: 4px solid #3B82F6;
        margin-top: 1rem;
      }
      
      .info-box-text {
        font-size: 0.875rem;
        color: #1E40AF;
      }
    </style>

    <div class="lpj-review-page">
      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h3 class="font-bold text-2xl text-gray-800" id="kegiatan-title">Memuat...</h3>
        <p class="text-gray-500" id="pengusul-name">Oleh: Memuat...</p>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div id="anggaran-container">
            <div class="text-center p-8">Memuat item anggaran...</div>
        </div>
      </div>
      
      <!-- Action Buttons (Fixed at bottom) -->
      <div class="action-buttons">
        <button class="btn btn-secondary" onclick="history.back()">
          <i class="ti ti-arrow-left"></i> Kembali
        </button>
        ${
          isBendahara
            ? `
          <div class="flex gap-4">
            <button class="btn btn-danger" id="btn-request-revision" style="display: none;">
              <i class="ti ti-send"></i> Kirim Revisi
            </button>
            <button class="btn btn-success" id="btn-approve-lpj" style="display: none;">
              <i class="ti ti-check"></i> Setuju
            </button>
            <button class="btn btn-primary" id="btn-complete-lpj" style="display: none;">
              <i class="ti ti-check-double"></i> Selesaikan LPJ
            </button>
          </div>
        `
            : ""
        }
        ${
          isPengusul
            ? `
          <div class="flex gap-4">
            <button class="btn btn-primary" id="btn-resubmit-lpj">
              <i class="ti ti-device-floppy"></i> Submit Ulang LPJ
            </button>
          </div>
        `
            : ""
        }
      </div>

      <!-- Comment Count Badge -->
      <div class="comment-count" id="commentCountBadge" style="display: none;">
        <i class="ti ti-message-dots"></i>
        <span id="commentCountText">0 Catatan</span>
      </div>
    </div>

    <!-- Lampiran Comment Modal -->
    <div class="modal fade" id="lampiranCommentModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" style="display: flex; align-items: center; justify-content: space-between;">
            <h5 class="modal-title" style="margin: 0; flex: 1;">
              <i class="ti ti-message-dots">&#xeaee;</i>
              Catatan Revisi untuk <span id="lampiranCommentLabel" style="color: white; font-weight: 800;"></span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label font-semibold" style="color: #374151;">Nama File</label>
              <div class="p-3 rounded-lg" style="background: #F3F4F6; color: #374151;" id="lampiranFileName"></div>
            </div>
            <div id="lampiranCommentInputContainer" style="${
              isPengusul ? "display: none;" : ""
            }">
              <label class="form-label font-semibold" style="color: #374151;">Catatan Revisi</label>
              <textarea id="lampiranCommentInput" class="form-control" rows="5" placeholder="Tuliskan catatan revisi untuk lampiran ini..."></textarea>
            </div>
            <div id="lampiranCommentDisplayContainer" style="${
              isBendahara ? "display: none;" : ""
            }">
              <label class="form-label font-semibold" style="color: #374151;">Catatan dari Bendahara</label>
              <div class="p-3 rounded-lg" style="background: #FEF2F2; color: #374151; border-left: 4px solid #EF4444;" id="lampiranCommentDisplayText"></div>
            </div>
            <div class="info-box">
              <div class="info-box-text">
                <i class="ti ti-info-circle">&#xeac5;</i> Berikan masukan yang jelas dan konstruktif untuk membantu pengusul memperbaiki lampiran.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              <i class="ti ti-x">&#xeb55;</i> Batal
            </button>
            ${
              isBendahara
                ? '<button type="button" class="btn btn-primary" id="saveLampiranCommentBtn"><i class="ti ti-check">&#xea5e;</i> Simpan Catatan</button>'
                : ""
            }
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  const pathSegments = path.split("/").filter(Boolean);
  const kegiatanId = pathSegments[pathSegments.length - 1];

  let lampiranComments = {};
  let lampiranCommentModalInstance = null;

  function init() {
    lampiranCommentModalInstance = new bootstrap.Modal(
      document.getElementById("lampiranCommentModal")
    );

    // Membersihkan state modal saat ditutup untuk mencegah data lama muncul kembali
    document
      .getElementById("lampiranCommentModal")
      .addEventListener("hidden.bs.modal", function () {
        document.getElementById("lampiranCommentInput").value = "";
      });

    fetchAndPopulateData();
    attachEventListeners();
    updateCommentCount();
  }

  async function fetchAndPopulateData() {
    Swal.fire({
      title: "Memuat Data LPJ...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    try {
      const [lpjResponse, satuanResponse] = await Promise.all([
        apiRequest(`/kegiatan/${kegiatanId}/lpj/review`),
        apiRequest("/master/satuan"),
      ]);

      const { kegiatan, anggaran, lampiran } = lpjResponse.data;
      state.satuan = satuanResponse.data;
      state.anggaran = anggaran;
      state.lampiran = lampiran;
      state.kegiatan_lpj_status = kegiatan.lpj_status; // Populate new state

      updateBendaharaButtonVisibility(kegiatan.lpj_status);

      document.getElementById("kegiatan-title").textContent =
        kegiatan.nama_kegiatan;

      const groupedAnggaran = anggaran.reduce((acc, item) => {
        const category = item.nama_kategori_belanja || "Lain-lain";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {});

      const lampiranMap = lampiran.reduce((acc, file) => {
        if (!acc[file.anggaran_id]) {
          acc[file.anggaran_id] = [];
        }
        acc[file.anggaran_id].push(file);
        return acc;
      }, {});

      const anggaranContainer = document.getElementById("anggaran-container");
      anggaranContainer.innerHTML = "";

      for (const category in groupedAnggaran) {
        const categoryTitle = document.createElement("h4");
        categoryTitle.className =
          "text-xl font-semibold mb-4 mt-6 text-gray-700";
        categoryTitle.textContent = category;
        anggaranContainer.appendChild(categoryTitle);

        groupedAnggaran[category].forEach((item, index) => {
          const itemLampiran = lampiranMap[item.anggaran_id] || [];
          const section = document.createElement("div");
          section.innerHTML = createDetailedAnggaranRow(
            item,
            itemLampiran,
            index
          );
          anggaranContainer.appendChild(section);
        });
      }

      initializeComments(lampiran);
      updateAllCommentIcons();

      Swal.close();
    } catch (error) {
      Swal.fire("Error", `Gagal memuat data LPJ: ${error.message}`, "error");
    }
  }

  function getSatuanOptions(selectedValue) {
    const defaultOption = `<option value="" ${
      selectedValue == null || selectedValue === "" ? "selected" : ""
    }></option>`;
    return (
      defaultOption +
      state.satuan
        .map(
          (s) =>
            `<option value="${s.satuan_id}" ${
              s.satuan_id == selectedValue ? "selected" : ""
            }>${s.nama_satuan}</option>`
        )
        .join("")
    );
  }

  function createDetailedAnggaranRow(item, lampiran, index) {
    const commonInputClasses = "w-full px-4 py-3 border-2 rounded-lg text-sm";

    const onFocus =
      "this.style.borderColor='#00BCD4'; this.style.boxShadow='0 0 0 4px rgba(0, 188, 212, 0.1)';";

    const onBlur =
      "this.style.borderColor='#E5E7EB'; this.style.boxShadow='none';";

    const readOnlyAttr = "readonly disabled";

    const readOnlyStyle = `style="background: #F3F4F6 !important; border-color: #E5E7EB !important; cursor: not-allowed;"`;

    const canEdit = isPengusul;

    const inputAttr = canEdit
      ? `onfocus="${onFocus}" onblur="${onBlur}"`
      : readOnlyAttr;

    const inputStyle = canEdit
      ? `style="border-color: #E5E7EB; background: #FFFFFF;"`
      : readOnlyStyle;

    const lampiranListHTML =
      lampiran.length > 0
        ? lampiran

            .map(
              (file) => `

                <div class="lampiran-item ${
                  lampiranComments[file.lampiran_id] ? "has-comment" : ""
                }" data-lampiran-id="${file.lampiran_id}">

                   <div class="lampiran-content">

                     <i class="ti ti-file-text text-gray-400"></i>

                     <a href="/download.php?id=${
                       file.lampiran_id
                     }" target="_blank" class="text-blue-600 hover:underline text-sm">${
                file.nama_file_asli
              }</a>

                   </div>

                   <div class="flex items-center gap-2">

                      ${
                        isBendahara || isPengusul
                          ? `<button type="button" class="lampiran-comment-btn ${
                              lampiranComments[file.lampiran_id]
                                ? "has-comment"
                                : ""
                            }" data-lampiran-id="${
                              file.lampiran_id
                            }" data-filename="${
                              file.nama_file_asli
                            }" title="Komentar">

                              <i class="ti ti-message-circle-2"></i>

                            </button>`
                          : ""
                      }

                      ${
                        isPengusul
                          ? `<button type="button" class="btn-delete-lampiran" data-lampiran-id="${file.lampiran_id}" title="Hapus file">

                                                                      <i class="ti ti-trash"></i>
                            </button>`
                          : ""
                      }

                   </div>

                </div>

              `
            )

            .join("")
        : '<p class="text-xs text-gray-400 italic no-files">Tidak ada bukti terlampir untuk item ini.</p>';

    return `

        <div class="mb-4" data-anggaran-id="${item.anggaran_id}">

          

          <div class="mb-6">

              <h5 class="mb-4 font-bold text-lg" style="color: #374151;">Rencana Anggaran Biaya (KAK)</h5>

              <div class="grid grid-cols-[2.5fr_0.8fr_1.2fr_0.8fr_1.2fr_0.8fr_1.2fr_2.5fr] gap-4 items-end mb-4">

                <div><label class="block font-semibold mb-2 text-sm">Uraian</label><input type="text" disabled class="${commonInputClasses}" ${readOnlyStyle} value="${
      item.uraian || ""
    }"></div>

                <div><label class="block font-semibold mb-2 text-sm">Qty 1</label><input type="number" disabled class="${commonInputClasses}" ${readOnlyStyle} value="${
      item.volume1 || ""
    }"></div>

                <div><label class="block font-semibold mb-2 text-sm">Satuan 1</label><select disabled class="${commonInputClasses}" ${readOnlyStyle}>${getSatuanOptions(
      item.satuan1_id
    )}</select></div>

                <div><label class="block font-semibold mb-2 text-sm">Qty 2</label><input type="number" disabled class="${commonInputClasses}" ${readOnlyStyle} value="${
      item.volume2 || ""
    }"></div>

                <div><label class="block font-semibold mb-2 text-sm">Satuan 2</label><select disabled class="${commonInputClasses}" ${readOnlyStyle}>${getSatuanOptions(
      item.satuan2_id
    )}</select></div>

                <div><label class="block font-semibold mb-2 text-sm">Qty 3</label><input type="number" disabled class="${commonInputClasses}" ${readOnlyStyle} value="${
      item.volume3 || ""
    }"></div>

                <div><label class="block font-semibold mb-2 text-sm">Satuan 3</label><select disabled class="${commonInputClasses}" ${readOnlyStyle}>${getSatuanOptions(
      item.satuan3_id
    )}</select></div>

                <div><label class="block font-semibold mb-2 text-sm">Harga Satuan</label><input type="text" disabled class="${commonInputClasses}" ${readOnlyStyle} value="${formatCurrency(
      item.harga_satuan
    )}"></div>

              </div>

          </div>

  

          <div>

              <h5 class="mb-4 font-bold text-lg" style="color: #00BCD4;">Realisasi Pertanggungjawaban (LPJ)</h5>

              <div class="grid grid-cols-[2.5fr_0.8fr_1.2fr_0.8fr_1.2fr_0.8fr_1.2fr_2.5fr] gap-4 items-end mb-4 realisasi-grid">

                <div>

                  <label class="block font-semibold mb-2 text-sm">Uraian</label>

                  <input type="text" disabled class="${commonInputClasses} realisasi-input" data-field="realisasi_uraian" ${readOnlyStyle} value="${
      item.realisasi_uraian || item.uraian || ""
    }">

                </div>

                <div>

                  <label class="block font-semibold mb-2 text-sm">Qty 1</label>

                  <input type="number" min="0" ${inputAttr} class="${commonInputClasses} realisasi-input" data-field="realisasi_volume1" ${inputStyle} value="${
      item.realisasi_volume1 || item.volume1 || ""
    }">

                </div>

                <div>

                  <label class="block font-semibold mb-2 text-sm">Satuan 1</label>

                  <select ${inputAttr} class="${commonInputClasses} realisasi-input" data-field="realisasi_satuan1_id" ${inputStyle}>${getSatuanOptions(
      item.realisasi_satuan1_id || item.satuan1_id
    )}</select>

                </div>

                <div>

                  <label class="block font-semibold mb-2 text-sm">Qty 2</label>

                  <input type="number" min="0" ${inputAttr} class="${commonInputClasses} realisasi-input" data-field="realisasi_volume2" ${inputStyle} value="${
      item.realisasi_volume2 || item.volume2 || ""
    }">

                </div>

                <div>

                  <label class="block font-semibold mb-2 text-sm">Satuan 2</label>

                  <select ${inputAttr} class="${commonInputClasses} realisasi-input" data-field="realisasi_satuan2_id" ${inputStyle}>${getSatuanOptions(
      item.realisasi_satuan2_id || item.satuan2_id
    )}</select>

                </div>

                <div>

                  <label class="block font-semibold mb-2 text-sm">Qty 3</label>

                  <input type="number" min="0" ${inputAttr} class="${commonInputClasses} realisasi-input" data-field="realisasi_volume3" ${inputStyle} value="${
      item.realisasi_volume3 || item.volume3 || ""
    }">

                </div>

                <div>

                  <label class="block font-semibold mb-2 text-sm">Satuan 3</label>

                  <select ${inputAttr} class="${commonInputClasses} realisasi-input" data-field="realisasi_satuan3_id" ${inputStyle}>${getSatuanOptions(
      item.realisasi_satuan3_id || item.satuan3_id
    )}</select>

                </div>

                <div>

                  <label class="block font-semibold mb-2 text-sm">Harga Satuan</label>

                  <input type="text" ${inputAttr} class="${commonInputClasses} realisasi-input currency-input" data-field="realisasi_harga_satuan" ${inputStyle} value="${formatCurrency(
      item.realisasi_harga_satuan || item.harga_satuan || 0
    )}">

                </div>

                </div>

  

                  <div class="mt-4">

  

                      <h6 class="font-semibold text-xs text-gray-500 mb-2">BUKTI/LAMPIRAN:</h6>

  

                      <div class="pl-4 border-l-2 border-gray-200 space-y-2 lampiran-list" data-anggaran-id="${
                        item.anggaran_id
                      }">

                          ${lampiranListHTML}

                      </div>

  

                      ${
                        isPengusul
                          ? `

                        <div class="mt-2">

                          <input type="file" class="input-add-lampiran" data-anggaran-id="${item.anggaran_id}" multiple style="display: none;" />

                          <button type="button" class="btn-add-lampiran btn btn-sm btn-outline-primary">

                            <i class="ti ti-plus"></i> Tambah File

                          </button>

                        </div>`
                          : ""
                      }

                  </div>

  

                </div>

      `;
  }

  function initializeComments(lampiran) {
    lampiranComments = {};
    lampiran.forEach((file) => {
      if (file.catatan) {
        lampiranComments[file.lampiran_id] = file.catatan;
      }
    });
    updateCommentCount();
  }

  function updateAllCommentIcons() {
    document.querySelectorAll(".lampiran-item").forEach((item) => {
      const lampiranId = item.dataset.lampiranId;
      const comment = lampiranComments[lampiranId];

      const btn = item.querySelector(".lampiran-comment-btn");
      if (btn) {
        btn.classList.toggle("has-comment", !!comment);
      }

      item.classList.toggle("has-comment", !!comment);
    });
  }

  async function openLampiranCommentModal(btn) {
    const lampiranId = btn.getAttribute("data-lampiran-id");
    const filename = btn.getAttribute("data-filename");

    const modalElement = document.getElementById("lampiranCommentModal");
    modalElement.dataset.lampiranId = lampiranId; // Store ID on the modal

    document.getElementById("lampiranCommentLabel").textContent = filename;
    document.getElementById("lampiranFileName").textContent = filename;

    const commentInput = document.getElementById("lampiranCommentInput");
    const commentDisplay = document.getElementById(
      "lampiranCommentDisplayText"
    );

    // Show loading state
    commentInput.value = "Memuat catatan...";
    commentInput.disabled = true;
    commentDisplay.textContent = "Memuat catatan...";

    lampiranCommentModalInstance.show();

    try {
      const response = await apiRequest(`/lampiran/${lampiranId}`);
      const commentText = response.data.catatan || "";

      if (isBendahara) {
        commentInput.value = commentText;
        commentInput.disabled = false;
      }
      commentDisplay.textContent = commentText || "(Tidak ada catatan)";
    } catch (error) {
      const errorMsg = `Gagal memuat catatan: ${error.message}`;
      commentInput.value = errorMsg;
      commentDisplay.textContent = errorMsg;
      Swal.fire({ icon: "error", title: "Error", text: errorMsg });
    }
  }

  async function saveLampiranComment() {
    const modalElement = document.getElementById("lampiranCommentModal");
    const lampiranId = modalElement.dataset.lampiranId; // Retrieve ID from the modal
    const comment = document
      .getElementById("lampiranCommentInput")
      .value.trim();

    if (!lampiranId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Tidak dapat menemukan ID lampiran. Coba lagi.",
      });
      return;
    }

    Swal.fire({
      title: "Menyimpan Catatan...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await apiRequest(`/lampiran/${lampiranId}/catatan`, {
        method: "POST",
        body: JSON.stringify({ catatan: comment }),
      });

      // Update local state only on success
      if (comment) {
        lampiranComments[lampiranId] = comment;
      } else {
        delete lampiranComments[lampiranId];
      }

      updateAllCommentIcons();
      updateCommentCount();
      lampiranCommentModalInstance.hide();

      Swal.fire({
        icon: "success",
        title: "Tersimpan!",
        text: "Catatan berhasil disimpan ke database.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan",
        text: `Terjadi kesalahan saat menyimpan catatan: ${error.message}`,
      });
    }
  }

  function updateCommentCount() {
    const count = Object.keys(lampiranComments).length;

    const badge = document.getElementById("commentCountBadge");
    const text = document.getElementById("commentCountText");

    if (badge && text) {
      if (count > 0) {
        text.textContent = `${count} Catatan`;
        badge.style.display = "flex";
      } else {
        badge.style.display = "none";
      }
    }
  }

  async function submitRevision() {
    // Kumpulkan semua catatan lampiran yang disimpan secara lokal untuk dikirim ke API.
    const lampiran_comments = [];
    Object.entries(lampiranComments).forEach(([lampiranId, catatan]) => {
      lampiran_comments.push({ id: lampiranId, catatan });
    });

    if (Object.keys(lampiranComments).length === 0) {
      Swal.fire(
        "Peringatan",
        "Anda harus memberikan setidaknya satu catatan revisi.",
        "warning"
      );
      return;
    }

    const payload = {
      catatan_umum:
        "LPJ perlu direvisi. Mohon periksa catatan pada setiap lampiran.",
      anggaran_comments: [],
      lampiran_comments,
    };

    Swal.fire({
      title: "Mengirim Revisi...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      await apiRequest(`/kegiatan/${kegiatanId}/lpj/revise`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      await Swal.fire(
        "Sukses",
        "LPJ telah dikembalikan ke pengusul untuk direvisi.",
        "success"
      );
      window.location.href = "/bendahara/kegiatan/lpj";
    } catch (error) {
      Swal.fire("Error", `Gagal mengirim revisi: ${error.message}`, "error");
    }
  }

  async function approveLpj() {
    Swal.fire({
      title: "Setujui LPJ?",
      text: "LPJ akan disetujui dan status akan menjadi 'Setor Fisik'.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Setujui!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Menyetujui LPJ...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
        try {
          await apiRequest(`/kegiatan/${kegiatanId}/lpj/approve`, {
            method: "POST",
            body: JSON.stringify({}), // No specific payload needed for now
          });
          await Swal.fire(
            "Sukses",
            "LPJ berhasil disetujui. Status LPJ adalah 'Setor Fisik'.",
            "success"
          );
          window.location.reload(); // Reload page to update buttons and status
        } catch (error) {
          Swal.fire("Error", `Gagal menyetujui LPJ: ${error.message}`, "error");
        }
      }
    });
  }

  async function completeLpj() {
    Swal.fire({
      title: "Selesaikan LPJ?",
      text: "LPJ akan ditandai sebagai selesai secara keseluruhan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Selesaikan!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Menyelesaikan LPJ...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });
        try {
          await apiRequest(`/kegiatan/${kegiatanId}/lpj/complete`, {
            method: "POST",
            body: JSON.stringify({}), // No specific payload needed for now
          });
          await Swal.fire(
            "Sukses",
            "LPJ berhasil ditandai sebagai selesai dan status approval kegiatan menjadi disetujui.",
            "success"
          );
          window.location.reload(); // Reload page to update status
        } catch (error) {
          Swal.fire(
            "Error",
            `Gagal menyelesaikan LPJ: ${error.message}`,
            "error"
          );
        }
      }
    });
  }

  function updateBendaharaButtonVisibility(status) {
    if (!isBendahara) return;

    const approveBtn = document.getElementById("btn-approve-lpj");
    const completeBtn = document.getElementById("btn-complete-lpj");
    const revisionBtn = document.getElementById("btn-request-revision");

    // Hide all first to have a clean state
    if (approveBtn) approveBtn.style.display = "none";
    if (completeBtn) completeBtn.style.display = "none";
    if (revisionBtn) revisionBtn.style.display = "none";

    if (status === "setor fisik") {
      // Only show "Selesaikan" button
      if (completeBtn) completeBtn.style.display = "inline-block";
    } else if (status !== "disetujui" && status !== "selesai") {
      // For other non-final states, show approval and revision buttons
      if (approveBtn) approveBtn.style.display = "inline-block";
      if (revisionBtn) revisionBtn.style.display = "inline-block";
    }
    // If status is 'disetujui' or 'selesai', all buttons remain hidden.
  }

  function attachEventListeners() {
    // Event delegation untuk button comment
    document.body.addEventListener("click", function (event) {
      const commentBtn = event.target.closest(".lampiran-comment-btn");
      if (commentBtn) {
        event.preventDefault();
        event.stopPropagation();
        console.log("Lampiran comment button clicked", commentBtn);
        openLampiranCommentModal(commentBtn);
      }
    });

    // Bendahara specific listeners
    if (isBendahara) {
      const saveBtn = document.getElementById("saveLampiranCommentBtn");
      if (saveBtn) {
        saveBtn.addEventListener("click", saveLampiranComment);
      }
      const revisionBtn = document.getElementById("btn-request-revision");
      if (revisionBtn) {
        revisionBtn.addEventListener("click", submitRevision);
      }
      const approveBtn = document.getElementById("btn-approve-lpj");
      if (approveBtn) {
        approveBtn.addEventListener("click", approveLpj);
      }
      const completeBtn = document.getElementById("btn-complete-lpj");
      if (completeBtn) {
        completeBtn.addEventListener("click", completeLpj);
      }
    }

    // Pengusul specific listeners
    if (isPengusul) {
      // Handle clicks on dynamically added buttons
      document.body.addEventListener("click", function (event) {
        if (event.target.matches(".btn-add-lampiran")) {
          const anggaranId = event.target.dataset.anggaranId;
          document
            .querySelector(
              `.input-add-lampiran[data-anggaran-id="${anggaranId}"]`
            )
            .click();
        }
        if (event.target.closest(".btn-delete-lampiran")) {
          handleDeleteFile(event.target.closest(".btn-delete-lampiran"));
        }
      });

      document.body.addEventListener("change", function (event) {
        if (event.target.matches(".input-add-lampiran")) {
          handleFileSelect(event.target);
        }
      });

      const resubmitBtn = document.getElementById("btn-resubmit-lpj");
      if (resubmitBtn) {
        resubmitBtn.addEventListener("click", resubmitLpj);
      }
    }
  }
  // --- Resubmission Logic for Pengusul ---
  const filesToDelete = new Set();
  const fileStore = {}; // Structure: { anggaran_id: [File, File, ...] }

  function handleDeleteFile(btn) {
    const lampiranId = btn.dataset.lampiranId;
    Swal.fire({
      title: "Anda yakin?",
      text: "File ini akan dihapus secara permanen saat Anda submit ulang.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, tandai untuk dihapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        filesToDelete.add(lampiranId);
        const lampiranItem = btn.closest(".lampiran-item");
        lampiranItem.style.opacity = "0.5";
        lampiranItem.style.textDecoration = "line-through";
        btn.disabled = true;
      }
    });
  }

  function handleFileSelect(input) {
    const anggaranId = input.dataset.anggaranId;
    const files = Array.from(input.files);

    if (!fileStore[anggaranId]) {
      fileStore[anggaranId] = [];
    }

    const lampiranList = document.querySelector(
      `.lampiran-list[data-anggaran-id="${anggaranId}"]`
    );

    const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

    files.forEach((file) => {
      // Validate file type
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Tipe File Tidak Didukung",
          text: `File "${file.name}" tidak dapat diunggah. Hanya file JPG, PNG, atau PDF yang diizinkan.`,
        });
        return; // Skip this file
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        Swal.fire({
          icon: "error",
          title: "Ukuran File Terlalu Besar",
          text: `File "${file.name}" (${(file.size / (1024 * 1024)).toFixed(
            2
          )} MB) melebihi batas maksimal 10 MB.`,
        });
        return; // Skip this file
      }

      const fileIndex = fileStore[anggaranId].push(file) - 1;

      const pendingItem = document.createElement("div");
      pendingItem.className = "lampiran-item pending-lampiran";
      pendingItem.dataset.anggaranId = anggaranId;
      pendingItem.dataset.fileIndex = fileIndex;
      pendingItem.innerHTML = `
              <div class="lampiran-content">
                  <i class="ti ti-clock text-blue-500"></i>
                  <span class="text-blue-700">${file.name}</span>
              </div>
              <button type="button" class="ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all bg-red-500 text-white" title="Batal upload" onclick="window.cancelNewFile(this, '${anggaranId}', ${fileIndex})">
                  <i class="ti ti-x"></i>
              </button>
          `;
      lampiranList.querySelector(".no-files")?.remove();
      lampiranList.appendChild(pendingItem);
    });
  }

  window.cancelNewFile = function (button, anggaranId, fileIndex) {
    // Remove from UI
    button.closest(".pending-lampiran").remove();

    // Remove from fileStore by filtering
    if (fileStore[anggaranId] && fileStore[anggaranId][fileIndex]) {
      // Filter out the file at the specific index
      // Using slice to create new array for immutability if preferred, or direct filter
      fileStore[anggaranId] = fileStore[anggaranId].filter(
        (_, idx) => idx !== fileIndex
      );

      // If after filtering, the array for this anggaranId is empty, delete the entry
      if (fileStore[anggaranId].length === 0) {
        delete fileStore[anggaranId];
      }
    }

    // Check if there are no files remaining for this anggaran_id and potentially re-add the "no files" message
    const lampiranList = document.querySelector(
      `.lampiran-list[data-anggaran-id="${anggaranId}"]`
    );
    if (lampiranList && lampiranList.children.length === 0) {
      const noFilesText = document.createElement("p");
      noFilesText.className = "text-xs text-gray-400 italic no-files";
      noFilesText.textContent = "Tidak ada bukti terlampir untuk item ini.";
      lampiranList.appendChild(noFilesText);
    }
  };

  async function resubmitLpj() {
    Swal.fire({
      title: "Submit Ulang LPJ?",
      text: "Pastikan semua data realisasi dan lampiran sudah benar sebelum submit.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Submit Ulang!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        executeResubmission();
      }
    });
  }

  async function executeResubmission() {
    Swal.fire({
      title: "Mengirim data...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const formData = new FormData();

    // 1. Append files to delete
    formData.append(
      "files_to_delete",
      JSON.stringify(Array.from(filesToDelete))
    );

    // 2. Append realization data
    const realisasiData = {};
    document.querySelectorAll(".realisasi-grid").forEach((grid) => {
      const anggaranId = grid.closest("[data-anggaran-id]").dataset.anggaranId;
      realisasiData[anggaranId] = {};
      grid.querySelectorAll(".realisasi-input").forEach((input) => {
        const field = input.dataset.field;
        realisasiData[anggaranId][field] = input.value;
      });
    });
    formData.append("realisasi", JSON.stringify(realisasiData));

    // 3. Append new files
    for (const anggaranId in fileStore) {
      fileStore[anggaranId].forEach((file, index) => {
        if (file) {
          // Check if file is not cancelled
          formData.append(`bukti[${anggaranId}][]`, file, file.name);
        }
      });
    }

    try {
      await apiRequest(`/kegiatan/${kegiatanId}/lpj/resubmit`, {
        method: "POST",
        body: formData,
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "LPJ telah berhasil disubmit ulang.",
      });

      window.location.href = "/pengusul/kegiatan/lpj";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  }

  init();
}
