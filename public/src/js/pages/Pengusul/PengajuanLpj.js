// frontend/src/pages/Pengusul/PengajuanLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderPengajuanLpjPage(path, userRole) {
  const pageContent = `
    <style>
      .countdown-normal { color: #D97706; }
      .countdown-danger { color: #be123c; }
      .table-responsive { overflow-x: auto; }
    </style>

    <div class="pengajuan-lpj-page">
      <!-- Search and Filters -->
      <div class="card-header flex justify-between items-center p-6">
        <div class="w-full md:w-1/3">
          <input type="text" id="searchInput" class="form-control" placeholder="Cari kegiatan...">
        </div>
      </div>

      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
          <thead>
            <tr>
              <th class="text-center" style="width: 50px;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Batas Waktu LPJ</th>
              <th class="text-center">Hitung Mundur</th>
              <th class="text-center">Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody id="lpjTableBody"></tbody>
        </table>
        
        <!-- Pagination -->
        <div class="flex justify-between items-center p-6" id="paginationContainer">
          <div class="text-gray-500 text-sm">
            Showing <span id="startEntry">0</span> to <span id="endEntry">0</span> of <span id="totalEntries">0</span> entries
          </div>
          <ul class="flex list-none gap-2 m-0 p-0" id="pagination-links">
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
      return { text: `Hari Ini (${remainingHours}j ${remainingMinutes}m ${remainingSeconds}d)`, colorClass: 'countdown-danger' };
    } else {
      const overdueDays = Math.abs(diffDays);
      return { text: `Terlambat ${overdueDays} hari`, colorClass: 'countdown-danger' };
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
          <span id="countdown-${item.kegiatan_id}" class="${countdown.colorClass} font-semibold px-2 py-1 rounded-md text-sm">${countdown.text}</span>
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
          countdownSpan.textContent = countdown.text;
          countdownSpan.className = `${countdown.colorClass} font-semibold px-2 py-1 rounded-md text-sm`;
        }
      });
    }, 1000); // Update every second
  }

  function renderPagination() {
    const container = document.getElementById("paginationContainer");
    if (!container) return;

    const { totalItems, itemsPerPage, currentPage, totalPages } = state;
    
    document.getElementById("startEntry").textContent = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    document.getElementById("endEntry").textContent = Math.min(currentPage * itemsPerPage, totalItems);
    document.getElementById("totalEntries").textContent = totalItems;
    
    const paginationLinks = container.querySelector("#pagination-links");
    paginationLinks.innerHTML = "";

    if (totalPages <= 1) return;

    // Previous button
    paginationLinks.innerHTML += `
      <li class="inline-block">
        <a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100 ${currentPage === 1 ? 'disabled' : ''}" href="#" data-page="${currentPage - 1}">‹</a>
      </li>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      paginationLinks.innerHTML += `
        <li class="inline-block">
          <a class="px-3 py-2 border rounded-md no-underline transition-all ${i === currentPage ? 'border-cyan-500 text-white bg-cyan-500' : 'border-gray-200 text-gray-700 hover:bg-gray-100'}" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    // Next button
    paginationLinks.innerHTML += `
      <li class="inline-block">
        <a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100 ${currentPage === totalPages ? 'disabled' : ''}" href="#" data-page="${currentPage + 1}">›</a>
      </li>
    `;

    paginationLinks.querySelectorAll("a[data-page]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        if (link.classList.contains('disabled')) return;
        const page = parseInt(link.dataset.page);
        if (page !== state.currentPage) {
          state.currentPage = page;
          fetchLpjData();
        }
      });
    });
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachActionListeners() {
    document.querySelectorAll("button[title='Upload LPJ']").forEach(btn => {
      btn.addEventListener("click", function() {
        const kegiatanId = this.dataset.id;
        window.location.href = `/pengusul/input-lpj?kegiatan_id=${kegiatanId}`;
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
