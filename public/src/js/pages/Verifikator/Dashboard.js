// frontend/src/pages/verifikator/DashboardVerifikator.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderDashboardVerifikator(path, userRole) {
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
      /* Navbar, Footer, Menu tetap solid */
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
      
      /* 3. Stat Cards (Efek Kaca/Glassmorphism) */
      .stat-card-active {
        transition: all 0.4s ease;
        background: linear-gradient(135deg, #4dd0e1 0%, #00bcd4 100%) !important;
        color: #FFFFFF !important;
        backdrop-filter: blur(10px);
        border: 2px solid transparent !important;
      }
      .stat-card-active h1, .stat-card-active h4, .stat-card-active span, .stat-card-active small {
        color: #FFFFFF !important;
      }
      
      .stat-card-active:hover {
        transition: all 0.4s ease;
        transform: translateY(-5px);
      }
      
      .stat-card-inactive {
        transition: all 0.4s ease;
        background: rgba(255, 255, 255, 0.6) !important;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(224, 247, 250, 0.6) !important;
        color: #00bcd4 !important;
      }
      .stat-card-inactive h1, .stat-card-inactive h4, .stat-card-inactive span, .stat-card-inactive small {
        color: #00bcd4 !important;
      }

      .stat-card-inactive:hover {
        transition: all 0.4s ease;
        transform: translateY(-5px);
      }

      /* 4. Table Styling (Card Rows + Efek Kaca) */
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
      
      /* 5. Custom Checkbox */
      .form-check-input {
        border-radius: 6px !important;
        border: 2px solid #D1D5DB !important;
      }
      .form-check-input:checked {
        background-color: #33C8DA !important;
        border-color: #33C8DA !important;
      }
      
      /* 6. Aksi Buttons */
      .btn-revisi {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important; 
        color: white !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
      }
      .btn-delete {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important; 
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3) !important;
        color: white !important;
      }
      
      /* 7. Icon Styling */
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
      
      /* 8. Container */
      .container-xxl {
        max-width: 96% !important;
      }

      .nav-item i.ti {
        font-size: 24px !important;
      }

      .btn-primary {
        background: #00bcd4 !important;
        color: white !important;
      }

      .btn-primary:hover {
        background: #0097A7 !important;
      }

      /* 9. Pagination Styling */
      .pagination .page-item.active .page-link {
        background: #00BCD4 !important;
        border-color: #00BCD4 !important;
        color: white !important;
      }
      .pagination .page-link {
        color: #6B7280 !important;
        border: 1px solid #E5E7EB !important;
        border-radius: 6px !important;
        margin: 0 4px !important;
        padding: 8px 14px !important;
      }
      .pagination .page-link:hover {
        background: #E0F7FA !important;
        color: #00BCD4 !important;
      }
      .pagination .page-item.disabled .page-link {
        background: #F9FAFB !important;
        color: #D1D5DB !important;
      }

      /* 10. Badge Colors */
      .badge.bg-warning {
        background: #FEF3C7 !important;
        color: #92400E !important;
      }
      .badge.bg-info {
        background: #DBEAFE !important;
        color: #1E40AF !important;
      }
      .badge.bg-success {
        background: #D1FAE5 !important;
        color: #065F46 !important;
      }
    </style>

    <div class="monitoring-usulan-page">
        <div class="row g-4 mb-4">
            <div class="col-sm-6 col-xl-6">
                <div class="card stat-card-active">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                    <div class="content-left">
                        <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Usulan</span>
                        <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Menunggu</h4>
                        <div class="d-flex align-items-end mt-2">
                        <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="menungguCount">0</h1>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-6">
                <div class="card stat-card-inactive">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                    <div class="content-left">
                        <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Usulan</span>
                        <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Revisi</h4>
                        <div class="d-flex align-items-end mt-2">
                        <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="revisiCount">0</h1>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <div class="card card-datatable table-responsive p-0">
            <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
                <thead>
                <tr>
                    <th style="width: 50px; text-align: center;">
                    <input type="checkbox" class="form-check-input" id="selectAll">
                    </th>
                    <th style="width: 80px;">No.</th>
                    <th>Nama Usulan Kegiatan</th>
                    <th>Pengusul</th>
                    <th>Tanggal Diajukan</th>
                    <th style="text-align: center;">Status</th>
                    <th style="text-align: center;">Aksi</th>
                </tr>
                </thead>
                <tbody id="usulanTableBody">
                </tbody>
            </table>
            <div class="d-flex justify-content-between align-items-center px-4 pb-4">
                <div class="text-muted" id="paginationInfo">Showing 1 to 10 of 50 entries</div>
                <nav aria-label="Page navigation">
                    <ul class="pagination mb-0" id="pagination">
                    </ul>
                </nav>
            </div>
        </div>
    </div>
  `;

  // Render the main layout with the page-specific content
  renderDashboardLayout(pageContent, userRole);

  // --- All the page-specific JavaScript logic goes here ---

  // ==============================================
  // STATE
  // ==============================================
  let state = {
    allUsulan: [], // Holds all data from API
    displayUsulan: [], // Holds data to be displayed in the table (e.g., filtered by status)
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  };

  let revisiModalInstance = null;

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
      if (data.status === false || data.status === "error") {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  // ==============================================
  // DATA HANDLING
  // ==============================================
  async function initializeDashboard() {
    const tbody = document.getElementById("usulanTableBody");
    if (tbody) {
      tbody.innerHTML = window.createTableLoadingRow ? window.createTableLoadingRow(7, 'Memuat data verifikasi...') : '<tr><td colspan="7" style="text-align: center;">Loading...</td></tr>';
    }

    try {
      // 1. Get User Profile first
      const profileResponse = await apiRequest('/auth/profile');
      const user = profileResponse.data; // Corrected: data is the user object
      const username = user.username;

      // 2. Fetch all relevant data at once
      const response = await apiRequest(`/kak`);
      let allUsulan = response.data || [];

      // 3. Filter based on username (verifikator1 -> tipe_kegiatan_id 1, etc.)
      const verifMatch = username.match(/^verifikator(\d+)$/);
      if (verifMatch) {
        const typeId = parseInt(verifMatch[1]);
        if (typeId >= 1 && typeId <= 4) {
          allUsulan = allUsulan.filter((u) => u.tipe_kegiatan_id == typeId);
        }
      }

      state.allUsulan = allUsulan;
      console.log(
        "All proposals from API (Filtered):",
        JSON.stringify(state.allUsulan, null, 2)
      );

      updateStats();

      // Set default view to 'Menunggu Verifikasi'
      filterAndDisplayUsulan(2);
    } catch (error) {
      console.error("Failed to initialize dashboard:", error);
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red;">Error loading data: ${error.message}</td></tr>`;
      }
    }
  }

  function filterAndDisplayUsulan(statusId) {
    state.displayUsulan = state.allUsulan.filter(
      (u) => u.status_id == statusId
    );
    state.totalItems = state.displayUsulan.length;
    state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
    state.currentPage = 1; // Reset to first page

    renderTableRows();
    renderPagination();
  }

  // ==============================================
  // ACTIONS
  // ==============================================
  async function handleAction(kakId, actionType, payload = {}) {
    // Custom confirmation messages
    const messages = {
      approve: "Anda yakin ingin menyetujui usulan ini?",
      revise: "Anda yakin ingin mengirim revisi untuk usulan ini?",
      reject: "Anda yakin ingin menolak usulan ini?",
    };

    // --- Step 1: SweetAlert2 confirmation ---
    const confirmResult = await Swal.fire({
      title: messages[actionType] || "Anda yakin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    // --- Step 2: Execute POST request ---
    try {
      await apiRequest(`/kak/${kakId}/${actionType}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // --- Step 3: SweetAlert2 success ---
      showSuccess(`Usulan berhasil di-${actionType}!`);

      initializeDashboard(); // Refresh UI
    } catch (error) {
      console.error(`Gagal ${actionType} usulan:`, error);

      // --- Step 4: SweetAlert2 error ---
      showError(`Gagal ${actionType} usulan: ${error.message}`);
    }
  }

  async function handlePdfAction(kakId, action) {
    const actionTitle = action === 'preview' ? 'Membuka Pratinjau PDF...' : 'Mengunduh PDF...';
    const errorMessage = action === 'preview' ? 'Gagal membuka pratinjau PDF' : 'Gagal mengunduh PDF';
  
    Swal.fire({
      title: actionTitle,
      text: "Membuat token sementara...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  
    try {
      // Step 1: Generate token
      const tokenResponse = await apiRequest(`/kak/${kakId}/generate-download-token`, {
        method: 'POST',
      });
  
      if (!tokenResponse.success) {
        throw new Error(tokenResponse.message || 'Gagal membuat token');
      }
  
      const tempToken = tokenResponse.data.download_token;
  
      // Step 2: Build URL and open/download
      const url = action === 'preview'
        ? `/api/kak/${kakId}/preview?t=${tempToken}`
        : `/api/kak/${kakId}?t=${tempToken}`;
  
      Swal.close();
      
      setTimeout(() => {
        window.open(url, '_blank');
      }, 300);
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: errorMessage,
        text: error.message,
      });
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
      1: { class: "bg-label-secondary", text: "Draf" },
      2: { class: "bg-label-warning", text: "Diajukan" },
      3: { class: "bg-label-success", text: "Disetujui" },
      4: { class: "bg-label-danger", text: "Ditolak" },
      5: { class: "bg-label-info", text: "Revisi" },
    };
    return (
      statusMap[statusId] || { class: "bg-label-dark", text: "Tidak Diketahui" }
    );
  }

  function getActionButtons(statusId, kakId) {
    switch (statusId) {
      case 2: // Menunggu Verifikasi
        return `
          <button class="btn btn-sm me-2 btn-approve" data-id="${kakId}" title="Setujui" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; border: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
          </button>
          <button class="btn btn-sm me-2 btn-revise" data-id="${kakId}" title="Revisi" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; border: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
          </button>
          <button class="btn btn-sm me-2 btn-reject" data-id="${kakId}" title="Tolak" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
          <button class="btn btn-sm me-2 btn-preview-pdf" data-kak-id="${kakId}" title="Lihat PDF" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; border: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" /><path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /><path d="M18.5 19.5l2.5 2.5" /></svg>
          </button>
          <button class="btn btn-sm btn-download-pdf" data-kak-id="${kakId}" title="Download PDF" style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; border: none;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
          </button>
        `;
      default:
        return `<span class="text-muted">Tidak ada aksi</span>`;
    }
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows() {
    const tbody = document.getElementById("usulanTableBody");
    if (!tbody) return;

    if (state.displayUsulan.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="7" style="text-align: center;">Tidak ada usulan yang menunggu verifikasi.</td></tr>';
      return;
    }

    tbody.innerHTML = "";

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedData = state.displayUsulan.slice(
      startIndex,
      startIndex + state.itemsPerPage
    );

    paginatedData.forEach((usulan, index) => {
      const statusBadge = getStatusBadge(usulan.status_id);
      const actionButtons = getActionButtons(usulan.status_id, usulan.kak_id);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox" data-id="${
            usulan.kak_id
          }">
        </td>
        <td>
          <span style="font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 0.5rem 0.75rem; border-radius: 8px; background: #FFFFFF; color: #374151;">${
            startIndex + index + 1
          }</span>
        </td>
        <td><strong>${usulan.nama_kegiatan || "Tanpa Judul"}</strong></td>
        <td><strong>${usulan.pengusul_nama || "Tanpa Pengusul"}</strong></td>
        <td>${formatDate(usulan.created_at)}</td>
        <td style="text-align: center;">
          <span class="badge ${
            statusBadge.class
          }" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${
        statusBadge.text
      }</span>
        </td>
        <td style="text-align: center;">${actionButtons}</td>
      `;
      tbody.appendChild(row);
    });

    attachEventListeners();
  }

  function renderPagination() {
    const totalPages = state.totalPages;
    const paginationEl = document.getElementById("pagination");
    const paginationInfoEl = document.getElementById("paginationInfo");

    if (!paginationEl || !paginationInfoEl) return;

    if (state.totalItems === 0) {
      paginationInfoEl.textContent = "No entries found";
      paginationEl.innerHTML = "";
      return;
    }

    paginationEl.innerHTML = "";

    const startItem = (state.currentPage - 1) * state.itemsPerPage + 1;
    const endItem = Math.min(
      state.currentPage * state.itemsPerPage,
      state.totalItems
    );
    paginationInfoEl.textContent = `Showing ${startItem} to ${endItem} of ${state.totalItems} entries`;

    if (totalPages <= 1) return;

    const pageLink = (page, text, disabled = false) => {
      const li = document.createElement("li");
      li.className = `page-item ${state.currentPage === page ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`;
      li.innerHTML = `<a class="page-link" href="#" data-page="${page}">${text}</a>`;
      return li;
    };

    paginationEl.appendChild(
      pageLink(state.currentPage - 1, "‹", state.currentPage === 1)
    );

    for (let i = 1; i <= totalPages; i++) {
      paginationEl.appendChild(pageLink(i, i));
    }

    paginationEl.appendChild(
      pageLink(state.currentPage + 1, "›", state.currentPage === totalPages)
    );

    paginationEl.querySelectorAll(".page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(e.target.getAttribute("data-page"));
        if (
          page &&
          page !== state.currentPage &&
          page > 0 &&
          page <= totalPages
        ) {
          state.currentPage = page;
          renderTableRows();
          renderPagination();
        }
      });
    });
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachEventListeners() {
    document.querySelectorAll(".btn-approve").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const kakId = btn.dataset.id;
        
        // Prompt for Mata Anggaran details
        const { value: formValues } = await Swal.fire({
          title: 'Input Data Mata Anggaran',
          html:
            '<div style="text-align: left;">' +
            '<label for="swal-input1" class="form-label">Kode MAK <span class="text-danger">*</span></label>' +
            '<input id="swal-input1" class="form-control mb-3" placeholder="Contoh: MAK123">' +
            '<label for="swal-input2" class="form-label">Nama Sumber Dana</label>' +
            '<input id="swal-input2" class="form-control mb-3" placeholder="Contoh: APBN">' +
            '<label for="swal-input3" class="form-label">Tahun Anggaran</label>' +
            '<input id="swal-input3" class="form-control mb-3" type="number" placeholder="Contoh: 2025">' +
            '<label for="swal-input4" class="form-label">Total Pagu</label>' +
            '<input id="swal-input4" class="form-control" type="number" step="0.01" placeholder="Contoh: 10000000">' +
            '</div>',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Setujui',
          cancelButtonText: 'Batal',
          confirmButtonColor: '#00BCD4',
          preConfirm: () => {
            const kodeAnggaran = document.getElementById('swal-input1').value;
            if (!kodeAnggaran) {
              Swal.showValidationMessage(`Kode MAK wajib diisi.`);
              return false;
            }
            return {
              kode_anggaran: kodeAnggaran,
              nama_sumber_dana: document.getElementById('swal-input2').value,
              tahun_anggaran: document.getElementById('swal-input3').value,
              total_pagu: document.getElementById('swal-input4').value
            }
          }
        });

        if (formValues) {
          Swal.fire({
            title: 'Menyetujui KAK...',
            text: 'Harap tunggu, sistem sedang memproses persetujuan.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          try {
            await apiRequest(`/kak/${kakId}/approve`, {
              method: "POST",
              body: JSON.stringify(formValues),
            });

            showSuccess(`Usulan berhasil disetujui!`);
            initializeDashboard(); // Refresh UI
          } catch (error) {
            console.error(`Gagal approve usulan:`, error);
            showError(`Gagal approve usulan: ${error.message}`);
          }
        }
      });
    });

    document.querySelectorAll(".btn-revise").forEach((btn) => {
      btn.addEventListener("click", () => {
        const kakId = btn.dataset.id;
        // Redirect to the revision page with the ID
        window.location.href = `/verifikator/revisi/${kakId}`;
      });
    });

    document.querySelectorAll(".btn-reject").forEach((btn) => {
      btn.addEventListener("click", async () => {
        // Step 1: Ask for rejection reason
        const result = await Swal.fire({
          title: "Masukkan Alasan Penolakan",
          input: "textarea",
          inputPlaceholder: "Contoh: Dokumen tidak valid...",
          inputAttributes: {
            maxlength: 500,
            "aria-label": "Catatan Penolakan",
          },
          showCancelButton: true,
          confirmButtonText: "Lanjut",
          cancelButtonText: "Batal",
          confirmButtonColor: "#00BCD4",
        });

        // Cancel pressed
        if (!result.isConfirmed) return;

        const catatan = (result.value || "").trim();

        if (!catatan) {
          showError("Alasan penolakan tidak boleh kosong!");
          return;
        }

        // Step 2: Confirm rejection
        const confirmReject = await Swal.fire({
          title: "Tolak Usulan?",
          text: "Usulan akan ditolak berdasarkan alasan yang Anda berikan.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#00BCD4",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tolak",
          cancelButtonText: "Batal",
        });

        if (!confirmReject.isConfirmed) return;

        // Step 3: Call your backend action
        handleAction(btn.dataset.id, "reject", { catatan });
      });
    });

    // --- PDF BUTTONS ---
    document.querySelectorAll(".btn-preview-pdf").forEach((btn) => {
        btn.addEventListener("click", () =>
        handlePdfAction(btn.dataset.kakId, 'preview')
        );
    });

    document.querySelectorAll(".btn-download-pdf").forEach((btn) => {
        btn.addEventListener("click", () =>
        handlePdfAction(btn.dataset.kakId, 'download')
        );
    });
  }

  // ==============================================
  // MODAL & STATS
  // ==============================================
  function setupModal() {
    if (typeof bootstrap !== "undefined") {
      revisiModalInstance = new bootstrap.Modal(
        document.getElementById("revisiModal")
      );

      const btnKirimRevisi = document.getElementById("btnKirimRevisi");
      btnKirimRevisi.addEventListener("click", async () => {
        const catatan = document.getElementById("revisiCatatan").value.trim();
        const kakId = document.getElementById("revisiUsulanId").value;
        if (!catatan) return alert("Catatan revisi harus diisi!");

        await handleAction(kakId, "revise", {
          catatan_telaah: { deskripsi_kegiatan: catatan },
        }); // Assuming note goes here
        revisiModalInstance.hide();
      });
    } else {
      console.error("Bootstrap 5 JS not found. Modals will not work.");
    }
  }

  function updateStats() {
    const menungguCount = state.allUsulan.filter(
      (u) => u.status_id === 2
    ).length;
    const revisiCount = state.allUsulan.filter((u) => u.status_id === 5).length;

    document.getElementById("menungguCount").textContent = menungguCount;
    document.getElementById("revisiCount").textContent = revisiCount;
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  initializeDashboard();
  setupModal();

  if (window.Helpers) {
    window.Helpers.init();
  }
}
