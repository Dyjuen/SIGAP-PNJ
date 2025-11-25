// frontend/src/pages/Pengusul/PengajuanLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderPengajuanLpjPage(path, userRole) {
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
      .pengajuan-lpj-page {
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
      /* SEARCH INPUT STYLES */
      /* ========================================== */
      .search-container {
        margin-bottom: 1.5rem;
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.1s;
      }

      .search-container input {
        width: 100%;
        max-width: 400px;
        padding: 0.75rem 1rem;
        border: 2px solid #E5E7EB;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .search-container input:focus {
        outline: none;
        border-color: #00BCD4;
        box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1);
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
        position: relative;
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

      .bg-label-warning {
        background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
        color: white;
      }

      .bg-label-info {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
      }

      .bg-label-danger {
        background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        color: white;
      }

      .bg-label-success {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        color: white;
      }

      .bg-label-secondary {
        background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
        color: white;
      }

      /* ========================================== */
      /* COUNTDOWN STYLES */
      /* ========================================== */
      .countdown-normal {
        color: #D97706;
        font-weight: 600;
        padding: 6px 12px;
        background: rgba(217, 119, 6, 0.1);
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
      }

      .countdown-danger {
        color: #be123c;
        font-weight: 600;
        padding: 6px 12px;
        background: rgba(190, 18, 60, 0.1);
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        animation: pulse 2s ease-in-out infinite;
      }

      /* ========================================== */
      /* BUTTON STYLES */
      /* ========================================== */
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

      .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 13px;
      }

      .bg-cyan-500 {
        background: linear-gradient(135deg, #0fb4caff 0%, #059cd8ff 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(5, 156, 216, 0.3);
      }

      .bg-cyan-500:hover {
        box-shadow: 0 6px 20px rgba(5, 156, 216, 0.4);
      }

      .btn svg {
        transition: transform 0.3s ease;
      }

      .btn:hover svg {
        transform: scale(1.2);
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
      /* UTILITY CLASSES */
      /* ========================================== */
      .text-center { text-align: center; }
      .text-gray-400 { color: #9CA3AF; }
      .text-gray-500 { color: #6B7280; }
      .text-danger { color: #EF4444; }
      
      strong {
        font-weight: 600;
        color: #1F2937;
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
    </style>

    <div class="pengajuan-lpj-page">
      <!-- Header Section -->
      <div class="page-header-section">
        <div>
          <h2 class="text-4xl font-bold text-gray-800">Pengajuan LPJ</h2>
          <p class="text-lg text-gray-600">Kelola dan pantau pengajuan Laporan Pertanggungjawaban</p>
        </div>
      </div>

      <!-- Search Container -->
      <div class="search-container">
        <input type="text" id="searchInput" class="form-control" placeholder="Cari kegiatan...">
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
              <th>Batas Waktu LPJ</th>
              <th style="text-align: center;">Hitung Mundur</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="lpjTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="pagination-container" id="paginationContainer">
          <div class="pagination-info">
            Showing <span id="startEntry">0</span> to <span id="endEntry">0</span> of <span id="totalEntries">0</span> entries
          </div>
          <ul class="pagination" id="pagination-links">
            <!-- Pagination links will be populated by JavaScript -->
          </ul>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // STATE MANAGEMENT
  // ==============================================
  const state = {
    lpjData: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
    searchQuery: "",
    countdownTimers: [],
  };

  // ==============================================
  // API FUNCTIONS
  // ==============================================
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

  async function fetchLpjData() {
    const tbody = document.getElementById("lpjTableBody");
    tbody.innerHTML = `<tr><td colspan="7" class="text-center">Loading...</td></tr>`;

    let url = `/dashboard/lpj?page=${state.currentPage}&per_page=${state.itemsPerPage}`;
    if (state.searchQuery) {
      url += `&search=${encodeURIComponent(state.searchQuery)}`;
    }

    try {
      const response = await apiRequest(url);
      const { data, pagination } = response.data;
      
      state.lpjData = data;
      state.totalItems = pagination.total;
      state.totalPages = pagination.last_page;
      state.currentPage = pagination.current_page;
      
      renderTableRows();
      renderPagination();
      startCountdownTimers(); // Start the countdown timers
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Gagal memuat data LPJ.</td></tr>`;
    }
  }

  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================
  function getStatusBadge(status) {
    const statusMap = {
      'Menunggu Penyerahan': { class: "bg-label-warning", text: "Menunggu" },
      'Diajukan': { class: "bg-label-info", text: "Diajukan" },
      'Direvisi': { class: "bg-label-danger", text: "Revisi" },
      'Selesai': { class: "bg-label-success", text: "Selesai" },
    };
    return statusMap[status] || { class: "bg-label-secondary", text: status };
  }

  function calculateCountdown(deadline) {
    if (!deadline) return { text: '-', colorClass: '' };
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return { text: `${diffDays} hari lagi`, colorClass: 'countdown-normal' };
    } else if (diffDays === 0 && diffHours >= 0 && diffMinutes >= 0 && diffSeconds >= 0) {
      const remainingHours = diffHours % 24;
      const remainingMinutes = diffMinutes % 60;
      const remainingSeconds = diffSeconds % 60;
      const formattedTime = `${String(remainingHours).padStart(2, '0')}j ${String(remainingMinutes).padStart(2, '0')}m ${String(remainingSeconds).padStart(2, '0')}d`;
      return { text: `Hari Ini (${formattedTime})`, colorClass: 'countdown-danger' };
    } else {
      const overdueDays = Math.abs(diffDays);
      const overdueHours = Math.abs(diffHours % 24);
      const overdueMinutes = Math.abs(diffMinutes % 60);
      return { text: `Terlambat ${overdueDays} hari, ${overdueHours}j ${overdueMinutes}m`, colorClass: 'countdown-danger' };
    }
  }

  function getActionButtons(status, id) {
    switch (status) {
      case "Menunggu Penyerahan":
      case "Direvisi":
        return `
          <button class="btn btn-sm bg-cyan-500 text-white shadow-md hover:bg-cyan-600 border-0 px-4 py-2 rounded-md text-sm inline-flex items-center gap-2 transition-all hover:-translate-y-0.5" data-id="${id}" title="Upload LPJ">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload LPJ
          </button>
        `;
      case "Diajukan":
        return `<span class="text-gray-400 text-sm">Diproses</span>`;
      case "Selesai":
        return `<span class="text-gray-400 text-sm">-</span>`;
      default:
        return "";
    }
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows() {
    const tbody = document.getElementById("lpjTableBody");
    if (!tbody) return;

    if (state.lpjData.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center">Tidak ada data LPJ ditemukan.</td></tr>`;
      return;
    }

    tbody.innerHTML = "";
    state.lpjData.forEach((item, index) => {
      const statusBadge = getStatusBadge(item.status_lpj);
      const countdown = calculateCountdown(item.tgl_batas_lpj);
      const actionButtons = getActionButtons(item.status_lpj, item.kegiatan_id);
      const rowNum = (state.currentPage - 1) * state.itemsPerPage + index + 1;
      
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="text-center">
          <input type="checkbox" class="form-check-input row-checkbox" data-id="${item.kegiatan_id}">
        </td>
        <td>
          <span class="number-badge">${rowNum}</span>
        </td>
        <td>
          <strong>${item.nama_kegiatan}</strong>
          <div class="text-gray-500 text-sm">${item.pengusul_nama}</div>
        </td>
        <td>
          <div>${item.tgl_batas_lpj ? new Date(item.tgl_batas_lpj).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : "-"}</div>
        </td>
        <td class="text-center">
          <span id="countdown-${item.kegiatan_id}" class="${countdown.colorClass} font-semibold px-2 py-1 rounded-md text-sm">
            <i class="bx bx-time me-1"></i>${countdown.text}
          </span>
        </td>
        <td class="text-center">
          <span class="badge ${statusBadge.class}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${statusBadge.text}</span>
        </td>
        <td class="text-center">${actionButtons}</td>
      `;
      tbody.appendChild(row);
    });

    attachActionListeners();
  }

  // ==============================================
  // COUNTDOWN TIMER
  // ==============================================
  function startCountdownTimers() {
    // Clear any existing interval to prevent multiple timers running
    if (state.countdownInterval) {
      clearInterval(state.countdownInterval);
    }

    state.countdownInterval = setInterval(() => {
      state.lpjData.forEach((item) => {
        const countdownSpan = document.getElementById(`countdown-${item.kegiatan_id}`);
        if (countdownSpan) {
          const countdown = calculateCountdown(item.tgl_batas_lpj);
          countdownSpan.innerHTML = `<i class="bx bx-time me-1"></i>${countdown.text}`;
          countdownSpan.className = `${countdown.colorClass} font-semibold px-2 py-1 rounded-md text-sm`;
        }
      });
    }, 1000); // Update every second
  }

  function renderPagination() {
    const paginationContainer = document.getElementById("pagination-links");
    if (!paginationContainer) return;

    const { totalItems, itemsPerPage, currentPage, totalPages } = state;
    
    document.getElementById("startEntry").textContent = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    document.getElementById("endEntry").textContent = Math.min(currentPage * itemsPerPage, totalItems);
    document.getElementById("totalEntries").textContent = totalItems;

    paginationContainer.innerHTML = "";

    if (totalPages <= 1) return;

    // Previous buttons
    paginationContainer.innerHTML += `
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnFirstPage">«</a>
      </li>
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnPrevPage">‹</a>
      </li>
    `;

    // Page number buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationContainer.innerHTML += `
        <li class="page-item ${i === currentPage ? "active" : ""}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    // Next buttons
    paginationContainer.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnNextPage">›</a>
      </li>
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <a class="page-link" href="#" id="btnLastPage">»</a>
      </li>
    `;

    // Attach events
    document.querySelectorAll(".pagination .page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (!isNaN(page)) {
          changePage(page);
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
        changePage(1);
      });
    if (btnPrevPage)
      btnPrevPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(currentPage - 1);
      });
    if (btnNextPage)
      btnNextPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(currentPage + 1);
      });
    if (btnLastPage)
      btnLastPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(totalPages);
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
    
    fetchLpjData();
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachActionListeners() {
    document.querySelectorAll("button[title='Upload LPJ']").forEach(btn => {
      btn.addEventListener("click", function() {
        const kegiatanId = this.dataset.id;
        window.location.href = `/pengusul/kegiatan/lpj/new?kegiatan_id=${kegiatanId}`;
      });
    });
  }

  function attachEventListeners() {
    const searchInput = document.getElementById("searchInput");
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value;
        state.currentPage = 1; // Reset to first page on new search
        fetchLpjData();
      }, 500); // Debounce search
    });
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  fetchLpjData();
  attachEventListeners();
  
  if (window.Helpers) {
    window.Helpers.init();
  }
}
