// frontend/src/pages/Wadir/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderWadirDashboardPage(path, userRole) {
  const dashboardContent = `
    <div class="wadir-dashboard-page">
      <style>
        .video-placeholder {
          background: #000;
          border-radius: 12px;
          height: 200px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      </style>
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
              <th>No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Pengusul</th>
              <th>Tanggal Diajukan</th>
              <th>Catatan PPK</th>
              <th style="text-align: center;">Status</th>
              <th style="width: 140px; text-align: center;">Aksi</th>
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

      <!-- Video Panduan Section -->
      <div class="mt-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0">Video Panduan</h4>
          </div>
          <div class="card-body">
            <div class="row g-4" id="videoList">
               <div class="col-12 text-center text-muted py-4">Memuat video...</div>
            </div>
          </div>
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
      if (data.status === false || data.status === "error") {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  async function fetchKegiatan() {
    const tbody = document.getElementById("monitoringTableBody");
    tbody.innerHTML = window.createTableLoadingRow ? window.createTableLoadingRow(6, 'Memuat data kegiatan...') : '<tr><td colspan="6" class="text-center">Loading...</td></tr>';
    try {
      const response = await apiRequest("/kegiatan");
      const kegiatanData = response.data.data
        ? response.data.data
        : response.data;
      state.allKegiatan = kegiatanData || [];

      // Filter for activities waiting for Wadir approval
      state.displayKegiatan = state.allKegiatan.filter(
        (k) =>
          k.current_approval &&
          k.current_approval.approval_level === "Wadir2" &&
          k.current_approval.status === "Aktif"
      );
      state.displayKegiatan.sort((a, b) => a.kegiatan_id - b.kegiatan_id);

      renderTableRows(state.displayKegiatan);
      updateStats(state.allKegiatan);
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Error: ${error.message}</td></tr>`;
    }
  }

  async function handleApprovalAction(kegiatanId, action) {
    const isApprove = action === "approve";
    let payload = { status: isApprove ? "Disetujui" : "Revisi" };

    // --- Step 1: Ask for notes using SweetAlert2 ---
    const { value: catatan } = await Swal.fire({
      title: isApprove
        ? "Masukkan Rekomendasi Tindak Lanjut (Opsional)"
        : "Masukkan Catatan Revisi",
      input: "textarea",
      inputPlaceholder: isApprove
        ? "Contoh: Lanjutkan pengadaan sesuai rencana..."
        : "Contoh: Mohon perbaiki detail RAB...",
      inputValidator: (value) => {
        if (!isApprove && (!value || value.trim() === "")) {
          return "Catatan revisi tidak boleh kosong!";
        }
      },
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#00BCD4",
    });

    if (catatan === undefined) return; // User clicked Cancel

    payload.catatan = catatan;

    // --- Step 2: Confirmation Dialog ---
    const confirmResult = await Swal.fire({
      title: isApprove
        ? "Setujui kegiatan ini?"
        : "Ajukan revisi untuk kegiatan ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: isApprove ? "Setujui" : "Revisi",
      cancelButtonText: "Batal",
      confirmButtonColor: "#00BCD4",
    });

    if (!confirmResult.isConfirmed) return;

    // --- Step 3: Show loader and send request ---
    Swal.fire({
      title: isApprove ? "Menyetujui Kegiatan..." : "Mengajukan Revisi...",
      text: "Harap tunggu, sistem sedang memproses permintaan Anda.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await apiRequest(`/kegiatan/${kegiatanId}/${action}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      showSuccess(`Kegiatan berhasil di-${isApprove ? "setujui" : "revisi"}.`);
      fetchKegiatan();
    } catch (error) {
      showError(`Gagal memproses aksi: ${error.message}`);
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
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function renderTableRows(data) {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!data || data.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center">Tidak ada kegiatan yang menunggu persetujuan Anda.</td></tr>';
      return;
    }

    data.forEach((kegiatan, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <span class="number-badge">${index + 1}</span>
        </td>
        <td>
          <strong>${kegiatan.nama_kegiatan}</strong>
        </td>
        <td>
          <strong>${kegiatan.pengusul_nama}</strong>
          <div class="text-muted">${kegiatan.pengusul_role || ""}</div>
        </td>
        <td>
          <div class="date-text">${formatDate(kegiatan.created_at)}</div>
        </td>
        <td>
          <div class="text-wrap" style="max-width: 250px; font-size: 0.9em;">${kegiatan.approvals?.find(a => a.approval_level === 'PPK')?.catatan || '-'}</div>
        </td>
        <td style="text-align: center;">
          <span class="badge bg-label-warning" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Menunggu</span>
        </td>
        <td style="text-align: center;">
          <div class="dropdown">
            <button type="button" class="btn btn-text-secondary btn-icon rounded-pill dropdown-toggle hide-arrow" data-bs-toggle="dropdown" data-bs-boundary="window" data-bs-popper-config='{"strategy":"fixed"}' aria-expanded="false" style="border: 2px solid #e5e7eb; border-radius: 8px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-dark"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle><circle cx="12" cy="5" r="1"></circle></svg>
            </button>
            <div class="dropdown-menu dropdown-menu-end m-0">
              <a class="dropdown-item btn-view-detail" href="javascript:void(0);" data-id="${kegiatan.kak_id}">
                <div class="d-flex align-items-center text-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> 
                  Detail
                </div>
              </a>
              <a class="dropdown-item btn-preview-pdf" href="javascript:void(0);" data-kak-id="${kegiatan.kak_id}">
                <div class="d-flex align-items-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
                  KAK PDF
                </div>
              </a>
              ${kegiatan.surat_pengantar_path ? `
              <a class="dropdown-item btn-preview-surat" href="javascript:void(0);" data-id="${kegiatan.kegiatan_id}">
                <div class="d-flex align-items-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
                  Surat PDF
                </div>
              </a>` : ''}
              <a class="dropdown-item btn-approve" href="javascript:void(0);" data-id="${kegiatan.kegiatan_id}">
                <div class="d-flex align-items-center text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                  Setujui
                </div>
              </a>
              <a class="dropdown-item btn-revise" href="javascript:void(0);" data-id="${kegiatan.kegiatan_id}">
                <div class="d-flex align-items-center text-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> 
                  Revisi
                </div>
              </a>
              <a class="dropdown-item btn-download-pdf" href="javascript:void(0);" data-kak-id="${kegiatan.kak_id}">
                <div class="d-flex align-items-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> 
                  Unduh
                </div>
              </a>
            </div>
          </div>
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

    // --- PREVIEW SURAT BUTTON ---
    document.querySelectorAll(".btn-preview-surat").forEach((btn) => {
      btn.addEventListener("click", function() {
        const kegiatanId = this.dataset.id;
        previewSuratPengantar(kegiatanId);
      });
    });

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

  function updateStats(allData) {
    const waitingCount = allData.filter(
      (k) =>
        k.current_approval &&
        k.current_approval.approval_level === "Wadir2" &&
        k.current_approval.status === "Aktif"
    ).length;
    const acceptedCount = allData.filter((k) => {
      const wadirApproval = k.approvals?.find(
        (a) => a.approval_level === "Wadir2"
      );
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
  fetchVideos();

  async function fetchVideos() {
      try {
        // Use common dashboard endpoint like Pengusul
        const response = await apiRequest("/dashboard/video");
        if (response.success && response.data) {
            renderVideos(response.data);
        } else {
            renderVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        renderVideos([]);
      }
  }

  function renderVideos(videos) {
    const container = document.getElementById("videoList");
    if (!container) return;

    container.innerHTML = "";
    if (!videos || videos.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted py-4">Belum ada video panduan.</div>`;
        return;
    }

    videos.forEach((video) => {
        // Use path_media from database
        let videoUrl = video.path_media || video.url || '';
        let embedUrl = videoUrl;
        
        // Simple YouTube URL to Embed URL converter
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            let videoId = '';
            if (videoUrl.includes('youtube.com/watch?v=')) {
                videoId = videoUrl.split('watch?v=')[1].split('&')[0];
            } else if (videoUrl.includes('youtu.be/')) {
                videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
            } else if (videoUrl.includes('youtube.com/embed/')) {
                videoId = videoUrl.split('embed/')[1].split('?')[0];
            }
            if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

      const col = document.createElement("div");
      col.className = "col-md-4";
      
      const videoCard = document.createElement("div");
      videoCard.className = "video-placeholder";
      videoCard.style.background = "black";
      videoCard.style.position = "relative";
      
      videoCard.innerHTML = `
        <iframe src="${embedUrl}" title="${video.judul_panduan || 'Video Panduan'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute; top:0; left:0; width:100%; height:100%; border-radius: 12px;"></iframe>
      `;
      
      col.appendChild(videoCard);
      container.appendChild(col);
    });
  }
}
