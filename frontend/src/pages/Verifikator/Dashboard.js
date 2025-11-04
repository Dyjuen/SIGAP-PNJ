// frontend/src/pages/verifikator/DashboardVerifikator.js

import { renderDashboardLayout } from "../../layout/AppLayout.js";

export function renderDashboardVerifikator(userRole) {
  const pageContent = `
    <style>
      /* --- Custom CSS for Figma Design --- */
      
      /* 1. Main Background */
      .layout-wrapper {
        background-image: url('/assets/img/backgrounds/BG.png') !important;
        background-size: cover !important;
        background-position: center !important;
      }
      .content-wrapper {
        background: transparent !important;
      }
      /* Navbar, Footer, Menu tetap solid */
      .layout-navbar, .content-footer, .layout-menu {
        background: #FFFFFF !important;
      }

      /* 2. Sidebar */
      .app-brand-text {
        color: #00BCD4 !important;
        font-size: 20px !important;
        font-weight: 700 !important;
      }
      .menu-inner .menu-item.active > .menu-link {
        background: #00BCD4 !important;
        color: #ffffff !important;
        border-radius: 8px;
        margin: 0 0.5rem;
        backdrop-filter: blur(5px);
      }
      .menu-inner .menu-item.active > .menu-link i,
      .menu-inner .menu-item.active > .menu-link div {
        color: #ffffff !important;
      }
      
      /* 3. Stat Cards (Efek Kaca/Glassmorphism) */
      .stat-card-active {
        transition: all 0.4s ease;
        background: linear-gradient(135deg, #4dd0e1 0%, #00bcd4 100%) !important;
        color: #FFFFFF !important;
        backdrop-filter: blur(10px);
        border: 2px solid transparent !important;
      }
      .stat-card-active h1, .stat-card-active h4, .stat-card-active span, .stat-card-active small {
        color: #FFFFFF !important;
      }
      
      .stat-card-active:hover {
        transition: all 0.4s ease;
        transform: translateY(-5px);
      }
      
      .stat-card-inactive {
        transition: all 0.4s ease;
        background: rgba(255, 255, 255, 0.6) !important;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(224, 247, 250, 0.6) !important;
        color: #00bcd4 !important;
      }
      .stat-card-inactive h1, .stat-card-inactive h4, .stat-card-inactive span, .stat-card-inactive small {
        color: #00bcd4 !important;
      }

      .stat-card-inactive:hover {
        transition: all 0.4s ease;
        transform: translateY(-5px);
      }

      /* 4. Table Styling (Card Rows + Efek Kaca) */
      .card-datatable {
        background: rgba(255, 255, 255, 0.6) !important;
        backdrop-filter: blur(10px);
        border-radius: 0.875rem !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
        padding: 1.5rem;
      }
      .table {
        border-collapse: separate !important;
        border-spacing: 0 1rem !important;
      }
      .table thead {
        background: transparent !important; 
      }
      .table thead th {
        color: #6B7280 !important;
        font-weight: 500 !important;
        background: transparent !important;
        border: none !important;
        text-transform: none !important;
        font-size: 14px !important;
        padding-top: 0 !important;
        padding-bottom: 0.5rem !important;
      }
      .table tbody tr {
        background: #FFFFFF !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
        transition: all 0.2s ease;
      }
      .table tbody tr:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.08) !important;
      }
      .table tbody td {
        border: none !important;
        padding: 1.25rem 1rem !important;
        vertical-align: middle;
      }
      .table tbody td:first-child {
        border-top-left-radius: 12px;
        border-bottom-left-radius: 12px;
      }
      .table tbody td:last-child {
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
      }
      
      /* 5. Custom Checkbox */
      .form-check-input {
        border-radius: 6px !important;
        border: 2px solid #D1D5DB !important;
      }
      .form-check-input:checked {
        background-color: #33C8DA !important;
        border-color: #33C8DA !important;
      }
      
      /* 6. Aksi Buttons */
      .btn-revisi {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important; 
        color: white !important;
        box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3) !important;
      }
      .btn-delete {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important; 
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3) !important;
        color: white !important;
      }
      
      /* 7. Icon Styling */
      i.ti {
        background: none !important;
        display: inline-block;
        color: inherit !important;
        font-style: normal !important;
        font-size: 24px !important;
      }

      .menu-icon i,
      .navbar-nav i.ti {
        font-size: 35px !important;
        vertical-align: middle !important;
      }

      .menu-link i {
        margin-right: 10px !important;
      }
      
      /* 8. Container */
      .container-xxl {
        max-width: 96% !important;
      }

      .nav-item i.ti {
        font-size: 24px !important;
      }

      .btn-primary {
        background: #00bcd4 !important;
        color: white !important;
      }

      .btn-primary:hover {
        background: #0097A7 !important;
      }

      /* 9. Pagination Styling */
      .pagination .page-item.active .page-link {
        background: #00BCD4 !important;
        border-color: #00BCD4 !important;
        color: white !important;
      }
      .pagination .page-link {
        color: #6B7280 !important;
        border: 1px solid #E5E7EB !important;
        border-radius: 6px !important;
        margin: 0 4px !important;
        padding: 8px 14px !important;
      }
      .pagination .page-link:hover {
        background: #E0F7FA !important;
        color: #00BCD4 !important;
      }
      .pagination .page-item.disabled .page-link {
        background: #F9FAFB !important;
        color: #D1D5DB !important;
      }

      /* 10. Badge Colors */
      .badge.bg-warning {
        background: #FEF3C7 !important;
        color: #92400E !important;
      }
      .badge.bg-info {
        background: #DBEAFE !important;
        color: #1E40AF !important;
      }
      .badge.bg-success {
        background: #D1FAE5 !important;
        color: #065F46 !important;
      }
    </style>

    <div class="monitoring-usulan-page">
        <div class="row g-4 mb-4">
            <div class="col-sm-6 col-xl-6">
                <div class="card stat-card-active">
                <div class="card-body">
                    <div class="d-flex align-items-start justify-content-between">
                    <div class="content-left">
                        <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Usulan</span>
                        <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Menunggu</h4>
                        <div class="d-flex align-items-end mt-2">
                        <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="menungguCount">0</h1>
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
                        <span style="font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Usulan</span>
                        <h4 class="mb-3 mt-1" style="font-size: 20px; font-weight: 600;">Revisi</h4>
                        <div class="d-flex align-items-end mt-2">
                        <h1 class="mb-0 me-2" style="font-size: 44px; font-weight: 700; letter-spacing: -1px;" id="revisiCount">0</h1>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

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
                <tbody id="usulanTableBody">
                </tbody>
            </table>
            <div class="d-flex justify-content-between align-items-center px-4 pb-4">
                <div class="text-muted" id="paginationInfo">Showing 1 to 10 of 50 entries</div>
                <nav aria-label="Page navigation">
                    <ul class="pagination mb-0" id="pagination">
                    </ul>
                </nav>
            </div>
        </div>
    </div>

    <div class="modal fade" id="revisiModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCenterTitle">Revisi Usulan</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="revisiForm">
              <input type="hidden" id="revisiUsulanId">
              
              <div class="row">
                <div class="col mb-3">
                  <label for="revisiNama" class="form-label">Nama Kegiatan</label>
                  <input type="text" id="revisiNama" class="form-control" readonly>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="revisiPengusul" class="form-label">Pengusul</label>
                  <input type="text" id="revisiPengusul" class="form-control" readonly>
                </div>
              </div>
              <div class="row">
                <div class="col mb-3">
                  <label for="revisiCatatan" class="form-label">Catatan Revisi</label>
                  <textarea id="revisiCatatan" class="form-control" rows="4" placeholder="Masukkan catatan revisi..." required></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" id="btnKirimRevisi">Kirim Revisi</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Render the main layout with the page-specific content
  renderDashboardLayout(pageContent, userRole);

  // --- All the page-specific JavaScript logic goes here ---

  // Sample usulan data
  const usulanData = [
    {
      id: 1,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 2,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Direvisi",
    },
    {
      id: 3,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 4,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 5,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Disetujui",
    },
    {
      id: 6,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Disetujui",
    },
    {
      id: 7,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Menunggu",
    },
    {
      id: 8,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Diterima",
    },
    {
      id: 9,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Diterima",
    },
    {
      id: 10,
      namaKegiatan: "KAK (Nama Kegiatan)",
      kategori: "Pengusul",
      pengusul: "Nama Pengusul",
      detail: "himpunan /lain",
      tanggal: "28 Desember 2025",
      status: "Menunggu",
    },
  ];

  let currentRevisiIndex = null;
  let revisiModalInstance = null;
  let currentPage = 1;
  const itemsPerPage = 10;

  // Render table rows with pagination
  function renderTableRows(data) {
    const tbody = document.getElementById("usulanTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((usulan, index) => {
      let statusClass = "";
      let statusText = usulan.status;

      switch (usulan.status) {
        case "Menunggu":
          statusClass = "bg-warning";
          break;
        case "Direvisi":
          statusClass = "bg-info";
          break;
        case "Disetujui":
          statusClass = "bg-success";
          break;
        case "Diterima":
          statusClass = "bg-success";
          break;
        default:
          statusClass = "bg-secondary";
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td style="text-align: center;">
          <input type="checkbox" class="form-check-input row-checkbox">
        </td>
        <td>
          <span style="font-weight: 600; box-shadow: 0 2px 6px rgba(0,0,0,0.1); padding: 0.5rem 0.75rem; border-radius: 8px; background: #FFFFFF; color: #374151;">${
            usulan.id
          }</span>
        </td>
        <td>
          <strong>${usulan.namaKegiatan}</strong><br>
          <small class="text-muted">${usulan.kategori}</small>
        </td>
        <td>
          <strong>${usulan.pengusul}</strong><br>
          <small class="text-muted">${usulan.detail}</small>
        </td>
        <td>${usulan.tanggal}</td>
        <td style="text-align: center;">
          <span class="badge ${statusClass}" style="min-width: 85px; padding: 6px 16px; border-radius: 6px;">${statusText}</span>
        </td>
        <td style="text-align: center;">
          <button 
            class="btn btn-sm me-2 btn-revisi" 
            data-index="${startIndex + index}"
          >
            <i class="ti me-1">&#xeb04;</i> Revisi
          </button>
          <button 
            class="btn btn-sm btn-delete" 
            data-index="${startIndex + index}"
          >
            <i class="ti">&#xeb55;</i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });

    renderPagination(data.length);
    attachEventListeners();
  }

  // Render pagination
  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationEl = document.getElementById("pagination");
    const paginationInfoEl = document.getElementById("paginationInfo");

    if (!paginationEl) return;

    paginationEl.innerHTML = "";

    // Update info text
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    if (paginationInfoEl) {
      paginationInfoEl.textContent = `Showing ${startItem} to ${endItem} of ${totalItems} entries`;
    }

    // First page button
    const firstLi = document.createElement("li");
    firstLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    firstLi.innerHTML = `<a class="page-link" href="#" data-page="first">«</a>`;
    paginationEl.appendChild(firstLi);

    // Previous button
    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevLi.innerHTML = `<a class="page-link" href="#" data-page="prev">‹</a>`;
    paginationEl.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
        paginationEl.appendChild(li);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        const li = document.createElement("li");
        li.className = "page-item disabled";
        li.innerHTML = `<span class="page-link">...</span>`;
        paginationEl.appendChild(li);
      }
    }

    // Next button
    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    nextLi.innerHTML = `<a class="page-link" href="#" data-page="next">›</a>`;
    paginationEl.appendChild(nextLi);

    // Last page button
    const lastLi = document.createElement("li");
    lastLi.className = `page-item ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    lastLi.innerHTML = `<a class="page-link" href="#" data-page="last">»</a>`;
    paginationEl.appendChild(lastLi);

    // Add click handlers
    paginationEl.querySelectorAll(".page-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = e.target.getAttribute("data-page");

        if (page === "first") currentPage = 1;
        else if (page === "prev" && currentPage > 1) currentPage--;
        else if (page === "next" && currentPage < totalPages) currentPage++;
        else if (page === "last") currentPage = totalPages;
        else if (!isNaN(page)) currentPage = parseInt(page);

        renderTableRows(usulanData);
      });
    });
  }

  // Attach event listeners
  function attachEventListeners() {
    // Row checkboxes
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelectAll);
    });

    // Revisi buttons
    document.querySelectorAll(".btn-revisi").forEach((btn) => {
      btn.addEventListener("click", handleRevisi);
    });

    // Delete buttons
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", handleDelete);
    });
  }

  // Select all functionality
  const selectAllCheckbox = document.getElementById("selectAll");
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      const checkboxes = document.querySelectorAll(".row-checkbox");
      checkboxes.forEach((cb) => (cb.checked = this.checked));
    });
  }

  // Update select all state
  function updateSelectAll() {
    const allCheckboxes = document.querySelectorAll(".row-checkbox");
    const checkedCount = document.querySelectorAll(
      ".row-checkbox:checked"
    ).length;
    if (selectAllCheckbox) {
      selectAllCheckbox.checked =
        checkedCount > 0 && checkedCount === allCheckboxes.length;
      selectAllCheckbox.indeterminate =
        checkedCount > 0 && checkedCount < allCheckboxes.length;
    }
  }

  // --- LOGIKA MODAL REVISI ---
  function handleRevisi(e) {
    const btn = e.currentTarget;
    const index = parseInt(btn.getAttribute("data-index"));

    currentRevisiIndex = index;
    const usulan = usulanData[index];

    // Populate modal
    const revisiNamaEl = document.getElementById("revisiNama");
    const revisiPengusulEl = document.getElementById("revisiPengusul");
    const revisiCatatanEl = document.getElementById("revisiCatatan");

    if (revisiNamaEl) revisiNamaEl.value = usulan.namaKegiatan || "";
    if (revisiPengusulEl) revisiPengusulEl.value = usulan.pengusul || "";
    if (revisiCatatanEl) revisiCatatanEl.value = "";

    // Show modal using Bootstrap 5
    if (!revisiModalInstance) {
      if (typeof bootstrap !== "undefined") {
        revisiModalInstance = new bootstrap.Modal(
          document.getElementById("revisiModal")
        );
      } else {
        console.error("Bootstrap 5 JS not found. Modals will not work.");
        return;
      }
    }
    revisiModalInstance.show();
  }

  // Handle kirim revisi
  const btnKirimRevisi = document.getElementById("btnKirimRevisi");
  if (btnKirimRevisi) {
    btnKirimRevisi.addEventListener("click", () => {
      const catatan = document.getElementById("revisiCatatan").value.trim();

      if (!catatan) {
        alert("Catatan revisi harus diisi!");
        return;
      }

      if (currentRevisiIndex !== null) {
        usulanData[currentRevisiIndex].status = "Direvisi";

        renderTableRows(usulanData);
        updateStats();

        if (revisiModalInstance) {
          revisiModalInstance.hide();
        }

        currentRevisiIndex = null;
        document.getElementById("revisiForm").reset();
        alert("Revisi berhasil dikirim!");
      }
    });
  }

  // --- LOGIKA DELETE ---
  function handleDelete(e) {
    const btn = e.currentTarget;
    const index = parseInt(btn.getAttribute("data-index"));

    if (confirm("Apakah Anda yakin ingin menghapus usulan ini?")) {
      const row = btn.closest("tr");
      row.style.transition = "all 0.3s";
      row.style.opacity = "0";
      row.style.transform = "translateX(-20px)";

      setTimeout(() => {
        usulanData.splice(index, 1);
        renderTableRows(usulanData);
        updateStats();
      }, 300);
    }
  }

  // --- LOGIKA UPDATE STATS ---
  function updateStats() {
    const menungguCount = usulanData.filter(
      (u) => u.status === "Menunggu"
    ).length;
    const revisiCount = usulanData.filter(
      (u) => u.status === "Direvisi"
    ).length;

    const menungguEl = document.getElementById("menungguCount");
    const revisiEl = document.getElementById("revisiCount");

    if (menungguEl) menungguEl.textContent = menungguCount;
    if (revisiEl) revisiEl.textContent = revisiCount;
  }

  // Initial render
  renderTableRows(usulanData);
  updateStats();

  // Initialize Vuexy menu (jika diperlukan)
  if (window.Helpers) {
    window.Helpers.init();
  }
}
