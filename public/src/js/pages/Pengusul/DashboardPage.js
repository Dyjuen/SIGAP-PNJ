// frontend/src/pages/Pengusul/DashboardPage.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderPengusulDashboardPage(userRole) {
  const dashboardContent = `
    <style>
      /* Additional inline CSS for dashboard */
      .template-card {
        border: 2px solid #E0F2FE;
        border-radius: 12px;
        padding: 1rem;
        transition: all 0.3s ease;
        background: white;
      }
      .template-card:hover {
        border-color: #00BCD4;
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.2);
      }
      .btn-action-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #E0F2FE;
        background: white;
        color: #00BCD4;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      .btn-action-icon:hover {
        background: #E0F2FE;
        border-color: #00BCD4;
      }
      .video-placeholder {
        background: linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%);
        border-radius: 12px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .monitoring-table-simple {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
      }
      .monitoring-table-simple table {
        width: 100%;
        border-collapse: collapse;
      }
      .monitoring-table-simple th {
        color: #00BCD4;
        font-weight: 600;
        font-size: 14px;
        padding: 1rem;
        text-align: left;
        border-bottom: 2px solid #E0F2FE;
      }
      .monitoring-table-simple td {
        padding: 1rem;
        border-bottom: 1px solid #F3F4F6;
        vertical-align: middle;
      }
      .monitoring-table-simple tbody tr:hover {
        background: #F0F9FF;
      }
      .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
      }
      .status-text {
        color: #6B7280;
        font-size: 13px;
      }
    </style>

    <div class="pengusul-dashboard-page">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-4xl font-bold text-gray-800">Monitoring Usulan Kegiatan</h2>
        <div class="flex gap-3">
          <button class="btn btn-tambah-akun inline-flex items-center gap-2 px-4 py-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Usulan
          </button>
          <button class="btn btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Ajukan Kegiatan
          </button>
        </div>
      </div>

      <!-- Stat Cards & template-->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <!-- Draft Card -->
        <div class="card stat-card-active">
          <div class="card-body p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs uppercase font-semibold tracking-wide opacity-90">Usulan</span>
                <h4 class="text-lg font-semibold mt-1">Draft</h4>
              </div>
            </div>
            <div class="flex items-end">
              <h1 class="text-5xl font-bold mb-0">10</h1>
            </div>
          </div>
        </div>

        <!-- Diajukan Card -->
        <div class="card stat-card-inactive">
          <div class="card-body p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs uppercase font-semibold tracking-wide opacity-90">Usulan</span>
                <h4 class="text-lg font-semibold mt-1">Diajukan</h4>
              </div>
            </div>
            <div class="flex items-end">
              <h1 class="text-5xl font-bold mb-0">10</h1>
            </div>
          </div>
        </div>

        <!-- Revisi Card -->
        <div class="card stat-card-inactive">
          <div class="card-body p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs uppercase font-semibold tracking-wide opacity-90">Usulan</span>
                <h4 class="text-lg font-semibold mt-1">Revisi</h4>
              </div>
            </div>
            <div class="flex items-end">
              <h1 class="text-5xl font-bold mb-0">10</h1>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-bold text-gray-800 mb-4">Daftar Template</h3>
            <div class="space-y-3" id="templateList">
              <!-- Will be populated by JS -->
            </div>
          </div>
        </div>

      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column - Tables -->
          <!-- Monitoring Kegiatan -->
          <div class="monitoring-table-simple">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold text-gray-800">Monitoring Kegiatan</h3>
              <a href="#" class="text-cyan-500 text-sm hover:underline">Lihat Semua</a>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width: 60px;">No.</th>
                  <th>Nama Kegiatan</th>
                  <th style="width: 150px;">Status Saat Ini</th>
                </tr>
              </thead>
              <tbody id="monitoringKegiatanTable">
                <!-- Will be populated by JS -->
              </tbody>
            </table>
          </div>

          <!-- Monitoring LPJ -->
          <div class="monitoring-table-simple">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold text-gray-800">Monitoring LPJ</h3>
              <a href="#" class="text-cyan-500 text-sm hover:underline">Lihat Semua</a>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width: 60px;">No.</th>
                  <th>Nama Kegiatan</th>
                  <th style="width: 150px;">Status Saat Ini</th>
                </tr>
              </thead>
              <tbody id="monitoringLpjTable">
                <!-- Will be populated by JS -->
              </tbody>
            </table>
          </div>
      </div>

      <!-- Video Panduan Section -->
      <div class="mt-8">
        <div class="bg-white rounded-xl p-6 shadow-sm">
          <h3 class="text-2xl font-bold text-gray-800 mb-2">Video Panduan</h3>
          <p class="text-gray-500 mb-6">Panduan dalam menggunakan SIGAP</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="video-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="video-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="video-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(dashboardContent, userRole);

  // ==============================================
  // DATA
  // ==============================================
  const monitoringKegiatanData = [
    {
      no: 1,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Uang Muka",
      countdown: "03",
    },
    {
      no: 1,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Uang Muka",
      countdown: "03",
    },
    {
      no: 1,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Uang Muka",
      countdown: "03",
    },
    {
      no: 1,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Uang Muka",
      countdown: "03",
    },
  ];

  const monitoringLpjData = [
    {
      no: 1,
      name: "(Nama Kegiatan yang PANJANG)",
      subtitle: "Pengusul",
      status: "Menunggu",
      detail: "11 jam 10 menit",
    },
    {
      no: 1,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Diajukan",
    },
    {
      no: 1,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Direvisi",
    },
    {
      no: 1,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Setor Fisik",
    },
  ];

  const templates = [
    { name: "Template LPJ Lomba", icon: "eye" },
    { name: "Template LPJ Lomba", icon: "eye" },
    { name: "Template LPJ Lomba", icon: "eye" },
  ];

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderMonitoringKegiatan() {
    const tbody = document.getElementById("monitoringKegiatanTable");
    if (!tbody) return;

    tbody.innerHTML = "";
    monitoringKegiatanData.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <span class="number-badge">${item.no}</span>
        </td>
        <td>
          <div class="font-semibold text-gray-800">${item.name}</div>
          <div class="text-sm text-cyan-500">${item.subtitle}</div>
        </td>
        <td>
          <div class="flex items-center">
            <span class="status-indicator bg-cyan-500"></span>
            <div>
              <div class="status-text font-semibold text-gray-700">${item.countdown}</div>
              <div class="status-text">${item.status}</div>
            </div>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderMonitoringLpj() {
    const tbody = document.getElementById("monitoringLpjTable");
    if (!tbody) return;

    tbody.innerHTML = "";
    monitoringLpjData.forEach((item) => {
      const statusColors = {
        Menunggu: "text-orange-600",
        Diajukan: "text-orange-600",
        Direvisi: "text-blue-600",
        "Setor Fisik": "text-red-600",
      };
      const statusColor = statusColors[item.status] || "text-gray-600";

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <span class="number-badge">${item.no}</span>
        </td>
        <td>
          <div class="font-semibold text-gray-800">${item.name}</div>
          <div class="text-sm text-cyan-500">${item.subtitle}</div>
        </td>
        <td>
          <div class="font-semibold ${statusColor}">${item.status}</div>
          ${
            item.detail
              ? `<div class="text-xs text-gray-500">${item.detail}</div>`
              : ""
          }
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderTemplates() {
    const container = document.getElementById("templateList");
    if (!container) return;

    container.innerHTML = "";
    templates.forEach((template) => {
      const templateCard = document.createElement("div");
      templateCard.className = "template-card";
      templateCard.innerHTML = `
        <div class="flex justify-between items-center">
          <span class="text-cyan-500 font-medium text-sm">${template.name}</span>
          <div class="flex gap-2">
            <button class="btn-action-icon" title="Preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button class="btn-action-icon" title="Download">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>
      `;
      container.appendChild(templateCard);
    });

    // Add event listeners
    container.querySelectorAll(".btn-action-icon").forEach((btn) => {
      btn.addEventListener("click", function () {
        const action = this.getAttribute("title");
        alert(`${action} template`);
      });
    });
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  renderMonitoringKegiatan();
  renderMonitoringLpj();
  renderTemplates();

  if (window.Helpers) {
    window.Helpers.init();
  }
}
