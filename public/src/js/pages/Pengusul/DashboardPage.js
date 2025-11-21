// frontend/src/pages/Pengusul/DashboardPage.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderPengusulDashboardPage(path, userRole) {
  const dashboardContent = `
    <style>
      /* Keyframe Animations */
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

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
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

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }

      @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(0, 188, 212, 0.2); }
        50% { box-shadow: 0 0 20px rgba(0, 188, 212, 0.6); }
      }

      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      @keyframes borderFlow {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes countUp {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* Base Styles with Animations */
      .pengusul-dashboard-page {
        animation: fadeIn 0.5s ease-out;
      }

      .template-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .template-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.1), transparent);
        transition: left 0.5s;
      }

      .template-card:hover::before {
        left: 100%;
      }

      .template-card:hover {
        border-color: #00BCD4 !important;
        box-shadow: 0 8px 24px rgba(0, 188, 212, 0.3);
        transform: translateY(-4px);
      }

      .btn-action-icon {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #00BCD4;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .btn-action-icon::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 188, 212, 0.1);
        border-radius: 50%;
        transform: scale(0);
        transition: transform 0.3s;
      }

      .btn-action-icon:hover::before {
        transform: scale(1);
      }

      .btn-action-icon:hover {
        transform: scale(1.2) rotate(5deg);
        color: #0097A7;
      }

      .btn-action-icon:active::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 188, 212, 0.3);
        border-radius: 50%;
        animation: ripple 0.6s ease-out;
      }

      /* Button Animations */
      .btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .btn:hover::before {
        width: 300px;
        height: 300px;
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 188, 212, 0.4);
      }

      .btn:active {
        transform: translateY(0);
      }

      /* Card Animations */
      .card {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        position: relative;
      }

      .card:nth-child(1) { animation-delay: 0.1s; }
      .card:nth-child(2) { animation-delay: 0.2s; }
      .card:nth-child(3) { animation-delay: 0.3s; }
      .card:nth-child(4) { animation-delay: 0.4s; }

      .card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 12px 32px rgba(0, 188, 212, 0.4);
      }

      .stat-card-active {
        position: relative;
        overflow: visible;
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.1s;
      }

      .stat-card-active:hover {
        box-shadow: 0 15px 40px rgba(0, 188, 212, 0.5);
      }

      .stat-card-active::after {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
        animation: shimmer 3s infinite;
        pointer-events: none;
        z-index: 0;
        animation-delay: 0.7s;
      }

      .stat-card-active .card-body {
        position: relative;
        z-index: 1;
      }

      .stat-card-inactive {
        position: relative;
        overflow: visible;
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
      }

      .stat-card-inactive:nth-of-type(2) {
        animation-delay: 0.2s;
      }

      .stat-card-inactive:nth-of-type(3) {
        animation-delay: 0.3s;
      }

      .stat-card-inactive:hover {
        box-shadow: 0 15px 40px rgba(0, 188, 212, 0.5);
      }

      .stat-card-inactive .card-body {
        position: relative;
        z-index: 1;
      }

      /* Number Counter Animation */
      .counter {
        opacity: 0;
        animation: countUp 0.5s ease-out forwards;
      }

      /* Video Placeholder */
      .video-placeholder {
        background: linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%);
        border-radius: 12px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }

      .video-placeholder::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, transparent 30%, rgba(0, 188, 212, 0.1) 50%, transparent 70%);
        background-size: 200% 200%;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .video-placeholder:hover::before {
        opacity: 1;
        animation: shimmer 2s ease-in-out infinite;
      }

      .video-placeholder svg {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .video-placeholder:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(0, 188, 212, 0.2);
      }

      .video-placeholder:hover svg {
        transform: scale(1.3);
        stroke: #00BCD4;
      }

      /* Table Animations */
      .monitoring-table-simple {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        opacity: 0;
        animation: fadeInUp 0.6s ease-out forwards;
        animation-delay: 0.5s;
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

      .monitoring-table-simple tbody tr {
        opacity: 0;
        animation: fadeInUp 0.4s ease-out forwards;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .monitoring-table-simple tbody tr:nth-child(1) { animation-delay: 0.6s; }
      .monitoring-table-simple tbody tr:nth-child(2) { animation-delay: 0.7s; }
      .monitoring-table-simple tbody tr:nth-child(3) { animation-delay: 0.8s; }
      .monitoring-table-simple tbody tr:nth-child(4) { animation-delay: 0.9s; }

      .monitoring-table-simple tbody tr:hover {
        background: linear-gradient(to right, #F0F9FF, transparent);
        transform: translateX(5px);
      }

      /* Status Indicator */
      .status-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
        animation: statusPulse 2s ease-in-out infinite;
      }

      .status-text {
        color: #6B7280;
        font-size: 13px;
      }

      /* Number Badge */
      .number-badge {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .monitoring-table-simple tbody tr:hover .number-badge {
        transform: scale(1.2);
      }

      /* Header Animation */
      .flex.justify-between.items-center.my-6 {
        opacity: 0;
        animation: slideInRight 0.6s ease-out forwards;
      }

      /* Template List Animation */
      #templateList > div {
        opacity: 0;
        animation: fadeInUp 0.5s ease-out forwards;
      }

      #templateList > div:nth-child(1) { animation-delay: 0.5s; }
      #templateList > div:nth-child(2) { animation-delay: 0.6s; }
      #templateList > div:nth-child(3) { animation-delay: 0.7s; }

      /* Skeleton Loading for initial state */
      @keyframes skeletonLoading {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }

      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: skeletonLoading 1.5s ease-in-out infinite;
      }

      /* Smooth transitions for all interactive elements */
      .pengusul-dashboard-page * {
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Hover effects for links */
      .pengusul-dashboard-page a {
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .pengusul-dashboard-page a::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #00BCD4;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .pengusul-dashboard-page a:hover::after {
        width: 100%;
      }

      /* Gradient Border Animation for Template Cards */
      .template-card {
        background: linear-gradient(white, white) padding-box,
                    linear-gradient(45deg, #00BCD4, #0097A7, #00BCD4) border-box;
        background-size: 200% 200%;
        border: 2px solid transparent;
      }

      .template-card:hover {
        animation: borderFlow 3s ease infinite;
      }
    </style>

    <div class="pengusul-dashboard-page">
      <!-- Header -->
      <div class="flex justify-between items-center my-6 ">
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
        <div class="card stat-card-active rounded-xl">
          <div class="card-body p-6 flex flex-col justify-between ">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs uppercase font-semibold tracking-wide opacity-90">Usulan</span>
                <h4 class="text-4xl font-semibold mt-1">Draft</h4>
              </div>
            </div>
            <div class="flex justify-end items-end">
              <h1 class="text-7xl font-bold mb-0 counter" data-target="10">0</h1>
            </div>
          </div>
        </div>

        <!-- Diajukan Card -->
        <div class="card stat-card-inactive rounded-xl">
          <div class="card-body p-6 flex flex-col justify-between">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs uppercase font-semibold tracking-wide opacity-90">Usulan</span>
                <h4 class="text-4xl font-semibold mt-1">Diajukan</h4>
              </div>
            </div>
            <div class="flex justify-end items-end">
              <h1 class="text-7xl font-bold mb-0 counter" data-target="10">0</h1>
            </div>
          </div>
        </div>

        <!-- Revisi Card -->
        <div class="card stat-card-inactive rounded-xl">
          <div class="card-body p-6 flex flex-col justify-between ">
            <div class="flex justify-between items-start mb-4">
              <div>
                <span class="text-xs uppercase font-semibold tracking-wide opacity-90">Usulan</span>
                <h4 class="text-4xl font-semibold mt-1">Revisi</h4>
              </div>
            </div>
            <div class="flex justify-end items-end">
              <h1 class="text-7xl font-bold mb-0 counter" data-target="10">0</h1>
            </div>
          </div>
        </div>
        <!-- template -->  
        <div class="">
          <div class="rounded-xl">
            <div class="w-full flex justify-between items-center">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Daftar Template</h3>
              <p class="text-sm text-gray-400 underline pr-4 mb-2">
                Lihat Semua
              </p>
            </div>
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
      <div class="mt-8" style="opacity: 0; animation: fadeInUp 0.6s ease-out forwards; animation-delay: 1s;">
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
      no: 2,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Uang Muka",
      countdown: "03",
    },
    {
      no: 3,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Uang Muka",
      countdown: "03",
    },
    {
      no: 4,
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
      no: 2,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Diajukan",
    },
    {
      no: 3,
      name: "(Nama Kegiatan)",
      subtitle: "Pengusul",
      status: "Direvisi",
    },
    {
      no: 4,
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
  // ANIMATION FUNCTIONS
  // ==============================================
  
  // Counter Animation
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
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

    // Start after a delay to match card animation
    setTimeout(() => {
      updateCounter();
    }, 500);
  }

  // Initialize all counters
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter, index) => {
      setTimeout(() => {
        animateCounter(counter);
      }, index * 100);
    });
  }

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
        <div class="flex justify-between items-center py-1 px-4 rounded-xl">
          <span class="text-cyan-400 font-medium text-md">${template.name}</span>
          <div class="flex">
            <button class="btn-action-icon" title="Preview">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button class="btn-action-icon" title="Download">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

    // Add event listeners with ripple effect
    container.querySelectorAll(".btn-action-icon").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const action = this.getAttribute("title");
        
        // Create ripple effect
        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(0, 188, 212, 0.6)";
        ripple.style.width = ripple.style.height = "100%";
        ripple.style.animation = "ripple 0.6s ease-out";
        ripple.style.pointerEvents = "none";
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
        
        // Show notification with animation
        showNotification(`${action} template`);
      });
    });
  }

  // Notification system
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #00BCD4, #0097A7);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 188, 212, 0.3);
      z-index: 10000;
      animation: slideInRight 0.5s ease-out;
      font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeInUp 0.5s ease-out reverse";
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  // Intersection Observer for scroll animations
  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements that should animate on scroll
    document.querySelectorAll(".video-placeholder").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      observer.observe(el);
    });
  }

  // Add smooth scroll behavior
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Add loading effect to buttons
  function initButtonEffects() {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        // Prevent multiple clicks
        if (this.classList.contains("loading")) return;

        // Add loading state
        this.classList.add("loading");
        const originalText = this.innerHTML;

        // Create loading spinner
        this.innerHTML = `
          <svg class="animate-spin" style="width: 20px; height: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle style="opacity: 0.25;" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path style="opacity: 0.75;" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        `;

        // Simulate action
        setTimeout(() => {
          this.innerHTML = originalText;
          this.classList.remove("loading");
        }, 1500);
      });
    });
  }

  // Add particle effect on hover for stat cards
  function initParticleEffects() {
    document.querySelectorAll(".stat-card-active").forEach((card) => {
      card.addEventListener("mouseenter", function (e) {
        createParticles(this, e);
      });
    });
  }

  function createParticles(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(0, 188, 212, 0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        animation: particle-float 1s ease-out forwards;
      `;

      // Add random direction
      const angle = (Math.PI * 2 * i) / 5;
      const distance = 50;
      particle.style.setProperty(
        "--tx",
        `${Math.cos(angle) * distance}px`
      );
      particle.style.setProperty(
        "--ty",
        `${Math.sin(angle) * distance}px`
      );

      element.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  }

  // Add particle animation keyframe
  const style = document.createElement("style");
  style.textContent = `
    @keyframes particle-float {
      to {
        transform: translate(var(--tx), var(--ty));
        opacity: 0;
      }
    }
    @keyframes animate-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: animate-spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);

  // ==============================================
  // INITIALIZATION
  // ==============================================
  renderMonitoringKegiatan();
  renderMonitoringLpj();
  renderTemplates();

  // Initialize animations after content is rendered
  setTimeout(() => {
    initCounters();
    initScrollAnimations();
    initSmoothScroll();
    initButtonEffects();
    initParticleEffects();
  }, 100);

  if (window.Helpers) {
    window.Helpers.init();
  }
}