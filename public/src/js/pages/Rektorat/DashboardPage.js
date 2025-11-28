// frontend/src/pages/Rektorat/DashboardPage.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function RektoratDashboardPage(path, userRole) {
  const pageContent = `
    <div class="rektorat-dashboard-page">
      <!-- Stats Cards -->
      <div class="row g-4 mb-4">
        <div class="col-sm-6 col-lg-3">
          <div class="card stat-card-active">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Total</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Kegiatan Aktif</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="activeCount">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.9;">Kegiatan</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card stat-card-inactive">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Total</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Disetujui</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="approvedCount">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">Kegiatan</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card stat-card-warning">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Total</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Dalam Proses</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="pendingCount">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">Kegiatan</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-3">
          <div class="card stat-card-danger">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Total</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Ditolak</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="rejectedCount">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">Kegiatan</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Filter Status</label>
              <select class="form-select" id="filterStatus">
                <option value="">Semua Status</option>
                <option value="Aktif">Dalam Proses</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Pencarian</label>
              <input type="text" class="form-control" id="searchInput" placeholder="Cari nama kegiatan atau pengusul...">
            </div>
            <div class="col-md-4 d-flex align-items-end">
              <button class="btn btn-primary w-100" id="btnReset">
                <i class="ti ti-refresh me-2"></i>Reset Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th>ID</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Pengusul</th>
              <th>Tanggal Diajukan</th>
              <th style="text-align: center;">Status Approval</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="monitoringTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);
  
  // ==============================================
  // STATE
  // ==============================================
  let state = {
    allKegiatan: [],
    displayKegiatan: [],
    filters: {
      status: '',
      search: ''
    }
  };

  // ==============================================
  // API FUNCTIONS
  // ==============================================
  async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    const headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    const config = { ...options, headers };
    try {
      const response = await fetch(`/api${endpoint}`, config);
      const data = await response.json();
      if (data.status === false || data.status === 'error') {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async function fetchKegiatan() {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) {
      console.error('[REKTORAT DASHBOARD] Table body not found!');
      return;
    }
    
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">Loading...</td></tr>';
    try {
      const response = await apiRequest('/kegiatan');
      console.log('[REKTORAT DASHBOARD] API Response:', response);
      
      const kegiatanData = response.data.data ? response.data.data : response.data;
      state.allKegiatan = kegiatanData || [];
      
      console.log('[REKTORAT DASHBOARD] Total kegiatan:', state.allKegiatan.length);
      
      // Rektorat melihat semua kegiatan (monitoring)
      state.displayKegiatan = state.allKegiatan;

      applyFilters();
      updateStats(state.allKegiatan);
    } catch (error) {
      console.error('[REKTORAT DASHBOARD] Error fetching data:', error);
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error: ${error.message}</td></tr>`;
    }
  }

  function applyFilters() {
    let filtered = [...state.allKegiatan];

    // Filter by status
    if (state.filters.status) {
      filtered = filtered.filter(k => {
        if (state.filters.status === 'Aktif') {
          return k.current_approval && k.current_approval.status === 'Aktif';
        } else if (state.filters.status === 'Disetujui') {
          return k.current_approval && k.current_approval.status === 'Disetujui';
        } else if (state.filters.status === 'Ditolak') {
          return k.current_approval && k.current_approval.status === 'Ditolak';
        }
        return true;
      });
    }

    // Filter by search
    if (state.filters.search) {
      const searchLower = state.filters.search.toLowerCase();
      filtered = filtered.filter(k => 
        k.nama_kegiatan?.toLowerCase().includes(searchLower) ||
        k.pengusul_nama?.toLowerCase().includes(searchLower)
      );
    }

    state.displayKegiatan = filtered;
    renderTableRows(state.displayKegiatan);
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function formatDate(dateString) {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  function getStatusBadge(kegiatan) {
    if (!kegiatan.current_approval) {
      return '<span class="badge bg-label-secondary">Tidak Ada Data</span>';
    }

    const status = kegiatan.current_approval.status;
    const level = kegiatan.current_approval.approval_level;

    if (status === 'Disetujui') {
      return '<span class="badge bg-label-success" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Disetujui</span>';
    } else if (status === 'Ditolak') {
      return '<span class="badge bg-label-danger" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Ditolak</span>';
    } else if (status === 'Aktif') {
      return `<span class="badge bg-label-warning" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Proses ${level || ''}</span>`;
    } else if (status === 'Revisi') {
      return '<span class="badge bg-label-info" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Revisi</span>';
    }
    
    return '<span class="badge bg-label-secondary">Tidak Diketahui</span>';
  }

  function renderTableRows(data) {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) {
      console.error('[REKTORAT DASHBOARD] Table body not found in renderTableRows!');
      return;
    }

    console.log('[REKTORAT DASHBOARD] Rendering', data?.length || 0, 'rows');

    tbody.innerHTML = "";
    if (!data || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada data kegiatan yang ditemukan.</td></tr>';
      return;
    }

    data.forEach((kegiatan, index) => {
      if (!kegiatan) {
        console.warn('[REKTORAT DASHBOARD] Skipping null kegiatan at index', index);
        return;
      }

      const row = document.createElement("tr");

      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${kegiatan.kegiatan_id || '-'}</span>
        </td>
        <td>
          <strong>${kegiatan.nama_kegiatan || 'Tidak ada nama'}</strong>
        </td>
        <td>
          <strong>${kegiatan.pengusul_nama || 'Tidak diketahui'}</strong>
          <div class="text-muted">${kegiatan.pengusul_role || ''}</div>
        </td>
        <td>
          <div class="date-text">${formatDate(kegiatan.created_at)}</div>
        </td>
        <td style="text-align: center;">
          ${getStatusBadge(kegiatan)}
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm me-2 btn-view-detail" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);" data-id="${kegiatan.kak_id || kegiatan.kegiatan_id}" title="Lihat Detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>          
          </button>
          <button class="btn btn-sm btn-view-timeline" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);" data-id="${kegiatan.kegiatan_id || ''}" title="Lihat Timeline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-timeline"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 16l6 -7l5 5l5 -6" /><circle cx="15" cy="14" r="1" /><circle cx="10" cy="9" r="1" /><circle cx="4" cy="16" r="1" /><circle cx="20" cy="8" r="1" /></svg>
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });

    console.log('[REKTORAT DASHBOARD] Rows rendered, attaching listeners...');
    attachEventListeners();
  }

  async function viewTimeline(kegiatanId) {
    try {
      const response = await apiRequest(`/kegiatan/${kegiatanId}`);
      const kegiatan = response.data;
      
      let timelineHTML = '<div class="timeline-container" style="text-align: left; max-height: 400px; overflow-y: auto;">';
      
      if (kegiatan.approvals && kegiatan.approvals.length > 0) {
        kegiatan.approvals.forEach((approval, index) => {
          const statusClass = approval.status === 'Disetujui' ? 'success' : 
                            approval.status === 'Ditolak' ? 'danger' : 
                            approval.status === 'Aktif' ? 'warning' : 'secondary';
          
          timelineHTML += `
            <div class="timeline-item mb-3" style="border-left: 3px solid var(--bs-${statusClass}); padding-left: 1rem;">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h6 class="mb-0">${approval.approval_level}</h6>
                <span class="badge bg-${statusClass}">${approval.status}</span>
              </div>
              ${approval.catatan ? `<p class="mb-1 text-muted small">${approval.catatan}</p>` : ''}
              <small class="text-muted">${formatDate(approval.created_at)}</small>
            </div>
          `;
        });
      } else {
        timelineHTML += '<p class="text-center">Belum ada riwayat approval</p>';
      }
      
      timelineHTML += '</div>';

      Swal.fire({
        title: `Timeline Kegiatan #${kegiatanId}`,
        html: timelineHTML,
        icon: 'info',
        confirmButtonText: 'Tutup',
        confirmButtonColor: '#00BCD4',
        width: '600px'
      });
    } catch (error) {
      showError(`Gagal mengambil timeline: ${error.message}`);
    }
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachEventListeners() {
    // View Detail Button
    document.querySelectorAll(".btn-view-detail").forEach((btn) => {
      btn.addEventListener("click", function () {
        const kakId = this.dataset.id;
        window.location.href = `/${userRole.toLowerCase()}/kegiatan/detail/${kakId}`;
      });
    });

    // View Timeline Button
    document.querySelectorAll(".btn-view-timeline").forEach((btn) => {
      btn.addEventListener("click", function () {
        const kegiatanId = this.dataset.id;
        viewTimeline(kegiatanId);
      });
    });
  }

  function showError(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  function showSuccess(message) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }

  function updateStats(allData) {
    console.log('[REKTORAT DASHBOARD] Updating stats with', allData?.length || 0, 'items');
    
    if (!allData || !Array.isArray(allData)) {
      console.warn('[REKTORAT DASHBOARD] Invalid allData:', allData);
      return;
    }

    // Active (dalam proses)
    const activeCount = allData.filter(k => 
      k && k.current_approval && k.current_approval.status === 'Aktif'
    ).length;

    // Approved (disetujui semua)
    const approvedCount = allData.filter(k => 
      k && k.current_approval && k.current_approval.status === 'Disetujui'
    ).length;

    // Pending (menunggu approval)
    const pendingCount = allData.filter(k => 
      k && k.current_approval && 
      (k.current_approval.status === 'Aktif' || k.current_approval.status === 'Revisi')
    ).length;

    // Rejected (ditolak)
    const rejectedCount = allData.filter(k => 
      k && k.current_approval && k.current_approval.status === 'Ditolak'
    ).length;

    console.log('[REKTORAT DASHBOARD] Stats:', { activeCount, approvedCount, pendingCount, rejectedCount });

    const activeEl = document.getElementById("activeCount");
    const approvedEl = document.getElementById("approvedCount");
    const pendingEl = document.getElementById("pendingCount");
    const rejectedEl = document.getElementById("rejectedCount");

    if (activeEl) activeEl.textContent = activeCount;
    if (approvedEl) approvedEl.textContent = approvedCount;
    if (pendingEl) pendingEl.textContent = pendingCount;
    if (rejectedEl) rejectedEl.textContent = rejectedCount;
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  
  // Initialize filter listeners after DOM is ready
  function initializeFilters() {
    // Filter Status
    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
      filterStatus.addEventListener('change', function() {
        state.filters.status = this.value;
        applyFilters();
      });
    }

    // Search Input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        state.filters.search = this.value;
        applyFilters();
      });
    }

    // Reset Button
    const btnReset = document.getElementById('btnReset');
    if (btnReset) {
      btnReset.addEventListener('click', function() {
        state.filters = { status: '', search: '' };
        const statusEl = document.getElementById('filterStatus');
        const searchEl = document.getElementById('searchInput');
        if (statusEl) statusEl.value = '';
        if (searchEl) searchEl.value = '';
        applyFilters();
      });
    }
  }

  // Wait for DOM to be ready with retry mechanism
  function waitForDOM() {
    const tbody = document.getElementById('monitoringTableBody');
    const filterStatus = document.getElementById('filterStatus');
    
    if (tbody && filterStatus) {
      console.log('[REKTORAT DASHBOARD] ✅ DOM ready, initializing...');
      initializeFilters();
      fetchKegiatan();
    } else {
      console.log('[REKTORAT DASHBOARD] ⏳ DOM not ready, retrying in 50ms...');
      setTimeout(waitForDOM, 50);
    }
  }

  // Start DOM check with small delay
  setTimeout(waitForDOM, 100);
}
