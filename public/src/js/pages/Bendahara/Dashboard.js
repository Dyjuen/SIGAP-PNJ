// frontend/src/pages/Bendahara/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderBendaharaDashboardPage(path, userRole) {
  const dashboardContent = `
    <style>
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .bendahara-dashboard-page {
        animation: fadeInUp 0.5s ease-out;
      }

      .dashboard-header {
        animation: slideInRight 0.6s ease-out;
        margin-bottom: 1.5rem;
      }

      .stat-card-active,
      .stat-card-inactive {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
      }

      .stat-card-active::before,
      .stat-card-inactive::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s;
      }

      .stat-card-active:hover::before,
      .stat-card-inactive:hover::before {
        left: 100%;
      }

      .stat-card-active {
        animation-delay: 0.1s;
      }

      .stat-card-inactive:nth-of-type(2) {
        animation-delay: 0.2s;
      }

      .stat-card-inactive:nth-of-type(3) {
        animation-delay: 0.3s;
      }

      .stat-card-inactive:nth-of-type(4) {
        animation-delay: 0.4s;
      }

      .stat-card-active:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0, 188, 212, 0.5) !important;
      }

      .stat-card-inactive:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 15px 40px rgba(0, 188, 212, 0.35);
      }

      .stat-card-active:active,
      .stat-card-inactive:active {
        transform: translateY(-5px) scale(1.01);
      }

      .card-datatable {
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.5s;
        margin-top: 0.5rem;
      }

      .table {
        margin-bottom: 0;
        border-collapse: collapse;
        width: 100%;
      }

      .table tbody tr {
        opacity: 0;
        animation: fadeInUp 0.4s ease-out forwards;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      }

      .table tbody tr td {
        padding: 1rem !important;
        vertical-align: middle !important;
        border: none !important;
      }
      .table tbody tr::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(135deg, #00BCD4, #0097A7);
        transform: scaleY(0);
        transition: transform 0.3s ease;
        border-radius: 0 4px 4px 0;
      }

      .table tbody tr:hover::before {
        transform: scaleY(1);
      }

      .table tbody tr:nth-child(1) { animation-delay: 0.6s; }
      .table tbody tr:nth-child(2) { animation-delay: 0.7s; }
      .table tbody tr:nth-child(3) { animation-delay: 0.8s; }
      .table tbody tr:nth-child(4) { animation-delay: 0.9s; }
      .table tbody tr:nth-child(5) { animation-delay: 1s; }

      .table tbody tr:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.15);
        background: #fafbfc;
      }

      .number-badge {
        transition: all 0.3s ease;
        display: inline-block;
      }

      .table tbody tr:hover .number-badge {
        transform: scale(1.1);
        background: #00BCD4 !important;
        color: white !important;
      }

      .btn {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
      }

      .btn::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .btn:hover::after {
        width: 300px;
        height: 300px;
      }

      .btn:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: 0 10px 30px rgba(0, 188, 212, 0.5);
      }

      .btn:active {
        transform: translateY(-2px) scale(1.03);
        box-shadow: 0 5px 15px rgba(0, 188, 212, 0.4);
      }

      .form-select {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .form-select:hover {
        border-color: #00BCD4;
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
      }

      .form-select:focus {
        transform: scale(1.03);
        box-shadow: 0 6px 20px rgba(0, 188, 212, 0.25);
        border-color: #00BCD4;
      }

      .form-check-input {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .form-check-input:hover {
        transform: scale(1.2);
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.2);
      }

      .badge {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }

      .badge:hover {
        transform: scale(1.1);
      }

      .counter {
        opacity: 0;
        animation: fadeInUp 0.5s ease-out forwards;
        transition: all 0.3s ease;
      }

      .counter:hover {
        transform: scale(1.1);
        color: #00BCD4;
        text-shadow: 0 0 20px rgba(0, 188, 212, 0.5);
      }

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      .card-datatable:hover {
        box-shadow: 0 12px 40px rgba(0, 188, 212, 0.2);
      }

      .pagination-container {
        transition: all 0.3s ease;
      }

      .pagination-container:hover {
        background: #f8fafb !important;
      }
      
      .table {
        width: 100%;
        border-collapse: collapse !important;
      }
      
      .table thead th {
        padding: 1rem !important;
        vertical-align: middle !important;
      }
      
      .table tbody tr {
        margin-bottom: 8px;
        display: table;
        width: 100%;
        table-layout: fixed;
      }
      
      .table thead, .table tbody {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
      
      .stat-card-filter {
        cursor: pointer;
      }
    </style>

    <div class="bendahara-dashboard-page">
      <!-- Header -->
      <div class="dashboard-header d-flex justify-content-between align-items-center">
        <h2 class="mb-0" style="font-size: 2rem; font-weight: 700; color: #1f2937;">Dashboard Bendahara</h2>
      </div>

      <!-- Stats Cards -->
      <div class="row g-4 mb-3">
        <div class="col-sm-6 col-xl">
          <div class="card stat-card-active stat-card-filter" data-filter="waiting" style="background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%) !important; color: white !important; border: none !important;">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; color: white !important;">Pencairan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600; color: white !important;">Menunggu</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2 counter" style="font-size: 44px; font-weight: 700; letter-spacing: -1px; color: white !important;" id="waitingCount" data-target="0">0</h1>
                    <small style="font-size: 15px; font-weight: 500; color: white !important;">Kegiatan</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="card stat-card-inactive stat-card-filter" data-filter="disbursed">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Pencairan</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Sudah Dicairkan</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2 counter" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="disbursedCount" data-target="0">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">Kegiatan</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="card stat-card-inactive">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Total Anggaran</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Dicairkan</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 32px; font-weight: 700; letter-spacing: -1px;" id="totalDisbursed">0</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="card stat-card-inactive">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Total Anggaran</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Belum Dicairkan</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2" style="font-size: 32px; font-weight: 700; letter-spacing: -1px;" id="totalUndisbursed">0</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl">
          <div class="card stat-card-inactive stat-card-filter" data-filter="lpj_submitted">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">LPJ</span>
                  <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Perlu Verifikasi</h4>
                  <div class="d-flex align-items-end mt-2">
                    <h1 class="mb-0 me-2 counter" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="lpjCount" data-target="0">0</h1>
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">LPJ</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Table Card -->
      <div class="card card-datatable">
        <div class="d-flex justify-content-between align-items-center px-4 pt-4 pb-3">
          <h3 class="text-xl font-bold text-gray-800 mb-0">Kegiatan Siap Dicairkan</h3>
          <div class="d-flex gap-2">
            <select id="filterStatus" class="form-select form-select-sm" style="width: 200px;">
              <option value="all">Semua Status</option>
              <option value="waiting">Menunggu Pencairan</option>
              <option value="disbursed">Sudah Dicairkan</option>
              <option value="lpj_submitted">LPJ Diajukan</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 5%; text-align: center; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th style="width: 6%; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">ID</th>
              <th style="width: 22%; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Nama Kegiatan</th>
              <th style="width: 18%; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Pengusul</th>
              <th style="width: 14%; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Uang Diminta</th>
              <th style="width: 14%; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Uang Dicairkan</th>
              <th style="width: 11%; text-align: center; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Status</th>
              <th style="width: 10%; text-align: center; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Aksi</th>
            </tr>
          </thead>
          <tbody id="disbursementTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
        </div>
        
        <!-- Pagination Container -->
        <div class="pagination-container" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-top: 1px solid #f1f5f9; background: white;">
          <div class="pagination-info" style="color: #6B7280; font-size: 14px;">
            Showing <span id="startEntry">0</span> to <span id="endEntry">0</span> of <span id="totalEntries">0</span> entries
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
    currentFilter: "all",
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
      if (data.success !== true) {
        throw new Error(data.message || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  async function fetchKegiatan() {
    const tbody = document.getElementById("disbursementTableBody");
    tbody.innerHTML =
      '<tr><td colspan="8" class="text-center">Loading...</td></tr>';
    try {
      const response = await apiRequest("/kegiatan");
      const kegiatanData = response.data.data
        ? response.data.data
        : response.data;
      state.allKegiatan = kegiatanData || [];

      applyFilter();
      updateStats(state.allKegiatan);
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-danger">Error: ${error.message}</td></tr>`;
    }
  }

  function applyFilter() {
    const filter = state.currentFilter;

    if (filter === "all") {
      // Show all activities where PPK and Wadir have approved (ready for Bendahara or already processed)
      state.displayKegiatan = state.allKegiatan.filter((k) => {
        const ppkApproval = k.approvals?.find((a) => a.approval_level === "PPK");
        const wadirApproval = k.approvals?.find((a) => a.approval_level === "Wadir2");
        return (
          ppkApproval?.status === "Disetujui" &&
          wadirApproval?.status === "Disetujui"
        );
      });
    } else if (filter === "waiting") {
      // Waiting for Disbursement: Bendahara-Cair step is Active
      state.displayKegiatan = state.allKegiatan.filter((k) => {
        return (
          k.current_approval?.approval_level === "Bendahara-Cair" &&
          k.current_approval?.status === "Aktif"
        );
      });
    } else if (filter === "disbursed") {
      // Already Disbursed: Bendahara-Cair step is Disetujui
      state.displayKegiatan = state.allKegiatan.filter((k) => {
        return k.approvals?.some(
          (a) => a.approval_level === "Bendahara-Cair" && a.status === "Disetujui"
        );
      });
    } else if (filter === "lpj_submitted") {
      // LPJ submitted, waiting for verification
      state.displayKegiatan = state.allKegiatan.filter((k) => {
        return (
          k.current_approval?.approval_level === "Bendahara-LPJ" &&
          k.current_approval?.status === "Aktif"
        );
      });
    }

    renderTableRows(state.displayKegiatan);
    updateActiveFilterVisuals();
  }

  async function handleDisbursementAction(kegiatanId) {
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

    const kegiatan = state.allKegiatan.find((k) => k.kegiatan_id == kegiatanId);
    if (!kegiatan) {
      showError("Kegiatan tidak ditemukan.");
      return;
    }

    const totalDiminta = parseFloat(kegiatan.total_anggaran_diusulkan || 0);
    const sudahDicairkan = parseFloat(kegiatan.dana_dicairkan || 0);
    const sisaDana = totalDiminta - sudahDicairkan;

    if (nominal > sisaDana) {
      showError(
        `Nominal pencairan (${formatCurrency(
          nominal
        )}) melebihi sisa dana yang tersedia (${formatCurrency(sisaDana)}).`
      );
      return;
    }

    // Step 2 — Confirmation modal
    const confirmResult = await Swal.fire({
      title: "Konfirmasi Pencairan",
      text: `Anda yakin ingin mencairkan Rp ${nominal.toLocaleString(
        "id-ID"
      )} untuk kegiatan ini?`,
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
      showSuccess(
        `Dana Rp ${nominal.toLocaleString("id-ID")} berhasil dicairkan.`
      );

      fetchKegiatan(); // Refresh data
    } catch (error) {
      showError(`Gagal mencairkan dana: ${error.message}`);
    }
  }

  async function viewDisbursementDetails(kegiatanId) {
    try {
      const response = await apiRequest(`/kegiatan/${kegiatanId}`);
      const kegiatan = response.data;

      const disbursementDate = kegiatan.disbursement_date
        ? new Date(kegiatan.disbursement_date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "-";
        
      // Check if disbursed based on approval status
      const isDisbursed = kegiatan.approvals?.some(
        (a) => a.approval_level === "Bendahara-Cair" && a.status === "Disetujui"
      );

      Swal.fire({
        title: "Detail Pencairan",
        html: `
          <div class="text-start">
            <table class="table table-borderless">
              <tr>
                <td><strong>Nama Kegiatan:</strong></td>
                <td>${kegiatan.nama_kegiatan}</td>
              </tr>
              <tr>
                <td><strong>Pengusul:</strong></td>
                <td>${kegiatan.pengusul_nama}</td>
              </tr>
              <tr>
                <td><strong>Total Anggaran:</strong></td>
                <td>${formatCurrency(
                  kegiatan.total_anggaran_diusulkan || 0
                )}</td>
              </tr>
              <tr>
                <td><strong>Tanggal Pencairan:</strong></td>
                <td>${disbursementDate}</td>
              </tr>
              <tr>
                <td><strong>Status:</strong></td>
                <td>${
                  isDisbursed
                    ? '<span class="badge bg-success">Sudah Dicairkan</span>'
                    : '<span class="badge bg-warning">Menunggu Pencairan</span>'
                }</td>
              </tr>
            </table>
          </div>
        `,
        icon: "info",
        confirmButtonText: "Tutup",
        confirmButtonColor: "#00BCD4",
      });
    } catch (error) {
      showError(`Gagal mengambil detail: ${error.message}`);
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

  function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function renderTableRows(data) {
    const tbody = document.getElementById("disbursementTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (!data || data.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="8" class="text-center">Tidak ada data kegiatan.</td></tr>';
      updatePaginationInfo(0, 0, 0);
      return;
    }

    // Update pagination info
    updatePaginationInfo(1, data.length, data.length);

    data.forEach((kegiatan) => {
      const row = document.createElement("tr");

      let statusBadge = "";
      let actionButtons = "";

      // Determine status
      const isDisbursed = kegiatan.approvals?.some(
        (a) => a.approval_level === "Bendahara-Cair" && a.status === "Disetujui"
      );
      const isLpjVerification = kegiatan.current_approval?.approval_level === "Bendahara-LPJ" &&
          kegiatan.current_approval?.status === "Aktif";

      if (isLpjVerification) {
        statusBadge =
          '<span class="badge bg-label-info" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Verifikasi LPJ</span>';
        actionButtons = `
          <a href="/bendahara/kegiatan/lpj/revisi/${kegiatan.kegiatan_id}" class="btn btn-sm me-2" style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);" title="Verifikasi LPJ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 15l2 2l4 -4" /></svg>
          </a>
        `;
      } else if (isDisbursed) {
        statusBadge =
          '<span class="badge bg-label-success" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Dicairkan</span>';
        actionButtons = `
          <a href="/bendahara/kegiatan/detail/${kegiatan.kak_id}" class="btn btn-sm me-2" style="background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%); box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);" title="Lihat Detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
          </a>
        `;
      } else {
        statusBadge =
          '<span class="badge bg-label-warning" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">Menunggu</span>';
        actionButtons = `
          <button class="btn btn-sm me-2 btn-disburse" style="background: linear-gradient(135deg, #00BCD4 0%, #0097A7 100%); box-shadow: 0 2px 8px rgba(0, 188, 212, 0.3);" data-id="${kegiatan.kegiatan_id}" title="Cairkan Dana">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-cash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="7" y="9" width="14" height="10" rx="2" /><circle cx="14" cy="14" r="2" /><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" /></svg>
          </button>
          <a href="/bendahara/kegiatan/riwayat/detail/${kegiatan.kak_id}" class="btn btn-sm me-2" style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);" title="Lihat Detail">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
          </a>
        `;
      }

      row.innerHTML = `
        <td style="width: 5%; text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td style="width: 6%;">
          <span class="number-badge" style="background: #e0f7fa; color: #00BCD4; padding: 4px 12px; border-radius: 6px; font-weight: 600; font-size: 0.875rem;">${
            kegiatan.kegiatan_id
          }</span>
        </td>
        <td style="width: 22%;">
          <strong style="color: #1e293b;">${kegiatan.nama_kegiatan}</strong>
        </td>
        <td style="width: 18%;">
          <div style="color: #1e293b; font-weight: 600;">${
            kegiatan.pelaksana_manual || "-"
          }</div>
          <div class="text-muted" style="font-size: 0.8125rem; margin-top: 2px;">${
            kegiatan.pengusul_nama || ""
          }</div>
        </td>
        <td style="width: 14%;">
          <strong style="color: #00BCD4;">${formatCurrency(
            kegiatan.total_anggaran_diusulkan || 0
          )}</strong>
        </td>
        <td style="width: 14%;">
          <strong style="color: #059669;">${formatCurrency(
            kegiatan.dana_dicairkan || 0
          )}</strong>
        </td>
        <td style="width: 11%; text-align: center;">
          ${statusBadge}
        </td>
        <td style="width: 10%; text-align: center;">
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
    document.querySelectorAll(".btn-disburse").forEach((btn) => {
      btn.addEventListener("click", () =>
        handleDisbursementAction(btn.dataset.id)
      );
    });

    document.querySelectorAll(".btn-view-detail").forEach((btn) => {
      btn.addEventListener("click", () =>
        viewDisbursementDetails(btn.dataset.id)
      );
    });

    document.querySelectorAll(".stat-card-filter").forEach((card) => {
      card.addEventListener("click", () => {
        const filterValue = card.dataset.filter;
        if (state.currentFilter === filterValue) {
          state.currentFilter = "all";
        } else {
          state.currentFilter = filterValue;
        }
        applyFilter();
      });
    });

    const filterSelect = document.getElementById("filterStatus");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        state.currentFilter = e.target.value;
        applyFilter();
      });
    }
  }

  function updateActiveFilterVisuals() {
    const filterValue = state.currentFilter;

    const filterSelect = document.getElementById("filterStatus");
    if (filterSelect) {
      filterSelect.value = filterValue;
    }

    document.querySelectorAll(".stat-card-filter").forEach((card) => {
      if (card.dataset.filter === filterValue) {
        card.classList.add("stat-card-active");
        card.classList.remove("stat-card-inactive");
      } else {
        card.classList.remove("stat-card-active");
        card.classList.add("stat-card-inactive");
      }
    });
  }

  function updateStats(allData) {
    // Waiting for disbursement: Bendahara-Cair step is Active
    const waitingCount = allData.filter((k) => {
      return (
        k.current_approval?.approval_level === "Bendahara-Cair" &&
        k.current_approval?.status === "Aktif"
      );
    }).length;

    // Already disbursed: Bendahara-Cair step is Disetujui
    const disbursedData = allData.filter((k) => {
      return k.approvals?.some(
        (a) => a.approval_level === "Bendahara-Cair" && a.status === "Disetujui"
      );
    });

    const disbursedCount = disbursedData.length;

    let totalDisbursed = 0;
    let totalUndisbursed = 0;

    allData.forEach((k) => {
      const budget = Number(k.total_anggaran_diusulkan) || 0;
      const disbursed = Number(k.dana_dicairkan) || 0;

      // Check if Done (Bendahara-Setor Disetujui)
      const isDone = k.approvals?.some(
        (a) => a.approval_level === "Bendahara-Setor" && a.status === "Disetujui"
      );

      if (isDone) {
        // If done, count full budget as disbursed and 0 as undisbursed
        totalDisbursed += budget;
      } else {
        // If not done, count actual disbursed and remaining
        totalDisbursed += disbursed;
        totalUndisbursed += Math.max(0, budget - disbursed);
      }
    });

    // LPJ submitted but not yet verified: Bendahara-LPJ step is Active
    const lpjCount = allData.filter((k) => {
      return (
        k.current_approval?.approval_level === "Bendahara-LPJ" &&
        k.current_approval?.status === "Aktif"
      );
    }).length;

    const waitingEl = document.getElementById("waitingCount");
    const disbursedEl = document.getElementById("disbursedCount");
    const totalDisbursedEl = document.getElementById("totalDisbursed");
    const totalUndisbursedEl = document.getElementById("totalUndisbursed");
    const lpjEl = document.getElementById("lpjCount");

    if (waitingEl) {
      waitingEl.setAttribute("data-target", waitingCount);
      waitingEl.textContent = "0";
    }
    if (disbursedEl) {
      disbursedEl.setAttribute("data-target", disbursedCount);
      disbursedEl.textContent = "0";
    }
    if (totalDisbursedEl)
      totalDisbursedEl.textContent = formatCurrency(totalDisbursed);
    if (totalUndisbursedEl)
      totalUndisbursedEl.textContent = formatCurrency(totalUndisbursed);
    if (lpjEl) {
      lpjEl.setAttribute("data-target", lpjCount);
      lpjEl.textContent = "0";
    }

    // Trigger counter animations
    setTimeout(() => {
      initCounters();
    }, 100);
  }

  function showError(message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      confirmButtonColor: "#00BCD4",
    });
  }

  function showSuccess(message) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  function updatePaginationInfo(start, end, total) {
    const startEl = document.getElementById("startEntry");
    const endEl = document.getElementById("endEntry");
    const totalEl = document.getElementById("totalEntries");

    if (startEl) startEl.textContent = start;
    if (endEl) endEl.textContent = end;
    if (totalEl) totalEl.textContent = total;
  }

  // ==============================================
  // ANIMATION FUNCTIONS
  // ==============================================
  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    if (isNaN(target)) return;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    setTimeout(() => {
      updateCounter();
    }, 500);
  }

  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter, index) => {
      setTimeout(() => {
        animateCounter(counter);
      }, index * 100);
    });
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  fetchKegiatan();

  setTimeout(() => {
    initCounters();
  }, 100);
}
