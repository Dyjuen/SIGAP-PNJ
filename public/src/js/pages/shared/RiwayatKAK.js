// frontend/src/pages/Pengusul/RiwayatKAK.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderRiwayatKAKPage(path, userRole) {
  const pageContent = `
    <style>
      /* Page container */
      .riwayat-kak-page {
        background-image: url('/assets/img/backgrounds/BG.png');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        min-height: 100vh;
        padding: 2rem;
        animation: pageEntrance 0.6s ease-out;
      }

      @keyframes pageEntrance {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Info banner */
      .info-banner {
        background: white;
        color: #64748b;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-left: 4px solid #03C9D7;
        animation: slideInFromLeft 0.5s ease-out;
      }

      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .info-icon {
        color: #03C9D7;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      /* Card container */
      .card-datatable {
        background: white;
        border-radius: 18px;
        padding: 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        animation: cardEntrance 0.7s ease-out;
      }

      @keyframes cardEntrance {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .card-datatable .table {
        border-radius: 18px;
        overflow: hidden;
      }

      /* Table styling */
      .table {
        margin-bottom: 0;
      }

      .table thead tr th {
        background: #f8fafb;
        font-weight: 600;
        color: #475569;
        padding: 1rem 1rem;
        font-size: 0.875rem;
        border-bottom: 2px solid #e2e8f0;
        white-space: nowrap;
      }

      /* Enhanced row hover with animations */
      .table tbody tr {
        border-bottom: 1px solid #f1f5f9;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        border-left: 4px solid transparent;
        opacity: 0;
        animation: rowFadeIn 0.5s ease-out forwards;
      }

      @keyframes rowFadeIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .table tbody tr:nth-child(1) { animation-delay: 0.1s; }
      .table tbody tr:nth-child(2) { animation-delay: 0.15s; }
      .table tbody tr:nth-child(3) { animation-delay: 0.2s; }
      .table tbody tr:nth-child(4) { animation-delay: 0.25s; }
      .table tbody tr:nth-child(5) { animation-delay: 0.3s; }
      .table tbody tr:nth-child(6) { animation-delay: 0.35s; }
      .table tbody tr:nth-child(7) { animation-delay: 0.4s; }
      .table tbody tr:nth-child(8) { animation-delay: 0.45s; }
      .table tbody tr:nth-child(9) { animation-delay: 0.5s; }
      .table tbody tr:nth-child(10) { animation-delay: 0.55s; }

      .table tbody tr:hover {
        background-color: #f8fafc;
        transform: translateY(-4px) scale(1.005);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        border-left-color: #03C9D7;
        z-index: 10;
      }

      .table tbody tr td {
        padding: 1.25rem 1rem;
        vertical-align: middle;
        border: none;
      }

      /* Checkbox styling */
      .custom-checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #03C9D7;
      }

      /* Index number */
      .index-number {
        font-weight: 600;
        color: #1e293b;
        font-size: 0.95rem;
      }

      /* KAK name */
      .kak-name {
        font-weight: 600;
        color: #1e293b;
        font-size: 0.95rem;
        margin-bottom: 0.25rem;
      }

      .kak-name-sub {
        font-size: 0.75rem;
        color: #94a3b8;
      }

      /* Date text */
      .date-text {
        font-size: 0.875rem;
        color: #64748b;
      }

      /* Status badges with animations */
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .status-badge:hover {
        transform: scale(1.05);
      }

      .badge-approved {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
      }

      .badge-rejected {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }

      .badge-pending {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        animation: pulseBadge 2s ease-in-out infinite;
      }

      @keyframes pulseBadge {
        0%, 100% {
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        50% {
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.6);
        }
      }

      .badge-revision {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      }

      .status-icon {
        width: 14px;
        height: 14px;
      }

      /* Action buttons */
      .action-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
      }

      .btn-icon {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .btn-icon svg {
        width: 18px;
        height: 18px;
      }

      .btn-view {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
      }

      .btn-view:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
      }

      .btn-download {
        background: linear-gradient(135deg, #03C9D7 0%, #02b3c4 100%);
        color: white;
        box-shadow: 0 2px 8px rgba(3, 201, 215, 0.3);
      }

      .btn-download:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(3, 201, 215, 0.4);
      }

      /* Pagination */
      .pagination-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-top: 1px solid #f1f5f9;
        background: white;
      }

      .pagination-info {
        color: #6B7280;
        font-size: 14px;
      }

      .pagination {
        display: flex;
        gap: 0.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .pagination .page-item {
        display: inline-block;
      }

      .pagination .page-link {
        min-width: 36px;
        height: 36px;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        border: 1px solid #E5E7EB;
        background: white;
        color: #374151;
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }

      .pagination .page-link:hover:not(.disabled) {
        background: #F3F4F6;
        border-color: #cbd5e0;
        transform: translateY(-2px);
      }

      .pagination .page-item.active .page-link {
        background: #03C9D7;
        color: white;
        border-color: #03C9D7;
      }

      .pagination .page-item.disabled .page-link {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Empty state */
      .empty-state {
        text-align: center;
        padding: 3rem;
        color: #94a3b8;
      }

      .empty-state-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1rem;
        opacity: 0.5;
        color: #cbd5e0;
      }

      .empty-state h3 {
        color: #64748b;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      /* Responsive */
      @media (max-width: 992px) {
        .riwayat-kak-page {
          padding: 1rem;
        }

        .table tbody tr:hover {
          transform: translateY(-2px) scale(1.002);
        }

        .table tbody tr td {
          padding: 1rem 0.5rem;
        }
      }
    </style>

      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input custom-checkbox" id="selectAll">
              </th>
              <th style="width: 60px;">No.</th>
              <th style="min-width: 250px;">Nama KAK</th>
              <th style="min-width: 130px;">Tanggal Dibuat</th>
              <th style="min-width: 150px;">Tanggal Disetujui</th>
              <th style="text-align: center; min-width: 150px;">Status</th>
              <th style="text-align: center; width: 140px;">Aksi</th>
            </tr>
          </thead>
          <tbody id="riwayatTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="pagination-container">
          <div class="pagination-info">
            Showing <span id="startEntry">0</span> to <span id="endEntry">0</span> of <span id="totalEntries">0</span> entries
          </div>
          <ul class="pagination" id="paginationButtons">
            <!-- Pagination buttons will be generated by JavaScript -->
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
    kakData: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalEntries: 0,
    totalPages: 0,
    selectedItems: new Set()
  };

  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================
  function getStatusBadge(status) {
    const statusString = String(status).toLowerCase().replace(/\s+/g, '_');
    
    const statusConfig = {
      disetujui: { class: "badge-approved", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`, text: "Disetujui" },
      approved: { class: "badge-approved", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`, text: "Disetujui" },
      ditolak: { class: "badge-rejected", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`, text: "Ditolak" },
      rejected: { class: "badge-rejected", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`, text: "Ditolak" },
      menunggu: { class: "badge-pending", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`, text: "Menunggu" },
      pending: { class: "badge-pending", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`, text: "Menunggu" },
      revisi: { class: "badge-revision", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`, text: "Revisi" },
      revision: { class: "badge-revision", icon: `<svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`, text: "Revisi" }
    };

    const config = statusConfig[statusString] || statusConfig.pending;
    return `<span class="status-badge ${config.class}">${config.icon}${config.text}</span>`;
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows() {
    const tbody = document.getElementById("riwayatTableBody");
    if (!tbody) return;

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const paginatedData = state.kakData.slice(startIndex, endIndex);

    if (paginatedData.length === 0 && state.totalEntries === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <h3>Tidak ada data KAK</h3>
              <p>Belum ada KAK yang terdaftar dalam sistem</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = "";

    paginatedData.forEach((item, index) => {
      const globalIndex = startIndex + index + 1;
      const isChecked = state.selectedItems.has(item.id);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input 
            type="checkbox" 
            class="form-check-input custom-checkbox row-checkbox" 
            data-id="${item.id}"
            ${isChecked ? "checked" : ""}
          />
        </td>
        <td>
          <span class="index-number">${globalIndex}</span>
        </td>
        <td>
          <div class="kak-name">${item.nama_kak}</div>
          <div class="kak-name-sub">${item.pengusul}</div>
        </td>
        <td>
          <span class="date-text">${item.tanggal_dibuat}</span>
        </td>
        <td>
          <span class="date-text">${item.tanggal_disetujui || "-"}</span>
        </td>
        <td style="text-align: center;">
          ${getStatusBadge(item.status)}
        </td>
        <td>
          <div class="action-buttons">
            <button class="btn-icon btn-view" data-id="${item.id}" title="Lihat">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button class="btn-icon btn-download" data-id="${item.id}" title="Unduh">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        </td>
      `;

      tbody.appendChild(row);
    });

    updatePaginationInfo();
    attachEventListeners();
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachEventListeners() {
    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        document
          .querySelectorAll(".row-checkbox")
          .forEach((cb) => {
            cb.checked = this.checked;
            const id = parseInt(cb.dataset.id);
            if (this.checked) {
              state.selectedItems.add(id);
            } else {
              state.selectedItems.delete(id);
            }
          });
      });
    }

    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", function() {
        const id = parseInt(this.dataset.id);
        if (this.checked) {
          state.selectedItems.add(id);
        } else {
          state.selectedItems.delete(id);
        }
        updateSelectAll();
      });
    });

    document.querySelectorAll(".btn-view").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        window.navigateTo(`/${userRole}/riwayat/detail/${id}`);
      });
    });

    document.querySelectorAll(".btn-download").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        // TODO: Implement actual download logic
        if (window.showSuccess) {
          window.showSuccess(`Fitur unduh untuk KAK ID: ${id} belum diimplementasikan.`);
        }
      });
    });
  }

  function updateSelectAll() {
    const allCheckboxes = document.querySelectorAll(".row-checkbox");
    const checkedCount = document.querySelectorAll(
      ".row-checkbox:checked"
    ).length;
    const selectAll = document.getElementById("selectAll");

    if (selectAll) {
      selectAll.checked =
        checkedCount > 0 && checkedCount === allCheckboxes.length;
      selectAll.indeterminate =
        checkedCount > 0 && checkedCount < allCheckboxes.length;
    }
  }

  // ==============================================
  // PAGINATION
  // ==============================================
  function setupPagination() {
    const paginationContainer = document.getElementById("paginationButtons");
    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    const totalPages = state.totalPages;
    if (totalPages <= 1) {
        updatePaginationInfo();
        return;
    }

    // Previous buttons
    const firstPageItem = document.createElement("li");
    firstPageItem.className = `page-item ${state.currentPage === 1 ? "disabled" : ""}`;
    firstPageItem.innerHTML = `<a class="page-link" href="#" id="btnFirstPage">«</a>`;
    paginationContainer.appendChild(firstPageItem);

    const prevPageItem = document.createElement("li");
    prevPageItem.className = `page-item ${state.currentPage === 1 ? "disabled" : ""}`;
    prevPageItem.innerHTML = `<a class="page-link" href="#" id="btnPrevPage">‹</a>`;
    paginationContainer.appendChild(prevPageItem);

    // Page number buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, state.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageItem = document.createElement("li");
      pageItem.className = `page-item ${i === state.currentPage ? "active" : ""}`;
      pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
      paginationContainer.appendChild(pageItem);
    }

    // Next buttons
    const nextPageItem = document.createElement("li");
    nextPageItem.className = `page-item ${state.currentPage === totalPages ? "disabled" : ""}`;
    nextPageItem.innerHTML = `<a class="page-link" href="#" id="btnNextPage">›</a>`;
    paginationContainer.appendChild(nextPageItem);

    const lastPageItem = document.createElement("li");
    lastPageItem.className = `page-item ${state.currentPage === totalPages ? "disabled" : ""}`;
    lastPageItem.innerHTML = `<a class="page-link" href="#" id="btnLastPage">»</a>`;
    paginationContainer.appendChild(lastPageItem);

    // Attach event listeners to pagination buttons
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
        changePage(1);
      });
    if (btnPrevPage)
      btnPrevPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage > 1) changePage(state.currentPage - 1);
      });
    if (btnNextPage)
      btnNextPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage < totalPages)
          changePage(state.currentPage + 1);
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
    renderTableRows();
    setupPagination();
  }

  function updatePaginationInfo() {
    const startEntry = (state.currentPage - 1) * state.itemsPerPage + 1;
    const endEntry = Math.min(
      state.currentPage * state.itemsPerPage,
      state.totalEntries
    );

    const startEntryEl = document.getElementById("startEntry");
    const endEntryEl = document.getElementById("endEntry");
    const totalEntriesEl = document.getElementById("totalEntries");

    if (startEntryEl) {
      startEntryEl.textContent = state.totalEntries > 0 ? startEntry : 0;
    }
    if (endEntryEl) {
      endEntryEl.textContent = endEntry;
    }
    if (totalEntriesEl) {
      totalEntriesEl.textContent = state.totalEntries;
    }
  }
  
  function updateState(newState) {
    state = { ...state, ...newState };
    renderTableRows();
    setupPagination();
  }

  async function fetchKAKData() {
    const tbody = document.getElementById("riwayatTableBody");
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center p-5">Memuat data...</td></tr>';
    }

    try {
        const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
        if (!token) {
            if (window.showError) window.showError("Autentikasi gagal. Silakan login kembali.");
            window.navigateTo('/login');
            return;
        }

        const response = await fetch('/api/kak', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Gagal mengambil data: ${response.statusText}`);
        }

        const result = await response.json();
        
        const mappedData = result.data.map(item => ({
            id: item.id,
            nama_kak: item.nama_kak,
            pengusul: item.pengusul_nama,
            tanggal_dibuat: new Date(item.tanggal_dibuat).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            tanggal_disetujui: item.tanggal_disetujui ? new Date(item.tanggal_disetujui).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }) : null,
            status: item.status
        }));

        updateState({
            kakData: mappedData,
            totalEntries: mappedData.length,
            totalPages: Math.ceil(mappedData.length / state.itemsPerPage),
            currentPage: 1
        });

    } catch (error) {
        console.error("Error fetching KAK data:", error);
        if (window.showError) window.showError('Gagal memuat data KAK. Silakan coba lagi.');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center p-5 text-danger">Gagal memuat data. Periksa koneksi Anda dan coba lagi.</td></tr>';
        }
        updateState({ kakData: [], totalEntries: 0, totalPages: 0, currentPage: 1 });
    }
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  async function initializePage() {
    await fetchKAKData();
    if (window.Helpers) {
      window.Helpers.init();
    }
  }

  initializePage();
}
