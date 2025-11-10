// frontend/src/pages/Pengusul/PengajuanLpj.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderPengajuanLpjPage(userRole) {
  const pageContent = `
    <style>
      /* Only essential custom CSS that uses ID selectors or can't be done with Tailwind */
      
      /* Countdown Timer Colors - specific utility */
      .countdown-normal {
        color: #D97706;
      }
      .countdown-danger {
        color: #be123c;
      }
    </style>

    <div class="pengajuan-lpj-page">
      <!-- Main Table Card -->
      <div class="card card-datatable table-responsive p-0">
        <table class="table" style="border-collapse: separate; border-spacing: 0 1rem; padding: 0 1.5rem;">
          <thead>
            <tr>
              <th class="text-center" style="width: 50px;">
                <input type="checkbox" class="form-check-input" id="selectAll">
              </th>
              <th style="width: 80px;">No.</th>
              <th>Nama Usulan Kegiatan</th>
              <th>Tanggal</th>
              <th class="text-center">Hitung Mundur</th>
              <th class="text-center">Status</th>
              <th class="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody id="lpjTableBody">
            <!-- Data will be populated by JavaScript -->
          </tbody>
        </table>
        
        <!-- Pagination -->
        <div class="flex justify-between items-center p-6">
          <div class="text-gray-500 text-sm">
            Showing <span id="startEntry">1</span> to <span id="endEntry">10</span> of <span id="totalEntries">50</span> entries
          </div>
          <ul class="flex list-none gap-2 m-0 p-0">
            <li class="inline-block">
              <a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" id="btnFirstPage">«</a>
            </li>
            <li class="inline-block">
              <a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" id="btnPrevPage">‹</a>
            </li>
            <li class="inline-block"><a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" data-page="1">1</a></li>
            <li class="inline-block"><a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" data-page="2">2</a></li>
            <li class="inline-block active"><a class="px-3 py-2 border border-cyan-500 rounded-md text-white no-underline bg-cyan-500" href="#" data-page="3">3</a></li>
            <li class="inline-block"><a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" data-page="4">4</a></li>
            <li class="inline-block"><a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" data-page="5">5</a></li>
            <li class="inline-block"><a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" data-page="6">6</a></li>
            <li class="inline-block">
              <a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" id="btnNextPage">›</a>
            </li>
            <li class="inline-block">
              <a class="px-3 py-2 border border-gray-200 rounded-md text-gray-700 no-underline transition-all hover:bg-gray-100" href="#" id="btnLastPage">»</a>
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
      date: "29 September 2025",
      deadlineDays: 13,
      status: "Menunggu",
    },
    {
      id: 2,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      date: "",
      deadlineDays: -1,
      status: "Menunggu",
    },
    {
      id: 3,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      date: "29 September 2025",
      deadlineDays: 0,
      status: "Diajukan",
    },
    {
      id: 4,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      date: "29 September 2025",
      deadlineDays: 5,
      status: "Direvisi",
    },
    {
      id: 5,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      date: "29 September 2025",
      deadlineDays: 0,
      status: "Setor Fisik",
    },
    {
      id: 6,
      title: "KAK (Nama Kegiatan)",
      subtitle: "Pengusul",
      date: "29 September 2025",
      deadlineDays: 0,
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
      Menunggu: { class: "bg-label-warning", text: "Menunggu" },
      Diajukan: { class: "bg-label-warning", text: "Diajukan" },
      Direvisi: { class: "bg-label-info", text: "Direvisi" },
      "Setor Fisik": { class: "bg-label-danger", text: "Setor Fisik" },
      Diterima: { class: "bg-label-success", text: "Diterima" },
    };
    return statusMap[status] || statusMap["Menunggu"];
  }

  function getCountdownDisplay(days) {
    if (days > 0) {
      return `
        <span class="countdown-normal font-semibold px-2 py-1 rounded-md text-sm inline-flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          ${days} Hari 12 Jam
        </span>
      `;
    } else if (days === 0) {
      return `
        <span class="countdown-danger font-semibold px-2 py-1 rounded-md text-sm inline-flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Hari Ini
        </span>
      `;
    } else {
      const overdueDays = Math.abs(days);
      return `
        <span class="countdown-danger font-semibold px-2 py-1 rounded-md text-sm inline-flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          ${overdueDays} Hari 0 Jam
        </span>
      `;
    }
  }

  function getActionButtons(status, id) {
    switch (status) {
      case "Menunggu":
        return `
          <button class="btn btn-sm bg-cyan-500 text-white shadow-md hover:bg-cyan-600 border-0 px-4 py-2 rounded-md text-sm inline-flex items-center gap-2 transition-all hover:-translate-y-0.5" data-id="${id}" title="Edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Edit
          </button>
        `;
      case "Diajukan":
        return `
          <button class="btn btn-sm bg-gray-100 text-gray-500 shadow-sm border-0 px-4 py-2 rounded-md text-sm inline-flex items-center gap-2 cursor-not-allowed" data-id="${id}" title="Revisi" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Revisi
          </button>
        `;
      case "Direvisi":
        return `
          <button class="btn btn-sm bg-gray-100 text-gray-600 shadow-sm hover:bg-gray-200 border-0 px-4 py-2 rounded-md text-sm inline-flex items-center gap-2 transition-all hover:-translate-y-0.5" data-id="${id}" title="Revisi">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
            Revisi
          </button>
        `;
      case "Setor Fisik":
        return `
          <button class="btn btn-sm bg-cyan-500 text-white shadow-md hover:bg-cyan-600 border-0 px-4 py-2 rounded-md text-sm inline-flex items-center gap-2 transition-all hover:-translate-y-0.5" data-id="${id}" title="Upload">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload
          </button>
        `;
      case "Diterima":
        return `<span class="text-gray-400 text-sm">-</span>`;
      default:
        return "";
    }
  }

  // ==============================================
  // RENDER FUNCTIONS
  // ==============================================
  function renderTableRows() {
    const tbody = document.getElementById("lpjTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    activities.forEach((activity) => {
      const statusBadge = getStatusBadge(activity.status);
      const countdownDisplay = getCountdownDisplay(activity.deadlineDays);
      const actionButtons = getActionButtons(activity.status, activity.id);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="text-center">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span class="number-badge">${activity.id}</span>
        </td>
        <td>
          <strong>${activity.title}</strong>
          <div class="text-gray-500 text-sm">${activity.subtitle}</div>
        </td>
        <td>
          <div>${activity.date || "-"}</div>
        </td>
        <td class="text-center">
          ${countdownDisplay}
        </td>
        <td class="text-center">
          <span class="badge ${
            statusBadge.class
          }" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${
        statusBadge.text
      }</span>
        </td>
        <td class="text-center">
          ${actionButtons}
        </td>
      `;

      tbody.appendChild(row);
    });

    attachEventListeners();
    startCountdownTimers();
  }

  // ==============================================
  // COUNTDOWN TIMER
  // ==============================================
  function startCountdownTimers() {
    setInterval(() => {
      activities.forEach((activity) => {
        if (activity.deadlineDays > 0) {
          // Real countdown logic would go here
        }
      });
    }, 1000);
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

    document.querySelectorAll("button[title='Edit']").forEach((btn) => {
      btn.addEventListener("click", function () {
        alert(`Edit LPJ ID: ${this.getAttribute("data-id")}`);
      });
    });

    document
      .querySelectorAll("button[title='Revisi']:not([disabled])")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          alert(`Revisi LPJ ID: ${this.getAttribute("data-id")}`);
        });
      });

    document.querySelectorAll("button[title='Upload']").forEach((btn) => {
      btn.addEventListener("click", function () {
        alert(`Upload LPJ ID: ${this.getAttribute("data-id")}`);
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
    document.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = parseInt(this.getAttribute("data-page"));
        changePage(page);
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

    // Update active state
    document.querySelectorAll("li.inline-block").forEach((item) => {
      const link = item.querySelector("a[data-page]");
      if (link && parseInt(link.getAttribute("data-page")) === page) {
        item.classList.add("active");
        link.classList.remove(
          "border-gray-200",
          "text-gray-700",
          "hover:bg-gray-100"
        );
        link.classList.add("border-cyan-500", "text-white", "bg-cyan-500");
      } else if (link) {
        item.classList.remove("active");
        link.classList.remove("border-cyan-500", "text-white", "bg-cyan-500");
        link.classList.add(
          "border-gray-200",
          "text-gray-700",
          "hover:bg-gray-100"
        );
      }
    });

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
