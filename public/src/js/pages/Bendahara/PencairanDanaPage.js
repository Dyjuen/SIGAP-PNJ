// frontend/src/pages/bendahara/PencairanDanaPage.js

import { renderDashboardLayout } from '../../layout/AppLayout.js';

export function renderPencairanDanaPage(path, userRole) {

  const pageContent = `
    <style>
      /* --- Custom CSS for Pencairan Dana Page --- */
      
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

      /* 2. Sidebar - Make sure active menu item is highlighted */
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
      
      /* 3. Stat Cards - Cyan/Turquoise Theme */
      .stat-card {
        transition: all 0.4s ease;
        border-radius: 1rem !important;
        border: none !important;
        overflow: hidden;
        height: 100%;
      }
      
      .stat-card-primary {
        background: linear-gradient(135deg, #4dd0e1 0%, #00bcd4 100%) !important;
        color: #FFFFFF !important;
        backdrop-filter: blur(10px);
      }
      .stat-card-primary h1, .stat-card-primary h4, .stat-card-primary span, .stat-card-primary small {
        color: #FFFFFF !important;
      }
      
      .stat-card-secondary {
        background: rgba(255, 255, 255, 0.7) !important;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(224, 247, 250, 0.6) !important;
        color: #00bcd4 !important;
      }
      .stat-card-secondary h1, .stat-card-secondary h4, .stat-card-secondary span, .stat-card-secondary small {
        color: #00bcd4 !important;
      }
      
      .stat-card-tertiary {
        background: rgba(255, 255, 255, 0.7) !important;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(224, 247, 250, 0.6) !important;
        color: #00bcd4 !important;
      }
      .stat-card-tertiary h1, .stat-card-tertiary h4, .stat-card-tertiary span, .stat-card-tertiary small {
        color: #00bcd4 !important;
      }

      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 188, 212, 0.15) !important;
      }

      /* 4. Table Card with Glassmorphism */
      .card-datatable {
        background: rgba(255, 255, 255, 0.7) !important;
        backdrop-filter: blur(15px);
        border-radius: 1rem !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
        padding: 1.5rem;
        border: none !important;
      }
      
      /* 5. Table Styling */
      .table {
        border-collapse: separate !important;
        border-spacing: 0 0.75rem !important;
      }
      .table thead {
        background: transparent !important;
      }
      .table thead th {
        color: #6B7280 !important;
        font-weight: 600 !important;
        background: transparent !important;
        border: none !important;
        text-transform: uppercase !important;
        font-size: 11px !important;
        letter-spacing: 0.5px !important;
        padding-top: 0 !important;
        padding-bottom: 1rem !important;
      }
      
      /* Table Row Cards */
      .table tbody tr {
        background: #FFFFFF !important;
        border-radius: 12px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        transition: all 0.3s ease;
      }
      .table tbody tr:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 16px rgba(0, 188, 212, 0.12) !important;
      }
      .table tbody tr.row-active {
        background: linear-gradient(135deg, rgba(77, 208, 225, 0.15) 0%, rgba(0, 188, 212, 0.1) 100%) !important;
        border-left: 4px solid #00BCD4 !important;
      }
      
      .table tbody td {
        border: none !important;
        padding: 1.25rem 1rem !important;
        vertical-align: middle;
      }
      .table tbody td:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
        padding-left: 1.5rem !important;
      }
      .table tbody td:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        padding-right: 1.5rem !important;
      }
      
      /* 6. Number Badge */
      .number-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: #FFFFFF;
        border-radius: 10px;
        font-weight: 700;
        font-size: 15px;
        color: #374151;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      
      /* 7. Activity Title Styling */
      .activity-title {
        font-weight: 700;
        font-size: 15px;
        color: #111827;
        margin-bottom: 4px;
      }
      .activity-subtitle {
        font-size: 13px;
        color: #6B7280;
        font-weight: 500;
      }
      
      /* 8. Status Badges */
      .badge {
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.3px;
        display: inline-block;
        min-width: 90px;
        text-align: center;
      }
      .badge-menunggu {
        background: #FEF3C7 !important;
        color: #92400E !important;
      }
      .badge-disetujui {
        background: #D1FAE5 !important;
        color: #065F46 !important;
      }
      .badge-ditolak {
        background: #FEE2E2 !important;
        color: #991B1B !important;
      }
      
      /* 9. Action Buttons */
      .btn-action {
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 13px;
        border: none;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      
      .btn-cairkan {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
        color: white !important;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3) !important;
      }
      .btn-cairkan:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4) !important;
      }
      
      .btn-selesai {
        background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%) !important;
        color: white !important;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3) !important;
      }
      .btn-selesai:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 188, 212, 0.4) !important;
      }
      
      /* 10. Pagination */
      .pagination {
        margin-top: 1.5rem;
        gap: 0.5rem;
      }
      .page-link {
        border: none;
        background: rgba(255, 255, 255, 0.8);
        color: #6B7280;
        font-weight: 600;
        border-radius: 8px;
        padding: 10px 16px;
        min-width: 40px;
        text-align: center;
        transition: all 0.3s ease;
      }
      .page-link:hover {
        background: rgba(0, 188, 212, 0.1);
        color: #00BCD4;
      }
      .page-item.active .page-link {
        background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.3);
      }
      
      /* 11. Custom Checkbox */
      .form-check-input {
        border-radius: 6px !important;
        border: 2px solid #D1D5DB !important;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
      .form-check-input:checked {
        background-color: #00BCD4 !important;
        border-color: #00BCD4 !important;
      }
      
      /* 12. Showing entries text */
      .entries-info {
        color: #6B7280;
        font-size: 14px;
        font-weight: 500;
      }
      
      /* 13. Icons */
      i.ti {
        background: none !important;
        display: inline-block;
        color: inherit !important;
        font-style: normal !important;
        font-size: 18px !important;
      }
      
      /* 14. Container adjustments */
      .container-xxl {
        max-width: 96% !important;
      }

      /* 15. Menu icons consistency */
      .menu-icon i.ti {
        font-size: 24px !important;
      }

      /* 16. Search bar styles */
      .search-section {
        margin-bottom: 1.5rem;
        opacity: 0;
        animation: slideInLeft 0.6s ease-out forwards;
        animation-delay: 0.1s;
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

      .search-container {
        position: relative;
        max-width: 500px;
      }

      .search-input {
        width: 100%;
        padding: 0.875rem 1rem 0.875rem 3rem;
        border: 2px solid #E5E7EB;
        border-radius: 10px;
        font-size: 14px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }

      .search-input:focus {
        outline: none;
        border-color: #00BCD4;
        box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.1);
      }

      .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: #9CA3AF;
        pointer-events: none;
        transition: color 0.3s ease;
      }

      .search-input:focus + .search-icon {
        color: #00BCD4;
      }

      .clear-search {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #9CA3AF;
        cursor: pointer;
        padding: 0.25rem;
        display: none;
        transition: color 0.3s ease;
      }

      .clear-search:hover {
        color: #EF4444;
      }

      .clear-search.visible {
        display: block;
      }
    </style>

    <div class="pencairan-dana-page">

      <!-- Search Section -->
      <div class="search-section">
        <div class="search-container">
          <input 
            type="text" 
            id="searchInput" 
            class="search-input" 
            placeholder="Cari nama kegiatan, pelaksana, atau PJ..."
          />
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <button class="clear-search" id="clearSearch" title="Clear search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 0.75rem;">
          <thead>
            <tr>
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Pelaksana & PJ</th>
              <th>Tanggal Diajukan</th>
              <th>Catatan Wadir 2</th>
              <th style="text-align: center;">Uang Dicairkan</th>
              <th style="text-align: center;">Uang Diminta</th>
              <th style="text-align: center;">Uang Belum Dicairkan</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="kegiatanTableBody">
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="d-flex justify-content-between align-items-center mt-4">
          <div class="entries-info">
            Showing <span id="showingStart">1</span> to <span id="showingEnd">10</span> of <span id="totalEntries">50</span> entries
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination mb-0" id="paginationContainer"></ul>
          </nav>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // STATE
  // ==============================================
  let state = {
    allKegiatan: [], // All activities fetched
    displayKegiatan: [], // Activities filtered for current approval level
    filteredKegiatan: [], // Filtered by search
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
    searchQuery: '',
    searchTimeout: null,
  };

  // ==============================================
  // API FUNCTIONS
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
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
      throw error;
    }
  }

  async function fetchKegiatan() {
    const tbody = document.getElementById("kegiatanTableBody");
    tbody.innerHTML = window.createTableLoadingRow ? window.createTableLoadingRow(8, 'Memuat data pencairan dana...') : '<tr><td colspan="8" class="text-center">Loading...</td></tr>';
    try {
      const response = await apiRequest("/kegiatan");
      const kegiatanData = response.data.data
        ? response.data.data
        : response.data;
      state.allKegiatan = kegiatanData || [];

      // Filter for activities waiting for Bendahara-Cair approval
      state.displayKegiatan = state.allKegiatan.filter(
        (k) =>
          k.current_approval &&
          k.current_approval.approval_level === "Bendahara-Cair" &&
          k.current_approval.status === "Aktif"
      );

      state.totalItems = state.displayKegiatan.length;
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      state.currentPage = 1; // Reset to first page when new data is fetched

      renderTableRows();
      renderPagination();
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-danger">Error: ${error.message}</td></tr>`;
    }
  }

    async function handleCairkan(kegiatanId) {
    // Step 1 — Ask for nominal using SweetAlert2
    const { value: nominal } = await Swal.fire({
      title: "Masukkan Nominal Pencairan",
      html: `
        <input id="swal-input-nominal" class="swal2-input" placeholder="Masukkan nominal dana..." style="width: 85%; max-width: 100%;">
      `,
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Lanjut",
      cancelButtonText: "Batal",
      didOpen: () => {
        const input = Swal.getPopup().querySelector('#swal-input-nominal');
        if (typeof AutoNumeric !== 'undefined') {
          new AutoNumeric(input, {
            currencySymbol: 'Rp ',
            digitGroupSeparator: '.',
            decimalCharacter: ',',
            decimalPlaces: 0,
            minimumValue: '0'
          });
        } else {
          input.type = 'number';
        }
      },
      preConfirm: () => {
        const input = Swal.getPopup().querySelector('#swal-input-nominal');
        let value;
        if (typeof AutoNumeric !== 'undefined' && AutoNumeric.getAutoNumericElement(input)) {
          value = AutoNumeric.getAutoNumericElement(input).getNumber();
        } else {
          value = input.value;
        }

        if (!value || value <= 0) {
          Swal.showValidationMessage("Nominal tidak valid. Harap masukkan angka positif.");
        }
        return parseFloat(value);
      }
    });

    if (nominal === undefined) return; // Cancelled

    if (isNaN(nominal) || nominal <= 0) {
      showError("Nominal tidak valid. Harap masukkan angka positif.");
      return;
    }

    const kegiatan = state.allKegiatan.find(k => k.kegiatan_id == kegiatanId);
    if (!kegiatan) {
        showError("Kegiatan tidak ditemukan.");
        return;
    }

    const totalDiminta = parseFloat(kegiatan.total_anggaran_diusulkan || 0);
    const sudahDicairkan = parseFloat(kegiatan.dana_dicairkan || 0);
    const sisaDana = totalDiminta - sudahDicairkan;

    if (nominal > sisaDana) {
        showError(`Nominal pencairan (${formatRupiah(nominal)}) melebihi sisa dana yang tersedia (${formatRupiah(sisaDana)}).`);
        return;
    }

    // Step 2 — Confirmation modal
    const confirmResult = await Swal.fire({
      title: "Konfirmasi Pencairan",
      text: `Anda yakin ingin mencairkan Rp ${nominal.toLocaleString("id-ID")} untuk kegiatan ini?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, cairkan",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    // Step 3 — API call
    try {
      await apiRequest(`/kegiatan/${kegiatanId}/cairkan`, {
        method: "POST",
        body: JSON.stringify({ nominal_pencairan: nominal }),
      });

      // Step 4 — Success popup
      showSuccess(`Dana Rp ${nominal.toLocaleString("id-ID")} berhasil dicairkan.`);

      fetchKegiatan(); // Refresh data
    } catch (error) {
      showError(`Gagal mencairkan dana: ${error.message}`);
    }
  }


    async function handleUmSelesai(kegiatanId) {
    // Step 1 — Confirmation modal
    const confirmResult = await Swal.fire({
      title: "Anda yakin ingin menandai UM Selesai?",
      text: "Tindakan ini akan menyelesaikan tahap Bendahara-Cair.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    // Step 2 — Execute the request
    try {
      await apiRequest(`/kegiatan/${kegiatanId}/approve`, {
        method: "POST",
        body: JSON.stringify({ status: "Disetujui" }),
      });

      // Step 3 — Success popup
      showSuccess("Kegiatan berhasil ditandai UM Selesai.");

      fetchKegiatan(); // Refresh table
    } catch (error) {
      // Step 4 — Error popup
      showError(`Gagal menandai UM Selesai: ${error.message}`);
    }
  }


  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function formatRupiah(amount) {
    if (amount === undefined || amount === null) return "Rp 0";
    return (
      "Rp " +
      parseFloat(amount).toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    );
  }

  function formatDate(dateString) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function getStatusBadge(status) {
    switch (status) {
      case "Menunggu Verifikasi":
      case "Dalam Review":
      case "Menunggu":
        return "badge-menunggu";
      case "Disetujui":
        return "badge-disetujui";
      case "Ditolak":
        return "badge-ditolak";
      case "Revisi":
        return "badge-menunggu"; // Revisions might also be "waiting" for action
      default:
        return "badge-menunggu";
    }
  }

  function renderTableRows() {
    const tbody = document.getElementById("kegiatanTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!state.displayKegiatan || state.displayKegiatan.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="9" class="text-center">Tidak ada kegiatan yang menunggu pencairan dana.</td></tr>';
      return;
    }

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const dataToDisplay = state.searchQuery ? state.filteredKegiatan : state.displayKegiatan;
    const paginatedData = dataToDisplay.slice(
      startIndex,
      startIndex + state.itemsPerPage
    );

    paginatedData.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="number-badge">${startIndex + index + 1}</div>
        </td>
        <td>
          <div class="activity-title">${item.nama_kegiatan}</div>
        </td>
        <td>
          <div class="activity-title">${item.pelaksana_manual || "N/A"}</div>
          <div class="activity-subtitle">${item.penanggung_jawab_manual || "N/A"}</div>
        </td>
        <td>
          <span style="font-weight: 600; color: #374151;">${formatDate(
            item.tanggal_diajukan_ppk
          )}</span>
        </td>
        <td>
          <div class="text-wrap" style="max-width: 200px; font-size: 0.9em;">
            ${item.approvals?.find(a => a.approval_level === 'Wadir2')?.catatan || '-'}
          </div>
        </td>
        <td style="text-align: center;">
          ${formatRupiah(item.dana_dicairkan)}
        </td>
        <td style="text-align: center;">
          ${formatRupiah(item.total_anggaran_diusulkan)}
        </td>
        <td style="text-align: center;">
          ${formatRupiah(item.total_anggaran_diusulkan - (item.dana_dicairkan || 0))}
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm btn-action btn-cairkan me-2" data-id="${
            item.kegiatan_id
          }">
            <i class="ti">&#xf4a5;</i> Cairkan
          </button>
          <button class="btn btn-sm btn-action btn-selesai" data-id="${
            item.kegiatan_id
          }">
            <i class="ti">&#xec63;</i> Selesaikan Pencairan
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    attachEventListeners();
  }

  function renderPagination() {
    const paginationEl = document.getElementById("paginationContainer");
    const showingStartEl = document.getElementById("showingStart");
    const showingEndEl = document.getElementById("showingEnd");
    const totalEntriesEl = document.getElementById("totalEntries");

    if (!paginationEl || !showingStartEl || !showingEndEl || !totalEntriesEl)
      return;

    if (state.totalItems === 0) {
      showingStartEl.textContent = 0;
      showingEndEl.textContent = 0;
      totalEntriesEl.textContent = 0;
      paginationEl.innerHTML = "";
      return;
    }

    paginationEl.innerHTML = "";

    const startEntry = (state.currentPage - 1) * state.itemsPerPage + 1;
    const endEntry = Math.min(
      state.currentPage * state.itemsPerPage,
      state.totalItems
    );

    showingStartEl.textContent = startEntry;
    showingEndEl.textContent = endEntry;
    totalEntriesEl.textContent = state.totalItems;

    if (state.totalPages <= 1) return;

    // Previous button
    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${
      state.currentPage === 1 ? "disabled" : ""
    }`;
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous" data-page="prev"><i class="ti">&#xea65;</i></a>`;
    paginationEl.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= state.totalPages; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === state.currentPage ? "active" : ""}`;
      li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
      paginationEl.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${
      state.currentPage === state.totalPages ? "disabled" : ""
    }`;
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next" data-page="next"><i class="ti">&#xea5e;</i></a>`;
    paginationEl.appendChild(nextLi);

    // Event listeners for pagination links
    paginationEl.querySelectorAll(".page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.closest(".page-link").dataset.page;
        let newPage = state.currentPage;

        if (page === "prev") newPage--;
        else if (page === "next") newPage++;
        else newPage = parseInt(page);

        if (
          newPage !== state.currentPage &&
          newPage >= 1 &&
          newPage <= state.totalPages
        ) {
          state.currentPage = newPage;
          renderTableRows();
          renderPagination();
        }
      });
    });
  }

  // ==============================================
  // SEARCH FUNCTIONS
  // ==============================================
  function performSearch(query) {
    state.searchQuery = query.toLowerCase().trim();
    
    if (!state.searchQuery) {
      state.filteredKegiatan = state.displayKegiatan;
    } else {
      state.filteredKegiatan = state.displayKegiatan.filter(item => {
        const namaKegiatan = (item.nama_kegiatan || '').toLowerCase();
        const pelaksana = (item.pelaksana_manual || '').toLowerCase();
        const penanggungJawab = (item.penanggung_jawab_manual || '').toLowerCase();
        return namaKegiatan.includes(state.searchQuery) || 
               pelaksana.includes(state.searchQuery) || 
               penanggungJawab.includes(state.searchQuery);
      });
    }
    
    state.currentPage = 1;
    state.totalItems = state.filteredKegiatan.length;
    state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
    
    renderTableRows();
    renderPagination();
  }

  function debounceSearch(query) {
    if (state.searchTimeout) {
      clearTimeout(state.searchTimeout);
    }
    
    state.searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachEventListeners() {
    // Cairkan buttons
    document.querySelectorAll(".btn-cairkan").forEach((btn) => {
      btn.addEventListener("click", () => handleCairkan(btn.dataset.id));
    });

    // Selesaikan Pencairan buttons
    document.querySelectorAll(".btn-selesai").forEach((btn) => {
      btn.addEventListener("click", () => handleSelesaikanPencairan(btn.dataset.id));
    });
  }

  async function handleSelesaikanPencairan(kegiatanId) {
    // Step 1 — Confirmation modal
    const confirmResult = await Swal.fire({
      title: "Selesaikan Proses Pencairan?",
      text: "Tindakan ini akan mengunci proses pencairan dan memulai tahap LPJ. Pastikan semua dana telah dicairkan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Selesaikan",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    // Step 2 — Show loader and execute the request
    Swal.fire({
      title: "Menyelesaikan Proses Pencairan...",
      text: "Harap tunggu, sistem sedang memproses permintaan Anda.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await apiRequest(`/kegiatan/${kegiatanId}/selesaikan-pencairan`, {
        method: "POST",
      });

      // Step 3 — Success popup
      showSuccess("Proses pencairan selesai. Tahap LPJ telah dimulai.");

      fetchKegiatan(); // Refresh table
    } catch (error) {
      // Step 4 — Error popup
      showError(`Gagal menyelesaikan proses: ${error.message}`);
    }
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  
  // Setup search functionality
  const searchInput = document.getElementById('searchInput');
  const clearSearch = document.getElementById('clearSearch');
  
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value;
      
      if (clearSearch) {
        if (query.length > 0) {
          clearSearch.classList.add('visible');
        } else {
          clearSearch.classList.remove('visible');
        }
      }
      
      debounceSearch(query);
    });
    
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        this.value = '';
        if (clearSearch) {
          clearSearch.classList.remove('visible');
        }
        performSearch('');
      }
    });
  }
  
  if (clearSearch) {
    clearSearch.addEventListener('click', function() {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      this.classList.remove('visible');
      performSearch('');
    });
  }
  
  fetchKegiatan();

  // Initialize Vuexy menu (active state for current page)
  setTimeout(() => {
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
      const link = item.querySelector('a[href="/bendahara/pencairan-dana"]');
      if (link) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }, 100);

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}