// frontend/src/pages/pengusul/MengajukanKegiatanPage.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderMengajukanKegiatanPage(path, userRole) {
  const pageContent = `
    <style>
      /* --- Custom CSS for Figma Design --- */
      
      /* 1. Main Background */
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

      /* 2. Sidebar */
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
      .menu-inner .menu-item.active > .menu-link i,
      .menu-inner .menu-item.active > .menu-link div {
        color: #ffffff !important;
      }

      /* 3. Table Styling */
      .card-datatable {
        background: rgba(255, 255, 255, 0.6) !important;
        backdrop-filter: blur(10px);
        border-radius: 0.875rem !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
        padding: 1.5rem;
      }
      .table {
        border-collapse: separate !important;
        border-spacing: 0 1rem !important;
      }
      .table thead {
        background: transparent !important; 
      }
      .table thead th {
        color: #6B7280 !important;
        font-weight: 500 !important;
        background: transparent !important;
        border: none !important;
        text-transform: none !important;
        font-size: 14px !important;
        padding-top: 0 !important;
        padding-bottom: 0.5rem !important;
      }
      .table tbody tr {
        background: #FFFFFF !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
        transition: all 0.2s ease;
      }
      .table tbody tr:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.08) !important;
      }
      .table tbody td {
        border: none !important;
        padding: 1.25rem 1rem !important;
        vertical-align: middle;
      }
      .table tbody td:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
      .table tbody td:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
      
      /* 4. Custom Checkbox */
      .form-check-input {
        border-radius: 6px !important;
        border: 2px solid #D1D5DB !important;
      }
      .form-check-input:checked {
        background-color: #33C8DA !important;
        border-color: #33C8DA !important;
      }

      /* 5. Status Badge */
      .badge.bg-label-success {
        background: #d1f4dd !important;
        color: #0f7c3a !important;
        padding: 6px 16px;
        border-radius: 6px;
        font-weight: 500;
      }
      .badge.bg-label-warning {
        background: #fef3c7 !important;
        color: #92400e !important;
        padding: 6px 16px;
        border-radius: 6px;
        font-weight: 500;
      }
      .badge.bg-label-danger {
        background: #fecdd3 !important;
        color: #be123c !important;
        padding: 6px 16px;
        border-radius: 6px;
        font-weight: 500;
      }
      
      /* 6. Buttons */
      .btn-ajukan {
        background: #00BCD4 !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3) !important;
        border: none !important;
        padding: 0.5rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .btn-ajukan:hover {
        background: #0097A7 !important;
        color: white !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.4) !important;
      }
      .btn-ajukan:disabled {
        background: #B0BEC5 !important;
        cursor: not-allowed !important;
        opacity: 0.6;
      }

      /* 7. Search Bar */
      .navbar-search-wrapper .input-group {
        background: #FFFFFF !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
      }
      .navbar-search-wrapper .input-group-text {
        background: transparent !important;
        border: none !important;
      }
      .navbar-search-wrapper .form-control {
        background: transparent !important;
        border: none !important;
      }
      .navbar-search-wrapper .form-control:focus {
        box-shadow: none !important;
      }

      /* 8. Icon Styles */
      i.ti {
        background: none !important;
        display: inline-block;
        color: inherit !important;
        font-style: normal !important;
        font-size: 24px !important;
      }

      .menu-icon i,
      .navbar-nav i.ti {
        font-size: 35px !important;
        vertical-align: middle !important;
      }

      .menu-link i {
        margin-right: 10px !important;
      }
      
      .container-xxl {
        max-width: 96% !important;
      }

      .nav-item i.ti {
        font-size: 24px !important;
      }

      /* 9. Modal Styling */
      .modal-content {
        border-radius: 12px;
        border: none;
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      }
      
      .modal-header {
        border-bottom: 1px solid #e5e7eb;
        padding: 1.5rem;
      }
      
.modal-title {
        font-weight: 600;
        color: #1f2937;
      }
      
      .modal-body {
        padding: 1.5rem;
      }
      
      .modal-footer {
        border-top: 1px solid #e5e7eb;
        padding: 1rem 1.5rem;
      }

      /* 10. Form Styling */
      .form-label {
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.5rem;
      }
      
      .form-control {
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 0.625rem 0.875rem;
        transition: all 0.2s;
      }
      
      .form-control:focus {
        border-color: #00BCD4;
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
      }

      /* 11. Button Styles */
      .btn-primary {
        background: #00bcd4 !important;
        color: white !important;
        border: none;
        padding: 0.625rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
      }

      .btn-primary:hover {
        background: #0097A7 !important;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
      }
      
      .btn-primary:disabled {
        background: #B0BEC5 !important;
        cursor: not-allowed !important;
        opacity: 0.6;
      }

      .btn-label-secondary {
        background: #f3f4f6 !important;
        color: #6b7280 !important;
        border: none;
        padding: 0.625rem 1.5rem;
        border-radius: 6px;
        font-weight: 500;
      }

      .btn-label-secondary:hover {
        background: #e5e7eb !important;
        color: #374151 !important;
      }

      /* Loading spinner */
      .spinner-border-sm {
        width: 1rem;
        height: 1rem;
        border-width: 0.15em;
      }

      /* Error message styling */
      .alert {
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      /* File upload styling */
      .form-control[type="file"] {
        padding: 0.5rem 0.875rem;
      }

      .form-control[type="file"]::file-selector-button {
        background: #f3f4f6;
        border: none;
        padding: 0.375rem 0.875rem;
        border-radius: 4px;
        margin-right: 0.875rem;
        cursor: pointer;
        font-weight: 500;
        color: #374151;
      }

      .form-control[type="file"]::file-selector-button:hover {
        background: #e5e7eb;
      }

      /* Pagination styling */
      .pagination {
        gap: 0.5rem;
      }

      .page-link {
        border: none;
        border-radius: 6px;
        padding: 0.5rem 0.875rem;
        color: #6b7280;
        background: #ffffff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .page-link:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .page-item.active .page-link {
        background: #00BCD4;
        color: white;
        box-shadow: 0 2px 6px rgba(0, 188, 212, 0.3);
      }

      /* ========================================== */
      /* ADDITIONAL ANIMATIONS FROM MONITORING USULAN */
      /* ========================================== */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes skeletonLoading {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }

      /* Enhanced page animation */
      .mengajukan-kegiatan-page {
        animation: fadeIn 0.5s ease-out;
      }

      /* Enhanced card animation with shimmer */
      .card-datatable {
        position: relative;
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.2s;
        opacity: 0;
      }

      .card-datatable::after {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
        animation: shimmer 3s infinite;
        pointer-events: none;
        z-index: 0;
      }

      .card-datatable:hover {
        box-shadow: 0 10px 30px rgba(0, 188, 212, 0.15);
      }

      /* Enhanced table row animations */
      .table tbody tr {
        opacity: 0;
        animation: slideUp 0.5s ease-out forwards;
      }

      .table tbody tr:nth-child(1) { animation-delay: 0.3s; }
      .table tbody tr:nth-child(2) { animation-delay: 0.4s; }
      .table tbody tr:nth-child(3) { animation-delay: 0.5s; }
      .table tbody tr:nth-child(4) { animation-delay: 0.6s; }
      .table tbody tr:nth-child(5) { animation-delay: 0.7s; }
      .table tbody tr:nth-child(6) { animation-delay: 0.8s; }
      .table tbody tr:nth-child(7) { animation-delay: 0.9s; }
      .table tbody tr:nth-child(8) { animation-delay: 1s; }
      .table tbody tr:nth-child(9) { animation-delay: 1.1s; }
      .table tbody tr:nth-child(10) { animation-delay: 1.2s; }

      /* Enhanced badge pulse animation */
      .badge {
        animation: statusPulse 2s ease-in-out infinite;
      }

      .badge:hover {
        animation: pulse 0.5s ease-in-out;
      }

      /* Button ripple effect */
      .btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .btn:hover::before {
        width: 300px;
        height: 300px;
      }

      /* Skeleton loading */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: skeletonLoading 1.5s ease-in-out infinite;
        border-radius: 4px;
      }

      /* Modal animation */
      .modal-content {
        animation: scaleIn 0.3s ease-out;
      }
    </style>

    <div class="mengajukan-kegiatan-page">
      <!-- Header Section -->
      <div class="page-header-section" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 0 0.5rem; opacity: 0; animation: slideInRight 0.6s ease-out forwards;">
        <div>
          <h2 class="text-4xl font-bold text-gray-800">Mengajukan Kegiatan</h2>
          <p class="text-lg text-gray-600" style="margin: 0.5rem 0 0 0; color: #64748b; font-size: 14px;">Ajukan kegiatan yang telah disetujui</p>
        </div>
      </div>

      <!-- Alert Container -->
      <div class="container-xxl">
        <div id="pageAlertContainer" style="display: none; margin-bottom: 1.5rem;"></div>
      </div>

      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th>ID KAK</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Tanggal Diajukan</th>
              <th>Tanggal Disetujui</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="kegiatanTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
      </div>

      <!-- Pagination could be added here if needed -->
    </div>

    <!-- Modal Ajukan Kegiatan -->
    <div class="modal fade" id="ajukanKegiatanModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalAjukanTitle">Ajukan Kegiatan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="ajukanKegiatanError" class="alert alert-danger" style="display: none;"></div>
            <form id="ajukanKegiatanForm">
              <input type="hidden" id="kakId">
              <div class="mb-3">
                <label for="penanggungJawab" class="form-label">Penanggung Jawab</label>
                <input type="text" id="penanggungJawab" class="form-control" placeholder="Masukkan nama penanggung jawab" required>
              </div>
              <div class="mb-3">
                <label for="pelaksana" class="form-label">Pelaksana Kegiatan</label>
                <input type="text" id="pelaksana" class="form-control" placeholder="Masukkan nama pelaksana kegiatan" required>
              </div>
              <div class="mb-3">
                <label for="suratPengantar" class="form-label">Surat Pengantar</label>
                <input type="file" id="suratPengantar" class="form-control" accept=".pdf,.doc,.docx" required>
                <small class="text-muted">Format: PDF, DOC, DOCX (Max 5MB)</small>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" id="btnSelesaiAjukan">
              <span class="button-text">Selesai</span>
              <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // STATE & SETUP
  // ==============================================
  let approvedTelaah = [];
  let ajukanModalInstance = null;
  if (typeof bootstrap !== "undefined") {
    ajukanModalInstance = new bootstrap.Modal(
      document.getElementById("ajukanKegiatanModal")
    );
  }

  // ==============================================
  // API FUNCTIONS
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    const headers = { ...options.headers };
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    headers["Authorization"] = `Bearer ${token}`;

    const config = { ...options, headers };

    try {
      const response = await fetch(`/api${endpoint}`, config);
      const data = await response.json();
      if (data.success !== true) {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  async function fetchApprovedTelaah() {
    const tbody = document.getElementById("kegiatanTableBody");
    tbody.innerHTML =
      '<tr><td colspan="7" class="text-center">Loading...</td></tr>';
    try {
      const response = await apiRequest("/kak?status=3");
      approvedTelaah = response.data;
      renderTableRows(approvedTelaah);
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error: ${error.message}</td></tr>`;
    }
  }

  async function submitKegiatan(formData) {
    setButtonLoading("btnSelesaiAjukan", true);
    hideModalError();
    try {
      await apiRequest("/kegiatan", {
        method: "POST",
        body: formData,
      });

      ajukanModalInstance.hide();
      fetchApprovedTelaah(); // Refresh the list
      showPageAlert("Kegiatan berhasil diajukan!", "success"); // Use showPageAlert for success
    } catch (error) {
      showModalError(error.message || "Gagal mengajukan kegiatan."); // Use showPageAlert for error
    } finally {
      setButtonLoading("btnSelesaiAjukan", false);
    }
  }

  // ==============================================
  // UI & HELPER FUNCTIONS
  // ==============================================
  function formatDate(dateString) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function showPageAlert(message, type = "success") {
    const alertContainer = document.getElementById("pageAlertContainer");
    if (alertContainer) {
      alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
      alertContainer.style.display = "block";
      setTimeout(() => {
        alertContainer.style.display = "none";
        alertContainer.innerHTML = "";
      }, 5000); // Hide after 5 seconds
    }
  }

  function showModalError(message) {
    const errorDiv = document.getElementById("ajukanKegiatanError");
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    }
  }

  function hideModalError() {
    const errorDiv = document.getElementById("ajukanKegiatanError");
    if (errorDiv) {
      errorDiv.style.display = "none";
    }
  }

  function setButtonLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    const textSpan = button.querySelector(".button-text");
    const spinner = button.querySelector(".spinner-border");

    button.disabled = isLoading;
    if (spinner) spinner.classList.toggle("d-none", !isLoading);
    if (textSpan) textSpan.style.opacity = isLoading ? "0" : "1";
  }

  function renderTableRows(data) {
    const tbody = document.getElementById("kegiatanTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!data || data.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center">Tidak ada usulan KAK yang disetujui.</td></tr>';
      return;
    }

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox" data-id="${
            item.kak_id
          }">
        </td>
        <td>
          <span style="font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 0.5rem 0.75rem; border-radius: 8px; background: #FFFFFF; color: #374151;">${
            item.kak_id
          }</span>
        </td>
        <td>
          <div style="display: flex; flex-direction: column;">
            <strong>${item.nama_kegiatan}</strong>
            <small class="text-muted">${
              item.pengusul_nama || "Tanpa Pengusul"
            }</small>
          </div>
        </td>
        <td>${formatDate(item.created_at)}</td>
        <td>${formatDate(item.updated_at)}</td>
        <td style="text-align: center;">
          <span class="badge bg-label-success">Disetujui</span>
        </td>
        <td style="text-align: center;">
          <button 
            class="btn btn-sm btn-ajukan" 
            data-id="${item.kak_id}"
          >
            Ajukan Kegiatan
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    attachEventListeners();
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachEventListeners() {
    document.querySelectorAll(".btn-ajukan").forEach((btn) => {
      btn.addEventListener("click", handleAjukanClick);
    });

    const suratPengantarInput = document.getElementById("suratPengantar");
    if (suratPengantarInput) {
      suratPengantarInput.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      suratPengantarInput.addEventListener("change", (e) => {
        e.stopPropagation();
      });
    }

    // Prevent default form submission for the modal form
    const ajukanKegiatanForm = document.getElementById("ajukanKegiatanForm");
    if (ajukanKegiatanForm) {
      ajukanKegiatanForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission
      });
    }
  }

  function handleAjukanClick(e) {
    const kakId = e.currentTarget.dataset.id;
    document.getElementById("kakId").value = kakId;
    document.getElementById("ajukanKegiatanForm").reset();
    hideModalError(); // Clear modal errors on open
    ajukanModalInstance.show();
  }

  const btnSelesaiAjukan = document.getElementById("btnSelesaiAjukan");
  if (btnSelesaiAjukan) {
    btnSelesaiAjukan.addEventListener("click", () => {
      const kakId = document.getElementById("kakId").value;
      const penanggungJawab = document
        .getElementById("penanggungJawab")
        .value.trim();
      const pelaksana = document.getElementById("pelaksana").value.trim();
      const suratPengantar = document.getElementById("suratPengantar").files[0];

      if (!penanggungJawab || !pelaksana || !suratPengantar) {
        showModalError("Semua field harus diisi!"); // Use modal-specific error
        return;
      }

      if (suratPengantar.size > 5 * 1024 * 1024) {
        showModalError("Ukuran file Surat Pengantar maksimal 5MB!"); // Use modal-specific error
        return;
      }

      const formData = new FormData();
      formData.append("kak_id", kakId);
      formData.append("penanggung_jawab_manual", penanggungJawab);
      formData.append("pelaksana_manual", pelaksana);
      formData.append("surat_pengantar", suratPengantar);

      submitKegiatan(formData);
    });
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  fetchApprovedTelaah();
}
