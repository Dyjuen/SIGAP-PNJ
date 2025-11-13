// frontend/src/pages/Wadir/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderWadirDashboardPage(path, userRole) {
  const dashboardContent = `
    <div class="wadir-dashboard-page">
      <!-- Stats Cards -->
      <div class="row g-4 mb-4">
        <div class="col-sm-6 col-xl-6">
          <div class="card stat-card-active">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Kegiatan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Total Menunggu</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="waitingCount">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.9;">Kegiatan</small>
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
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Kegiatan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Total Diterima</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="acceptedCount">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">Kegiatan</small>
                  </div>
                </div>
              </div>
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
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="monitoringTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
        
        <!-- Pagination - removed for simplicity, all items on one page -->
        <div class="pagination-container" style="display:none;">
          <div class="pagination-info">
            Showing <span id="startEntry">1</span> to <span id="endEntry">10</span> of <span id="totalEntries">50</span> entries
          </div>
          <ul class="pagination"></ul>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(dashboardContent, userRole);
  
  // ==============================================
  // STATE
  // ==============================================
  let state = {
      allKegiatan: [],
      displayKegiatan: [],
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
        if (data.status === false || data.status === "error") {
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
      tbody.innerHTML = '<tr><td colspan="7" class="text-center">Loading...</td></tr>';
      try {
          const response = await apiRequest('/kegiatan');
          const kegiatanData = response.data.data ? response.data.data : response.data;
          state.allKegiatan = kegiatanData || [];
          
          // Filter for activities waiting for Wadir approval
          state.displayKegiatan = state.allKegiatan.filter(k => 
              k.current_approval && k.current_approval.approval_level === 'Wadir' && k.current_approval.status === 'Aktif'
          );

          renderTableRows(state.displayKegiatan);
          updateStats(state.allKegiatan);
      } catch (error) {
          tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error: ${error.message}</td></tr>`;
      }
  }

  async function handleApprovalAction(kegiatanId, action) {
      const isApprove = action === 'approve';
      let payload = { status: isApprove ? 'Disetujui' : 'Revisi' };
      let confirmationMessage = ''; // Will set dynamically

      let catatan = '';

      if (isApprove) {
          // For Approve action: Prompt for "Rekomendasi Tindak Lanjut"
          catatan = prompt("Masukkan Rekomendasi Tindak Lanjut (opsional):");
          // User can click OK with empty note, or Cancel
          if (catatan === null) return; // User clicked Cancel
          payload.catatan = catatan; // Add note to payload
          confirmationMessage = 'Apakah Anda yakin ingin menyetujui kegiatan ini?';
      } else {
          // For Revise action: Prompt for "Catatan Revisi"
          catatan = prompt("Masukkan catatan untuk revisi:");
          if (catatan === null) return; // User clicked Cancel
          if (catatan.trim() === '') {
              alert("Catatan revisi tidak boleh kosong!");
              return;
          }
          payload.catatan = catatan;
          confirmationMessage = 'Apakah Anda yakin ingin meminta revisi untuk kegiatan ini?';
      }
      
      if (confirm(confirmationMessage)) {
          try {
              await apiRequest(`/kegiatan/${kegiatanId}/${action}`, {
                  method: 'POST',
                  body: JSON.stringify(payload)
              });
              alert(`Kegiatan berhasil di-${isApprove ? 'setujui' : 'revisi'}.`);
              fetchKegiatan(); // Refresh data
          } catch (error) {
              alert(`Gagal memproses aksi: ${error.message}`);
          }
      }
  }

  async function viewPpkNotes(kegiatanId) {
      try {
          const response = await apiRequest(`/kegiatan/${kegiatanId}/logs`);
          const logs = response.data.data ? response.data.data : response.data; // Handle API response structure
          
          const ppkLogs = logs.filter(log => log.actor_role === 'PPK' && log.catatan);

          let notesContent = "Tidak ada catatan dari PPK.";
          if (ppkLogs.length > 0) {
              notesContent = "Catatan dari PPK:\n\n";
              ppkLogs.forEach(log => {
                  notesContent += `- ${log.catatan} (Status: ${log.status_baru_nama})\n`;
              });
          }
          alert(notesContent);

      } catch (error) {
          alert(`Gagal mengambil catatan PPK: ${error.message}`);
      }
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
    function formatDate(dateString) {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    }

  function renderTableRows(data) {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!data || data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Tidak ada kegiatan yang menunggu persetujuan Anda.</td></tr>';
        return;
    }

    data.forEach((kegiatan) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${kegiatan.kegiatan_id}</span>
        </td>
        <td>
          <strong>${kegiatan.nama_kegiatan}</strong>
        </td>
        <td>
          <strong>${kegiatan.pengusul_nama}</strong>
          <div class="text-muted">${kegiatan.pengusul_role || ''}</div>
        </td>
        <td>
          <div class="date-text">${formatDate(kegiatan.created_at)}</div>
        </td>
        <td style="text-align: center;">
          <span class="badge bg-label-warning" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Menunggu</span>
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm me-2 btn-approve" style="background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%); box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);" data-id="${kegiatan.kegiatan_id}" title="Setujui">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
          </button>
          <button class="btn btn-sm me-2 btn-revise" style="background: linear-gradient(135deg, #743bfaff 0%, #7c3aed 100%); box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);" data-id="${kegiatan.kegiatan_id}" title="Revisi">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>          
          </button>
          <button class="btn btn-sm me-2 btn-view-ppk-notes" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);" data-id="${kegiatan.kegiatan_id}" title="Lihat Catatan PPK">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>          
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
    document.querySelectorAll(".btn-approve").forEach((btn) => {
      btn.addEventListener("click", () =>
        handleApprovalAction(btn.dataset.id, "approve")
      );
    });

    document.querySelectorAll(".btn-revise").forEach((btn) => {
      btn.addEventListener("click", () =>
        handleApprovalAction(btn.dataset.id, "revise")
      );
    });

    document.querySelectorAll(".btn-view-ppk-notes").forEach((btn) => {
      btn.addEventListener("click", function () {
        const kegiatanId = this.getAttribute("data-id");
        viewPpkNotes(kegiatanId);
      });
    });
  }

  function updateStats(allData) {
    const waitingCount = allData.filter(
      (k) =>
        k.current_approval &&
        k.current_approval.approval_level === "Wadir" &&
        k.current_approval.status === "Aktif"
    ).length;
    const acceptedCount = allData.filter((k) => {
      const wadirApproval = k.approvals?.find((a) => a.approval_level === "Wadir");
      return wadirApproval && wadirApproval.status === "Disetujui";
    }).length;

    const waitingEl = document.getElementById("waitingCount");
    const acceptedEl = document.getElementById("acceptedCount");

    if (waitingEl) waitingEl.textContent = waitingCount;
    if (acceptedEl) acceptedEl.textContent = acceptedCount;
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  fetchKegiatan();
}