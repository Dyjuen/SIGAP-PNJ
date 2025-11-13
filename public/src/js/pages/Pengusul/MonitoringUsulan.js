// frontend/src/pages/Pengusul/MonitoringUsulan.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderMonitoringUsulanPage(path, userRole) {
  const pageContent = `
    <style>
      /* Import existing CSS styles - assuming they're in a global stylesheet */
      /* Only add page-specific styles that don't exist yet */
      
      /* Pagination - specific to this page */
      .pagination-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
      }
      .pagination-info {
        color: #6B7280;
        font-size: 14px;
      }
      .pagination {
        display: flex;
        list-style: none;
        gap: 0.5rem;
        margin: 0;
        padding: 0;
      }
      .pagination .page-item {
        display: inline-block;
      }
      .pagination .page-link {
        padding: 0.5rem 0.75rem;
        border: 1px solid #E5E7EB;
        border-radius: 6px;
        color: #374151;
        text-decoration: none;
        transition: all 0.2s;
      }
      .pagination .page-link:hover {
        background: #F3F4F6;
      }
      .pagination .page-item.active .page-link {
        background: #00BCD4;
        color: white;
        border-color: #00BCD4;
      }

      /* Button variants if not already in global CSS */
      .btn-revisi {
        background: linear-gradient(135deg, #743bfaff 0%, #7c3aed 100%) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
      }
      .btn-download {
        background: linear-gradient(135deg, #743bfaff 0%, #7c3aed 100%) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
        padding: 0.5rem 1rem !important;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .btn-view {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
        color: white !important;
        box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3) !important;
      }
    </style>

    <div class="monitoring-usulan-page">
      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Tanggal Diajukan</th>
              <th>Tanggal Disetujui</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
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
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" id="btnFirstPage">«</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" id="btnPrevPage">‹</a>
            </li>
            <li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="2">2</a></li>
            <li class="page-item active"><a class="page-link" href="#" data-page="3">3</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="4">4</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="5">5</a></li>
            <li class="page-item"><a class="page-link" href="#" data-page="6">6</a></li>
            <li class="page-item">
              <a class="page-link" href="#" id="btnNextPage">›</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" id="btnLastPage">»</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;

  renderDashboardLayout(pageContent, userRole);

  // ==============================================
  // DATA
  // ==============================================
  const activities = [
    {
      id: 1,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Diajukan",
    },
    {
      id: 2,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Direvisi",
    },
    {
      id: 3,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Diajukan",
    },
    {
      id: 4,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Diajukan",
    },
    {
      id: 5,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Diterima",
    },
    {
      id: 6,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Ditolak",
    },
    {
      id: 7,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Diajukan",
    },
    {
      id: 8,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Draft",
    },
    {
      id: 9,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Diterima",
    },
    {
      id: 10,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      dateSubmitted: "29 September 2025",
      dateApproved: "28 Desember 2025",
      status: "Diterima",
    },
  ];

  let currentPage = 3;
  const itemsPerPage = 10;

  // ==============================================
  // HELPER FUNCTIONS
  // ==============================================
  function getStatusBadge(status) {
    const statusMap = {
      Diajukan: { class: "bg-label-warning", text: "Diajukan" },
      Direvisi: { class: "bg-label-info", text: "Direvisi" },
      Diterima: { class: "bg-label-success", text: "Diterima" },
      Ditolak: { class: "bg-label-danger", text: "Ditolak" },
      Draft: { class: "bg-label-secondary", text: "Draft" },
    };
    return statusMap[status] || statusMap["Draft"];
  }

  function getActionButtons(status, id) {
    switch (status) {
      case "Diajukan":
        return `
          <button class="btn btn-sm btn-edit-profile me-2" data-id="${id}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button class="btn btn-sm btn-delete" data-id="${id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        `;
      case "Direvisi":
        return `
          <button class="btn btn-sm btn-revisi me-2" data-id="${id}" title="Revisi">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button class="btn btn-sm btn-delete" data-id="${id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        `;
      case "Diterima":
        return `
          <button class="btn btn-sm btn-download" data-id="${id}" title="Download PDF">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
            Download PDF
          </button>
        `;
      case "Ditolak":
        return `
          <button class="btn btn-sm btn-edit-profile me-2" data-id="${id}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button class="btn btn-sm btn-delete" data-id="${id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        `;
      case "Draft":
        return `
          <button class="btn btn-sm btn-edit-profile me-2" data-id="${id}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button class="btn btn-sm btn-delete" data-id="${id}" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
          </button>
        `;
      default:
        return "";
    }
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows() {
    const tbody = document.getElementById("monitoringTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    activities.forEach((activity) => {
      const statusBadge = getStatusBadge(activity.status);
      const actionButtons = getActionButtons(activity.status, activity.id);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${activity.id}</span>
        </td>
        <td>
          <strong>${activity.title}</strong>
          <div class="text-muted small">${activity.subtitle}</div>
        </td>
        <td>
          <div>${activity.dateSubmitted}</div>
        </td>
        <td>
          <div>${activity.dateApproved}</div>
        </td>
        <td style="text-align: center;">
          <span class="badge ${statusBadge.class}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${statusBadge.text}</span>
        </td>
        <td style="text-align: center;">
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
    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        document
          .querySelectorAll(".row-checkbox")
          .forEach((cb) => (cb.checked = this.checked));
      });
    }

    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelectAll);
    });

    document
      .querySelectorAll(".btn-edit-profile, .btn-revisi")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          showInfo(`Edit kegiatan ID: ${this.getAttribute("data-id")}`);
        });
      });

        // Delete buttons
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async function () {
        const activityId = this.getAttribute("data-id");

        // Use SweetAlert2 confirmAction (from alerts.js)
        const confirmed = await confirmAction(
          "Yakin ingin menghapus?",
          `Kegiatan dengan ID ${activityId} akan dihapus secara permanen.`
        );

        if (confirmed) {
          // Example: show info or perform actual delete
          showSuccess(`Berhasil menghapus kegiatan ID: ${activityId}`);
        }
      });
    });

    document.querySelectorAll(".btn-download").forEach((btn) => {
      btn.addEventListener("click", function () {
        showInfo(`Download PDF kegiatan ID: ${this.getAttribute("data-id")}`);
      });
    });

    setupPagination();
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
    document.querySelectorAll(".pagination .page-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-page");
        if (page) changePage(parseInt(page));
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
        if (currentPage > 1) changePage(currentPage - 1);
      });
    if (btnNextPage)
      btnNextPage.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(50 / itemsPerPage);
        if (currentPage < totalPages) changePage(currentPage + 1);
      });
    if (btnLastPage)
      btnLastPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(Math.ceil(50 / itemsPerPage));
      });
  }

  function changePage(page) {
    currentPage = page;
    document
      .querySelectorAll(".pagination .page-item")
      .forEach((item) => item.classList.remove("active"));
    const pageLink = document.querySelector(
      `.pagination .page-link[data-page="${page}"]`
    );
    if (pageLink) pageLink.closest(".page-item").classList.add("active");
    updatePagination();
  }

  function updatePagination() {
    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, 50);

    document.getElementById("startEntry").textContent = startEntry;
    document.getElementById("endEntry").textContent = endEntry;
    document.getElementById("totalEntries").textContent = 50;
  }

  // ==============================================
  // INITIALIZATION
  // ==============================================
  renderTableRows();
  updatePagination();

  if (window.Helpers) {
    window.Helpers.init();
  }
}
