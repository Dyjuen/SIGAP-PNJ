// frontend/src/pages/Bendahara/MonitorLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderDaftarLpjPage(userRole) {
  const pageContent = `
    <div class="daftar-lpj-page">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Card Semua -->
        <div class="stat-card stat-card-active rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl" data-status="all">
          <div class="flex flex-col">
            <span class="text-sm font-medium opacity-90 mb-2">Usulan</span>
            <h4 class="text-lg font-bold mb-1">Semua</h4>
            <h1 class="text-5xl font-bold number-badge" id="count-all">0</h1>
          </div>
        </div>
        <!-- Card Menunggu -->
        <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl" data-status="Menunggu">
          <div class="flex flex-col">
            <span class="text-sm font-medium opacity-90 mb-2">Usulan</span>
            <h4 class="text-lg font-bold mb-1">Menunggu</h4>
            <h1 class="text-5xl font-bold number-badge" id="count-menunggu">0</h1>
          </div>
        </div>
        <!-- Card Revisi -->
        <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl" data-status="Revisi">
          <div class="flex flex-col">
            <span class="text-sm font-medium opacity-70 mb-2">Usulan</span>
            <h4 class="text-lg font-bold mb-1">Revisi</h4>
            <h1 class="text-5xl font-bold number-badge" id="count-revisi">0</h1>
          </div>
        </div>
        <!-- Card Setor Fisik -->
        <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl" data-status="Setor Fisik">
          <div class="flex flex-col">
            <span class="text-sm font-medium opacity-70 mb-2">Usulan</span>
            <h4 class="text-lg font-bold mb-1">Setor Fisik</h4>
            <h1 class="text-5xl font-bold number-badge" id="count-setor-fisik">0</h1>
          </div>
        </div>
        <!-- Card Menunggu LPJ -->
        <div class="stat-card stat-card-inactive rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl" data-status="Menunggu LPJ">
          <div class="flex flex-col">
            <span class="text-sm font-medium opacity-70 mb-2">Usulan</span>
            <h4 class="text-lg font-bold mb-1">Menunggu LPJ</h4>
            <h1 class="text-5xl font-bold number-badge" id="count-menunggu-lpj">0</h1>
          </div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="card-datatable">
        <div class="table-responsive">
          <table class="table" id="lpjTable">
            <thead>
              <tr>
                <th style="width: 50px;">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="selectAll">
                  </div>
                </th>
                <th style="width: 80px;">No.</th>
                <th>Nama Usulan Kegiatan</th>
                <th>Pengusul</th>
                <th>Tanggal Diajukan</th>
                <th>Status</th>
                <th style="width: 200px;">Aksi</th>
              </tr>
            </thead>
            <tbody id="lpjTableBody">
              <!-- Dummy rows will be replaced by dynamic data -->
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-6">
          <div class="text-sm" style="color: #6B7280;" id="paginationInfo">
            Showing 1 to 10 of 50 entries
          </div>
          <nav>
            <ul class="pagination mb-0" id="paginationContainer">
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);
  initializeDaftarLpj();
}

function initializeDaftarLpj() {
    const dummyData = [
        { id: 1, nama_kegiatan: "LPJ Seminar Nasional AI", pengusul: "John Doe", tanggal_diajukan: "2025-11-01", status: "Menunggu" },
        { id: 2, nama_kegiatan: "LPJ Workshop UI/UX", pengusul: "Jane Smith", tanggal_diajukan: "2025-11-02", status: "Revisi" },
        { id: 3, nama_kegiatan: "LPJ Lomba Desain Grafis", pengusul: "Peter Jones", tanggal_diajukan: "2025-11-03", status: "Setor Fisik" },
        { id: 4, nama_kegiatan: "LPJ Pameran Teknologi", pengusul: "Alice Williams", tanggal_diajukan: "2025-11-04", status: "Menunggu LPJ" },
        { id: 5, nama_kegiatan: "LPJ Hackathon 2025", pengusul: "Bob Brown", tanggal_diajukan: "2025-11-05", status: "Revisi" },
        { id: 6, nama_kegiatan: "LPJ Webinar Kewirausahaan", pengusul: "Charlie Davis", tanggal_diajukan: "2025-11-06", status: "Setor Fisik" },
        { id: 7, nama_kegiatan: "LPJ Studi Banding", pengusul: "Diana Miller", tanggal_diajukan: "2025-11-07", status: "Menunggu" },
        { id: 8, nama_kegiatan: "LPJ Bakti Sosial", pengusul: "Ethan Wilson", tanggal_diajukan: "2025-11-08", status: "Revisi" },
        { id: 9, nama_kegiatan: "LPJ Pelatihan Software", pengusul: "Fiona Taylor", tanggal_diajukan: "2025-11-09", status: "Menunggu LPJ" },
        { id: 10, nama_kegiatan: "LPJ Dies Natalis", pengusul: "George Moore", tanggal_diajukan: "2025-11-10", status: "Menunggu" },
    ];

    let state = {
        kegiatan: dummyData,
        filter: "all"
    };

    const tbody = document.getElementById("lpjTableBody");
    const statCards = document.querySelectorAll("[data-status]");

    function getStatusBadge(status) {
        const statusMap = {
            "Menunggu": "bg-label-warning",
            "Revisi": "bg-label-info",
            "Setor Fisik": "bg-label-danger",
            "Menunggu LPJ": "bg-label-secondary",
        };
        return statusMap[status] || "bg-label-dark";
    }

    function getActionButtons(status, id) {
        switch (status) {
            case "Menunggu":
            case "Revisi":
                return `
                  <div class="inline-flex gap-2">
                    <button class="btn btn-sm px-4 py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2" style="background: #8B5CF6; color: #FFFFFF; border: none;">
                      <i class="ti ti-pencil">&#xeb7d;</i> Revisi
                    </button>
                    <button class="btn btn-sm px-4 py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2" style="background: rgba(0, 188, 212, 0.1); color: #00BCD4; border: none;" onclick="window.location.href='/pengusul/usulan/${id}'">
                      <i class="ti ti-arrow-right">&#xea3c;</i> Lanjutkan
                    </button>
                  </div>`;
            case "Setor Fisik":
                return `
                  <div class="flex justify-center">
                    <button class="btn btn-sm px-4 py-2 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2" style="background: #10B981; color: #FFFFFF; border: none;">
                      <i class="ti ti-check">&#xea5e;</i> Selesai
                    </button>
                  </div>`;
            case "Menunggu LPJ":
                return `<span>-</span>`;
            default:
                return `<span>-</span>`;
        }
    }

    function renderTableRows() {
        const filteredData = state.filter === "all"
            ? state.kegiatan
            : state.kegiatan.filter(k => k.status === state.filter);

        tbody.innerHTML = "";
        if (filteredData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center">Tidak ada data untuk status ini.</td></tr>`;
            return;
        }

        filteredData.forEach((item, index) => {
            const row = document.createElement("tr");
            const statusClass = getStatusBadge(item.status);
            const actionButtons = getActionButtons(item.status, item.id);

            row.innerHTML = `
                <td>
                  <div class="form-check">
                    <input class="form-check-input row-checkbox" type="checkbox">
                  </div>
                </td>
                <td>
                  <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style="background: #F3F4F6; color: #374151;">${index + 1}</div>
                </td>
                <td>
                  <div>
                    <div class="font-semibold text-base" style="color: #374151;">${item.nama_kegiatan}</div>
                    <small class="text-sm" style="color: #9CA3AF;">Pengusul</small>
                  </div>
                </td>
                <td>
                  <div>
                    <div class="font-semibold text-sm" style="color: #374151;">${item.pengusul}</div>
                    <small class="text-xs" style="color: #9CA3AF;">himpunan /lain</small>
                  </div>
                </td>
                <td>
                  <span class="text-sm" style="color: #374151;">${item.tanggal_diajukan}</span>
                </td>
                <td>
                  <span class="badge ${statusClass} rounded-lg px-3 py-2">${item.status}</span>
                </td>
                <td>
                  ${actionButtons}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function updateStats() {
        document.getElementById('count-all').textContent = state.kegiatan.length;
        document.getElementById('count-menunggu').textContent = state.kegiatan.filter(k => k.status === 'Menunggu').length;
        document.getElementById('count-revisi').textContent = state.kegiatan.filter(k => k.status === 'Revisi').length;
        document.getElementById('count-setor-fisik').textContent = state.kegiatan.filter(k => k.status === 'Setor Fisik').length;
        document.getElementById('count-menunggu-lpj').textContent = state.kegiatan.filter(k => k.status === 'Menunggu LPJ').length;
    }

    statCards.forEach((card) => {
        card.addEventListener("click", function () {
            state.filter = this.getAttribute("data-status");
            
            statCards.forEach((c) => c.classList.replace('stat-card-active', 'stat-card-inactive'));
            this.classList.replace('stat-card-inactive', 'stat-card-active');

            renderTableRows();
        });
    });

    // Initial render
    renderTableRows();
    updateStats();
}
