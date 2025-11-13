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

    <div class="modal fade" id="revisiModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCenterTitle">Revisi Usulan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="revisiForm">
              <input type="hidden" id="revisiUsulanId">
              
              <div class="row">
                <div class="col mb-3">
                  <label for="revisiNama" class="form-label">Nama Kegiatan</label>
                  <input type="text" id="revisiNama" class="form-control" readonly>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="revisiPengusul" class="form-label">Pengusul</label>
                  <input type="text" id="revisiPengusul" class="form-control" readonly>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="revisiCatatan" class="form-label">Catatan Revisi</label>
                  <textarea id="revisiCatatan" class="form-control" rows="4" placeholder="Masukkan catatan revisi..." required></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" id="btnKirimRevisi">Kirim Revisi</button>
          </div>
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
      if (data.status === false || data.status === "error") {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // ==============================================
  // DATA HANDLING
  // ==============================================
  async function initializeDashboard() {
    const tbody = document.getElementById("usulanTableBody");
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Loading...</td></tr>';
    }
    
    try {
        // Fetch all relevant data at once
        const response = await apiRequest(`/telaah`); 
        state.allUsulan = response.data || [];
        
        updateStats();
        
        // Set default view to 'Menunggu Verifikasi'
        filterAndDisplayUsulan(2);

    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red;">Error loading data: ${error.message}</td></tr>`;
        }
    }
  }
  
  function filterAndDisplayUsulan(statusId) {
      state.displayUsulan = state.allUsulan.filter(u => u.status_id === statusId);
      state.totalItems = state.displayUsulan.length;
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      state.currentPage = 1; // Reset to first page
      
      renderTableRows();
      renderPagination();
  }

  // ==============================================
  // ACTIONS
  // ==============================================
  async function handleAction(telaahId, actionType, payload = {}) {
    // Custom confirmation messages
    const messages = {
        approve: "Anda yakin ingin menyetujui usulan ini?",
        revise: "Anda yakin ingin mengirim revisi untuk usulan ini?",
        reject: "Anda yakin ingin menolak usulan ini?",
    };

    if (!confirm(messages[actionType] || `Are you sure?`)) {
      return;
    }

    try {
      await apiRequest(`/telaah/${telaahId}/${actionType}`, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      alert(`Usulan berhasil di-${actionType}!`);
      initializeDashboard(); // Refresh all data from server
    } catch (error) {
      console.error(`Gagal ${actionType} usulan:`, error);
      alert(`Error saat ${actionType} usulan: ${error.message}`);
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

  function getStatusBadge(statusId) {
    const statusMap = {
      1: { class: "bg-label-secondary", text: "Draf" },
      2: { class: "bg-label-warning", text: "Diajukan" },
      3: { class: "bg-label-success", text: "Disetujui" },
      4: { class: "bg-label-danger", text: "Ditolak" },
      5: { class: "bg-label-info", text: "Revisi" },
    };
    return statusMap[statusId] || { class: "bg-label-dark", text: "Tidak Diketahui" };
  }

  function getActionButtons(statusId, telaahId) {
    switch (statusId) {
      case 2: // Menunggu Verifikasi
        return `
          <button class="btn btn-sm btn-success me-2 btn-approve" data-id="${telaahId}" title="Setujui">
             Setujui
          </button>
          <button class="btn btn-sm btn-warning me-2 btn-revise" data-id="${telaahId}" title="Revisi">
             Revisi
          </button>
          <button class="btn btn-sm btn-danger btn-reject" data-id="${telaahId}" title="Tolak">
             Tolak
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
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">Tidak ada usulan yang menunggu verifikasi.</td></tr>';
      return;
    }

    tbody.innerHTML = "";

    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedData = state.displayUsulan.slice(startIndex, startIndex + state.itemsPerPage);

    paginatedData.forEach((usulan) => {
      const statusBadge = getStatusBadge(usulan.status_id);
      const actionButtons = getActionButtons(usulan.status_id, usulan.telaah_id);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox" data-id="${usulan.telaah_id}">
        </td>
        <td>
          <span style="font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 0.5rem 0.75rem; border-radius: 8px; background: #FFFFFF; color: #374151;">${usulan.telaah_id}</span>
        </td>
        <td><strong>${usulan.nama_kegiatan || 'Tanpa Judul'}</strong></td>
        <td><strong>${usulan.pengusul_nama || 'Tanpa Pengusul'}</strong></td>
        <td>${formatDate(usulan.created_at)}</td>
        <td style="text-align: center;">
          <span class="badge ${statusBadge.class}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${statusBadge.text}</span>
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
    const endItem = Math.min(state.currentPage * state.itemsPerPage, state.totalItems);
    paginationInfoEl.textContent = `Showing ${startItem} to ${endItem} of ${state.totalItems} entries`;

    if (totalPages <= 1) return;

    const pageLink = (page, text, disabled = false) => {
        const li = document.createElement("li");
        li.className = `page-item ${state.currentPage === page ? "active" : ""} ${disabled ? "disabled" : ""}`;
        li.innerHTML = `<a class="page-link" href="#" data-page="${page}">${text}</a>`;
        return li;
    };
    
    paginationEl.appendChild(pageLink(state.currentPage - 1, '‹', state.currentPage === 1));

    for (let i = 1; i <= totalPages; i++) {
        paginationEl.appendChild(pageLink(i, i));
    }
    
    paginationEl.appendChild(pageLink(state.currentPage + 1, '›', state.currentPage === totalPages));

    paginationEl.querySelectorAll(".page-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(e.target.getAttribute("data-page"));
        if (page && page !== state.currentPage && page > 0 && page <= totalPages) {
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
    document.querySelectorAll(".btn-approve").forEach(btn => {
      btn.addEventListener("click", () => handleAction(btn.dataset.id, 'approve'));
    });
    
    document.querySelectorAll(".btn-revise").forEach(btn => {
      btn.addEventListener("click", () => {
        const telaahId = btn.dataset.id;
        const usulan = state.allUsulan.find(u => u.telaah_id == telaahId);
        
        document.getElementById("revisiNama").value = usulan.nama_kegiatan || "";
        document.getElementById("revisiPengusul").value = usulan.pengusul_nama || "";
        document.getElementById("revisiUsulanId").value = usulan.telaah_id;
        document.getElementById("revisiCatatan").value = "";

        revisiModalInstance.show();
      });
    });

    document.querySelectorAll(".btn-reject").forEach(btn => {
      btn.addEventListener("click", () => {
          const catatan = prompt("Masukkan alasan penolakan:");
          if (catatan) { // Only proceed if user provides a reason
            handleAction(btn.dataset.id, 'reject', { catatan });
          }
      });
    });
  }

  // ==============================================
  // MODAL & STATS
  // ==============================================
  function setupModal() {
      if (typeof bootstrap !== "undefined") {
        revisiModalInstance = new bootstrap.Modal(document.getElementById("revisiModal"));

        const btnKirimRevisi = document.getElementById("btnKirimRevisi");
        btnKirimRevisi.addEventListener("click", async () => {
            const catatan = document.getElementById("revisiCatatan").value.trim();
            const telaahId = document.getElementById("revisiUsulanId").value;
            if (!catatan) return alert("Catatan revisi harus diisi!");
            
            await handleAction(telaahId, 'revise', { catatan_telaah: { deskripsi_kegiatan: catatan } }); // Assuming note goes here
            revisiModalInstance.hide();
        });

      } else {
        console.error("Bootstrap 5 JS not found. Modals will not work.");
      }
  }

  function updateStats() {
    const menungguCount = state.allUsulan.filter(u => u.status_id === 2).length;
    const revisiCount = state.allUsulan.filter(u => u.status_id === 5).length;
    
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
