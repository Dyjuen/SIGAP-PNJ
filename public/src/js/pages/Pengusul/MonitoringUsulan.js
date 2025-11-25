// frontend/src/pages/Pengusul/MonitoringUsulan.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderMonitoringUsulanPage(path, userRole) {
  const pageContent = `
    <style>
      /* ========================================== */
      /* KEYFRAME ANIMATIONS */
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

      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      @keyframes borderFlow {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
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

      /* ========================================== */
      /* BASE STYLES WITH ANIMATIONS */
      /* ========================================== */
      .monitoring-usulan-page {
        animation: fadeIn 0.5s ease-out;
      }

      /* ========================================== */
      /* HEADER SECTION */
      /* ========================================== */
      .page-header-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding: 0 0.5rem;
        opacity: 0;
        animation: slideInRight 0.6s ease-out forwards;
      }

      .page-header-section h4 {
        margin: 0;
        color: #1e293b;
        font-weight: 600;
        font-size: 2rem;
      }

      .page-header-section p {
        margin: 0.5rem 0 0 0;
        color: #64748b;
        font-size: 14px;
      }

      /* ========================================== */
      /* BUTTON STYLES */
      /* ========================================== */
      .btn-ajukan-usulan {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(5, 156, 216, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .btn-ajukan-usulan::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      
      .btn-ajukan-usulan:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(5, 156, 216, 0.4);
      }
      
      .btn-ajukan-usulan:hover::before {
        width: 300px;
        height: 300px;
      }
      
      .btn-ajukan-usulan:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(5, 156, 216, 0.3);
      }
      
      .btn-ajukan-usulan svg {
        transition: transform 0.3s ease;
      }
      
      .btn-ajukan-usulan:hover svg {
        transform: translateX(3px);
      }

      /* Button Variants */
      .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        cursor: pointer;
        font-weight: 600;
      }

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

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      .btn:active {
        transform: translateY(0);
      }

      .btn-primary {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(5, 156, 216, 0.3);
      }

      .btn-edit-profile {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(5, 156, 216, 0.3);
        padding: 0.5rem;
        border-radius: 6px;
      }

      .btn-delete {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        padding: 0.5rem;
        border-radius: 6px;
      }

      .btn-download {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(5, 156, 216, 0.3);
        padding: 0.5rem 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 6px;
      }

      /* ========================================== */
      /* TABLE CARD */
      /* ========================================== */
      .card-datatable {
        background: white;
        border-radius: 12px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.2s;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
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

      /* ========================================== */
      /* TABLE STYLES */
      /* ========================================== */
      .table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 0.75rem;
        padding: 0 1.5rem;
      }

      .table thead th {
        color: #00BCD4;
        font-weight: 600;
        font-size: 14px;
        padding: 1rem;
        text-align: left;
        border-bottom: 2px solid #E0F2FE;
        background: transparent;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .table tbody tr {
        background: white;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

      .table tbody tr:hover {
        background: linear-gradient(to right, #F0F9FF, transparent);
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.1);
      }

      .table tbody td {
        padding: 1rem;
        border-bottom: 1px solid #F3F4F6;
        vertical-align: middle;
      }

      /* ========================================== */
      /* CHECKBOX STYLES */
      /* ========================================== */
      .form-check-input {
        width: 20px;
        height: 20px;
        border: 2px solid #D1D5DB;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .form-check-input:hover {
        border-color: #00BCD4;
        transform: scale(1.1);
      }

      .form-check-input:checked {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        border-color: #00BCD4;
      }

      /* ========================================== */
      /* NUMBER BADGE */
      /* ========================================== */
      .number-badge {
        display: inline-block;
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
        padding: 4px 12px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 13px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .table tbody tr:hover .number-badge {
        transform: scale(1.15);
        box-shadow: 0 4px 12px rgba(5, 156, 216, 0.4);
      }

      /* ========================================== */
      /* STATUS BADGE */
      /* ========================================== */
      .badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 13px;
        min-width: 85px;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: statusPulse 2s ease-in-out infinite;
      }

      .badge:hover {
        transform: scale(1.1);
        animation: pulse 0.5s ease-in-out;
      }

      .bg-label-dark {
        background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
        color: white;
      }

      .bg-label-warning {
        background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
        color: white;
      }

      .bg-label-success {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: white;
      }

      .bg-label-danger {
        background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        color: white;
      }

      .bg-label-info {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
      }

      /* ========================================== */
      /* PAGINATION */
      /* ========================================== */
      .pagination-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 1.3s;
      }

      .pagination-info {
        color: #6B7280;
        font-size: 14px;
        font-weight: 500;
      }

      .pagination {
        display: flex;
        list-style: none;
        gap: 0.5rem;
        margin: 0;
        padding: 0;
      }

      .pagination .page-item {
        display: inline-block;
      }

      .pagination .page-link {
        padding: 0.5rem 0.75rem;
        border: 1px solid #E5E7EB;
        border-radius: 6px;
        color: #374151;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        min-width: 40px;
        text-align: center;
        display: inline-block;
        position: relative;
        overflow: hidden;
      }

      .pagination .page-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.2), transparent);
        transition: left 0.5s;
      }

      .pagination .page-link:hover {
        background: #F3F4F6;
        border-color: #00BCD4;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 188, 212, 0.2);
      }

      .pagination .page-link:hover::before {
        left: 100%;
      }

      .pagination .page-item.active .page-link {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
        border-color: #00BCD4;
        box-shadow: 0 4px 12px rgba(5, 156, 216, 0.4);
        transform: scale(1.1);
      }

      .pagination .page-item.disabled .page-link {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* ========================================== */
      /* LOADING STATE */
      /* ========================================== */
      @keyframes skeletonLoading {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }

      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: skeletonLoading 1.5s ease-in-out infinite;
        border-radius: 4px;
      }

      /* ========================================== */
      /* ACTION BUTTONS IN TABLE */
      /* ========================================== */
      .table tbody td .btn {
        margin-right: 0.5rem;
      }

      .table tbody td .btn:last-child {
        margin-right: 0;
      }

      .table tbody td .btn svg {
        transition: transform 0.3s ease;
      }

      .table tbody td .btn:hover svg {
        transform: scale(1.2);
      }

      /* ========================================== */
      /* RESPONSIVE */
      /* ========================================== */
      @media (max-width: 768px) {
        .page-header-section {
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
        }

        .pagination-container {
          flex-direction: column;
          gap: 1rem;
        }

        .table {
          font-size: 13px;
        }
      }

      /* ========================================== */
      /* UTILITY ANIMATIONS */
      /* ========================================== */
      .text-muted {
        color: #6B7280;
      }

      .text-center {
        text-align: center;
      }

      .text-danger {
        color: #EF4444;
      }

      strong {
        font-weight: 600;
        color: #1F2937;
      }

      .small {
        font-size: 13px;
        color: #9CA3AF;
      }
    </style>

    <div class="monitoring-usulan-page">
      <!-- Header Section -->
      <div class="page-header-section">
        <div>
          <h2 class="text-4xl font-bold text-gray-800">Monitoring Usulan</h2>
          <p class="text-lg text-gray-600">Kelola dan pantau status usulan kegiatan Anda</p>
        </div>
        <button class="btn-ajukan-usulan" id="btnAjukanUsulan">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Ajukan Usulan
        </button>
      </div>
      
      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Tanggal Diajukan</th>
              <th>Tanggal Disetujui</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="monitoringTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="pagination-container">
          <div class="pagination-info">
            Showing <span id="startEntry">1</span> to <span id="endEntry">10</span> of <span id="totalEntries">0</span> entries
          </div>
          <ul class="pagination" id="paginationList">
            <!-- Will be populated by JavaScript -->
          </ul>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // STATE
  // ==============================================
  let state = {
    activities: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalEntries: 0,
    totalPages: 1,
  };

  // ==============================================
  // API FUNCTIONS
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
      if (data.success !== true) {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  async function fetchKak() {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) return;
    
    // Show loading skeleton
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 2rem;">
          <div class="skeleton" style="height: 20px; margin: 0.5rem 0;"></div>
          <div class="skeleton" style="height: 20px; margin: 0.5rem 0;"></div>
          <div class="skeleton" style="height: 20px; margin: 0.5rem 0;"></div>
        </td>
      </tr>
    `;

    let url = `/kak?status=1,2,5`;
    if (state.searchQuery) {
      url += `&search=${state.searchQuery}`;
    }

    try {
      const response = await apiRequest(url);
      state.activities = response.data;
      state.totalEntries = state.activities.length;
      state.totalPages = Math.ceil(state.totalEntries / state.itemsPerPage);
      renderTableRows(state.activities);
      updatePagination();
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error: ${error.message}</td></tr>`;
    }
  }

  async function submitForVerification(id) {
    // SweetAlert2 confirmation (replace native confirm)
    const confirmed = await confirmAction(
      "Ajukan untuk Verifikasi?",
      "Apakah Anda yakin ingin mengajukan usulan ini untuk verifikasi?"
    );

    if (!confirmed) return;

    const btn = document.querySelector(`.btn-ajukan[data-id='${id}']`);
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin" style="width: 20px; height: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      `;
    }

    try {
      await apiRequest(`/kak/${id}/submit`, { method: "POST" });

      // SweetAlert2 success modal
      showSuccess("Usulan berhasil diajukan.");

      fetchKak(); // Refresh data
    } catch (error) {
      console.error("Submission Error:", error);

      // SweetAlert2 error modal
      showError(`Gagal mengajukan usulan: ${error.message}`);

      if (btn) {
        btn.disabled = false;
        btn.innerHTML = "Ajukan";
      }
    }
  }

  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================
  function formatDate(dateString) {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  function getStatusBadge(statusId) {
    const statusMap = {
      1: { class: "bg-label-dark", text: "Draft" },
      2: { class: "bg-label-warning", text: "Diajukan" },
      3: { class: "bg-label-success", text: "Disetujui" },
      4: { class: "bg-label-danger", text: "Ditolak" },
      5: { class: "bg-label-info", text: "Revisi" },
      Default: { class: "bg-label-dark", text: "Tidak Diketahui" },
    };
    return statusMap[statusId] || statusMap["Default"];
  }

  function getActionButtons(statusId, id) {
    switch (statusId) {
      case 1: // Draft
      case 5: // Revisi
        return `
          <button class="btn btn-sm btn-primary me-2 btn-ajukan" data-id="${id}" title="Ajukan untuk Verifikasi">
            ${statusId === 1 ? "Ajukan" : "Ajukan Ulang"}
          </button>
          <button class="btn btn-sm btn-edit-profile me-2" data-id="${id}" data-status="${statusId}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button class="btn btn-sm btn-delete" data-id="${id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        `;
      case 4: // Ditolak
        return `
          <button class="btn btn-sm btn-edit-profile me-2" data-id="${id}" data-status="${statusId}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button class="btn btn-sm btn-delete" data-id="${id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        `;
      case 3: // Disetujui
        return `
          <button class="btn btn-sm btn-download" data-id="${id}" title="Download KAK">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            Download KAK
          </button>
        `;
      default:
        return `<span class="text-muted">No actions available</span>`;
    }
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows(data) {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) return;

    if (data.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 3rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 1rem; display: block;">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p style="color: #9CA3AF; font-size: 16px; margin: 0;">Tidak ada data usulan.</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = "";

    const paginatedData = data.slice(
      (state.currentPage - 1) * state.itemsPerPage,
      state.currentPage * state.itemsPerPage
    );

    paginatedData.forEach((activity, index) => {
      const statusId = activity.status_id;
      const statusBadge = getStatusBadge(statusId);
      const actionButtons = getActionButtons(statusId, activity.kak_id);

      const row = document.createElement("tr");
      row.style.animationDelay = `${0.3 + index * 0.1}s`;
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${activity.kak_id}</span>
        </td>
        <td>
          <strong>${activity.nama_kegiatan || "Tanpa Judul"}</strong>
          <div class="small">${activity.pengusul_nama || "Tanpa Pengusul"}</div>
        </td>
        <td>
          <div>${formatDate(activity.created_at)}</div>
        </td>
        <td>
          <div>${formatDate(activity.updated_at)}</div>
        </td>
        <td style="text-align: center;">
          <span class="badge ${statusBadge.class}">${statusBadge.text}</span>
        </td>
        <td style="text-align: center;">
          ${actionButtons}
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
    // Button Ajukan Usulan
    const btnAjukanUsulan = document.getElementById("btnAjukanUsulan");
    if (btnAjukanUsulan) {
      btnAjukanUsulan.addEventListener("click", function () {
        addRippleEffect(this, event);
        setTimeout(() => {
          window.location.pathname = "/pengusul/usulan/new";
        }, 300);
      });
    }
    
    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        document
          .querySelectorAll(".row-checkbox")
          .forEach((cb) => (cb.checked = this.checked));
      });
    }

    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelectAll);
    });

    document.querySelectorAll(".btn-ajukan").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        addRippleEffect(this, e);
        const id = this.getAttribute("data-id");
        submitForVerification(id);
      });
    });

    document.querySelectorAll(".btn-edit-profile").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        addRippleEffect(this, e);
        const id = this.getAttribute("data-id");
        const status = this.getAttribute("data-status");

        setTimeout(() => {
          if (status === "5") {
            window.location.href = `/pengusul/usulan/revisi/${id}`;
          } else {
            window.location.pathname = `/pengusul/usulan/${id}`;
          }
        }, 300);
      });
    });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async function (e) {
        addRippleEffect(this, e);
        const activityId = this.getAttribute("data-id");

        const confirmed = await confirmAction(
          "Yakin ingin menghapus?",
          `Kegiatan dengan ID ${activityId} akan dihapus secara permanen.`
        );

        if (confirmed) {
          try {
            await apiRequest(`/kak/${activityId}`, { method: "DELETE" });
            showSuccess(`Berhasil menghapus kegiatan ID: ${activityId}`);
            fetchKak();
          } catch (error) {
            showError(`Gagal menghapus kegiatan: ${error.message}`);
          }
        }
      });
    });

    document.querySelectorAll(".btn-download").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        addRippleEffect(this, e);
        const id = this.getAttribute("data-id");
        showNotification("Mengunduh KAK...");
        setTimeout(() => {
          window.open(`/api/kak/${id}`, "_blank");
        }, 300);
      });
    });

    setupPagination();
  }

  function updateSelectAll() {
    const allCheckboxes = document.querySelectorAll(".row-checkbox");
    const checkedCount = document.querySelectorAll(".row-checkbox:checked").length;
    const selectAll = document.getElementById("selectAll");

    if (selectAll) {
      selectAll.checked = checkedCount > 0 && checkedCount === allCheckboxes.length;
      selectAll.indeterminate = checkedCount > 0 && checkedCount < allCheckboxes.length;
    }
  }

  // ==============================================
  // ANIMATION FUNCTIONS
  // ==============================================
  function addRippleEffect(element, event) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      left: ${x}px;
      top: ${y}px;
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    const colors = {
      info: "linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%)",
      success: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      error: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    };

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideInRight 0.5s ease-out;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
    `;

    const icon = type === "success" 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
      : type === "error"
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';

    notification.innerHTML = icon + '<span>' + message + '</span>';
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideInRight 0.5s ease-out reverse";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // ==============================================
  // PAGINATION
  // ==============================================
  function setupPagination() {
    const paginationContainer = document.getElementById("paginationList");
    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    // Previous buttons
    paginationContainer.innerHTML += `
      <li class="page-item ${state.currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnFirstPage">«</a>
      </li>
      <li class="page-item ${state.currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnPrevPage">‹</a>
      </li>
    `;

    // Page number buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, state.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(state.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationContainer.innerHTML += `
        <li class="page-item ${i === state.currentPage ? "active" : ""}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    // Next buttons
    paginationContainer.innerHTML += `
      <li class="page-item ${state.currentPage === state.totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnNextPage">›</a>
      </li>
      <li class="page-item ${state.currentPage === state.totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnLastPage">»</a>
      </li>
    `;

    // Attach events
    document.querySelectorAll(".pagination .page-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");
        if (page) {
          changePage(parseInt(page));
        }
      });
    });

    const btnFirstPage = document.getElementById("btnFirstPage");
    const btnPrevPage = document.getElementById("btnPrevPage");
    const btnNextPage = document.getElementById("btnNextPage");
    const btnLastPage = document.getElementById("btnLastPage");

    if (btnFirstPage)
      btnFirstPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage > 1) changePage(1);
      });
    if (btnPrevPage)
      btnPrevPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage > 1) changePage(state.currentPage - 1);
      });
    if (btnNextPage)
      btnNextPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage < state.totalPages) changePage(state.currentPage + 1);
      });
    if (btnLastPage)
      btnLastPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage < state.totalPages) changePage(state.totalPages);
      });
  }

  function changePage(page) {
    if (page < 1 || page > state.totalPages) return;
    state.currentPage = page;
    
    // Smooth scroll to top of table
    document.querySelector(".card-datatable")?.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
    
    renderTableRows(state.activities);
    updatePagination();
  }

  function updatePagination() {
    const startEntry = (state.currentPage - 1) * state.itemsPerPage + 1;
    const endEntry = Math.min(state.currentPage * state.itemsPerPage, state.totalEntries);

    document.getElementById("startEntry").textContent = state.totalEntries > 0 ? startEntry : 0;
    document.getElementById("endEntry").textContent = endEntry;
    document.getElementById("totalEntries").textContent = state.totalEntries;

    setupPagination();
  }

  // ==============================================
  // PLACEHOLDER FUNCTIONS (IF NOT IN GLOBAL SCOPE)
  // ==============================================
  async function confirmAction(title, message) {
    // If SweetAlert2 is available
    if (typeof Swal !== 'undefined') {
      const result = await Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0fb4caff',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Ya, Lanjutkan',
        cancelButtonText: 'Batal'
      });
      return result.isConfirmed;
    }
    // Fallback to native confirm
    return confirm(`${title}\n${message}`);
  }

  function showSuccess(message) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: message,
        confirmButtonColor: '#0fb4caff'
      });
    } else {
      showNotification(message, 'success');
    }
  }

  function showError(message) {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: message,
        confirmButtonColor: '#0fb4caff'
      });
    } else {
      showNotification(message, 'error');
    }
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  
  // Add animate-spin keyframe
  const style = document.createElement("style");
  style.textContent = `
    @keyframes animate-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: animate-spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);

  // Initialize
  fetchKak();

  if (window.Helpers) {
    window.Helpers.init();
  }
}