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
          <div style="display: flex; flex-direction: column; gap: 4px; align-items: center;">
            <button class="btn btn-sm btn-view-detail" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3); width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;" data-id="${kegiatan.kak_id}" title="Lihat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>          
            </button>
            <button class="btn btn-sm btn-preview-pdf" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;" data-kak-id="${kegiatan.kak_id}" title="Lihat PDF">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" /><path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /><path d="M18.5 19.5l2.5 2.5" /></svg>
            </button>
            ${kegiatan.surat_pengantar_path ? `
            <button class="btn btn-sm btn-preview-surat" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;" data-id="${kegiatan.kegiatan_id}" title="Preview Surat Pengantar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 9l1 0" /><path d="M9 13l6 0" /><path d="M9 17l6 0" /></svg>
            </button>` : ''}
            <button class="btn btn-sm btn-approve" style="background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%); box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3); width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;" data-id="${
              kegiatan.kegiatan_id
            }" title="Setujui">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
            </button>
            <button class="btn btn-sm btn-download-pdf" style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;" data-kak-id="${kegiatan.kak_id}" title="Download PDF">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            </button>
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
