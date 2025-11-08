// frontend/src/pages/Wadir/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderWadirDashboardPage(userRole) {
  const dashboardContent = `
    <div class="wadir-dashboard-page">
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
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.9;">Usulan</small>
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
                    <small style="font-size: 15px; font-weight: 500; opacity: 0.8;">Usulan</small>
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
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Pengusul</th>
              <th>Tanggal Diajukan</th>
              <th style="text-align: center;">Status</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody id="verificationTableBody">
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

  renderDashboardLayout(dashboardContent, userRole);

  // ==============================================
  // DATA
  // ==============================================
  const activities = [
    {
      id: 1,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 2,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 3,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 4,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 5,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Diterima",
    },
    {
      id: 6,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Diterima",
    },
    {
      id: 7,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 8,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 9,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Diterima",
    },
    {
      id: 10,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      proposer: "Nama Pengusul",
      unit: "himpunan /lain",
      date: "28 Desember 2025",
      status: "Diterima",
    },
  ];

  let currentPage = 3;
  const itemsPerPage = 10;

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows() {
    const tbody = document.getElementById("verificationTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    activities.forEach((activity, index) => {
      const statusClass =
        activity.status === "Menunggu"
          ? "bg-label-warning"
          : "bg-label-success";

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
          <div class="text-muted">${activity.subtitle}</div>
        </td>
        <td>
          <strong>${activity.proposer}</strong>
          <div class="text-muted">${activity.unit}</div>
        </td>
        <td>
          <div class="date-text">${activity.date}</div>
        </td>
        <td style="text-align: center;">
          <span class="badge ${statusClass}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${activity.status}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm btn-primary me-2 gap-2" data-id="${activity.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-pencil"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>
            Lanjutkan
          </button>
          <button class="btn btn-sm btn-delete" data-id="${activity.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>          
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
    // Checkbox select all
    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
      selectAll.addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(".row-checkbox");
        checkboxes.forEach((cb) => (cb.checked = this.checked));
      });
    }

    // Row checkboxes
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelectAll);
    });

    // Lanjutkan buttons
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      btn.addEventListener("click", function () {
        const activityId = this.getAttribute("data-id");
        console.log("Lanjutkan activity:", activityId);
        // Navigate to detail page or open modal
        alert(`Navigating to activity ${activityId} detail page...`);
      });
    });

    // Delete buttons
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        const activityId = this.getAttribute("data-id");
        if (confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
          console.log("Delete activity:", activityId);
          // Handle delete
          const index = activities.findIndex((a) => a.id == activityId);
          if (index !== -1) {
            activities.splice(index, 1);
            renderTableRows();
            updatePagination();
            updateStats();
          }
        }
      });
    });

    // Pagination buttons
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

    if (btnFirstPage) {
      btnFirstPage.addEventListener("click", (e) => {
        e.preventDefault();
        changePage(1);
      });
    }

    if (btnPrevPage) {
      btnPrevPage.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) changePage(currentPage - 1);
      });
    }

    if (btnNextPage) {
      btnNextPage.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(50 / itemsPerPage);
        if (currentPage < totalPages) changePage(currentPage + 1);
      });
    }

    if (btnLastPage) {
      btnLastPage.addEventListener("click", (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(50 / itemsPerPage);
        changePage(totalPages);
      });
    }
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

  function changePage(page) {
    currentPage = page;

    // Update active pagination button
    document.querySelectorAll(".pagination .page-item").forEach((item) => {
      item.classList.remove("active");
    });

    const pageLink = document.querySelector(
      `.pagination .page-link[data-page="${page}"]`
    );
    if (pageLink) {
      pageLink.closest(".page-item").classList.add("active");
    }

    updatePagination();
  }

  function updatePagination() {
    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, 50);

    const startEntryEl = document.getElementById("startEntry");
    const endEntryEl = document.getElementById("endEntry");
    const totalEntriesEl = document.getElementById("totalEntries");

    if (startEntryEl) startEntryEl.textContent = startEntry;
    if (endEntryEl) endEntryEl.textContent = endEntry;
    if (totalEntriesEl) totalEntriesEl.textContent = 50;
  }

  function updateStats() {
    const waitingCount = activities.filter(
      (a) => a.status === "Menunggu"
    ).length;
    const acceptedCount = activities.filter(
      (a) => a.status === "Diterima"
    ).length;

    const waitingEl = document.getElementById("waitingCount");
    const acceptedEl = document.getElementById("acceptedCount");

    if (waitingEl) waitingEl.textContent = waitingCount;
    if (acceptedEl) acceptedEl.textContent = acceptedCount;
  }

  // INITIALIZATION
  renderTableRows();
  updatePagination();
  updateStats();

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}
