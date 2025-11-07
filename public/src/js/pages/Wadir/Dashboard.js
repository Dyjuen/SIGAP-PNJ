// frontend/src/pages/Wadir/Dashboard.js
import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderWadirDashboardPage(userRole) {
  const dashboardContent = `
    <div class="wadir-dashboard-page">
      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table">
          <thead>
            <tr>
              <th style="width: 50px; text-align: center;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th>No.</th>
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
      const statusClass = activity.status === "Menunggu" ? "bg-label-warning" : "bg-label-success";

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
          <span class="badge ${statusClass}">${activity.status}</span>
        </td>
        <td style="text-align: center;">
          <button class="btn btn-sm btn-primary me-2" data-id="${activity.id}">
            <i class="ti me-1">&#xeb8b;</i> Lanjutkan
          </button>
          <button class="btn btn-sm btn-delete" data-id="${activity.id}">
            <i class="ti">&#xeb55;</i>
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

  // ==============================================
  // INITIALIZATION
  // ==============================================
  renderTableRows();
  updatePagination();

  // Initialize Vuexy menu if available
  if (window.Helpers) {
    window.Helpers.init();
  }
}
