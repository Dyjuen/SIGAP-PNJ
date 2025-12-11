// public/src/js/pages/shared/MonitorLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderDaftarLpjPage(path, userRole) {
  const isBendahara = userRole.toLowerCase() === "bendahara";
  const isPengusul = userRole.toLowerCase() === "pengusul";

  const bendaharaStatCards = `
    <h3 class="text-2xl font-bold mb-4">Monitoring LPJ</h3>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div class="stat-card stat-card-active rounded-xl shadow-lg p-6 cursor-pointer" data-status="all">
        <h4 class="text-lg font-bold mb-1">Semua LPJ</h4>
        <h1 class="text-5xl font-bold" id="count-all">0</h1>
      </div>
      <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer" data-status="Diajukan">
        <h4 class="text-lg font-bold mb-1">Perlu Direview</h4>
        <h1 class="text-5xl font-bold" id="count-diajukan">0</h1>
      </div>
      <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer" data-status="Setor Fisik">
        <h4 class="text-lg font-bold mb-1">Setor Fisik</h4>
        <h1 class="text-5xl font-bold" id="count-setor-fisik">0</h1>
      </div>
      <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer" data-status="Direvisi">
        <h4 class="text-lg font-bold mb-1">Direvisi</h4>
        <h1 class="text-5xl font-bold" id="count-revisi">0</h1>
      </div>
      <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer" data-status="Selesai">
        <h4 class="text-lg font-bold mb-1">Selesai</h4>
        <h1 class="text-5xl font-bold" id="count-selesai">0</h1>
      </div>
    </div>`;

  const pengusulStatCards = `
    <h3 class="text-2xl font-bold mb-4">Monitoring LPJ</h3>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="stat-card stat-card-active rounded-xl shadow-lg p-6 cursor-pointer" data-status="all">
          <h4 class="text-lg font-bold mb-1">Semua LPJ</h4>
          <h1 class="text-5xl font-bold" id="count-all">0</h1>
        </div>
        <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer" data-status="Menunggu Penyerahan">
          <h4 class="text-lg font-bold mb-1">Menunggu LPJ</h4>
          <h1 class="text-5xl font-bold" id="count-menunggu">0</h1>
        </div>
        <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer" data-status="Direvisi">
          <h4 class="text-lg font-bold mb-1">Revisi</h4>
          <h1 class="text-5xl font-bold" id="count-revisi">0</h1>
        </div>
        <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer" data-status="Setor Fisik">
          <h4 class="text-lg font-bold mb-1">Setor Fisik</h4>
          <h1 class="text-5xl font-bold" id="count-setor-fisik">0</h1>
        </div>
    </div>`;

  const pageContent = `
    <style>
      .countdown-normal { color: #D97706; }
      .countdown-danger { color: #be123c; }

      /* Search Section Styles */
      .search-section {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 1.5rem;
        animation: slideInLeft 0.4s ease-out;
      }

      .search-input-wrapper {
        position: relative;
        max-width: 500px;
      }

      .search-input-wrapper input {
        width: 100%;
        padding: 0.75rem 3rem 0.75rem 2.75rem;
        border: 2px solid #e2e8f0;
        border-radius: 0.5rem;
        font-size: 0.95rem;
        transition: all 0.3s ease;
      }

      .search-input-wrapper input:focus {
        outline: none;
        border-color: #00BCD4;
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
      }

      .search-input-wrapper .search-icon {
        position: absolute;
        left: 0.875rem;
        top: 50%;
        transform: translateY(-50%);
        color: #94a3b8;
        pointer-events: none;
      }

      .search-input-wrapper .clear-search {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 0.25rem;
        display: none;
        transition: color 0.2s ease;
      }

      .search-input-wrapper .clear-search:hover {
        color: #475569;
      }

      .search-input-wrapper.has-value .clear-search {
        display: block;
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    </style>
    <div class="daftar-lpj-page">
      <!-- Statistics Cards -->
      ${isBendahara ? bendaharaStatCards : pengusulStatCards}

      <!-- Search Section -->
      <div class="search-section">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Cari nama kegiatan atau pengusul..."
            autocomplete="off"
          />
          <button class="clear-search" id="clearSearch" title="Clear search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Table Card -->
      <div class="card-datatable">
        <div class="table-responsive">
          <table class="table" id="lpjTable">
            <thead>
              <tr>
                <th style="width: 4%; text-align: center; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">No.</th>
                <th style="width: 24%; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Nama Kegiatan</th>
                ${
                  isBendahara
                    ? '<th style="width: 18%; background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Pengusul</th>'
                    : ""
                }
                <th style="${
                  isPengusul ? "text-align: center;" : ""
                }background: #f8fafb; font-weight: 600; color: #475569; font-size: 0.875rem; border-bottom: 2px solid #e2e8f0;">Batas Waktu LPJ</th>
                <th class="text-center">Hitung Mundur</th>
                <th class="text-center">Status</th>
                <th class="text-center" style="width: 220px;">Aksi</th>
              </tr>
            </thead>
            <tbody id="lpjTableBody">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);
  initializeDaftarLpj(userRole);
}

function initializeDaftarLpj(userRole) {
  const isBendahara = userRole.toLowerCase() === "bendahara";
  const isPengusul = userRole.toLowerCase() === "pengusul";

  const state = {
    kegiatan: [],
    allKegiatan: [],
    filteredKegiatan: [],
    filter: "all",
    countdownInterval: null,
    searchQuery: "",
    searchTimeout: null,
  };

  const tbody = document.getElementById("lpjTableBody");
  const statCards = document.querySelectorAll("[data-status]");

  function showError(message) {
    Swal.fire("Error", message, "error");
  }

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
      showError(error.message);
      throw error;
    }
  }

  async function fetchData() {
    tbody.innerHTML = window.createTableLoadingRow
      ? window.createTableLoadingRow(7, "Memuat data LPJ...")
      : `<tr><td colspan="7" class="text-center">Loading...</td></tr>`;
    try {
      const user = JSON.parse(localStorage.getItem("auth_user"));
      const userIdParam = user ? `?user_id=${user.user_id}` : "";
      const response = await apiRequest(`/dashboard/lpj${userIdParam}`);
      state.kegiatan = response.data.data || [];
      state.allKegiatan = [...state.kegiatan];
      filterAndRender();
      updateStats();
      startCountdownTimers();
    } catch (error) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Gagal memuat data: ${error.message}</td></tr>`;
    }
  }

  function getStatusBadge(status) {
    const statusMap = {
      "Menunggu Penyerahan": "bg-label-secondary",
      Diajukan: "bg-label-warning",
      Direvisi: "bg-label-info",
      "Setor Fisik": "bg-label-danger",
      Selesai: "bg-label-success",
    };
    return statusMap[status] || "bg-label-dark";
  }

  function getActionButtons(item) {
    const { status_lpj: status, kegiatan_id: id, approval_status } = item;

    if (isBendahara) {
      const detailButton = `<a href="/bendahara/kegiatan/lpj/detail/${id}" data-link class="btn btn-sm btn-outline-secondary">Lihat Detail</a>`;
      switch (status) {
        case "Diajukan":
          return `
              <div class="d-flex justify-content-center gap-2">
                <a href="/bendahara/kegiatan/lpj/revisi/${id}" data-link class="btn btn-sm btn-info">Revisi</a>
                <button class="btn btn-sm btn-primary" data-action="setujui" data-id="${id}">Setujui</button>
              </div>`;
        case "Setor Fisik":
          if (approval_status === "bendahara-setor") {
            return `
                <div class="d-flex justify-content-center gap-2">
                  ${detailButton}
                  <button class="btn btn-sm btn-success" data-action="selesaikan" data-id="${id}">Setujui & Selesaikan</button>
                </div>`;
          } else {
            return `
                <div class="d-flex justify-content-center gap-2">
                  ${detailButton}
                  <button class="btn btn-sm btn-success" data-action="selesaikan" data-id="${id}">Selesaikan</button>
                </div>`;
          }
        default:
          return `<span class="text-muted">-</span>`;
      }
    } else if (isPengusul) {
      switch (status) {
        case "Menunggu Penyerahan":
          return `<a href="/pengusul/kegiatan/lpj/new?kegiatan_id=${id}" data-link class="btn btn-sm btn-primary">Submit LPJ</a>`;
        case "Direvisi":
          return `<a href="/pengusul/kegiatan/lpj/revisi/${id}" data-link class="btn btn-sm btn-warning">Kerjakan Revisi</a>`;
        case "Diajukan":
        case "Setor Fisik":
        case "Selesai":
          return `<a href="/pengusul/kegiatan/lpj/detail/${id}" data-link class="btn btn-sm btn-outline-secondary">Lihat Detail</a>`;
        default:
          return `<span class="text-muted">-</span>`;
      }
    }
    return "";
  }
  function calculateCountdown(deadline) {
    if (!deadline) return { text: "-", colorClass: "" };

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;

    if (diffTime > 0) {
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMinutes = Math.floor(
        (diffTime % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (diffDays > 0) {
        return {
          text: `${diffDays} hari ${diffHours} jam`,
          colorClass: "countdown-normal",
        };
      } else {
        return {
          text: `${diffHours} jam ${diffMinutes} menit`,
          colorClass: "countdown-normal",
        };
      }
    } else {
      const overdueTime = now - deadlineDate;
      const overdueDays = Math.floor(overdueTime / (1000 * 60 * 60 * 24));
      const overdueHours = Math.floor(
        (overdueTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      if (overdueDays > 0) {
        return { text: `-${overdueDays} hari`, colorClass: "countdown-danger" };
      } else if (overdueHours > 0) {
        return { text: `-${overdueHours} jam`, colorClass: "countdown-danger" };
      } else {
        return { text: "Baru saja", colorClass: "countdown-danger" };
      }
    }
  }

  function renderTableRows() {
    tbody.innerHTML = "";
    if (state.filteredKegiatan.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center">Tidak ada data untuk ditampilkan.</td></tr>`;
      return;
    }

    state.filteredKegiatan.forEach((item, index) => {
      const row = document.createElement("tr");
      const statusClass = getStatusBadge(item.status_lpj);
      const actionButtons = getActionButtons(item);
      const countdown = calculateCountdown(item.tgl_batas_lpj);

      const pengusulCellContent = isBendahara
        ? `
        <td>
          <div style="color: #1e293b; font-weight: 600;">${
            item.pelaksana_manual || "-"
          }</div>
          <div class="text-muted" style="font-size: 0.8125rem; margin-top: 2px;">${
            item.pengusul_nama || ""
          }</div>
        </td>`
        : "";

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>
            <strong style="color: #1e293b;">${item.nama_kegiatan}</strong>
        </td>
        ${pengusulCellContent}
        <td class="${isPengusul ? "text-center" : ""}">${
        item.tgl_batas_lpj
          ? new Date(item.tgl_batas_lpj).toLocaleDateString("id-ID")
          : "-"
      }</td>
        <td class="text-center">
            <span id="countdown-${item.kegiatan_id}" class="${
        countdown.colorClass
      } font-semibold">
              <i class="bx bx-time me-1"></i>${countdown.text}
            </span>
        </td>
        <td class="text-center">
            <span class="badge ${statusClass}">${item.status_lpj}</span>
        </td>
        <td class="text-center">${actionButtons}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function updateStats() {
    document.getElementById("count-all").textContent = state.kegiatan.length;
    if (isBendahara) {
      document.getElementById("count-diajukan").textContent =
        state.kegiatan.filter((k) => k.status_lpj === "Diajukan").length;
      document.getElementById("count-setor-fisik").textContent =
        state.kegiatan.filter((k) => k.status_lpj === "Setor Fisik").length;
      document.getElementById("count-revisi").textContent =
        state.kegiatan.filter((k) => k.status_lpj === "Direvisi").length;
      document.getElementById("count-selesai").textContent =
        state.kegiatan.filter((k) => k.status_lpj === "Selesai").length;
    } else if (isPengusul) {
      document.getElementById("count-menunggu").textContent =
        state.kegiatan.filter(
          (k) => k.status_lpj === "Menunggu Penyerahan"
        ).length;
      document.getElementById("count-revisi").textContent =
        state.kegiatan.filter((k) => k.status_lpj === "Direvisi").length;
      document.getElementById("count-setor-fisik").textContent =
        state.kegiatan.filter((k) => k.status_lpj === "Setor Fisik").length;
    }
  }

  function performSearch() {
    const query = state.searchQuery.toLowerCase().trim();

    if (!query) {
      state.kegiatan = [...state.allKegiatan];
      filterAndRender();
      return;
    }

    state.kegiatan = state.allKegiatan.filter((item) => {
      const namaKegiatan = (item.nama_kegiatan || "").toLowerCase();
      const pengusulNama = (item.pengusul_nama || "").toLowerCase();

      return namaKegiatan.includes(query) || pengusulNama.includes(query);
    });

    filterAndRender();
    updateStats();
  }

  function debounceSearch() {
    if (state.searchTimeout) {
      clearTimeout(state.searchTimeout);
    }
    state.searchTimeout = setTimeout(() => {
      performSearch();
    }, 300);
  }

  function filterAndRender() {
    let filteredData = state.kegiatan;

    if (state.filter === "all") {
      filteredData = filteredData.filter((k) => k.status_lpj !== "Selesai");
    } else {
      filteredData = filteredData.filter((k) => k.status_lpj === state.filter);
    }
    state.filteredKegiatan = filteredData;
    renderTableRows();
  }

  function startCountdownTimers() {
    if (state.countdownInterval) clearInterval(state.countdownInterval);
    state.countdownInterval = setInterval(() => {
      state.kegiatan.forEach((item) => {
        const el = document.getElementById(`countdown-${item.kegiatan_id}`);
        if (el) {
          const countdown = calculateCountdown(item.tgl_batas_lpj);
          el.textContent = countdown.text;
          el.className = `font-semibold ${countdown.colorClass}`;
        }
      });
    }, 1000 * 60); // Update every minute
  }

  statCards.forEach((card) => {
    card.addEventListener("click", function () {
      state.filter = this.getAttribute("data-status");
      statCards.forEach((c) =>
        c.classList.replace("stat-card-active", "stat-card-inactive")
      );
      this.classList.replace("stat-card-inactive", "stat-card-active");
      filterAndRender();
    });
  });

  async function approveLpj(id) {
    Swal.fire({
      title: "Setujui LPJ?",
      text: "Anda yakin ingin menyetujui LPJ ini? Proses akan dilanjutkan ke tahap berikutnya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Setujui!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiRequest(`/kegiatan/${id}/lpj/approve`, { method: "POST" });
          Swal.fire("Berhasil!", "LPJ telah disetujui.", "success");
          fetchData();
        } catch (error) {
          Swal.fire(
            "Gagal!",
            `Gagal menyetujui LPJ: ${error.message}`,
            "error"
          );
        }
      }
    });
  }

  async function completeLpj(id) {
    Swal.fire({
      title: "Setujui & Selesaikan LPJ?",
      text: "LPJ akan disetujui dan statusnya akan ditandai sebagai 'Selesai'. Anda yakin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Setujui & Selesaikan!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiRequest(`/kegiatan/${id}/lpj/complete`, { method: "POST" });
          Swal.fire(
            "Berhasil!",
            "LPJ telah disetujui dan diselesaikan.",
            "success"
          );
          fetchData();
        } catch (error) {
          Swal.fire(
            "Gagal!",
            `Gagal menyelesaikan LPJ: ${error.message}`,
            "error"
          );
        }
      }
    });
  }

  if (isBendahara) {
    tbody.addEventListener("click", async (event) => {
      const target = event.target.closest("button[data-action]");
      if (!target) return;

      const action = target.dataset.action;
      const id = target.dataset.id;

      if (action === "setujui") {
        await approveLpj(id);
      } else if (action === "selesaikan") {
        await completeLpj(id);
      }
    });
  }

  // Search event listeners
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearch");
  const searchWrapper = document.querySelector(".search-input-wrapper");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (state.searchQuery) {
        searchWrapper.classList.add("has-value");
      } else {
        searchWrapper.classList.remove("has-value");
      }
      debounceSearch();
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        state.searchQuery = "";
        searchWrapper.classList.remove("has-value");
        performSearch();
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      searchWrapper.classList.remove("has-value");
      performSearch();
      searchInput.focus();
    });
  }

  fetchData();
}
