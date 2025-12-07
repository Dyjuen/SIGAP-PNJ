// frontend/src/pages/Ppk/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderPpkDashboardPage(path, userRole) {
  const pageContent = `
    <div class="monitoring-kegiatan-page">
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
              <th>No.</th>
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
        if (data.success !== true) {
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
      tbody.innerHTML = window.createTableLoadingRow ? window.createTableLoadingRow(7, 'Memuat data kegiatan...') : '<tr><td colspan="7" class="text-center">Loading...</td></tr>';
      try {
          const response = await apiRequest('/kegiatan');
          const kegiatanData = response.data.data ? response.data.data : response.data;
          state.allKegiatan = kegiatanData || [];
          
          state.displayKegiatan = state.allKegiatan.filter(k => 
              k.current_approval && k.current_approval.approval_level === 'PPK' && k.current_approval.status === 'Aktif'
          );
          state.displayKegiatan.sort((a, b) => a.kegiatan_id - b.kegiatan_id);

          renderTableRows(state.displayKegiatan);
          updateStats(state.allKegiatan);
      } catch (error) {
          tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error: ${error.message}</td></tr>`;
      }
  }

    async function handleApproveAction(kegiatanId) {
    // ===============================
    // Step 1: Textarea input modal for optional note
    // ===============================
    const swalInput = await Swal.fire({
      title: "Masukkan Rekomendasi Tindak Lanjut (opsional)",
      input: "textarea",
      inputPlaceholder: "Tulis rekomendasi (boleh kosong)...",
      inputAttributes: {
        maxlength: 500,
        "aria-label": "Catatan",
      },
      showCancelButton: true,
      confirmButtonText: "Lanjut",
      cancelButtonText: "Batal",
      confirmButtonColor: "#00BCD4",
    });

    if (!swalInput.isConfirmed) return;

    const catatan = swalInput.value ?? "";
    
    let payload = {
      status: "Disetujui",
      catatan: catatan.trim() || null,
    };

    // ===============================
    // Step 2: Confirmation modal
    // ===============================
    const confirmResult = await Swal.fire({
      title: "Apakah Anda yakin ingin menyetujui kegiatan ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Setujui",
      cancelButtonText: "Batal",
      confirmButtonColor: "#00BCD4",
      cancelButtonColor: "#d33",
    });

    if (!confirmResult.isConfirmed) return;

    // ===============================
    // Step 3: Show loader and make API request
    // ===============================
    Swal.fire({
      title: "Menyetujui Kegiatan...",
      text: "Harap tunggu, sistem sedang memproses persetujuan.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await apiRequest(`/kegiatan/${kegiatanId}/approve`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      showSuccess(`Kegiatan berhasil disetujui.`);
      fetchKegiatan(); // Refresh data
    } catch (error) {
      showError(`Gagal menyetujui kegiatan: ${error.message}`);
    }
  }

    async function previewSuratPengantar(kegiatanId) {
      Swal.fire({
        title: "Membuka Surat Pengantar...",
        text: "Mohon tunggu sejenak.",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
        const response = await fetch(`/api/kegiatan/${kegiatanId}/surat-pengantar`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Gagal mengambil file (status: ${response.status})`);
        }

        const blob = await response.blob();
        const fileUrl = URL.createObjectURL(blob);
        
        Swal.close();
        window.open(fileUrl, '_blank');
        
        setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Membuka File',
          text: error.message
        });
      }
    }

    async function handlePdfAction(kakId, action) {
      const actionTitle = action === 'preview' ? 'Membuka Pratinjau PDF...' : 'Mengunduh PDF...';
      const errorMessage = action === 'preview' ? 'Gagal membuka pratinjau PDF' : 'Gagal mengunduh PDF';
    
      Swal.fire({
        title: actionTitle,
        text: "Sedang memproses...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
    
      try {
        // Step 1: Generate token (Required for both preview and download)
        const tokenResponse = await apiRequest(`/kak/${kakId}/generate-download-token`, {
          method: 'POST',
        });
    
        if (!tokenResponse.success) {
          throw new Error(tokenResponse.message || 'Gagal membuat token akses file');
        }
    
        const tempToken = tokenResponse.data.download_token;
        const url = `/api/kak/${kakId}${action === 'preview' ? '/preview' : ''}?t=${tempToken}`;

        if (action === 'preview') {
          // Use fetch + blob for preview to avoid showing HTML error code
          const response = await fetch(url);

          if (!response.ok) {
             const contentType = response.headers.get("content-type");
             if (contentType && contentType.indexOf("application/json") !== -1) {
                 const errorData = await response.json();
                 throw new Error(errorData.message || 'Gagal mengambil file.');
             } else {
                 throw new Error(`HTTP Error: ${response.status}`);
             }
          }

          const blob = await response.blob();
          const fileUrl = URL.createObjectURL(blob);
          
          Swal.close();
          window.open(fileUrl, '_blank');
          
          // Revoke URL after a delay
          setTimeout(() => URL.revokeObjectURL(fileUrl), 10000);

        } else {
          // Download
          Swal.close();
          setTimeout(() => {
              window.open(url, '_blank');
          }, 300);
        }
    
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: errorMessage,
          text: error.message,
        });
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

    data.forEach((kegiatan, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${index + 1}</span>
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
          ${kegiatan.surat_pengantar_path ? `
          <button class="btn btn-sm me-2 btn-preview-surat" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);" data-id="${kegiatan.kegiatan_id}" title="Preview Surat Pengantar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 9l1 0" /><path d="M9 13l6 0" /><path d="M9 17l6 0" /></svg>
          </button>` : ''}
          <button class="btn btn-sm me-2 btn-view-detail" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);" data-id="${kegiatan.kak_id}" title="Lihat">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>          
          </button>
          <button class="btn btn-sm me-2 btn-preview-pdf" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);" data-kak-id="${kegiatan.kak_id}" title="Lihat PDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" /><path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /><path d="M18.5 19.5l2.5 2.5" /></svg>
          </button>
          <button class="btn btn-sm btn-download-pdf" style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);" data-kak-id="${kegiatan.kak_id}" title="Download PDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
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

  // --- APPROVE BUTTON ---
  document.querySelectorAll(".btn-approve").forEach((btn) => {
    btn.addEventListener("click", () =>
      handleApproveAction(btn.dataset.id)
    );
  });

  // --- PREVIEW SURAT BUTTON ---
  document.querySelectorAll(".btn-preview-surat").forEach((btn) => {
    btn.addEventListener("click", function() {
      const kegiatanId = this.dataset.id;
      previewSuratPengantar(kegiatanId);
    });
  });

  // --- VIEW DETAIL BUTTON ---
      document.querySelectorAll(".btn-view-detail").forEach((btn) => {
      btn.addEventListener("click", function () {
        const kakId = this.dataset.id;
        window.location.href = `/${userRole.toLowerCase()}/kegiatan/detail/${kakId}`;
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
    const waitingCount = allData.filter(
      (k) =>
        k.current_approval &&
        k.current_approval.approval_level === "PPK" &&
        k.current_approval.status === "Aktif"
    ).length;
    const acceptedCount = allData.filter((k) => {
      const ppkApproval = k.approvals?.find((a) => a.approval_level === "PPK");
      return ppkApproval && ppkApproval.status === "Disetujui";
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
