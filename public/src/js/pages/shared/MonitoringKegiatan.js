// frontend/src/pages/Pengusul/MonitoringKegiatan.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderMonitoringKegiatanPage(path, userRole) {
  const pageContent = `
    <style>
      /* Clean background with image */
      .monitoring-kegiatan-page {
        background-image: url('/assets/img/backgrounds/BG.png');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        min-height: 100vh;
        padding: 2rem;
        animation: fadeIn 0.4s ease-out;
      }

      /* Info banner */
      .info-banner {
        background: white;
        color: #64748b;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-left: 4px solid #03C9D7;
        animation: slideDown 0.5s ease-out;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .info-icon {
        color: #03C9D7;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      /* Card container - Enhanced with rounded corners and proper padding */
      .card-datatable {
        background: white;
        border-radius: 18px;
        padding: 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        animation: scaleIn 0.5s ease-out;
        animation-delay: 0.1s;
        animation-fill-mode: backwards;
        transition: box-shadow 0.3s ease, transform 0.3s ease;
      }

      .card-datatable:hover {
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        transform: translateY(-2px);
      }
      
      .card-datatable .table {
        border-radius: 18px;
        overflow: hidden;
      }

      /* Table styling */
      .table {
        margin-bottom: 0;
      }

      .table thead tr th {
        background: #f8fafb;
        font-weight: 600;
        color: #475569;
        padding: 1rem 1rem;
        font-size: 0.875rem;
        border-bottom: 2px solid #e2e8f0;
        white-space: nowrap;
        animation: fadeIn 0.5s ease-out backwards;
      }

      .table thead tr th:nth-child(1) { animation-delay: 0.2s; }
      .table thead tr th:nth-child(2) { animation-delay: 0.25s; }
      .table thead tr th:nth-child(3) { animation-delay: 0.3s; }
      .table thead tr th:nth-child(4) { animation-delay: 0.35s; }

      /* Enhanced row hover effect with premium interaction */
      .table tbody tr {
        border-bottom: 1px solid #f1f5f9;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        border-left: 4px solid transparent;
        animation: slideInRight 0.5s ease-out backwards;
      }

      .table tbody tr:nth-child(1) { animation-delay: 0.4s; }
      .table tbody tr:nth-child(2) { animation-delay: 0.45s; }
      .table tbody tr:nth-child(3) { animation-delay: 0.5s; }
      .table tbody tr:nth-child(4) { animation-delay: 0.55s; }
      .table tbody tr:nth-child(5) { animation-delay: 0.6s; }

      .table tbody tr:hover {
        background-color: #f8fafc;
        transform: translateX(4px) scale(1.005);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        border-left-color: #03C9D7;
        z-index: 10;
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .table tbody tr td {
        padding: 1.25rem 1rem;
        vertical-align: middle;
        border: none;
      }

      /* Checkbox styling */
      .custom-checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #03C9D7;
        transition: transform 0.2s ease;
      }

      .custom-checkbox:hover {
        transform: scale(1.15);
      }

      .custom-checkbox:checked {
        animation: checkBounce 0.4s ease;
      }

      @keyframes checkBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }

      /* Index number */
      .index-number {
        font-weight: 600;
        color: #1e293b;
        font-size: 0.95rem;
        display: inline-block;
        transition: all 0.3s ease;
      }

      tr:hover .index-number {
        color: #03C9D7;
        transform: scale(1.1);
      }

      /* Activity name */
      .activity-name {
        font-weight: 600;
        color: #1e293b;
        font-size: 0.95rem;
        margin-bottom: 0.25rem;
        transition: all 0.3s ease;
      }

      tr:hover .activity-name {
        color: #03C9D7;
      }

      .activity-name-sub {
        font-size: 0.75rem;
        color: #94a3b8;
        transition: color 0.3s ease;
      }

      tr:hover .activity-name-sub {
        color: #64748b;
      }

      /* Bootstrap Progress Stepper */
      .stepper-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 0.5rem 0;
        min-width: 600px;
      }

      /* Stepper Item - Base */
      .stepper-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        animation: fadeIn 0.5s ease-out backwards;
      }

      .stepper-item:nth-child(1) { animation-delay: 0.05s; }
      .stepper-item:nth-child(2) { animation-delay: 0.1s; }
      .stepper-item:nth-child(3) { animation-delay: 0.15s; }
      .stepper-item:nth-child(4) { animation-delay: 0.2s; }

      /* Step Counter - Base */
      .step-counter {
        position: relative;
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #e2e8f0;
        margin-bottom: 0.5rem;
        font-weight: 700;
        font-size: 0.875rem;
        color: #94a3b8;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        animation: fadeIn 0.5s ease-out backwards;
      }
      
      /* Completed Step Enhancements */
      .stepper-item.completed .step-counter {
        background: linear-gradient(135deg, #03C9D7 0%, #02b3c4 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(3, 201, 215, 0.3);
        animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
      }
      
      /* Active Step Enhancements */
      .stepper-item.active .step-counter {
        background: white;
        border: 3px solid #03C9D7;
        color: #03C9D7;
        box-shadow: 0 0 0 0 rgba(3, 201, 215, 0.4);
        animation: pulse 2s ease-in-out infinite;
      }
      
      /* Stepper Animations */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes scaleIn {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(3, 201, 215, 0.4);
        }
        50% {
          box-shadow: 0 0 0 6px rgba(3, 201, 215, 0.1);
        }
      }

      .step-name {
        text-align: center;
        font-size: 0.75rem;
        font-weight: 600;
        color: #94a3b8;
        margin-top: 0.25rem;
        animation: fadeIn 0.6s ease-out backwards;
        animation-delay: 0.15s;
      }

      .step-date {
        text-align: center;
        font-size: 0.7rem;
        color: #cbd5e0;
        margin-top: 0.15rem;
        animation: fadeIn 0.6s ease-out backwards;
        animation-delay: 0.25s;
      }

      .stepper-item.completed .step-name,
      .stepper-item.active .step-name {
        color: #475569;
        font-weight: 700;
      }

      .stepper-item.completed .step-date {
        color: #03C9D7;
        font-weight: 600;
      }

      /* Bootstrap Progress Bar as Connector */
      .progress-connector {
        position: absolute;
        top: 22px;
        left: calc(50% + 22px);
        width: calc(100% - 44px);
        height: 4px;
        z-index: 1;
      }

      .progress-connector .progress {
        height: 100%;
        background-color: #e2e8f0;
        border-radius: 2px;
        overflow: visible;
      }

      .progress-connector .progress-bar {
        background: linear-gradient(90deg, #03C9D7 0%, #02b3c4 100%);
        transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 2px;
        position: relative;
        overflow: hidden;
      }

      .progress-connector .progress-bar::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: shimmer 2s ease-in-out infinite;
      }

      @keyframes shimmer {
        to { left: 100%; }
      }

      /* Last item - no connector */
      .stepper-item:last-child .progress-connector {
        display: none;
      }

      /* Status badge */
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.4rem 0.85rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        animation: bounceIn 0.6s ease-out backwards;
        transition: transform 0.2s ease;
      }

      .status-badge:hover {
        transform: scale(1.05);
      }

      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }

      .badge-overdue {
        background: #fee2e2;
        color: #dc2626;
      }

      .badge-on-track {
        background: #d1fae5;
        color: #059669;
      }

      /* Pagination */
      .pagination-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-top: 1px solid #f1f5f9;
        background: white;
        animation: fadeIn 0.5s ease-out;
        animation-delay: 0.7s;
        animation-fill-mode: backwards;
      }

      .pagination-info {
        color: #6B7280;
        font-size: 14px;
      }

      .pagination {
        display: flex;
        gap: 0.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .pagination .page-item {
        display: inline-block;
      }

      .pagination .page-link {
        min-width: 36px;
        height: 36px;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        border: 1px solid #E5E7EB;
        background: white;
        color: #374151;
        font-weight: 600;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }

      .pagination .page-link:hover:not(.disabled) {
        background: #F3F4F6;
        border-color: #03C9D7;
        color: #03C9D7;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(3, 201, 215, 0.2);
      }

      .pagination .page-item.active .page-link {
        background: #03C9D7;
        color: white;
        border-color: #03C9D7;
        box-shadow: 0 4px 12px rgba(3, 201, 215, 0.3);
        animation: activePagePulse 2s ease-in-out infinite;
      }

      @keyframes activePagePulse {
        0%, 100% {
          box-shadow: 0 4px 12px rgba(3, 201, 215, 0.3);
        }
        50% {
          box-shadow: 0 4px 16px rgba(3, 201, 215, 0.5);
        }
      }

      .pagination .page-item.disabled .page-link {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Empty state */
      .empty-state {
        text-align: center;
        padding: 3rem;
        color: #94a3b8;
        animation: fadeIn 0.6s ease-out;
      }

      .empty-state-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1rem;
        opacity: 0.5;
        color: #cbd5e0;
        animation: float 3s ease-in-out infinite;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      .empty-state h3 {
        color: #64748b;
        font-weight: 600;
        margin-bottom: 0.5rem;
        animation: fadeIn 0.6s ease-out;
        animation-delay: 0.2s;
        animation-fill-mode: backwards;
      }

      /* Responsive */
      @media (max-width: 1200px) {
        .stepper-wrapper {
          min-width: 500px;
        }
      }

      @media (max-width: 992px) {
        .monitoring-kegiatan-page {
          padding: 1rem;
        }

        .card-datatable {
          padding: 1rem;
        }

        .stepper-wrapper {
          flex-direction: column;
          gap: 1.5rem;
          min-width: auto;
        }

        .progress-connector {
          display: none;
        }

        .table tbody tr td {
          padding: 1rem 0.5rem;
        }

        .table tbody tr:hover {
          transform: translateY(-2px) scale(1.002);
        }
      }
    </style>

      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input custom-checkbox" id="selectAll">
              </th>
              <th style="width: 60px;">No.</th>
              <th style="min-width: 200px;">Nama Kegiatan</th>
              <th style="text-align: center; min-width: 600px;">Status</th>
            </tr>
          </thead>
          <tbody id="monitoringTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="pagination-container">
          <div class="pagination-info">
            Showing <span id="startEntry">1</span> to <span id="endEntry">10</span> of <span id="totalEntries">50</span> entries
          </div>
          <ul class="pagination" id="paginationButtons">
            <!-- Pagination buttons will be generated by JavaScript -->
          </ul>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  const user = JSON.parse(localStorage.getItem('user'));

  // ==============================================
  // API Service
  // ==============================================
  const apiService = {
    getKegiatan: async (page = 1, per_page = 10) => {
      const token = localStorage.getItem('token');
      let url = `/api/kegiatan?page=${page}&per_page=${per_page}`;

      if (userRole.toLowerCase() === 'pengusul' && user && user.id) {
        url += `&user_id=${user.id}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengambil data kegiatan.');
      }
      return response.json();
    }
  };
  
  // ==============================================
  // STATE
  // ==============================================
  let state = {
    activities: [],
    currentPage: 1,
    itemsPerPage: 10,
    totalEntries: 0,
    totalPages: 1,
    selectedItems: new Set(),
    isLoading: true,
    error: null,
  };

  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================
    
  function formatDate(dateString) {
      if (!dateString) return "-";
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
  }

  function transformApiData(apiData) {
    // Ensure apiData is an array before mapping
    if (!Array.isArray(apiData)) {
      console.warn("apiData is not an array:", apiData);
      return [];
    }
      
    const approvalStepMapping = {
      'PPK': { step: 1, dateKey: 'accPPK' },
      'Wadir2': { step: 2, dateKey: 'accWD2' },
      'Bendahara-Cair': { step: 3, dateKey: 'uangMuka' },
      'Bendahara-LPJ': { step: 4, dateKey: 'lpj' }
    };
    
    return apiData.map(item => {
        const dates = { accPPK: null, accWD2: null, uangMuka: null, lpj: null };
        const approvedSteps = [];

        item.approvals.forEach(approval => {
            if (approval.status === 'Disetujui' && approvalStepMapping[approval.approval_level]) {
                const mapping = approvalStepMapping[approval.approval_level];
                dates[mapping.dateKey] = formatDate(approval.updated_at);
                approvedSteps.push(mapping.step);
            }
        });
        
        const maxApprovedStep = approvedSteps.length > 0 ? Math.max(...approvedSteps) : 0;
        let currentStatus;

        if (item.current_approval && item.current_approval.status === 'Aktif' && approvalStepMapping[item.current_approval.approval_level]) {
            currentStatus = approvalStepMapping[item.current_approval.approval_level].step;
        } else {
            if (maxApprovedStep === 4) {
                currentStatus = 5; // All steps are completed, so status is beyond the last step
            } else {
                currentStatus = maxApprovedStep + 1;
            }
        }

        return {
            kak_id: item.kak_id,
            kegiatan_id: item.kegiatan_id,
            nama_kegiatan: item.nama_kegiatan,
            status: currentStatus,
            dates: dates,
            overdueDays: 0, // Placeholder
        };
    });
  }
  function renderStepper(item) {
    const steps = [
      { number: "01", label: "Acc PPK", date: item.dates.accPPK },
      { number: "02", label: "Acc WD2", date: item.dates.accWD2 },
      { number: "03", label: "Uang Muka", date: item.dates.uangMuka },
      { number: "04", label: "LPJ", date: item.dates.lpj }
    ];

    return `
      <div class="stepper-wrapper">
        ${steps.map((step, index) => {
          const stepNumber = index + 1;
          let stepClass = "pending";
          let progressWidth = "0%";

          if (stepNumber < item.status) {
            stepClass = "completed";
            progressWidth = "100%";
          } else if (stepNumber === item.status) {
            stepClass = "active";
            progressWidth = "0%";
          }

          return `
            <div class="stepper-item ${stepClass}">
              <div class="step-counter">
                ${stepClass === "completed" ? "✓" : step.number}
              </div>
              <div class="step-name">${step.label}</div>
              <div class="step-date">${step.date || "-"}</div>
              ${index < steps.length - 1 ? `
                <div class="progress-connector">
                  <div class="progress">
                    <div class="progress-bar ${stepClass === 'completed' ? 'animated' : ''}" 
                         role="progressbar" 
                         style="width: ${progressWidth}" 
                         aria-valuenow="${progressWidth === '100%' ? 100 : 0}" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderStatusBadge(item) {
    if (item.status === 4 && item.overdueDays > 0) {
      return `<span class="status-badge badge-overdue">${item.overdueDays} Hari</span>`;
    }
    return `<span class="status-badge badge-on-track">✓</span>`;
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows() {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) return;

    if (state.isLoading) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></td></tr>`;
      return;
    }

    if (state.error) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">${state.error}</td></tr>`;
      return;
    }

    if (state.activities.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4">
            <div class="empty-state">
              <svg class="empty-state-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <h3>Tidak ada data kegiatan</h3>
              <p>Belum ada kegiatan yang terdaftar dalam sistem</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = "";

    state.activities.forEach((item, index) => {
        const globalIndex = (state.currentPage - 1) * state.itemsPerPage + index + 1;
      const isChecked = state.selectedItems.has(item.kak_id);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input 
            type="checkbox" 
            class="form-check-input custom-checkbox row-checkbox" 
            data-id="${item.kak_id}"
            ${isChecked ? "checked" : ""}
          />
        </td>
        <td>
          <span class="index-number">${globalIndex}</span>
        </td>
        <td>
          <div class="activity-name">${item.nama_kegiatan}</div>
          <div class="activity-name-sub">Pengusul</div>
        </td>
        <td>
          ${renderStepper(item)}
        </td>
      `;

      tbody.appendChild(row);
    });

    updatePaginationInfo();
    attachEventListeners();
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================
  function attachEventListeners() {
    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        document
          .querySelectorAll(".row-checkbox")
          .forEach((cb) => {
            cb.checked = this.checked;
            const id = parseInt(cb.dataset.id);
            if (this.checked) {
              state.selectedItems.add(id);
            } else {
              state.selectedItems.delete(id);
            }
          });
      });
    }

    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", function() {
        const id = parseInt(this.dataset.id);
        if (this.checked) {
          state.selectedItems.add(id);
        } else {
          state.selectedItems.delete(id);
        }
        updateSelectAll();
      });
    });
  }

  function updateSelectAll() {
    const allCheckboxes = document.querySelectorAll(".row-checkbox");
    const checkedCount = document.querySelectorAll(
      ".row-checkbox:checked"
    ).length;
    const selectAll = document.getElementById("selectAll");

    if (selectAll) {
      selectAll.checked =
        checkedCount > 0 && checkedCount === allCheckboxes.length;
      selectAll.indeterminate =
        checkedCount > 0 && checkedCount < allCheckboxes.length;
    }
  }

  // ==============================================
  // PAGINATION
  // ==============================================
  function setupPagination() {
    const paginationContainer = document.getElementById("paginationButtons");
    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";

    const totalPages = state.totalPages;

    // Previous buttons
    const firstPageItem = document.createElement("li");
    firstPageItem.className = `page-item ${state.currentPage === 1 ? "disabled" : ""}`;
    firstPageItem.innerHTML = `<a class="page-link" href="#" id="btnFirstPage">«</a>`;
    paginationContainer.appendChild(firstPageItem);

    const prevPageItem = document.createElement("li");
    prevPageItem.className = `page-item ${state.currentPage === 1 ? "disabled" : ""}`;
    prevPageItem.innerHTML = `<a class="page-link" href="#" id="btnPrevPage">‹</a>`;
    paginationContainer.appendChild(prevPageItem);

    // Page number buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, state.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageItem = document.createElement("li");
      pageItem.className = `page-item ${i === state.currentPage ? "active" : ""}`;
      pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
      paginationContainer.appendChild(pageItem);
    }

    // Next buttons
    const nextPageItem = document.createElement("li");
    nextPageItem.className = `page-item ${state.currentPage === totalPages ? "disabled" : ""}`;
    nextPageItem.innerHTML = `<a class="page-link" href="#" id="btnNextPage">›</a>`;
    paginationContainer.appendChild(nextPageItem);

    const lastPageItem = document.createElement("li");
    lastPageItem.className = `page-item ${state.currentPage === totalPages ? "disabled" : ""}`;
    lastPageItem.innerHTML = `<a class="page-link" href="#" id="btnLastPage">»</a>`;
    paginationContainer.appendChild(lastPageItem);

    // Attach event listeners to pagination buttons
    document.querySelectorAll(".pagination .page-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");
        if (page) {
          changePage(parseInt(page));
        }
      });
    });

    const btnFirstPage = document.getElementById("btnFirstPage");
    const btnPrevPage = document.getElementById("btnPrevPage");
    const btnNextPage = document.getElementById("btnNextPage");
    const btnLastPage = document.getElementById("btnLastPage");

    if (btnFirstPage)
      btnFirstPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(1);
      });
    if (btnPrevPage)
      btnPrevPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage > 1) changePage(state.currentPage - 1);
      });
    if (btnNextPage)
      btnNextPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.currentPage < totalPages)
          changePage(state.currentPage + 1);
      });
    if (btnLastPage)
      btnLastPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(totalPages);
      });
  }

  async function changePage(page) {
    if (page < 1 || page > state.totalPages || page === state.currentPage) return;
    
    state.isLoading = true;
    state.error = null;
    renderTableRows(); // Show loader

    try {
        const result = await apiService.getKegiatan(page, state.itemsPerPage);
        state.activities = transformApiData(result.data.data);
        state.currentPage = result.pagination?.current_page || 1; // Safely access current_page
        state.totalEntries = result.pagination?.total || 0;     // Safely access total
        state.totalPages = result.pagination?.last_page || 1;   // Safely access last_page
    } catch (error) {
        state.error = error.message;
    } finally {
        state.isLoading = false;
        renderTableRows();
        setupPagination();
    }
  }

  function updatePaginationInfo() {
    const startEntry = (state.currentPage - 1) * state.itemsPerPage + 1;
    const endEntry = Math.min(
      state.currentPage * state.itemsPerPage,
      state.totalEntries
    );

    const startEntryEl = document.getElementById("startEntry");
    const endEntryEl = document.getElementById("endEntry");
    const totalEntriesEl = document.getElementById("totalEntries");

    if (startEntryEl) {
      startEntryEl.textContent = state.totalEntries > 0 ? startEntry : 0;
    }
    if (endEntryEl) {
      endEntryEl.textContent = endEntry;
    }
    if (totalEntriesEl) {
      totalEntriesEl.textContent = state.totalEntries;
    }
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  async function init() {
    state.isLoading = true;
    renderTableRows(); // Initial render with loader

    try {
        const result = await apiService.getKegiatan(state.currentPage, state.itemsPerPage);
        state.activities = transformApiData(result.data.data);
        state.totalEntries = result.pagination?.total || 0;     // Safely access total
        state.totalPages = result.pagination?.last_page || 1;   // Safely access last_page
        state.currentPage = result.pagination?.current_page || 1; // Safely access current_page
    } catch (e) {
        state.error = e.message;
    } finally {
        state.isLoading = false;
        renderTableRows();
        setupPagination();
    }

    if (window.Helpers) {
        window.Helpers.init();
    }
  }

  init();
}