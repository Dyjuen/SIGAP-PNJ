// frontend/src/pages/Pengusul/MonitoringUsulan.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderMonitoringUsulanPage(path, userRole) {
  const pageContent = `
    <style>
      /* Import existing CSS styles - assuming they're in a global stylesheet */
      /* Only add page-specific styles that don't exist yet */
      
      /* Pagination - specific to this page */
      .pagination-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
      }
      .pagination-info {
        color: #6B7280;
        font-size: 14px;
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
        transition: all 0.2s;
      }
      .pagination .page-link:hover {
        background: #F3F4F6;
      }
      .pagination .page-item.active .page-link {
        background: #00BCD4;
        color: white;
        border-color: #00BCD4;
      }

      /* Button variants if not already in global CSS */
      .btn-revisi {
        background: linear-gradient(135deg, #743bfaff 0%, #7c3aed 100%) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
      }
      .btn-download {
        background: linear-gradient(135deg, #743bfaff 0%, #7c3aed 100%) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
        padding: 0.5rem 1rem !important;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .btn-view {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3) !important;
      }
    </style>

    <div class="monitoring-usulan-page">
      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
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
            Showing <span id="startEntry">1</span> to <span id="endEntry">10</span> of <span id="totalEntries">50</span> entries
          </div>
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" id="btnFirstPage">«</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" id="btnPrevPage">‹</a>
            </li>
            <li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="2">2</a></li>
            <li class="page-item active"><a class="page-link" href="#" data-page="3">3</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="4">4</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="5">5</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="6">6</a></li>
            <li class="page-item">
              <a class="page-link" href="#" id="btnNextPage">›</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" id="btnLastPage">»</a>
            </li>
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
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
      if (!data.status) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async function fetchTelaah() {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Loading...</td></tr>';

    try {
      const response = await apiRequest('/telaah');
      state.activities = response.data;
      state.totalEntries = response.data.length;
      state.totalPages = Math.ceil(state.totalEntries / state.itemsPerPage);
      renderTableRows(state.activities);
      updatePagination();
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red;">Error: ${error.message}</td></tr>`;
    }
  }


  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================
  function formatDate(dateString) {
    if (!dateString) return "-";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  }

  function getStatusBadge(status) {
    const statusMap = {
      'Draft': { class: "bg-label-warning", text: "Diajukan" },
      'Menunggu Verifikasi': { class: "bg-label-warning", text: "Diajukan" },
      'Direvisi': { class: "bg-label-warning", text: "Diajukan" },
      'Disetujui WD': { class: "bg-label-success", text: "Disetujui" },
      'Disetujui PPK': { class: "bg-label-success", text: "Disetujui" },
      'Ditolak': { class: "bg-label-danger", text: "Ditolak" },
      'Default': { class: "bg-label-secondary", text: "Tidak Diketahui" } // Fallback
    };
    return statusMap[status] || statusMap['Default'];
  }

  function getActionButtons(status, id) {
    // This function will likely need more logic based on all possible statuses
    switch (status) {
      case 'Draft':
      case 'Direvisi':
      case 'Ditolak':
        return `
          <button class="btn btn-sm btn-edit-profile me-2" data-id="${id}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button class="btn btn-sm btn-delete" data-id="${id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        `;
      case 'Disetujui PPK':
      case 'Disetujui WD':
        return `
          <button class="btn btn-sm btn-download" data-id="${id}" title="Download PDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path dM12 4l0 12" /></svg>
            Download PDF
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
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Tidak ada data usulan.</td></tr>';
      return;
    }

    tbody.innerHTML = "";

    const paginatedData = data.slice(
      (state.currentPage - 1) * state.itemsPerPage,
      state.currentPage * state.itemsPerPage
    );

    paginatedData.forEach((activity) => {
      const status = activity.status ? activity.status.nama_status : 'N/A';
      const statusBadge = getStatusBadge(status);
      const actionButtons = getActionButtons(status, activity.id);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${activity.id}</span>
        </td>
        <td>
          <strong>${activity.nama_kegiatan || 'Tanpa Judul'}</strong>
          <div class="text-muted small">${activity.pengusul?.nama_lengkap || 'Tanpa Pengusul'}</div>
        </td>
        <td>
          <div>${formatDate(activity.created_at)}</div>
        </td>
        <td>
          <div>${formatDate(activity.tanggal_disetujui)}</div>
        </td>
        <td style="text-align: center;">
          <span class="badge ${statusBadge.class}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${statusBadge.text}</span>
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

    document
      .querySelectorAll(".btn-edit-profile, .btn-revisi")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          alert(`Edit kegiatan ID: ${this.getAttribute("data-id")}`);
        });
      });

    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
          alert(`Hapus kegiatan ID: ${this.getAttribute("data-id")}`);
        }
      });
    });

    document.querySelectorAll(".btn-download").forEach((btn) => {
      btn.addEventListener("click", function () {
        alert(`Download PDF kegiatan ID: ${this.getAttribute("data-id")}`);
      });
    });

    setupPagination();
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
    const paginationContainer = document.querySelector(".pagination");
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = ''; // Clear existing buttons

    // Previous buttons
    paginationContainer.innerHTML += `<li class="page-item ${state.currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" id="btnFirstPage">«</a></li>`;
    paginationContainer.innerHTML += `<li class="page-item ${state.currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" id="btnPrevPage">‹</a></li>`;

    // Page number buttons (simplified logic)
    for(let i = 1; i <= state.totalPages; i++) {
        paginationContainer.innerHTML += `<li class="page-item ${i === state.currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }

    // Next buttons
    paginationContainer.innerHTML += `<li class="page-item ${state.currentPage === state.totalPages ? 'disabled' : ''}"><a class="page-link" href="#" id="btnNextPage">›</a></li>`;
    paginationContainer.innerHTML += `<li class="page-item ${state.currentPage === state.totalPages ? 'disabled' : ''}"><a class="page-link" href="#" id="btnLastPage">»</a></li>`;


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
        if (state.currentPage < state.totalPages) changePage(state.currentPage + 1);
      });
    if (btnLastPage)
      btnLastPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(state.totalPages);
      });
  }

  function changePage(page) {
    if(page < 1 || page > state.totalPages) return;
    state.currentPage = page;
    renderTableRows(state.activities);
    updatePagination();
  }

  function updatePagination() {
    const startEntry = (state.currentPage - 1) * state.itemsPerPage + 1;
    const endEntry = Math.min(state.currentPage * state.itemsPerPage, state.totalEntries);

    document.getElementById("startEntry").textContent = state.totalEntries > 0 ? startEntry : 0;
    document.getElementById("endEntry").textContent = endEntry;
    document.getElementById("totalEntries").textContent = state.totalEntries;

    // Re-generate pagination buttons to update active state
    setupPagination();
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  fetchTelaah();

  if (window.Helpers) {
    window.Helpers.init();
  }
}
